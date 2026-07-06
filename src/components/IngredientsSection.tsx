import { useTranslation } from "react-i18next";
import { Flower2, Sprout, Leaf, Info } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const INGREDIENTS = [
  { key: "magnolia", Icon: Flower2 },
  { key: "sweetFlag", Icon: Sprout },
  { key: "atractylodes", Icon: Leaf },
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
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {INGREDIENTS.map(({ key, Icon }) => (
            <div
              key={key}
              className="group p-7 bg-white rounded-2xl border border-brand-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <span className="flex items-center justify-center w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl text-brand-600 group-hover:rotate-6 transition-transform">
                <Icon className="w-8 h-8" strokeWidth={1.8} />
              </span>
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">
                {t(`ingredients.items.${key}.title`)}
              </h3>
              <p className="text-xs text-brand-500 font-medium mb-3">
                {t(`ingredients.items.${key}.subtitle`)}
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t(`ingredients.items.${key}.desc`)}
              </p>
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
