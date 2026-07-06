import { useTranslation } from "react-i18next";
import { Leaf, ShieldCheck, CalendarDays, Wind } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { IMAGES } from "@/constants/config";

const FEATURES = [
  { key: "natural", Icon: Leaf },
  { key: "gentle", Icon: ShieldCheck },
  { key: "daily", Icon: CalendarDays },
  { key: "breathing", Icon: Wind },
] as const;

export const ProductSection = () => {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="product"
      ref={ref}
      className="reveal relative py-20 md:py-28 bg-gradient-to-b from-med-50 to-white overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-med-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative grid lg:grid-cols-2 gap-14 items-center">
        {/* 产品图 */}
        <div className="relative order-2 lg:order-1">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-gradient opacity-10 rounded-3xl blur-2xl" />
            <img
              src={IMAGES.side}
              alt="ClearNose Botanical Spray detail"
              className="relative w-full max-w-md mx-auto rounded-3xl shadow-card-hover"
              loading="lazy"
            />
          </div>
        </div>

        {/* 文案 */}
        <div className="order-1 lg:order-2">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-medium rounded-full mb-4">
            {t("product.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4 leading-tight">
            {t("product.title")}
          </h2>
          <p className="text-lg text-brand-600 font-medium mb-6">
            {t("product.subtitle")}
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            {t("product.description")}
          </p>

          {/* 卖点列表 */}
          <div className="grid sm:grid-cols-2 gap-5">
            {FEATURES.map(({ key, Icon }) => (
              <div key={key} className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white border border-brand-100 rounded-xl text-brand-600 shadow-soft">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {t(`product.features.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {t(`product.features.${key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
