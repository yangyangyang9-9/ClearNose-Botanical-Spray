import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Leaf } from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { PayPalPayment } from "@/components/checkout/PayPalPayment";
import { PLANS, IMAGES, type PlanId } from "@/constants/config";

const isPlanId = (v: string | null): v is PlanId =>
  v === "single" || v === "bundle" || v === "subscription";

const ProcessingState = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-6" />
      <h2 className="font-display font-bold text-xl text-gray-900 mb-2">
        {t("checkout.processing")}
      </h2>
    </div>
  );
};

const SuccessState = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { orderResult, selectedPlan, reset } = useCheckoutStore();
  const plan = PLANS[selectedPlan];
  const subtotal = plan.price;
  const total = subtotal >= 30 ? subtotal : subtotal + 4.99;

  return (
    <div className="container max-w-2xl py-20">
      <div className="bg-white rounded-3xl border border-brand-100 shadow-card-hover p-8 md:p-12 text-center">
        <div className="flex items-center justify-center w-20 h-20 bg-brand-100 rounded-full mb-6 mx-auto">
          <CheckCircle2 className="w-12 h-12 text-brand-600" strokeWidth={2} />
        </div>
        <h1 className="font-display font-extrabold text-3xl text-gray-900 mb-3">
          {t("checkout.success.title")}
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {t("checkout.success.message")}
        </p>

        <div className="bg-brand-50 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-brand-100">
            <span className="text-sm text-gray-500">
              {t("checkout.success.orderNumber")}
            </span>
            <span className="font-mono font-semibold text-sm text-gray-900">
              {orderResult?.orderID || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-brand-100">
            <span className="text-sm text-gray-500">
              {t("checkout.success.payer")}
            </span>
            <span className="font-medium text-sm text-gray-900">
              {orderResult?.payerName || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {t("checkout.success.amount")}
            </span>
            <span className="font-display font-bold text-brand-600">
              ${total.toFixed(2)} USD
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            reset();
            navigate("/");
          }}
          className="inline-flex items-center gap-2 px-7 py-3 bg-brand-gradient text-white font-semibold rounded-full shadow-glow hover:scale-105 transition-all"
        >
          {t("checkout.success.backHome")}
        </button>
      </div>
    </div>
  );
};

const ErrorState = () => {
  const { t } = useTranslation();
  const { errorMessage, reset } = useCheckoutStore();
  return (
    <div className="container max-w-2xl py-20">
      <div className="bg-white rounded-3xl border border-red-100 shadow-card p-8 md:p-12 text-center">
        <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6 mx-auto">
          <XCircle className="w-12 h-12 text-red-500" strokeWidth={2} />
        </div>
        <h1 className="font-display font-extrabold text-3xl text-gray-900 mb-3">
          {t("checkout.error.title")}
        </h1>
        <p className="text-gray-600 mb-6">{t("checkout.error.message")}</p>
        {errorMessage && (
          <p className="text-xs text-red-400 bg-red-50 rounded-lg px-4 py-2 mb-6 inline-block">
            {errorMessage}
          </p>
        )}
        <div>
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-7 py-3 bg-brand-gradient text-white font-semibold rounded-full shadow-glow hover:scale-105 transition-all"
          >
            {t("checkout.error.retry")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Checkout = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { status, setPlan } = useCheckoutStore();
  const { lang } = useLanguageStore();

  // 从 URL 读取套餐参数
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam && isPlanId(planParam)) {
      setPlan(planParam);
    }
  }, [searchParams, setPlan]);

  // 成功/错误/处理中状态
  if (status === "success") return <SuccessState />;
  if (status === "error") return <ErrorState />;
  if (status === "processing") return <ProcessingState />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white pt-24 pb-20">
      <div className="container">
        {/* 顶部返回 + 标题 */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("checkout.backHome")}
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-gradient shadow-glow">
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold text-gray-900">
              ClearNose
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 mb-2">
            {t("checkout.title")}
          </h1>
          <p className="text-gray-600">{t("checkout.subtitle")}</p>
        </div>

        {/* 双栏布局 */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* 左侧：地址 + 支付 */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <ShippingForm />
            <PayPalPayment />
          </div>
          {/* 右侧：订单摘要 */}
          <div className="lg:col-span-2">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};
