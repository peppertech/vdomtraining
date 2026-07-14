import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojmenu';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojoption';
import 'ojs/ojtreemap';
import { ojTreemap } from 'ojs/ojtreemap';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type TreeNode = {
  label: string;
  id: string;
  value: number;
  nodes?: TreeNode[];
};

const nodes = JSON.parse(jsonDataText as string) as TreeNode[];

const getNodeFromIndexPath = (indexPath: number[]) => {
  let currentNode: TreeNode | undefined;
  let currentLevel = nodes;

  for (let i = 0; i < indexPath.length; i++) {
    currentNode = currentLevel[indexPath[i]];
    currentLevel = currentNode?.nodes ?? [];
  }

  return currentNode;
};

export const TreemapContextMenu = () => {
  const treemapRef = useRef<ojTreemap<string, TreeNode> | null>(null);
  const [selectedItemsValue, setSelectedItemsValue] = useState<string[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('(None selected yet)');

  const nodeRef = useRef<TreeNode | null>(null);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const treemapData = useMemo(
    () =>
      new ArrayTreeDataProvider<string, TreeNode>(nodes, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const idToItemMap = useMemo(() => {
    const map: Record<string, TreeNode> = {};
    const addToIdMap = (node: TreeNode) => {
      map[node.id] = node;
      node.nodes?.forEach(addToIdMap);
    };
    nodes.forEach(addToIdMap);
    return map;
  }, []);

  const handleSelectedItemsValueSelectionChanged = (event: JetElementCustomEvent<string[] | undefined>) => {
    setSelectedItemsValue(event.detail.value ?? []);
  };

  const getColor = () => colorHandler.getValue(Math.floor(Math.random() * 4).toString());

  const getShortDesc = (label: string, value: number) => `<b>${label}</b><br/>Value: ${value}`;

  const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
    const target = event.detail.originalEvent?.target as HTMLElement | null;
    if (!target) {
      return;
    }

    if (target.id === 'treemap1') {
      const nodeId = selectedItemsValue[0];
      nodeRef.current = nodeId ? idToItemMap[nodeId] ?? null : null;
      return;
    }

    const treemap = treemapRef.current;
    if (!treemap) {
      return;
    }

    const context = treemap.getContextByNode(target) as { indexPath?: number[] } | null;
    nodeRef.current = context?.indexPath ? getNodeFromIndexPath(context.indexPath) ?? null : null;
  };

  const menuItemAction = (event: ojMenu.ojMenuAction) => {
    const text = event.detail.selectedValue;
    if (nodeRef.current) {
      setSelectedMenuItem(`${text} from ${nodeRef.current.label}`);
      nodeRef.current = null;
    } else {
      setSelectedMenuItem(`${text} from treemap background`);
    }
  };

  return (
    <div id="treemap-container">
      <oj-treemap
        ref={treemapRef}
        id="treemap1"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        selectionMode="single"
        onselectionChanged={handleSelectedItemsValueSelectionChanged}
        selection={selectedItemsValue}
        data={treemapData}
      >
        <template
          slot="nodeTemplate"
          render={($current: { data: TreeNode }) => (
            <oj-treemap-node
              label={$current.data.label}
              value={$current.data.value}
              color={getColor()}
              shortDesc={getShortDesc($current.data.label, $current.data.value)}
            />
          )}
        />
        <oj-menu slot="contextMenu" aria-label="Edit" onojMenuAction={menuItemAction} onojBeforeOpen={beforeOpenFunction}>
          <oj-option value="Action 1">Action 1</oj-option>
          <oj-option value="Action 2">Action 2</oj-option>
          <oj-option value="Action 3">Action 3</oj-option>
        </oj-menu>
      </oj-treemap>
      <p>
        Last selected menu item:
        <span class="oj-typography-bold">{selectedMenuItem}</span>
      </p>
    </div>
  );
};

export default TreemapContextMenu;
