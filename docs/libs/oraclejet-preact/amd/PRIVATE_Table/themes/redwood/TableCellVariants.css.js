define(['exports', 'css!./../../../Table.styles.css', 'css!./../../../TableRowStyles.styles.css', 'css!./../../../TableCellStyles.styles.css', '../../../vanilla-extract-recipes-createRuntimeFn.esm-103a441d'], (function(e,l,t,r,o){"use strict";var a=o.createRuntimeFn({defaultClassName:"TableCellStyles_tableCellStyles_base__15znm170",variantClassNames:{defaultRenderer:{isDefaultRenderer:"TableCellStyles_tableCellStyles_defaultRenderer__15znm171",notDefaultRenderer:""},firstRow:{isFirstRow:"",notFirstRow:""},lastRow:{isLastRow:"",notLastRow:""},firstColumn:{isFirstColumn:"",notFirstColumn:""},lastColumn:{isLastColumn:"",notLastColumn:""},borderTopSpacer:{isBorderTopSpacer:"",notBorderTopSpacer:""},borderBottomSpacer:{isBorderBottomSpacer:"",notBorderBottomSpacer:""},borderStartSpacer:{isBorderStartSpacer:"",notBorderStartSpacer:""},borderEndSpacer:{isBorderEndSpacer:"",notBorderEndSpacer:""},verticalGrid:{isVerticalGrid:"",notVerticalGrid:""},horizontalGrid:{isHorizontalGrid:"",notHorizontalGrid:""},rowSelectable:{isRowSelectable:"",notRowSelectable:""},rowSingleSelection:{isRowSingleSelection:"",notRowSingleSelection:""},rowSelected:{isRowSelected:"TableCellStyles_tableCellStyles_rowSelected__15znm17p",notRowSelected:""},previousRowSelected:{isPreviousRowSelected:"",notPreviousRowSelected:""},columnSelected:{isColumnSelected:"TableCellStyles_tableCellStyles_columnSelected__15znm17q",notColumnSelected:""},previousColumnSelected:{isPreviousColumnSelected:"TableCellStyles_tableCellStyles_verticalSelectedGridStart__15znm17n",notPreviousColumnSelected:""},stickyStartColumn:{isStickyStartColumn:"TableCellStyles_tableCellStyles_stickyStartColumn__15znm17r",notStickyStartColumn:""},stickyEndColumn:{isStickyEndColumn:"TableCellStyles_tableCellStyles_stickyEndColumn__15znm17s",notStickyEndColumn:""},stickyStartEdge:{isStickyStartEdge:"TableCellStyles_tableCellStyles_stickyEdgeStart__15znm17t",notStickyStartEdge:""},stickyEndEdge:{isStickyEndEdge:"TableCellStyles_tableCellStyles_stickyEdgeEnd__15znm17u",notStickyEndEdge:""},rowHighlight:{isRowHighlight:"TableCellStyles_tableCellStyles_rowHighlight__15znm17x",notRowHighlight:""},focusRingVisible:{isFocusRingVisible:"TableCellStyles_tableCellStyles_focused__15znm17y",notFocusRingVisible:""},active:{isActive:"",notActive:""},hover:{isHover:"",notHover:""},pseudoHover:{isPseudoHover:"",notPseudoHover:""},rtl:{isRtl:"",notRtl:""}},defaultVariants:{},compoundVariants:[[{borderBottomSpacer:"notBorderBottomSpacer",defaultRenderer:"isDefaultRenderer"},"TableCellStyles_tableCellStyles_bottomPadding__15znm172"],[{borderBottomSpacer:"notBorderBottomSpacer",defaultRenderer:"notDefaultRenderer"},"TableCellStyles_tableCellStyles_rendererBottomPadding__15znm173"],[{borderBottomSpacer:"isBorderBottomSpacer",defaultRenderer:"isDefaultRenderer"},"TableCellStyles_tableCellStyles_borderBottomSpacerPadding__15znm174"],[{borderBottomSpacer:"isBorderBottomSpacer",defaultRenderer:"notDefaultRenderer"},"TableCellStyles_tableCellStyles_rendererBorderBottomSpacerPadding__15znm175"],[{borderEndSpacer:"notBorderEndSpacer",defaultRenderer:"isDefaultRenderer"},"TableCellStyles_tableCellStyles_endPadding__15znm176"],[{borderEndSpacer:"notBorderEndSpacer",defaultRenderer:"notDefaultRenderer"},"TableCellStyles_tableCellStyles_rendererEndPadding__15znm177"],[{borderEndSpacer:"isBorderEndSpacer",defaultRenderer:"isDefaultRenderer"},"TableCellStyles_tableCellStyles_borderEndSpacerPadding__15znm178"],[{borderEndSpacer:"isBorderEndSpacer",defaultRenderer:"notDefaultRenderer"},"TableCellStyles_tableCellStyles_rendererBorderEndSpacerPadding__15znm179"],[{borderStartSpacer:"notBorderStartSpacer",defaultRenderer:"isDefaultRenderer"},"TableCellStyles_tableCellStyles_startPadding__15znm17a"],[{borderStartSpacer:"notBorderStartSpacer",defaultRenderer:"notDefaultRenderer"},"TableCellStyles_tableCellStyles_rendererStartPadding__15znm17b"],[{borderStartSpacer:"isBorderStartSpacer",defaultRenderer:"isDefaultRenderer"},"TableCellStyles_tableCellStyles_borderStartSpacerPadding__15znm17c"],[{borderStartSpacer:"isBorderStartSpacer",defaultRenderer:"notDefaultRenderer"},"TableCellStyles_tableCellStyles_rendererBorderStartSpacerPadding__15znm17d"],[{borderTopSpacer:"notBorderTopSpacer",defaultRenderer:"isDefaultRenderer"},"TableCellStyles_tableCellStyles_topPadding__15znm17e"],[{borderTopSpacer:"notBorderTopSpacer",defaultRenderer:"notDefaultRenderer"},"TableCellStyles_tableCellStyles_rendererTopPadding__15znm17f"],[{borderTopSpacer:"isBorderTopSpacer",defaultRenderer:"isDefaultRenderer"},"TableCellStyles_tableCellStyles_borderTopSpacerPadding__15znm17g"],[{borderTopSpacer:"isBorderTopSpacer",defaultRenderer:"notDefaultRenderer"},"TableCellStyles_tableCellStyles_rendererBorderTopSpacerPadding__15znm17h"],[{firstRow:"notFirstRow",horizontalGrid:"isHorizontalGrid"},"TableCellStyles_tableCellStyles_horizontalGridTop__15znm17i"],[{rowSingleSelection:"isRowSingleSelection",rowSelected:"isRowSelected"},"TableCellStyles_tableCellStyles_horizontalSelectedGridTop__15znm17j"],[{rowSingleSelection:"isRowSingleSelection",previousRowSelected:"isPreviousRowSelected"},"TableCellStyles_tableCellStyles_horizontalSelectedGridTop__15znm17j"],[{lastRow:"isLastRow",horizontalGrid:"isHorizontalGrid"},"TableCellStyles_tableCellStyles_horizontalGridBottom__15znm17k"],[{lastRow:"isLastRow",rowSingleSelection:"isRowSingleSelection",rowSelected:"isRowSelected"},"TableCellStyles_tableCellStyles_horizontalSelectedGridBottom__15znm17l"],[{firstColumn:"notFirstColumn",verticalGrid:"isVerticalGrid"},"TableCellStyles_tableCellStyles_verticalGridStart__15znm17m"],[{lastColumn:"isLastColumn",columnSelected:"isColumnSelected"},"TableCellStyles_tableCellStyles_verticalSelectedGridEnd__15znm17o"],[{stickyStartEdge:"isStickyStartEdge",rtl:"isRtl"},"TableCellStyles_tableCellStyles_stickyEdgeLeft__15znm17v"],[{stickyEndEdge:"isStickyEndEdge",rtl:"notRtl"},"TableCellStyles_tableCellStyles_stickyEdgeLeft__15znm17v"],[{stickyStartEdge:"isStickyStartEdge",rtl:"notRtl"},"TableCellStyles_tableCellStyles_stickyEdgeRight__15znm17w"],[{stickyEndEdge:"isStickyEndEdge",rtl:"isRtl"},"TableCellStyles_tableCellStyles_stickyEdgeRight__15znm17w"],[{rowSelectable:"isRowSelectable",active:"isActive"},"TableCellStyles_tableCellStyles_active__15znm17z"],[{rowSelectable:"isRowSelectable",hover:"isHover"},"TableCellStyles_tableCellStyles_hover__15znm1710"],[{rowSelectable:"isRowSelectable",pseudoHover:"isPseudoHover"},"TableCellStyles_tableCellStyles_pseudoHover__15znm1711"]]});e.multiVariantStyles=a,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=TableCellVariants.css.js.map