import { PrismaClient, Role, MemberStatus, CampaignType, DiscountType, SessionStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { addDays, addMonths, setDate } from 'date-fns'
import { generateMonthlySessions } from '../src/lib/scheduling/recurring'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  const [goldPlan, regularPlan] = await Promise.all([
    prisma.membershipPlan.upsert({
      where: { slug: 'gold' },
      update: { bookingOpenDay: 10, price: 18800 },
      create: {
        name: 'ゴールド会員',
        nameEn: 'Gold Member',
        slug: 'gold',
        price: 18800,
        bookingOpenDay: 10,
        features: ['先行予約', '会員限定クラス', '優先案内'],
      },
    }),
    prisma.membershipPlan.upsert({
      where: { slug: 'regular' },
      update: { bookingOpenDay: 15, price: 12800 },
      create: {
        name: '一般会員',
        nameEn: 'Regular Member',
        slug: 'regular',
        price: 12800,
        bookingOpenDay: 15,
        features: ['通常予約', '一般クラス'],
      },
    }),
    prisma.membershipPlan.upsert({
      where: { slug: 'trial' },
      update: { bookingOpenDay: 1, price: 0 },
      create: {
        name: '体験のみ',
        nameEn: 'Trial Only',
        slug: 'trial',
        price: 0,
        bookingOpenDay: 1,
        features: ['体験申込のみ'],
      },
    }),
  ])

  const owner = await prisma.user.upsert({
    where: { email: 'owner@aura.example' },
    update: {},
    create: {
      email: 'owner@aura.example',
      name: 'Atsuko Owner',
      password,
      role: Role.OWNER,
      locale: 'ja',
    },
  })

  const staff = await prisma.user.upsert({
    where: { email: 'staff@aura.example' },
    update: {},
    create: {
      email: 'staff@aura.example',
      name: 'Staff One',
      password,
      role: Role.STAFF,
      locale: 'en',
    },
  })

  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@aura.example' },
    update: {},
    create: {
      email: 'teacher@aura.example',
      name: 'Rie Teacher',
      password,
      role: Role.TEACHER,
    },
  })

  const memberUser = await prisma.user.upsert({
    where: { email: 'member@aura.example' },
    update: {},
    create: {
      email: 'member@aura.example',
      name: 'Global Member',
      password,
      role: Role.MEMBER,
      locale: 'en',
    },
  })

  const leadSource = await prisma.leadSource.upsert({
    where: { slug: 'instagram' },
    update: {},
    create: { name: 'Instagram', nameEn: 'Instagram', slug: 'instagram' },
  })

  await prisma.profile.upsert({
    where: { userId: memberUser.id },
    update: {},
    create: {
      userId: memberUser.id,
      firstName: 'Global',
      lastName: 'Member',
      country: 'US',
      utmSource: 'instagram',
      utmMedium: 'social',
      utmCampaign: 'trial-spring',
      leadSourceId: leadSource.id,
    },
  })

  await prisma.member.upsert({
    where: { userId: memberUser.id },
    update: {},
    create: {
      userId: memberUser.id,
      membershipPlanId: goldPlan.id,
      status: MemberStatus.ACTIVE,
      startDate: setDate(new Date(), 1),
      cashbackEligible: true,
    },
  })

  const teacher = await prisma.teacher.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: {
      userId: teacherUser.id,
      displayName: 'リエ先生',
      specialties: ['flow', 'pilates'],
    },
  })

  const campaign = await prisma.campaign.create({
    data: {
      name: '体験3,300円 当日入会キャッシュバック',
      type: CampaignType.TRIAL_CASHBACK,
      discountType: DiscountType.FIXED,
      discountValue: 3300,
      cashbackAmount: 3300,
      startDate: new Date(),
      isActive: true,
    },
  })

  const rule = await prisma.recurringRule.create({
    data: {
      name: '木曜19時 フロー',
      nameEn: 'Thu 7pm Flow',
      dayOfWeek: 4,
      startTime: '19:00',
      endTime: '20:00',
      teacherId: teacher.id,
      capacity: 15,
      startDate: setDate(addMonths(new Date(), -1), 1),
      autoGenerate: true,
    },
  })

  const sessions = generateMonthlySessions({
    rule: {
      id: rule.id,
      name: rule.name,
      dayOfWeek: rule.dayOfWeek,
      startTime: rule.startTime,
      endTime: rule.endTime,
      teacherId: teacher.id,
      capacity: rule.capacity,
      startDate: rule.startDate,
      endDate: rule.endDate,
      holidaySkip: true,
    },
    monthDate: new Date(),
    holidays: [],
  })

  for (const item of sessions.slice(0, 6)) {
    await prisma.classSession.create({
      data: {
        recurringRuleId: rule.id,
        title: item.title,
        titleEn: 'Flow Class',
        date: new Date(`${item.date}T00:00:00.000Z`),
        startTime: item.startTime,
        endTime: item.endTime,
        teacherId: item.teacherId,
        capacity: item.capacity,
        status: item.status === 'CANCELLED' ? SessionStatus.CANCELLED : SessionStatus.SCHEDULED,
      },
    })
  }

  await prisma.trialLesson.create({
    data: {
      userId: memberUser.id,
      scheduledAt: addDays(new Date(), 2),
      campaignId: campaign.id,
      utmSource: 'instagram',
      utmMedium: 'social',
      utmCampaign: 'trial-spring',
      convertedToMember: true,
    },
  })

  await prisma.auditLog.createMany({
    data: [
      {
        userId: owner.id,
        action: 'CREATE_RECURRING_RULE',
        resource: 'RecurringRule',
        detail: { name: '木曜19時 フロー' },
      },
      {
        userId: staff.id,
        action: 'APPROVE_SCHEDULE_CHANGE',
        resource: 'ScheduleChangeRequest',
        detail: { count: 1 },
      },
    ],
  })

  console.log('Seed completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
