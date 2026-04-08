/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";

// CorePack component import
import "oj-c/message-banner";

// Type imports
import { MessageBannerItem, MessageBannerTemplateContext } from "oj-c/message-banner";
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

export const MessageBannerCorePackOverview = () => {
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
  const actionsTemplate = useCallback(
    (context: MessageBannerTemplateContext<string, DemoCustomDetailMessageBannerItem>) => (
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
    (event: any) => {
      const { data } = event.detail;
      setCustomDetailMessages((prev) =>
        prev.filter((msg) => msg.id !== data.id)
      );
    },
    []
  );

  const closeCloseAffordanceMessage = useCallback(
    (event: any) => {
      const { data } = event.detail;
      setCloseAffordanceMessages((prev) =>
        prev.filter((msg) => msg.id !== data.id)
      );
    },
    []
  );

  const closeTimestampMessage = useCallback(
    (event: any) => {
      const { data } = event.detail;
      setTimestampMessages((prev) =>
        prev.filter((msg) => msg.id !== data.id)
      );
    },
    []
  );

  return (
    <div id="containerDiv">
      <h4>Page level messages</h4>
      <oj-c-message-banner data={pageMessagesDP} type="page"></oj-c-message-banner>

      <h4>Section level messages</h4>
      <oj-c-message-banner
        data={sectionMessagesDP}
      ></oj-c-message-banner>

      <h4>Custom detail</h4>
      <oj-c-message-banner
        data={customDetailMessagesDP}
        onojClose={closeCustomDetailMessage}
      />

      <h4>Close icon</h4>
      <oj-c-message-banner
        data={closeAffordanceMessagesDP}
        onojClose={closeCloseAffordanceMessage}
      ></oj-c-message-banner>

      <h4>Timestamp</h4>
      <oj-c-message-banner
        data={timestampMessagesDP}
        onojClose={closeTimestampMessage}
      ></oj-c-message-banner>
    </div>
  );
};