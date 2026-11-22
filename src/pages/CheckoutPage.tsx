import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const CheckoutPage: React.FC = () => {
  const { subtotal, clearCart, showToast } = useStore();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    showToast('سفارش شما با موفقیت ثبت شد! کد پیگیری پیامک شد.');
    navigate('/profile');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <form
        onSubmit={handleOrder}
        className="rounded-3xl border border-[#F0DCE3] bg-white p-6 shadow-glass sm:p-8"
      >
        <h1 className="text-2xl font-black text-[#6D1344]">تکمیل اطلاعات ارسال و پرداخت</h1>
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-bold">نام و نام خانوادگی تحویل‌گیرنده</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border border-[#E5CBD5] p-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold">شماره موبایل</label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09120000000"
              className="w-full rounded-2xl border border-[#E5CBD5] p-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold">آدرس دقیق پستی</label>
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-2xl border border-[#E5CBD5] p-3 text-sm outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#FDF8F6] p-4 text-sm font-black text-[#6D1344]">
          <span>مبلغ نهایی پرداخت:</span>
          <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-[#6D1344] py-3.5 text-sm font-bold text-white hover:bg-[#4D0B2F]"
        >
          پرداخت آنلاین و ثبت نهایی سفارش
        </button>
      </form>
    </div>
  );
};
