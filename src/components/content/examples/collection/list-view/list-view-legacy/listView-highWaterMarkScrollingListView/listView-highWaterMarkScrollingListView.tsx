// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataStr from 'text!../../../data/cookbook/dataCollections/listView/collectionListView/tweets.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import DemoDelayingDataProvider from '../../../shared/DemoDelayingDataProvider';
import 'css!./demo.css';
import 'ojs/ojavatar';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';

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

export const ListViewHighWaterMarkScrollingListView = () => {
  const initialDelay = 2000;
  const arr: Data[] = useMemo(() => JSON.parse(jsonDataStr) as Data[], []);
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
    const nextDelay = event.detail.value ?? initialDelay;
    setDelay(nextDelay);
    setDataProvider(
      new DemoDelayingDataProvider(
        new ArrayDataProvider<Data['source'], Data>(arr, {
          keyAttributes: 'source'
        }),
        nextDelay
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
        </oj-form-layout>
        <oj-list-view
          id="listview"
          aria-label="high-water mark scrolling"
          data={dataProvider}
          class="demo-list oj-sm-padding-1x-horizontal"
          {...{ 'scroll-policy-options.fetch-size': '15' }}
        >
          <template
            slot="itemTemplate"
            render={(item) => (
              <oj-list-item-layout>
                <div>
                  <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
                  <span class="oj-typography-body-xs">{'@' + item.data.screen_name}</span>
                </div>
                <oj-avatar slot="leading" size="xs" src={ORACLE_AVATAR} />
                <div slot="secondary" class="demo-tweet">
                  <span class="oj-typography-body-sm oj-text-color-secondary">{item.data.text}</span>
                  <a href={item.data.source} class="oj-text-color-danger">
                    {item.data.source}
                  </a>
                </div>
                <span slot="tertiary" class="oj-typography-body-xs">
                  {item.data.created_at}
                </span>
              </oj-list-item-layout>
            )}
          />
        </oj-list-view>
      </div>
    </div>
  );
};

export default ListViewHighWaterMarkScrollingListView;
