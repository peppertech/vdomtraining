// @ts-nocheck
import 'oj-c/message-banner';
import { CMessageBannerElement,MessageBannerItem } from 'oj-c/message-banner';
import { ItemContext } from 'ojs/ojcommontypes';
import 'preact';
import { useMemo } from 'preact/hooks';
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
type MessageTemplateContext = ItemContext<string, DemoMessageBannerItem>;

export const MessagebannerDetailActionscorepack = () => {
  const initialMessages: Array<DemoMessageBannerItem> = [
      {
          id: 'message1',
          severity: 'warning',
          summary: 'Warning message summary',
          detail: "This message uses the 'detail-template-value' property of the oj-c-message-banner component to choose the 'actions' template from the provided dynamic template slots." +
              'This overrides the default detail and renders the custom detail text and the action items.',
          actions: [
              { title: 'Learn more', link: '#learnMore' },
              { title: 'View details', link: '#viewDetails' }
          ],
          timestamp: new Date().toISOString()
      },
      {
          id: 'message2',
          severity: 'info',
          summary: 'Info message summary',
          detail: "This message uses the 'detail-template-value' property of the oj-c-message-banner component to choose the 'detailLink' template from the provided dynamic template slots." +
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

  const closeMessage = (event: CMessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      _removeMessage(event.detail.key);
  };

  const handleAction = (action: CustomAction, key: string) => {
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
      messages.data = data.filter((message: DemoMessageBannerItem) => message.id !== key);
  };

  const renderActions: import("ojs/ojvcomponent").TemplateSlot<MessageTemplateContext> = (message) => (
    <>
      <div class="oj-flex-item"><span>{message.data.detail}</span></div>
      <div class="oj-flex oj-flex-item oj-sm-flex-items-initial oj-sm-padding-2x-top">
        <div class="oj-flex-item oj-sm-margin-5x-end">
          <a href={message.data.actions[0].link} onclick={handleAction.bind(null, message.data.actions[0], message.key)} class="oj-link-standalone oj-link-subtle-primary oj-typography-body-sm oj-typography-semi-bold">{message.data.actions[0].title}</a>
        </div>
        <div class="oj-flex-item oj-sm-margin-5x-end">
          <a href={message.data.actions[1].link} onclick={handleAction.bind(null, message.data.actions[1], message.key)} class="oj-link-standalone oj-link-subtle-primary oj-typography-body-sm oj-typography-semi-bold">{message.data.actions[1].title}</a>
        </div>
      </div>
    </>
  );

  const renderDetailLink: import("ojs/ojvcomponent").TemplateSlot<MessageTemplateContext> = (message) => (
    <div class="oj-flex-item">
      <span>{message.data.detail}</span>
      <a href={message.data.detailLink.link} class="oj-link-embedded oj-link-subtle-secondary">{message.data.detailLink.title}</a>
    </div>
  );

  return (
      <div id="containerDiv">
            <oj-c-message-banner data={messages} type="page" detailTemplateValue={getDetailTemplate} onojClose={closeMessage}>
                    <template slot="actions" render={renderActions} />
                    <template slot="detailLink" render={renderDetailLink} />
                </oj-c-message-banner>
        </div>
    );
};

export default MessagebannerDetailActionscorepack;
