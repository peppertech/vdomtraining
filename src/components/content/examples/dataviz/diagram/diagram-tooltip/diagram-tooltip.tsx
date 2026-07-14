import "css!./demo.css";
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface DiagramNode {
    id: string;
    category: string;
    label?: string;
    details?: unknown[];
}
interface DiagramLink {
    id: string;
    category: string;
    start: string;
    end: string;
    details?: unknown[];
}
interface DiagramData {
    nodes: DiagramNode[];
    links: DiagramLink[];
}
type TooltipItem = DiagramNode | DiagramLink;
type DiagramTooltipContext = {
    itemData: TooltipItem | TooltipItem[];
};
type NodeTemplateContext = {
    data: DiagramNode;
};
type LinkTemplateContext = {
    data: DiagramLink;
};
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramTooltip = () => {
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider<DiagramNode['id'], DiagramNode>(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider<DiagramLink['id'], DiagramLink>(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const styleDefaults = useMemo<NonNullable<ComponentProps<'oj-diagram'>['styleDefaults']>>(() => ({
        nodeDefaults: {
            icon: { width: 70, shape: 'rectangle' }
        },
        labelStyle: { fontSize: '14px' },
        linkDefaults: { svgStyle: { vectorEffect: 'none', opacity: '0.4' } }
    }), []);
    const tooltipFunction = (dataContext: DiagramTooltipContext) => {
        const item = Array.isArray(dataContext.itemData) ? dataContext.itemData[0] : dataContext.itemData;
        if (!item) {
            return { insert: '' };
        }
        const label = 'start' in item ? `${item.start} -> ${item.end}` : (item.label ?? item.id);
        const category = item.category ?? 'uncategorized';
        const details = item.details ? ` (${item.details.length} details)` : '';
        return { insert: `${label}: ${category}${details}` };
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(node.data.category),
                borderColor: colorHandler.getValue(node.data.category),
                height: 45
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={`Node ${node.data.id}`} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: LinkTemplateContext) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={`Link ${link.data.id}`} color={colorHandler.getValue(link.data.category)} width={3}/>;
    };
    const ojDiagramProps: Partial<ComponentProps<'oj-diagram'>> = { tooltip: {
            renderer: tooltipFunction
        } };
    return (<div id="diagram-container">
            <oj-diagram id="diagram1" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.circleLayoutWithLayoutArgs(170)} selectionMode="none" styleDefaults={styleDefaults} class="demo-diagram-tooltip-height-style" {...ojDiagramProps}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramTooltip;
