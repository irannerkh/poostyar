import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('پیام شما برای تیم مشاوره پوست‌یار ارسال شد');
    setName('');
    setMsg('');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-3xl border border-[#F0DCE3] bg-white p-8 shadow-glass">
        <h1 className="text-2xl font-black text-[#6D1344]">تماس و مشاوره تخصصی پوست‌یار</h1>
        <p className="mt-2 text-xs text-[#6F4C5D]">
          سوالی درباره انتخاب روتین پوستی یا پیگیری سفارش دارید؟ با ما در ارتباط باشید.
        </p>

        <form onSubmit={handleSend} className="mt-6 space-y-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام شما"
            className="w-full rounded-2xl border border-[#E5CBD5] p-3.5 text-sm outline-none"
          />
          <textarea
            required
            rows={4}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="سوال پوستی یا پیام خود را بنویسید..."
            className="w-full rounded-2xl border border-[#E5CBD5] p-3.5 text-sm outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-[#6D1344] py-3.5 text-sm font-bold text-white hover:bg-[#4D0B2F]"
          >
            ارسال پیام
          </button>
        </form>
      </div>
    </div>
  );
};
