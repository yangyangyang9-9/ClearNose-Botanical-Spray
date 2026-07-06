import { useEffect, useRef } from "react";

/**
 * 滚动渐入动画 Hook
 * 使用 Intersection Observer 监测元素进入视口，添加 is-visible class
 */
export const useScrollReveal = <T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 支持 reduce motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
        ...options,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
};
