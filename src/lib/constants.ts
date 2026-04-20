export const STUDIO_NAME = process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'RIEHATA STUDIO'
export const TRIAL_PRICE = 3300
export const CASHBACK_AMOUNT = 3300

export const MEMBERSHIP_PLANS = [
  {
    id: 'gold',
    name: 'ゴールド',
    nameEn: 'Gold',
    slug: 'gold',
    price: 15000,
    bookingOpenDay: 10,
    maxBookingsPerMonth: null, // unlimited
    color: '#D4AF37',
    features: [
      '月間クラス受け放題',
      '毎月10日から予約開始',
      '優先キャンセル待ち',
      'ワークショップ割引10%',
      '専属サポート',
    ],
    featuresEn: [
      'Unlimited monthly classes',
      'Booking opens on the 10th',
      'Priority waitlist',
      '10% workshop discount',
      'Dedicated support',
    ],
  },
  {
    id: 'regular',
    name: 'レギュラー',
    nameEn: 'Regular',
    slug: 'regular',
    price: 9800,
    bookingOpenDay: 15,
    maxBookingsPerMonth: 8,
    color: '#0d9488',
    features: [
      '月8回まで受講可能',
      '毎月15日から予約開始',
      'キャンセル待ち対応',
      'ワークショップ割引5%',
    ],
    featuresEn: [
      'Up to 8 classes per month',
      'Booking opens on the 15th',
      'Waitlist available',
      '5% workshop discount',
    ],
  },
  {
    id: 'light',
    name: 'ライト',
    nameEn: 'Light',
    slug: 'light',
    price: 5500,
    bookingOpenDay: 20,
    maxBookingsPerMonth: 4,
    color: '#6366f1',
    features: [
      '月4回まで受講可能',
      '毎月20日から予約開始',
    ],
    featuresEn: [
      'Up to 4 classes per month',
      'Booking opens on the 20th',
    ],
  },
]

export const CLASS_TYPES = [
  { id: 'yoga', name: 'ヨガ', nameEn: 'Yoga', icon: '🧘', color: 'teal' },
  { id: 'pilates', name: 'ピラティス', nameEn: 'Pilates', icon: '💪', color: 'purple' },
  { id: 'meditation', name: '瞑想', nameEn: 'Meditation', icon: '🌿', color: 'green' },
  { id: 'workshop', name: 'ワークショップ', nameEn: 'Workshop', icon: '✨', color: 'amber' },
]

export const UTM_SOURCES = [
  'instagram', 'google', 'twitter', 'facebook',
  'referral', 'direct', 'email', 'line', 'other',
]
