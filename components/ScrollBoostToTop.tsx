"use client";

import { useEffect, useRef } from "react";

/** この高さより下にいるときだけ有効 */
const MIN_SCROLL_Y = 260;
/** 一度に上へ回したときのしきい値（ホイール1ノッチ想定） */
const WHEEL_UP_STRONG = -48;
/** トラックパッド用：この時間内の上方向 delta の合計がこれを超えたら発火 */
const ACCUMULATE_MS = 120;
const ACCUMULATE_SUM = 72;
const COOLDOWN_MS = 2800;

/**
 * ページをある程度下にスクロールしたあと、十分な「上へ」のホイール操作で
 * 先頭へまとめてスムーズスクロールする。
 */
export function ScrollBoostToTop() {
  const cooldownUntil = useRef(0);
  const accUp = useRef(0);
  const accReset = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const trigger = () => {
      cooldownUntil.current = Date.now() + COOLDOWN_MS;
      accUp.current = 0;
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (reducedMotion) return;
      if (Date.now() < cooldownUntil.current) return;
      if (window.scrollY < MIN_SCROLL_Y) return;

      if (e.deltaY >= 0) {
        accUp.current = 0;
        return;
      }

      const up = -e.deltaY;

      if (e.deltaY <= WHEEL_UP_STRONG) {
        e.preventDefault();
        trigger();
        return;
      }

      accUp.current += up;
      if (accReset.current) clearTimeout(accReset.current);
      accReset.current = setTimeout(() => {
        accUp.current = 0;
        accReset.current = null;
      }, ACCUMULATE_MS);

      if (accUp.current >= ACCUMULATE_SUM) {
        e.preventDefault();
        trigger();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (accReset.current) clearTimeout(accReset.current);
    };
  }, []);

  return null;
}
