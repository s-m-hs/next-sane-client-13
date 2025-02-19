
"use client";

import React, { useState, useEffect } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function RecurringCountdown() {
  const CYCLE_DURATION = 2 * 24 * 60 * 60 * 1000; // ۴۸ ساعت

  const getNextCycleStartTime = () => {
    const now = new Date();
    const nextCycle = new Date(now);

    // تنظیم ساعت روی ۱۰ صبح
    nextCycle.setHours(10, 0, 0, 0);

    // اگر ساعت ۱۰ امروز گذشته، دو روز بعد را انتخاب کن
    if (now.getTime() >= nextCycle.getTime()) {
      nextCycle.setTime(nextCycle.getTime() + CYCLE_DURATION);
    }

    return nextCycle.getTime(); // تبدیل به timestamp
  };

  const [targetTime, setTargetTime] = useState(null); // مقدار اولیه null
  const [mounted, setMounted] = useState(false); // بررسی اینکه آیا کامپوننت در کلاینت رندر شده

  useEffect(() => {
    setTargetTime(getNextCycleStartTime());
    setMounted(true);
  }, []);

  if (!mounted || targetTime === null) {
    return <p>Loading...</p>; // جلوگیری از Hydration Error
  }

  return (
    <FlipClockCountdown
      to={targetTime}
      className="flip-clock"
      renderMap={true}
      showLabels={true}
      showSeparators={false}
      labels={["Hours", "Minutes", "Seconds"]}
    />
  );
}
