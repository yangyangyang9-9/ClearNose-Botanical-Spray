import emailjs from "@emailjs/browser";
import type { ShippingAddress, OrderResult } from "@/store/useCheckoutStore";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  PLANS,
  SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
  trackEvent,
} from "@/constants/config";
import type { PlanId } from "@/constants/config";

interface OrderEmailData {
  orderResult: OrderResult;
  shippingAddress: ShippingAddress;
  selectedPlan: PlanId;
  total: number;
}

/**
 * 支付成功后发送订单通知邮件
 * 使用 EmailJS 前端直发，无需后端
 */
export const sendOrderNotificationEmail = async ({
  orderResult,
  shippingAddress,
  selectedPlan,
  total,
}: OrderEmailData): Promise<boolean> => {
  // 如果 EmailJS 未配置，跳过（开发环境）
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY ||
    EMAILJS_SERVICE_ID === "your_service_id"
  ) {
    console.warn("[EmailJS] 未配置环境变量，跳过邮件发送");
    return false;
  }

  const plan = PLANS[selectedPlan];
  const now = new Date();
  const orderDate = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  // 组装地址文本
  const fullAddress = [
    shippingAddress.addressLine1,
    shippingAddress.addressLine2,
    `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}`,
    shippingAddress.country,
  ]
    .filter(Boolean)
    .join("\n");

  const templateParams = {
    order_id: orderResult.orderID,
    order_date: orderDate,
    plan_name: plan.id,
    amount: `$${total.toFixed(2)} USD`,
    // PayPal 支付人信息
    payer_name: orderResult.payerName || shippingAddress.fullName,
    payer_email: orderResult.payerEmail || shippingAddress.email,
    // 配送地址
    customer_name: shippingAddress.fullName,
    customer_email: shippingAddress.email,
    customer_phone: shippingAddress.phone,
    address_line1: shippingAddress.addressLine1,
    address_line2: shippingAddress.addressLine2 || "—",
    city: shippingAddress.city,
    state: shippingAddress.state,
    postal_code: shippingAddress.postalCode,
    country: shippingAddress.country,
    full_address: fullAddress,
  };

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      { publicKey: EMAILJS_PUBLIC_KEY }
    );
    trackEvent("order_email_sent", { order_id: orderResult.orderID });
    return true;
  } catch (err) {
    console.error("[EmailJS] 邮件发送失败:", err);
    trackEvent("order_email_error", { error: String(err) });
    return false;
  }
};
