// در پروژه واقعی این داده از API سفارشات فروشگاه خوانده می‌شود.

export const orderSteps = [
  { key: "review", label: "بررسی سفارش", icon: "review" },
  { key: "received", label: "دریافت سفارش", icon: "received" },
  { key: "packing", label: "در حال بسته‌بندی", icon: "packing" },
  { key: "shipped", label: "بسته شما ارسال شد", icon: "shipped" },
  { key: "delivered", label: "تحویل داده شد", icon: "delivered" },
];

export const orders = [
  {
    id: "19057",
    buyerName: "علی رضایی",
    destination: "تهران",
    paymentMethod: "پرداخت آنلاین",
    paymentStatus: "موفق",
    submittedDate: "1404/08/20",
    shippedDate: "1404/08/26",
    currentStepIndex: 2, // بسته شما ارسال شد
    orderTrackingCode: "ORD-19057",
    paymentTrackingCode: "PAY-88231",
    postCompany: "پست پیشتاز",
    postTrackingCode: "033860424201530690037111",
    postTrackingUrl: "https://tracking.post.ir/",
    parcelCode: "SANE-19057-TRK",
    items: [
      {
        id: "gm-01",
        name: "کامپیوتر گیمینگ صانع | Core i5 12400F | RTX 4060",
        image: "https://picsum.photos/seed/sane-gm-01/200/200",
        qty: 1,
        price: 46500000,
      },
    ],
    shippingCost: 350000,
    discount: 500000,
  },
];

export function getOrderById(id) {
  return orders.find((o) => o.id === id);
}

export function formatPrice(value) {
  return value?.toLocaleString("en-US").replace(/,/g, ".");
}
