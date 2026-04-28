import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
import 'ojs/ojinputnumber';
import '../../../../../jet-composites/demo-select-enum/loader';
import 'ojs/ojformlayout';
import "css!./demo.css";
type ConnectorType = 'none' | 'arrow' | 'arrowOpen';
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
  const styleDefaultsValue = useMemo(() => ({
      nodeDefaults: {
          icon: { width: 40, height: 40, color: '#eee', borderColor: color }
      },
      linkDefaults: {
          color,
          width: linkWidth,
          startConnectorType: linkStart,
          endConnectorType: linkEnd
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
                              <demo-select-enum id="linkStart" aria-controls="diagram1" class="oj-flex-item oj-sm-padding-2x-end" onvalueChanged={(event: JetElementCustomEvent<ConnectorType>) => setLinkStart(event.detail.value)} value={linkStart} labelHint="link start" enumValues={["none", "arrow", "arrowOpen"]} />
                              <demo-select-enum id="linkEnd" aria-controls="diagram1" class="oj-flex-item" onvalueChanged={(event: JetElementCustomEvent<ConnectorType>) => setLinkEnd(event.detail.value)} value={linkEnd} labelHint="link end" enumValues={["none", "arrow", "arrowOpen"]} />
                          </div>
                </oj-form-layout>
            <oj-diagram id="diagram1" layout={layout.circleLayoutWithLayoutArgs(150)} nodeData={nodeDataProvider} linkData={linkDataProvider} selectionMode="multiple" styleDefaults={styleDefaultsValue}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                    <template slot="linkTemplate" render={linkTemplateRenderer} />
                </oj-diagram>
        </div>
    );
};
export default DiagramLinkStyles;
