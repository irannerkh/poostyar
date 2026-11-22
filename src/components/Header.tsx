import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  Scale,
  Search,
  ShoppingBag,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { totalItems, compareIds, searchQuery, setSearchQuery, user } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catDropdown, setCatDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/shop');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-sm font-semibold transition-colors ${
      isActive
        ? 'text-[#6D1344] after:absolute after:bottom-0 after:right-0 after:h-0.5 after:w-full after:rounded-full after:bg-[#6D1344]'
        : 'text-[#3D2231] hover:text-[#6D1344]'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* لوگوی اختصاصی پوست‌یار */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6D1344] to-[#A42468] text-white shadow-md">
            <Sparkles className="h-5 w-5 text-[#F7DDE4]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-[#6D1344]">پوست‌یار</span>
            <span className="text-[10px] font-medium text-[#8C5B73]">مراقبت علمی پوست</span>
          </div>
        </Link>

        {/* منوی دسکتاپ */}
        <nav className="hidden items-center gap-6 lg:flex">
          <NavLink to="/" className={navLinkClass}>
            خانه
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            فروشگاه
          </NavLink>

          {/* منوی بازشوی دسته‌بندی محصولات */}
          <div
            className="relative"
            onMouseEnter={() => setCatDropdown(true)}
            onMouseLeave={() => setCatDropdown(false)}
          >
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="flex items-center gap-1 py-1 text-sm font-semibold text-[#3D2231] hover:text-[#6D1344]"
            >
              <span>دسته‌بندی محصولات</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {catDropdown && (
              <div className="absolute right-0 top-full w-56 pt-2">
                <div className="glass-panel rounded-2xl p-2 shadow-glass">
                  {[
                    { label: 'شوینده صورت', cat: 'cleanser' },
                    { label: 'سرم پوستی', cat: 'serum' },
                    { label: 'آبرسان و مرطوب‌کننده', cat: 'moisturizer' },
                    { label: 'ضدآفتاب تخصصی', cat: 'sunscreen' },
                  ].map((item) => (
                    <Link
                      key={item.cat}
                      to={`/shop?category=${item.cat}`}
                      onClick={() => setCatDropdown(false)}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#2B1220] transition hover:bg-[#F7DDE4]/60 hover:text-[#6D1344]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/advisor" className={navLinkClass}>
            مشاور هوشمند پوست
          </NavLink>
          <NavLink to="/magazine" className={navLinkClass}>
            مجله زیبایی
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            تماس با ما
          </NavLink>
        </nav>

        {/* جستجو و آیکون‌های کاربری */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در محصولات..."
              className="w-52 rounded-full border border-[#EAD4DC] bg-[#FDF8F6]/90 py-2 pl-9 pr-4 text-xs text-[#2B1220] placeholder-[#9B7285] outline-none transition focus:w-64 focus:border-[#6D1344] lg:w-60"
            />
            <button
              type="submit"
              aria-label="جستجو"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D1344]"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* مقایسه */}
          <Link
            to="/compare"
            title="مقایسه محصولات"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#EED9E0] bg-white/80 text-[#4A2036] transition hover:border-[#6D1344] hover:text-[#6D1344]"
          >
            <Scale className="h-4 w-4" />
            {compareIds.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-white">
                {compareIds.length}
              </span>
            )}
          </Link>

          {/* حساب کاربری */}
          <Link
            to={user ? '/profile' : '/auth'}
            title={user ? user.name : 'ورود / ثبت‌نام'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EED9E0] bg-white/80 text-[#4A2036] transition hover:border-[#6D1344] hover:text-[#6D1344]"
          >
            <User className="h-4 w-4" />
          </Link>

          {/* سبد خرید */}
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#EED9E0] bg-white/80 text-[#4A2036] transition hover:border-[#6D1344] hover:text-[#6D1344]"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6D1344] text-[11px] font-bold text-white">
              {totalItems}
            </span>
          </Link>

          {/* دکمه منوی موبایل */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EED9E0] bg-white text-[#6D1344] lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* منوی کشویی موبایل */}
      {mobileOpen && (
        <div className="border-t border-[#F2DCE3] bg-white px-4 py-4 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در محصولات..."
              className="w-full rounded-full border border-[#EAD4DC] bg-[#FDF8F6] py-2.5 pl-10 pr-4 text-sm outline-none"
            />
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6D1344]" />
          </form>
          <div className="flex flex-col space-y-2.5 text-sm font-semibold">
            <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-[#FDF8F6]">
              خانه
            </Link>
            <Link to="/shop" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-[#FDF8F6]">
              فروشگاه و دسته‌بندی‌ها
            </Link>
            <Link to="/advisor" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-[#FDF8F6]">
              مشاور هوشمند پوست
            </Link>
            <Link to="/compare" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-[#FDF8F6]">
              مقایسه محصولات ({compareIds.length})
            </Link>
            <Link to="/magazine" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-[#FDF8F6]">
              مجله زیبایی
            </Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 hover:bg-[#FDF8F6]">
              تماس با ما
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
