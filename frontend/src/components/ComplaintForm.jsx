import React, { useState } from 'react';

const initial = { title: '', details: '', impact: '' };

export default function ComplaintForm({ onSubmitted }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.details || !form.impact) return;
    setLoading(true);
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setForm(initial);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error('Complaint submit error:', err);
      alert('حدث خطأ أثناء إرسال الشكوى');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'title', label: 'اسم الشكوى', placeholder: 'مثال: تأخير في الاستجابة', rows: false },
    { name: 'details', label: 'تفاصيل الشكوى', placeholder: 'اشرح التفاصيل كاملة...', rows: 3 },
    { name: 'impact', label: 'الإحساس أو الضرر الناتج', placeholder: 'كيف أثرت الشكوى عليك نفسياً؟...', rows: 3 },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="text-center">
        <p className="text-lg font-bold text-rose-400">💬 تقديم شكوى</p>
        <p className="mt-1 text-xs text-rose-300/70">باسل يستحق أن يسمع كل ما في قلبك</p>
      </div>

      {fields.map((f) => (
        <div key={f.name}>
          <label className="mb-2 block text-xs font-bold text-rose-400 tracking-wide">
            {f.label}
          </label>
          {f.rows ? (
            <textarea
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              rows={f.rows}
              placeholder={f.placeholder}
              className="w-full resize-none rounded-2xl border-2 border-rose-100 bg-white/80 p-4 text-sm text-rose-900 placeholder-rose-300 shadow-sm shadow-rose-100/50 transition focus:border-rose-300 focus:outline-none focus:ring-4 focus:ring-rose-100"
            />
          ) : (
            <input
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="w-full rounded-2xl border-2 border-rose-100 bg-white/80 p-4 text-sm text-rose-900 placeholder-rose-300 shadow-sm shadow-rose-100/50 transition focus:border-rose-300 focus:outline-none focus:ring-4 focus:ring-rose-100"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading || !form.title || !form.details || !form.impact}
        className="relative mt-2 overflow-hidden rounded-2xl bg-gradient-to-l from-rose-400 to-pink-400 py-4 text-sm font-bold text-white shadow-lg shadow-rose-200/60 transition active:scale-[0.97] disabled:opacity-50 disabled:shadow-none disabled:active:scale-100"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            جاري الإرسال...
          </span>
        ) : success ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            تم الإرسال 💕
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.07a.375.375 0 01-.557-.328V8.93c0-.3.346-.486.557-.328l5.603 3.07z" />
            </svg>
            إرسال الشكوى
          </span>
        )}
      </button>
    </form>
  );
}
