import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojmessages";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

import type { ojMessage } from "ojs/ojmessage";
import type { ojMessages } from "ojs/ojmessages";

type LegacyNotificationMessage = ojMessage.Message & {
  id: string;
};

type MessagesProps = ComponentProps<"oj-messages">;

const createNotificationMessages = (): LegacyNotificationMessage[] => {
  const createdAt = new Date().toISOString();

  return [
    {
      id: `server-maintenance-${Date.now()}`,
      severity: "warning",
      summary: "Planned maintenance tonight",
      detail: "Deployment starts at 11:00 PM and may briefly interrupt background sync.",
      category: "Warning",
      autoTimeout: 0,
      closeAffordance: "defaults",
      timestamp: createdAt,
    },
    {
      id: `quota-${Date.now() + 1}`,
      severity: "info",
      summary: "Storage usage updated",
      detail: "Your project is using 78% of the shared media quota.",
      category: "Information",
      autoTimeout: 8000,
      closeAffordance: "defaults",
      timestamp: createdAt,
    },
    {
      id: `publish-${Date.now() + 2}`,
      severity: "confirmation",
      summary: "Publish completed",
      detail: "The latest training content was published successfully.",
      category: "Confirmation",
      autoTimeout: 6000,
      closeAffordance: "defaults",
      timestamp: createdAt,
    },
  ];
};

const notificationPosition: ojMessages.Position = {};
const displayOptions: ojMessage.DisplayOptions = { category: "none" };

const MessageBannerLegacyExample = () => {
  const [messages, setMessages] = useState<LegacyNotificationMessage[]>(() =>
    createNotificationMessages(),
  );

  const messagesDataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<string, LegacyNotificationMessage>(messages, {
        keyAttributes: "id",
      }) as unknown as NonNullable<MessagesProps["messages"]>,
    [messages],
  );

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
        category: "Error",
        autoTimeout: 0,
        closeAffordance: "defaults",
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-padding-4x">
      <div class="oj-sm-flex oj-sm-flex-wrap oj-sm-gap-1x oj-sm-margin-3x-top">
        <oj-button chroming="outlined" label="Reset Notifications" onojAction={handleReset} /> 
        <oj-button
          chroming="outlined"
          label="Add Error Notification"
          onojAction={handleAddErrorNotification}
        />
      </div>
      <div class="oj-sm-margin-4x-top oj-sm-padding-2x oj-color-bg-neutral-170 oj-sm-border-radius-md">
        <div id="notificationMessages">
          <oj-messages
            class="oj-color-invert"
            messages={messagesDataProvider}
            position={notificationPosition}
            display="notification"
            displayOptions={displayOptions}
          ></oj-messages>
        </div>
      </div>
    </section>
  );
};

export default MessageBannerLegacyExample;
