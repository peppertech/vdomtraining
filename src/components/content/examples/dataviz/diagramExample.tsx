/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";

import "ojs/ojdiagram";

import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { ojDiagram } from "ojs/ojdiagram";
import type { DvtDiagramLayoutContext } from "ojs/ojdiagram";

type RawNode = {
  id: string;
  category: "0" | "1" | "2";
};

type RawLink = {
  id: string;
  category: "0" | "1" | "2";
  start: string;
  end: string;
};

type DiagramNodeData = ojDiagram.Node<string> &
  RawNode & {
    label: string;
    shortDesc: string;
    categories: string[];
  };

type DiagramLinkData = ojDiagram.Link<string, string> &
  RawLink & {
    label: string;
    categories: string[];
  };

const rawDiagramData: { nodes: RawNode[]; links: RawLink[] } = {
  nodes: [
    { id: "N0", category: "0" },
    { id: "N1", category: "1" },
    { id: "N2", category: "2" },
    { id: "N3", category: "0" },
    { id: "N4", category: "1" },
    { id: "N5", category: "2" },
    { id: "N6", category: "0" },
    { id: "N7", category: "1" },
    { id: "N8", category: "2" },
  ],
  links: [
    { id: "L0", category: "0", start: "N0", end: "N1" },
    { id: "L1", category: "1", start: "N1", end: "N3" },
    { id: "L2", category: "2", start: "N2", end: "N5" },
    { id: "L3", category: "0", start: "N3", end: "N7" },
    { id: "L4", category: "2", start: "N5", end: "N1" },
    { id: "L5", category: "0", start: "N6", end: "N3" },
    { id: "L6", category: "1", start: "N7", end: "N5" },
    { id: "L7", category: "2", start: "N8", end: "N7" },
  ],
};

const categoryPalette: Record<
  RawNode["category"],
  { fill: string; stroke: string; label: string }
> = {
  "0": { fill: "#4C6EF5", stroke: "#364FC7", label: "Category 0" },
  "1": { fill: "#12B886", stroke: "#0F9D76", label: "Category 1" },
  "2": { fill: "#F59F00", stroke: "#E67700", label: "Category 2" },
};

const diagramNodes: DiagramNodeData[] = rawDiagramData.nodes.map(
  (node, index) => {
    const palette = categoryPalette[node.category];
    return {
      id: node.id,
      category: node.category,
      label: `Node ${node.id}`,
      shortDesc: `${palette.label}`,
      categories: [node.category],
      icon: {
        shape: "rectangle",
        color: palette.fill,
        height: 56,
        width: 156,
        borderColor: palette.stroke,
        borderWidth: 2,
        borderRadius: "16px",
      },
    };
  },
);

const diagramLinks: DiagramLinkData[] = rawDiagramData.links.map((link) => {
  const palette = categoryPalette[link.category];
  return {
    id: link.id,
    category: link.category,
    label: `${link.start} → ${link.end}`,
    categories: [link.category],
    startNode: link.start,
    endNode: link.end,
    start: link.start,
    end: link.end,
    color: palette.stroke,
    width: 2,
    startConnectorType: "none",
    endConnectorType: "arrow",
    shortDesc: `${palette.label} dependency from ${link.start} to ${link.end}`,
  };
});

const columnCount = 3;
const columnSpacing = 220;
const rowSpacing = 150;

const nodePositions: Record<string, { x: number; y: number }> = diagramNodes.reduce(
  (positions, node, index) => {
    const column = index % columnCount;
    const row = Math.floor(index / columnCount);
    positions[node.id] = {
      x: column * columnSpacing,
      y: row * rowSpacing,
    };
    return positions;
  },
  {} as Record<string, { x: number; y: number }>,
);

const categoryBadgeClasses: Record<RawNode["category"], string> = {
  "0": "oj-badge-info",
  "1": "oj-badge-success",
  "2": "oj-badge-warning",
};

const DiagramExample = () => {
  const [selection, setSelection] = useState<Array<string>>([]);

  const nodeDataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<
        DiagramNodeData["id"],
        DiagramNodeData
      >(diagramNodes, {
        keyAttributes: "id",
      }),
    [],
  );

  const linkDataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<
        DiagramLinkData["id"],
        DiagramLinkData
      >(diagramLinks, {
        keyAttributes: "id",
      }),
    [],
  );

  const layout = useCallback(
    (
      context: DvtDiagramLayoutContext<
        string,
        string,
        DiagramNodeData,
        DiagramLinkData
      >,
    ) => {
      diagramNodes.forEach((node) => {
        const layoutNode = context.getNodeById(node.id);
        if (layoutNode) {
          const position = nodePositions[node.id];
          if (position) {
            layoutNode.setPosition(position);
          }
        }
      });
      const width = columnSpacing * (columnCount - 1) + 200;
      const height =
        rowSpacing * (Math.ceil(diagramNodes.length / columnCount) - 1) + 200;
      context.setViewport({ x: -60, y: -60, w: width, h: height });
    },
    [],
  );

  const handleSelectionChanged = useCallback(
    (
      event: ojDiagram.selectionChanged<
        string,
        string,
        DiagramNodeData,
        DiagramLinkData
      >,
    ) => {
      const value = event.detail.value;
      if (!value) {
        setSelection([]);
        return;
      }
      setSelection(Array.isArray(value) ? value : [value]);
    },
    [],
  );

  const selectedSummary = useMemo(() => {
    if (!selection.length) {
      return "Select a node or link to view its details.";
    }
    const key = selection[0];

    const node = diagramNodes.find((item) => item.id === key);
    if (node) {
      const palette = categoryPalette[node.category];
      return `${node.label} • ${palette.label}`;
    }

    const link = diagramLinks.find((item) => item.id === key);
    if (link) {
      const palette = categoryPalette[link.category];
      return `${link.label} • ${palette.label}`;
    }

    return "Selection not found in the data set.";
  }, [selection]);

  const styleDefaults = useMemo<ComponentProps<"oj-diagram">["styleDefaults"]>(
    () => ({
      nodeDefaults: {
        labelStyle: {
          fontWeight: "600",
          fill: "#1F2937",
        },
      },
      linkDefaults: {
        width: 2,
        startConnectorType: "none",
        endConnectorType: "arrow",
      },
    }),
    [],
  );

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-margin-4x-vertical oj-sm-padding-4x">
      <header>
        <h2 class="oj-typography-heading-sm oj-sm-margin-0">
          Network Diagram
        </h2>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
          Demonstrates oj-diagram with static node and link data grouped into
          categories with custom coloring and a declarative layout.
        </p>
      </header>

      <oj-diagram
        id="networkDiagram"
        aria-label="Sample network diagram"
        layout={layout}
        nodeData={nodeDataProvider}
        linkData={linkDataProvider}
        selectionMode="single"
        selection={selection as ComponentProps<"oj-diagram">["selection"]}
        onselectionChanged={handleSelectionChanged}
        hoverBehavior="dim"
        nodeHighlightMode="nodeAndLinks"
        panDirection="auto"
        panning="centerContent"
        zooming="auto"
        styleDefaults={styleDefaults}
      >
        <template
          slot="nodeTemplate"
          render={(
            context: ojDiagram.NodeTemplateContext<string, DiagramNodeData>,
          ) => {
            const data = context.data;
            const palette = categoryPalette[data.category];
            return (
              <oj-diagram-node>
                <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center oj-sm-padding-2x">
                  <span
                    class={`oj-badge oj-sm-margin-1x-bottom ${categoryBadgeClasses[data.category]}`}
                  >
                    {palette.label}
                  </span>
                  <span class="oj-typography-body-md oj-typography-bold oj-text-color-primary">
                    {data.label}
                  </span>
                  <span class="oj-typography-body-sm oj-text-color-secondary">
                    {data.id}
                  </span>
                </div>
              </oj-diagram-node>
            );
          }}
        />
      </oj-diagram>

      <div class="oj-sm-margin-3x-top oj-typography-body-sm">
        <strong>Selection:</strong> {selectedSummary}
      </div>
    </section>
  );
};

export { DiagramExample };
