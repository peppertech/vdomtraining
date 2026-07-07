import { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojstreamlist';
import { StreamListElement } from 'ojs/ojstreamlist';
import DemoDelayingDataProvider from '../../shared/DemoDelayingDataProvider';
import DemoDelayingTreeDataProvider from '../../shared/DemoDelayingTreeDataProvider';
import 'css!./demo.css';

type DataStructure = 'flat' | 'hierarchical';
type Item = {
  id: string;
  item: string;
  children?: Item[];
};
type DataStructureChangedEvent = CustomEvent<{
  value: DataStructure | null;
  updatedFrom?: 'external' | 'internal';
}>;
type NumberValueChangedEvent = CustomEvent<{
  value: number | null;
  updatedFrom?: 'external' | 'internal';
}>;
type StreamListData = NonNullable<ComponentProps<'oj-stream-list'>['data']>;

const generateData = (count: number): Item[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `id${index + 1}`,
    item: `Item ${index + 1}`
  }));

const generateTreeData = (count: number, idPrefix = '', hasChildren = true): Item[] =>
  Array.from({ length: count }, (_, index) => {
    const childIndex = index + 1;
    const id = `p${idPrefix}c${childIndex}`;

    if (hasChildren) {
      return {
        id,
        item: `Item ${childIndex}`,
        children: generateTreeData(5, String(childIndex), false)
      };
    }

    return {
      id,
      item: `Child Item ${childIndex}`
    };
  });

const flatData = generateData(250);
const treeData = generateTreeData(100);

export const StreamListProgressiveLoad = () => {
  const [dataStructure, setDataStructure] = useState<DataStructure>('flat');
  const [delay, setDelay] = useState<number>(2000);
  const [childDelay, setChildDelay] = useState<number>(2000);

  const flatBaseDataProvider = useMemo(
    () => new ArrayDataProvider<string, Item>(flatData, { keyAttributes: 'id' }),
    []
  );
  const treeBaseDataProvider = useMemo(
    () => new ArrayTreeDataProvider<string, Item>(treeData, { keyAttributes: 'id' }),
    []
  );

  const createDataProvider = (
    structure: DataStructure,
    fetchDelay: number,
    fetchChildDelay: number
  ): StreamListData => {
    if (structure === 'flat') {
      return new DemoDelayingDataProvider<string, Item>(flatBaseDataProvider, fetchDelay);
    }

    return new DemoDelayingTreeDataProvider<string, Item>(
      treeBaseDataProvider,
      fetchDelay,
      fetchChildDelay
    );
  };

  const [dataProvider, setDataProvider] = useState<StreamListData>(() =>
    createDataProvider('flat', 2000, 2000)
  );

  const applyDelay = () => {
    setDataProvider(createDataProvider(dataStructure, delay, childDelay));
  };

  const handleDataStructureChanged = (event: DataStructureChangedEvent) => {
    if (event.detail.updatedFrom === 'external' || !event.detail.value) {
      return;
    }

    const nextStructure = event.detail.value;
    setDataStructure(nextStructure);
    setDataProvider(createDataProvider(nextStructure, delay, childDelay));
  };

  const handleDelayChanged = (event: NumberValueChangedEvent) => {
    if (event.detail.value == null) {
      return;
    }

    setDelay(event.detail.value);
  };

  const handleChildDelayChanged = (event: NumberValueChangedEvent) => {
    if (event.detail.value == null) {
      return;
    }

    setChildDelay(event.detail.value);
  };

  const renderGroupTemplate = (
    item: StreamListElement.GroupTemplateContext<string, Item>
  ) => (
    <div class="demo-stream-list-group oj-bg-neutral-30 oj-sm-margin-4x-top oj-sm-padding-2x-vertical oj-sm-padding-6x-horizontal oj-typography-bold">
      {item.data.item}
    </div>
  );

  const renderItemTemplate = (item: StreamListElement.ItemTemplateContext<string, Item>) => (
    <div class="oj-sm-margin-4x-top oj-sm-padding-6x-horizontal">{item.data.item}</div>
  );

  return (
    <div id="streamListContainer">
      <oj-form-layout class="demo-progressive-controls">
        <div class="demo-progressive-control-row">
          <oj-label>Data Structure</oj-label>
          <oj-buttonset-one
            value={dataStructure}
            onvalueChanged={handleDataStructureChanged}
            class="oj-buttonset-width-auto"
          >
            <oj-option value="flat">Flat</oj-option>
            <oj-option value="hierarchical">Group</oj-option>
          </oj-buttonset-one>
        </div>

        <div class="demo-progressive-control-row">
          <oj-input-number
            id="fetch-delay-input"
            min={0}
            step={0}
            value={delay}
            labelHint="Fetch delay (ms)"
            onvalueChanged={handleDelayChanged}
          />
          <oj-input-number
            id="fetch-child-delay-input"
            min={0}
            step={0}
            value={childDelay}
            labelHint="Fetch delay for expanding a node (ms)"
            disabled={dataStructure === 'flat'}
            onvalueChanged={handleChildDelayChanged}
          />
          <oj-button class="oj-button-lg" onojAction={applyDelay}>
            Apply
          </oj-button>
        </div>
      </oj-form-layout>

      <oj-stream-list
        id="demostreamlist"
        class="demo-height"
        data={dataProvider}
        aria-label="Stream list showing progressive loading"
      >
        <template slot="groupTemplate" render={renderGroupTemplate} />
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-stream-list>
    </div>
  );
};

export default StreamListProgressiveLoad;
