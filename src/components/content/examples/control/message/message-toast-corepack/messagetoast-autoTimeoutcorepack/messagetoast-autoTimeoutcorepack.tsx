import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import type { MessageToastItem, CMessageToastElement } from 'oj-c/message-toast';
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
  value: NonNullable<MessageToastItem['autoTimeout']>;
  label: string;
};

type MessageData = MessageToastItem & {
  id: string;
};
type PopupPosition = NonNullable<ComponentProps<'oj-popup'>['position']>;
type ComboboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-combobox-one'>['onvalueChanged']>
>[0];
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-checkboxset'>['onvalueChanged']>
>[0];
type ComboboxValue = ComponentProps<'oj-combobox-one'>['value'];

const timeoutOptions: TimeoutOption[] = [
  { value: 'off', label: 'No auto timeout' },
  { value: 'on', label: 'Theme default' },
  { value: 6000, label: '6 seconds' },
  { value: 10000, label: '10 seconds' },
  { value: 15000, label: '15 seconds' }
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

const toAutoTimeout = (value: ComboboxValue): MessageData['autoTimeout'] => {
  if (value === 'on' || value === 'off' || typeof value === 'number') {
    return value;
  }

  return 'off';
};

export const MessagetoastAutoTimeoutcorepack = () => {
  const mediaQuery = ResponsiveUtils.getFrameworkQuery('sm-only') || '(max-width: 599px)';
  const toastOffset = useToastContainerOffset('autoTimeout', 'top-end');
  const [smallScreen, setSmallScreen] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(mediaQuery).matches
  );
  const [toastAutoTimeout, setToastAutoTimeout] = useState<MessageData['autoTimeout']>('off');
  const [newToastOptions, setNewToastOptions] = useState<string[]>(['sound']);
  const [messageCounter, setMessageCounter] = useState(0);
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
    () => new MutableArrayDataProvider<string, MessageData>(messages, { keyAttributes: 'id' }),
    [messages]
  );
  const timeoutOptionsData = useMemo(
    () =>
      new ArrayDataProvider<TimeoutOption['value'], TimeoutOption>(timeoutOptions, {
        keyAttributes: 'value'
      }),
    []
  );
  const playSound = newToastOptions.includes('sound');

  const getTimeoutLabel = (value: MessageData['autoTimeout']) => {
    return timeoutOptions.find((option) => option.value === value)?.label ?? 'No auto timeout';
  };

  const handleToastAutoTimeoutChanged = (event: ComboboxValueChangedEvent) => {
    setToastAutoTimeout(toAutoTimeout(event.detail.value));
  };

  const handleNewToastOptionsChanged = (event: CheckboxsetValueChangedEvent) => {
    setNewToastOptions((event.detail.value ?? []) as string[]);
  };

  const handleOpenNewToast = () => {
    const nextCounter = messageCounter + 1;
    setMessageCounter(nextCounter);
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `message-${nextCounter}`,
        severity: 'info',
        summary: `Toast message ${nextCounter}`,
        detail: `Auto timeout set to: ${getTimeoutLabel(toastAutoTimeout)}`,
        autoTimeout: toastAutoTimeout,
        sound: playSound ? 'default' : 'none'
      }
    ]);
  };

  const closeMessage = (event: CMessageToastElement.ojClose<string, MessageData>) => {
    setMessages((currentMessages) =>
      currentMessages.filter((message) => message.id !== event.detail.key)
    );
  };

  return (
    <div id="autoTimeout">
      <div id="messages_anchor" />
      <oj-c-message-toast
        id="oj-messages-id"
        data={messagesDataprovider}
        offset={toastOffset}
        position="top-end"
        onojClose={closeMessage}
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
            <h5 class="oj-typography-heading-xs oj-sm-margin-2x-bottom">
              Auto-timeout and sound options for the new toast
            </h5>
            <oj-combobox-one
              value={toastAutoTimeout}
              options={timeoutOptionsData}
              labelHint="Auto timeout"
              labelEdge="inside"
              onvalueChanged={handleToastAutoTimeoutChanged}
            >
              <span slot="end" class="oj-ux-ico-clock oj-sm-padding-2x" />
            </oj-combobox-one>
            <oj-checkboxset
              onvalueChanged={handleNewToastOptionsChanged}
              value={newToastOptions}
              labelHint="Sound options"
              labelEdge="inside"
            >
              <oj-option value="sound">Play sound</oj-option>
            </oj-checkboxset>
          </div>
        </div>
        <oj-toolbar chroming="outlined" class="oj-divider-top">
          <oj-button onojAction={handleOpenNewToast} class="oj-sm-padding-1x-top oj-sm-padding-1x-end">
            Open new toast
          </oj-button>
        </oj-toolbar>
      </oj-popup>
    </div>
  );
};

export default MessagetoastAutoTimeoutcorepack;
