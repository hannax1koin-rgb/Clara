import React, { useState, useEffect, useCallback } from 'react';

export default function ComplaintsList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = useCallback(async () => {
    try {
      const res = await fetch('/api/complaints');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setComplaints(data);
    } catch {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const updateComplaint = async (id, body) => {
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setComplaints((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    } catch {
      alert('حدث خطأ أثناء التحديث');
    }
  };

  const toggleStatus = (item) => {
    const next = item.status === 'لم يتم الحل' ? 'تم الحل' : 'لم يتم الحل';
    updateComplaint(item.id, { status: next });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <span className="block h-8 w-8 animate-spin rounded-full border-[3px] border-rose-200 border-t-rose-400" />
          <span className="absolute inset-0 flex items-center justify-center text-sm">💕</span>
        </div>
        <p className="mt-4 text-xs text-rose-300">جاري تحميل الشكاوي...</p>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="flex flex-col items-center py-20">
        <div className="mb-4 text-5xl opacity-60">💌</div>
        <p className="text-sm font-bold text-rose-400">لا توجد شكاوى حتى الآن</p>
        <p className="mt-1 text-xs text-rose-300/60">استخدمي تبويب "تقديم شكوى" 💬</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <p className="text-sm font-bold text-rose-400">
          💕 جميع الشكاوي <span className="text-rose-300 text-xs font-normal">({complaints.length})</span>
        </p>
        <button
          onClick={fetchComplaints}
          className="text-[11px] font-bold text-rose-300 hover:text-rose-400 transition"
        >
          تحديث
        </button>
      </div>
      {complaints.map((item) => (
        <ComplaintCard
          key={item.id}
          item={item}
          onToggleStatus={toggleStatus}
          onUpdate={updateComplaint}
        />
      ))}
    </div>
  );
}

function ComplaintCard({ item, onToggleStatus, onUpdate }) {
  const [linkInput, setLinkInput] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [savingLink, setSavingLink] = useState(false);

  const isResolved = item.status === 'تم الحل';
  const hasLink = item.compensationLink && item.compensationLink.trim().length > 0;

  const handleSaveLink = async () => {
    const url = linkInput.trim();
    if (!url) return;
    setSavingLink(true);
    await onUpdate(item.id, { compensationLink: url });
    setSavingLink(false);
    setLinkInput('');
    setShowLinkInput(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-rose-100 bg-white p-5 shadow-md shadow-rose-100/50 transition hover:shadow-lg hover:shadow-rose-200/60">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-l from-rose-300 to-pink-300 opacity-60" />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold text-rose-800 leading-relaxed">{item.title}</h3>
        <button
          onClick={() => onToggleStatus(item)}
          className={`flex-shrink-0 rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wide border shadow-sm transition active:scale-95 ${
            isResolved
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
              : 'bg-amber-50 text-amber-600 border-amber-200'
          }`}
        >
          {item.status}
          <span className="mr-1">{isResolved ? '✅' : '⏳'}</span>
        </button>
      </div>

      {item.details && (
        <p className="mt-3 text-xs leading-relaxed text-rose-700/70 bg-rose-50/50 rounded-xl p-3">
          {item.details}
        </p>
      )}

      {item.impact && (
        <div className="mt-2 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 p-3 border border-rose-100/50">
          <p className="text-[11px] font-bold text-rose-400 mb-1">💔 الإحساس أو الضرر الناتج</p>
          <p className="text-xs leading-relaxed text-rose-700/70">{item.impact}</p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 border-t border-rose-100 pt-4">
        {hasLink && !showLinkInput ? (
          <>
            <a
              href={item.compensationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-l from-rose-400 to-pink-400 px-4 py-2 text-[11px] font-bold text-white shadow-md shadow-rose-200/60 transition active:scale-95"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              🎁 عرض التعويض
            </a>
            <button
              onClick={() => { setShowLinkInput(true); setLinkInput(item.compensationLink); }}
              className="text-[11px] text-rose-300 underline decoration-rose-200 transition active:text-rose-400"
            >
              تغيير
            </button>
          </>
        ) : (
          <div className="flex w-full items-center gap-2">
            <input
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="أضف لينك الهدية..."
              className="min-w-0 flex-1 rounded-xl border-2 border-rose-100 bg-rose-50/50 px-3.5 py-2.5 text-[12px] text-rose-800 placeholder-rose-300 shadow-sm transition focus:border-rose-300 focus:outline-none focus:ring-4 focus:ring-rose-100"
            />
            <button
              onClick={handleSaveLink}
              disabled={!linkInput.trim() || savingLink}
              className="flex-shrink-0 rounded-xl bg-gradient-to-l from-rose-400 to-pink-400 px-4 py-2.5 text-[11px] font-bold text-white shadow-md shadow-rose-200/50 transition active:scale-95 disabled:opacity-40 disabled:shadow-none disabled:active:scale-100"
            >
              {savingLink ? '...' : '💾 حفظ'}
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[10px] text-rose-200">
          {new Date(item.createdAt).toLocaleDateString('ar-EG', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
        <span className="text-[10px] text-rose-200">💕</span>
      </div>
    </div>
  );
}
