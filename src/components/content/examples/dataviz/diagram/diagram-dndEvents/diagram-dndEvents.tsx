import "css!./demo.css";
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
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
    const nodeTemplateRenderer = (node: DatavizTemplateContext<DatavizChartDatum>) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                shape: node.data.category === '0' ? 'circle' : node.data.category === '1' ? 'rectangle' : 'square',
                color: nodeColor,
                width: 30,
                height: 30
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={`Node ${node.data.id}, Category ${node.data.category}`} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={`Link ${link.data.id}, connects ${link.data.start} to ${link.data.end}`} width={3}/>;
    };
    return (<div id="diagram-container" class="oj-flex oj-sm-flex-direction-column">
            <div class="demo-diagram-dndevents-width-style oj-sm-float-start">
                    <div id="dropTarget" class="demo-diagram-dndevents-droptarget-width-style oj-sm-float-start" onDragOver={onDragOver} onDrop={onDrop}>
                              <div class="oj-sm-padding-3x-start oj-typography-body-md oj-typography-bold">Drop diagram nodes here</div>
                              <div class="oj-sm-padding-3x-start oj-sm-margin-2x-top">{dragMessage}</div>
                          </div>
                    <div class="demo-diagram-dndevents-drag-style oj-sm-float-start">
                              <div class="oj-sm-padding-3x-start oj-sm-padding-3x-bottom oj-typography-body-md oj-typography-bold">Drag the shapes below to the diagram</div>
                              <br class="demo-diagram-dndevents-clear-left-style" />
                              <div class="oj-sm-padding-3x-start">
                                          <div id="circle" class="demo-diagram-dndevents-circle-style" draggable={true} onDragStart={onDragStart} />
                                          <div id="square" class="demo-diagram-dndevents-square-style" draggable={true} onDragStart={onDragStart} />
                                      </div>
                          </div>
                </div>
            <br class="demo-diagram-dndevents-clear-left-style" />
            <oj-diagram id="diagram1" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.circleLayoutWithLayoutArgs(120)} selectionMode="multiple" class="demo-diagram-dndevents-diagram1-style">
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
            <br class="demo-diagram-dndevents-clear-left-style" />
        </div>);
};
export default DiagramDndEvents;
