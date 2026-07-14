import "oj-c/message-banner";
import { CMessageBannerElement,MessageBannerItem } from "oj-c/message-banner";
import "oj-c/radioset";
import 'preact';
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type DemoMessageBannerItem = MessageBannerItem & {
  id: string;
};

type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];

const sortingOptions = [
  { label: "severity", value: "severity" },
  { label: "off", value: "off" }
];

const initialMessages: DemoMessageBannerItem[] = [
  {
    id: "error",
    severity: "error",
    summary: "Error message summary",
    detail: "Error message detail.",
    closeAffordance: "off"
  },
  {
    id: "info",
    severity: "info",
    summary: "Information message summary",
    detail: "Information message detail.",
    closeAffordance: "off"
  },
  {
    id: "warning",
    severity: "warning",
    summary: "Warning message summary",
    detail: "Warning message detail.",
    closeAffordance: "off"
  },
  {
    id: "warning-timestamp",
    severity: "warning",
    summary: "Warning message summary with timestamp",
    detail: "Warning message detail with timestamp.",
    closeAffordance: "off",
    timestamp: new Date("1/1/2024").toISOString()
  },
  {
    id: "none",
    severity: "none",
    summary: "Neutral message summary",
    detail: "Neutral message detail.",
    closeAffordance: "off"
  },
  {
    id: "another-warning-timestamp",
    severity: "warning",
    summary: "Another warning message summary with timestamp",
    detail: "Warning message detail with timestamp.",
    closeAffordance: "off",
    timestamp: new Date("1/2/2024").toISOString()
  },
  {
    id: "confirmation",
    severity: "confirmation",
    summary: "Success message summary",
    detail: "Success message detail.",
    closeAffordance: "off"
  }
];

export const MessagebannerSortingcorepack = () => {
  const [sorting, setSorting] = useState<"severity" | "off">("severity");

  const messages = useMemo(
    () =>
      new MutableArrayDataProvider<string, DemoMessageBannerItem>(initialMessages, {
        keyAttributes: "id"
      }),
    []
  );

  const closeMessage = (event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
    const closeMessageKey = event.detail.key;
    messages.data = messages.data.filter((message) => message.id !== closeMessageKey);
  };

  const handleSortingChanged = (event: RadioValueChangedEvent) => {
    if (event.detail.value === "severity" || event.detail.value === "off") {
      setSorting(event.detail.value);
    }
  };

  return (
    <div id="containerDiv">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <div class="oj-typography-heading-xs oj-header-border">Messages settings</div>
        <div class="oj-flex">
          <div class="oj-sm-margin-2x-end oj-flex-item">
            <oj-c-radioset
              options={sortingOptions}
              value={sorting}
              labelHint="Sorting options"
              labelEdge="inside"
              onvalueChanged={handleSortingChanged}
            />
          </div>
        </div>
      </div>
      <oj-c-message-banner
        data={messages}
        type="page"
        sorting={sorting}
        onojClose={closeMessage}
      />
    </div>
  );
};

export default MessagebannerSortingcorepack;
