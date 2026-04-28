import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/lateralLinksDataSample.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { JetElementCustomEvent } from 'ojs/index';
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojformlayout';
interface DiagramNode {
    id: string;
    category: string;
}
interface DiagramLink {
    id: string;
    category: string;
    startNode?: string;
    start?: string;
    endNode?: string;
    end?: string;
}
interface DiagramData {
    nodes: DiagramNode[];
    links: DiagramLink[];
}
type DiagramSelectionValue = NonNullable<ComponentProps<'oj-diagram'>['selection']>;
type DiagramSelectionMode = ComponentProps<'oj-diagram'>['selectionMode'];
type DiagramSelectionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-diagram'>['onselectionChanged']>>[0];
type NodeTemplateContext = {
    data: DiagramNode;
};
type LinkTemplateContext = {
    data: DiagramLink;
};
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramSelection = () => {
    const [selectedNodesValue, setSelectedNodesValue] = useState<DiagramSelectionValue>(['N0', 'N1', 'H0']);
    const [selectionValue, setSelectionValue] = useState<DiagramSelectionMode>('multiple');
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider<DiagramNode['id'], DiagramNode>(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider<DiagramLink['id'], DiagramLink>(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const handleSelectionModeChanged = (event: JetElementCustomEvent<DiagramSelectionMode>) => {
        const value = event.detail.value ?? 'multiple';
        setSelectionValue(value);
        setSelectedNodesValue(value === 'multiple' ? ['N0', 'N1', 'H0'] : value === 'single' ? ['N0'] : []);
    };
    const handleSelectionChanged = (event: DiagramSelectionChangedEvent) => {
        setSelectedNodesValue(event.detail.value ?? []);
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(node.data.category)
            } };
        return <oj-diagram-node shortDesc={`Node ${node.data.id}, Category ${node.data.category}`} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: LinkTemplateContext) => {
        return <oj-diagram-link startNode={link.data.startNode ?? link.data.start} endNode={link.data.endNode ?? link.data.end} shortDesc={`Link ${link.data.id}, Category ${link.data.category}`} color={colorHandler.getValue(link.data.category)}/>;
    };
    return (<div id="diagram-container">
            <oj-form-layout aria-controls="diagram1">
                    <demo-radioset-enum id="radioButtonset" labelHint="Selection" value={selectionValue} onvalueChanged={handleSelectionModeChanged} direction="row" enumValues={["none", "single", "multiple"]}/>
                </oj-form-layout>
            <div class="oj-sm-padding-1x">
                    <div>Selected objects:</div>
                    <div id="selectedObjects">{selectedNodesValue.join(', ')}</div>
                </div>
            <oj-diagram id="diagram1" layout={layout.circleLayoutWithLayoutArgs(160)} nodeData={nodeDataProvider} linkData={linkDataProvider} onselectionChanged={handleSelectionChanged} selection={selectedNodesValue} selectionMode={selectionValue} styleDefaults={{ nodeDefaults: { icon: { width: 50, height: 50, shape: 'square' } }, linkDefaults: { startConnectorType: 'none', endConnectorType: 'arrow' } }}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramSelection;
