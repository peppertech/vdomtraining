import { useMemo } from "preact/hooks";
import type {
  MessageToastItem,
  MessageToastTemplateContext,
  MessageToastTemplateValueParameters,
  CMessageToastElement
} from "oj-c/message-toast";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "oj-c/message-toast";

type CustomAction = {
  link?: string;
  title?: string;
};

type DemoMessageToastItem = MessageToastItem & {
  id: string;
  action?: CustomAction;
  detailLink?: CustomAction;
};

const initialMessages: DemoMessageToastItem[] = [
  {
    id: "message1",
    severity: "warning",
    summary: "Warning message summary",
    detail:
      "This message uses the 'detail-template-value' property of the oj-c-message-toast component to choose the 'actions' template from the provided dynamic template slots.This overrides the default detail and renders the custom detail text and the action items.",
    action: { title: "Retry", link: "#retry" }
  },
  {
    id: "message2",
    severity: "info",
    summary: "Info message summary",
    detail:
      "This message uses the 'detail-template-value' property of the oj-c-message-toast component to choose the 'detailLink' template from the provided dynamic template slots.This overrides the default detail and renders the custom detail text and an inlined link.",
    detailLink: { title: "More Info", link: "#viewDetails" }
  }
];

const getDetailTemplate = (
  context: MessageToastTemplateValueParameters<string, DemoMessageToastItem>
): string | undefined => {
  if (context.data.action) {
    return "action";
  }
  if (context.data.detailLink) {
    return "detailLink";
  }
  return undefined;
};

const createDetailActionHandler =
  (
    action: CustomAction | undefined,
    key: string,
    removeMessage: (key: string) => void
  ) =>
  (event: MouseEvent) => {
    event.preventDefault();
    if (action?.link === "#learnMore" || action?.link === "#viewDetails" || action?.link === "#retry") {
      removeMessage(key);
    }
  };

const renderActionTemplate = (
  context: MessageToastTemplateContext<string, DemoMessageToastItem>,
  removeMessage: (key: string) => void
) => (
  <div>
    <div class="oj-flex-item">
      <span>{context.data.detail}</span>
    </div>
    <div class="oj-flex-item oj-sm-padding-2x-top">
      <a
        href={context.data.action?.link ?? "#"}
        onClick={createDetailActionHandler(context.data.action, context.key, removeMessage)}
        class="oj-link-standalone oj-typography-body-sm oj-typography-semi-bold"
      >
        {context.data.action?.title}
      </a>
    </div>
  </div>
);

const renderDetailLinkTemplate = (
  context: MessageToastTemplateContext<string, DemoMessageToastItem>
) => (
  <div class="oj-flex-item">
    <span>{context.data.detail}</span>{" "}
    <a href={context.data.detailLink?.link ?? "#"} class="oj-link-embedded oj-link-subtle-secondary">
      {context.data.detailLink?.title}
    </a>
  </div>
);

const toastPosition = "bottom";

export const MessagetoastDetailActionscorepack = () => {
  const messages = useMemo(
    () =>
      new MutableArrayDataProvider<string, DemoMessageToastItem>(initialMessages, {
        keyAttributes: "id"
      }),
    []
  );

  const removeMessage = (key: string) => {
    messages.data = messages.data.filter((message) => message.id !== key);
  };

  const closeMessage = (event: CMessageToastElement.ojClose<string, DemoMessageToastItem>) => {
    removeMessage(event.detail.key);
  };

  return (
    <div id="containerDiv">
      <oj-c-message-toast
        data={messages}
        detailTemplateValue={getDetailTemplate}
        position={toastPosition}
        onojClose={closeMessage}
      >
        <template
          slot="action"
          render={(context) => renderActionTemplate(context, removeMessage)}
        />
        <template slot="detailLink" render={renderDetailLinkTemplate} />
      </oj-c-message-toast>
    </div>
  );
};

export default MessagetoastDetailActionscorepack;
