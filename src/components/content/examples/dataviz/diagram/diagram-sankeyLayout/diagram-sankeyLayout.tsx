import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
import "css!./demo.css";
export const DiagramSankeyLayout = () => {
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const nodes = useMemo(() => [
        { id: 'Gold', category: 'award' },
        { id: 'Silver', category: 'award' },
        { id: 'Bronze', category: 'award' },
        { id: 'Canada', category: 'country' },
        { id: 'USA', category: 'country' },
        { id: 'Norway', category: 'country' }
    ], []);
    const links = useMemo(() => [
        { id: 'L0', start: 'Gold', end: 'Canada', items: 4 },
        { id: 'L1', start: 'Silver', end: 'USA', items: 3 },
        { id: 'L2', start: 'Bronze', end: 'Norway', items: 2 }
    ], []);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(nodes, {
        keyAttributes: 'id'
    }), [nodes]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(links, {
        keyAttributes: 'id'
    }), [links]);
    const styleDefaults = useMemo<NonNullable<ComponentProps<'oj-diagram'>['styleDefaults']>>(() => ({
        nodeDefaults: {
            labelStyle: { fontSize: '18px', fontWeight: 'bold' },
            icon: { width: 70, shape: 'rectangle' }
        },
        linkDefaults: {
            svgStyle: { strokeOpacity: '0.5', vectorEffect: 'none' }
        }
    }), []);
    const nodeTemplateRenderer = (node: DatavizTemplateContext<DatavizChartDatum>) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(node.data.category),
                height: node.data.category === 'award' ? 90 : 54
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={node.data.id} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} width={Number(link.data.items) * 3} shortDesc={`${link.data.items} medals from ${link.data.start} to ${link.data.end}`} color={colorHandler.getValue(link.data.start)}/>;
    };
    return (<div id="diagram-container">
            <oj-diagram id="diagram1" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.containerLayout} styleDefaults={styleDefaults} class="demo-diagram-sankeylayout-height-style">
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramSankeyLayout;
