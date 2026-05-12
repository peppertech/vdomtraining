import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import Context = require('ojs/ojcontext');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { AllKeySetImpl, KeySet, KeySetImpl } from 'ojs/ojkeyset';
import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojtreeview';

type TreeNode = {
  title: string;
  id: string;
  children?: TreeNode[];
};

type ExpandValue = 'collapse' | 'expand';
type TreeViewItemTemplateContext = {
  data: TreeNode;
};

type InputNumberValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>
>[0];
type ButtonsetOneValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>
>[0];

const COLLAPSED_NODE_LIMIT = 1000000;
const EXPANDED_NODE_LIMIT = 10000;

const itemTemplateRenderer = (row: TreeViewItemTemplateContext) => [
  <span key="icon" class="oj-treeview-item-icon" />,
  <span key="text" class="oj-treeview-item-text">
    {row.data.title}
  </span>
];

const generateData = (countPerLevel: number, numLevels: number, level = 1, parentId = '') => {
  const data: TreeNode[] = [];

  for (let index = 0; index < countPerLevel; index += 1) {
    const id = `${parentId}l${level}i${index}`;
    const node: TreeNode = {
      id,
      title: `Item ${index + 1}`
    };

    if (level < numLevels) {
      node.children = generateData(countPerLevel, numLevels, level + 1, id);
    }

    data.push(node);
  }

  return data;
};

const createDataProvider = (data: TreeNode[]) =>
  new ArrayTreeDataProvider(data, {
    keyAttributes: 'id'
  });

export const TreeViewPerformance = () => {
  const [countPerLevel, setCountPerLevel] = useState<number>(5);
  const [numLevels, setNumLevels] = useState<number>(3);
  const [renderTime, setRenderTime] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');
  const [expandValue, setExpandValue] = useState<ExpandValue>('collapse');
  const [data, setData] = useState(() => createDataProvider(generateData(5, 3)));

  const totalItems = useMemo(() => Math.pow(countPerLevel, numLevels), [countPerLevel, numLevels]);
  const expanded = useMemo<KeySet<string>>(
    () => (expandValue === 'collapse' ? new KeySetImpl<string>() : new AllKeySetImpl<string>()),
    [expandValue]
  );

  useEffect(() => {
    let cancelled = false;
    const maxNodes = expandValue === 'collapse' ? COLLAPSED_NODE_LIMIT : EXPANDED_NODE_LIMIT;

    if (totalItems > maxNodes) {
      setData(createDataProvider([]));
      setRenderTime('0');
      setErrorMessage(
        `Error: Too Many Nodes. ${expandValue}: (select total node amount that is less than ${maxNodes} nodes)`
      );
      return () => {
        cancelled = true;
      };
    }

    const start = Date.now();
    setErrorMessage('');
    setData(createDataProvider(generateData(countPerLevel, numLevels)));

    Context.getPageContext()
      .getBusyContext()
      .whenReady()
      .then(() => {
        if (!cancelled) {
          setRenderTime(`${Date.now() - start}ms`);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [countPerLevel, expandValue, numLevels, totalItems]);

  const handleCountChanged = (event: InputNumberValueChangedEvent) => {
    setCountPerLevel(event.detail.value ?? 1);
  };

  const handleLevelsChanged = (event: InputNumberValueChangedEvent) => {
    setNumLevels(event.detail.value ?? 1);
  };

  const handleExpandValueChanged = (event: ButtonsetOneValueChangedEvent) => {
    const nextValue = event.detail.value as ExpandValue | null;
    if (nextValue) {
      setExpandValue(nextValue);
    }
  };

  return (
    <div id="treeview-container">
      <div class="demo-container">
        <div class="oj-panel oj-bg-neutral-30">
          <h2 id="h1" class="oj-typography-subheading-md">
            Options To Control The Performance Below
          </h2>
          <oj-form-layout maxColumns={3} direction="row">
            <oj-input-number
              id="inputnumber-id1"
              min={1}
              onvalueChanged={handleCountChanged}
              labelHint="Items Per Level"
              value={countPerLevel}
            />
            <oj-input-number
              id="inputnumber-id2"
              min={1}
              max={10}
              onvalueChanged={handleLevelsChanged}
              value={numLevels}
              labelHint="Number of Levels"
            />
          </oj-form-layout>
          <oj-form-layout maxColumns={1} direction="row">
            <oj-buttonset-one
              id="expandButtonSet"
              aria-label="Choose only one setting."
              aria-controls="treeview-perf"
              value={expandValue}
              onvalueChanged={handleExpandValueChanged}
            >
              <oj-option value="collapse">Collapse All</oj-option>
              <oj-option value="expand">Expand All</oj-option>
            </oj-buttonset-one>
          </oj-form-layout>
          <div class="oj-sm-padding-1x-start">
            <p>
              Total Items: {totalItems} &nbsp; Time: {renderTime}
            </p>
          </div>
          <div class="oj-sm-padding-1x-start">
            <p class="oj-typography-body-lg oj-typography-bold oj-text-color-danger">
              {errorMessage}
            </p>
          </div>
        </div>
      </div>
      <oj-tree-view
        id="treeview-perf"
        aria-label="Performance Tree View"
        data={data}
        expanded={expanded}
        class="demo-treeview-height"
        scrollPolicyOptions={{ maxCount: 10000 }}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-tree-view>
    </div>
  );
};

export default TreeViewPerformance;
