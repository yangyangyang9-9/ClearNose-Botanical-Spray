import { useTranslation } from "react-i18next";
import { Leaf, Info } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INGREDIENT_KEYS = [
  "aloe",
  "eucalyptus",
  "chamomile",
  "menthol",
  "seaSalt",
  "greenTea",
] as const;

export const IngredientsSection = () => {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="ingredients"
      ref={ref}
      className="reveal py-20 md:py-28 bg-gradient-to-b from-brand-50 to-white"
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-brand-100 text-brand-700 text-sm font-medium rounded-full mb-4">
            {t("ingredients.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {t("ingredients.title")}
          </h2>
          <p className="text-gray-600 text-lg">{t("ingredients.subtitle")}</p>
        </div>

        {/* 成分卡片网格 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {INGREDIENT_KEYS.map((key) => (
            <div
              key={key}
              className="group p-6 bg-white rounded-2xl border border-brand-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand-100 to-brand-50 rounded-xl text-brand-600 group-hover:rotate-6 transition-transform">
                  <Leaf className="w-6 h-6" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-display font-semibold text-base text-gray-900 mb-1.5">
                    {t(`ingredients.items.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`ingredients.items.${key}.desc`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 说明 */}
        <p className="mt-10 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5 max-w-xl mx-auto">
          <Info className="w-3.5 h-3.5" />
          {t("ingredients.note")}
        </p>
      </div>
    </section>
  );
};
