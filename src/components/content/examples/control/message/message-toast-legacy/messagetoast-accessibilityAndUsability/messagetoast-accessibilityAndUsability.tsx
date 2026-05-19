import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import Context = require('ojs/ojcontext');
import { ojMessage } from 'ojs/ojmessage';
import { ojMessages } from 'ojs/ojmessages';
import { ojPopup } from 'ojs/ojpopup';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojcomboboxone';
import 'ojs/ojmessage';
import 'ojs/ojmessages';
import 'ojs/ojoption';
import 'ojs/ojpopup';
import 'ojs/ojselectcombobox';
import 'ojs/ojtoolbar';

type TimeoutOption = {
  value: string;
  label: string;
};

type ToastMessage = ojMessage.Message;
type MessagesPosition = NonNullable<ComponentProps<'oj-messages'>['position']>;
type PopupPosition = NonNullable<ComponentProps<'oj-popup'>['position']>;
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

const buildMessagesPosition = (topStart: boolean): MessagesPosition => {
  return {
    my: {
      vertical: 'top',
      horizontal: topStart ? 'start' : 'end'
    },
    at: {
      vertical: 'top',
      horizontal: topStart ? 'start' : 'end'
    },
    of: '#messages_anchor'
  };
};

const buildSettingsPopupPosition = (topStart: boolean, smallScreen: boolean): PopupPosition => {
  return {
    my: {
      vertical: smallScreen ? 'bottom' : 'top',
      horizontal: topStart ? 'start' : 'end'
    },
    at: {
      vertical: smallScreen ? 'bottom' : 'top',
      horizontal: topStart ? 'start' : 'end'
    },
    of: '#accessibilityUsability'
  };
};

export const MessagetoastAccessibilityAndUsability = () => {
  const smQuery = ResponsiveUtils.getFrameworkQuery('sm-only') || '(max-width: 599px)';
  const [errorMessageTimeout, setErrorMessageTimeout] = useState<ComboboxValue>('-1');
  const [warningMessageTimeout, setWarningMessageTimeout] = useState<ComboboxValue>('-1');
  const [infoMessageTimeout, setInfoMessageTimeout] = useState<ComboboxValue>('-1');
  const [confirmationMessageTimeout, setConfirmationMessageTimeout] = useState<ComboboxValue>(
    '-1'
  );
  const [commonOptions, setCommonOptions] = useState<string[]>(['sound']);
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const [deletedMessages, setDeletedMessages] = useState<ToastMessage[]>([]);
  const [smallScreen, setSmallScreen] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(smQuery).matches
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const matcher = window.matchMedia(smQuery);
    const update = (event?: MediaQueryListEvent) => {
      setSmallScreen(event ? event.matches : matcher.matches);
    };

    update();
    matcher.addEventListener?.('change', update);
    matcher.addListener?.(update);

    return () => {
      matcher.removeEventListener?.('change', update);
      matcher.removeListener?.(update);
    };
  }, [smQuery]);

  const topStart = commonOptions.includes('topStart');
  const playSound = commonOptions.includes('sound');
  const messagesPosition = useMemo(() => buildMessagesPosition(topStart), [topStart]);
  const settingsPopupPosition = useMemo(
    () => buildSettingsPopupPosition(topStart, smallScreen),
    [smallScreen, topStart]
  );
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

  useEffect(() => {
    let isMounted = true;
    const popup = document.getElementById('settingsPopup') as ojPopup | null;

    if (popup) {
      void Context.getContext(popup)
        .getBusyContext()
        .whenReady()
        .then(() => {
          if (isMounted && popup.isConnected && !popup.isOpen()) {
            popup.open('#messages_anchor', settingsPopupPosition);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [settingsPopupPosition]);

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
      <oj-popup
        id="settingsPopup"
        autoDismiss="none"
        modality="modeless"
        class="demo-popup oj-bg-info-30"
        position={settingsPopupPosition}
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
              <oj-option value="topStart">Position messages at top-start</oj-option>
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
      </oj-popup>
    </div>
  );
};

export default MessagetoastAccessibilityAndUsability;
