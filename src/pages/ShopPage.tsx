import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { CategorySlug, SkinType } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = (searchParams.get('category') as CategorySlug | 'all') || 'all';
  const [selectedCat, setSelectedCat] = useState<CategorySlug | 'all'>(initialCat);
  const [selectedSkin, setSelectedSkin] = useState<SkinType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const { searchQuery } = useStore();

  const handleCatChange = (cat: CategorySlug | 'all') => {
    setSelectedCat(cat);
    if (cat === 'all') setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = selectedCat === 'all' || p.category === selectedCat;
      const matchSkin = selectedSkin === 'all' || p.skinTypes.includes(selectedSkin);
      const matchQuery =
        !searchQuery.trim() ||
        p.name.includes(searchQuery) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc.includes(searchQuery);
      return matchCat && matchSkin && matchQuery;
    }).sort((a, b) => {
      const priceA = a.discountPrice ?? a.price;
      const priceB = b.discountPrice ?? b.price;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [selectedCat, selectedSkin, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 rounded-3xl bg-gradient-to-l from-[#F7DDE4] to-[#EFE8FA] p-7">
        <h1 className="text-2xl font-black text-[#6D1344] sm:text-3xl">فروشگاه تخصصی پوست‌یار</h1>
        <p className="mt-2 text-sm text-[#4E2A3D]">
          مجموعه‌ای دست‌چین از اصیل‌ترین محصولات مراقبت پوستی جهان
        </p>
      </div>

      {/* نوار فیلترها */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#F0DCE3] bg-white p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-[#6D1344]">
            <SlidersHorizontal className="h-4 w-4" />
            دسته‌بندی:
          </span>
          {[
            { id: 'all', label: 'همه' },
            { id: 'cleanser', label: 'شوینده صورت' },
            { id: 'serum', label: 'سرم پوستی' },
            { id: 'moisturizer', label: 'آبرسان' },
            { id: 'sunscreen', label: 'ضدآفتاب' },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleCatChange(c.id as CategorySlug | 'all')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                selectedCat === c.id
                  ? 'bg-[#6D1344] text-white'
                  : 'bg-[#FDF8F6] text-[#4E2A3D] hover:bg-[#F7DDE4]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedSkin}
            onChange={(e) => setSelectedSkin(e.target.value as SkinType | 'all')}
            className="rounded-xl border border-[#EAD4DC] bg-[#FDF8F6] px-3 py-2 text-xs font-semibold outline-none"
          >
            <option value="all">همه انواع پوست</option>
            <option value="oily">پوست چرب</option>
            <option value="dry">پوست خشک</option>
            <option value="combination">پوست مختلط</option>
            <option value="sensitive">پوست حساس</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'popular' | 'price-asc' | 'price-desc')}
            className="rounded-xl border border-[#EAD4DC] bg-[#FDF8F6] px-3 py-2 text-xs font-semibold outline-none"
          >
            <option value="popular">پرفروش‌ترین</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
          <p className="text-base font-bold text-[#6D1344]">محصولی با این فیلتر یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
