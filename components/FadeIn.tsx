"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** ビューポートに入る少し手前で発火 */
  rootMargin?: string;
  style?: CSSProperties;
};

export function FadeIn({
  children,
  className = "",
  rootMargin = "0px 0px -48px 0px",
  style,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [intersected, setIntersected] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const visible = reduceMotion || intersected;

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIntersected(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion, rootMargin]);

  const stateClass = visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-3";

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-out ${stateClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
