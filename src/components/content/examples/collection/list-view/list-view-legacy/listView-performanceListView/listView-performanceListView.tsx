// @ts-nocheck
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { ojButton } from 'ojs/ojbutton';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import Context = require('ojs/ojcontext');
import 'ojs/ojlistview';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojformlayout';
import 'ojs/ojbutton';
import 'ojs/ojbuttonsetone';
import 'ojs/ojoption';

interface Data {
    id: number;
    name: string;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type ScrollPolicyValue = 'loadMoreOnScroll' | 'loadAll';
type ListDataProvider = ArrayDataProvider<Data['id'], Data>;
type NumberValueEvent = CustomEvent<{ value?: number | null }>;

const generateData = (count: number) => {
  const data: Array<Data> = [];
  for (let i = 0; i < count; i++) {
      data.push({ id: i, name: 'Item ' + (i + 1) });
  }
  return data;
};

export const ListViewPerformanceListView = () => {
  const initialData = useMemo(() => generateData(1000), []);
  const [scrollPolicyValue, setScrollPolicyValue] = useState<ScrollPolicyValue>('loadMoreOnScroll');
  const [numItems, setNumItems] = useState(1000);
  const [renderTime, setRenderTime] = useState(0);
  const [dataProvider, setDataProvider] = useState<ListDataProvider>(() => new ArrayDataProvider<number, Data>(initialData, {
      keys: initialData.map((value: Data) => {
          return value.id;
      })
  }));

  const scrollingOptions = useMemo(() => [
      { id: 'on', label: 'Load More On Scroll', value: 'loadMoreOnScroll' },
      { id: 'off', label: 'Load All', value: 'loadAll' }
  ], []);

  const handleScrollPolicyValueValueChanged = (event: PropertyChangedEvent<ScrollPolicyValue>) => {
    setScrollPolicyValue(event.detail.value ?? 'loadMoreOnScroll');
  };

  const renderTimeWhenReady = () => {
      const start = new Date().getTime();
      const busyContext = Context.getContext(document.getElementById('listview')).getBusyContext();
      busyContext.whenReady().then(() => {
          const end = new Date().getTime();
          setRenderTime(end - start);
      });
  };

  const updateData = (event: NumberValueEvent | ojButton.ojAction) => {
	      const nextValue = 'value' in event.detail ? event.detail.value : undefined;
	      const count = typeof nextValue === 'number' && !Number.isNaN(nextValue) ? nextValue : numItems;
      setNumItems(count);
      const data = generateData(count);
      setDataProvider(new ArrayDataProvider<number, Data>(data, {
          keys: data.map((value: Data) => {
              return value.id;
          })
      }));
      renderTimeWhenReady();
  };

  return (
      <div id="listview-container">
            <oj-form-layout max-columns="3" direction="row">
                    <oj-input-number id="inputnumber-id1" label-hint="Number of Items" onvalueChanged={updateData} min="10" step="40" value={numItems} />
                    <oj-buttonset-one id="policyButtonSet" class="oj-buttonset-width-auto oj-button-lg" aria-label="Choose only one setting." aria-controls="listview" onvalueChanged={handleScrollPolicyValueValueChanged} value={scrollPolicyValue}>
                              {
                                        (scrollingOptions ?? []).map(($current, index) => (
                                          <>
                                            <oj-option value={$current.value} id={$current.id}><span>{$current.label}</span></oj-option>
                                          </>
                                        ))
                                      }
                          </oj-buttonset-one>
                    <oj-button id="updateButton" class="oj-button-lg" onojAction={updateData}>Re-Render</oj-button>
                    <p>
                              Time to render:
                              {renderTime}
                              ms
                          </p>
                </oj-form-layout>
            <oj-list-view id="listview" aria-label="performance test for list view" class="demo-list" data={dataProvider} scroll-policy={scrollPolicyValue} {...{ 'scroll-policy-options.fetch-size': "10", 'scroll-policy-options.max-count': "10000" }}>
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                <span>{item.data.name}</span>
                            </>
                          )} />
                </oj-list-view>
        </div>
    );
};

export default ListViewPerformanceListView;
