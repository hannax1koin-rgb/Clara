import React, { useState, useEffect } from 'react';

const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 3,
  size: 12 + Math.random() * 20,
  duration: 4 + Math.random() * 4,
}));

export default function LovePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      >
        <div
          className="relative mx-4 w-full max-w-sm overflow-hidden rounded-3xl border border-rose-300/50 bg-gradient-to-b from-rose-100 via-pink-50 to-rose-100 p-8 text-center shadow-2xl shadow-rose-300/40 animate-[popIn_0.6s_cubic-bezier(0.16,1,0.3,1)]"
          onClick={(e) => e.stopPropagation()}
        >
          {HEARTS.map((h) => (
            <span
              key={h.id}
              className="absolute pointer-events-none text-rose-300/30 animate-[floatHeart_var(--dur)_ease-in-out_infinite]"
              style={{
                left: `${h.left}%`,
                bottom: '-10%',
                fontSize: `${h.size}px`,
                animationDelay: `${h.delay}s`,
                '--dur': `${h.duration}s`,
              }}
            >
              ♥
            </span>
          ))}

          <div className="relative z-10">
            <div className="mb-4 flex justify-center gap-2 text-3xl">
              <span className="animate-[heartBeat_1.2s_ease-in-out_infinite]">💖</span>
              <span className="animate-[heartBeat_1.2s_ease-in-out_0.2s_infinite]">💕</span>
              <span className="animate-[heartBeat_1.2s_ease-in-out_0.4s_infinite]">💖</span>
            </div>

            <p className="mb-2 text-sm font-bold tracking-wide text-rose-400">
              بسم كلارا الرحمانة الرحيمة
            </p>

            <h1 className="mb-4 text-3xl font-black leading-tight text-rose-600 drop-shadow-sm">
              لا إله إلا
              <br />
              <span className="bg-gradient-to-l from-rose-500 to-pink-500 bg-clip-text text-transparent text-4xl">
                كلارا
              </span>
            </h1>

            <div className="mx-auto mb-6 h-px w-20 bg-gradient-to-l from-rose-400 to-pink-400" />

            <p className="mb-6 text-sm leading-relaxed text-rose-500/80">
              كلارا حبيبتي، أنتِ نور حياتي وسر سعادتي.
              <br />
              كل يوم معك هو نعمة من كلارا.
            </p>

            <button
              onClick={() => setVisible(false)}
              className="rounded-xl bg-gradient-to-l from-rose-400 to-pink-400 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-rose-300/50 transition hover:scale-105 hover:shadow-xl active:scale-95"
            >
              ادخل يا قلب ❤️
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes floatHeart {
          0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
          20%  { opacity: 0.4; }
          80%  { opacity: 0.4; }
          100% { transform: translateY(-120px) rotate(15deg); opacity: 0; }
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25%      { transform: scale(1.2); }
          50%      { transform: scale(1); }
          75%      { transform: scale(1.15); }
        }
      `}</style>
    </>
  );
}
