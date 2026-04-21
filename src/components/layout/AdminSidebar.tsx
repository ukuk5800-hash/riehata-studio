'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, CalendarDays, RefreshCw, Users, BookOpen,
  Star, Bell, BarChart2, MessageSquare, Settings, LogOut,
  ChevronLeft, ChevronRight, AlertCircle, CalendarCheck,
  Megaphone, GraduationCap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { STUDIO_NAME } from '@/lib/constants'

const navGroups = [
  {
    label: '概要',
    items: [
      { href: '/admin', label: 'ダッシュボード', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'スケジュール',
    items: [
      { href: '/admin/classes', label: 'クラス管理', icon: CalendarDays },
      { href: '/admin/recurring', label: '定期設定', icon: RefreshCw },
      { href: '/admin/events', label: 'イベント', icon: Star },
      { href: '/admin/requests', label: '変更申請', icon: AlertCircle, badge: 3 },
    ],
  },
  {
    label: '顧客・会員',
    items: [
      { href: '/admin/bookings', label: '予約管理', icon: CalendarCheck },
      { href: '/admin/members', label: '会員管理', icon: Users },
      { href: '/admin/teachers', label: '講師管理', icon: GraduationCap },
    ],
  },
  {
    label: 'マーケティング',
    items: [
      { href: '/admin/campaigns', label: 'キャンペーン', icon: Megaphone },
      { href: '/admin/analytics', label: '流入元分析', icon: BarChart2 },
    ],
  },
  {
    label: 'その他',
    items: [
      { href: '/admin/assistant', label: 'AIアシスタント', icon: MessageSquare },
      { href: '/admin/settings', label: '設定', icon: Settings },
    ],
  },
]

export default function AdminSidebar({ userName = 'Admin', userRole = 'OWNER' }: { userName?: string; userRole?: string }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  function isActive(href: string, exact = false) {
    return exact ? pathname === href : pathname.startsWith(href)
  }

  return (
    <aside className={cn(
      'flex flex-col bg-slate-900 text-slate-300 h-full transition-all duration-300 shrink-0',
      collapsed ? 'w-16' : 'w-60'
    )}>
      <div className="flex items-center gap-2 px-4 h-16 border-b border-slate-800 shrink-0">
        <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">A</span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">{STUDIO_NAME}</p>
            <p className="text-slate-500 text-xs">管理画面</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-slate-500 hover:text-slate-300 p-1 rounded"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {navGroups.map(group => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <p className="px-3 py-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">{group.label}</p>
            )}
            {group.items.map(item => {
              const active = isActive(item.href, 'exact' in item ? item.exact : false)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative',
                    active
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  <item.icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && 'badge' in item && item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                  {collapsed && 'badge' in item && item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  {collapsed && (
                    <div className="absolute left-full ml-2 bg-slate-700 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50">
                      {item.label}
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
            {userName[0]}
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-medium truncate">{userName}</p>
              <p className="text-slate-500 text-xs">{userRole}</p>
            </div>
          )}
          {!collapsed && (
            <Link href="/auth/logout" className="text-slate-500 hover:text-red-400 p-1">
              <LogOut size={16} />
            </Link>
          )}
        </div>
      </div>
    </aside>
  )
}
