import type { Metadata } from 'next'
import AdminSidebar from '@/components/layout/AdminSidebar'

export const metadata: Metadata = {
  title: { default: '管理画面', template: '%s | 管理画面' },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AdminSidebar userName="秋葉 湧" userRole="OWNER" />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div />
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">今日: {new Date().toLocaleDateString('ja-JP')}</span>
            <span className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold">秋</span>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
