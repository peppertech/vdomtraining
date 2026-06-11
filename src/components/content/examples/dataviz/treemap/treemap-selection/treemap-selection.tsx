// @ts-nocheck
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import 'ojs/ojtreemap';
import 'ojs/ojformlayout';
import '../../../../../jet-composites/demo-radioset-enum/loader';
type TreemapSelection = ComponentProps<'oj-treemap'>['selection'];
type TreemapSelectionMode = ComponentProps<'oj-treemap'>['selectionMode'];
type TreemapSelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-treemap'>['onselectionChanged']>>[0];

type TreemapNode = {
    label: string;
    value: number;
    nodes?: TreemapNode[];
};

const jsonData = JSON.parse(jsonDataText as string) as TreemapNode[];
export const TreemapSelection = () => {
  const [selectedNodesValue, setSelectedNodesValue] = useState<TreemapSelection>(['Massachusetts', 'Newport', 'Portland']);
  const [selectionValue, setSelectionValue] = useState<TreemapSelectionMode>('multiple');

  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const treemapData = useMemo(() => new ArrayTreeDataProvider(jsonData, {
      keyAttributes: 'label',
      childrenAttribute: 'nodes'
  }), []);
  const selectionInfo = () => {
      let items = '';
      const selection = selectedNodesValue ?? [];
      if (selection.length > 0) {
          items += 'selected nodes:\n';
          for (let i = 0; i < selection.length; i++) {
              items += `    ${selection[i]}\n`;
          }
      }
      return items.trim();
  };
  const handleSelectionValueValueChanged = (event: JetElementCustomEvent<TreemapSelectionMode>) => {
    setSelectionValue(event.detail.value);
  };

  const handleSelectedNodesValueSelectionChanged = (event: TreemapSelectionChangedEvent) => {
    setSelectedNodesValue(event.detail.value);
  };

  const getColor = () => {
      return colorHandler.getValue(Math.floor(Math.random() * 4).toString());
  };
    const nodeTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-treemap-node label={$current.data.label} value={$current.data.value} color={getColor()} shortDesc={$current.data.label + ':' + $current.data.value}/>;
  };

return (
      <div id="treemap-container">
            <oj-form-layout aria-controls="treemap">
                    <demo-radioset-enum onvalueChanged={handleSelectionValueValueChanged} value={selectionValue} direction="row" labelHint="Selection" enumValues={["none", "single", "multiple"]} />
                </oj-form-layout>
            <oj-treemap id="treemap" selectionMode={selectionValue} onselectionChanged={handleSelectedNodesValueSelectionChanged} selection={selectedNodesValue} animationOnDisplay="auto" animationOnDataChange="auto" data={treemapData}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                </oj-treemap>
            <div class="oj-sm-padding-1x">
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
                </div>
        </div>
    );
};
export default TreemapSelection;
