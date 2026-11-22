import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SkinType } from '../types';

export const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('نگار رحیمی');
  const [email, setEmail] = useState('user@poostyar.ir');
  const [phone, setPhone] = useState('09123456789');
  const [skinType, setSkinType] = useState<SkinType>('combination');
  const { loginUser } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ name, email, phone, skinType });
    navigate('/profile');
  };

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="glass-panel rounded-3xl p-8 shadow-glass">
        <h1 className="text-center text-2xl font-black text-[#6D1344]">
          {isRegister ? 'ایجاد حساب در پوست‌یار' : 'ورود به حساب کاربری'}
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isRegister && (
            <div>
              <label className="mb-1 block text-xs font-bold">نام کامل</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-[#E5CBD5] bg-white p-3 text-sm outline-none"
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-bold">ایمیل</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-[#E5CBD5] bg-white p-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold">شماره موبایل</label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-2xl border border-[#E5CBD5] bg-white p-3 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold">نوع پوست شما</label>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value as SkinType)}
              className="w-full rounded-2xl border border-[#E5CBD5] bg-white p-3 text-sm outline-none"
            >
              <option value="oily">چرب</option>
              <option value="dry">خشک</option>
              <option value="combination">مختلط</option>
              <option value="sensitive">حساس</option>
              <option value="normal">معمولی</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#6D1344] py-3.5 text-sm font-bold text-white hover:bg-[#4D0B2F]"
          >
            {isRegister ? 'ثبت‌نام و ورود' : 'ورود به پنل کاربری'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 block w-full text-center text-xs font-bold text-[#6D1344] hover:underline"
        >
          {isRegister ? 'قبلاً ثبت‌نام کرده‌اید؟ وارد شوید' : 'حساب کاربری ندارید؟ ثبت‌نام کنید'}
        </button>
      </div>
    </div>
  );
};
