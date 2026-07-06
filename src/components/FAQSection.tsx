import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/constants/config";

const FAQ_IDS = ["1", "2", "3"] as const;

export const FAQSection = () => {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();
  const [openId, setOpenId] = useState<string | null>("1");

  const handleToggle = (id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next) {
      trackEvent("faq_open", { id });
    }
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="reveal py-20 md:py-28 bg-gradient-to-b from-white to-med-50"
    >
      <div className="container max-w-3xl">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-med-50 text-med-700 text-sm font-medium rounded-full mb-4">
            {t("faq.badge")}
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-gray-600 text-lg">{t("faq.subtitle")}</p>
        </div>

        {/* 手风琴 */}
        <div className="flex flex-col gap-3">
          {FAQ_IDS.map((id) => {
            const isOpen = openId === id;
            return (
              <div
                key={id}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-brand-300 shadow-card"
                    : "border-gray-100 shadow-soft"
                }`}
              >
                <button
                  onClick={() => handleToggle(id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors ${
                        isOpen ? "text-brand-500" : "text-gray-400"
                      }`}
                    />
                    <span className="font-semibold text-gray-900 text-base">
                      {t(`faq.items.${id}.question`)}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-500" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pl-14 text-gray-600 text-sm leading-relaxed">
                      {t(`faq.items.${id}.answer`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
