import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import { MessageBannerItem, MessageBannerElement } from 'ojs/ojmessagebanner';
import 'ojs/ojmessagebanner';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type DemoMessageBannerItem = MessageBannerItem & {
    id: string;
};

export const MessagebannerSimple = () => {
  const initialData = [
      {
          id: 'error1',
          severity: 'error',
          summary: 'Error message summary',
          detail: 'Error message detail.',
          closeAffordance: 'off'
      },
      {
          id: 'warning1',
          severity: 'warning',
          summary: 'Warning message summary with timestamp',
          detail: 'Warning message detail.',
          timestamp: new Date().toISOString()
      },
      {
          id: 'confirmation1',
          severity: 'confirmation',
          summary: 'Confirmation message summary',
          detail: 'Confirmation message detail'
      },
      {
          id: 'info1',
          severity: 'info',
          summary: 'Info message summary with no detail',
          closeAffordance: 'off'
      },
      {
          id: 'none1',
          severity: 'none',
          summary: 'Message summary with no severity and detail',
          timestamp: new Date().toISOString()
      },
      {
          id: 'long1',
          severity: 'error',
          summary: 'Error message with really long summary text to show how the text wraps up when it overflows. ' +
              'The component supports having a really long text for the summary region and the text gets wrapped to the next line ' +
              'when there is not enough space to render the whole text in one line.',
          detail: 'Error message with really long detail text to show how the text wraps up when it overflows. ' +
              'The component supports having a really long text for the detail region and the text gets wrapped to the next line ' +
              'when there is not enough space to render the whole text in one line.',
          timestamp: new Date('1/1/2020').toISOString()
      }
  ];

  const messages = useMemo(() => new MutableArrayDataProvider<string, DemoMessageBannerItem>(initialData, {
      keyAttributes: 'id'
  }), []);

  const closeMessage = (event: MessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      let data = messages.data.slice();
      const closeMessageKey = event.detail.key;
      data = data.filter((message: DemoMessageBannerItem) => message.id !== closeMessageKey);
      messages.data = data;
  };

  return (
      <div id="containerDiv"><oj-message-banner data={messages} type="page" onojClose={closeMessage} /></div>
    );
};

export default MessagebannerSimple;
