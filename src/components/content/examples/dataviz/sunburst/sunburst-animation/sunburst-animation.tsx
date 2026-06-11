import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import 'ojs/ojbutton';
import 'ojs/ojtoolbar';
import 'ojs/ojsunburst';

type AnimationNode = {
  id: string;
  label: string;
  value: number;
  color?: string;
  nodes?: AnimationNode[];
};

const createInitialNodes = (): AnimationNode[] => JSON.parse(jsonDataText as string) as AnimationNode[];

export const SunburstAnimation = () => {
  const nodesRef = useRef<AnimationNode[]>(createInitialNodes());
  const [nodeValues, setNodeValues] = useState<AnimationNode[]>(() => [...nodesRef.current]);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(nodeValues, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    [nodeValues]
  );

  const getValue = (): number => Math.round(50 + 50 * Math.random());
  const getColor = (): string => colorHandler.getValue(Math.floor(Math.random() * 4).toString());
  const getShortDesc = (label: string, value: number): string =>
    `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Value: ${value}`;

  const refreshNodes = (): void => {
    setNodeValues([...nodesRef.current]);
  };

  const valueButtonClick = (): void => {
    nodesRef.current.forEach((node) => {
      if (Math.random() < 0.4) {
        node.value = getValue();
      }

      node.nodes?.forEach((child) => {
        if (Math.random() < 0.4) {
          child.value = getValue();
        }
      });
    });

    refreshNodes();
  };

  const colorButtonClick = (): void => {
    nodesRef.current.forEach((node) => {
      if (Math.random() < 0.3) {
        node.color = getColor();
      }

      node.nodes?.forEach((child) => {
        if (Math.random() < 0.3) {
          child.color = getColor();
        }
      });
    });

    refreshNodes();
  };

  const nodeButtonClick = (): void => {
    if (nodesRef.current.length <= 5) {
      nodesRef.current.push({
        id: '5',
        value: getValue(),
        color: getColor(),
        label: 'New York',
        nodes: [
          { id: '50', value: getValue(), color: getColor(), label: 'New York City' },
          { id: '51', value: getValue(), color: getColor(), label: 'Albany' }
        ]
      });
    } else {
      nodesRef.current.pop();
    }

    refreshNodes();
  };

  const nodeTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-sunburst-node
      label={$current.data.label}
      value={$current.data.value}
      color={$current.data.color}
      shortDesc={getShortDesc($current.data.label, $current.data.value)}
    />
  );

  return (
    <div id="sunburst-container">
      <oj-toolbar
        class="oj-divider-bottom"
        chroming="outlined"
        aria-controls="sunburst"
        aria-label="Sunburst Data Toolbar"
      >
        <oj-button onojAction={valueButtonClick}>Update values</oj-button>
        <oj-button onojAction={colorButtonClick}>Update colors</oj-button>
        <oj-button onojAction={nodeButtonClick}>Add/Remove Node</oj-button>
      </oj-toolbar>
      <oj-sunburst id="sunburst" animationOnDisplay="auto" animationOnDataChange="auto" data={sunburstData}>
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstAnimation;
