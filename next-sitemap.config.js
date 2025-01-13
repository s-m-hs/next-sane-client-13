/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://sanecomputer.com', // آدرس دامنه اصلی سایت شما
    generateRobotsTxt: true, // فایل robots.txt هم تولید می‌شود
    sitemapSize: 5000, // تعداد لینک‌ها در هر فایل سایت‌مپ
  };
  
  module.exports = config;
  