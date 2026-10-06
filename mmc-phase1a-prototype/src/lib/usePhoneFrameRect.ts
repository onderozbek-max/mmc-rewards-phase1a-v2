import * as React from "react";

/**
 * Measures the live bounding rect of the phone-frame "screen" element and
 * publishes it as CSS custom properties on <html>. `phase1a.css` uses these
 * to pin the portaled BottomSheet + scrim to the phone frame instead of the
 * full browser viewport — see the comment at the top of that file for why
 * this can't be done with ordinary scoped CSS.
 *
 * Re-measures on resize and whenever the frame's own size changes (device
 * preset switch in the control panel), via ResizeObserver.
 */
export function usePhoneFrameRect(ref: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const root = document.documentElement.style;
      root.setProperty("--phase1a-frame-left", `${rect.left}px`);
      root.setProperty("--phase1a-frame-top", `${rect.top}px`);
      root.setProperty("--phase1a-frame-width", `${rect.width}px`);
      root.setProperty("--phase1a-frame-height", `${rect.height}px`);
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [ref]);
}
