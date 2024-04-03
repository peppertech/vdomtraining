import support = require("./DemoLayoutSupport");
import {
  DvtDiagramLayoutContext,
  DvtDiagramLayoutContextLink,
} from "ojs/ojdiagram";

class DemoContainerLayout {
  /**
   * Main function that performs container layout (Layout entry point)
   * Top level nodes are positioned horizontally. Nodes inside containers are positioned vertically.
   * @param {DvtDiagramLayoutContext} layoutContext object that defines a context for layout call
   */
  static containerLayout<K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>
  ) {
    const nodeCount = layoutContext.getNodeCount();
    let currX = 0;
    for (let ni = 0; ni < nodeCount; ni++) {
      const node = layoutContext.getNodeByIndex(ni);
      if (node.isDisclosed() && node.getChildNodes()) {
        DemoContainerLayout._layoutVertical(
          layoutContext,
          node.getChildNodes()
        );
      }
      const bounds = node.getContentBounds();
      node.setPosition({ x: currX, y: -bounds.y - bounds.h * 0.5 });
      DemoContainerLayout._positionLabel(node);
      currX += bounds.w + 50;
    }
    //position the links
    const linkCount = layoutContext.getLinkCount();
    for (let i = 0; i < linkCount; i++) {
      DemoContainerLayout._createLink(
        layoutContext,
        layoutContext.getLinkByIndex(i)
      );
    }
  }
  /**
   * Layout child nodes vertically
   * @param {DvtDiagramLayoutContext} layoutContext layout context
   * @param {array} nodes nodes array
   */
  static _layoutVertical<K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>,
    nodes: any
  ) {
    const padding = 20;
    let currX = 0;
    let currY = 0;
    const nodeCount = nodes.length;
    for (let ni = 0; ni < nodeCount; ni++) {
      const node = nodes[ni];
      if (node.isDisclosed() && node.getChildNodes()) {
        DemoContainerLayout._layoutVertical(
          layoutContext,
          node.getChildNodes()
        );
      }
      const bounds = node.getContentBounds();
      node.setPosition({ x: currX - bounds.x - bounds.w * 0.5, y: currY });
      DemoContainerLayout._positionLabel(node);
      currY += bounds.h + padding;
    }
  }
  /**
   * Helper function creates a curved link between nodes
   * @param {DvtDiagramLayoutContext} layoutContext Object that defines a context for layout call
   * @param {DvtDiagramLayoutContextLink} link Link object
   */
  static _createLink<K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>,
    link: DvtDiagramLayoutContextLink<K1, K2, D2>
  ) {
    const startId = link.getStartId();
    const endId = link.getEndId();
    const node1 = layoutContext.getNodeById(startId);
    const node2 = layoutContext.getNodeById(endId);
    const commonContainerId = layoutContext.getCommonContainer(
      startId,
      endId
    ) as K1;
    const n1Position = node1.getRelativePosition(commonContainerId);
    const n2Position = node2.getRelativePosition(commonContainerId);
    link.setCoordinateSpace(commonContainerId);
    const n1Bounds = node1.getBounds();
    const n2Bounds = node2.getBounds();
    let startX, startY, endX, endY;
    //find centers
    const cn1X = n1Position.x + 0.5 * n1Bounds.w;
    const cn2X = n2Position.x + 0.5 * n2Bounds.w;
    if (Math.abs(cn1X - cn2X) < 10) {
      //vertical nodes
      const cn1Y = 0.5 * (n1Position.y + n1Bounds.h);
      const cn2Y = 0.5 * (n2Position.y + n2Bounds.h);
      startX = n1Position.x + 0.5 * n1Bounds.w;
      endX = n2Position.x + 0.5 * n2Bounds.w;
      if (cn1Y < cn2Y) {
        startY = n1Position.y + n1Bounds.h + link.getStartConnectorOffset();
        endY = n2Position.y - link.getEndConnectorOffset();
      } else {
        startY = n1Position.y - link.getEndConnectorOffset();
        endY = n2Position.y + n2Bounds.h + link.getStartConnectorOffset();
      }
      link.setPoints(
        DemoContainerLayout._createVerticalLinkPath(startX, startY, endX, endY)
      );
    } else {
      //horizontal
      if (cn1X < cn2X) {
        //left to right
        startX =
          n1Position.x +
          n1Bounds.x +
          n1Bounds.w +
          link.getStartConnectorOffset();
        endX = n2Position.x - link.getEndConnectorOffset();
      } else {
        //right to left
        startX = n1Position.x - link.getStartConnectorOffset();
        endX =
          n2Position.x + n2Bounds.x + n2Bounds.w + link.getEndConnectorOffset();
      }
      startY = n1Position.y + n1Bounds.y + 0.5 * n1Bounds.h;
      endY = n2Position.y + n2Bounds.y + 0.5 * n2Bounds.h;
      link.setPoints(
        DemoContainerLayout._createSideLinkPath(startX, startY, endX, endY)
      );
    }
    //center label on link
    const labelBounds = link.getLabelBounds();
    if (labelBounds) {
      const labelX = startX;
      const labelY = startY - labelBounds.h;
      //link.setLabelPosition(new DvtDiagramPoint(labelX, labelY));
      link.setLabelPosition({ x: labelX, y: labelY });
    }
  }
  /**
   * Helper function creates a curved link that connects nodes sides
   * The function uses quadratic Bezier to create a curve
   * @param {number} startX X coordinate for the link start
   * @param {number} startY Y coordinate for the link start
   * @param {number} endX X coordinate for the link end
   * @param {number} endY Y coordinate for the link end
   */
  static _createSideLinkPath(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    const path = ["M", startX, startY];
    const midX = startX + 0.5 * (endX - startX);
    const midY = startY + 0.5 * (endY - startY);
    const c1X = midX; // X coordinate for the first control point
    const c1Y = startY; // Y coordinate for the first control point
    const c2X = midX; // X coordinate for the second control point
    const c2Y = endY; // Y coordinate for the second control point
    path.push("Q");
    path.push(c1X);
    path.push(c1Y);
    path.push(midX);
    path.push(midY);
    path.push("Q");
    path.push(c2X);
    path.push(c2Y);
    path.push(endX);
    path.push(endY);
    return path;
  }
  /**
   * Helper function creates a plain link that connects nodes bottom to top
   * @param {number} startX X coordinate for the link start
   * @param {number} startY Y coordinate for the link start
   * @param {number} endX X coordinate for the link end
   * @param {number} endY Y coordinate for the link end
   */
  static _createVerticalLinkPath(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    const path = ["M", startX, startY];
    path.push("L");
    path.push(endX);
    path.push(endY);
    return path;
  }
  /**
   * Helper function that sets label position in the middle of the diagram node
   * @param {DvtDiagramLayoutContextNode} node object that defines node context for the layout
   */
  static _positionLabel(node: any) {
    const nodeBounds = node.getContentBounds();
    const nodePos = node.getPosition();
    const nodeLabelBounds = node.getLabelBounds();
    let labelY;
    if (nodeLabelBounds) {
      if (node.isDisclosed()) {
        //position label in the middle of top 20 px of the node
        labelY = nodeBounds.y + nodePos.y + 0.5 * (20 - nodeLabelBounds.h);
      } else {
        //position label in the middle of the node
        labelY =
          nodeBounds.y + nodePos.y + 0.5 * (nodeBounds.h - nodeLabelBounds.h);
      }
      const labelX = nodeBounds.x + nodePos.x + 0.5 * nodeBounds.w;
      node.setLabelPosition({ x: labelX, y: labelY });
      node.setLabelHalign("center");
    }
  }
}
export = DemoContainerLayout;
