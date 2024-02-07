import support = require("./DemoLayoutSupport");
import { DvtDiagramLayoutContext } from "ojs/ojdiagram";

class DemoGridLayout {
  /**
   * Grid layout function that does a grid layout with layout arguments
   * If neither rows or cols arguments specified, will make a square grid
   * If both specified, will use rows to calculate grid
   * @param {number=} rows optional number of rows in the grid
   * @param {number=} cols optional number of cols in the grid
   * @return {function} layout function
   */
  static gridLayout<K1, K2, D1, D2>(rows?: number, cols?: number) {
    let func = (layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>) => {
      return DemoGridLayout.gridLayoutHelper(
        layoutContext,
        rows as number,
        cols as number
      );
    };
    return func;
  }

  /**
   * Helper function that performs the grid layout
   * If neither rows or cols arguments specified, will make a square grid
   * If both specified, will use rows to calculate grid
   * @param {DvtDiagramLayoutContext} layoutContext object that defines a context for layout call
   * @param {number=} rows optional number of rows in the grid
   * @param {number=} cols optional number of cols in the grid
   * @return {Promise} Promise object that will be resolved when the layout is done
   */
  static gridLayoutHelper<K1, K2, D1, D2>(
    layoutContext: DvtDiagramLayoutContext<K1, K2, D1, D2>,
    rows: number,
    cols: number
  ) {
    const maxNodeBounds = support.getMaxNodeBounds(layoutContext);
    const nodeSize = Math.max(maxNodeBounds.w, maxNodeBounds.h);
    const nodeCount = layoutContext.getNodeCount();
    const linkCount = layoutContext.getLinkCount();
    const size = Math.floor(Math.sqrt(nodeCount));

    const padding = linkCount > 0 ? nodeSize : 0.25 * nodeSize;
    const space = nodeSize + padding;

    if (rows) {
      cols = Math.floor(nodeCount / rows);
    } else if (cols) {
      rows = Math.ceil(nodeCount / cols);
    } else {
      rows = Math.ceil(nodeCount / size);
      cols = size;
    }

    const startx = (-(cols - 1) * space) / 2;
    const starty = (-(rows - 1) * space) / 2;
    let row = 0;
    let col = 0;
    for (let ni = 0; ni < nodeCount; ni++) {
      const node = layoutContext.getNodeByIndex(ni);
      row = Math.floor(ni / cols);
      col = ni % cols;
      const currX = startx + space * col;
      const currY = starty + space * row;
      support.centerNodeAndLabel(layoutContext, node, currX, currY);
    }
    support.layoutLinks(layoutContext);
  }
}
export = DemoGridLayout;
