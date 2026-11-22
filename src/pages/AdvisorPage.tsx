import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategorySlug, SkinConcern, SkinType } from '../types';

export const AdvisorPage: React.FC = () => {
  const [skinType, setSkinType] = useState<SkinType>('oily');
  const [concern, setConcern] = useState<SkinConcern>('acne');
  const [category, setCategory] = useState<CategorySlug | 'all'>('all');
  const [budget, setBudget] = useState<number>(3000000);

  const results = PRODUCTS.filter((p) => {
    const matchSkin = p.skinTypes.includes(skinType);
    const matchConcern = p.concerns.includes(concern);
    const matchCat = category === 'all' || p.category === category;
    const matchPrice = (p.discountPrice ?? p.price) <= budget;
    return matchSkin && matchCat && matchPrice && (matchConcern || matchSkin);
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="glass-panel rounded-[32px] p-6 shadow-glass sm:p-10">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7DDE4] px-4 py-1 text-xs font-bold text-[#6D1344]">
            <Sparkles className="h-3.5 w-3.5" /> مشاور هوشمند انتخاب محصول
          </span>
          <h1 className="mt-3 text-2xl font-black text-[#2B1220] sm:text-3xl">
            آنالیز دقیق نیاز پوستی شما
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-xs font-bold text-[#4A2036]">۱. نوع پوست</label>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value as SkinType)}
              className="w-full rounded-2xl border border-[#E5CBD5] bg-white p-3.5 text-sm font-semibold outline-none"
            >
              <option value="dry">خشک</option>
              <option value="oily">چرب</option>
              <option value="combination">مختلط</option>
              <option value="normal">معمولی</option>
              <option value="sensitive">حساس</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-[#4A2036]">۲. مشکل اصلی پوست</label>
            <select
              value={concern}
              onChange={(e) => setConcern(e.target.value as SkinConcern)}
              className="w-full rounded-2xl border border-[#E5CBD5] bg-white p-3.5 text-sm font-semibold outline-none"
            >
              <option value="acne">جوش</option>
              <option value="spots">لک</option>
              <option value="dryness">خشکی</option>
              <option value="redness">قرمزی</option>
              <option value="wrinkles">چین‌وچروک</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-[#4A2036]">۳. نوع محصول</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategorySlug | 'all')}
              className="w-full rounded-2xl border border-[#E5CBD5] bg-white p-3.5 text-sm font-semibold outline-none"
            >
              <option value="all">پکیج کامل روتین</option>
              <option value="cleanser">شوینده صورت</option>
              <option value="serum">سرم پوستی</option>
              <option value="moisturizer">آبرسان</option>
              <option value="sunscreen">ضدآفتاب</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold text-[#4A2036]">
              ۴. سقف بودجه: {budget.toLocaleString('fa-IR')} تومان
            </label>
            <input
              type="range"
              min={600000}
              max={3500000}
              step={100000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="mt-4 w-full accent-[#6D1344]"
            />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-lg font-extrabold text-[#6D1344]">
            محصولات پیشنهادی برای شما ({results.length} مورد):
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
