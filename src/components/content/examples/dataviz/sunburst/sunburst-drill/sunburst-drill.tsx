import { h } from 'preact';
import type { ComponentProps, JSX } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { JetElementCustomEvent } from 'ojs/index';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { getColorValue } from 'ojs/ojpaletteutils';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojsunburst';
import '../../../../../jet-composites/demo-radioset-enum/loader';

type NumberInputValue = ComponentProps<'oj-input-number'>['value'];
type SelectionMode = NonNullable<ComponentProps<'oj-sunburst'>['selectionMode']>;
type DisplayLevels = ComponentProps<'oj-sunburst'>['displayLevels'];
type DrillEvent = Parameters<NonNullable<ComponentProps<'oj-sunburst'>['onojDrill']>>[0];
type DemoRadioEvent<T> = JetElementCustomEvent<T>;

type DrillNode = {
  id: string;
  color: string;
  value: number;
  nodes?: DrillNode[];
};

type NodeTemplateContext = {
  data: DrillNode;
};

const CHILDREN_PER_NODE = 2;
const sunburstProps = {
  'nodeDefaults.labelDisplay': 'rotated'
} as Partial<ComponentProps<'oj-sunburst'>>;

const buildNode = (label: number, layer: number, totalLayers: number, colorRamp: string[]): DrillNode => ({
  id: String(label),
  color: getColorValue(colorRamp, layer / totalLayers),
  value: label
});

const generateChildren = (
  childCount: number,
  layer: number,
  index: number,
  totalLayers: number,
  colorRamp: string[]
): DrillNode[] => {
  const childNodes: DrillNode[] = [];

  for (let i = 0; i < childCount; i++) {
    childNodes.push(buildNode(index + i + 1, layer + 1, totalLayers, colorRamp));
  }

  return childNodes;
};

const populateNodeTree = (
  remainingLayers: number,
  parent: DrillNode,
  index: number,
  totalLayers: number,
  colorRamp: string[]
): void => {
  if (remainingLayers <= 1) {
    return;
  }

  const layer = Math.abs(remainingLayers - totalLayers) + 1;
  const children = generateChildren(CHILDREN_PER_NODE, layer, index, totalLayers, colorRamp);
  parent.nodes = children;

  children.forEach((child, childIndex) => {
    populateNodeTree(remainingLayers - 1, child, (index + childIndex + 1) * 2, totalLayers, colorRamp);
  });
};

const buildSunburstNodes = (layers: number, colorRamp: string[]): DrillNode[] => {
  const root = buildNode(0, 1, layers, colorRamp);
  populateNodeTree(layers, root, 0, layers, colorRamp);
  return [root];
};

export const SunburstDrill = (): JSX.Element => {
  const [selectionValue, setSelectionValue] = useState<SelectionMode>('none');
  const [numLayers, setNumLayers] = useState<number>(6);
  const [displayLevels, setDisplayLevels] = useState<number>(4);
  const [drillData, setDrillData] = useState<string>('');

  const colorRamp = useMemo(() => getColorValuesFromPalette('viridis'), []);
  const nodeValues = useMemo(() => buildSunburstNodes(numLayers, colorRamp), [colorRamp, numLayers]);
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(nodeValues, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    [nodeValues]
  );

  const handleNumLayersValueChanged = (
    event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]
  ): void => {
    setNumLayers(event.detail.value ?? 1);
  };

  const handleSelectionValueValueChanged = (event: DemoRadioEvent<SelectionMode>): void => {
    setSelectionValue(event.detail.value);
  };

  const handleDisplayLevelsValueChanged = (
    event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]
  ): void => {
    setDisplayLevels(event.detail.value ?? 1);
  };

  const handleDrill = (event: DrillEvent): void => {
    setDrillData(String(event.detail.data.label ?? ''));
  };

  const nodeTemplateRenderer = ($current: NodeTemplateContext): JSX.Element => (
    <oj-sunburst-node
      label={`Node ${$current.data.id}`}
      shortDesc={`Node ${$current.data.id}`}
      color={$current.data.color}
      value={1}
    />
  );

  return (
    <div id="sunburst-container">
      <oj-form-layout aria-controls="sunburst" maxColumns={2}>
        <oj-input-number
          min={1}
          max={10}
          step={1}
          onvalueChanged={handleNumLayersValueChanged}
          value={numLayers as NumberInputValue}
          labelHint="Data Layers"
        />
        <demo-radioset-enum
          direction="row"
          onvalueChanged={handleSelectionValueValueChanged}
          value={selectionValue}
          enumValues={['none', 'single', 'multiple']}
          labelHint="Selection"
        />
        <oj-input-number
          min={1}
          max={10}
          step={1}
          onvalueChanged={handleDisplayLevelsValueChanged}
          value={displayLevels as DisplayLevels}
          labelHint="Display Levels"
        />
      </oj-form-layout>
      <div class="oj-sm-margin-2x-vertical" id="drillText">
        Drill Event From Node:
        <span class="oj-typography-bold">{drillData}</span>
      </div>
      <oj-sunburst
        id="sunburst"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        colorLabel="Median Household Income"
        sizeLabel="Population"
        displayLevels={displayLevels}
        drilling="on"
        onojDrill={handleDrill}
        selectionMode={selectionValue}
        data={sunburstData}
        {...sunburstProps}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstDrill;
