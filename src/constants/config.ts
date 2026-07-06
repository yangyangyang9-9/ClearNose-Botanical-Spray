// 全局配置常量

// Stripe 测试支付跳转地址
export const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/test";

// Google Analytics ID 占位（替换后启用）
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

// 倒计时初始小时数（24 小时循环）
export const COUNTDOWN_HOURS = 24;

// 产品图片路径（基于 vite base）
const BASE = import.meta.env.BASE_URL;
export const IMAGES = {
  hero: `${BASE}images/product-hero.jpg`,
  side: `${BASE}images/product-side.jpg`,
  detail: `${BASE}images/product-detail.jpg`,
};

// 埋点工具（GA 启用后生效）
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
  // 开发环境输出日志
  if (import.meta.env.DEV) {
    console.debug("[trackEvent]", eventName, params);
  }
};

// GA 全局声明
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
