import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type {
  MessageToastItem,
  MessageToastTemplateContext,
  MessageToastTemplateValueParameters,
  CMessageToastElement
} from "oj-c/message-toast";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { useToastContainerOffset } from "../useToastContainerOffset";
import "oj-c/message-toast";
import "oj-c/button";
import "oj-c/progress-circle";

type DemoMessageToastItem = MessageToastItem & {
  id: string;
  progressValue?: number;
};

const initialMessages: DemoMessageToastItem[] = [
  {
    id: "message1",
    severity: "info",
    summary: "In-progress message summary",
    detail:
      "Toast message with deterministic progress circle for icon. The progress moves forward every second and as it completes this message will be update to acknowledgement toast.",
    progressValue: 0
  },
  {
    id: "message2",
    severity: "info",
    summary: "Indeterminate in-progress message summary",
    detail: "",
    progressValue: -1
  }
];

const getIconTemplate = (
  context: MessageToastTemplateValueParameters<string, DemoMessageToastItem>
): string | undefined => {
  if (context.data.progressValue !== undefined) {
    return "inProgress";
  }
  return undefined;
};

const renderProgressTemplate = (
  context: MessageToastTemplateContext<string, DemoMessageToastItem>
) => (
  <oj-c-progress-circle
    size="sm"
    value={context.data.progressValue}
    aria-label="Indeterminate progress circle"
  />
);

export const MessagetoastProgresscorepack = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const toastOffset = useToastContainerOffset("containerDiv");
  const messages = useMemo(
    () =>
      new MutableArrayDataProvider<string, DemoMessageToastItem>(initialMessages, {
        keyAttributes: "id"
      }),
    []
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const removeMessage = (key: string) => {
    messages.data = messages.data.filter((message) => message.id !== key);
  };

  useEffect(
    () => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (autoDismissRef.current) {
        clearTimeout(autoDismissRef.current);
      }
    },
    []
  );

  const closeMessage = (event: CMessageToastElement.ojClose<string, DemoMessageToastItem>) => {
    removeMessage(event.detail.key);
  };

  const startTimer = () => {
    setIsDisabled(true);
    if (autoDismissRef.current) {
      clearTimeout(autoDismissRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const data = messages.data.slice();

      if (!data.length || data[0].id !== "message1" || data[0].progressValue === undefined) {
        messages.data = initialMessages.slice();
        return;
      }

      if (data[0].progressValue === 100) {
        messages.data = [
          {
            ...data[0],
            severity: "confirmation",
            summary: "Acknowledgement message summary",
            detail: "The toast message is now updated to acknowledgment toast.",
            progressValue: undefined
          },
          {
            ...(data[1] ?? initialMessages[1]),
            severity: "confirmation",
            summary: "Acknowledgement message summary",
            progressValue: undefined
          }
        ];

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsDisabled(false);
        autoDismissRef.current = setTimeout(() => {
          messages.data = [];
        }, 5000);
        return;
      }

      messages.data = [
        {
          ...data[0],
          progressValue: (data[0].progressValue ?? 0) + 20
        },
        ...data.slice(1)
      ];
    }, 1000);
  };

  return (
    <div id="containerDiv">
      <oj-c-button onojAction={startTimer} label="Start progress" disabled={isDisabled} />
      <oj-c-message-toast
        data={messages}
        iconTemplateValue={getIconTemplate}
        offset={toastOffset}
        onojClose={closeMessage}
      >
        <template slot="inProgress" render={renderProgressTemplate} />
      </oj-c-message-toast>
    </div>
  );
};

export default MessagetoastProgresscorepack;
