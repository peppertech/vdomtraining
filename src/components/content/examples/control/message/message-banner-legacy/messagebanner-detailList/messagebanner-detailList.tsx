// @ts-nocheck
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { MessageBannerItem, MessageBannerElement } from 'ojs/ojmessagebanner';
import 'ojs/ojmessagebanner';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojbutton';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import { ItemContext } from 'ojs/ojcommontypes';

type DemoMessageBannerItem = MessageBannerItem & {
    id: string;
    detailList?: Array<string>;
};
type MessageTemplateContext = ItemContext<string, DemoMessageBannerItem>;

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const MessagebannerDetailList = () => {
  const initialMessage: DemoMessageBannerItem = {
      id: 'message',
      severity: 'error',
      summary: 'Changes made to the items in the cart (2 items)',
      detailList: [
          "The price of the item 'RiddlePlus High Performance Backpack changed while in your cart",
          "The item 'Mouse, RD2' is no longer available and is back-ordered"
      ],
      timestamp: new Date().toISOString()
  };

  const [detailValue, setDetailValue] = useState<string>(undefined);
  const [detailRawValue, setDetailRawValue] = useState<string>(undefined);

  const messages = useMemo(() => new MutableArrayDataProvider([initialMessage], {
      keyAttributes: 'id'
  }), []);
  const addButtonDisabled = !detailRawValue;
  const removeButtonDisabled = !(messages.data.length && messages.data[0].detailList?.length);

  const handleDetailValueValueChanged = (event: PropertyChangedEvent<string>) => {
    setDetailValue(event.detail.value);
  };

  const handleDetailRawValueRawValueChanged = (event: PropertyChangedEvent<string>) => {
    setDetailRawValue(event.detail.value);
  };

  const closeMessage = (event: MessageBannerElement.ojClose<string, DemoMessageBannerItem>) => {
      let data = messages.data.slice();
      const closeMessageKey = event.detail.key;
      data = data.filter((message: DemoMessageBannerItem) => message.id !== closeMessageKey);
      messages.data = data;
  };

  const addNewError = () => {
      const detail = detailValue;
      let data = messages.data.slice();
      if (data.length === 0) {
          data.push({
              id: 'message',
              severity: 'error',
              summary: 'Changes made to the items in the cart (1 item)',
              detailList: [detail],
              timestamp: new Date().toISOString()
          });
      }
      else {
          const message = { ...data[0] };
          message.detailList.unshift(detail);
          message.summary = `Changes made to the items in the cart (${message.detailList.length} items)`;
          data = [message];
      }
      setDetailValue('');
      messages.data = data;
  };

  const removeOldestError = () => {
      let data = messages.data.slice();
      if (data.length !== 0) {
          const message = { ...data[0] };
          message.detailList.pop();
          if (message.detailList.length === 0) {
              messages.data = [];
          }
          else {
              const count = message.detailList.length;
              message.summary = `Changes made to the items in the cart (${count} ${count > 1 ? 'items' : 'item'})`;
              messages.data = [message];
          }
      }
  };

  return (
      <div id="containerDiv">
            <oj-message-banner data={messages} type="page" detail-template-value="detailList" onojClose={closeMessage}>
                    <template slot="detailList" render={(context: MessageTemplateContext) => (
                            <>
                                <ul>
                                              {
                                                            (context.data.detailList ?? []).map(($current: string, index: number) => (
                                                              <>
                                                                <li>{$current}</li>
                                                              </>
                                                            ))
                                                          }
                                          </ul>
                            </>
                          )} />
                </oj-message-banner>
            <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-vertical">
                    <div class="oj-header-border oj-typography-subheading-md">Messages settings</div>
                    <oj-form-layout direction="column">
                              <oj-input-text label-hint="Detail Text" onvalueChanged={handleDetailValueValueChanged} value={detailValue} onrawValueChanged={handleDetailRawValueRawValueChanged} raw-value={detailRawValue} />
                          </oj-form-layout>
                    <oj-button onojAction={addNewError} disabled={addButtonDisabled}>Add Error</oj-button>
                    <oj-button onojAction={removeOldestError} disabled={removeButtonDisabled} style={{ marginLeft: '0.5rem' }}>Remove Error</oj-button>
                </div>
        </div>
    );
};

export default MessagebannerDetailList;
