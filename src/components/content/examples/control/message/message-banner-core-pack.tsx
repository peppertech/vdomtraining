/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

// CorePack component import
import "oj-c/message-banner";
import "ojs/ojnavigationlist";

// Type imports
import { CMessageBannerElement,MessageBannerItem,MessageBannerTemplateContext } from "oj-c/message-banner";
import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import { ojNavigationList } from "ojs/ojnavigationlist";
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

type BannerExampleNavItem = {
  id: string;
  name: string;
};

const sampleMessages: DemoMessageBannerItem[] = [
  {
    id: 'error',
    severity: 'error',
    summary: 'Error message summary',
    detail: 'Error message detail.',
    closeAffordance: 'off'
  },
  {
    id: 'warning',
    severity: 'warning',
    summary: 'Warning message summary',
    detail: 'Warning message detail.',
    closeAffordance: 'off'
  },
  {
    id: 'info',
    severity: 'info',
    summary: 'Information message summary',
    detail: 'Information message detail.',
    closeAffordance: 'off'
  },
  {
    id: 'confirmation',
    severity: 'confirmation',
    summary: 'Success message summary',
    detail: 'Success message detail.',
    closeAffordance: 'off'
  },
  {
    id: 'none',
    severity: 'none',
    summary: 'Neutral message summary',
    detail: 'Neutral message detail.',
    closeAffordance: 'off'
  }
];

const customDetailMessagesData: DemoCustomDetailMessageBannerItem[] = [
  {
    id: 'message1',
    severity: 'warning',
    summary: 'Warning message summary',
    detail:
      "This message uses the 'detail-template-value' property of the oj-c-message-banner component to choose the 'actions' template from the provided dynamic template slots." +
      'This overrides the default detail and renders the custom detail text and the action items.',
    actions: [
      { title: 'Learn more', link: '#learnMore' },
      { title: 'View details', link: '#viewDetails' }
    ],
    closeAffordance: 'off'
  }
];

const closeAffordanceMessagesData: DemoMessageBannerItem[] = [
  {
    id: 'message1',
    severity: 'error',
    summary: 'Error message summary',
    detail: 'Error message detail.'
  },
  {
    id: 'message2',
    severity: 'error',
    summary: 'Error message summary'
  }
];

const timestampMessagesData: DemoMessageBannerItem[] = [
  {
    id: 'error',
    severity: 'error',
    summary: 'Error message summary',
    detail: 'Error message detail.',
    timestamp: new Date('1/1/2024').toISOString(),
    closeAffordance: 'off'
  },
  {
    id: 'long1',
    severity: 'error',
    summary:
      'Error message with really long summary text to show how the text wraps up when it overflows. ' +
      'The component supports having a really long text for the summary region and the text gets wrapped to the next line ' +
      'when there is not enough space to render the whole text in one line.',
    detail:
      'Error message with really long detail text to show how the text wraps up when it overflows. ' +
      'The component supports having a really long text for the detail region and the text gets wrapped to the next line ' +
      'when there is not enough space to render the whole text in one line.',
    timestamp: new Date('1/1/2024').toISOString()
  }
];

const bannerExampleNavItems: BannerExampleNavItem[] = [
  { id: "page", name: "Page level messages" },
  { id: "section", name: "Section level messages" },
  { id: "custom-detail", name: "Custom detail template" },
  { id: "close-affordance", name: "Close affordance" },
  { id: "timestamp", name: "Timestamp" }
];

const bannerExamplesDataProvider = new MutableArrayTreeDataProvider<
  BannerExampleNavItem["id"],
  BannerExampleNavItem
>(bannerExampleNavItems, "id", {
  keyAttributeScope: "global"
});

export const MessageBannerCorePackOverview = () => {
  const [activeExampleId, setActiveExampleId] =
    useState<BannerExampleNavItem["id"]>("page");
  // Page level messages
  const [pageMessages, setPageMessages] = useState<DemoMessageBannerItem[]>(sampleMessages);

  // Section level messages
  const [sectionMessages, setSectionMessages] = useState<DemoMessageBannerItem[]>(sampleMessages);

  // Custom detail messages
  const [customDetailMessages, setCustomDetailMessages] = useState<DemoCustomDetailMessageBannerItem[]>(customDetailMessagesData);

  // Close affordance messages
  const [closeAffordanceMessages, setCloseAffordanceMessages] = useState<DemoMessageBannerItem[]>(closeAffordanceMessagesData);

  // Timestamp messages
  const [timestampMessages, setTimestampMessages] = useState<DemoMessageBannerItem[]>(timestampMessagesData);

  // Data providers
  const pageMessagesDP = useMemo(
    () =>
      new MutableArrayDataProvider(pageMessages, {
        keyAttributes: "id",
      }),
    [pageMessages]
  );

  const sectionMessagesDP = useMemo(
    () =>
      new MutableArrayDataProvider(sectionMessages, {
        keyAttributes: "id",
      }),
    [sectionMessages]
  );

  const customDetailMessagesDP = useMemo(
    () =>
      new MutableArrayDataProvider(customDetailMessages, {
        keyAttributes: "id",
      }),
    [customDetailMessages]
  );

  const closeAffordanceMessagesDP = useMemo(
    () =>
      new MutableArrayDataProvider(closeAffordanceMessages, {
        keyAttributes: "id",
      }),
    [closeAffordanceMessages]
  );

  const timestampMessagesDP = useMemo(
    () =>
      new MutableArrayDataProvider(timestampMessages, {
        keyAttributes: "id",
      }),
    [timestampMessages]
  );

  // Template for custom detail
  const actionsTemplate: import("ojs/ojvcomponent").TemplateSlot<MessageBannerTemplateContext<string, DemoCustomDetailMessageBannerItem>> = useCallback(
    (context) => (
      <div>
        {/* The detail text area */}
        <div class="oj-flex-item">
          <span>{context.data.detail}</span>
        </div>
        {/* Detail action items */}
        <div class="oj-flex oj-flex-item oj-sm-flex-items-initial oj-sm-padding-2x-top">
          {/* First action item */}
          <div class="oj-flex-item oj-sm-margin-5x-end">
            <a
              href={context.data.actions?.[0]?.link}
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
          {/* Second action item */}
          <div class="oj-flex-item oj-sm-margin-5x-end">
            <a
              href={context.data.actions?.[1]?.link}
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
    ),
    []
  );

  // Event handlers
  const closeCustomDetailMessage = useCallback(
    (event: CMessageBannerElement.ojClose<string, DemoCustomDetailMessageBannerItem>) => {
      const { data } = event.detail;
      setCustomDetailMessages((prev) =>
        prev.filter((msg) => msg.id !== data.id)
      );
    },
    []
  );

  const closeCloseAffordanceMessage = useCallback(
    (event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      const { data } = event.detail;
      setCloseAffordanceMessages((prev) =>
        prev.filter((msg) => msg.id !== data.id)
      );
    },
    []
  );

  const closeTimestampMessage = useCallback(
    (event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      const { data } = event.detail;
      setTimestampMessages((prev) =>
        prev.filter((msg) => msg.id !== data.id)
      );
    },
    []
  );

  const handleNavigationChange = useCallback(
    (event: ojNavigationList.selectionChanged<string, BannerExampleNavItem>) => {
      if (event.detail.updatedFrom === "internal") {
        setActiveExampleId(event.detail.value);
      }
    },
    []
  );

  const renderNavigationItem = (
    item: ojNavigationList.ItemContext<string, BannerExampleNavItem>
  ) => {
    return (
      <li id={item.data.id}>
        <a href="#" style="color: inherit; text-decoration: none;">
          {item.data.name}
        </a>
      </li>
    );
  };

  const activeExampleTitle = useMemo(() => {
    return (
      bannerExampleNavItems.find((item) => item.id === activeExampleId)?.name ??
      "Message banner example"
    );
  }, [activeExampleId]);

  const renderActiveExample = () => {
    switch (activeExampleId) {
      case "page":
        return (
          <oj-c-message-banner
            data={pageMessagesDP}
            type="page"
          ></oj-c-message-banner>
        );
      case "section":
        return (
          <oj-c-message-banner
            data={sectionMessagesDP}
            type="section"
          ></oj-c-message-banner>
        );
      case "custom-detail":
        return (
          <oj-c-message-banner
            data={customDetailMessagesDP}
            detailTemplateValue="actions"
            onojClose={closeCustomDetailMessage}
          >
            <template slot="actions" render={actionsTemplate}></template>
          </oj-c-message-banner>
        );
      case "close-affordance":
        return (
          <oj-c-message-banner
            data={closeAffordanceMessagesDP}
            onojClose={closeCloseAffordanceMessage}
          ></oj-c-message-banner>
        );
      case "timestamp":
        return (
          <oj-c-message-banner
            data={timestampMessagesDP}
            onojClose={closeTimestampMessage}
          ></oj-c-message-banner>
        );
      default:
        return null;
    }
  };

  return (
    <div id="containerDiv" class="oj-flex oj-sm-flex-wrap-nowrap oj-sm-column-gap-4x">
        <oj-navigation-list
          aria-label="Message banner examples"
          selection={activeExampleId}
          data={bannerExamplesDataProvider}
          onselectionChanged={handleNavigationChange}
        >
          <template slot="itemTemplate" render={renderNavigationItem}></template>
        </oj-navigation-list>
      <div
        class="oj-flex-item"
        style="width: 80%; max-width: 80%; flex: 0 0 80%; padding-left: 25px;"
      >
        <h6>{activeExampleTitle}</h6>
        {renderActiveExample()}
      </div>
    </div>
  );
};
