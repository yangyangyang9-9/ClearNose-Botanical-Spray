import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Sparkles, Star, Leaf } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { IMAGES, trackEvent } from "@/constants/config";

export const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useScrollReveal<HTMLElement>();

  const handleBuyNow = () => {
    trackEvent("buy_now_click", { source: "hero" });
    navigate("/checkout?plan=bundle");
  };

  const handleLearnMore = () => {
    document
      .querySelector("#problem")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="reveal relative overflow-hidden bg-hero-gradient pt-24 md:pt-32 pb-16 md:pb-24"
    >
      {/* 装饰背景 */}
      <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-med-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        {/* 文案 */}
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/70 backdrop-blur border border-brand-200 rounded-full text-sm font-medium text-brand-700 mb-6 shadow-soft">
            <Sparkles className="w-4 h-4" />
            {t("hero.badge")}
          </span>

          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase mb-3">
            {t("hero.productName")}
          </p>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight text-gray-900 mb-6">
            {t("hero.headline")}
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
            {t("hero.subheadline")}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={handleBuyNow}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-gradient text-white font-semibold rounded-full shadow-glow hover:scale-105 hover:shadow-card-hover transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {t("hero.cta")}
            </button>
            <button
              onClick={handleLearnMore}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:border-brand-300 hover:text-brand-600 transition-colors"
            >
              {t("hero.secondaryCta")}
            </button>
          </div>

          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-brand-500" />
            {t("hero.trustLine")}
          </p>

          {/* 数据条 */}
          <div className="mt-10 grid grid-cols-3 gap-6 w-full max-w-md">
            <div>
              <p className="font-display font-bold text-2xl text-gray-900">
                12k+
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("hero.stats.users")}
              </p>
            </div>
            <div className="border-l border-gray-200 pl-6">
              <p className="font-display font-bold text-2xl text-gray-900 flex items-center gap-1">
                4.8
                <Star className="w-4 h-4 fill-brand-500 text-brand-500" />
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("hero.stats.rating")}
              </p>
            </div>
            <div className="border-l border-gray-200 pl-6">
              <p className="font-display font-bold text-2xl text-gray-900">
                100%
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("hero.stats.natural")}
              </p>
            </div>
          </div>
        </div>

        {/* 产品图 */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-gradient opacity-20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="relative animate-float">
            <img
              src={IMAGES.hero}
              alt="ClearNose Botanical Spray product"
              className="relative w-full max-w-md mx-auto drop-shadow-2xl rounded-2xl"
              loading="eager"
            />
            {/* 浮动徽章 */}
            <div className="absolute -top-4 -left-4 bg-white px-4 py-2 rounded-full shadow-card flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 bg-brand-100 rounded-full">
                <Leaf className="w-3.5 h-3.5 text-brand-600" />
              </span>
              <span className="text-xs font-semibold text-gray-700">
                Plant-Based
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
