import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ShoppingCart, Sparkles, Star } from 'lucide-react';
import { Hero3DScene } from '../components/Hero3DScene';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/articles';
import { SkinConcern, SkinType } from '../types';

const CATEGORIES = [
  {
    slug: 'cleanser',
    title: 'شوینده',
    subtitle: 'پاکیزگی و طراوت پوست',
    bg: 'from-[#F4D8E4] to-[#E6B8CE]',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'serum',
    title: 'سرم پوستی',
    subtitle: 'درمان و جوانسازی پوست',
    bg: 'from-[#F9E8DB] to-[#ECC9B1]',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'moisturizer',
    title: 'آبرسان',
    subtitle: 'رطوبت و شادابی پوست',
    bg: 'from-[#DFEEFA] to-[#B7D7F2]',
    img: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=400&q=80',
  },
  {
    slug: 'sunscreen',
    title: 'ضدآفتاب',
    subtitle: 'محافظت هوشمندانه',
    bg: 'from-[#FCECD8] to-[#F3CFA4]',
    img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=400&q=80',
  },
];

export const HomePage: React.FC = () => {
  const [skinType, setSkinType] = useState<SkinType>('oily');
  const [concern, setConcern] = useState<SkinConcern>('acne');
  const [budget, setBudget] = useState<number>(2500000);

  const recommended = PRODUCTS.filter(
    (p) =>
      p.skinTypes.includes(skinType) &&
      (p.discountPrice ?? p.price) <= budget
  ).slice(0, 3);

  return (
    <div>
      {/* هیرو سکشن سه‌بعدی */}
      <section className="hero-gradient relative overflow-hidden border-b border-[#F0DCE3]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:py-14">
          {/* صحنه سه‌بعدی در سمت راست */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Hero3DScene />
          </div>

          {/* محتوای متنی و CTA در سمت چپ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-1 text-center lg:order-2 lg:col-span-6 lg:text-right"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/70 px-4 py-1.5 text-xs font-bold text-[#6D1344] shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              انتخاب علمی و شخصی‌سازی‌شده پوست
            </span>

            <h1 className="mt-4 text-3xl font-black leading-tight text-[#6D1344] sm:text-4xl lg:text-5xl">
              زیبایی پوستت،
              <span className="mt-1 block text-[#5A0E37]">از انتخاب درست شروع می‌شه</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-[#4E2A3D] sm:text-base lg:mx-0">
              محصولات مراقبت پوستی متناسب با نیاز واقعی پوست تو؛ با بررسی دقیق ترکیبات و مشاوره هوشمند.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
              <Link
                to="/shop"
                className="flex items-center gap-2 rounded-full bg-[#6D1344] px-7 py-3.5 text-sm font-bold text-white shadow-glass transition hover:bg-[#4D0B2F]"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>شروع خرید</span>
              </Link>

              <Link
                to="/advisor"
                className="flex items-center gap-2 rounded-full border border-[#6D1344]/40 bg-white/75 px-6 py-3.5 text-sm font-bold text-[#6D1344] backdrop-blur transition hover:bg-white"
              >
                <Sparkles className="h-4 w-4" />
                <span>مشاور هوشمند انتخاب محصول</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ۴ کارت دسته‌بندی سه‌بعدی */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.slug}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className={`group relative flex h-40 items-center justify-between overflow-hidden rounded-[26px] bg-gradient-to-l ${cat.bg} p-5 shadow-soft`}
              >
                <div className="z-10 max-w-[60%]">
                  <h3 className="text-lg font-black text-[#2B1220]">{cat.title}</h3>
                  <p className="mt-1 text-xs font-medium text-[#523142]">{cat.subtitle}</p>
                  <span className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-[#6D1344] shadow-sm transition group-hover:translate-x-[-4px]">
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                </div>
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="h-28 w-28 rounded-2xl object-cover shadow-md transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* پرفروش‌ترین‌های پوست‌یار */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-0.5 w-8 rounded-full bg-[#D8A8B8]" />
            <h2 className="text-2xl font-black text-[#6D1344]">پرفروش‌ترین‌های پوست‌یار</h2>
            <span className="h-0.5 w-8 rounded-full bg-[#D8A8B8]" />
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-sm font-bold text-[#6D1344] hover:underline"
          >
            <span>مشاهده همه محصولات</span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ویجت تعاملی مشاور هوشمند پوست در صفحه اصلی */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="glass-panel rounded-[32px] p-6 shadow-glass sm:p-10">
          <div className="mb-8 text-center">
            <span className="rounded-full bg-[#F7DDE4] px-3.5 py-1 text-xs font-bold text-[#6D1344]">
              هوش مصنوعی انتخاب روتین
            </span>
            <h2 className="mt-3 text-2xl font-black text-[#2B1220] sm:text-3xl">
              مشاور هوشمند اختصاصی پوست شما
            </h2>
            <p className="mt-2 text-sm text-[#6F4C5D]">
              جنس پوست، دغدغه اصلی و بودجه‌ات را مشخص کن تا بهترین پیشنهادها را ببینی
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#4A2036]">نوع پوست</label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value as SkinType)}
                className="w-full rounded-2xl border border-[#E6CBD5] bg-white px-4 py-3 text-sm font-medium outline-none focus:border-[#6D1344]"
              >
                <option value="oily">چرب و مستعد جوش</option>
                <option value="dry">خشک و دهیدراته</option>
                <option value="combination">مختلط</option>
                <option value="normal">معمولی</option>
                <option value="sensitive">حساس و مستعد قرمزی</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#4A2036]">مشکل پوستی</label>
              <select
                value={concern}
                onChange={(e) => setConcern(e.target.value as SkinConcern)}
                className="w-full rounded-2xl border border-[#E6CBD5] bg-white px-4 py-3 text-sm font-medium outline-none focus:border-[#6D1344]"
              >
                <option value="acne">جوش و منافذ باز</option>
                <option value="spots">لک و تیرگی</option>
                <option value="dryness">خشکی و پوسته‌پوسته شدن</option>
                <option value="redness">قرمزی و التهاب</option>
                <option value="wrinkles">خطوط ریز و چروک</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-[#4A2036]">
                حداکثر بودجه: {budget.toLocaleString('fa-IR')} تومان
              </label>
              <input
                type="range"
                min={600000}
                max={3500000}
                step={100000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="mt-3 w-full accent-[#6D1344]"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {recommended.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/advisor"
              className="inline-flex items-center gap-2 rounded-full bg-[#6D1344] px-6 py-3 text-xs font-bold text-white hover:bg-[#4D0B2F]"
            >
              <span>دریافت برنامه کامل ۴ مرحله‌ای پوست</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* تخفیف‌های ویژه و جدیدترین‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#2B1220]">پیشنهادهای شگفت‌انگیز و منتخب</h2>
          <Link to="/compare" className="text-xs font-bold text-[#6D1344] hover:underline">
            مقایسه تخصصی محصولات ←
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(4, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* برندهای محبوب */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-[#F0DCE3] bg-white/80 p-6 text-center shadow-soft">
          <p className="mb-5 text-xs font-bold text-[#8E6B7C]">برندهای معتبر موجود در پوست‌یار</p>
          <div className="flex flex-wrap items-center justify-around gap-6 text-lg font-black tracking-widest text-[#6D1344]/75">
            <span>CERAVE</span>
            <span>LA ROCHE-POSAY</span>
            <span>VICHY</span>
            <span>THE ORDINARY</span>
            <span>CLINIQUE</span>
            <span>ISDIN</span>
            <span>NEUTROGENA</span>
          </div>
        </div>
      </section>

      {/* مجله تخصصی و نظرات مشتریان */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#2B1220]">مجله زیبایی و سلامت پوست</h2>
          <Link to="/magazine" className="text-xs font-bold text-[#6D1344] hover:underline">
            مشاهده همه مقالات ←
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {ARTICLES.map((art) => (
            <Link
              key={art.id}
              to="/magazine"
              className="group overflow-hidden rounded-3xl border border-[#F0DCE3] bg-white shadow-soft transition hover:-translate-y-1"
            >
              <img src={art.image} alt={art.title} className="h-44 w-full object-cover" />
              <div className="p-5">
                <span className="rounded-full bg-[#F7DDE4] px-3 py-1 text-[11px] font-bold text-[#6D1344]">
                  {art.category}
                </span>
                <h3 className="mt-3 text-base font-extrabold text-[#2B1220] group-hover:text-[#6D1344]">
                  {art.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#6F4C5D]">{art.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* نظرات مشتریان */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              name: 'سارا محمدی',
              skin: 'پوست چرب و مختلط',
              text: 'با مشاور هوشمند پوست‌یار سرم نیاسینامید اوردینری و ضدآفتاب لاروش پوزای رو انتخاب کردم؛ بعد از سه هفته منافذ پوستم فوق‌العاده جمع‌تر شده.',
            },
            {
              name: 'نگار کریمی',
              skin: 'پوست خشک و حساس',
              text: 'بسته‌بندی بسیار لوکس، ارسال سریع و از همه مهم‌تر اطمینان از اصل بودن محصولات. شوینده سراوی دقیقاً همون چیزی بود که دنبالش بودم.',
            },
            {
              name: 'الهام رضایی',
              skin: 'پوست معمولی',
              text: 'قابلیت مقایسه ترکیبات محصولات کمک کرد به جای خرید احساسی، دقیقاً محصولی رو بخرم که بیشترین هیالورونیک اسید رو داره.',
            },
          ].map((rev, idx) => (
            <div key={idx} className="rounded-3xl border border-[#F0DCE3] bg-white p-6 shadow-soft">
              <div className="mb-3 flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs leading-6 text-[#4E2A3D]">«{rev.text}»</p>
              <div className="mt-4 border-t border-[#F6E8ED] pt-3">
                <p className="text-xs font-extrabold text-[#2B1220]">{rev.name}</p>
                <p className="text-[11px] text-[#8E6B7C]">{rev.skin}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
