// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataText from 'text!./cityStateData.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import 'ojs/ojbutton';
import 'ojs/ojtoolbar';
import 'ojs/ojtreemap';
import { ojButton } from 'ojs/ojbutton';
import { ojTreemap } from 'ojs/ojtreemap';

type TreemapNodeDatum = {
  id: string;
  label: string;
  value: number;
  color?: string;
  nodes?: TreemapNodeDatum[];
};

type TreemapNodeContext = ojTreemap.NodeTemplateContext<string, TreemapNodeDatum>;

const baseNodes = JSON.parse(jsonDataText as string) as TreemapNodeDatum[];
const colorHandler = new ColorAttributeGroupHandler();

const getValue = (): number => Math.round(50 + 50 * Math.random());
const getColor = (): string => colorHandler.getValue(Math.floor(Math.random() * 4).toString());
const getShortDesc = (label: string, value: number): string => `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Value: ${value}`;

const cloneWithColors = (nodes: TreemapNodeDatum[]): TreemapNodeDatum[] =>
  nodes.map((node) => ({
    ...node,
    color: getColor(),
    nodes: node.nodes ? cloneWithColors(node.nodes) : undefined
  }));

const updateValues = (nodes: TreemapNodeDatum[]): TreemapNodeDatum[] =>
  nodes.map((node) => ({
    ...node,
    value: Math.random() < 0.1 ? getValue() : node.value,
    nodes: node.nodes
      ? node.nodes.map((child) => ({
          ...child,
          value: Math.random() < 0.4 ? getValue() : child.value
        }))
      : undefined
  }));

const updateColors = (nodes: TreemapNodeDatum[]): TreemapNodeDatum[] =>
  nodes.map((node) => ({
    ...node,
    nodes: node.nodes
      ? node.nodes.map((child) => ({
          ...child,
          color: Math.random() < 0.4 ? getColor() : child.color
        }))
      : undefined
  }));

const createNewYorkNode = (): TreemapNodeDatum => ({
  id: '5',
  value: getValue(),
  color: getColor(),
  label: 'New York',
  nodes: [
    {
      id: '50',
      value: getValue(),
      color: getColor(),
      label: 'New York City'
    },
    {
      id: '51',
      value: getValue(),
      color: getColor(),
      label: 'Albany'
    }
  ]
});

export const TreemapAnimation = () => {
  const [nodes, setNodes] = useState<TreemapNodeDatum[]>(() => cloneWithColors(baseNodes));

  const treemapData = useMemo(
    () =>
      new ArrayTreeDataProvider(nodes, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    [nodes]
  );

  const handleValueButtonClick = (_event: ojButton.ojAction): void => {
    setNodes((currentNodes) => updateValues(currentNodes));
  };

  const handleColorButtonClick = (_event: ojButton.ojAction): void => {
    setNodes((currentNodes) => updateColors(currentNodes));
  };

  const handleNodeButtonClick = (_event: ojButton.ojAction): void => {
    setNodes((currentNodes) =>
      currentNodes.length <= 5
        ? [...currentNodes, createNewYorkNode()]
        : currentNodes.slice(0, currentNodes.length - 1)
    );
  };

  const nodeTemplateRenderer = ($current: TreemapNodeContext) => (
    <oj-treemap-node
      label={$current.data.label}
      value={$current.data.value}
      color={$current.data.color}
      shortDesc={getShortDesc($current.data.label, $current.data.value)}
    />
  );

  return (
    <div id="treemap-container">
      <oj-toolbar
        class="oj-divider-bottom"
        chroming="outlined"
        aria-controls="treemap"
        aria-label="Treemap Data Toolbar"
      >
        <oj-button onojAction={handleValueButtonClick}>Update values</oj-button>
        <oj-button onojAction={handleColorButtonClick}>Update colors</oj-button>
        <oj-button onojAction={handleNodeButtonClick}>Add/Remove Node</oj-button>
      </oj-toolbar>

      <oj-treemap
        id="treemap"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        data={treemapData}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-treemap>
    </div>
  );
};

export default TreemapAnimation;
