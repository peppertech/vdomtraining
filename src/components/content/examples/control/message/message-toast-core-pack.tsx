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

const createNotificationMessages = (): ToastMessage[] => [
  {
    id: `server-maintenance-${Date.now()}`,
    severity: "warning",
    summary: "Planned maintenance tonight",
    detail: "Deployment starts at 11:00 PM and may briefly interrupt background sync.",
    closeAffordance: "on",
    sound: "none",
  },
  {
    id: `quota-${Date.now() + 1}`,
    severity: "info",
    summary: "Storage usage updated",
    detail: "Your project is using 78% of the shared media quota.",
    autoTimeout: 8000,
    closeAffordance: "on",
    sound: "none",
  },
  {
    id: `publish-${Date.now() + 2}`,
    severity: "confirmation",
    summary: "Publish completed",
    detail: "The latest training content was published successfully.",
    autoTimeout: 6000,
    closeAffordance: "on",
    sound: "none",
  },
];

const MessageToastCorePack = () => {
  const [messages, setMessages] = useState<ToastMessage[]>(() =>
    createNotificationMessages(),
  );

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

  const handleReset = useCallback(() => {
    setMessages(createNotificationMessages());
  }, []);

  const handleAddErrorNotification = useCallback(() => {
    setMessages((prev) => [
      {
        id: `error-${Date.now()}`,
        severity: "error",
        summary: "Upload failed",
        detail: "One of the selected assets could not be uploaded. Try again in a few minutes.",
        closeAffordance: "on",
        sound: "none",
      },
      ...prev,
    ]);
  }, []);

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-padding-4x">
      <div id="containerDiv" class="oj-sm-margin-4x-top">
        <div class="oj-sm-flex oj-sm-flex-wrap oj-sm-gap-1x oj-sm-margin-3x-bottom">
          <oj-c-button
            label="Reset Notifications"
            chroming="outlined"
            onojAction={handleReset}
          ></oj-c-button>
          <oj-c-button
            label="Add Error Notification"
            chroming="outlined"
            onojAction={handleAddErrorNotification}
          ></oj-c-button>
        </div>
        <oj-c-message-toast
          data={messagesDataProvider}
          onojClose={closeMessage}
        ></oj-c-message-toast>
      </div>
    </section>
  );
};

export default MessageToastCorePack;
