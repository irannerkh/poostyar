import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Scale, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, toggleCompare, compareIds } = useStore();
  const isFav = wishlist.includes(product.id);
  const isCompared = compareIds.includes(product.id);
  const finalPrice = product.discountPrice ?? product.price;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-[#F0DCE3] bg-white p-4 shadow-soft transition-shadow hover:shadow-glass sm:p-5"
    >
      {/* دکمه‌های علاقه‌مندی و مقایسه */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label="علاقه‌مندی"
          className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
            isFav
              ? 'border-[#6D1344] bg-[#6D1344] text-white'
              : 'border-[#EED9E0] bg-white/85 text-[#6D1344] hover:bg-[#F7DDE4]'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        <button
          type="button"
          onClick={() => toggleCompare(product.id)}
          aria-label="افزودن به مقایسه"
          title="مقایسه محصول"
          className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition ${
            isCompared
              ? 'border-[#D4AF37] bg-[#D4AF37] text-white'
              : 'border-[#EED9E0] bg-white/85 text-[#5D374A] hover:bg-[#F7DDE4]'
          }`}
        >
          <Scale className="h-4 w-4" />
        </button>
      </div>

      {/* بج وضعیت */}
      {product.badge && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-[#6D1344]/90 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
          {product.badge}
        </span>
      )}

      {/* تصویر محصول */}
      <Link
        to={`/product/${product.id}`}
        style={{ backgroundColor: product.accentColor }}
        className="relative mb-4 flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* جزئیات متنی */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A5B79]">
            {product.brand}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="mt-0.5 text-base font-extrabold text-[#2B1220] transition group-hover:text-[#6D1344]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-[#6F4C5D]">{product.shortDesc}</p>

          {/* امتیاز کاربران */}
          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-[#2B1220]">{product.rating}</span>
            <span className="text-[#8E6B7C]">({product.reviewsCount} نظر)</span>
          </div>
        </div>

        {/* قیمت و دکمه خرید */}
        <div className="mt-4 border-t border-[#F6E8ED] pt-3">
          <div className="mb-3 flex items-baseline justify-between">
            <div>
              {product.discountPrice && (
                <span className="block text-xs text-[#A38192] line-through">
                  {product.price.toLocaleString('fa-IR')} تومان
                </span>
              )}
              <span className="text-base font-black text-[#2B1220]">
                {finalPrice.toLocaleString('fa-IR')}{' '}
                <span className="text-xs font-semibold text-[#6F4C5D]">تومان</span>
              </span>
            </div>
            <span className="rounded-lg bg-[#FDF8F6] px-2 py-1 text-[11px] font-medium text-[#7A5467]">
              {product.volume}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6D1344] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#4D0B2F] active:scale-[0.98]"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>افزودن به سبد</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
