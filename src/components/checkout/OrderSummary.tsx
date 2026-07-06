import { useTranslation } from "react-i18next";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import {
  PLANS,
  SHIPPING_FEE,
  FREE_SHIPPING_THRESHOLD,
  IMAGES,
} from "@/constants/config";
import { Check, Package, Truck, Shield } from "lucide-react";

export const OrderSummary = () => {
  const { t } = useTranslation();
  const { selectedPlan } = useCheckoutStore();
  const plan = PLANS[selectedPlan];

  const subtotal = plan.price;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 md:p-8 sticky top-24">
      <h2 className="font-display font-bold text-lg text-gray-900 mb-5">
        {t("checkout.orderSummary")}
      </h2>

      {/* 产品行 */}
      <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100">
        <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-brand-50">
          <img
            src={IMAGES.hero}
            alt="ClearNose"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-gray-900">
            {t(plan.nameKey)}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            ClearNose Botanical Spray
          </p>
        </div>
        <span className="font-display font-bold text-gray-900">
          {plan.priceLabel}
        </span>
      </div>

      {/* 价格明细 */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{t("checkout.subtotal")}</span>
          <span className="font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{t("checkout.shipping")}</span>
          <span
            className={`font-medium ${
              shipping === 0 ? "text-brand-600" : "text-gray-900"
            }`}
          >
            {shipping === 0
              ? t("checkout.shippingFree")
              : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* 总计 */}
      <div className="flex items-center justify-between pt-5 mb-6 border-t border-gray-100">
        <span className="font-display font-bold text-gray-900">
          {t("checkout.total")}
        </span>
        <span className="font-display font-extrabold text-2xl text-brand-600">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* 保障图标 */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Truck className="w-4 h-4 text-brand-500" />
          <span>
            {shipping === 0
              ? t("checkout.shippingFree")
              : `Standard shipping (${SHIPPING_FEE.toFixed(2)})`}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Shield className="w-4 h-4 text-brand-500" />
          <span>30-day money-back guarantee</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Package className="w-4 h-4 text-brand-500" />
          <span>Ships within 1-2 business days</span>
        </div>
      </div>
    </div>
  );
};
