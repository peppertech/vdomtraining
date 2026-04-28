import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
import 'ojs/ojformlayout';
import '../../../../../jet-composites/demo-radioset-enum/loader';
type DiagramPanning = NonNullable<ComponentProps<'oj-diagram'>['panning']>;
type DiagramZooming = NonNullable<ComponentProps<'oj-diagram'>['zooming']>;
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
export const DiagramDefault = () => {
    const [panningValue, setPanningValue] = useState<DiagramPanning>('none');
    const [zoomingValue, setZoomingValue] = useState<DiagramZooming>('none');
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const layoutFunc = layout.circleLayoutWithLayoutArgs(150);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const handlePanningValueValueChanged = (event: JetElementCustomEvent<DiagramPanning>) => {
        setPanningValue(event.detail.value);
    };
    const handleZoomingValueValueChanged = (event: JetElementCustomEvent<DiagramZooming>) => {
        setZoomingValue(event.detail.value);
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(node.data.category),
                width: 50,
                height: 50
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={"Node " + node.data.id + ", Category " + node.data.category} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: LinkTemplateContext) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={"Link " + link.data.id + ", Category " + link.data.category + ", connects " + link.data.start + " to " + link.data.end} color={colorHandler.getValue(link.data.category)} startConnectorType="none" endConnectorType="arrow"/>;
    };
    return (<div id="diagram-container">
            <oj-form-layout aria-controls="diagram1" maxColumns={2}>
                    <demo-radioset-enum direction="row" id="radioButtonset1" labelHint="Panning" enumValues={["none", "auto"]} onvalueChanged={handlePanningValueValueChanged} value={panningValue}/>
                    <demo-radioset-enum id="radioButtonset2" direction="row" labelHint="Zooming" onvalueChanged={handleZoomingValueValueChanged} value={zoomingValue} enumValues={["none", "auto"]}/>
                </oj-form-layout>
            <oj-diagram id="diagram1" animationOnDataChange="auto" panning={panningValue} zooming={zoomingValue} minZoom={.5} maxZoom={2} nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layoutFunc} aria-label="This is a simple diagram that shows how to render Nodes and Links">
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramDefault;
