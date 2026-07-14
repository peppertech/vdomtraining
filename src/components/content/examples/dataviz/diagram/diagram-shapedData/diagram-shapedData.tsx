import 'ojs/ojdiagram';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramShapedDataSample.json';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface DiagramNode {
    id: string;
}

interface DiagramLink {
    id: string;
}

interface DiagramData {
    nodes: DiagramNode[];
    links: DiagramLink[];
}

type DiagramLayout = ComponentProps<'oj-diagram'>['layout'];

const jsonData = JSON.parse(jsonDataText as string) as DiagramData;

export const DiagramShapedData = () => {
  const data = jsonData;
  const layoutFunc: DiagramLayout = layout.circleLayoutWithLayoutArgs(150);
  const nodeDataProvider = useMemo(() => new ArrayDataProvider(data.nodes, {
      keyAttributes: 'id'
  }), [data]);
  const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
      keyAttributes: 'id'
  }), [data]);
  return (
      <div id="diagram-container">
            <oj-diagram id="diagram1" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layoutFunc} />
        </div>
    );
};
export default DiagramShapedData;
