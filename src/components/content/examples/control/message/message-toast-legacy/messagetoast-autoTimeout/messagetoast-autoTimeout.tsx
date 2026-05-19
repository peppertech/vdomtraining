import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import Context = require('ojs/ojcontext');
import { ojMessage } from 'ojs/ojmessage';
import { ojPopup } from 'ojs/ojpopup';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import 'ojs/ojbutton';
import 'ojs/ojcomboboxone';
import 'ojs/ojmessages';
import 'ojs/ojpopup';
import 'ojs/ojtoolbar';

type TimeoutOption = {
  value: string;
  label: string;
};

type MessageData = ojMessage.Message;
type PopupPosition = NonNullable<ComponentProps<'oj-popup'>['position']>;
type MessagesPosition = NonNullable<ComponentProps<'oj-messages'>['position']>;
type ComboboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-combobox-one'>['onvalueChanged']>
>[0];
type ComboboxValue = ComponentProps<'oj-combobox-one'>['value'];

const timeoutOptions: TimeoutOption[] = [
  { value: '-1', label: 'No auto timeout' },
  { value: '0', label: 'Theme default' },
  { value: '6000', label: '6 seconds' },
  { value: '10000', label: '10 seconds' },
  { value: '15000', label: '15 seconds' }
];

const buildPopupPosition = (smallScreen: boolean): PopupPosition => ({
  my: {
    vertical: smallScreen ? 'bottom' : 'top',
    horizontal: 'start'
  },
  at: {
    vertical: smallScreen ? 'bottom' : 'top',
    horizontal: 'start'
  },
  of: '#autoTimeout'
});

const buildMessagesPosition = (): MessagesPosition => ({
  my: {
    vertical: 'top',
    horizontal: 'end'
  },
  at: {
    vertical: 'top',
    horizontal: 'end'
  },
  of: '#messages_anchor'
});

export const MessagetoastAutoTimeout = () => {
  const mediaQuery = ResponsiveUtils.getFrameworkQuery('sm-only') || '(max-width: 599px)';
  const [smallScreen, setSmallScreen] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(mediaQuery).matches
  );
  const [errorMessageTimeout, setErrorMessageTimeout] = useState<ComboboxValue>('-1');
  const [warningMessageTimeout, setWarningMessageTimeout] = useState<ComboboxValue>('-1');
  const [infoMessageTimeout, setInfoMessageTimeout] = useState<ComboboxValue>('-1');
  const [confirmationMessageTimeout, setConfirmationMessageTimeout] = useState<ComboboxValue>(
    '-1'
  );
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const matcher = window.matchMedia(mediaQuery);
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
  }, [mediaQuery]);

  const getMessagesData = (): MessageData[] => [
    {
      severity: 'error',
      summary: 'Error message summary',
      detail: `Message timeout set to: ${errorMessageTimeout}`,
      autoTimeout: parseInt(errorMessageTimeout ?? '-1', 10)
    },
    {
      severity: 'warning',
      summary: 'Warning message summary',
      detail: `Message timeout set to: ${warningMessageTimeout}`,
      autoTimeout: parseInt(warningMessageTimeout ?? '-1', 10)
    },
    {
      severity: 'info',
      summary: 'Information message summary',
      detail: `Message timeout set to: ${infoMessageTimeout}`,
      autoTimeout: parseInt(infoMessageTimeout ?? '-1', 10)
    },
    {
      severity: 'confirmation',
      summary: 'Confirmation message summary',
      detail: `Message timeout set to: ${confirmationMessageTimeout}`,
      autoTimeout: parseInt(confirmationMessageTimeout ?? '-1', 10)
    }
  ];

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
            popup.open('#messages_anchor', buildPopupPosition(smallScreen));
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [smallScreen]);

  const messagesDataprovider = useMemo(
    () => new ArrayDataProvider<number, MessageData>(messages, { keyAttributes: 'summary' }),
    [messages]
  );
  const timeoutOptionsData = useMemo(
    () =>
      new ArrayDataProvider<TimeoutOption['value'], TimeoutOption>(timeoutOptions, {
        keyAttributes: 'value'
      }),
    []
  );

  const handleErrorMessageTimeoutChanged = (event: ComboboxValueChangedEvent) => {
    setErrorMessageTimeout(event.detail.value ?? '-1');
  };

  const handleWarningMessageTimeoutChanged = (event: ComboboxValueChangedEvent) => {
    setWarningMessageTimeout(event.detail.value ?? '-1');
  };

  const handleInfoMessageTimeoutChanged = (event: ComboboxValueChangedEvent) => {
    setInfoMessageTimeout(event.detail.value ?? '-1');
  };

  const handleConfirmationMessageTimeoutChanged = (event: ComboboxValueChangedEvent) => {
    setConfirmationMessageTimeout(event.detail.value ?? '-1');
  };

  const handleUpdateMessages = () => {
    setMessages(getMessagesData());
  };

  return (
    <div id="autoTimeout">
      <div id="messages_anchor" />
      <oj-messages
        id="oj-messages-id"
        class="oj-color-invert"
        messages={messagesDataprovider}
        display="notification"
        position={buildMessagesPosition()}
        displayOptions={{ category: 'none' }}
      />
      <oj-popup
        id="settingsPopup"
        autoDismiss="none"
        modality="modeless"
        class="demo-popup oj-bg-info-30"
        position={buildPopupPosition(smallScreen)}
        initialFocus="none"
      >
        <h4 class="oj-header-border">Messages settings</h4>
        <div class="oj-flex">
          <div class="oj-sm-margin-2x-end oj-flex-item">
            <oj-combobox-one
              value={errorMessageTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
              onvalueChanged={handleErrorMessageTimeoutChanged}
            >
              <span slot="end" class="oj-ux-ico-error-s oj-icon-color-danger oj-sm-padding-2x" />
            </oj-combobox-one>
            <oj-combobox-one
              value={warningMessageTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
              onvalueChanged={handleWarningMessageTimeoutChanged}
            >
              <span
                slot="end"
                class="oj-icon-color-warning oj-ux-ico-warning-s oj-sm-padding-2x"
              />
            </oj-combobox-one>
            <oj-combobox-one
              value={infoMessageTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
              onvalueChanged={handleInfoMessageTimeoutChanged}
            >
              <span slot="end" class="oj-ux-ico-information-s oj-sm-padding-2x" />
            </oj-combobox-one>
            <oj-combobox-one
              value={confirmationMessageTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
              onvalueChanged={handleConfirmationMessageTimeoutChanged}
            >
              <span
                slot="end"
                class="oj-ux-ico-check-circle-s oj-icon-color-success oj-sm-padding-2x"
              />
            </oj-combobox-one>
          </div>
        </div>
        <oj-toolbar chroming="outlined" class="oj-divider-top">
          <oj-button onojAction={handleUpdateMessages} class="oj-sm-padding-1x-top oj-sm-padding-1x-end">
            Update messages
          </oj-button>
        </oj-toolbar>
      </oj-popup>
    </div>
  );
};

export default MessagetoastAutoTimeout;
