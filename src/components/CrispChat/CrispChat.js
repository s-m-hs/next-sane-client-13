"use client";

import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "927dcc87-4843-4780-b81c-2c7df0778d64"; // شناسه وب‌سایت Crisp خود را وارد کنید

    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  return null; // این کامپوننت فقط اسکریپت را بارگذاری می‌کند و نیازی به رندر UI ندارد
};

export default CrispChat;
