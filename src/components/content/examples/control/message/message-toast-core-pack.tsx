import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/message-toast";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import type { MessageToastItem } from "oj-c/message-toast";

type ToastMessage = MessageToastItem & {
  id: string;
};

type MessageToastProps = ComponentProps<"oj-c-message-toast">;
type MessageToastCloseEvent = MessageToastProps["onojClose"] extends
  ((event: infer T) => void)
  ? T
  : CustomEvent;

const initialData: ToastMessage[] = [
  {
    id: "error1",
    severity: "error",
    summary: "Error message summary",
    detail: "Error message detail.",
  },
  {
    id: "warning1",
    severity: "warning",
    summary: "Warning message summary",
    detail: "Warning message detail.",
  },
  {
    id: "confirmation1",
    severity: "confirmation",
    summary: "Confirmation message summary",
    detail: "Confirmation message detail",
  },
  {
    id: "info1",
    severity: "info",
    summary: "Info message summary with no detail",
  },
  {
    id: "none1",
    severity: "none",
    summary: "Message summary with no severity and detail",
  },
  {
    id: "long1",
    severity: "error",
    summary:
      "Error message with really long summary text to show how the text wraps up when it overflows. ",
    detail:
      "Error message with really long detail text to show how the text wraps up when it overflows. ",
  },
];

const MessageToastCorePack = () => {
  const [messages, setMessages] = useState<ToastMessage[]>(() => initialData);

  const messagesDataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<string, ToastMessage>(messages, {
        keyAttributes: "id",
      }),
    [messages],
  );

  const closeMessage = useCallback((event: MessageToastCloseEvent) => {
    const key = event.detail.key;
    setMessages((prev) => prev.filter((message) => message.id !== key));
  }, []);

  const handleTestButton = useCallback(() => {
    const nextToast: ToastMessage = {
      id: `test-toast-${Date.now()}`,
      severity: "confirmation",
      summary: "Test button clicked",
      detail: "This oj-c-message-toast item was added from the VDOM example.",
      autoTimeout: 5000,
      closeAffordance: "on",
      sound: "none",
    };

    setMessages((prev) => [nextToast, ...prev]);
  }, []);

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-padding-4x">
      <header class="oj-sm-margin-0">
        <h2 class="oj-typography-heading-sm oj-sm-margin-0">oj-c-message-toast (VDOM)</h2>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
          Core Pack VDOM example using a button-triggered toast data provider and close handling.
        </p>
      </header>

      <div id="containerDiv" class="oj-sm-margin-4x-top">
        <oj-c-button label="Test Button" onojAction={handleTestButton}></oj-c-button>
        <oj-c-message-toast
          data={messagesDataProvider}
          onojClose={closeMessage}
        ></oj-c-message-toast>
      </div>
    </section>
  );
};

export default MessageToastCorePack;
