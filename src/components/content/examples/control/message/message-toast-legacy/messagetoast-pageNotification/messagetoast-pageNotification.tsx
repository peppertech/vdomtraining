import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import Context = require('ojs/ojcontext');
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import { ojMessage } from 'ojs/ojmessage';
import { ojMessages } from 'ojs/ojmessages';
import { ojPopup } from 'ojs/ojpopup';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojmessage';
import 'ojs/ojmessages';
import 'ojs/ojoption';
import 'ojs/ojpopup';
import 'ojs/ojselectsingle';

type MessagesPosition = NonNullable<ComponentProps<'oj-messages'>['position']>;
type PopupPosition = NonNullable<ComponentProps<'oj-popup'>['position']>;
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];
type SelectSingleValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-select-single'>['onvalueChanged']>
>[0];

type MessageSeverity = Exclude<ojMessage.Message['severity'], undefined>;
type PositionOptionValue =
  | 'top-end-window'
  | 'top-start-window'
  | 'top-end-page'
  | 'top-start-page'
  | 'bottom-end-window'
  | 'bottom-center-window'
  | 'bottom-start-window';

type PageInfo = {
  messages: MessagesPosition;
  settingsPopup: PopupPosition;
};

type PositionOption = {
  value: PositionOptionValue;
  label: string;
};

const POSITION_OPTIONS: PositionOption[] = [
  { value: 'top-end-window', label: 'Top of window at end' },
  { value: 'top-start-window', label: 'Top of window at start' },
  { value: 'top-end-page', label: 'Below page header at end' },
  { value: 'top-start-page', label: 'Below page header at start' },
  { value: 'bottom-end-window', label: 'Bottom of window at end' },
  { value: 'bottom-center-window', label: 'Bottom of window at center' },
  { value: 'bottom-start-window', label: 'Bottom of window at start' }
];

const MESSAGE_SEVERITIES: MessageSeverity[] = [
  'error',
  'warning',
  'info',
  'confirmation',
  'none'
];

const PAGE_CONTENT_PARAGRAPH =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.';

const createPositionMappings = (): Record<PositionOptionValue, PageInfo> => {
  return {
    'top-start-page': {
      messages: {
        my: { vertical: 'top', horizontal: 'start' },
        at: { vertical: 'bottom', horizontal: 'start' },
        of: '#pageHeader'
      },
      settingsPopup: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: '#settings'
      }
    },
    'top-end-page': {
      messages: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: '#pageHeader'
      },
      settingsPopup: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: '#settings'
      }
    },
    'top-start-window': {
      messages: {
        my: { vertical: 'top', horizontal: 'start' },
        at: { vertical: 'top', horizontal: 'start' },
        of: 'window'
      },
      settingsPopup: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: '#settings'
      }
    },
    'top-end-window': {
      messages: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'top', horizontal: 'end' },
        of: 'window'
      },
      settingsPopup: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: '#settings'
      }
    },
    'bottom-start-window': {
      messages: {
        my: { vertical: 'bottom', horizontal: 'start' },
        at: { vertical: 'bottom', horizontal: 'start' },
        of: 'window'
      },
      settingsPopup: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: '#settings'
      }
    },
    'bottom-end-window': {
      messages: {
        my: { vertical: 'bottom', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: 'window'
      },
      settingsPopup: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: '#settings'
      }
    },
    'bottom-center-window': {
      messages: {
        my: { vertical: 'bottom', horizontal: 'center' },
        at: { vertical: 'bottom', horizontal: 'center' },
        of: 'window'
      },
      settingsPopup: {
        my: { vertical: 'top', horizontal: 'end' },
        at: { vertical: 'bottom', horizontal: 'end' },
        of: '#settings'
      }
    }
  };
};

export const MessagetoastPageNotification = () => {
  const settingsPopupRef = useRef<ojPopup | null>(null);
  const smQuery = ResponsiveUtils.getFrameworkQuery('sm-only') || '(max-width: 599px)';
  const isSmallScreen = typeof window !== 'undefined' && matchMedia(smQuery).matches;
  const paraCount = isSmallScreen ? 5 : 25;

  const [commonOptions, setCommonOptions] = useState<string[]>(['dark']);
  const [newMessagesOptions, setNewMessagesOptions] = useState<string[]>(['closeAffordance']);
  const [selectedMessages, setSelectedMessages] = useState<MessageSeverity[]>([
    'error',
    'warning',
    'none'
  ]);
  const [selectedPositionOption, setSelectedPositionOption] =
    useState<PositionOptionValue>('bottom-center-window');

  const positionMappings = useMemo(() => createPositionMappings(), []);
  const positionOptionsDP = useMemo(
    () =>
      new ArrayDataProvider<PositionOptionValue, PositionOption>(POSITION_OPTIONS, {
        keyAttributes: 'value'
      }),
    []
  );

  const getMessageDetail = (severity: string) => {
    if (newMessagesOptions.includes('detail')) {
      return `${severity} message detail`;
    }

    return undefined;
  };

  const createMessage = (severity: MessageSeverity): ojMessage.Message => {
    const initCapSeverity = severity.charAt(0).toUpperCase() + severity.slice(1);

    return {
      severity,
      summary: `${initCapSeverity} message summary`,
      detail: getMessageDetail(initCapSeverity),
      closeAffordance: newMessagesOptions.includes('closeAffordance') ? 'defaults' : 'none',
      autoTimeout: newMessagesOptions.includes('autoTimeout') ? 0 : -1,
      sound: newMessagesOptions.includes('sound') ? 'defaults' : 'none',
      timestamp: newMessagesOptions.includes('timeStamp')
        ? IntlConverterUtils.dateToLocalIso(new Date())
        : undefined
    };
  };

  const [applicationMessages, setApplicationMessages] = useState<ojMessage.Message[]>(() =>
    (['error', 'warning', 'none'] as MessageSeverity[]).map((severity) => createMessage(severity))
  );

  const dataprovider = useMemo(
    () =>
      new ArrayDataProvider<string, ojMessage.Message>(applicationMessages, {
        keyAttributes: 'summary'
      }),
    [applicationMessages]
  );

  const messagesPosition = positionMappings[selectedPositionOption].messages;
  const settingsPopupPosition = positionMappings[selectedPositionOption].settingsPopup;
  const computedCategoryOption: ojMessage.DisplayOptions = commonOptions.includes('category')
    ? { category: 'auto' }
    : { category: 'none' };
  const showDarkToasts = commonOptions.includes('dark');
  const contentParagraphs = useMemo(() => {
    return Array.from({ length: paraCount }, () => {
      return PAGE_CONTENT_PARAGRAPH;
    });
  }, [paraCount]);

  const handleCommonOptionsValueChanged = (event: CheckboxsetValueChangedEvent) => {
    setCommonOptions((event.detail.value ?? []) as string[]);
  };

  const handleSelectedPositionOptionValueChanged = (event: SelectSingleValueChangedEvent) => {
    const nextValue = event.detail.value as PositionOptionValue | null;
    if (nextValue) {
      setSelectedPositionOption(nextValue);
    }
  };

  const handleNewMessagesOptionsValueChanged = (event: CheckboxsetValueChangedEvent) => {
    setNewMessagesOptions((event.detail.value ?? []) as string[]);
  };

  const handleSelectedMessagesValueChanged = (event: CheckboxsetValueChangedEvent) => {
    const nextSelectedMessages = ((event.detail.value ?? []) as MessageSeverity[]).filter(
      (severity) => MESSAGE_SEVERITIES.includes(severity)
    );

    setSelectedMessages(nextSelectedMessages);
    setApplicationMessages(nextSelectedMessages.map(createMessage));
  };

  const handleMessageClose = (event: ojMessage.ojClose) => {
    const closedMessage = event.detail.message;
    const closedSeverity = closedMessage.severity as MessageSeverity | undefined;

    setApplicationMessages((currentMessages) =>
      currentMessages.filter((message) => message !== closedMessage)
    );
    if (closedSeverity) {
      setSelectedMessages((currentMessages) =>
        currentMessages.filter((severity) => severity !== closedSeverity)
      );
    }
  };

  const handleOpenSettingsPopup = () => {
    settingsPopupRef.current?.open('#settings', settingsPopupPosition);
  };

  useEffect(() => {
    let isMounted = true;
    const popup = settingsPopupRef.current;

    if (popup) {
      void Context.getContext(popup)
        .getBusyContext()
        .whenReady()
        .then(() => {
          if (isMounted && popup.isConnected && !popup.isOpen()) {
            popup.open('#settings', settingsPopupPosition);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [settingsPopupPosition]);

  const handleCloseSettingsPopup = () => {
    settingsPopupRef.current?.close();
  };

  const renderMessageTemplate = (context: ojMessages.MessageTemplateContext) => {
    return (
      <oj-message
        message={context.data}
        class={showDarkToasts ? 'oj-color-invert' : undefined}
        displayOptions={computedCategoryOption}
        onojClose={handleMessageClose}
      />
    );
  };

  return (
    <div id="pageNotificationMessages" class="demo-messages-page-container">
      <header id="pageHeader" role="banner" class="oj-web-applayout-header">
        <div class="oj-flex oj-flex-bar oj-sm-align-items-center">
          <div class="oj-flex-bar-middle oj-flex oj-sm-align-items-baseline">
            <div role="img" class="demo-oracle-icon" title="Oracle Logo" />
            <h1 class="oj-sm-only-hide oj-web-applayout-header-title" title="Application Name">
              Application Name
            </h1>
          </div>
          <div class="oj-flex-bar-end oj-flex oj-sm-align-items-baseline">
            <span class="oj-sm-only-hide">Messages settings</span>
            <oj-button id="settings" display="icons" chroming="borderless" onojAction={handleOpenSettingsPopup}>
              Open settings popup - Add new messages, change the properties of messages and more
              <span slot="endIcon" class="oj-ux-ico-settings" />
            </oj-button>
          </div>
        </div>
      </header>
      <oj-messages id="oj-messages-id" messages={dataprovider} display="notification" position={messagesPosition}>
        <template slot="messageTemplate" render={renderMessageTemplate} />
      </oj-messages>
      <div role="main">
        <div id="content" class="oj-web-padding">
          <h2>Page Content Area</h2>
          {contentParagraphs.map((paragraph) => {
            return <p>{paragraph}</p>;
          })}
        </div>
      </div>
      <oj-popup
        ref={settingsPopupRef}
        id="settingsPopup"
        position={settingsPopupPosition}
        autoDismiss="none"
        modality="modeless"
        class="oj-bg-info-30"
      >
        <div class="oj-flex-bar oj-flex oj-sm-align-items-center oj-header-border">
          <div class="oj-flex-bar-start">
            <h4 title="Messages settings">Messages settings</h4>
          </div>
          <div class="oj-flex-bar-end">
            <oj-button display="icons" chroming="borderless" onojAction={handleCloseSettingsPopup}>
              Close settings popup
              <span slot="endIcon" class="oj-ux-ico-close" />
            </oj-button>
          </div>
        </div>
        <div class="oj-flex">
          <div class="oj-sm-margin-2x-end oj-flex-item oj-sm-only-hide">
            <oj-checkboxset
              onvalueChanged={handleCommonOptionsValueChanged}
              value={commonOptions}
              labelHint="Common options"
              labelEdge="inside"
            >
              <oj-option value="category">Category text</oj-option>
              <oj-option value="dark">Dark background</oj-option>
            </oj-checkboxset>
            <oj-select-single
              id="position"
              data={positionOptionsDP}
              itemText="label"
              labelHint="Position of messages"
              labelEdge="inside"
              onvalueChanged={handleSelectedPositionOptionValueChanged}
              value={selectedPositionOption}
            />
          </div>
          <div class="oj-sm-margin-2x-end oj-flex-item oj-sm-only-hide">
            <oj-checkboxset
              onvalueChanged={handleNewMessagesOptionsValueChanged}
              value={newMessagesOptions}
              labelHint="New messages options"
              labelEdge="inside"
            >
              <oj-option value="closeAffordance">Close affordance</oj-option>
              <oj-option value="autoTimeout">Auto timeout</oj-option>
              <oj-option value="sound">Sound</oj-option>
              <oj-option value="detail">Detail</oj-option>
              <oj-option value="timeStamp">Timestamp</oj-option>
            </oj-checkboxset>
          </div>
          <div class="oj-sm-margin-2x-end oj-flex-item">
            <oj-checkboxset
              value={selectedMessages}
              labelHint="Add/Remove messages"
              labelEdge="inside"
              onvalueChanged={handleSelectedMessagesValueChanged}
            >
              <oj-option value="error">Error</oj-option>
              <oj-option value="warning">Warning</oj-option>
              <oj-option value="info">Info</oj-option>
              <oj-option value="confirmation">Confirmation</oj-option>
              <oj-option value="none">None</oj-option>
            </oj-checkboxset>
          </div>
        </div>
      </oj-popup>
    </div>
  );
};

export default MessagetoastPageNotification;
