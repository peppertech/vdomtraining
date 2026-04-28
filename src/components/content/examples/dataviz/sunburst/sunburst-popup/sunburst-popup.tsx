import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import 'ojs/ojpopup';
import 'ojs/ojsunburst';
import { ojPopup } from 'ojs/ojpopup';
import { ojSunburst } from 'ojs/ojsunburst';

type PopupNode = {
  id: string;
  label: string;
  value: number;
  nodes?: PopupNode[];
};

const nodes = JSON.parse(jsonDataText as string) as PopupNode[];

export const SunburstPopup = () => {
  const [tailMode, setTailMode] = useState<'none' | 'simple'>('simple');
  const [selectedItemsValue, setSelectedItemsValue] = useState<string[]>([]);
  const popupRef = useRef<ojPopup | null>(null);
  const popupContentRef = useRef<HTMLDivElement | null>(null);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(nodes, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const idToItemMap = useMemo(() => {
    const map: Record<string, PopupNode> = {};

    const addToIdMap = (node: PopupNode): void => {
      if (node.id) {
        map[node.id] = node;
      }

      node.nodes?.forEach(addToIdMap);
    };

    nodes.forEach(addToIdMap);
    return map;
  }, []);

  const getColor = (): string => colorHandler.getValue(Math.floor(Math.random() * 4).toString());
  const getTooltip = () => ({ preventDefault: true });

  const openPopup = (event: any): void => {
    let node: PopupNode | null = null;
    let nodeContext;

    if ((event.target as HTMLElement).id === 'sunburst1') {
      const [nodeId] = selectedItemsValue;
      node = nodeId ? idToItemMap[nodeId] ?? null : null;
    } else {
      const sunburst = document.getElementById('sunburst1') as ojSunburst<string, PopupNode>;
      nodeContext = sunburst.getContextByNode(event.target as Element);
    }

    let popupText: string | undefined;
    let pageX = 0;
    let pageY = 0;

    const getPopupText = (item: PopupNode | null): string | undefined => {
      if (!item) {
        return undefined;
      }

      return `${item.label} has size ${item.value}<br/><a href="https://www.oracle.com" target="_blank">www.oracle.com</a>`;
    };

    if (nodeContext && nodeContext.subId === 'oj-sunburst-node') {
      setTailMode('simple');
      node = nodeContext.indexPath.reduce((acc: any, cur: any) => acc.nodes[cur], { nodes } as any);
      popupText = getPopupText(node);
      pageX = event.pageX;
      pageY = event.pageY;
    } else if (node && event.key === 'Enter') {
      setTailMode('none');
      popupText = getPopupText(node);
      pageX = event.target.offsetWidth / 2;
      pageY = event.target.offsetHeight / 1.79;
    }

    if (popupText && popupRef.current && popupContentRef.current) {
      popupContentRef.current.innerHTML = popupText;
      popupRef.current.open(event.target as Element, {
        of: { x: pageX, y: pageY },
        my: { horizontal: 'center', vertical: 'bottom' },
        at: { horizontal: 'center' },
        collision: 'none'
      });
    }
  };

  const nodeTemplateRenderer = ($current: any) => (
    <oj-sunburst-node label={$current.data.label} value={$current.data.value} color={getColor()} />
  );

  return (
    <div id="sunburst-container">
      <oj-sunburst
        id="sunburst1"
        onclick={openPopup}
        onkeydown={openPopup}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        data={sunburstData}
        selectionMode="single"
        onselectionChanged={(event: any) => setSelectedItemsValue(event.detail.value ?? [])}
        selection={selectedItemsValue}
        {...({ 'tooltip.renderer': getTooltip } as any)}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-sunburst>
      <oj-popup
        ref={popupRef}
        class="oj-helper-text-align-center"
        id="popup1"
        tail={tailMode}
        data-oj-binding-provider="none"
        modality="modeless"
      >
        <div ref={popupContentRef} />
      </oj-popup>
    </div>
  );
};

export default SunburstPopup;
