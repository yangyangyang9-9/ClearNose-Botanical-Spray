import { useTranslation } from "react-i18next";
import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const REVIEW_IDS = ["1", "2", "3", "4", "5", "6"] as const;

// 演示头像：使用首字母 + 渐变背景
const AVATAR_COLORS = [
  "from-brand-400 to-brand-600",
  "from-med-400 to-med-600",
  "from-brand-500 to-med-500",
  "from-med-500 to-brand-500",
  "from-brand-600 to-med-400",
  "from-med-600 to-brand-400",
];

export const ReviewsSection = () => {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="reviews"
      ref={ref}
      className="reveal py-20 md:py-28 bg-white"
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-medium rounded-full mb-4">
            {t("reviews.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {t("reviews.title")}
          </h2>
          <p className="text-gray-600 text-lg">{t("reviews.subtitle")}</p>
        </div>

        {/* 评价网格 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {REVIEW_IDS.map((id, idx) => {
            const rating = t(`reviews.items.${id}.rating`, { returnObjects: true }) as unknown as number;
            const name = t(`reviews.items.${id}.name`);
            const initial = String(name).charAt(0);

            return (
              <article
                key={id}
                className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <Quote className="absolute top-5 right-5 w-8 h-8 text-brand-100" />

                {/* 评分 */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Number(rating)
                          ? "fill-brand-500 text-brand-500"
                          : "fill-gray-100 text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* 评价文字 */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 relative z-10">
                  "{t(`reviews.items.${id}.text`)}"
                </p>

                {/* 用户信息 */}
                <div className="flex items-center gap-3">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} text-white font-semibold text-sm shadow-soft`}
                  >
                    {initial}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">
                      {name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t(`reviews.items.${id}.role`)}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Demo 标注 */}
        <p className="mt-10 text-center text-xs text-gray-400 italic">
          * {t("reviews.demoNote")}
        </p>
      </div>
    </section>
  );
};
