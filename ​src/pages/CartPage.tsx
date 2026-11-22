import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const { cart, updateQty, removeFromCart, subtotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="rounded-3xl border border-[#F0DCE3] bg-white p-12 shadow-soft">
          <h1 className="text-xl font-black text-[#6D1344]">سبد خرید شما خالی است</h1>
          <p className="mt-2 text-sm text-[#6F4C5D]">
            محصولات مراقبت پوستی متناسب با نیاز پوستتان را انتخاب کنید.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-full bg-[#6D1344] px-7 py-3 text-xs font-bold text-white"
          >
            رفتن به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8">
        <h1 className="text-2xl font-black text-[#2B1220]">سبد خرید شما</h1>
        {cart.map(({ product, quantity }) => {
          const unit = product.discountPrice ?? product.price;
          return (
            <div
              key={product.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#F0DCE3] bg-white p-4 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="h-20 w-20 rounded-2xl object-cover" />
                <div>
                  <span className="text-[11px] font-bold text-[#9A5B79]">{product.brand}</span>
                  <h3 className="text-sm font-extrabold text-[#2B1220]">{product.name}</h3>
                  <p className="mt-1 text-xs font-bold text-[#6D1344]">
                    {unit.toLocaleString('fa-IR')} تومان
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-[#E5CBD5] px-3 py-1">
                  <button type="button" onClick={() => updateQty(product.id, quantity - 1)} className="px-2 font-bold">
                    -
                  </button>
                  <span className="px-2 text-xs font-bold">{quantity}</span>
                  <button type="button" onClick={() => updateQty(product.id, quantity + 1)} className="px-2 font-bold">
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="text-rose-600 hover:opacity-80"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-4">
        <div className="rounded-3xl border border-[#F0DCE3] bg-white p-6 shadow-glass">
          <h2 className="text-base font-black text-[#2B1220]">خلاصه سفارش</h2>
          <div className="mt-4 space-y-2 border-b border-[#F3E2E8] pb-4 text-xs">
            <div className="flex justify-between">
              <span>جمع کل کالاها:</span>
              <span className="font-bold">{subtotal.toLocaleString('fa-IR')} تومان</span>
            </div>
            <div className="flex justify-between text-emerald-700">
              <span>هزینه ارسال:</span>
              <span className="font-bold">رایگان</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm font-black text-[#6D1344]">
            <span>مبلغ قابل پرداخت:</span>
            <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block w-full rounded-full bg-[#6D1344] py-3.5 text-center text-xs font-bold text-white hover:bg-[#4D0B2F]"
          >
            ادامه و تسویه حساب
          </Link>
        </div>
      </div>
    </div>
  );
};
