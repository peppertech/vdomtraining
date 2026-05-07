/* eslint-disable @typescript-eslint/no-explicit-any */
import { DvtDiagramLayoutContext } from 'ojs/ojdiagram';

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

const getNodeCenter = (node: any) => {
    const position = node.getPosition();
    const bounds = node.getBounds();
    return {
        x: position.x + bounds.w / 2,
        y: position.y + bounds.h / 2
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
        const start = getNodeCenter(startNode);
        const end = getNodeCenter(endNode);
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
        const bounds = node.getBounds();
        const angle = clockwise ? index * step : -index * step;
        node.setPosition({
            x: center.x + Math.cos(angle) * radius - bounds.w / 2,
            y: center.y + Math.sin(angle) * radius - bounds.h / 2
        });
    }

    updateLinks(context);
};

const positionNodeLabelBelowIcon = (node: any, labelGap = 8) => {
    const position = node.getPosition();
    const bounds = node.getBounds();
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

export const gridLayout = (context: DiagramContext, columns = 3, horizontalGap = 180, verticalGap = 120) => {
    const count = context.getNodeCount();
    const center = getDiagramCenter(context);
    const startX = center.x - ((Math.max(columns, 1) - 1) * horizontalGap) / 2;
    const startY = 60;

    for (let index = 0; index < count; index++) {
        const node = context.getNodeByIndex(index);
        const bounds = node.getBounds();
        const column = index % columns;
        const row = Math.floor(index / columns);
        node.setPosition({
            x: startX + column * horizontalGap - bounds.w / 2,
            y: startY + row * verticalGap - bounds.h / 2
        });
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
