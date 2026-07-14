import 'css!./demo.css';
import 'ojs/ojavatar';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'ojs/ojoption';
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

type InputNumberProps = ComponentProps<'oj-input-number'>;
type InputNumberValueChangedEvent = Parameters<NonNullable<InputNumberProps['onvalueChanged']>>[0];
type ButtonsetOneProps = ComponentProps<'oj-buttonset-one'>;
type ButtonsetOneValueChangedEvent = Parameters<NonNullable<ButtonsetOneProps['onvalueChanged']>>[0];
type TweetDataProvider = DemoDelayingDataProvider<Data['source'], Data>;
type ListViewItemContext = {
  data: Data;
};
type ActiveLayout = 'card' | 'list';

const ORACLE_AVATAR = '/styles/images/listView/oracle.gif';

export const ListViewProgressiveLoadListView = () => {
  const initialDelay = 2000;
  const arr: Data[] = useMemo(() => JSON.parse(jsonDataStr), []);
  const [delay, setDelay] = useState(initialDelay);
  const [activeLayout, setActiveLayout] = useState<ActiveLayout>('list');
  const [dataProvider, setDataProvider] = useState<TweetDataProvider>(
    () =>
      new DemoDelayingDataProvider(
        new ArrayDataProvider<Data['source'], Data>(arr, {
          keyAttributes: 'source'
        }),
        initialDelay
      )
  );
  const layoutViewRadios = useMemo(() => [
    { id: 'card', icon: 'oj-ux-ico-grid-view-small' },
    { id: 'list', icon: 'oj-ux-ico-list-round' }
  ], []);

const handleDelayValueChanged = (event: InputNumberValueChangedEvent) => {
    setDelay(event.detail.value ?? initialDelay);
  };

  const handleActiveLayoutValueChanged = (event: ButtonsetOneValueChangedEvent) => {
    setActiveLayout((event.detail.value as ActiveLayout | null) ?? 'list');
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

  const renderItem = (item: ListViewItemContext) => {
    if (activeLayout === 'card') {
      return (
        <li class="demo-card">
          <div class="oj-panel demo-card-panel">
            <div class="demo-card-header">
              <oj-avatar size="xs" src={ORACLE_AVATAR} />
              <div>
                <div class="oj-typography-body-md oj-text-color-primary">{item.data.name}</div>
                <div class="oj-typography-body-xs oj-text-color-secondary">
                  {'@' + item.data.screen_name}
                </div>
              </div>
            </div>
            <div class="demo-tweet demo-card-text">
              <span class="oj-typography-body-sm oj-text-color-secondary">{item.data.text}</span>
              <a href={item.data.source} class="oj-text-color-danger">
                {item.data.source}
              </a>
            </div>
            <div class="oj-typography-body-xs oj-text-color-secondary demo-card-date">
              {item.data.created_at}
            </div>
          </div>
        </li>
      );
    }

    return (
      <li>
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
      </li>
    );
  };

  return (
    <div id="listviewContainer">
      <div class="demo-list-container">
        <div class="demo-toolbar oj-flex oj-sm-align-items-center oj-sm-justify-content-space-between">
          <oj-form-layout maxColumns={2} direction="row" class="oj-flex-item demo-delay-form">
            <oj-input-number
              id="fetch-delay-input"
              min={0}
              step={1000}
              value={delay}
              labelHint="Fetch delay (ms)"
              onvalueChanged={handleDelayValueChanged}
            ></oj-input-number>
            <oj-button class="oj-button-lg" onojAction={applyDelay}>
              Apply
            </oj-button>
          </oj-form-layout>
          <oj-buttonset-one
            display="icons"
            onvalueChanged={handleActiveLayoutValueChanged}
            value={activeLayout}
            chroming="borderless"
            class="oj-flex-item oj-sm-flex-initial oj-buttonset-width-auto"
            aria-label="Choose layout view."
          >
            {layoutViewRadios.map((layout) => (
              <oj-option value={layout.id} id={layout.id}>
                <span slot="startIcon" class={layout.icon} />
                <span>{layout.id}</span>
              </oj-option>
            ))}
          </oj-buttonset-one>
        </div>
        <oj-list-view
          id="listview"
          aria-label="progressive loading"
          data={dataProvider}
          class="demo-list oj-sm-padding-1x-horizontal"
          display={activeLayout}
          {...{ 'item.enter-key-focus-behavior': 'focusWithin' }}
          {...{ 'scroll-policy-options.fetch-size': '15' }}
        >
          <template slot="itemTemplate" render={renderItem} />
        </oj-list-view>
      </div>
    </div>
  );
};

export default ListViewProgressiveLoadListView;
