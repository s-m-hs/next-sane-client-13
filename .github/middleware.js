import { NextResponse } from "next/server";

export function middleware(req) {
  const loginToken = req.cookies.get("logintoken");

  // اگر توکن در کوکی نبود، باید آن را از کلاینت دریافت کنیم
  if (!loginToken) {
    const newToken = req.headers.get("x-login-token"); // توکنی که از کلاینت ارسال می‌شود

    if (newToken) {
      const res = NextResponse.next();
      res.cookies.set("logintoken", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      return res;
    }
  }

  return NextResponse.next();
}

// اعمال Middleware برای تمام مسیرها
export const config = {
  matcher: "/api/:path*", // فقط روی API ها اعمال شود
};
