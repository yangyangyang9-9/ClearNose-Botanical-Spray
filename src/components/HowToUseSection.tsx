import { useTranslation } from "react-i18next";
import { SprayCan, Timer, Droplet } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  { key: "1", Icon: SprayCan },
  { key: "2", Icon: Timer },
  { key: "3", Icon: Droplet },
] as const;

export const HowToUseSection = () => {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="how-to-use"
      ref={ref}
      className="reveal py-20 md:py-28 bg-white"
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 bg-med-50 text-med-700 text-sm font-medium rounded-full mb-4">
            {t("howToUse.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {t("howToUse.title")}
          </h2>
          <p className="text-gray-600 text-lg">{t("howToUse.subtitle")}</p>
        </div>

        {/* 3 步骤 */}
        <div className="relative grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 连接线 (桌面) */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200" />

          {STEPS.map(({ key, Icon }, idx) => (
            <div key={key} className="relative flex flex-col items-center text-center">
              {/* 步骤编号圆 */}
              <div className="relative z-10 flex items-center justify-center w-24 h-24 bg-white border-2 border-brand-200 rounded-full shadow-card mb-6 hover:border-brand-400 hover:shadow-glow transition-all">
                <Icon className="w-9 h-9 text-brand-600" strokeWidth={1.8} />
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-7 h-7 bg-brand-gradient text-white text-sm font-bold rounded-full shadow-soft">
                  {key}
                </span>
              </div>

              <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">
                {t(`howToUse.steps.${key}.title`)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                {t(`howToUse.steps.${key}.desc`)}
              </p>

              {/* 错位指示器 */}
              <span
                className="hidden md:block mt-4 text-xs font-medium text-brand-400"
                style={{ opacity: 1 - idx * 0.2 }}
              >
                Step {key}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
