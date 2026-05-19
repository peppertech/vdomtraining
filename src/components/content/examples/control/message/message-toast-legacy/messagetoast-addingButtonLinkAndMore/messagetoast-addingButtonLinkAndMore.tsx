import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import { ojMessage } from 'ojs/ojmessage';
import { ojMessages } from 'ojs/ojmessages';
import 'ojs/ojmessage';
import 'ojs/ojmessages';

type CustomAction = {
  action?: string;
  title?: string;
};

type CustomMessage = ojMessage.Message & {
  link?: CustomAction;
  actions?: CustomAction[];
};
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
  of: '#addingButtonLinkAndMore'
};

const createAction = (action?: string, title?: string): CustomAction => {
  return {
    action,
    title
  };
};

const createMessage = (
  severity: NonNullable<ojMessage.Message['severity']>,
  detail: string,
  link?: CustomAction,
  actions?: CustomAction[],
  timestamp?: ojMessage.Message['timestamp'],
  closeAffordance?: ojMessage.Message['closeAffordance']
): CustomMessage => {
  const initCapSeverity = severity.charAt(0).toUpperCase() + severity.slice(1);

  return {
    closeAffordance: closeAffordance ?? 'none',
    severity,
    summary: `${initCapSeverity} message summary`,
    detail,
    timestamp,
    link,
    actions
  };
};

export const MessagetoastAddingButtonLinkAndMore = () => {
  const isoTimeNow = IntlConverterUtils.dateToLocalIso(new Date());

  const [applicationMessages, setApplicationMessages] = useState<CustomMessage[]>([
    createMessage(
      'error',
      'This message uses the "messageTemplate" slot on "oj-messages" to override the message content, and the "detail" slot on "oj-message" to add actions.',
      undefined,
      [createAction('#', 'Learn more'), createAction('#', 'See details')],
      isoTimeNow,
      'defaults'
    ),
    createMessage(
      'info',
      'This message uses the "messageTemplate" slot on "oj-messages" to override the message content, and the "detail" slot on "oj-message" to add a link in-lined to the message detail text.',
      createAction('#', 'More Info')
    )
  ]);

  const dataprovider = useMemo(
    () =>
      new ArrayDataProvider<string, CustomMessage>(applicationMessages, {
        keyAttributes: 'summary'
      }),
    [applicationMessages]
  );

  const renderActionLink = (action: CustomAction) => {
    return (
      <div class="oj-flex-item oj-sm-margin-5x-end">
        <a href={action.action} class="oj-link-standalone oj-typography-body-sm oj-typography-semi-bold">
          {action.title}
        </a>
      </div>
    );
  };

  const renderMessageTemplate = (context: ojMessages.MessageTemplateContext) => {
    const message = context.data as CustomMessage;

    return (
      <oj-message
        message={message}
        class="oj-color-invert"
        displayOptions={{ category: 'none' }}
        onojClose={handleRemoveMessageData}
      >
        <div slot="detail" class="oj-flex oj-sm-flex-direction-column">
          <div class="oj-flex-item">
            <span>
              {message.detail}
              {message.link ? (
                <a href={message.link.action} class="oj-link-embedded oj-link-subtle-secondary">
                  {message.link.title}
                </a>
              ) : null}
            </span>
          </div>
          {message.actions?.length ? (
            <div class="oj-flex oj-flex-item oj-sm-flex-items-initial oj-sm-padding-2x-top">
              {message.actions.map(renderActionLink)}
            </div>
          ) : null}
        </div>
      </oj-message>
    );
  };

  const handleRemoveMessageData = (event: ojMessage.ojClose) => {
    setApplicationMessages((currentMessages) =>
      currentMessages.filter((message) => message !== (event.detail.message as CustomMessage))
    );
  };

  return (
    <div id="addingButtonLinkAndMore">
      <oj-messages messages={dataprovider} display="notification" position={notificationPosition}>
        <template slot="messageTemplate" render={renderMessageTemplate} />
      </oj-messages>
    </div>
  );
};

export default MessagetoastAddingButtonLinkAndMore;
