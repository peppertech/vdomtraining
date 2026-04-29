// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayTreeDataProvider from 'ojs/ojarraytreedataprovider';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import 'ojs/ojtreemap';
import 'ojs/ojpopup';
import { ojTreemap } from 'ojs/ojtreemap';
import type { ojPopupSettableProperties } from 'ojs/ojpopup';

type TreeNode = {
  label: string;
  id: string;
  value: number;
  nodes?: TreeNode[];
};

type PopupInfo = {
  text: string;
  linkText: string;
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

export const TreemapPopup = () => {
  const [tailMode, setTailMode] = useState<ojPopupSettableProperties['tail']>('simple');
  const [selectedItemsValue, setSelectedItemsValue] = useState<string[]>([]);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

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

  const openPopup = (event: MouseEvent | KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    const popup = document.getElementById('popup1') as HTMLElement & { open: Function } | null;
    const launcher = document.getElementById('treemap1');
    if (!target || !popup || !launcher) {
      return;
    }

    let node: TreeNode | undefined;
    let pageX = 0;
    let pageY = 0;

    if (target.id === 'treemap1') {
      if (!(event instanceof KeyboardEvent) || event.key !== 'Enter') {
        return;
      }

      node = selectedItemsValue[0] ? idToItemMap[selectedItemsValue[0]] : undefined;
      if (!node) {
        return;
      }

      setTailMode('none');
      pageX = target.offsetWidth / 2.3;
      pageY = target.offsetHeight / 3;
    } else {
      const treemap = launcher as ojTreemap<string, TreeNode>;
      const context = treemap.getContextByNode(target) as { subId?: string; indexPath?: number[] } | null;
      if (context?.subId !== 'oj-treemap-node' || !context.indexPath) {
        return;
      }

      node = getNodeFromIndexPath(context.indexPath);
      if (!node || !(event instanceof MouseEvent)) {
        return;
      }

      setTailMode('simple');
      pageX = event.pageX;
      pageY = event.pageY;
    }

    setPopupInfo({
      text: `${node.label} has size ${node.value}`,
      linkText: 'www.oracle.com'
    });

    popup.open(launcher, {
      of: { x: pageX, y: pageY },
      my: { vertical: 'center' },
      at: { vertical: 'center' },
      collision: 'flipfit'
    });
  };

  return (
    <div id="treemap-container">
      <oj-treemap
        id="treemap1"
        onClick={openPopup}
        onKeyDown={openPopup}
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
            <oj-treemap-node label={$current.data.label} value={$current.data.value} color={getColor()} />
          )}
        />
      </oj-treemap>
      <oj-popup
        class="oj-helper-text-align-center"
        id="popup1"
        tail={tailMode}
        data-oj-binding-provider="none"
        modality="modeless"
      >
        <div>
          <div>{popupInfo?.text ?? ''}</div>
          <a href="https://www.oracle.com" target="_blank" rel="noreferrer">
            {popupInfo?.linkText ?? ''}
          </a>
        </div>
      </oj-popup>
    </div>
  );
};

export default TreemapPopup;
