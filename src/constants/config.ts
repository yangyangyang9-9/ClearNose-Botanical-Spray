// 全局配置常量

// PayPal Client ID（公开标识符，从前端环境变量读取）
// 注意：Secret 密钥绝不能放在前端，仅限服务端使用
export const PAYPAL_CLIENT_ID =
  import.meta.env.VITE_PAYPAL_CLIENT_ID || "test";

// PayPal 货币
export const PAYPAL_CURRENCY = "USD";

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

// 套餐类型
export type PlanId = "single" | "bundle";

// 套餐定价数据（与 i18n 配合使用）
export interface PlanConfig {
  id: PlanId;
  price: number; // 金额（数字，用于 PayPal）
  priceLabel: string; // 显示价格
  nameKey: string; // i18n key
}

export const PLANS: Record<PlanId, PlanConfig> = {
  single: {
    id: "single",
    price: 19.99,
    priceLabel: "$19.99",
    nameKey: "pricing.plans.single.name",
  },
  bundle: {
    id: "bundle",
    price: 49.99,
    priceLabel: "$49.99",
    nameKey: "pricing.plans.bundle.name",
  },
};

// 免运费门槛
export const FREE_SHIPPING_THRESHOLD = 30;
// 单瓶运费
export const SHIPPING_FEE = 4.99;

// 埋点工具（GA 启用后生效）
export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
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
