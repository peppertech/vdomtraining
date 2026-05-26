import { useMemo, useRef } from "preact/hooks";
import type { MessageToastItem, CMessageToastElement } from "oj-c/message-toast";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "oj-c/message-toast";
import "oj-c/button";

type DemoMessageToastItem = MessageToastItem & {
  id: string;
};

const initialMessages: DemoMessageToastItem[] = [
  {
    id: "error1",
    severity: "error",
    summary: "Error message summary",
    detail: "Error message detail."
  },
  {
    id: "warning1",
    severity: "warning",
    summary: "Warning message summary",
    detail: "Warning message detail."
  },
  {
    id: "confirmation1",
    severity: "confirmation",
    summary: "Confirmation message summary",
    detail: "Confirmation message detail"
  },
  {
    id: "info1",
    severity: "info",
    summary: "Info message summary with no detail"
  },
  {
    id: "none1",
    severity: "none",
    summary: "Message summary with no severity and detail"
  },
  {
    id: "long1",
    severity: "error",
    summary: "Error message with really long summary text to show how the text wraps up when it overflows. ",
    detail: "Error message with really long detail text to show how the text wraps up when it overflows. "
  }
];

const createMessages = (messageSetId: number): DemoMessageToastItem[] =>
  initialMessages.map((message) => ({
    ...message,
    id: `${message.id}-${messageSetId}`
  }));

const toastPosition = "bottom";

export const MessagetoastBasiccorepack = () => {
  const messageSetCounter = useRef(0);
  const messages = useMemo(
    () =>
      new MutableArrayDataProvider<string, DemoMessageToastItem>(createMessages(0), {
        keyAttributes: "id"
      }),
    []
  );

  const closeMessage = (event: CMessageToastElement.ojClose<string, DemoMessageToastItem>) => {
    messages.data = messages.data.filter((message) => message.id !== event.detail.key);
  };

  const showMessages = () => {
    messageSetCounter.current += 1;
    messages.data = createMessages(messageSetCounter.current);
  };

  return (
    <div id="containerDiv">
      <oj-c-button label="Test Button" onojAction={showMessages} />
      <oj-c-message-toast
        data={messages}
        position={toastPosition}
        onojClose={closeMessage}
      />
    </div>
  );
};

export default MessagetoastBasiccorepack;
