import { ojMessage } from 'ojs/ojmessage';
import 'ojs/ojmessages';
import 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

export const MessagesSortingMessages = () => {
  const severityLevel = useMemo<Record<NonNullable<ojMessage.Message['severity']>, number>>(() => ({
      error: 4,
      warning: 3,
      info: 2,
      confirmation: 1,
      none: 0
  }), []);
  const messagesData = useMemo<ojMessage.Message[]>(() => [
      {
          severity: 'warning',
          summary: 'Warning message summary',
          detail: 'Warning message detail'
      },
      {
          severity: 'confirmation',
          summary: 'Confirmation message summary',
          detail: 'Confirmation message detail'
      },
      {
          severity: 'error',
          summary: 'Error message summary',
          detail: 'Error message detail'
      },
      {
          severity: 'info',
          summary: 'Info message summary',
          detail: 'Info message detail'
      }
  ], []);
  const sortedMessages = useMemo(() => {
      const nextMessages = [...messagesData];

      nextMessages.sort((left, right) => {
          const leftSeverity = left.severity ?? 'none';
          const rightSeverity = right.severity ?? 'none';

          return severityLevel[rightSeverity] - severityLevel[leftSeverity];
      });

      return nextMessages;
  }, [messagesData, severityLevel]);
  const messagesDataprovider = useMemo(
      () => new ArrayDataProvider<string, ojMessage.Message>(sortedMessages, { keyAttributes: 'summary' }),
      [sortedMessages]
  );

  return (
      <div id="sortingMessages">
            <oj-messages id="oj-messages-id" messages={messagesDataprovider} displayOptions={{ category: 'none' }} />
        </div>
    );
};

export default MessagesSortingMessages;
