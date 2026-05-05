// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import DemoDelayingTreeDataProvider from '../streamList-streamlist/DemoDelayingTreeDataProvider';
import 'ojs/ojtreemap';
import 'ojs/ojbutton';
import 'ojs/ojinputnumber';
import 'ojs/ojformlayout';

type TreeNode = {
  label: string;
  id: string;
  value: number;
  nodes?: TreeNode[];
};

const nodes = JSON.parse(jsonDataText as string) as TreeNode[];

export const TreemapProgressiveLoading = () => {
  const [delay, setDelay] = useState(2000);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);

  const getColor = () => colorHandler.getValue(Math.floor(Math.random() * 4).toString());

  const getDataProvider = () =>
    new DemoDelayingTreeDataProvider<string, TreeNode>(
      new ArrayTreeDataProvider<string, TreeNode>(nodes, {
        keyAttributes: 'label',
        childrenAttribute: 'nodes'
      }),
      (delay + Math.min(delay, 2000) * Math.random()) / 2,
      0
    );

  const [dataProvider1, setDataProvider1] = useState(() => getDataProvider());
  const [dataProvider2, setDataProvider2] = useState(() => getDataProvider());
  const [dataProvider3, setDataProvider3] = useState(() => getDataProvider());

  const handleDelayValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setDelay(event.detail.value ?? 0);
  };

  const applyDelay = () => {
    setDataProvider1(getDataProvider());
    setDataProvider2(getDataProvider());
    setDataProvider3(getDataProvider());
  };

  return (
    <div id="container" class="demo-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-form-layout maxColumns={2} aria-controls="visualization">
          <oj-input-number
            id="fetch-delay-input"
            min={0}
            step={0}
            onvalueChanged={handleDelayValueChanged}
            value={delay}
            labelHint="Approximate fetch delay (ms)"
          />
          <oj-button class="oj-button-lg" onojAction={applyDelay}>
            Apply
          </oj-button>
        </oj-form-layout>
      </div>
      <div id="visualization" class="oj-flex">
        <div class="demo-treemap-container demo-treemap-container-sm oj-sm-4 oj-flex-item oj-divider-end">
          <oj-treemap id="treemap-sm" data={dataProvider1} aria-label="Small Treemap" class="demo-treemap">
            <template
              slot="nodeTemplate"
              render={($current: { data: TreeNode }) => (
                <oj-treemap-node
                  label={$current.data.label}
                  value={$current.data.value}
                  color={getColor()}
                  shortDesc={`${$current.data.label}:${$current.data.value}`}
                />
              )}
            />
          </oj-treemap>
        </div>
        <div class="demo-treemap-container demo-treemap-container-md oj-sm-8 oj-flex-item">
          <oj-treemap id="treemap-md" data={dataProvider2} aria-label="Medium Treemap" class="demo-treemap demo-treemap-md">
            <template
              slot="nodeTemplate"
              render={($current: { data: TreeNode }) => (
                <oj-treemap-node
                  label={$current.data.label}
                  value={$current.data.value}
                  color={getColor()}
                  shortDesc={`${$current.data.label}:${$current.data.value}`}
                />
              )}
            />
          </oj-treemap>
        </div>
      </div>
      <div class="demo-treemap-container demo-treemap-container-lg oj-divider-top">
        <oj-treemap id="treemap-lg" data={dataProvider3} aria-label="Large Treemap" class="demo-treemap demo-treemap-lg">
          <template
            slot="nodeTemplate"
            render={($current: { data: TreeNode }) => (
              <oj-treemap-node
                label={$current.data.label}
                value={$current.data.value}
                color={getColor()}
                shortDesc={`${$current.data.label}:${$current.data.value}`}
              />
            )}
          />
        </oj-treemap>
      </div>
    </div>
  );
};

export default TreemapProgressiveLoading;
