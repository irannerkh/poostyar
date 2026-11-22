import React from 'react';
import { ARTICLES } from '../data/articles';

export const MagazinePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-black text-[#6D1344] sm:text-3xl">مجله تخصصی زیبایی پوست‌یار</h1>
      <p className="mt-2 text-sm text-[#6F4C5D]">
        مقالات علمی، بررسی ترکیبات و راهنمای انتخاب هوشمند محصولات پوستی
      </p>

      <div className="mt-8 space-y-8">
        {ARTICLES.map((art) => (
          <article
            key={art.id}
            className="overflow-hidden rounded-3xl border border-[#F0DCE3] bg-white shadow-soft"
          >
            <img src={art.image} alt={art.title} className="h-64 w-full object-cover" />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs font-bold text-[#9A5B79]">
                <span>{art.category}</span>
                <span>•</span>
                <span>{art.readTime}</span>
              </div>
              <h2 className="mt-2 text-xl font-black text-[#2B1220]">{art.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#4E2A3D]">
                {art.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
