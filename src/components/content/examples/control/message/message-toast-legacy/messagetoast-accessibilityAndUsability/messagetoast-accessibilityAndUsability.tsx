import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojMessage } from 'ojs/ojmessage';
import { ojMessages } from 'ojs/ojmessages';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojcomboboxone';
import 'ojs/ojmessage';
import 'ojs/ojmessages';
import 'ojs/ojoption';
import 'ojs/ojselectcombobox';
import 'ojs/ojtoolbar';

type TimeoutOption = {
  value: string;
  label: string;
};

type ToastMessage = ojMessage.Message;
type MessagesPosition = NonNullable<ComponentProps<'oj-messages'>['position']>;
type ComboboxValue = ComponentProps<'oj-combobox-one'>['value'];
type ComboboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-combobox-one'>['onvalueChanged']>
>[0];
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];

const timeoutOptions: TimeoutOption[] = [
  { value: '-1', label: 'No auto timeout' },
  { value: '0', label: '4 seconds (theme default)' },
  { value: '6000', label: '6 seconds' },
  { value: '10000', label: '10 seconds' },
  { value: '15000', label: '15 seconds' }
];

const buildMessagesPosition = (): MessagesPosition => {
  return {
    my: {
      vertical: 'top',
      horizontal: 'end'
    },
    at: {
      vertical: 'top',
      horizontal: 'end'
    },
    of: '#messages_anchor'
  };
};

export const MessagetoastAccessibilityAndUsability = () => {
  const [errorMessageTimeout, setErrorMessageTimeout] = useState<ComboboxValue>('-1');
  const [warningMessageTimeout, setWarningMessageTimeout] = useState<ComboboxValue>('-1');
  const [infoMessageTimeout, setInfoMessageTimeout] = useState<ComboboxValue>('-1');
  const [confirmationMessageTimeout, setConfirmationMessageTimeout] = useState<ComboboxValue>(
    '-1'
  );
  const [commonOptions, setCommonOptions] = useState<string[]>(['sound']);
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const [deletedMessages, setDeletedMessages] = useState<ToastMessage[]>([]);

  const playSound = commonOptions.includes('sound');
  const messagesPosition = useMemo(() => buildMessagesPosition(), []);
  const timeoutOptionsData = useMemo(
    () =>
      new ArrayDataProvider<TimeoutOption['value'], TimeoutOption>(timeoutOptions, {
        keyAttributes: 'value'
      }),
    []
  );

  const getMessagesData = (): ToastMessage[] => {
    return [
      {
        severity: 'error',
        summary: 'Error message summary',
        detail: `Message timeout set to: ${errorMessageTimeout}`,
        autoTimeout: parseInt(errorMessageTimeout ?? '-1', 10),
        sound: playSound ? 'defaults' : 'none'
      },
      {
        severity: 'warning',
        summary: 'Warning message summary',
        detail: `Message timeout set to: ${warningMessageTimeout}`,
        autoTimeout: parseInt(warningMessageTimeout ?? '-1', 10),
        sound: playSound ? 'defaults' : 'none'
      },
      {
        severity: 'info',
        summary: 'Information message summary',
        detail: `Message timeout set to: ${infoMessageTimeout}`,
        autoTimeout: parseInt(infoMessageTimeout ?? '-1', 10),
        sound: playSound ? 'defaults' : 'none'
      },
      {
        severity: 'confirmation',
        summary: 'Confirmation message summary',
        detail: `Message timeout set to: ${confirmationMessageTimeout}`,
        autoTimeout: parseInt(confirmationMessageTimeout ?? '-1', 10),
        sound: playSound ? 'defaults' : 'none'
      }
    ];
  };

  useEffect(() => {
    setMessages(getMessagesData());
  }, []);

  const messagesDataprovider = useMemo(
    () => new ArrayDataProvider<string, ToastMessage>(messages, { keyAttributes: 'summary' }),
    [messages]
  );

  const handleErrorMessageTimeoutValueChanged = (event: ComboboxValueChangedEvent) => {
    setErrorMessageTimeout(event.detail.value ?? '-1');
  };

  const handleWarningMessageTimeoutValueChanged = (event: ComboboxValueChangedEvent) => {
    setWarningMessageTimeout(event.detail.value ?? '-1');
  };

  const handleInfoMessageTimeoutValueChanged = (event: ComboboxValueChangedEvent) => {
    setInfoMessageTimeout(event.detail.value ?? '-1');
  };

  const handleConfirmationMessageTimeoutValueChanged = (event: ComboboxValueChangedEvent) => {
    setConfirmationMessageTimeout(event.detail.value ?? '-1');
  };

  const handleCommonOptionsValueChanged = (event: CheckboxsetValueChangedEvent) => {
    setCommonOptions((event.detail.value ?? []) as string[]);
  };

  const handleUpdateMessages = () => {
    setMessages(getMessagesData());
    setDeletedMessages([]);
  };

  const handleShowTimedoutMessages = () => {
    setMessages((currentMessages) => {
      const restoredMessages = deletedMessages.filter((message) => !currentMessages.includes(message));
      return [...currentMessages, ...restoredMessages];
    });
    setDeletedMessages([]);
  };

  const handleCloseMessage = (event: ojMessage.ojClose) => {
    const closedMessage = event.detail.message;
    setMessages((currentMessages) => currentMessages.filter((message) => message !== closedMessage));
    setDeletedMessages((currentMessages) =>
      currentMessages.includes(closedMessage) ? currentMessages : [...currentMessages, closedMessage]
    );
  };

  const renderMessageTemplate = (context: ojMessages.MessageTemplateContext) => {
    return (
      <oj-message
        message={context.data}
        class="oj-color-invert"
        displayOptions={{ category: 'none' }}
        onojClose={handleCloseMessage}
      />
    );
  };

  return (
    <div id="accessibilityUsability">
      <div id="messages_anchor" />
      <oj-messages
        id="messagesId"
        messages={messagesDataprovider}
        display="notification"
        position={messagesPosition}
      >
        <template slot="messageTemplate" render={renderMessageTemplate} />
      </oj-messages>
      <div
        class="oj-panel oj-bg-info-30 oj-sm-padding-4x"
        style={{
          position: 'sticky',
          top: '0',
          left: '0',
          zIndex: 1,
          maxWidth: '24rem'
        }}
      >
        <h4 class="oj-header-border">Messages settings</h4>
        <div class="oj-flex oj-sm-flex-direction-column">
          <div class="oj-sm-margin-2x-end oj-flex-item">
            <oj-combobox-one
              onvalueChanged={handleErrorMessageTimeoutValueChanged}
              value={errorMessageTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
            >
              <span slot="end" class="oj-ux-ico-error-s oj-icon-color-danger oj-sm-padding-2x" />
            </oj-combobox-one>
            <oj-combobox-one
              onvalueChanged={handleWarningMessageTimeoutValueChanged}
              value={warningMessageTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
            >
              <span
                slot="end"
                class="oj-icon-color-warning oj-ux-ico-warning-s oj-sm-padding-2x"
              />
            </oj-combobox-one>
            <oj-combobox-one
              onvalueChanged={handleInfoMessageTimeoutValueChanged}
              value={infoMessageTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
            >
              <span slot="end" class="oj-ux-ico-information-s oj-sm-padding-2x" />
            </oj-combobox-one>
            <oj-combobox-one
              onvalueChanged={handleConfirmationMessageTimeoutValueChanged}
              value={confirmationMessageTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
            >
              <span
                slot="end"
                class="oj-ux-ico-check-circle-s oj-icon-color-success oj-sm-padding-2x"
              />
            </oj-combobox-one>
          </div>
          <div class="oj-sm-margin-2x-end oj-flex-item">
            <oj-checkboxset
              onvalueChanged={handleCommonOptionsValueChanged}
              value={commonOptions}
              labelHint="Common options"
              labelEdge="inside"
            >
              <oj-option value="sound">Sound</oj-option>
            </oj-checkboxset>
          </div>
        </div>
        <oj-toolbar chroming="outlined" class="oj-divider-top">
          <oj-button onojAction={handleUpdateMessages} class="oj-sm-padding-1x-top oj-sm-padding-1x-end">
            Update messages
          </oj-button>
          {deletedMessages.length !== 0 ? (
            <oj-button
              onojAction={handleShowTimedoutMessages}
              class="oj-sm-padding-1x-top oj-sm-padding-1x-end"
            >
              Show earlier closed messages
            </oj-button>
          ) : null}
        </oj-toolbar>
      </div>
    </div>
  );
};

export default MessagetoastAccessibilityAndUsability;
