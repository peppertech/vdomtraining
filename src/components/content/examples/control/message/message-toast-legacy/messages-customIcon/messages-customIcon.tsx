import { ojMessage } from 'ojs/ojmessage';
import 'ojs/ojmessages';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type MessageData = ojMessage.Message;
type MessagesPosition = NonNullable<ComponentProps<'oj-messages'>['position']>;

const notificationPosition: MessagesPosition = {
  my: {
    vertical: 'top',
    horizontal: 'end'
  },
  at: {
    vertical: 'top',
    horizontal: 'end'
  },
  of: '#customIcon'
};

export const MessagesCustomIcon = () => {
  const messages = useMemo<MessageData[]>(() => [
      {
          category: 'Email',
          summary: 'Email message summary',
          detail: 'Email message detail',
          icon: '../images/email.png'
      },
      {
          category: 'Calendar',
          summary: 'Calendar message summary',
          detail: 'Calendar message detail',
          icon: '../images/calendar.gif'
      },
      {
          category: 'Chrome',
          summary: 'Chrome message summary',
          detail: 'Chrome message detail',
          icon: '../images/chrome.png'
      }
  ], []);
  const messagesDataprovider = useMemo(
      () => new ArrayDataProvider<string, MessageData>(messages, { keyAttributes: 'summary' }),
      [messages]
  );

  return (
      <div id="customIcon">
            <oj-messages messages={messagesDataprovider} position={notificationPosition} display="notification" />
        </div>
    );
};

export default MessagesCustomIcon;
