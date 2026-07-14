import 'oj-c/button';
import 'oj-c/checkboxset';
import 'oj-c/message-toast';
import type { CMessageToastElement,MessageToastItem } from 'oj-c/message-toast';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import { useToastContainerOffset } from '../useToastContainerOffset';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type TimeoutOption = {
  value: NonNullable<MessageToastItem['autoTimeout']>;
  label: string;
};

type MessageData = MessageToastItem & {
  id: string;
};
type ToastOffset = NonNullable<ComponentProps<'oj-c-message-toast'>['offset']>;
type ToastPosition = NonNullable<ComponentProps<'oj-c-message-toast'>['position']>;
type ComboboxValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-combobox-one'>['onvalueChanged']>
>[0];
type CheckboxsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-checkboxset'>['onvalueChanged']>
>[0];
type ComboboxValue = ComponentProps<'oj-combobox-one'>['value'];

const timeoutOptions: TimeoutOption[] = [
  { value: 'off', label: 'No auto timeout' },
  { value: 'on', label: 'Theme default' },
  { value: 6000, label: '6 seconds' },
  { value: 10000, label: '10 seconds' },
  { value: 15000, label: '15 seconds' }
];
const soundOptions = [{ value: 'sound', label: 'Play sound' }];

const toastPosition: ToastPosition = 'top';

const getTopCenterOffset = (offset: ToastOffset): ToastOffset => {
  if (typeof offset === 'number') {
    return offset;
  }

  return {
    ...offset,
    horizontal: 0
  };
};

const toStringArray = (value: unknown): string[] => {
  return Array.isArray(value) ? value.map(String) : [];
};

const toAutoTimeout = (value: ComboboxValue): MessageData['autoTimeout'] => {
  if (value === 'on' || value === 'off' || typeof value === 'number') {
    return value;
  }

  return 'off';
};

export const MessagetoastAutoTimeoutcorepack = () => {
  const containerToastOffset = useToastContainerOffset('autoTimeout', toastPosition);
  const toastOffset = useMemo(
    () => getTopCenterOffset(containerToastOffset),
    [containerToastOffset]
  );
  const [toastAutoTimeout, setToastAutoTimeout] = useState<MessageData['autoTimeout']>('off');
  const [newToastOptions, setNewToastOptions] = useState<string[]>(['sound']);
  const [messageCounter, setMessageCounter] = useState(0);
  const [messages, setMessages] = useState<MessageData[]>([]);

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
    setNewToastOptions(toStringArray(event.detail.value));
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
        position={toastPosition}
        onojClose={closeMessage}
      />
      <div class="oj-web-padding" role="main">
        <div class="oj-panel oj-bg-info-30 oj-sm-padding-4x">
          <div class="oj-sm-margin-2x-end">
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
            <oj-c-checkboxset
              onvalueChanged={handleNewToastOptionsChanged}
              value={newToastOptions}
              labelHint="Sound options"
              labelEdge="inside"
              options={soundOptions}
            />
          </div>
          <div class="oj-divider-top oj-sm-padding-2x-top">
            <oj-c-button onojAction={handleOpenNewToast} label="Open new toast" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagetoastAutoTimeoutcorepack;
