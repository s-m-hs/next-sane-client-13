// "use client";

// import React, { useState, useEffect } from "react";
// import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
// import "@leenguyen/react-flip-clock-countdown/dist/index.css";


// export default function RecurringCountdown() {
//   const CYCLE_DURATION = 2 * 24 * 60 * 60 * 1000; // مدت زمان هر سیکل (۲ روز)
  
//   const [targetTime, setTargetTime] = useState(null); // مقدار اولیه null

//   useEffect(() => {
//     // محاسبه زمان شروع سیکل بعدی
//     const getNextCycleStartTime = () => {
//       const currentTime = Date.now();
//       return Math.floor(currentTime / CYCLE_DURATION) * CYCLE_DURATION + CYCLE_DURATION;
//     };

//     setTargetTime(getNextCycleStartTime());

//     const interval = setInterval(() => {
//       setTargetTime(getNextCycleStartTime());
//     }, CYCLE_DURATION); // هر دو روز یک بار مقدار تغییر کند

//     return () => clearInterval(interval);
//   }, []);

//   if (targetTime === null) {
//     return <p>Loading...</p>; // جلوگیری از خطای Hydration
//   }

//   return <FlipClockCountdown to={targetTime} className='flip-clock'
//   renderMap={true}
//   showLabels={true}
//   showSeparators={false}	
//   labels={['Hours', 'Minutes', 'Seconds']}

  
//   // labelStyle={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' }}
//   // digitBlockStyle={{ width: 20, height: 20, fontSize: 20 }}
//   // dividerStyle={{ color: 'white', height: 1 }}
//   // separatorStyle={{ color: 'red', size: '6px' }}
//   />;
// }
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
