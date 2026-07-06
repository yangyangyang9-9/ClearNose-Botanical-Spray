import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Menu, X, Leaf, Globe, ShoppingBag } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { trackEvent } from "@/constants/config";

const NAV_LINKS = [
  { key: "nav.problem", href: "#problem" },
  { key: "nav.product", href: "#product" },
  { key: "nav.howToUse", href: "#how-to-use" },
  { key: "nav.ingredients", href: "#ingredients" },
  { key: "nav.reviews", href: "#reviews" },
  { key: "nav.faq", href: "#faq" },
];

export const Navbar = () => {
  const { t } = useTranslation();
  const { lang, toggle } = useLanguageStore();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBuyNow = () => {
    trackEvent("buy_now_click", { source: "navbar" });
    navigate("/checkout?plan=bundle");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-lg shadow-soft border-b border-brand-100"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2 group"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-gradient shadow-glow transition-transform group-hover:scale-105">
            <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-lg text-gray-900">
            ClearNose
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <button
            onClick={() => {
              toggle();
              trackEvent("language_switch", { to: lang === "en" ? "zh" : "en" });
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
            aria-label={t("language.label")}
          >
            <Globe className="w-4 h-4" />
            <span>{t("language.switch")}</span>
          </button>

          {/* Buy Now (desktop) */}
          <button
            onClick={handleBuyNow}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gradient text-white text-sm font-semibold rounded-full shadow-soft hover:shadow-glow hover:scale-105 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            {t("nav.buyNow")}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 text-gray-700 hover:bg-brand-50 rounded-lg transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-brand-100 shadow-card">
          <ul className="container py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-3 text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={handleBuyNow}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-gradient text-white text-sm font-semibold rounded-full shadow-soft"
              >
                <ShoppingBag className="w-4 h-4" />
                {t("nav.buyNow")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
