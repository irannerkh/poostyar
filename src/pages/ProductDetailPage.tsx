import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, ExternalLink, Heart, Scale, ShoppingCart, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, wishlist, toggleCompare } = useStore();
  const finalPrice = product.discountPrice ?? product.price;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-1 gap-10 rounded-[32px] border border-[#F0DCE3] bg-white p-6 shadow-glass lg:grid-cols-12 lg:p-10">
        <div
          style={{ backgroundColor: product.accentColor }}
          className="flex items-center justify-center rounded-3xl p-8 lg:col-span-5"
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-96 w-full rounded-2xl object-cover shadow-lg"
          />
        </div>

        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#F7DDE4] px-3.5 py-1 text-xs font-bold text-[#6D1344]">
                {product.brand}
              </span>
              <span className="text-xs font-semibold text-[#7A5467]">{product.categoryName}</span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="h-4 w-4 fill-amber-400" /> {product.rating} ({product.reviewsCount} نظر)
              </span>
            </div>

            <h1 className="mt-3 text-2xl font-black text-[#2B1220] sm:text-3xl">{product.name}</h1>
            <p className="mt-4 text-sm leading-7 text-[#5A394A]">{product.description}</p>

            {/* ترکیبات کلیدی */}
            <div className="mt-6">
              <h3 className="text-xs font-extrabold text-[#6D1344]">ترکیبات فعال و کلیدی:</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.keyIngredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-xl border border-[#EAD4DC] bg-[#FDF8F6] px-3 py-1.5 text-xs font-semibold text-[#2B1220]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* ویژگی‌ها */}
            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {product.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-xs font-medium text-[#3D2231]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1E7E48]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-[#F3E2E8] pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                {product.discountPrice && (
                  <span className="block text-sm text-[#9B7285] line-through">
                    {product.price.toLocaleString('fa-IR')} تومان
                  </span>
                )}
                <span className="text-2xl font-black text-[#6D1344]">
                  {finalPrice.toLocaleString('fa-IR')} تومان
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-[#E5CBD5] bg-[#FDF8F6] px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-2 font-bold text-[#6D1344]"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="px-2 font-bold text-[#6D1344]"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product, qty)}
                  className="flex items-center gap-2 rounded-full bg-[#6D1344] px-7 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#4D0B2F]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>افزودن به سبد خرید</span>
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center gap-1.5 rounded-full border border-[#E5CBD5] px-4 py-2 text-xs font-bold text-[#4E2A3D] hover:bg-[#FDF8F6]"
              >
                <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-[#6D1344] text-[#6D1344]' : ''}`} />
                <span>علاقه‌مندی</span>
              </button>

              <button
                type="button"
                onClick={() => toggleCompare(product.id)}
                className="flex items-center gap-1.5 rounded-full border border-[#E5CBD5] px-4 py-2 text-xs font-bold text-[#4E2A3D] hover:bg-[#FDF8F6]"
              >
                <Scale className="h-4 w-4" />
                <span>مقایسه تخصصی</span>
              </button>

              {product.affiliateUrl && (
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="flex items-center gap-1.5 rounded-full bg-[#FDF8F6] px-4 py-2 text-xs font-bold text-[#6D1344] hover:underline"
                >
                  <span>بررسی فروشنده همکار</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-left">
        <Link to="/shop" className="text-xs font-bold text-[#6D1344] hover:underline">
          بازگشت به فروشگاه ←
        </Link>
      </div>
    </div>
  );
};
