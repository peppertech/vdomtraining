import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/containersData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
import "css!./demo.css";
interface DiagramNodeData {
  id: string;
  nodes?: DiagramNodeData[];
}

interface DiagramLinkData {
  id: string;
  startNode: string;
  endNode: string;
}

interface DiagramData {
  nodes: DiagramNodeData[];
  links: DiagramLinkData[];
}

const jsonData = JSON.parse(jsonDataText as string) as DiagramData;

export const DiagramStyleClass = () => {
  const data = jsonData;
  const nodeDataProvider = useMemo(() => new ArrayTreeDataProvider(data.nodes, {
      keyAttributes: 'id',
      childrenAttribute: 'nodes'
  }), [data]);
  const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
      keyAttributes: 'id'
  }), [data]);
  const expandedNodes = useMemo(() => new KeySetImpl(['N0', 'N00', 'N2']), []);
    const nodeTemplateRenderer = (node: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-diagram-node label={node.data.id} shortDesc={`Node ${node.data.id}`} showDisclosure={node.data.id === 'N1' ? 'off' : 'on'}/>;
  };

  const linkTemplateRenderer = (link: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-diagram-link startNode={link.data.startNode} endNode={link.data.endNode} shortDesc={`Link ${link.data.id} connects ${link.data.startNode} to ${link.data.endNode}`} svgClassName="demo-border"/>;
  };

return (
      <div id="diagram-container">
            <svg height="0" width="0">
                    <defs>
                              <linearGradient id="gradient1" x1="0%" y1="100%">
                                          <stop offset="0%" class="demo-diagram-styleclass-stop-color0-style" />
                                          <stop offset="50%" class="demo-diagram-styleclass-stop-color50-style" />
                                      </linearGradient>
                          </defs>
                </svg>
            <oj-diagram id="diagram1" animationOnDataChange="auto" animationOnDisplay="auto" layout={layout.containerLayout} nodeData={nodeDataProvider} linkData={linkDataProvider} maxZoom={1.5} styleDefaults={{ nodeDefaults: { icon: { width: 40, height: 40, shape: 'square' } }, linkDefaults: { startConnectorType: 'circle', endConnectorType: 'arrow' }, promotedLink: { startConnectorType: 'circle', endConnectorType: 'arrow', svgStyle: { strokeWidth: '1', strokeDasharray: '4,1,3' } } }} expanded={expandedNodes}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                    <template slot="linkTemplate" render={linkTemplateRenderer} />
                </oj-diagram>
        </div>
    );
};
export default DiagramStyleClass;
