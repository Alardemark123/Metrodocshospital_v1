declare global {
  interface Window {
    grecaptcha: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          theme: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => number;
      reset: (widgetId: number) => void;
      getResponse: (widgetId?: number) => string;
      ready: (callback: () => void) => void;
    };
  }
}

export {};