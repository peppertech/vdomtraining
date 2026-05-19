import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojMessage } from 'ojs/ojmessage';
import 'ojs/ojmessages';

type MessageData = ojMessage.Message;

export const MessagesInline = () => {
  const isoTimeNow = new Date().toISOString();
  const isoTimeYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const messages = useMemo<MessageData[]>(
    () => [
      {
        severity: 'error',
        summary: 'Error message summary',
        detail: 'Error message detail',
        timestamp: isoTimeNow
      },
      {
        severity: 'warning',
        summary: 'Warning message summary',
        detail: 'Warning message detail'
      },
      {
        severity: 'confirmation',
        summary: 'Confirmation message summary no detail',
        timestamp: isoTimeYesterday
      },
      {
        severity: 'info',
        summary: 'Info message summary no detail'
      },
      {
        severity: 'none',
        summary: 'Message summary no detail'
      }
    ],
    [isoTimeNow, isoTimeYesterday]
  );
  const messagesDataprovider = useMemo(
    () => new ArrayDataProvider<number, MessageData>(messages, { keyAttributes: 'summary' }),
    [messages]
  );

  return (
    <div id="inlineMessages">
      <oj-messages messages={messagesDataprovider} displayOptions={{ category: 'none' }} />
    </div>
  );
};

export default MessagesInline;
