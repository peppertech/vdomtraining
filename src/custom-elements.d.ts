import "ojs/oj-jsx-interfaces";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "demo-profile-card-layout": Record<string, any>;
      "demo-chart-orientation-control": Record<string, any>;
      "demo-chart-stack-control": Record<string, any>;
      "demo-input-json": Record<string, any>;
      "demo-radioset-enum": Record<string, any>;
      "demo-select-enum": Record<string, any>;
      "demo-tabs": Record<string, any>;
    }
  }

  namespace preact.JSX {
    interface IntrinsicElements {
      "demo-profile-card-layout": Record<string, any>;
      "demo-chart-orientation-control": Record<string, any>;
      "demo-chart-stack-control": Record<string, any>;
      "demo-input-json": Record<string, any>;
      "demo-radioset-enum": Record<string, any>;
      "demo-select-enum": Record<string, any>;
      "demo-tabs": Record<string, any>;
    }
  }
}

export {};
