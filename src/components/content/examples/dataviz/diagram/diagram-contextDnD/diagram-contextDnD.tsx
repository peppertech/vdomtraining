import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as dndDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/dndDataSample.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { getLayout } from 'ojs/ojdiagram-utils';
import { ojMenu } from 'ojs/ojmenu';
import { ojDiagram } from 'ojs/ojdiagram';
import 'ojs/ojdiagram';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import * as layout from '../diagram-layouts';

type DiagramSelection = NonNullable<ComponentProps<'oj-diagram'>['selection']>;
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
type BackgroundDropContext = {
  x: number;
  y: number;
};
type NodeDropContext = BackgroundDropContext & {
  nodeX: number;
  nodeY: number;
  nodeContext: {
    id: string;
  };
};
type LinkDropContext = BackgroundDropContext & {
  linkContext: {
    id: string;
    data: DndLink;
  };
};
type DiagramNodeContext = {
  subId: 'oj-diagram-node';
  index: number;
};
type DiagramLinkContext = {
  subId: 'oj-diagram-link';
  index: number;
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

export const DiagramContextDnD = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const [nodes1, setNodes1] = useState<DndNode[]>(dndData.nodesA.map(cloneNode));
  const [nodes2, setNodes2] = useState<DndNode[]>(dndData.nodesB.map(cloneNode));
  const [links2, setLinks2] = useState<DndLink[]>(dndData.linksB.map((link) => ({ ...link })));
  const [selectedItemsValue1, setSelectedItemsValue1] = useState<DiagramSelection>([]);
  const [selectedItemsValue2, setSelectedItemsValue2] = useState<DiagramSelection>([]);
  const [panZoomState, setPanZoomState] = useState<PanZoomState>({ zoom: 1, centerX: 0, centerY: 0 });
  const [menuTargetNode, setMenuTargetNode] = useState<DndNode | null>(null);

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

  const idToItemMap1 = useMemo(
    () => Object.fromEntries(nodes1.map((item) => [item.id, item] as const)),
    [nodes1]
  );
  const idToItemMap2 = useMemo(
    () => Object.fromEntries(nodes2.map((item) => [item.id, item] as const)),
    [nodes2]
  );

  const dropLayout = useMemo(
    () => buildDropLayout(nodes2, links2, panZoomState),
    [links2, nodes2, panZoomState]
  );

  const moveNodeToA = (node: DndNode) => {
    setNodes1((prev) => [...prev.filter((item) => item.id !== node.id), { ...cloneNode(node), x: undefined, y: undefined }]);
    setNodes2((prev) => prev.filter((item) => item.id !== node.id));
  };

  const moveNodeToB = (node: DndNode) => {
    const diagramB = document.getElementById('diagram2');
    const rect = diagramB?.getBoundingClientRect();
    const width = rect?.width ?? 300;
    const height = rect?.height ?? 300;
    const nextNode = {
      ...cloneNode(node),
      x: Math.floor(Math.random() * width * 0.6),
      y: Math.floor(Math.random() * height * 0.6)
    };

    setNodes1((prev) => prev.filter((item) => item.id !== node.id));
    setNodes2((prev) => [...prev.filter((item) => item.id !== node.id), nextNode]);
  };

  const handleDragStart =
    (dataType: 'text/nodes1' | 'text/nodes2') =>
    (event: DragEvent, context: any) => {
      if (!event.dataTransfer) {
        return;
      }
      const payload: DragPayload = context.nodes.map((node: { id: string; data: DndNode }) => ({
        id: node.id,
        itemData: cloneNode(node.data)
      }));
      event.dataTransfer.setData(dataType, JSON.stringify(payload));
    };

  const handleDrop = (
    event: DragEvent,
    context: BackgroundDropContext | NodeDropContext | LinkDropContext,
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

    const dropContext = context as BackgroundDropContext & Partial<NodeDropContext> & Partial<LinkDropContext>;
    nextNode.x = 'nodeContext' in dropContext && dropContext.nodeContext ? dropContext.x + 100 : dropContext.x;
    nextNode.y = dropContext.y;
    setNodes2((prev) => [...prev, nextNode]);

    if ('nodeContext' in dropContext && dropContext.nodeContext) {
      const startNodeId = dropContext.nodeContext.id;
      setLinks2((prev) => [
        ...prev,
        {
          id: 'L' + startNodeId + '_' + nextNode.id,
          startNode: startNodeId,
          endNode: nextNode.id
        }
      ]);
    } else if ('linkContext' in dropContext && dropContext.linkContext) {
      const { id, data } = dropContext.linkContext;
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

  const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
    const target = event.detail.originalEvent.target as HTMLElement;
    const diagramElement = target.closest('#diagram1, #diagram2') as
      | ojDiagram<string, string, DndNode, DndLink>
      | null;

    setMenuTargetNode(null);

    if (!diagramElement) {
      return;
    }

    const context = diagramElement.getContextByNode(target) as DiagramNodeContext | DiagramLinkContext | null;
    if (context?.subId === 'oj-diagram-node') {
      const items = diagramElement.id === 'diagram1' ? nodes1 : nodes2;
      setMenuTargetNode(items[context.index] ?? null);
      return;
    }

    if (target.id === 'diagram1' && selectedItemsValue1.length > 0) {
      setMenuTargetNode(idToItemMap1[String(selectedItemsValue1[0])] ?? null);
    } else if (target.id === 'diagram2' && selectedItemsValue2.length > 0) {
      setMenuTargetNode(idToItemMap2[String(selectedItemsValue2[0])] ?? null);
    }
  };

  const menuItemAction = (event: ojMenu.ojMenuAction) => {
    if (!menuTargetNode) {
      return;
    }

    if (event.detail.selectedValue === 'Action1') {
      moveNodeToB(menuTargetNode);
    } else if (event.detail.selectedValue === 'Action2') {
      moveNodeToA(menuTargetNode);
    }
  };

  const selectionText = [...selectedItemsValue1, ...selectedItemsValue2].join(', ');

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
            selectionMode="single"
            selection={selectedItemsValue1}
            onselectionChanged={(event) => setSelectedItemsValue1(event.detail.value ?? [])}
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
            <oj-menu slot="contextMenu" aria-label="Edit" onojMenuAction={menuItemAction} onojBeforeOpen={beforeOpenFunction}>
              <oj-option value="Action1">Move to B</oj-option>
            </oj-menu>
          </oj-diagram>
        </div>

        <div class="oj-flex-item oj-sm-margin-1x-horizontal oj-panel oj-panel-border-radius-0 oj-sm-padding-0">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">Diagram B</div>
          <oj-diagram
            id="diagram2"
            nodeData={nodeDataProvider2}
            linkData={linkDataProvider2}
            layout={dropLayout}
            selectionMode="single"
            selection={selectedItemsValue2}
            onselectionChanged={(event) => setSelectedItemsValue2(event.detail.value ?? [])}
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
            <oj-menu slot="contextMenu" aria-label="Edit" onojMenuAction={menuItemAction} onojBeforeOpen={beforeOpenFunction}>
              <oj-option value="Action2">Move to A</oj-option>
            </oj-menu>
          </oj-diagram>
        </div>
        <div class="oj-sm-padding-1x">
          <div>Selected objects:</div>
          <div id="selectedObjects">{selectionText}</div>
        </div>
      </div>
    </div>
  );
};

export default DiagramContextDnD;
