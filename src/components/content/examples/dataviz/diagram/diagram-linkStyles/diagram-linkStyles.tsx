import 'preact';
import type { ComponentProps } from 'preact';

import "css!./demo.css";
import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import '../../../../../jet-composites/demo-select-enum/loader';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ConnectorType = 'none' | 'arrow' | 'arrowOpen' | 'custom';
type DiagramNodeDatum = {
    id: string;
    category: string;
};
type DiagramLinkDatum = {
    id: string;
    category: string;
    start: string;
    end: string;
};
type DiagramData = {
    nodes: DiagramNodeDatum[];
    links: DiagramLinkDatum[];
};
type NodeTemplateContext = {
    data: DiagramNodeDatum;
};
type LinkTemplateContext = {
    data: DiagramLinkDatum;
};

const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramLinkStyles = () => {
  const [linkWidth, setLinkWidth] = useState<number>(2);
  const [linkStart, setLinkStart] = useState<ConnectorType>('none');
  const [linkEnd, setLinkEnd] = useState<ConnectorType>('arrow');
  const data = jsonData;
  const color = useMemo(() => new ColorAttributeGroupHandler().getValue('0'), []);
  const nodeDataProvider = useMemo(() => new ArrayDataProvider(data.nodes, {
      keyAttributes: 'id'
  }), [data]);
  const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
      keyAttributes: 'id'
  }), [data]);
  const getStyleUrl = (styleId: string) => {
      return 'url(' + document.URL + '#' + styleId + ')';
  };
  const styleDefaultsValue = useMemo(() => ({
      nodeDefaults: {
          icon: { width: 40, height: 40, color: '#eee', borderColor: color }
      },
      linkDefaults: {
          color,
          width: linkWidth,
          startConnectorType: linkStart === 'custom' ? 'none' : linkStart,
          endConnectorType: linkEnd === 'custom' ? 'none' : linkEnd,
          svgStyle: {
              markerStart: linkStart === 'custom' ? getStyleUrl('startMarker') : undefined,
              markerEnd: linkEnd === 'custom' ? getStyleUrl('endMarker') : undefined
          }
      }
  }), [color, linkEnd, linkStart, linkWidth]);
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
      return <oj-diagram-node shortDesc={`Node ${node.data.id}`}/>;
  };

  const linkTemplateRenderer = (link: LinkTemplateContext) => {
      return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={`Link ${link.data.id}, category ${link.data.category}`} svgStyle={{ strokeDasharray: link.data.category === '2' ? '8,3,2,3' : link.data.category === '1' ? '6,4' : undefined }}/>;
  };

return (
      <div id="diagram-container">
            <oj-form-layout userAssistanceDensity="compact" aria-controls="diagram1" labelWidth="100%">
                    <oj-input-number id="linkWidth" aria-controls="diagram1" labelHint="link width" min={1} max={10} step={1} onvalueChanged={(event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => setLinkWidth(event.detail.value ?? 1)} value={linkWidth} />
                    <div class="oj-flex">
                              <demo-select-enum id="linkStart" aria-controls="diagram1" class="oj-flex-item oj-sm-padding-2x-end" onvalueChanged={(event: JetElementCustomEvent<ConnectorType>) => setLinkStart(event.detail.value)} value={linkStart} labelHint="link start" enumValues={["none", "arrow", "arrowOpen", "custom"]} />
                              <demo-select-enum id="linkEnd" aria-controls="diagram1" class="oj-flex-item" onvalueChanged={(event: JetElementCustomEvent<ConnectorType>) => setLinkEnd(event.detail.value)} value={linkEnd} labelHint="link end" enumValues={["none", "arrow", "arrowOpen", "custom"]} />
                          </div>
                </oj-form-layout>
            <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
                    <defs>
                              <marker id="endMarker" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="20" markerHeight="20" markerUnits="userSpaceOnUse" orient="auto">
                                        <path d="M 0 0 10 0 10 10 0 10 5 5 z" class="demo-diagram-marker" />
                                    </marker>
                              <marker id="startMarker" markerUnits="userSpaceOnUse" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="20" markerHeight="20" orient="auto">
                                        <path d="M 10 0 0 0 0 10 10 10 5 5 z" class="demo-diagram-marker" />
                                    </marker>
                          </defs>
                </svg>
            <oj-diagram id="diagram1" layout={layout.circleLayoutWithLayoutArgs(150)} nodeData={nodeDataProvider} linkData={linkDataProvider} selectionMode="multiple" styleDefaults={styleDefaultsValue}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                    <template slot="linkTemplate" render={linkTemplateRenderer} />
                </oj-diagram>
        </div>
    );
};
export default DiagramLinkStyles;
