const productsData = [
  {
    id: 1,
    name: "فلوئید ضدآفتاب بی‌رنگ مای (My) مدل Hyaluronic Acid",
    category: "sunscreen",
    categoryLabel: "ضدآفتاب",
    skinTypes: ["oily", "combination", "sensitive"],
    skinLabel: "پوست چرب و مختلط",
    highlight: "بافت فوق‌العاده سبک، بدون رد سفیدی و حاوی هیالورونیک اسید",
    pros: "جذب سریع، عدم ایجاد حس سنگینی و براقیت، قیمت اقتصادی",
    priceRange: "بازه اقتصادی",
    rating: "۹.۲ / ۱۰",
    affiliateUrl: "https://www.digikala.com/search/?q=فلوئید+ضدآفتاب+مای" // لینک افیلیت خود را اینجا بگذارید
  },
  {
    id: 2,
    name: "ژل شستشوی صورت نوتروژینا مدل Hydro Boost",
    category: "cleanser",
    categoryLabel: "شوینده صورت",
    skinTypes: ["dry", "combination", "sensitive"],
    skinLabel: "پوست خشک و نرمال",
    highlight: "پاک‌سازی ملایم بدون ایجاد حس کشیدگی و خشکی بعد از شستشو",
    pros: "فاقد صابون، حفظ رطوبت طبیعی پوست، مناسب مصرف روزانه",
    priceRange: "بازه میان‌رده",
    rating: "۹.۴ / ۱۰",
    affiliateUrl: "https://www.digikala.com/search/?q=ژل+شستشو+نوتروژینا+هیدروبوست"
  },
  {
    id: 3,
    name: "سرم نیاسینامید ۱۰٪ و زینک ۱٪ اوردینری (The Ordinary)",
    category: "serum",
    categoryLabel: "سرم پوستی",
    skinTypes: ["oily", "combination"],
    skinLabel: "پوست چرب و مستعد جوش",
    highlight: "کنترل ترشح چربی، کاهش ظاهر منافذ باز و کمک به کمرنگ شدن جای جوش",
    pros: "فرمولاسیون علمی و متمرکز، فاقد عطر و سیلیکون",
    priceRange: "بازه میان‌رده",
    rating: "۹.۵ / ۱۰",
    affiliateUrl: "https://www.digikala.com/search/?q=سرم+نیاسینامید+اوردینری"
  },
  {
    id: 4,
    name: "کرم آبرسان و مرطوب‌کننده سیمپل (Simple) مدل Hydrating Light",
    category: "moisturizer",
    categoryLabel: "مرطوب‌کننده",
    skinTypes: ["sensitive", "combination", "dry"],
    skinLabel: "پوست حساس و مختلط",
    highlight: "فاقد عطر، الکل و مواد صابونی؛ مناسب پوست‌های حساس و واکنش‌پذیر",
    pros: "بافت سبک، عدم مسدود کردن منافذ، سازگاری بالا با پوست حساس",
    priceRange: "بازه اقتصادی تا میان‌رده",
    rating: "۹.۱ / ۱۰",
    affiliateUrl: "https://www.digikala.com/search/?q=آبرسان+سیمپل+لایت"
  },
  {
    id: 5,
    name: "ژل شستشوی صورت پوست چرب لافارر",
    category: "cleanser",
    categoryLabel: "شوینده صورت",
    skinTypes: ["oily", "combination"],
    skinLabel: "پوست چرب و آکنه‌ای",
    highlight: "تنظیم چربی پوست و کمک به پیشگیری از ایجاد جوش‌های جدید",
    pros: "دسترسی آسان، حجم مناسب، کیفیت رقابتی در برندهای ایرانی",
    priceRange: "بازه اقتصادی",
    rating: "۸.۹ / ۱۰",
    affiliateUrl: "https://www.digikala.com/search/?q=ژل+شستشو+لافارر+پوست+چرب"
  },
  {
    id: 6,
    name: "ضدآفتاب فیوژن واتر ایزدین (ISDIN Fusion Water)",
    category: "sunscreen",
    categoryLabel: "ضدآفتاب",
    skinTypes: ["oily", "dry", "combination", "sensitive"],
    skinLabel: "انواع پوست (حتی دور چشم)",
    highlight: "پایه آب، جذب آنی و بدون ایجاد سوزش در چشم",
    pros: "استاندارد طلایی ضدآفتاب‌های سبک، مناسب زیر آرایش",
    priceRange: "بازه پریمیوم",
    rating: "۹.۷ / ۱۰",
    affiliateUrl: "https://www.digikala.com/search/?q=ضدآفتاب+ایزدین+فیوژن+واتر"
  }
];

function createProductCard(product) {
  return `
    <article class="product-card">
      <div>
        <div class="card-top">
          <span class="pill">${product.categoryLabel} • ${product.skinLabel}</span>
          <span class="score">★ ${product.rating}</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.highlight}</p>
        <div class="pros-box">
          <strong>نقاط قوت کلیدی:</strong> ${product.pros}
        </div>
      </div>
      <div>
        <div class="price-note">سطح قیمت: ${product.priceRange}</div>
        <a href="${product.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener" class="btn btn-buy">
          مشاهده قیمت روز و خرید ←
        </a>
      </div>
    </article>
  `;
}

function renderFilteredProducts() {
  const skinType = document.getElementById("skinType").value;
  const category = document.getElementById("categoryFilter").value;
  const container = document.getElementById("finderResults");

  const filtered = productsData.filter((item) => {
    const matchSkin = skinType === "all" || item.skinTypes.includes(skinType);
    const matchCat = category === "all" || item.category === category;
    return matchSkin && matchCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p>برای این ترکیب فیلتر، محصولی ثبت نشده است. گزینه «همه دسته‌ها» را امتحان کنید.</p>`;
    return;
  }

  container.innerHTML = filtered.map(createProductCard).join("");
}

function renderAllAndTable() {
  const allGrid = document.getElementById("allProductsGrid");
  const tableBody = document.getElementById("comparisonTableBody");

  allGrid.innerHTML = productsData.map(createProductCard).join("");

  tableBody.innerHTML = productsData
    .map(
      (p) => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.categoryLabel}</td>
        <td>${p.skinLabel}</td>
        <td>${p.highlight}</td>
        <td>★ ${p.rating}</td>
        <td>
          <a href="${p.affiliateUrl}" target="_blank" rel="nofollow sponsored noopener" class="table-cta">
            قیمت و خرید
          </a>
        </td>
      </tr>
    `
    )
    .join("");
}

function quickFilter(category) {
  document.getElementById("categoryFilter").value = category;
  renderFilteredProducts();
  document.getElementById("routine-finder").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("findBtn").addEventListener("click", renderFilteredProducts);

// اجرای اولیه هنگام بارگذاری صفحه
renderFilteredProducts();
renderAllAndTable();
