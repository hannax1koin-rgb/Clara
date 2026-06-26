import React from 'react';

export default function Header() {
  return (
    <header className="flex-shrink-0 px-4 pt-5 pb-2">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-300 via-pink-400 to-rose-400 p-6 shadow-lg shadow-rose-200/60">
        <div className="absolute -top-8 -left-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-amber-200/20 blur-2xl" />
        <div className="absolute top-2 right-2 text-2xl opacity-20">💕</div>
        <div className="absolute bottom-2 left-2 text-xl opacity-10">💖</div>

        <div className="relative z-10">
          <p className="text-xs font-bold tracking-widest text-white/70">رصيد الديون المستحق</p>
          <p className="mt-2 text-4xl font-black tracking-tight text-white drop-shadow-sm">
            18,500<span className="text-xl mr-1.5 font-bold">ج.م</span>
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-300">
              <span className="h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
            </span>
            <span className="text-[11px] font-medium text-white/60">آخر تحديث: اليوم</span>
            <span className="mr-auto text-[10px] font-bold text-white/30">كلارا × باسل</span>
          </div>
        </div>
      </div>
    </header>
  );
}
