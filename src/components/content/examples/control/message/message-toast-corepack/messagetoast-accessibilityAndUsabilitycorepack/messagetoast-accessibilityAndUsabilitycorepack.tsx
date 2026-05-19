import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import type { CMessageToastElement, MessageToastItem } from 'oj-c/message-toast';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import Context = require('ojs/ojcontext');
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import { ojPopup } from 'ojs/ojpopup';
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import { useToastContainerOffset } from '../useToastContainerOffset';
import 'oj-c/message-toast';
import 'ojs/ojbutton';
import 'ojs/ojcheckboxset';
import 'ojs/ojcomboboxone';
import 'ojs/ojoption';
import 'ojs/ojpopup';
import 'ojs/ojtoolbar';

type TimeoutOption = {
  value: string;
  label: string;
};

type ToastMessage = MessageToastItem & {
  id: string;
};
type ToastPosition = NonNullable<ComponentProps<'oj-c-message-toast'>['position']>;
type PopupPosition = NonNullable<ComponentProps<'oj-popup'>['position']>;
type ComboboxValue = ComponentProps<'oj-combobox-one'>['value'];
type ComboboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-combobox-one'>['onvalueChanged']>
>[0];
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];

const timeoutOptions: TimeoutOption[] = [
  { value: 'off', label: 'No auto timeout' },
  { value: 'on', label: '4 seconds (theme default)' },
  { value: '6s', label: '6 seconds' },
  { value: '10s', label: '10 seconds' },
  { value: '15s', label: '15 seconds' }
];

const buildMessagesPosition = (topStart: boolean): ToastPosition => {
  return topStart ? 'top-start' : 'top-end';
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

const toAutoTimeout = (value: ComboboxValue): ToastMessage['autoTimeout'] => {
  return (typeof value === 'string' ? value : 'off') as ToastMessage['autoTimeout'];
};

export const MessagetoastAccessibilityAndUsabilitycorepack = () => {
  const smQuery = ResponsiveUtils.getFrameworkQuery('sm-only') || '(max-width: 599px)';
  const [errorMessageTimeout, setErrorMessageTimeout] = useState<ComboboxValue>('off');
  const [warningMessageTimeout, setWarningMessageTimeout] = useState<ComboboxValue>('off');
  const [infoMessageTimeout, setInfoMessageTimeout] = useState<ComboboxValue>('off');
  const [confirmationMessageTimeout, setConfirmationMessageTimeout] = useState<ComboboxValue>(
    'off'
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
  const toastOffset = useToastContainerOffset('accessibilityUsability', messagesPosition);
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
        id: 'errorMessage',
        severity: 'error',
        summary: 'Error message summary',
        detail: `Message timeout set to: ${errorMessageTimeout}`,
        autoTimeout: toAutoTimeout(errorMessageTimeout),
        closeAffordance: 'on',
        sound: playSound ? 'default' : 'none'
      },
      {
        id: 'warningMessage',
        severity: 'warning',
        summary: 'Warning message summary',
        detail: `Message timeout set to: ${warningMessageTimeout}`,
        autoTimeout: toAutoTimeout(warningMessageTimeout),
        closeAffordance: 'on',
        sound: playSound ? 'default' : 'none'
      },
      {
        id: 'infoMessage',
        severity: 'info',
        summary: 'Information message summary',
        detail: `Message timeout set to: ${infoMessageTimeout}`,
        autoTimeout: toAutoTimeout(infoMessageTimeout),
        closeAffordance: 'on',
        sound: playSound ? 'default' : 'none'
      },
      {
        id: 'confirmationMessage',
        severity: 'confirmation',
        summary: 'Confirmation message summary',
        detail: `Message timeout set to: ${confirmationMessageTimeout}`,
        autoTimeout: toAutoTimeout(confirmationMessageTimeout),
        closeAffordance: 'on',
        sound: playSound ? 'default' : 'none'
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
    () => new MutableArrayDataProvider<string, ToastMessage>(messages, { keyAttributes: 'id' }),
    [messages]
  );

  const handleErrorMessageTimeoutValueChanged = (event: ComboboxValueChangedEvent) => {
    setErrorMessageTimeout(event.detail.value ?? 'off');
  };

  const handleWarningMessageTimeoutValueChanged = (event: ComboboxValueChangedEvent) => {
    setWarningMessageTimeout(event.detail.value ?? 'off');
  };

  const handleInfoMessageTimeoutValueChanged = (event: ComboboxValueChangedEvent) => {
    setInfoMessageTimeout(event.detail.value ?? 'off');
  };

  const handleConfirmationMessageTimeoutValueChanged = (event: ComboboxValueChangedEvent) => {
    setConfirmationMessageTimeout(event.detail.value ?? 'off');
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
      const currentKeys = new Set(currentMessages.map((message) => message.id));
      const restoredMessages = deletedMessages.filter((message) => !currentKeys.has(message.id));
      return [...currentMessages, ...restoredMessages];
    });
    setDeletedMessages([]);
  };

  const handleCloseMessage = (event: CMessageToastElement.ojClose<string, ToastMessage>) => {
    const closedMessage = event.detail.data;
    setMessages((currentMessages) =>
      currentMessages.filter((message) => message.id !== event.detail.key)
    );
    setDeletedMessages((currentMessages) =>
      currentMessages.some((message) => message.id === closedMessage.id)
        ? currentMessages
        : [...currentMessages, closedMessage]
    );
  };

  return (
    <div id="accessibilityUsability">
      <div id="messages_anchor" />
      <oj-c-message-toast
        id="messagesId"
        data={messagesDataprovider}
        offset={toastOffset}
        position={messagesPosition}
        onojClose={handleCloseMessage}
      />
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
          <oj-button
            onojAction={handleUpdateMessages}
            class="oj-sm-padding-1x-top oj-sm-padding-1x-end"
          >
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

export default MessagetoastAccessibilityAndUsabilitycorepack;
