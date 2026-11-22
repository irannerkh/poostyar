import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Send, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showToast('عضویت شما در خبرنامه زیبایی پوست‌یار ثبت شد');
    setEmail('');
  };

  return (
    <footer className="mt-16 border-t border-[#F0DCE3] bg-gradient-to-b from-[#FDF8F6] to-[#F6E4EA]">
      {/* نوار اعتماد (ضمانت اصالت، ارسال سریع، مشاوره تخصصی) */}
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <div className="glass-panel grid grid-cols-1 divide-y divide-[#EAD2DB] rounded-3xl p-6 shadow-soft md:grid-cols-3 md:divide-x md:divide-x-reverse md:divide-y-0">
          <div className="flex items-center justify-center gap-3.5 py-3 md:py-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F4EA] text-[#1E7E48]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#2B1220]">ضمانت اصالت کالا</h4>
              <p className="text-xs text-[#6F4C5D]">با خیال راحت خرید کنید</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3.5 py-3 md:py-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6E3EC] text-[#6D1344]">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#2B1220]">ارسال سریع</h4>
              <p className="text-xs text-[#6F4C5D]">در کمترین زمان ممکن</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3.5 py-3 md:py-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EFE8FA] text-[#5B2C82]">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#2B1220]">مشاوره تخصصی</h4>
              <p className="text-xs text-[#6F4C5D]">پاسخ به سوالات پوستی شما</p>
            </div>
          </div>
        </div>
      </div>

      {/* بدنه اصلی فوتر */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#6D1344]" />
            <span className="text-xl font-black text-[#6D1344]">پوست‌یار</span>
          </div>
          <p className="mt-3 text-xs leading-6 text-[#5E3B4D]">
            پلتفرم تخصصی انتخاب و خرید محصولات مراقبت پوستی بر پایه ترکیبات علمی، نیاز واقعی پوست و تجربه مصرف‌کنندگان.
          </p>
        </div>

        <div>
          <h5 className="mb-3 text-sm font-extrabold text-[#2B1220]">دسترسی سریع</h5>
          <ul className="space-y-2 text-xs font-medium text-[#5E3B4D]">
            <li><Link to="/shop" className="hover:text-[#6D1344]">فروشگاه محصولات</Link></li>
            <li><Link to="/advisor" className="hover:text-[#6D1344]">مشاور هوشمند پوست</Link></li>
            <li><Link to="/compare" className="hover:text-[#6D1344]">مقایسه تخصصی</Link></li>
            <li><Link to="/magazine" className="hover:text-[#6D1344]">مجله زیبایی</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 text-sm font-extrabold text-[#2B1220]">خدمات مشتریان</h5>
          <ul className="space-y-2 text-xs font-medium text-[#5E3B4D]">
            <li><Link to="/profile" className="hover:text-[#6D1344]">پیگیری سفارش‌ها</Link></li>
            <li><Link to="/contact" className="hover:text-[#6D1344]">تماس و پشتیبانی</Link></li>
            <li><Link to="/auth" className="hover:text-[#6D1344]">ورود و عضویت</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 text-sm font-extrabold text-[#2B1220]">عضویت در خبرنامه زیبایی</h5>
          <p className="mb-3 text-xs text-[#5E3B4D]">
            تخفیف‌های ویژه و راهنمای روتین پوستی را زودتر از همه دریافت کنید.
          </p>
          <form onSubmit={handleSubscribe} className="flex overflow-hidden rounded-full border border-[#E2C2CE] bg-white p-1">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید..."
              className="w-full px-3 text-xs outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-full bg-[#6D1344] px-4 py-2 text-xs font-bold text-white hover:bg-[#4D0B2F]"
            >
              <span>عضویت</span>
              <Send className="h-3 w-3" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-[#E8CFD8] py-4 text-center text-xs text-[#6F4C5D]">
        © ۱۴۰۵ تمامی حقوق برای فروشگاه تخصصی مراقبت پوستی «پوست‌یار» محفوظ است.
      </div>
    </footer>
  );
};
