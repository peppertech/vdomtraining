import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojtreeview';
import 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';
import * as jsonDataText from 'text!./treeViewData.json';
import DemoDelayingTreeDataProvider from '../../shared/DemoDelayingTreeDataProvider';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type TreeNode = {
  title: string;
  id: string;
  children?: TreeNode[];
};

type TreeViewItemTemplateContext = {
  data: TreeNode;
};

type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>
>[0];

const jsonData = JSON.parse(jsonDataText as string) as TreeNode[];

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

const createDataProvider = (delay: number, childDelay: number) =>
  new DemoDelayingTreeDataProvider<string, TreeNode>(
    new ArrayTreeDataProvider(jsonData, {
      keyAttributes: 'id'
    }),
    delay,
    childDelay
  );

export const TreeViewProgressiveLoadTreeView = () => {
  const [delay, setDelay] = useState<number>(2000);
  const [childDelay, setChildDelay] = useState<number>(2000);
  const [dataProvider, setDataProvider] = useState(() => createDataProvider(2000, 2000));

  const handleDelayChanged = (event: InputNumberValueChangedEvent) => {
    setDelay(event.detail.value ?? 0);
  };

  const handleChildDelayChanged = (event: InputNumberValueChangedEvent) => {
    setChildDelay(event.detail.value ?? 0);
  };

  const applyDelay = () => {
    setDataProvider(createDataProvider(delay, childDelay));
  };

  return (
    <div id="treeview-container">
      <div class="oj-panel oj-bg-neutral-30">
        <h2 id="h1" class="oj-typography-subheading-md">
          Options To Control The Delay Below
        </h2>
        <oj-form-layout maxColumns={3} direction="row">
          <oj-input-number
            id="fetch-delay-input"
            min={0}
            step={0}
            value={delay}
            onvalueChanged={handleDelayChanged}
            labelHint="Fetch delay (ms)"
          />
          <oj-input-number
            id="fetch-child-delay-input"
            min={0}
            step={0}
            value={childDelay}
            onvalueChanged={handleChildDelayChanged}
            labelHint="Fetch delay for child nodes (ms)"
          />
          <oj-button class="oj-button-lg" onojAction={applyDelay}>
            Apply
          </oj-button>
        </oj-form-layout>
      </div>
      <oj-tree-view
        id="treeview"
        data={dataProvider}
        selectionMode="multiple"
        aria-label="Progressive Loading Tree View"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewProgressiveLoadTreeView;
