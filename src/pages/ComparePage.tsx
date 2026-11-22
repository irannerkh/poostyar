import React from 'react';
import { Trash2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

const SKIN_LABELS: Record<string, string> = {
  dry: 'خشک',
  oily: 'چرب',
  combination: 'مختلط',
  normal: 'معمولی',
  sensitive: 'حساس',
};

export const ComparePage: React.FC = () => {
  const { compareIds, toggleCompare, addToCart } = useStore();
  const comparedProducts = PRODUCTS.filter((p) => compareIds.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#6D1344]">مقایسه تخصصی محصولات</h1>
          <p className="mt-1 text-xs text-[#6F4C5D]">
            حداکثر ۴ محصول را همزمان از نظر ترکیبات، حجم، نوع پوست و قیمت مقایسه کنید
          </p>
        </div>

        <select
          onChange={(e) => {
            if (e.target.value) toggleCompare(e.target.value);
            e.target.value = '';
          }}
          className="rounded-full border border-[#E5CBD5] bg-white px-4 py-2.5 text-xs font-bold text-[#2B1220] outline-none"
        >
          <option value="">+ افزودن محصول به جدول مقایسه</option>
          {PRODUCTS.filter((p) => !compareIds.includes(p.id)).map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.brand})
            </option>
          ))}
        </select>
      </div>

      {comparedProducts.length === 0 ? (
        <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
          <p className="text-sm font-bold text-[#6D1344]">
            هنوز محصولی برای مقایسه انتخاب نکرده‌اید.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-[#F0DCE3] bg-white shadow-glass">
          <table className="w-full min-w-[700px] border-collapse text-right text-sm">
            <thead>
              <tr className="border-b border-[#F2E0E7] bg-[#FDF8F6]">
                <th className="w-44 p-4 font-extrabold text-[#6D1344]">شاخص مقایسه</th>
                {comparedProducts.map((p) => (
                  <th key={p.id} className="p-4">
                    <div className="flex flex-col items-center text-center">
                      <img src={p.image} alt={p.name} className="h-24 w-24 rounded-2xl object-cover" />
                      <span className="mt-2 text-xs font-bold text-[#9A5B79]">{p.brand}</span>
                      <span className="text-sm font-black text-[#2B1220]">{p.name}</span>
                      <button
                        type="button"
                        onClick={() => toggleCompare(p.id)}
                        className="mt-2 flex items-center gap-1 text-[11px] text-rose-600 hover:underline"
                      >
                        <Trash2 className="h-3 w-3" /> حذف
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4E6EC] text-xs">
              <tr>
                <td className="p-4 font-bold text-[#4E2A3D]">قیمت نهایی</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center font-black text-[#6D1344]">
                    {(p.discountPrice ?? p.price).toLocaleString('fa-IR')} تومان
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#4E2A3D]">ترکیبات اصلی</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center leading-6">
                    {p.keyIngredients.join(' • ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#4E2A3D]">نوع پوست مناسب</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    {p.skinTypes.map((s) => SKIN_LABELS[s]).join('، ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#4E2A3D]">حجم محصول</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center font-semibold">
                    {p.volume}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#4E2A3D]">ویژگی‌های شاخص</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center leading-6">
                    {p.features.join(' | ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#4E2A3D]">امتیاز تخصصی</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center font-black text-amber-600">
                    ★ {p.rating} / 5
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-bold text-[#4E2A3D]">اقدام</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="rounded-full bg-[#6D1344] px-5 py-2 text-xs font-bold text-white hover:bg-[#4D0B2F]"
                    >
                      افزودن به سبد
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
