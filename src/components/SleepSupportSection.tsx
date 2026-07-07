import { useTranslation } from "react-i18next";
import { Moon, Wind, Sparkles, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BENEFITS = [
  { key: "breathe", Icon: Wind },
  { key: "sleep", Icon: Moon },
  { key: "natural", Icon: Sparkles },
] as const;

export const SleepSupportSection = () => {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      id="sleep-support"
      ref={ref}
      className="reveal py-20 md:py-28 bg-gradient-to-b from-white via-indigo-50/40 to-white"
    >
      <div className="container">
        {/* 标题区 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full mb-4">
            <Moon className="w-3.5 h-3.5" />
            {t("sleepSupport.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {t("sleepSupport.title")}
          </h2>
          <p className="text-gray-600 text-lg">{t("sleepSupport.subtitle")}</p>
        </div>

        {/* 主内容：左图右文 */}
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto mb-14">
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 p-8 flex items-center justify-center">
              <Moon className="w-32 h-32 text-indigo-400" strokeWidth={1.2} />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-card px-5 py-3 flex items-center gap-2">
              <span className="text-2xl">🌙</span>
              <div>
                <div className="text-xs text-gray-400">{t("sleepSupport.cardLabel")}</div>
                <div className="font-semibold text-gray-900">{t("sleepSupport.cardValue")}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-xl text-gray-900 mb-4">
              {t("sleepSupport.heading")}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t("sleepSupport.description")}
            </p>

            <div className="space-y-4">
              {BENEFITS.map(({ key, Icon }) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {t(`sleepSupport.benefits.${key}.title`)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {t(`sleepSupport.benefits.${key}.desc`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 夜间使用小贴士 */}
        <div className="max-w-3xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-indigo-100 shadow-soft">
          <h4 className="font-display font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-500" />
            {t("sleepSupport.tipsTitle")}
          </h4>
          <ol className="space-y-3">
            {["1", "2", "3"].map((step) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {step}
                </span>
                <span className="text-gray-600 text-sm leading-relaxed">
                  {t(`sleepSupport.tips.${step}`)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:gap-3 transition-all"
          >
            {t("sleepSupport.cta")}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
