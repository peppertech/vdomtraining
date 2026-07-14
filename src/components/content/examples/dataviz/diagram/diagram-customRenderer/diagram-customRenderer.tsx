import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import { ojDiagram } from 'ojs/ojdiagram';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface DiagramNodeData {
    id: string;
    category: string;
}
interface DiagramLinkData {
    id: string;
    category: string;
    start: string;
    end: string;
}
interface DiagramData {
    nodes: DiagramNodeData[];
    links: DiagramLinkData[];
}
type DiagramLayout = ComponentProps<'oj-diagram'>['layout'];
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramCustomRenderer = () => {
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const layoutFunc: DiagramLayout = layout.circleLayoutWithLayoutArgs(350);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const styleDefaults = useMemo<NonNullable<ComponentProps<'oj-diagram'>['styleDefaults']>>(() => ({
        linkDefaults: {
            startConnectorType: 'none' as const,
            endConnectorType: 'arrow' as const
        }
    }), []);
    const nodeTextColorFunc = (nodeId: string) => {
        return nodeId === 'N6' ? { color: '#FFFFFF' } : undefined;
    };
    const nodeRendererFunc = (context: ojDiagram.RendererContext<string, {
        id: string;
        category: string;
        start: string;
        end: string;
    }>) => {
        const color = colorHandler.getValue(context.itemData.category);
        let rootElement = context.rootElement;
        if (!rootElement) {
            // initial rendering - create an svg element with a node content in it
            const nodeId = context.data.id;
            rootElement = createSVG();
            const group = addGroup(rootElement, 'topGroup' + nodeId);
            addRect(group, 'rect' + nodeId);
            addPath(group, color, 'M50,50 h-37 a37,37 0 1,0 37,-37 z');
            addPath(group, 'yellow', 'M45,45 v-37 a37,37 0 0,0 -37,37 z');
            addCircle(group, color, '10');
        }
        return {
            insert: rootElement as SVGElement
        };
    };
    const hoverRenderer = (context: ojDiagram.RendererContext<string, {
        id: string;
        category: string;
        start: string;
        end: string;
    }>) => {
        const radius = context.state.hovered ? '20' : '10';
        const rootElement = context.rootElement;
        if (rootElement) {
            const group = rootElement.childNodes[0];
            const circle = group.childNodes[3];
            (circle as SVGElement).setAttribute('r', radius);
        }
    };
    const selectRenderer = (context: ojDiagram.RendererContext<string, {
        id: string;
        category: string;
        start: string;
        end: string;
    }>) => {
        const color = context.state.selected
            ? 'red'
            : colorHandler.getValue(context.itemData.category);
        const rootElement = context.rootElement;
        if (rootElement) {
            const group = rootElement.childNodes[0];
            const circle = group.childNodes[3];
            (circle as SVGElement).setAttribute('fill', color);
        }
    };
    const linkRendererFunc = (context: ojDiagram.LinkRendererContext<string, string, {
        id: string;
        category: string;
        start: string;
        end: string;
    }>) => {
        const color = colorHandler.getValue((context.itemData as {
            id: string;
            category: string;
            start: string;
            end: string;
        }).category);
        const strokeColor = context.state.selected ? 'red' : color;
        const strokeWidth = context.state.hovered ? '5' : context.state.selected ? '3' : '1';
        let rootElement = context.rootElement;
        if (!rootElement) {
            // create top group element
            rootElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            // create transparent underlay for better interaction
            addLinkPath(rootElement, '#00000000', '#00000000', '5', getPathFromPoints(context.points));
            // create visible path
            addLinkPath(rootElement, strokeColor, color, strokeWidth, getPathFromPoints(context.points));
        }
        else {
            // update link path based on the current state
            const linkPath = rootElement.childNodes[1];
            (linkPath as SVGElement).setAttribute('stroke-width', strokeWidth);
            (linkPath as SVGElement).setAttribute('stroke', strokeColor);
            (linkPath as SVGElement).setAttribute('fill', strokeColor);
        }
        return {
            insert: rootElement as SVGElement
        };
    };
    const addLinkPath = (parent: Element, stroke: string, fill: string, width: string, path: string) => {
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('stroke-width', width);
        svgPath.setAttribute('stroke', stroke);
        svgPath.setAttribute('d', path);
        svgPath.setAttribute('fill', fill);
        svgPath.setAttribute('vector-effect', 'non-scaling-stroke');
        parent.appendChild(svgPath);
    };
    const createSVG = (): SVGSVGElement => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
        svg.setAttribute('width', '200');
        svg.setAttribute('height', '200');
        svg.setAttribute('viewBox', '0 0 200 200');
        return svg;
    };
    const addGroup = (parent: Element, id: string) => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('id', id);
        parent.appendChild(group);
        return group;
    };
    const addPath = (parent: Element, fill: string, path: string) => {
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', path);
        svgPath.setAttribute('fill', fill);
        svgPath.setAttribute('stroke', '#aaaaaa');
        svgPath.setAttribute('stroke-width', '1');
        parent.appendChild(svgPath);
    };
    const addCircle = (parent: Element, color: string, radius: string) => {
        const svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        svgCircle.setAttribute('cx', '99');
        svgCircle.setAttribute('cy', '99');
        svgCircle.setAttribute('fill', color);
        svgCircle.setAttribute('stroke', '#aaaaaa');
        svgCircle.setAttribute('stroke-width', '1');
        svgCircle.setAttribute('r', radius);
        parent.appendChild(svgCircle);
    };
    const addRect = (parent: Element, id: string) => {
        const svgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        svgRect.setAttribute('id', id);
        svgRect.setAttribute('x', '1');
        svgRect.setAttribute('y', '1');
        svgRect.setAttribute('width', '98');
        svgRect.setAttribute('height', '98');
        svgRect.setAttribute('fill', 'white');
        svgRect.setAttribute('stroke', '#aaaaaa');
        svgRect.setAttribute('stroke-width', '1');
        parent.appendChild(svgRect);
    };
    const getPathFromPoints = (points: string | number[]) => {
        const startX = (points as number[])[0], endX = (points as number[])[2], startY = (points as number[])[1], endY = (points as number[])[3];
        const isHorizontal = Math.abs(endX - startX) > Math.abs(endY - startY) ? true : false;
        const startToEndPoints = isHorizontal
            ? partialPath(isHorizontal, startX, startY - 10, endX, endY) : partialPath(isHorizontal, startX - 10, startY, endX, endY);
        const endToStartPoints = isHorizontal
            ? partialPath(isHorizontal, endX, endY, startX, startY + 10) : partialPath(isHorizontal, endX, endY, startX + 10, startY);
        return (['M'] as Array<string | number>)
            .concat(startToEndPoints)
            .concat(['L'])
            .concat(endToStartPoints)
            .concat(['Z'])
            .join(' ');
    };
    const partialPath = (isHorizontal: boolean, startX: number, startY: number, endX: number, endY: number) => {
        const xStep = (endX - startX) / 3;
        const yStep = (endY - startY) / 3;
        // calculate control points for the cubic Bézier commands
        let c1X, c1Y, c2X, c2Y;
        if (isHorizontal) {
            c1X = startX + xStep;
            c2X = c1X + xStep;
            c1Y = startY;
            c2Y = endY;
        }
        else {
            c1Y = startY + yStep;
            c2Y = c1Y + yStep;
            c1X = startX;
            c2X = endX;
        }
        return [startX, startY, 'C', c1X, c1Y, c2X, c2Y, endX, endY];
    };
    const nodeTemplateRenderer = (node: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-diagram-node label={node.data.id} labelStyle={nodeTextColorFunc(node.data.id)} shortDesc={"Node " + node.data.id + ", Category " + node.data.category}/>;
    };
    const linkTemplateRenderer = (link: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={"Link " + link.data.id + ", Category " + link.data.category + ", connects " + link.data.start + " to " + link.data.end} color={colorHandler.getValue(link.data.category)}/>;
    };
    const ojDiagramProps: Partial<ComponentProps<'oj-diagram'>> = { nodeContent: {
            renderer: nodeRendererFunc,
            hoverRenderer: hoverRenderer,
            selectionRenderer: selectRenderer
        }, linkContent: {
            renderer: linkRendererFunc,
            selectionRenderer: linkRendererFunc,
            hoverRenderer: linkRendererFunc
        } };
    return (<oj-diagram id="diagram-container" animationOnDataChange="auto" layout={layoutFunc} nodeData={nodeDataProvider} linkData={linkDataProvider} selectionMode="multiple" panning="auto" zooming="auto" styleDefaults={styleDefaults} {...ojDiagramProps}>
            <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
            <template slot="linkTemplate" render={linkTemplateRenderer}/>
        </oj-diagram>);
};
export default DiagramCustomRenderer;
