// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataStr from 'text!./tweets.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import DemoDelayingDataProvider from '../../../shared/DemoDelayingDataProvider';
import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'oj-c/avatar';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';

interface Data {
  name: string;
  screen_name: string;
  text: string;
  created_at: string;
  source: string;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type TweetDataProvider = DemoDelayingDataProvider<Data['source'], Data>;

const ORACLE_AVATAR = '/styles/images/listView/oracle.gif';

export const ListViewHighWaterMarkScrollingcorepack = () => {
  const initialDelay = 2000;
  const arr: Data[] = useMemo(() => JSON.parse(jsonDataStr), []);
  const [delay, setDelay] = useState(initialDelay);
  const [dataProvider, setDataProvider] = useState<TweetDataProvider>(
    () =>
      new DemoDelayingDataProvider(
        new ArrayDataProvider<Data['source'], Data>(arr, {
          keyAttributes: 'source'
        }),
        initialDelay
      )
  );

  const handleDelayValueChanged = (event: PropertyChangedEvent<number>) => {
    setDelay(event.detail.value ?? initialDelay);
  };

  const applyDelay = () => {
    setDataProvider(
      new DemoDelayingDataProvider(
        new ArrayDataProvider<Data['source'], Data>(arr, {
          keyAttributes: 'source'
        }),
        delay
      )
    );
  };

  return (
    <div id="listviewContainer">
      <div class="demo-list-container">
        <oj-form-layout max-columns="2" direction="row">
          <oj-input-number
            id="fetch-delay-input"
            min="0"
            step="0"
            onvalueChanged={handleDelayValueChanged}
            value={delay}
            label-hint="Fetch delay (ms)"
          />
          <oj-button class="oj-button-lg" onojAction={applyDelay}>
            Apply
          </oj-button>
        </oj-form-layout>
        <oj-c-list-view
          id="listview"
          aria-label="high-water mark scrolling"
          data={dataProvider}
          class="demo-list oj-sm-padding-1x-horizontal"
          scrollPolicyOptions={{ fetchSize: 15 }}
        >
          <template
            slot="itemTemplate"
            render={(item) => (
              <oj-c-list-item-layout>
                <div>
                  <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                  <span class="oj-typography-body-xs">{'@' + item.data.screen_name}</span>
                </div>
                <oj-c-avatar slot="leading" size="xs" src={ORACLE_AVATAR} />
                <div slot="secondary" class="demo-tweet">
                  <span class="oj-typography-body-sm oj-text-color-secondary">{item.data.text}</span>
                  <a href={item.data.source} class="oj-text-color-danger">
                    {item.data.source}
                  </a>
                </div>
                <span slot="tertiary" class="oj-typography-body-xs">
                  {item.data.created_at}
                </span>
              </oj-c-list-item-layout>
            )}
          />
        </oj-c-list-view>
      </div>
    </div>
  );
};

export default ListViewHighWaterMarkScrollingcorepack;
