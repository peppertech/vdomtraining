import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
import "css!./demo.css";
interface DiagramNodeData {
    id: string;
    category: string;
}
interface DiagramLinkData {
    id: string;
    start: string;
    end: string;
}
interface DiagramData {
    nodes: DiagramNodeData[];
    links: DiagramLinkData[];
}
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramDndEvents = () => {
    const data = jsonData;
    const [dragMessage, setDragMessage] = useState<string>('Drag a shape into the drop zone to log an event.');
    const nodeColor = useMemo(() => new ColorAttributeGroupHandler().getValue('0'), []);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const onDragStart = (event: DragEvent) => {
        const target = event.target as HTMLElement | null;
        if (!event.dataTransfer || !target) {
            return;
        }
        const type = target.id === 'square' ? 'blue square' : 'red circle';
        event.dataTransfer.setData('text/plain', type);
    };
    const onDragOver = (event: DragEvent) => {
        if (!event.dataTransfer) {
            return;
        }
        event.preventDefault();
    };
    const onDrop = (event: DragEvent) => {
        event.preventDefault();
        const type = event.dataTransfer?.getData('text/plain') ?? 'unknown shape';
        setDragMessage(`Dropped ${type} into the demo drop zone.`);
    };
    const nodeTemplateRenderer = (node: any) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                shape: node.data.category === '0' ? 'circle' : node.data.category === '1' ? 'rectangle' : 'square',
                color: nodeColor,
                width: 30,
                height: 30
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={`Node ${node.data.id}, Category ${node.data.category}`} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: any) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={`Link ${link.data.id}, connects ${link.data.start} to ${link.data.end}`} width={3}/>;
    };
    return (<div id="diagram-container" class="oj-flex oj-sm-flex-direction-column">
            <div class="oj-flex oj-sm-gap-4">
                    <div class="oj-panel oj-sm-padding-4x" onDragOver={onDragOver} onDrop={onDrop}>
                              <div class="oj-typography-body-md oj-typography-bold">Drop target</div>
                              <div class="oj-sm-margin-2x-top">{dragMessage}</div>
                          </div>
                    <div class="oj-panel oj-sm-padding-4x">
                              <div class="oj-typography-body-md oj-typography-bold">Drag sources</div>
                              <div class="oj-sm-margin-2x-top oj-flex oj-sm-gap-4">
                                          <div id="circle" draggable={true} onDragStart={onDragStart} style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#c0392b' }}/>
                                          <div id="square" draggable={true} onDragStart={onDragStart} style={{ width: '48px', height: '48px', background: '#2e86de' }}/>
                                      </div>
                          </div>
                </div>
            <oj-diagram id="diagram1" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.circleLayoutWithLayoutArgs(120)} selectionMode="multiple" class="oj-sm-margin-4x-top">
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramDndEvents;
