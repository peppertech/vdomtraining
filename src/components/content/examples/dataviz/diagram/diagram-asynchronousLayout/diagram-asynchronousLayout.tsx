import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as layout from '../diagram-layouts';
import 'ojs/ojinputnumber';
import 'ojs/ojdiagram';
import 'ojs/ojprogress-bar';
import 'ojs/ojformlayout';
import 'ojs/ojprogressbar';
interface DiagramNode {
    id: string;
    category: string;
}
interface DiagramData {
    nodes: DiagramNode[];
}
type DiagramLayout = ComponentProps<'oj-diagram'>['layout'];
type NodeTemplateContext = {
    data: DiagramNode;
};
type InputNumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramAsynchronousLayout = () => {
    const [layoutDelay, setLayoutDelay] = useState<number>(500);
    const [layoutCallback, setLayoutCallback] = useState<DiagramLayout>(layout.layout(500, true) as DiagramLayout);
    const clockwiseRef = useRef<boolean>(true);
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider<DiagramNode['id'], DiagramNode>(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const updateLayout = (event: InputNumberChangedEvent) => {
        const delay = event.detail.value ?? 500;
        setLayoutDelay(delay);
        clockwiseRef.current = !clockwiseRef.current;
        setLayoutCallback(layout.layout(delay, clockwiseRef.current) as DiagramLayout);
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(node.data.category),
                width: 50,
                height: 50
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={"Node " + node.data.id + ", Category " + node.data.category} {...ojDiagramNodeProps}/>;
    };
    return (<div id="diagram-container">
            <oj-form-layout aria-controls="diagram1">
                <oj-input-number id="layoutDelay" value={layoutDelay} labelHint="Layout delay (ms)" onvalueChanged={updateLayout} min={0} max={3000} step={500}/>
                </oj-form-layout>
            <oj-diagram id="diagram1" animationOnDataChange="auto" animationOnDisplay="auto" layout={layoutCallback} nodeData={nodeDataProvider}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                </oj-diagram>
            <oj-progress-bar id="progressBar" value={-1}/>
        </div>);
};
export default DiagramAsynchronousLayout;
