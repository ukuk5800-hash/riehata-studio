"use client";

import { useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-slate-900">
      
      {/* 📱 スマホ専用：三本線ヘッダー */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center px-4 z-50 shadow-md">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 mr-3 bg-slate-800 rounded-md hover:bg-slate-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <span className="font-bold text-sm tracking-wider">管理画面メニュー</span>
      </div>

      {/* ⬛️ 左側のメニュー枠（スマホはスライド、PCは左に固定） */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-slate-900 transform transition-transform duration-300 ease-in-out shadow-xl shrink-0
        md:relative md:translate-x-0 md:flex
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* スマホ用：開いたメニューを閉じるボタン */}
        {isMobileMenuOpen && (
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden absolute top-4 right-4 text-slate-400 hover:text-white z-50 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
        <AdminSidebar />
      </div>

      {/* ⬜️ 右側のメイン画面（ダッシュボード等） */}
      <div className="flex-1 overflow-y-auto w-full pt-16 md:pt-0">
        {children}
      </div>

      {/* ⬛️ スマホ用：メニューが開いている時の半透明の黒背景 */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

    </div>
  );
}
