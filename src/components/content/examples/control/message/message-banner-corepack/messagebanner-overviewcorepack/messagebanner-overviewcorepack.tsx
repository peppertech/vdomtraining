import "oj-c/message-banner";
import { CMessageBannerElement,MessageBannerItem } from "oj-c/message-banner";
import 'preact';
import { useMemo } from 'preact/hooks';
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type DemoMessageBannerItem = MessageBannerItem & {
  id: string;
};

type CustomAction = {
  link?: string;
  title?: string;
};

type DemoCustomDetailMessageBannerItem = MessageBannerItem & {
  id: string;
  actions?: [CustomAction, CustomAction];
};

type ActionsTemplateContext = {
  data: DemoCustomDetailMessageBannerItem;
  key: string;
  metadata: unknown;
};

const sampleMessages: DemoMessageBannerItem[] = [
  {
    id: "error",
    severity: "error",
    summary: "Error message summary",
    detail: "Error message detail.",
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
    id: "info",
    severity: "info",
    summary: "Information message summary",
    detail: "Information message detail.",
    closeAffordance: "off"
  },
  {
    id: "confirmation",
    severity: "confirmation",
    summary: "Success message summary",
    detail: "Success message detail.",
    closeAffordance: "off"
  },
  {
    id: "none",
    severity: "none",
    summary: "Neutral message summary",
    detail: "Neutral message detail.",
    closeAffordance: "off"
  }
];

const customDetailMessages: DemoCustomDetailMessageBannerItem[] = [
  {
    id: "message1",
    severity: "warning",
    summary: "Warning message summary",
    detail:
      "This message uses the 'detail-template-value' property of the oj-c-message-banner component to choose the 'actions' template from the provided dynamic template slots. This overrides the default detail and renders the custom detail text and the action items.",
    actions: [
      { title: "Learn more", link: "#learnMore" },
      { title: "View details", link: "#viewDetails" }
    ],
    closeAffordance: "off"
  }
];

const closeAffordanceMessages: DemoMessageBannerItem[] = [
  {
    id: "message1",
    severity: "error",
    summary: "Error message summary",
    detail: "Error message detail."
  },
  {
    id: "message2",
    severity: "error",
    summary: "Error message summary"
  }
];

const timestampMessages: DemoMessageBannerItem[] = [
  {
    id: "error",
    severity: "error",
    summary: "Error message summary",
    detail: "Error message detail.",
    timestamp: new Date("1/1/2024").toISOString(),
    closeAffordance: "off"
  },
  {
    id: "long1",
    severity: "error",
    summary:
      "Error message with really long summary text to show how the text wraps up when it overflows. The component supports having a really long text for the summary region and the text gets wrapped to the next line when there is not enough space to render the whole text in one line.",
    detail:
      "Error message with really long detail text to show how the text wraps up when it overflows. The component supports having a really long text for the detail region and the text gets wrapped to the next line when there is not enough space to render the whole text in one line.",
    timestamp: new Date("1/1/2024").toISOString()
  }
];

const renderActionsTemplate: import("ojs/ojvcomponent").TemplateSlot<ActionsTemplateContext> = (context) => (
  <div>
    <div class="oj-flex-item">
      <span>{context.data.detail}</span>
    </div>
    <div class="oj-flex oj-flex-item oj-sm-flex-items-initial oj-sm-padding-2x-top">
      <div class="oj-flex-item oj-sm-margin-5x-end">
        <a
          href={context.data.actions?.[0]?.link ?? "#"}
          class="
            oj-link-standalone
            oj-link-subtle-primary
            oj-typography-body-sm
            oj-typography-semi-bold
          "
        >
          {context.data.actions?.[0]?.title}
        </a>
      </div>
      <div class="oj-flex-item oj-sm-margin-5x-end">
        <a
          href={context.data.actions?.[1]?.link ?? "#"}
          class="
            oj-link-standalone
            oj-link-subtle-primary
            oj-typography-body-sm
            oj-typography-semi-bold
          "
        >
          {context.data.actions?.[1]?.title}
        </a>
      </div>
    </div>
  </div>
);

export const MessagebannerOverviewcorepack = () => {
  const pageMessages = useMemo(
    () => new MutableArrayDataProvider<string, DemoMessageBannerItem>(sampleMessages, { keyAttributes: "id" }),
    []
  );
  const sectionMessages = useMemo(
    () => new MutableArrayDataProvider<string, DemoMessageBannerItem>(sampleMessages, { keyAttributes: "id" }),
    []
  );
  const customMessages = useMemo(
    () => new MutableArrayDataProvider<string, DemoCustomDetailMessageBannerItem>(customDetailMessages, { keyAttributes: "id" }),
    []
  );
  const closableMessages = useMemo(
    () => new MutableArrayDataProvider<string, DemoMessageBannerItem>(closeAffordanceMessages, { keyAttributes: "id" }),
    []
  );
  const datedMessages = useMemo(
    () => new MutableArrayDataProvider<string, DemoMessageBannerItem>(timestampMessages, { keyAttributes: "id" }),
    []
  );

  const closeCustomDetailMessage = (
    event: CMessageBannerElement.ojClose<string, DemoCustomDetailMessageBannerItem>
  ) => {
    customMessages.data = customMessages.data.filter((message) => message.id !== event.detail.key);
  };

  const closeCloseAffordanceMessage = (
    event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>
  ) => {
    closableMessages.data = closableMessages.data.filter((message) => message.id !== event.detail.key);
  };

  const closeTimestampMessage = (event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
    datedMessages.data = datedMessages.data.filter((message) => message.id !== event.detail.key);
  };

  return (
    <div id="containerDiv">
      <h4>Page level messages</h4>
      <oj-c-message-banner data={pageMessages} type="page" />

      <h4>Section level messages</h4>
      <oj-c-message-banner data={sectionMessages} />

      <h4>Custom detail</h4>
      <oj-c-message-banner
        data={customMessages}
        detailTemplateValue="actions"
        onojClose={closeCustomDetailMessage}
      >
        <template slot="actions" render={renderActionsTemplate} />
      </oj-c-message-banner>

      <h4>Close icon</h4>
      <oj-c-message-banner data={closableMessages} onojClose={closeCloseAffordanceMessage} />

      <h4>Timestamp</h4>
      <oj-c-message-banner data={datedMessages} onojClose={closeTimestampMessage} />
    </div>
  );
};

export default MessagebannerOverviewcorepack;
