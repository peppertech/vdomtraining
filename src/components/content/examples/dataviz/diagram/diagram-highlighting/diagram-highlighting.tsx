import "css!./demo.css";
import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import { ojDiagram } from 'ojs/ojdiagram';
import 'ojs/ojformlayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type HighlightedCategories = ComponentProps<'oj-diagram'>['highlightedCategories'];
type HoverBehavior = NonNullable<ComponentProps<'oj-diagram'>['hoverBehavior']>;
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
export const DiagramHighlighting = () => {
    const [highlightedCategoriesValue, setHighlightedCategoriesValue] = useState<HighlightedCategories>(['0']);
    const [hoverBehaviorValue, setHoverBehaviorValue] = useState<HoverBehavior>('dim');
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const styleDefaults = useMemo<NonNullable<ComponentProps<'oj-diagram'>['styleDefaults']>>(() => ({
        nodeDefaults: {
            icon: { width: 70, shape: 'rectangle' }
        },
        linkDefaults: { svgStyle: { vectorEffect: 'none', opacity: '0.4' } }
    }), []);
    const handleHighlightedCategoriesValueHighlightedCategoriesChanged = (event: Parameters<NonNullable<ComponentProps<'oj-diagram'>['onhighlightedCategoriesChanged']>>[0]) => {
        setHighlightedCategoriesValue(event.detail.value);
    };
    const hoverBehaviorValueChange = (event: JetElementCustomEvent<HoverBehavior>) => {
        const value = event.detail.value;
        setHoverBehaviorValue(value);
        if (value === 'none') {
            setHighlightedCategoriesValue(undefined);
        }
    };
    const tooltipFunction = (dataContext: ojDiagram.TooltipContext<string, string, DiagramNodeDatum, DiagramLinkDatum>) => {
        const nodeOrLink = Array.isArray(dataContext.itemData) ? dataContext.itemData[0] : dataContext.itemData;
        return {
            insert: `${nodeOrLink?.id ?? ''}: ${nodeOrLink?.category ?? 'uncategorized'}`
        };
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(String(node.data.category)),
                borderColor: colorHandler.getValue(String(node.data.category)),
                height: 35 + Number(node.data.category) * 8
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={`${node.data.id}: category ${node.data.category}`} categories={[String(node.data.category)]} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: LinkTemplateContext) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={`${link.data.id}: ${link.data.start} to ${link.data.end}`} categories={[String(link.data.category)]} color={colorHandler.getValue(String(link.data.category))} width={2 + Number(link.data.category)}/>;
    };
    const ojDiagramProps: Partial<ComponentProps<'oj-diagram'>> = { tooltip: {
            renderer: tooltipFunction
        } };
    return (<div id="diagram-container">
            <oj-form-layout aria-controls="diagram1">
                    <demo-radioset-enum id="radioButtonset" value={hoverBehaviorValue} direction="row" labelHint="Hover Behavior" onvalueChanged={hoverBehaviorValueChange} enumValues={["none", "dim"]}/>
                </oj-form-layout>
            <oj-diagram id="diagram1" nodeData={nodeDataProvider} linkData={linkDataProvider} highlightMatch="any" onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior={hoverBehaviorValue} layout={layout.circleLayoutWithLayoutArgs(170)} linkHighlightMode="linkAndNodes" nodeHighlightMode="nodeAndLinks" selectionMode="none" styleDefaults={styleDefaults} class="demo-diagram-highlighting-style" {...ojDiagramProps}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramHighlighting;
