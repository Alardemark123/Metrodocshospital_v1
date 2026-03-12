import { useEffect, useRef, useState } from "react";

export function useRecaptcha() {
  const [token, setToken] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  const reset = () => {
    if (window.grecaptcha && widgetId.current !== null) {
      window.grecaptcha.reset(widgetId.current);
      widgetId.current = null;
    }
    setToken(null);
  };

  useEffect(() => {
    const render = () => {
      if (ref.current && widgetId.current === null) {
        widgetId.current = window.grecaptcha.render(ref.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          theme: "light",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(null),
          "error-callback": () => setToken(null),
        });
      }
    };

    if (window.grecaptcha?.ready) {
      window.grecaptcha.ready(render);
    } else {
      const existing = document.querySelector(
        'script[src*="recaptcha/api.js"]',
      );
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => window.grecaptcha.ready(render);
        document.head.appendChild(script);
      }
    }

    return () => {
      widgetId.current = null;
    };
  }, []);

  return { token, ref, reset };
}
