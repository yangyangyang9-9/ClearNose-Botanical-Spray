import { useTranslation } from "react-i18next";
import { Wind, Droplets, Flower2, Moon } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PROBLEM_KEYS = [
  { key: "congestion", Icon: Wind },
  { key: "runnyNose", Icon: Droplets },
  { key: "allergies", Icon: Flower2 },
  { key: "nightBreathing", Icon: Moon },
] as const;

export const ProblemSection = () => {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="problem"
      ref={ref}
      className="reveal py-20 md:py-28 bg-white"
    >
      <div className="container">
        {/* 标题 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-4">
            {t("problem.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {t("problem.title")}
          </h2>
          <p className="text-gray-600 text-lg">{t("problem.subtitle")}</p>
        </div>

        {/* 2x2 网格 */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PROBLEM_KEYS.map(({ key, Icon }, idx) => (
            <div
              key={key}
              className="group p-7 bg-white border border-gray-100 rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-start gap-5">
                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl text-red-500 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                    {t(`problem.items.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`problem.items.${key}.desc`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
