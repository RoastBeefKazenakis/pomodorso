"use client";

import { useEffect, useRef } from "react";

// The timer build (public/pomodoro-timer-5787-18.html) is embedded in a
// full-viewport iframe so it ships byte-identical — zero behavior drift.
// The iframe is same-origin, so we mirror its live tab-bar countdown title
// (the Unicode monospace digits, e.g. (𝟸𝟻:𝟶𝟶) · focus) onto the outer page.
export default function Home() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const innerTitle = (): string | null => {
      try {
        return frame.contentDocument?.title || null;
      } catch {
        return null;
      }
    };

    // Enforce outer title === inner title. Convergent: when we set it
    // ourselves the observers below see no divergence and stay quiet.
    const sync = () => {
      const want = innerTitle();
      if (want && document.title !== want) document.title = want;
    };

    // The iframe can finish loading before hydration attaches the listener;
    // in that case run the setup immediately instead of waiting for "load".
    // Note: a fresh iframe's contentDocument is about:blank at readyState
    // "complete" before the real document commits, so check the URL too.
    const docReady = () => {
      try {
        const d = frame.contentDocument;
        return (
          !!d &&
          d.readyState === "complete" &&
          !d.location.href.startsWith("about:")
        );
      } catch {
        return false;
      }
    };

    let innerObserver: MutationObserver | null = null;
    let outerObserver: MutationObserver | null = null;
    let loadAttached = false;

    const setup = () => {
      sync();
      try {
        // Follow the countdown as it ticks inside the timer.
        const titleEl = frame.contentDocument?.querySelector("title");
        if (titleEl && !innerObserver) {
          innerObserver = new MutationObserver(sync);
          innerObserver.observe(titleEl, {
            childList: true,
            characterData: true,
            subtree: true,
          });
        }
      } catch {
        // ignore
      }
      try {
        // Re-assert after any third-party stomps — e.g. the Next.js router
        // re-applying route metadata after hydration.
        const outerTitleEl = document.querySelector("title");
        if (outerTitleEl && !outerObserver) {
          outerObserver = new MutationObserver(sync);
          outerObserver.observe(outerTitleEl, {
            childList: true,
            characterData: true,
            subtree: true,
          });
        }
      } catch {
        // ignore
      }
    };

    if (docReady()) {
      setup();
    } else {
      frame.addEventListener("load", setup);
      loadAttached = true;
    }
    return () => {
      if (loadAttached) frame.removeEventListener("load", setup);
      innerObserver?.disconnect();
      outerObserver?.disconnect();
    };
  }, []);

  return (
    <main style={{ position: "fixed", inset: 0 }}>
      <iframe
        ref={frameRef}
        src="/pomodoro-timer-5787-18.html"
        title="Pomodoro Timer"
        allow="autoplay; fullscreen"
        allowFullScreen
        style={{ width: "100%", height: "100%", border: 0, display: "block" }}
      />
    </main>
  );
}
