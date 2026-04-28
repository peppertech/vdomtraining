import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojsunburst';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojformlayout';
type SunburstSelection = ComponentProps<'oj-sunburst'>['selection'];
type SunburstSelectionMode = ComponentProps<'oj-sunburst'>['selectionMode'];
type SunburstSelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-sunburst'>['onselectionChanged']>>[0];

type SunburstNode = {
    label: string;
    value: number;
    nodes?: SunburstNode[];
};

const jsonData = JSON.parse(jsonDataText as string) as SunburstNode[];
export const SunburstSelection = () => {
  const [selectedNodesValue, setSelectedNodesValue] = useState<SunburstSelection>(['Massachusetts', 'Newport', 'Portland']);
  const [selectionValue, setSelectionValue] = useState<SunburstSelectionMode>('multiple');

  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const sunburstData = useMemo(() => new ArrayTreeDataProvider(jsonData, {
      keyAttributes: 'label',
      childrenAttribute: 'nodes'
  }), []);
  const selectionInfo = () => {
      let items = '';
      const selection = selectedNodesValue ?? [];
      if (selection.length > 0) {
          items += 'Nodes:\n';
          for (let i = 0; i < selection.length; i++) {
              items += `    ${selection[i]}\n`;
          }
      }
      return items.trim();
  };
  const handleSelectionValueValueChanged = (event: JetElementCustomEvent<SunburstSelectionMode>) => {
    setSelectionValue(event.detail.value);
  };

  const handleSelectedNodesValueSelectionChanged = (event: SunburstSelectionChangedEvent) => {
    setSelectedNodesValue(event.detail.value);
  };

  const getColor = () => {
      return colorHandler.getValue(Math.floor(Math.random() * 4).toString());
  };
    const nodeTemplateRenderer = ($current: any) => {
      return <oj-sunburst-node label={$current.data.label} value={$current.data.value} color={getColor()} shortDesc={$current.data.label + ':' + $current.data.value}/>;
  };

return (
      <div id="sunburst-container">
            <oj-form-layout aria-controls="sunburst">
                    <demo-radioset-enum onvalueChanged={handleSelectionValueValueChanged} value={selectionValue} direction="row" labelHint="Selection" enumValues={['none', 'single', 'multiple']} />
                </oj-form-layout>
            <oj-sunburst id="sunburst" animationOnDisplay="auto" data={sunburstData} selectionMode={selectionValue} onselectionChanged={handleSelectedNodesValueSelectionChanged} selection={selectedNodesValue}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                </oj-sunburst>
            <div class="oj-sm-padding-1x">
                    <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Selection</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{selectionInfo()}</div>
                </div>
        </div>
    );
};
export default SunburstSelection;
