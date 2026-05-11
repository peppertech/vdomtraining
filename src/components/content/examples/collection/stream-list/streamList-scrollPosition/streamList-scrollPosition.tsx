import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { AllKeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojstreamlist';
import { StreamListElement } from 'ojs/ojstreamlist';
import 'css!./demo.css';

type DataStructure = 'flat' | 'hierarchical';
type FlatItem = {
  id: string;
  item: string;
};
type TreeItem = FlatItem & {
  children?: TreeItem[];
};
type DataStructureChangedEvent = CustomEvent<{
  value: DataStructure | null;
  updatedFrom?: 'external' | 'internal';
}>;

const generateData = (count: number): FlatItem[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `id${index + 1}`,
    item: `Item ${index + 1}`
  }));

const generateTreeData = (count: number, idPrefix = '', hasChildren = true): TreeItem[] =>
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
const expanded = new AllKeySetImpl<string>();

export const StreamListScrollPosition = () => {
  const [dataStructure, setDataStructure] = useState<DataStructure>('flat');
  const [scrollPositionDetail, setScrollPositionDetail] = useState<string>('');

  const flatDataProvider = useMemo(
    () => new ArrayDataProvider<string, FlatItem>(flatData, { keyAttributes: 'id' }),
    []
  );
  const treeDataProvider = useMemo(
    () => new ArrayTreeDataProvider<string, TreeItem>(treeData, { keyAttributes: 'id' }),
    []
  );

  const handleDataStructureChanged = (event: DataStructureChangedEvent) => {
    if (event.detail.updatedFrom === 'external' || !event.detail.value) {
      return;
    }

    setDataStructure(event.detail.value);
  };

  const handleScrollPositionChanged = (
    event: StreamListElement.scrollPositionChanged<string, FlatItem | TreeItem>
  ) => {
    const value = event.detail.value ?? {};

    setScrollPositionDetail(
      ` y: ${Math.round(value.y ?? 0)} offsetY: ${Math.round(value.offsetY ?? 0)} key: ${
        value.key ?? ''
      } parent key: ${value.parentKey ?? ''}`
    );
  };

  const renderGroupTemplate = (
    item: StreamListElement.GroupTemplateContext<string, FlatItem | TreeItem>
  ) => (
    <div class="demo-stream-list-group oj-bg-neutral-30 oj-sm-margin-4x-top oj-sm-padding-2x-vertical oj-sm-padding-6x-horizontal oj-typography-bold">
      {item.data.item}
    </div>
  );

  const renderItemTemplate = (
    item: StreamListElement.ItemTemplateContext<string, FlatItem | TreeItem>
  ) => <div class="oj-sm-margin-4x-top oj-sm-padding-6x-horizontal">{item.data.item}</div>;

  return (
    <div id="streamListContainer">
      <oj-form-layout>
        <oj-label>Data Structure</oj-label>
        <oj-buttonset-one
          value={dataStructure}
          onvalueChanged={handleDataStructureChanged}
          class="oj-buttonset-width-auto"
        >
          <oj-option value="flat">Flat</oj-option>
          <oj-option value="hierarchical">Hierarchical</oj-option>
        </oj-buttonset-one>
      </oj-form-layout>

      <oj-stream-list
        id="demostreamlist"
        class="demo-max-height"
        aria-label="stream list showing scroll position"
        expanded={expanded}
        data={dataStructure === 'flat' ? flatDataProvider : treeDataProvider}
        onscrollPositionChanged={handleScrollPositionChanged}
      >
        <template slot="groupTemplate" render={renderGroupTemplate} />
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-stream-list>

      <span>
        Current scroll position:
        {scrollPositionDetail}
      </span>
    </div>
  );
};

export default StreamListScrollPosition;
