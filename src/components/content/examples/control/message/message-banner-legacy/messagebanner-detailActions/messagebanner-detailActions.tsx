// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import { MessageBannerItem, MessageBannerElement } from 'ojs/ojmessagebanner';
import 'ojs/ojmessagebanner';
import { ItemContext } from 'ojs/ojcommontypes';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type CustomAction = {
    link?: string;
    title?: string;
};

type DemoMessageBannerItem = MessageBannerItem & {
    id: string;
    actions?: [
        CustomAction,
        CustomAction
    ];
    detailLink?: CustomAction;
};

export const MessagebannerDetailActions = () => {
  const initialMessages: Array<DemoMessageBannerItem> = [
      {
          id: 'message1',
          severity: 'warning',
          summary: 'Warning message summary',
          detail: "This message uses the 'detail-template-value' property of the oj-message-banner component to choose the 'actions' template from the provided dynamic template slots." +
              'This overrides the default detail and renders the custom detail text and the action items.',
          actions: [
              { title: 'Learn More', link: '#learnMore' },
              { title: 'View Details', link: '#viewDetails' }
          ],
          timestamp: new Date().toISOString()
      },
      {
          id: 'message2',
          severity: 'info',
          summary: 'Info message summary',
          detail: "This message uses the 'detail-template-value' property of the oj-message-banner component to choose the 'detailLink' template from the provided dynamic template slots." +
              'This overrides the default detail and renders the custom detail text and an inlined link.',
          detailLink: { title: 'More Info', link: '#viewDetails' },
          timestamp: new Date().toISOString()
      }
  ];

  const messages = useMemo(() => new MutableArrayDataProvider(initialMessages, {
      keyAttributes: 'id'
  }), []);

  const getDetailTemplate = (context: ItemContext<string, DemoMessageBannerItem>) => {
      if (context.data.actions != null) {
          return 'actions';
      }
      if (context.data.detailLink != null) {
          return 'detailLink';
      }
      return null;
  };

  const closeMessage = (event: MessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      _removeMessage(event.detail.key);
  };

  const handleAction = (action: CustomAction, key: string, event: MouseEvent) => {
      event.preventDefault();
      if (action.link === '#learnMore') {
          // Perform action for "Learn more"
      }
      else if (action.link === '#viewDetails') {
          // Perform action for "View details"
      }
      // After performing the action, remove the current message
      _removeMessage(key);
      return true;
  };

  const _removeMessage = (key: string) => {
      const data = messages.data.slice();
      messages.data = data.filter((message: any) => (message as any).id !== key);
  };

  return (
      <div id="containerDiv">
            <oj-message-banner data={messages} type="page" detailTemplateValue={getDetailTemplate} onojClose={closeMessage}>
                    <template slot="actions" render={(message: any) => (
                            <>
                                <div class="oj-flex-item"><span>{message.data.detail}</span></div>
                                <div class="oj-flex oj-flex-item oj-sm-flex-items-initial oj-sm-padding-2x-top">
                                              <div class="oj-flex-item oj-sm-margin-5x-end">
                                                              <a href={message.data.actions[0].link} onClick={handleAction.bind(null, message.data.actions[0], message.key)} class="oj-link-standalone oj-link-subtle-primary oj-typography-body-sm oj-typography-semi-bold">{message.data.actions[0].title}</a>
                                                          </div>
                                              <div class="oj-flex-item oj-sm-margin-5x-end">
                                                              <a href={message.data.actions[1].link} onClick={handleAction.bind(null, message.data.actions[1], message.key)} class="oj-link-standalone oj-link-subtle-primary oj-typography-body-sm oj-typography-semi-bold">{message.data.actions[1].title}</a>
                                                          </div>
                                          </div>
                            </>
                          )} />
                    <template slot="detailLink" render={(message: any) => (
                            <>
                                <div class="oj-flex-item">
                                              <span>{message.data.detail}</span>
                                              <a href={message.data.detailLink.link} class="oj-link-embedded oj-link-subtle-secondary">{message.data.detailLink.title}</a>
                                          </div>
                            </>
                          )} />
                </oj-message-banner>
        </div>
    );
};

export default MessagebannerDetailActions;
