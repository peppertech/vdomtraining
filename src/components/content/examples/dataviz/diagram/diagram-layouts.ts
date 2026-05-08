/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DvtDiagramLayoutContext, DvtDiagramLayoutContextNode } from 'ojs/ojdiagram';

type DiagramNodeData = {
    id?: string;
    [key: string]: any;
};

type DiagramLinkData = {
    start?: string;
    end?: string;
    startNode?: string;
    endNode?: string;
    [key: string]: any;
};

type DiagramContext = DvtDiagramLayoutContext<string, string, DiagramNodeData, DiagramLinkData>;
type DiagramNodeContext = DvtDiagramLayoutContextNode<string, DiagramNodeData>;

type Bounds = {
    x: number;
    y: number;
    w: number;
    h: number;
};

const emptyBounds: Bounds = { x: 0, y: 0, w: 0, h: 0 };

const getBounds = (node: DiagramNodeContext): Bounds => {
    return node.getBounds() ?? node.getContentBounds() ?? emptyBounds;
};

const getChildNodes = (node: DiagramNodeContext): DiagramNodeContext[] => {
    return node.getChildNodes?.() ?? [];
};

const setNodeCenter = (node: DiagramNodeContext, x: number, y: number) => {
    const bounds = getBounds(node);
    node.setPosition({
        x: x - bounds.x - bounds.w / 2,
        y: y - bounds.y - bounds.h / 2
    });
};

const getNodeCenter = (node: DiagramNodeContext, containerId: string | null) => {
    const position = node.getRelativePosition(containerId as string) ?? node.getPosition();
    if (!position) {
        return null;
    }

    const bounds = getBounds(node);
    return {
        x: position.x + bounds.x + bounds.w / 2,
        y: position.y + bounds.y + bounds.h / 2
    };
};

const updateLinks = (context: DiagramContext) => {
    for (let index = 0; index < context.getLinkCount(); index++) {
        const link = context.getLinkByIndex(index);
        const startNode = context.getNodeById(link.getStartId());
        const endNode = context.getNodeById(link.getEndId());
        if (!startNode || !endNode) {
            continue;
        }

        const coordinateSpace = context.getCommonContainer(link.getStartId(), link.getEndId());
        const start = getNodeCenter(startNode, coordinateSpace);
        const end = getNodeCenter(endNode, coordinateSpace);
        if (!start || !end) {
            continue;
        }

        link.setCoordinateSpace(coordinateSpace as string);
        link.setPoints([start.x, start.y, end.x, end.y]);
    }
};

const getDiagramCenter = (context: DiagramContext) => {
    const size = context.getComponentSize();
    return {
        x: size.w / 2,
        y: size.h / 2
    };
};

const circleLayout = (context: DiagramContext, radius: number, clockwise = true) => {
    const count = context.getNodeCount();
    const center = getDiagramCenter(context);
    const step = count > 0 ? (Math.PI * 2) / count : 0;

    for (let index = 0; index < count; index++) {
        const node = context.getNodeByIndex(index);
        const angle = clockwise ? index * step : -index * step;
        layoutChildNodes(node);
        setNodeCenter(node, center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius);
    }

    updateLinks(context);
};

const positionNodeLabelBelowIcon = (node: DiagramNodeContext, labelGap = 8) => {
    const position = node.getPosition();
    if (!position) {
        return;
    }

    const bounds = getBounds(node);
    const labelBounds = node.getLabelBounds();

    if (!labelBounds) {
        return;
    }

    node.setLabelHalign('center');
    node.setLabelValign('top');
    node.setLabelPosition({
        x: position.x + bounds.w / 2 - labelBounds.w / 2,
        y: position.y + bounds.h + labelGap
    });
};

const layoutChildNodes = (node: DiagramNodeContext) => {
    const children = getChildNodes(node);
    if (!children.length) {
        return;
    }

    const columns = Math.ceil(Math.sqrt(children.length));
    const horizontalGap = 140;
    const verticalGap = 90;
    const startX = 50;
    const startY = 35;

    for (let index = 0; index < children.length; index++) {
        const childNode = children[index];
        const column = index % columns;
        const row = Math.floor(index / columns);

        layoutChildNodes(childNode);
        setNodeCenter(childNode, startX + column * horizontalGap, startY + row * verticalGap);
    }
};

export const gridLayout = (context: DiagramContext, columns = 3, horizontalGap = 180, verticalGap = 120) => {
    const count = context.getNodeCount();
    const center = getDiagramCenter(context);
    const startX = center.x - ((Math.max(columns, 1) - 1) * horizontalGap) / 2;
    const startY = 60;

    for (let index = 0; index < count; index++) {
        const node = context.getNodeByIndex(index);
        const column = index % columns;
        const row = Math.floor(index / columns);

        layoutChildNodes(node);
        setNodeCenter(node, startX + column * horizontalGap, startY + row * verticalGap);
    }

    updateLinks(context);
};

export const circleLayoutWithLayoutArgs = (radius: number) => {
    return (context: DiagramContext) => {
        circleLayout(context, radius);
    };
};

export const circleLayoutWithLabelsBelow = (radius: number, labelGap = 8) => {
    return (context: DiagramContext) => {
        circleLayout(context, radius);

        for (let index = 0; index < context.getNodeCount(); index++) {
            positionNodeLabelBelowIcon(context.getNodeByIndex(index), labelGap);
        }
    };
};

export const forceDirectedLayout = (context: DiagramContext) => {
    circleLayout(context, 180);
};

export const containerLayout = (context: DiagramContext) => {
    gridLayout(context, 2, 240, 160);
};

export const layout = (delay: number, clockwise: boolean) => {
    return (context: DiagramContext) => {
        const radius = Math.max(120, 120 + Math.floor(delay / 20));
        circleLayout(context, radius, clockwise);
    };
};
