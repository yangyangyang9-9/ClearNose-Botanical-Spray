import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Check, ShoppingBag, Clock, Flame } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountdown } from "@/hooks/useCountdown";
import { trackEvent, type PlanId } from "@/constants/config";

const PLAN_KEYS: PlanId[] = ["single", "bundle"];

export const PricingSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useScrollReveal<HTMLElement>();
  const { hours, minutes, seconds } = useCountdown();

  const handleBuyNow = (plan: PlanId) => {
    trackEvent("buy_now_click", { source: "pricing", plan });
    navigate(`/checkout?plan=${plan}`);
  };

  return (
    <section
      id="pricing"
      ref={ref}
      className="reveal relative py-20 md:py-28 bg-gradient-to-b from-brand-50 to-white overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-4">
            <Flame className="w-3.5 h-3.5" />
            {t("pricing.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-gray-600 text-lg">{t("pricing.subtitle")}</p>
        </div>

        {/* 倒计时 */}
        <div className="flex flex-col items-center justify-center gap-2 mb-12">
          <p className="text-sm text-gray-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-500" />
            {t("pricing.countdownLabel")}
          </p>
          <div className="flex items-center gap-2">
            {[
              { value: hours, label: "H" },
              { value: minutes, label: "M" },
              { value: seconds, label: "S" },
            ].map((unit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-white border border-brand-200 rounded-xl shadow-soft font-display font-bold text-xl text-gray-900 tabular-nums">
                    {unit.value}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 font-medium">
                    {unit.label}
                  </span>
                </div>
                {idx < 2 && (
                  <span className="font-bold text-brand-300 text-xl">:</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 价格卡片 */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
          {PLAN_KEYS.map((planKey) => {
            const isPopular = planKey === "bundle";
            const features = t(`pricing.plans.${planKey}.features`, {
              returnObjects: true,
            }) as unknown as string[];

            return (
              <div
                key={planKey}
                className={`relative flex flex-col p-7 bg-white rounded-3xl border-2 transition-all duration-300 ${
                  isPopular
                    ? "border-brand-400 shadow-card-hover md:scale-105 lg:scale-110"
                    : "border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1"
                }`}
              >
                {/* 推荐徽章 */}
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-gradient text-white text-xs font-semibold rounded-full shadow-glow whitespace-nowrap">
                    {t(`pricing.plans.${planKey}.badge`)}
                  </span>
                )}

                <div className="mb-5">
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-2">
                    {t(`pricing.plans.${planKey}.name`)}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {t(`pricing.plans.${planKey}.desc`)}
                  </p>
                </div>

                {/* 价格 */}
                <div className="mb-6">
                  <span className="font-display font-extrabold text-4xl text-gray-900">
                    {t(`pricing.plans.${planKey}.price`)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    {t(`pricing.plans.${planKey}.period`)}
                  </span>
                </div>

                {/* 功能列表 */}
                <ul className="flex-1 flex flex-col gap-3 mb-7">
                  {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5 ${
                          isPopular ? "bg-brand-100" : "bg-gray-100"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            isPopular ? "text-brand-600" : "text-gray-500"
                          }`}
                          strokeWidth={3}
                        />
                      </span>
                      <span className="text-sm text-gray-700">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleBuyNow(planKey)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold rounded-full transition-all ${
                    isPopular
                      ? "bg-brand-gradient text-white shadow-glow hover:scale-105"
                      : "bg-white text-brand-700 border-2 border-brand-200 hover:border-brand-400 hover:bg-brand-50"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t(`pricing.plans.${planKey}.cta`)}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
