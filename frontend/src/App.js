import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ComplaintForm from './components/ComplaintForm';
import ComplaintsList from './components/ComplaintsList';
import LovePopup from './components/LovePopup';

const TABS = [
  { key: 'form', label: 'تقديم شكوى', icon: 'M12 4.5v15m7.5-7.5h-15' },
  { key: 'list', label: 'جدول الشكاوي', icon: 'M8.25 6.75h12M8.25 12h12m-8.25 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('form');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmitted = useCallback(() => {
    setRefreshKey((k) => k + 1);
    setActiveTab('list');
  }, []);

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-rose-50 via-white to-pink-50 font-cairo">
      <LovePopup />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-rose-100/60 to-transparent pointer-events-none" />

      <Header />

      <main className="relative z-10 flex-1 overflow-y-auto px-4 pb-2 scroll-smooth">
        {activeTab === 'form' && (
          <div className="animate-[fadeSlideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            <ComplaintForm onSubmitted={handleSubmitted} />
          </div>
        )}
        {activeTab === 'list' && (
          <div className="animate-[fadeSlideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            <ComplaintsList key={refreshKey} />
          </div>
        )}
        <div className="h-4" />
      </main>

      <nav className="flex-shrink-0 border-t border-rose-100 bg-white/80 backdrop-blur-xl safe-area-bottom shadow-[0_-4px_20px_-4px_rgba(244,114,182,0.15)]">
        <div className="flex items-center justify-around py-3">
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex flex-col items-center gap-1 px-6 py-1 transition ${
                  active ? 'text-rose-500' : 'text-rose-300'
                }`}
              >
                {active && (
                  <span className="absolute -top-3 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-l from-rose-400 to-pink-400" />
                )}
                <svg
                  className={`h-6 w-6 transition ${
                    active ? 'scale-110 drop-shadow-sm' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={active ? 2.2 : 1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
                <span
                  className={`text-[11px] font-bold transition ${
                    active ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
      `}</style>
    </div>
  );
}
