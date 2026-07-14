import 'ojs/ojcheckboxset';
import { ojCheckboxset } from 'ojs/ojcheckboxset';
import 'ojs/ojmessagebanner';
import { MessageBannerElement,MessageBannerItem } from 'ojs/ojmessagebanner';
import 'ojs/ojoption';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type DemoMessageBannerItem = MessageBannerItem & {
    id: string;
};

type BannerSeverity = NonNullable<MessageBannerItem['severity']>;
type PropertyChangedEvent<T> = CustomEvent<{ value: T | null }>;

export const MessagebannerPageMessages = () => {
  const initialData: DemoMessageBannerItem[] = [
      {
          id: 'errorMessage',
          severity: 'error',
          summary: 'Error message summary',
          detail: 'Error message detail.',
          closeAffordance: 'off'
      },
      {
          id: 'warningMessage',
          severity: 'warning',
          summary: 'Warning message summary',
          detail: 'Warning message detail.',
          timestamp: new Date().toISOString()
      },
      {
          id: 'confirmationMessage',
          severity: 'confirmation',
          summary: 'Confirmation message summary',
          detail: 'Confirmation message detail.'
      }
  ];

  const [newMessagesOptions, setNewMessagesOptions] = useState<string[]>(['closeAffordance']);
  const [selectedMessages, setSelectedMessages] = useState<BannerSeverity[]>(['error', 'warning', 'confirmation']);

  const messages = useMemo(() => new MutableArrayDataProvider<string, DemoMessageBannerItem>(initialData, {
      keyAttributes: 'id'
  }), []);
  const getCloseAffordance = (): MessageBannerItem['closeAffordance'] => {
      return newMessagesOptions.includes('closeAffordance') ? 'on' : 'off';
  };
  const getDetail = (): MessageBannerItem['detail'] => {
      return newMessagesOptions.includes('detail') ? 'New message detail.' : undefined;
  };
  const getSound = (): MessageBannerItem['sound'] => {
      return newMessagesOptions.includes('sound') ? 'default' : 'none';
  };
  const getTimestamp = (): MessageBannerItem['timestamp'] => {
      return newMessagesOptions.includes('timeStamp') ? new Date().toISOString() : undefined;
  };

  const handleNewMessagesOptionsValueChanged = (event: PropertyChangedEvent<string[]>) => {
    setNewMessagesOptions(event.detail.value ?? []);
  };

  const closeMessage = (event: MessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      // remove the message from the data to close it
      let data = messages.data.slice();
      const closeMessageKey = event.detail.key;
      data = data.filter((message) => message.id !== closeMessageKey);
      messages.data = data;
      setSelectedMessages((currentSelectedMessages) =>
          currentSelectedMessages.filter((item) => item !== event.detail.data.severity)
      );
  };

  const updateMessages = (event: ojCheckboxset.valueChanged<BannerSeverity, object, BannerSeverity>) => {
      const nextSelectedMessages = event.detail.value;
      if (nextSelectedMessages != null) {
          setSelectedMessages(nextSelectedMessages);
          const data = messages.data.slice();
          const newData: DemoMessageBannerItem[] = [];
          // Only include messages with selected severity
          for (const message of data) {
              if (message.severity != null && nextSelectedMessages.includes(message.severity)) {
                  newData.push(message);
              }
          }
          // Add messages for severity that are not currently shown
          for (const severity of nextSelectedMessages) {
              const isMessageShown = newData.find((message) => message.severity === severity);
              if (!isMessageShown) {
                  const message = createMessage(severity);
                  newData.unshift(message);
              }
          }
          messages.data = newData;
      }
  };

  const createMessage = (severity: BannerSeverity): DemoMessageBannerItem => {
      const id = `${severity}Message`;
      return {
          id,
          severity,
          summary: `${severity[0].toUpperCase()}${severity.slice(1)} message summary`,
          detail: getDetail(),
          closeAffordance: getCloseAffordance(),
          sound: getSound(),
          timestamp: getTimestamp()
      };
  };

  const renderContentParagraph = (_value: unknown, index: number) => {
      return (
          <p key={index}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum
              sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed
              ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien
              sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.
          </p>
      );
  };

  return (
      <div id="containerDiv" class="demo-messages-page-container">
            <header id="pageHeader" role="banner" class="oj-web-applayout-header">
                    <div class="oj-web-applayout-max-width oj-flex-bar oj-sm-align-items-center">
                              <div class="oj-flex-bar-middle oj-sm-align-items-baseline">
                                          <span role="img" class="oj-icon demo-oracle-icon" title="Oracle Logo" />
                                          <h1 class="oj-sm-only-hide oj-web-applayout-header-title" title="Application Name">Application Name</h1>
                                      </div>
                          </div>
                </header>
            <oj-message-banner data={messages} type="page" onojClose={closeMessage} />
            <div class="oj-web-padding oj-web-applayout-max-width" role="main">
                    <div class="oj-typography-heading-md">Page Content Area</div>
                    <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
                              <div class="oj-typography-heading-xs oj-header-border">Messages settings</div>
                              <div class="oj-flex">
                                          <div class="oj-sm-margin-2x-end oj-flex-item">
                                                        <oj-checkboxset onvalueChanged={handleNewMessagesOptionsValueChanged} value={newMessagesOptions} labelHint="New messages options" labelEdge="inside">
                                                                        <oj-option value="closeAffordance">Close affordance</oj-option>
                                                                        <oj-option value="detail">Detail</oj-option>
                                                                        <oj-option value="sound">Sound</oj-option>
                                                                        <oj-option value="timeStamp">Timestamp</oj-option>
                                                                    </oj-checkboxset>
                                                    </div>
                                          <div class="oj-sm-margin-2x-end oj-flex-item">
                                                        <oj-checkboxset value={selectedMessages} onvalueChanged={updateMessages} labelHint="Add/Remove messages" labelEdge="inside">
                                                                        <oj-option value="error">Error</oj-option>
                                                                        <oj-option value="warning">Warning</oj-option>
                                                                        <oj-option value="info">Info</oj-option>
                                                                        <oj-option value="confirmation">Confirmation</oj-option>
                                                                        <oj-option value="none">None</oj-option>
                                                                    </oj-checkboxset>
                                                    </div>
                                      </div>
                          </div>
                    {Array.from({ length: 10 }).map(renderContentParagraph)}
                </div>
        </div>
    );
};

export default MessagebannerPageMessages;
