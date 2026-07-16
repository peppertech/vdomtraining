import 'css!./demo.css';
import 'oj-c/avatar';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataStr from 'text!./tweets.json';
import DemoDelayingDataProvider from '../../../shared/DemoDelayingDataProvider';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface Data {
  name: string;
  screen_name: string;
  text: string;
  created_at: string;
  source: string;
}

type InputNumberProps = ComponentProps<'oj-c-input-number'>;
type InputNumberValueChangedEvent = Parameters<NonNullable<InputNumberProps['onvalueChanged']>>[0];
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

const handleDelayValueChanged = (event: InputNumberValueChangedEvent) => {
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

  const renderItem: import("ojs/ojvcomponent").TemplateSlot<{ data: Data }> = (item) => (
    <oj-c-list-item-layout>
      <div>
        <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
        <span class="oj-typography-body-xs">{'@' + item.data.screen_name}</span>
      </div>
      <oj-c-avatar slot="leading" size="xs" src={ORACLE_AVATAR} />
      <div slot="secondary" class="demo-tweet">
        <span class="oj-typography-body-sm oj-text-color-secondary">{item.data.text}</span>
        <a href={item.data.source} class="oj-text-color-danger">{item.data.source}</a>
      </div>
      <span slot="tertiary" class="oj-typography-body-xs">{item.data.created_at}</span>
    </oj-c-list-item-layout>
  );

  return (
    <div id="listviewContainer">
      <div class="demo-list-container">
        <oj-form-layout max-columns="2" direction="row">
          <oj-input-number
            id="fetch-delay-input"
            min={0}
            step={0}
            onvalueChanged={handleDelayValueChanged}
            value={delay}
            label-hint="Fetch delay (ms)"
          />
        </oj-form-layout>
        <oj-c-list-view
          id="listview"
          aria-label="high-water mark scrolling"
          data={dataProvider}
          class="demo-list oj-sm-padding-1x-horizontal"
          scrollPolicyOptions={{ fetchSize: 15 }}
        >
          <template slot="itemTemplate" render={renderItem} />
        </oj-c-list-view>
      </div>
    </div>
  );
};

export default ListViewHighWaterMarkScrollingcorepack;
