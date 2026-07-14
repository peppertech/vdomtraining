import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import { getLayout } from 'ojs/ojdiagram-utils';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dndDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/dndDataSample.json';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type PanZoomState = NonNullable<ComponentProps<'oj-diagram'>['panZoomState']>;
type DndNode = {
  id: string;
  label?: string;
  category: string;
  x?: number;
  y?: number;
};
type DndLink = {
  id: string;
  startNode: string;
  endNode: string;
};
type DndData = {
  nodesA: DndNode[];
  nodesB: DndNode[];
  linksB: DndLink[];
};
type DragPayload = {
  id: string;
  itemData: DndNode;
}[];
type DiagramDragContext = {
  nodes: Array<{ id: string; data: unknown }>;
};
type DiagramDropContext = {
  x: number;
  y: number;
  nodeContext?: { id: string };
  linkContext?: { id: string; data: unknown };
};

const dndData = JSON.parse(dndDataText as string) as DndData;

const cloneNode = (node: DndNode): DndNode => JSON.parse(JSON.stringify(node)) as DndNode;

const buildDropLayout = (nodes: DndNode[], links: DndLink[], panZoomState: PanZoomState) =>
  getLayout({
    nodes: nodes.map((node) => ({
      id: node.id,
      x: node.x ?? 0,
      y: node.y ?? 0
    })),
    links: links.map((link) => ({
      id: link.id
    })),
    linkDefaults: {
      path: (context, link) => {
        const startNode = context.getNodeById(link.getStartId());
        const endNode = context.getNodeById(link.getEndId());
        if (!startNode || !endNode) {
          return '';
        }
        const startPosition = startNode.getPosition();
        const endPosition = endNode.getPosition();
        const startBounds = startNode.getBounds();
        const endBounds = endNode.getBounds();
        const startX = startPosition.x + 0.5 * startBounds.w;
        const startY = startPosition.y + 0.5 * startBounds.h;
        const endX = endPosition.x + 0.5 * endBounds.w;
        const endY = endPosition.y + 0.5 * endBounds.h;
        return [startX, startY, endX, endY].toString();
      }
    },
    panZoomState: {
      zoom: panZoomState.zoom ?? 1,
      centerX: panZoomState.centerX ?? 0,
      centerY: panZoomState.centerY ?? 0
    }
  });

export const DiagramDndSample = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const [nodes1, setNodes1] = useState<DndNode[]>(dndData.nodesA.map(cloneNode));
  const [nodes2, setNodes2] = useState<DndNode[]>(dndData.nodesB.map(cloneNode));
  const [links2, setLinks2] = useState<DndLink[]>(dndData.linksB.map((link) => ({ ...link })));
  const [panZoomState, setPanZoomState] = useState<PanZoomState>({ zoom: 1, centerX: 0, centerY: 0 });

  const nodeDataProvider1 = useMemo(
    () => new ArrayDataProvider<string, DndNode>(nodes1, { keyAttributes: 'id' }),
    [nodes1]
  );
  const nodeDataProvider2 = useMemo(
    () => new ArrayDataProvider<string, DndNode>(nodes2, { keyAttributes: 'id' }),
    [nodes2]
  );
  const linkDataProvider2 = useMemo(
    () => new ArrayDataProvider<string, DndLink>(links2, { keyAttributes: 'id' }),
    [links2]
  );

  const dropLayout = useMemo(
    () => buildDropLayout(nodes2, links2, panZoomState),
    [links2, nodes2, panZoomState]
  );

  const handleDragStart =
    (dataType: 'text/nodes1' | 'text/nodes2') =>
    (event: DragEvent, context: DiagramDragContext) => {
      if (!event.dataTransfer) {
        return;
      }
      const payload: DragPayload = context.nodes.map((node) => ({
        id: node.id,
        itemData: cloneNode(node.data as DndNode)
      }));
      event.dataTransfer.setData(dataType, JSON.stringify(payload));
    };

  const handleDrop = (
    event: DragEvent,
    context: DiagramDropContext,
    target: 'A' | 'B',
    linkCleanup: boolean
  ) => {
    const rawData =
      event.dataTransfer?.getData('text/nodes1') || event.dataTransfer?.getData('text/nodes2');
    if (!rawData) {
      return;
    }

    const dataContext = (JSON.parse(rawData) as DragPayload)[0];
    if (!dataContext) {
      return;
    }

    const nextNode = cloneNode(dataContext.itemData);
    setNodes1((prev) => prev.filter((item) => item.id !== dataContext.id));
    setNodes2((prev) => prev.filter((item) => item.id !== dataContext.id));

    if (linkCleanup) {
      setLinks2((prev) =>
        prev.filter(
          (link) => link.startNode !== dataContext.id && link.endNode !== dataContext.id
        )
      );
    }

    if (target === 'A') {
      delete nextNode.x;
      delete nextNode.y;
      setNodes1((prev) => [...prev, nextNode]);
      return;
    }

    nextNode.x = context.nodeContext ? context.x + 100 : context.x;
    nextNode.y = context.y;
    setNodes2((prev) => [...prev, nextNode]);

    if (context.nodeContext) {
      setLinks2((prev) => [
        ...prev,
        {
          id: 'L' + context.nodeContext!.id + '_' + nextNode.id,
          startNode: context.nodeContext!.id,
          endNode: nextNode.id
        }
      ]);
    } else if (context.linkContext) {
      const { id } = context.linkContext;
      const data = context.linkContext.data as DndLink;
      setLinks2((prev) => {
        const withoutTarget = prev.filter((link) => link.id !== id);
        return [
          ...withoutTarget,
          {
            id: 'L' + data.startNode + '_' + nextNode.id,
            startNode: data.startNode,
            endNode: nextNode.id
          },
          {
            id: 'L' + nextNode.id + '_' + data.endNode,
            startNode: nextNode.id,
            endNode: data.endNode
          }
        ];
      });
    }
  };

  const nodeTemplateRenderer = (node: { data: DndNode }) => (
    <oj-diagram-node
      label={node.data.id}
      shortDesc={`Node ${node.data.id}, Category ${node.data.category}`}
      icon={{
        shape: node.data.category === '1' ? 'square' : 'circle',
        color: colorHandler.getValue(node.data.category),
        width: 40,
        height: 40
      }}
    />
  );

  const linkTemplateRenderer = (link: { data: DndLink }) => (
    <oj-diagram-link
      startNode={link.data.startNode}
      endNode={link.data.endNode}
      shortDesc={`Link ${link.data.id}, connects ${link.data.startNode} to ${link.data.endNode}`}
      width={3}
    />
  );

  return (
    <div id="diagram-container">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-1x-horizontal oj-panel oj-panel-border-radius-0 oj-sm-padding-0">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">Diagram A</div>
          <oj-diagram
            id="diagram1"
            nodeData={nodeDataProvider1}
            layout={layout.gridLayout}
            dnd={{
              drag: {
                nodes: {
                  dataTypes: ['text/nodes1'],
                  dragStart: handleDragStart('text/nodes1')
                }
              },
              drop: {
                background: {
                  dataTypes: ['text/nodes1', 'text/nodes2'],
                  drop: (event, context) => handleDrop(event, context, 'A', true)
                }
              }
            }}
          >
            <template slot="nodeTemplate" render={nodeTemplateRenderer} />
            <template slot="linkTemplate" render={linkTemplateRenderer} />
          </oj-diagram>
        </div>
        <div class="oj-flex-item oj-sm-margin-1x-horizontal oj-panel oj-panel-border-radius-0 oj-sm-padding-0">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">Diagram B</div>
          <oj-diagram
            id="diagram2"
            nodeData={nodeDataProvider2}
            linkData={linkDataProvider2}
            layout={dropLayout}
            dnd={{
              drag: {
                nodes: {
                  dataTypes: ['text/nodes2'],
                  dragStart: handleDragStart('text/nodes2')
                }
              },
              drop: {
                background: {
                  dataTypes: ['text/nodes1', 'text/nodes2'],
                  drop: (event, context) => handleDrop(event, context, 'B', false)
                },
                nodes: {
                  dataTypes: ['text/nodes1', 'text/nodes2'],
                  drop: (event, context) => handleDrop(event, context, 'B', false)
                },
                links: {
                  dataTypes: ['text/nodes1', 'text/nodes2'],
                  drop: (event, context) => handleDrop(event, context, 'B', false)
                }
              }
            }}
            panning="auto"
            panZoomState={panZoomState}
            onpanZoomStateChanged={(event) =>
              setPanZoomState(event.detail.value ?? { zoom: 1, centerX: 0, centerY: 0 })
            }
            minZoom={1}
            maxZoom={1}
          >
            <template slot="nodeTemplate" render={nodeTemplateRenderer} />
            <template slot="linkTemplate" render={linkTemplateRenderer} />
          </oj-diagram>
        </div>
      </div>
    </div>
  );
};

export default DiagramDndSample;
