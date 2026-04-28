import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/containersData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
interface ContainerNode {
    id: string;
    nodes?: ContainerNode[];
}
interface ContainerLink {
    id: string;
    startNode: string;
    endNode: string;
}
interface ContainerDiagramData {
    nodes: ContainerNode[];
    links: ContainerLink[];
}
type DiagramLayout = ComponentProps<'oj-diagram'>['layout'];
const jsonData = JSON.parse(jsonDataText as string) as ContainerDiagramData;
export const DiagramContainers = () => {
    const data = jsonData;
    const nodeDataProvider = useMemo(() => new ArrayTreeDataProvider(data.nodes, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const expandedNodes = useMemo(() => new KeySetImpl(['N0', 'N00']), []);
    const layoutFunc: DiagramLayout = layout.containerLayout;
    const nodeTemplateRenderer = (node: any) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                width: 70,
                height: 30,
                shape: "rectangle",
                color: "#f9f9f9",
                borderRadius: "1px",
                borderWidth: 0.5,
                borderColor: "#444444"
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={"Node " + node.data.id} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: any) => {
        return <oj-diagram-link startNode={link.data.startNode} endNode={link.data.endNode} startConnectorType="circle" endConnectorType="arrow" shortDesc={"Link " + link.data.id + " connects " + link.data.startNode + " to " + link.data.endNode}/>;
    };
    return (<oj-diagram id="diagram-container" animationOnDataChange="auto" animationOnDisplay="auto" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layoutFunc} maxZoom={2.0} promotedLinkBehavior="full" expanded={expandedNodes}>
            <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
            <template slot="linkTemplate" render={linkTemplateRenderer}/>
        </oj-diagram>);
};
export default DiagramContainers;
