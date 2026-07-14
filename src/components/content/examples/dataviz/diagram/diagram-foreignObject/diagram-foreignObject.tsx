import "css!./demo.css";
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojavatar';
import 'ojs/ojdiagram';
import 'ojs/ojlegend';
import 'ojs/ojlistitemlayout';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/foreignObjectData.json';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface ForeignObjectNode {
    id: string;
    type?: string;
    nodeType?: string;
    nodes?: ForeignObjectNode[];
}

interface ForeignObjectLink {
    id: string;
    startNode: string;
    endNode: string;
}

interface ForeignObjectData {
    nodes: ForeignObjectNode[];
    links: ForeignObjectLink[];
}

type NodeTemplateContext = {
    data: ForeignObjectNode;
};
type NodeContentTemplateContext = {
    id: string;
    itemData: ForeignObjectNode;
};
type LinkTemplateContext = {
    data: ForeignObjectLink;
};
type LegendTemplateContext = {
    data: {
        marker: string;
        color: string;
    };
};

const jsonData = JSON.parse(jsonDataText as string) as ForeignObjectData;

export const DiagramForeignObject = () => {
  const data = jsonData;
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const markers = useMemo(() => [
      { marker: 'Table', color: '#4c825c' },
      { marker: 'String', color: '#965434' },
      { marker: 'Numeric', color: '#437c93' }
  ], []);
  const legendDataProvider = useMemo(() => new ArrayDataProvider<string, { marker: string; color: string }>(markers, {
      keyAttributes: 'marker'
  }), [markers]);
  const flatNodes = useMemo(() => {
      const items: ForeignObjectNode[] = [];
      const visit = (nodes: ForeignObjectNode[]) => {
          nodes.forEach((node) => {
              items.push(node);
              if (Array.isArray(node.nodes)) {
                  visit(node.nodes);
              }
          });
      };
      visit(data.nodes);
      return items;
  }, [data]);
  const nodeDataProvider = useMemo(() => new ArrayDataProvider<ForeignObjectNode['id'], ForeignObjectNode>(flatNodes, {
      keyAttributes: 'id'
  }), [flatNodes]);
  const linkDataProvider = useMemo(() => new ArrayDataProvider<ForeignObjectLink['id'], ForeignObjectLink>(data.links, {
      keyAttributes: 'id'
  }), [data]);

    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
      return <oj-diagram-node showDisclosure="off" shortDesc={`${node.data.type ?? node.data.nodeType ?? 'Item'}: ${node.data.id}`}/>;
  };

  const nodeContentTemplateRenderer = (current: NodeContentTemplateContext) => {
      return <svg width="210" height="60">
                                        <foreignObject x="0" y="0" width="210" height="60">
                                              <div class="oj-panel oj-sm-padding-0 demo-position-static demo-node-dims">
                                                    <oj-list-item-layout>
                                                          <span slot="leading" role="img">
                                                                <oj-avatar role="img" aria-label={current.itemData.nodeType === 'number' ? 'numeric property' : current.itemData.nodeType === 'string' ? 'string property' : 'database icon'} iconClass={current.itemData.nodeType === 'number' ? 'ojUxIcoDiamond8' : current.itemData.nodeType === 'string' ? 'ojUxIcoCircle8' : 'oj-ux-ico-database'} size={current.itemData.nodeType ? 'xxs' : 'sm'} shape={current.itemData.nodeType ? 'circle' : 'square'} background={current.itemData.nodeType === 'number' ? 'blue' : current.itemData.nodeType === 'string' ? 'orange' : 'green'}/>
                                                            </span>
                                                          <div class="oj-typography-body-sm oj-typography-bold">{String(current.id)}</div>
                                                          <div>{current.itemData.nodeType ?? current.itemData.type ?? 'table'}</div>
                                                      </oj-list-item-layout>
                                                </div>
                                          </foreignObject>
                                    </svg>;
  };

  const linkTemplateRenderer = (link: LinkTemplateContext) => {
      return <oj-diagram-link startNode={link.data.startNode} endNode={link.data.endNode} startConnectorType="circle" endConnectorType="arrow" color={colorHandler.getValue(String(link.data.id))} shortDesc={`${link.data.startNode} links to ${link.data.endNode}`}/>;
  };

  const itemTemplateRenderer = (current: LegendTemplateContext) => {
      return <oj-legend-item shortDesc={`Type: ${current.data.marker}`} text={current.data.marker} color={current.data.color}/>;
  };

return (
      <div id="diagram-container">
            <oj-diagram animationOnDataChange="auto" animationOnDisplay="auto" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.containerLayout} maxZoom={2.0} selectionMode="single" aria-label="diagram of database structure for orders">
                    <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                    <template slot="nodeContentTemplate" render={nodeContentTemplateRenderer} />
                    <template slot="linkTemplate" render={linkTemplateRenderer} />
            </oj-diagram>
            <div id="legend-container">
                    <oj-legend halign="center" valign="bottom" orientation="horizontal" data={legendDataProvider}>
                              <template slot="itemTemplate" render={itemTemplateRenderer} />
                          </oj-legend>
                </div>
        </div>
    );
};
export default DiagramForeignObject;
