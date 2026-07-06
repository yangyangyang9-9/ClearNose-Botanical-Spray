import { create } from "zustand";
import i18n from "@/i18n";

const STORAGE_KEY = "clearnose-lang";

interface LanguageState {
  lang: "en" | "zh";
  toggle: () => void;
  setLang: (lang: "en" | "zh") => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: (i18n.language as "en" | "zh") || "en",
  toggle: () => {
    const next = get().lang === "en" ? "zh" : "en";
    get().setLang(next);
  },
  setLang: (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    set({ lang });
  },
}));
