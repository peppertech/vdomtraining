// @ts-nocheck
import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { getContext } from 'ojs/ojcontext';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojbutton';
// import 'ojs/ojbuttonsetone';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'ojs/ojoption';
import 'ojs/ojselector';
import 'css!./demo.css';

type DemoItem = {
  id: number;
  name: string;
};

const generateData = (count: number): DemoItem[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `Item ${index + 1}`
  }));

export const SelectorPerformanceSelector = () => {
  const [scrollPolicyValue, setScrollPolicyValue] = useState('loadMoreOnScroll');
  const [numItems, setNumItems] = useState(100);
  const [selectedItems, setSelectedItems] = useState<any>(new KeySetImpl());
  const [renderTime, setRenderTime] = useState('');
  const [refreshVersion, setRefreshVersion] = useState(0);
  const data = useMemo(() => generateData(numItems), [numItems, refreshVersion]);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(data, {
        keys: data.map((value) => value.id)
      }),
    [data]
  );

  useEffect(() => {
    const element = document.getElementById('listview');
    if (!element) {
      return;
    }

    const start = Date.now();
    const busyContext = getContext(element).getBusyContext();
    busyContext.whenReady().then(() => {
      setRenderTime(`Time: ${Date.now() - start}ms`);
    });
  }, [dataProvider, scrollPolicyValue]);

  const handleUpdateData = (event?: any) => {
    if (typeof event?.detail?.value === 'number') {
      setNumItems(event.detail.value);
    } else {
      setRefreshVersion((current) => current + 1);
    }
    setSelectedItems(new KeySetImpl());
  };

  const handleScrollPolicyChanged = (event: any) => {
    setScrollPolicyValue(event.detail.value ?? 'loadMoreOnScroll');
  };

  const handleSelectedItemsChanged = (event: any) => {
    setSelectedItems(event.detail.value ?? new KeySetImpl());
  };

  const renderItemTemplate = (item: any) => (
    <oj-list-item-layout>
      <oj-selector
        slot="selector"
        aria-label={`Select ${item.data.name}`}
        data-oj-clickthrough="disabled"
        selectedKeys={selectedItems}
        onselectedKeysChanged={handleSelectedItemsChanged}
        selectionMode="multiple"
        rowKey={item.key}
      />
      <span>{item.data.name}</span>
    </oj-list-item-layout>
  );

  return (
    <div id="listview-container">
      <div class="selector-performance-options">
        <div class="selector-performance-panel oj-panel oj-bg-neutral-30">
          <h2 id="h1" class="oj-typography-subheading-md">
            Options To Control The Performance Below
          </h2>
          <oj-form-layout maxColumns={3} direction="row">
            <oj-input-number
              id="inputnumber-id1"
              onvalueChanged={handleUpdateData}
              min={10}
              step={10}
              labelEdge="inside"
              labelHint="Number of Items"
              value={numItems}
            />
          </oj-form-layout>
          <oj-form-layout maxColumns={2} direction="row">
            <div>
              <oj-buttonset-one
                id="policyButtonSet"
                aria-label="Choose only one setting."
                aria-controls="listview"
                value={scrollPolicyValue}
                onvalueChanged={handleScrollPolicyChanged}
              >
                <oj-option value="loadMoreOnScroll">High-Water Mark Scrolling</oj-option>
                <oj-option value="loadAll">None</oj-option>
              </oj-buttonset-one>
            </div>
            <div class="oj-sm-padding-4x-start oj-sm-only-float-start">
              <oj-button id="updateButton" onojAction={handleUpdateData}>
                Re-Render
              </oj-button>
            </div>
          </oj-form-layout>
          <div class="oj-sm-padding-1x-start">
            <p>{renderTime}</p>
          </div>
        </div>
      </div>
      <oj-list-view
        id="listview"
        aria-label="performance test for list view"
        class="demo-selector-listview oj-listview-item-padding-off"
        data={dataProvider}
        selected={selectedItems}
        onselectedChanged={handleSelectedItemsChanged}
        selectionMode="multiple"
        item={{ enterKeyFocusBehavior: 'focusWithin' }}
        scrollPolicy={scrollPolicyValue}
        scrollPolicyOptions={{ fetchSize: 10, maxCount: 10000 }}
      >
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-list-view>
    </div>
  );
};

export default SelectorPerformanceSelector;
