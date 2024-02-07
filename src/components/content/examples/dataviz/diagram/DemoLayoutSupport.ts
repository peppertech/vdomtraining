import {
  DvtDiagramLayoutContext,
  DvtDiagramLayoutContextNode,
  DvtDiagramLayoutContextLink,
} from "ojs/ojdiagram";

class DemoLayoutSupport<K1, K2, D1, D2> {
  static getMaxNodeBounds = <K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>,
    excludeLabelBounds?: boolean | null
  ) => {
    const nodeCount: number = layoutContext.getNodeCount();
    let maxW: number = 0;
    let maxH: number = 0;
    for (let ni = 0; ni < nodeCount; ni++) {
      const node: DvtDiagramLayoutContextNode<K1, D1> =
        layoutContext.getNodeByIndex(ni);
      const bounds: {
        x: number;
        y: number;
        w: number;
        h: number;
      } = node.getContentBounds();
      maxW = Math.max(bounds.w, maxW);
      maxH = Math.max(bounds.h, maxH);
      if (!excludeLabelBounds) {
        const labelBounds = node.getLabelBounds();
        if (labelBounds) {
          maxW = Math.max(labelBounds.w, maxW);
          maxH = Math.max(bounds.h + labelBounds.h, maxH);
        }
      }
    }
    return { x: 0, y: 0, w: maxW, h: maxH };
  };

  static centerNodeAndLabel = <K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>,
    node: DvtDiagramLayoutContextNode<K1, D1>,
    x: number,
    y: number
  ) => {
    DemoLayoutSupport.centerNode(node, x, y);
    DemoLayoutSupport.positionNodeLabel(layoutContext, node);
  };

  static centerNode = <K1, D1>(
    node: DvtDiagramLayoutContextNode<K1, D1>,
    x: number,
    y: number
  ) => {
    const bounds = node.getContentBounds();
    node.setPosition({
      x: x - bounds.x - bounds.w * 0.5,
      y: y - bounds.y - bounds.h * 0.5,
    });
  };

  static positionNodeLabels = (layoutContext: any) => {
    for (let ni = 0; ni < layoutContext.getNodeCount(); ni++) {
      const node = layoutContext.getNodeByIndex(ni);
      DemoLayoutSupport.positionNodeLabel(layoutContext, node);
    }
  };

  static positionNodeLabel = <K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>,
    node: DvtDiagramLayoutContextNode<K1, D1>
  ) => {
    const nodeBounds = node.getContentBounds();
    const nodePos = node.getPosition();
    const nodeLabelBounds = node.getLabelBounds();
    if (nodeLabelBounds) {
      //center label below node
      const labelX = nodeBounds.x + nodePos.x + 0.5 * nodeBounds.w;
      const labelY = nodeBounds.y + nodePos.y + nodeBounds.h;
      node.setLabelPosition({ x: labelX, y: labelY });
      node.setLabelHalign("center");
    }
  };

  static getNodeComparator = <K1, D1>(attribute: string) => {
    const comparator = (
      a: DvtDiagramLayoutContextNode<K1, D1> | any,
      b: DvtDiagramLayoutContextNode<K1, D1> | any
    ) => {
      let valA = 0;
      let valB = 0;

      if (a.getData() && a.getData()[attribute]) {
        valA = a.getData()[attribute];
      }
      if (b.getData() && b.getData()[attribute]) {
        valB = b.getData()[attribute];
      }
      return valA > valB
        ? 1
        : valA == valB
        ? a.getId() > b.getId()
          ? 1
          : -1
        : -1;
    };
    return comparator;
  };

  static layoutLinks = <K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>
  ) => {
    for (let li = 0; li < layoutContext.getLinkCount(); li++) {
      let link: DvtDiagramLayoutContextLink<K1, K2, D2> =
        layoutContext.getLinkByIndex(li);
      const endpoints: {
        x: number;
        y: number;
      }[] = DemoLayoutSupport.getEndpoints(layoutContext, link);

      const startX = endpoints[0].x;
      const startY = endpoints[0].y;
      const endX = endpoints[1].x;
      const endY = endpoints[1].y;
      link.setPoints([startX, startY, endX, endY]);
      //center label on link
      const labelBounds = link.getLabelBounds();
      if (labelBounds) {
        const labelX = startX + 0.5 * (endX - startX);
        const labelY = startY + 0.5 * (endY - startY - labelBounds.h);
        link.setLabelPosition({ x: labelX, y: labelY });
        link.setLabelHalign("center");
      }
    }
  };

  static getEndpoints = <K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>,
    link: DvtDiagramLayoutContextLink<K1, K2, D2>
  ) => {
    const layoutAttrs: any = link.getData();
    //support for laying out links to connect at the edges of node
    //bounding boxes instead of at the centers
    let bLinkToBounds = true;
    if (layoutAttrs) {
      bLinkToBounds = layoutAttrs["linkToBounds"] !== "false";
    }
    const n1 = layoutContext.getNodeById(link.getStartId());
    const n2 = layoutContext.getNodeById(link.getEndId());

    const n1Position = n1.getPosition();
    const n2Position = n2.getPosition();

    let b1 = n1.getContentBounds();
    let b2 = n2.getContentBounds();

    let startX = n1Position.x + b1.x + 0.5 * b1.w;
    let startY = n1Position.y + b1.y + 0.5 * b1.h;
    let endX = n2Position.x + b2.x + 0.5 * b2.w;
    let endY = n2Position.y + b2.y + 0.5 * b2.h;

    //support for laying out links to connect at the edges of node
    //bounding boxes instead of at the centers
    if (bLinkToBounds) {
      b1 = { x: n1Position.x + b1.x, y: n1Position.y + b1.y, w: b1.w, h: b1.h };
      b2 = { x: n2Position.x + b2.x, y: n2Position.y + b2.y, w: b2.w, h: b2.h };

      const startP = DemoLayoutSupport._intersectRect(
        b1,
        startX,
        startY,
        endX,
        endY,
        link.getStartConnectorOffset()
      );
      const endP = DemoLayoutSupport._intersectRect(
        b2,
        endX,
        endY,
        startX,
        startY,
        link.getEndConnectorOffset()
      );
      startX = startP.x;
      startY = startP.y;
      endX = endP.x;
      endY = endP.y;
    }

    const endpoints = [];
    endpoints.push({ x: startX, y: startY });
    endpoints.push({ x: endX, y: endY });

    return endpoints;
  };

  static _intersectRect = (
    rect: any,
    startX: any,
    startY: any,
    endX: any,
    endY: any,
    connOffset: any
  ) => {
    const SIDE_TOP = 0;
    const SIDE_RIGHT = 1;
    const SIDE_BOTTOM = 2;
    const SIDE_LEFT = 3;

    const halfRectW = 0.5 * rect.w;
    const halfRectH = 0.5 * rect.h;
    const cornerAngle = Math.atan2(halfRectH, halfRectW);

    const topRightAngle = cornerAngle;
    const topLeftAngle = Math.PI - cornerAngle;
    const bottomRightAngle = -topRightAngle;
    const bottomLeftAngle = -topLeftAngle;

    const lineAngle = Math.atan2(endY - startY, endX - startX);
    let side: number = 0;
    if (lineAngle <= topRightAngle && lineAngle >= bottomRightAngle) {
      side = SIDE_RIGHT;
    } else if (lineAngle <= topLeftAngle && lineAngle >= topRightAngle) {
      side = SIDE_TOP;
    } else if (lineAngle >= bottomLeftAngle && lineAngle <= bottomRightAngle) {
      side = SIDE_BOTTOM;
    } else {
      side = SIDE_LEFT;
    }

    let x;
    let y;
    const tanAngle = (endY - startY) / (endX - startX);
    switch (side) {
      case SIDE_RIGHT:
        x = rect.x + rect.w;
        y = tanAngle * halfRectW + halfRectH + rect.y;
        break;
      case SIDE_LEFT:
        x = rect.x;
        y = tanAngle * -halfRectW + halfRectH + rect.y;
        break;
      case SIDE_TOP:
        y = rect.y + rect.h;
        if (endX === startX) {
          x = startX;
        } else {
          x = halfRectH / tanAngle + halfRectW + rect.x;
        }
        break;
      case SIDE_BOTTOM:
        y = rect.y;
        if (endX === startX) {
          x = startX;
        } else {
          x = -halfRectH / tanAngle + halfRectW + rect.x;
        }
        break;
    }
    if (connOffset) {
      x += Math.cos(lineAngle) * connOffset;
      y += Math.sin(lineAngle) * connOffset;
    }
    return { x: x, y: y };
  };
}

export = DemoLayoutSupport;
