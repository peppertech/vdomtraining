import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojMessage } from 'ojs/ojmessage';
import { ojMessages } from 'ojs/ojmessages';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojmessage';
import 'ojs/ojmessages';

type GroupedMessage = ojMessage.Message & {
  id: string;
  errors: string[];
};

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const initialErrors = [
  "The price of the item 'RiddlePlus High Performance Backpack' changed while in your cart.",
  "The item 'Mouse, RD2' is no longer available and is back-ordered."
];

export const MessagesGroupingMessages = () => {
  const [errors, setErrors] = useState<string[]>(initialErrors);
  const [detailValue, setDetailValue] = useState<string>('');
  const [detailRawValue, setDetailRawValue] = useState<string>('');

  const groupedMessages = useMemo<GroupedMessage[]>(
    () =>
      errors.length
        ? [
            {
              id: 'cartChanges',
              severity: 'error',
              summary: `Changes made to the items in the cart (${errors.length} ${
                errors.length > 1 ? 'items' : 'item'
              })`,
              errors,
              closeAffordance: 'defaults',
              timestamp: new Date().toISOString()
            }
          ]
        : [],
    [errors]
  );

  const messagesDataprovider = useMemo(
    () =>
      new ArrayDataProvider<string, GroupedMessage>(groupedMessages, {
        keyAttributes: 'id'
      }) as unknown as NonNullable<ComponentProps<'oj-messages'>['messages']>,
    [groupedMessages]
  );

  const addNewError = () => {
    if (!detailRawValue) {
      return;
    }

    setErrors((currentErrors) => [detailValue, ...currentErrors]);
    setDetailValue('');
    setDetailRawValue('');
  };

  const removeOldestError = () => {
    setErrors((currentErrors) => currentErrors.slice(0, -1));
  };

  const closeMessage = () => {
    setErrors([]);
  };

  const handleDetailValueChanged = (event: PropertyChangedEvent<string>) => {
    setDetailValue(event.detail.value);
  };

  const handleDetailRawValueChanged = (event: PropertyChangedEvent<string>) => {
    setDetailRawValue(event.detail.value);
  };

  const renderMessageTemplate = (context: ojMessages.MessageTemplateContext) => {
    const message = context.data as GroupedMessage;

    return (
      <oj-message message={message} displayOptions={{ category: 'none' }} onojClose={closeMessage}>
        <ul slot="detail">
          {message.errors.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      </oj-message>
    );
  };

  return (
    <div id="groupingMessages">
      <oj-messages messages={messagesDataprovider} displayOptions={{ category: 'none' }}>
        <template slot="messageTemplate" render={renderMessageTemplate} />
      </oj-messages>

      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-vertical">
        <div class="oj-header-border oj-typography-subheading-md">Messages settings</div>
        <oj-form-layout direction="column">
          <oj-input-text
            labelHint="Detail Text"
            value={detailValue}
            rawValue={detailRawValue}
            onvalueChanged={handleDetailValueChanged}
            onrawValueChanged={handleDetailRawValueChanged}
          />
        </oj-form-layout>
        <oj-button onojAction={addNewError} disabled={!detailRawValue}>
          Add Error
        </oj-button>
        <oj-button
          onojAction={removeOldestError}
          disabled={!errors.length}
          style={{ marginLeft: '0.5rem' }}
        >
          Remove Error
        </oj-button>
      </div>
    </div>
  );
};

export default MessagesGroupingMessages;
