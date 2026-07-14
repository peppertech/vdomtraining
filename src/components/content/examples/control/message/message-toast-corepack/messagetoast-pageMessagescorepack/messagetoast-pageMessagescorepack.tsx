import "css!./demo.css";
import "oj-c/checkboxset";
import "oj-c/message-toast";
import type { CMessageToastElement,MessageToastItem } from "oj-c/message-toast";
import "oj-c/radioset";
import type { ComponentProps } from "preact";
import { useMemo,useState } from "preact/hooks";
import { useToastContainerOffset } from "../useToastContainerOffset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type DemoMessageToastItem = MessageToastItem & {
  id: string;
};
type MessageSeverity = Exclude<MessageToastItem["severity"], undefined>;
type MessageSelectorOption = MessageSeverity | "none";
type MessageCloseAffordance = Exclude<MessageToastItem["closeAffordance"], undefined>;
type MessageSound = Exclude<MessageToastItem["sound"], undefined>;
type ToastPosition = NonNullable<ComponentProps<"oj-c-message-toast">["position"]>;
type RadioValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
type CheckboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-checkboxset">["onvalueChanged"]>
>[0];

const positionOptions: Array<{ value: ToastPosition; label: string }> = [
  { value: "top-left", label: "top-left" },
  { value: "top", label: "top" },
  { value: "top-right", label: "top-right" },
  { value: "top-start", label: "top-start" },
  { value: "top-end", label: "top-end" },
  { value: "bottom", label: "bottom" },
  { value: "bottom-left", label: "bottom-left" },
  { value: "bottom-right", label: "bottom-right" },
  { value: "bottom-start", label: "bottom-start" },
  { value: "bottom-end", label: "bottom-end" }
];

const messageOptions: Array<{ value: string; label: string }> = [
  { value: "closeAffordance", label: "Close Affordance" },
  { value: "detail", label: "Detail" },
  { value: "sound", label: "Sound" }
];

const selectedMessagesOptions: Array<{ value: MessageSelectorOption; label: string }> = [
  { value: "error", label: "Error" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
  { value: "confirmation", label: "Confirmation" },
  { value: "none", label: "None" }
];

const initialMessages: DemoMessageToastItem[] = [
  {
    id: "errorMessage",
    severity: "error",
    summary: "Error message summary",
    detail: "Error message detail.",
    closeAffordance: "off"
  },
  {
    id: "warningMessage",
    severity: "warning",
    summary: "Warning message summary",
    detail: "Warning message detail."
  },
  {
    id: "confirmationMessage",
    severity: "confirmation",
    summary: "Confirmation message summary",
    detail: "Confirmation message detail."
  }
];

const createMessage = (
  severity: MessageSeverity,
  closeAffordance: MessageCloseAffordance,
  detail: string | undefined,
  sound: MessageSound
): DemoMessageToastItem => ({
  id: `${severity}Message`,
  severity,
  summary: `${severity[0].toUpperCase()}${severity.slice(1)} message summary`,
  detail,
  closeAffordance,
  sound
});

export const MessagetoastPageMessagescorepack = () => {
  const [newMessagesOptions, setNewMessagesOptions] = useState<string[]>(["closeAffordance"]);
  const [selectedMessages, setSelectedMessages] = useState<MessageSelectorOption[]>([
    "error",
    "warning",
    "confirmation"
  ]);
  const [selectedPositionOption, setSelectedPositionOption] = useState<ToastPosition>("bottom");
  const toastOffset = useToastContainerOffset("containerDiv", selectedPositionOption);
  const messages = useMemo(
    () =>
      new MutableArrayDataProvider<string, DemoMessageToastItem>(initialMessages, {
        keyAttributes: "id"
      }),
    []
  );

  const computedCloseAffordance: MessageCloseAffordance = newMessagesOptions.includes(
    "closeAffordance"
  )
    ? "on"
    : "off";
  const computedDetail = newMessagesOptions.includes("detail") ? "New message detail." : undefined;
  const computedSound: MessageSound = newMessagesOptions.includes("sound") ? "default" : "none";

  const closeMessage = (event: CMessageToastElement.ojClose<string, DemoMessageToastItem>) => {
    messages.data = messages.data.filter((message) => message.id !== event.detail.key);
    if (event.detail.data.severity) {
      setSelectedMessages((currentValue) =>
        currentValue.filter((item) => item !== event.detail.data.severity)
      );
    }
  };

  const updateMessages = (nextSelection: MessageSelectorOption[]) => {
    const nextData: DemoMessageToastItem[] = [];

    for (const message of messages.data) {
      if (message.severity && nextSelection.includes(message.severity)) {
        nextData.push(message);
      }
    }

    for (const severity of nextSelection) {
      if (severity === "none") {
        continue;
      }
      const isMessageShown = nextData.some((message) => message.severity === severity);
      if (!isMessageShown) {
        nextData.unshift(
          createMessage(severity, computedCloseAffordance, computedDetail, computedSound)
        );
      }
    }

    messages.data = nextData;
  };

  const handlePositionChanged = (event: RadioValueChangedEvent) => {
    const nextValue = event.detail.value;
    if (typeof nextValue === "string") {
      setSelectedPositionOption(nextValue as ToastPosition);
    }
  };

  const handleNewMessageOptionsChanged = (event: CheckboxValueChangedEvent) => {
    const nextValue = Array.isArray(event.detail.value) ? event.detail.value.map(String) : [];
    setNewMessagesOptions(nextValue);

    messages.data = messages.data.map((message) => ({
      ...message,
      detail: nextValue.includes("detail") ? message.detail ?? "New message detail." : undefined,
      closeAffordance: nextValue.includes("closeAffordance") ? "on" : "off",
      sound: nextValue.includes("sound") ? "default" : "none"
    }));
  };

  const handleSelectedMessagesChanged = (event: CheckboxValueChangedEvent) => {
    const nextValue = Array.isArray(event.detail.value)
      ? event.detail.value.map((value) => String(value) as MessageSelectorOption)
      : [];
    setSelectedMessages(nextValue);
    updateMessages(nextValue);
  };

  return (
    <div id="containerDiv" class="demo-messages-page-container">
      <oj-c-message-toast
        data={messages}
        offset={toastOffset}
        position={selectedPositionOption}
        onojClose={closeMessage}
      />

      <div class="oj-web-padding oj-web-applayout-max-width" role="main">
        <div class="oj-typography-heading-md">Page Content Area</div>

        {Array.from({ length: 7 }, (_, index) => (
          <p key={`top-${index}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac
            interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin
            ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi.
            Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus
            sollicitudin.
          </p>
        ))}

        <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x">
          <div class="oj-typography-heading-xs oj-header-border">Messages settings</div>
          <div class="oj-flex">
            <div class="oj-sm-padding-2x oj-flex-item">
              <oj-c-radioset
                id="position"
                options={positionOptions}
                labelHint="Position of messages"
                labelEdge="inside"
                value={selectedPositionOption}
                onvalueChanged={handlePositionChanged}
              />
            </div>

            <div class="oj-sm-padding-2x oj-flex-item">
              <oj-c-checkboxset
                value={newMessagesOptions}
                labelHint="New messages options"
                labelEdge="inside"
                options={messageOptions}
                onvalueChanged={handleNewMessageOptionsChanged}
              />
            </div>

            <div class="oj-sm-padding-2x oj-flex-item">
              <oj-c-checkboxset
                value={selectedMessages}
                labelHint="Add/Remove messages"
                labelEdge="inside"
                options={selectedMessagesOptions}
                onvalueChanged={handleSelectedMessagesChanged}
              />
            </div>
          </div>
        </div>

        {Array.from({ length: 10 }, (_, index) => (
          <p key={`bottom-${index}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac
            interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin
            ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi.
            Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus
            sollicitudin.
          </p>
        ))}
      </div>
    </div>
  );
};

export default MessagetoastPageMessagescorepack;
