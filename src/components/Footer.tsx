import { useTranslation } from "react-i18next";
import { Leaf, ShieldAlert } from "lucide-react";

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* 品牌 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-gradient shadow-glow">
                <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold text-lg text-white">
                ClearNose
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* 链接 */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">
              {t("footer.links.privacy")}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-brand-300 transition-colors"
                >
                  {t("footer.links.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-brand-300 transition-colors"
                >
                  {t("footer.links.terms")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-brand-300 transition-colors"
                >
                  {t("footer.links.shipping")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-brand-300 transition-colors"
                >
                  {t("footer.links.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* 免责声明 */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-yellow-500" />
              Disclaimer
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              {t("footer.disclaimer")}
            </p>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            © {year} ClearNose Botanical Spray. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
