import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/containersData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';

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

export const DiagramCustomTemplates = () => {
  const data = jsonData;
  const nodeDataProvider = useMemo(() => new ArrayTreeDataProvider(data.nodes, {
      keyAttributes: 'id',
      childrenAttribute: 'nodes'
  }), [data]);
  const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
      keyAttributes: 'id'
  }), [data]);
  const expandedNodes = useMemo(() => new KeySetImpl(['N0', 'N00']), []);

    const nodeTemplateRenderer = (node: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-diagram-node shortDesc={`Node ${node.data.id}`}/>;
  };

  const nodeContentTemplateRenderer = (current: DatavizTemplateContext<DatavizChartDatum>) => {
      return <svg width={current.state.expanded ? current.content.width + 40 : 120} height={current.state.expanded ? current.content.height + 60 : 56}>
                              <g>
                                  <rect x="1" y="1" width={current.state.expanded ? current.content.width + 38 : 118} height={current.state.expanded ? current.content.height + 58 : 54} fill="white" stroke={current.state.selected ? 'red' : '#87ceeb'} strokeWidth={current.state.selected || current.state.hovered ? 3 : 1}/>
                                  <rect x="1" y="1" width={current.state.expanded ? current.content.width + 38 : 118} height="20" fill={current.state.selected ? 'red' : '#68C182'}/>
                                  <text x="12" y="14" fontSize="10px" fontWeight="bold">{String(current.id)}</text>
                                  {current.state.expanded ? <g transform="translate(20,36)"><oj-diagram-child-content /></g> : <text x="12" y="38" fontSize="9px">Custom SVG node template</text>}
                              </g>
                          </svg>;
  };

  const linkTemplateRenderer = (link: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-diagram-link startNode={link.data.startNode} endNode={link.data.endNode} startConnectorType="circle" endConnectorType="arrow" shortDesc={`Link ${link.data.id} connects ${link.data.startNode} to ${link.data.endNode}`}/>;
  };

return (
      <oj-diagram id="diagram-container" animationOnDataChange="auto" animationOnDisplay="auto" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.containerLayout} selectionMode="single" maxZoom={4.0} zooming="auto" panning="auto" promotedLinkBehavior="full" expanded={expandedNodes}>
            <template slot="nodeTemplate" render={nodeTemplateRenderer} />
            <template slot="nodeContentTemplate" render={nodeContentTemplateRenderer} />
            <template slot="linkTemplate" render={linkTemplateRenderer} />
        </oj-diagram>
    );
};

export default DiagramCustomTemplates;

