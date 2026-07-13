// در پروژه واقعی این داده‌ها از API/دیتابیس فروشگاه صانع خوانده می‌شود.
// ساختار به‌گونه‌ای طراحی شده که با ستون‌های فاکتور فعلی سایت (MAIN, CPU, RAM, ...) همخوانی داشته باشد.

export const categories = [
  {
    slug: "Gaming",
    title: "کامپیوتر گیمینگ",
    description: "سیستم‌های آماده برای اجرای روان جدیدترین بازی‌ها",
    icon: "Gaming",
  },
  {
    slug: "Official",
    title: "کامپیوتر اداری",
    description: "مناسب کارهای روزمره، اداری و آموزشی",
    icon: "Official",
  },
  {
    slug: "Programming",
    title: "مهندسی و برنامه نویسی",
    description: "برای ترید، مدل‌سازی سه‌بعدی و رندر سنگین",
    icon: "Programming",
  },
  {
    slug: "Home",
    title: "خانگی-آموزشی",
    description: "کم‌حجم، بی‌صدا و مناسب فضای محدود",
    icon: "Home",
  },
  {
    slug: "Design",
    title: "طراحی -تولید محتوا",
    description: "مناسب جهت تولید محتوا ،ویرایش ،تدوین و ...",
    icon: "Design",
  },
];

export const products = [
  {
    id: "gm-01",
    slug: "sane-gaming-i5-rtx4060",
    name: "کامپیوتر گیمینگ صانع | Core i5 12400F | RTX 4060",
    category: "gaming",
    price: 46500000,
    oldPrice: 49900000,
    available: true,
    rating: 4.8,
    reviews: 36,
    image: "",
    gallery: [

    ],
    shortSpecs: { cpu: "Core i5 12400F", gpu: "RTX 4060 8G", ram: "16GB 3200", storage: "1TB NVMe" },
    description:
      "یک سیستم متعادل برای گیمرهایی که می‌خواهند بازی‌های روز را با کیفیت بالا و فریم‌ریت پایدار روی 1440p تجربه کنند. خنک‌کاری هوشمند و کیس با جریان هوای مناسب، عملکرد بلندمدت را تضمین می‌کند.",
    fullReview:
      "در تست‌های داخلی، این سیستم روی رزولوشن 1440p در اکثر بازی‌های روز فریم‌ریت پایدار بالای 60 ارائه می‌دهد و در عناوین سبک‌تر به‌راحتی به بیش از 100 فریم می‌رسد. ترکیب Core i5 12400F و RTX 4060 برای این رده قیمتی گلوگاه پردازشی محسوسی ندارد و SSD ان‌وی‌ام‌ای، زمان لود بازی‌ها را به‌شدت کاهش می‌دهد. جریان هوای کیس و خنک‌کننده هوایی، دما را در بارهای طولانی‌مدت در محدوده امن نگه می‌دارد. جمع‌بندی: انتخابی هوشمندانه برای گیمرهایی که به دنبال بهترین نسبت قیمت به عملکرد روی 1440p هستند.",
    fullSpecs: [
      { label: "MAIN", value: "Gigabyte B760M DS3H" },
      { label: "CPU", value: "Intel Core i5 12400F" },
      { label: "RAM", value: "Corsair 16G 3200MHz" },
      { label: "GRAPHIC", value: "Gigabyte RTX 4060 8G" },
      { label: "SSD", value: "Lexar NM620 1TB NVMe" },
      { label: "HDD", value: "—" },
      { label: "POWER", value: "Green GP600A-M 600W" },
      { label: "CASE", value: "Green Ava RGB" },
      { label: "COOLING", value: "Air Cooler + 3 فن کیس" },
      { label: "MONITOR", value: "—" },
      { label: "KEY & MOUSE", value: "کیبورد و ماوس گیمینگ" },
      { label: "OTHER", value: "ویندوز اورجینال + آنتی‌ویروس" },
    ],
  },

];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug) {
  if (!slug || slug === "all") return products;
  return products.filter((p) => p.category === slug);
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(value) {
  return value?.toLocaleString("en-US").replace(/,/g, ".");
}
