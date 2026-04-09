import "ojs/oj-jsx-interfaces";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "demo-profile-card-layout": Record<string, any>;
    }
  }

  namespace preact.JSX {
    interface IntrinsicElements {
      "demo-profile-card-layout": Record<string, any>;
    }
  }
}

export {};
