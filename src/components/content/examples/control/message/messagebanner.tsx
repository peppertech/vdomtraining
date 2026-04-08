import { h } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojmessagebanner";
import "ojs/ojbutton";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import type { MessageBannerItem } from "ojmessagebanner";

// Message banners display collections of status messages inline with contextual actions.
type BannerMessage = MessageBannerItem & {
  id: number;
  category?: "informational" | "warning" | "error" | "confirmation";
  icon?: string;
  autoTimeout?: number;
  closeAffordance?: "on" | "off";
  [key: string]: unknown;
};

type MessageVariant = {
  id: number;
  label: string;
  severity: "error" | "warning" | "confirmation" | "info" | "none";
  category: NonNullable<BannerMessage["category"]>;
  icon?: BannerMessage["icon"];
};

const messageVariants: MessageVariant[] = [
  {
    id: 1,
    label: "Informational",
    severity: "info",
    category: "informational",
  },
  {
    id: 2,
    label: "Warning",
    severity: "warning",
    category: "warning",
  },
  {
    id: 3,
    label: "Error",
    severity: "error",
    category: "error",
  },
  {
    id: 4,
    label: "Confirmation",
    severity: "confirmation",
    category: "confirmation",
  },
];

const initialMessages: BannerMessage[] = messageVariants.map((variant) => ({
  id: variant.id,
  summary: `${variant.label} message`,
  detail: `Sample ${variant.label.toLowerCase()} detail text explaining next steps.`,
  severity: variant.severity,
  category: variant.category,
  icon: variant.icon,
  autoTimeout: variant.severity === "info" ? 6000 : -1,
  closeAffordance: "on",
  timestamp: new Date().toISOString(),
}));

const MessageBannerVDOMExample = () => {
  const [messages, setMessages] = useState<BannerMessage[]>(initialMessages);

  const dataProvider = useMemo(
    () => new MutableArrayDataProvider<number, BannerMessage>(messages, { keyAttributes: "id" }),
    [messages],
  );

  const handleClose = useCallback((event: CustomEvent<{ key: string | number }>) => {
    const { key } = event.detail;
    if (typeof key === "number") {
      setMessages((prev) => prev.filter((item) => item.id !== key));
    }
  }, []);

  const handleReset = useCallback(() => {
    setMessages(initialMessages);
  }, []);

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-padding-4x">
      <header class="oj-sm-margin-0">
        <h2 class="oj-typography-heading-sm oj-sm-margin-0">oj-message-banner (VDOM)</h2>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
          Demonstrates rendering a banner with mixed severities, dismiss affordances, and programmatic reset.
        </p>
      </header>

      <div class="oj-sm-flex oj-sm-flex-wrap oj-sm-margin-3x-top oj-sm-gap-2x">
        <oj-button onojAction={handleReset} chroming="outlined" label="Reset Messages" />
        <oj-button
          chroming="borderless"
          display="icons"
          label="Add Info"
          onojAction={() => {
            setMessages((prev) => {
              const next: BannerMessage = {
                id: Date.now(),
                summary: "Informational message",
                detail: "Added informational message.",
                severity: "info",
                category: "informational",
                autoTimeout: 6000,
                closeAffordance: "on",
                timestamp: new Date().toISOString(),
              };
              return [next, ...prev];
            });
          }}
        >
          <span slot="startIcon" class="oj-ux-ico-plus"></span>
        </oj-button>
      </div>

      <div class="oj-sm-margin-3x-top">
        <oj-message-banner
          data={dataProvider}
          type="section"
          onojClose={(event) => handleClose(event as CustomEvent<{ key: string | number }>)}
        ></oj-message-banner>
      </div>
    </section>
  );
};

export default MessageBannerVDOMExample;
