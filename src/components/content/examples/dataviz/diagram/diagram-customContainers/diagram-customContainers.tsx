// @ts-nocheck
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/containersData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import 'ojs/ojdiagram';
import { ojDiagram } from 'ojs/ojdiagram';
import { KeySetImpl } from 'ojs/ojkeyset';
import * as layout from '../diagram-layouts';
import "css!./demo.css";
interface ContainerNode {
    id: string;
    nodes?: ContainerNode[];
}
interface ContainerLink {
    id: string;
    startNode: string;
    endNode: string;
}
interface ContainerData {
    nodes: ContainerNode[];
    links: ContainerLink[];
}
type DiagramLayout = ComponentProps<'oj-diagram'>['layout'];
type DiagramNodeTemplateContext = {
    data: ContainerNode;
};
type DiagramLinkTemplateContext = {
    data: ContainerLink;
};
const jsonData = JSON.parse(jsonDataText as string) as ContainerData;
export const DiagramCustomContainers = () => {
    const data = jsonData;
    const nodeDataProvider = useMemo(() => new ArrayTreeDataProvider<string, ContainerNode>(data.nodes, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider<ContainerLink['id'], ContainerLink>(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const expandedNodes = useMemo(() => new KeySetImpl(['N0', 'N00']), []);
    const layoutFunc = layout.containerLayout as DiagramLayout;
    const linkRendererFunc = (context: ojDiagram.LinkRendererContext<string, string, {
        id: string;
        start: string;
        end: string;
    }>) => {
        let rootElement = context.rootElement;
        const width = context.state.hovered || context.state.selected ? '2' : '1';
        if (!rootElement) {
            const linkid = context.type === 'promotedLink'
                ? `${((context.id as unknown) as Record<string, string>).name}${((context.id as unknown) as Record<string, string>).startId}${((context.id as unknown) as Record<string, string>).endId}`
                : String(context.id);
            rootElement = createGroup('linkSvg' + linkid);
            addPath(rootElement, '10', context.state.selected, 'underlay', context.points);
            addPath(rootElement, width, context.state.selected, context.type);
        }
        else {
            const visiblePath = rootElement.children[1];
            visiblePath.setAttribute('stroke-width', width);
            visiblePath.classList.toggle('demo-diagram-selected-link', context.state.selected);
        }
        return { insert: rootElement };
    };
    const nodeRendererFunc = (context: ojDiagram.RendererContext<string, ContainerNode>) => {
        const color = context.state.selected ? 'red' : '#87ceeb';
        const stroke = context.state.selected || context.state.hovered ? 3 : 1;
        let rootElement = context.rootElement;
        if (!rootElement) {
            // initial rendering - create an svg element with a node content in it
            const nodeId = context.data['id'];
            if (context.state.expanded) {
                //render expanded node
                const childContent = context.content;
                // add 20 px for the each side padding and
                // additional 20 px on top for the header
                let width = childContent.width + 40;
                let height = childContent.height + 60;
                rootElement = createSVG('nodeSvg' + nodeId, String(width), String(height));
                const group = addGroup(rootElement, 'topGroup' + nodeId);
                width -= 2;
                height -= 2;
                addRect(group, 'rect' + nodeId, '1', '1', String(width), String(height), '#FFFFFF');
                addRect(group, 'rectHdr' + nodeId, '1', '1', String(width), '20', color);
                addChildContent(group, childContent.element);
            }
            else {
                //render collapsed or leaf node
                rootElement = createSVG('nodeSvg' + nodeId, '200', '200');
                const group = addGroup(rootElement, 'topGroup' + nodeId);
                addRect(group, 'rectOuter' + nodeId, '1', '1', '98', '49', 'white');
                addRect(group, 'rectInner' + nodeId, '10', '10', '78', '29', '#68C182');
            }
        }
        else {
            // modification case - apply custom treatment to the node
            const group = rootElement.childNodes[0] as SVGGElement;
            const outerRect = group.childNodes[0] as SVGElement;
            outerRect.setAttributeNS(null, 'stroke', color);
            outerRect.setAttributeNS(null, 'stroke-width', String(stroke));
            if (context.state.expanded) {
                //change header color for the container node
                const hdrRect = group.childNodes[1] as SVGElement;
                hdrRect.setAttributeNS(null, 'stroke', color);
                hdrRect.setAttributeNS(null, 'fill', color);
            }
        }
        return { insert: rootElement };
    };
    const createSVG = (id: string, width: string, height: string) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, 'width', width);
        svg.setAttributeNS(null, 'height', height);
        svg.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height);
        return svg;
    };
    const addGroup = (parent: Element, id: string) => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttributeNS(null, 'id', id);
        parent.appendChild(group);
        return group;
    };
    const addRect = (parent: Element, id: string, x: string, y: string, w: string, h: string, fill: string) => {
        const svgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        svgRect.setAttributeNS(null, 'id', id);
        svgRect.setAttributeNS(null, 'x', x);
        svgRect.setAttributeNS(null, 'y', y);
        svgRect.setAttributeNS(null, 'width', w);
        svgRect.setAttributeNS(null, 'height', h);
        svgRect.setAttributeNS(null, 'fill', fill);
        svgRect.setAttributeNS(null, 'stroke', '#87ceeb');
        svgRect.setAttributeNS(null, 'stroke-width', '1');
        parent.appendChild(svgRect);
        return svgRect;
    };
    const addChildContent = (parent: Element, elem: Element) => {
        parent.appendChild(elem);
        elem.setAttributeNS(null, 'transform', 'translate(20 40)');
    };
    const createGroup = (id: string) => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('id', id);
        return group;
    };
    const addPath = (parent: Element, width: string, selected: boolean, type: string, points?: number[][] | string) => {
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let linkSvgClasses = type === 'underlay' ? 'demoDiagramLinkUnderlay' : 'demo-diagram-link oj-diagram-link-path';
        if (type === 'underlay') {
            const pointList = Array.isArray(points) ? (points as unknown as Array<number | string>) : String(points).split(' ');
            svgPath.setAttribute('d', pointList.join(' '));
        }
        else {
            if (type === 'promotedLink')
                linkSvgClasses += ' demo-diagram-promoted-link';
            if (selected)
                linkSvgClasses += ' demo-diagram-selected-link';
        }
        svgPath.setAttribute('stroke-width', width);
        svgPath.setAttribute('class', linkSvgClasses);
        parent.appendChild(svgPath);
    };
    const getStyleUrl = (styleId: string) => {
        return 'url(' + document.URL + '#' + styleId + ')';
    };
    const nodeTemplateRenderer = (node: DiagramNodeTemplateContext) => {
        return <oj-diagram-node label={node.data.id} shortDesc={"Node " + node.data.id}/>;
    };
    const linkTemplateRenderer = (link: DiagramLinkTemplateContext) => {
        return <oj-diagram-link startNode={link.data.startNode} endNode={link.data.endNode} shortDesc={"Link " + link.data.id + " connects " + link.data.startNode + " to " + link.data.endNode}/>;
    };
    const ojDiagramProps: Partial<ComponentProps<'oj-diagram'>> = { nodeContent: {
            renderer: nodeRendererFunc,
            selectionRenderer: nodeRendererFunc,
            hoverRenderer: nodeRendererFunc
        }, linkContent: {
            renderer: linkRendererFunc,
            selectionRenderer: linkRendererFunc,
            hoverRenderer: linkRendererFunc
        } };
    return (<>
          <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
                <defs>
                        <marker id="endMarker" viewBox="0 0 5 5" refX="5" refY="2.5" markerWidth="5" markerHeight="5" markerUnits="userSpaceOnUse" orient="auto"><path d="M 0 0 L 5 2.5 L 0 5 z" fill="#68C182"/></marker>
                    </defs>
                <defs>
                        <marker id="endMarkerSelected" viewBox="0 0 5 5" refX="5" refY="2.5" markerWidth="7" markerHeight="7" markerUnits="userSpaceOnUse" orient="auto"><path d="M 0 0 L 5 2.5 L 0 5 z" fill="red"/></marker>
                    </defs>
            </svg>
          <oj-diagram id="diagram-container" animationOnDataChange="auto" animationOnDisplay="auto" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layoutFunc} maxZoom={2.0} promotedLinkBehavior="full" selectionMode="multiple" expanded={expandedNodes} {...ojDiagramProps}>
                <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                <template slot="linkTemplate" render={linkTemplateRenderer}/>
            </oj-diagram>
      </>);
};
export default DiagramCustomContainers;
