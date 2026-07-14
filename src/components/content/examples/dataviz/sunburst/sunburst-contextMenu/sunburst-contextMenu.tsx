import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojmenu';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojoption';
import 'ojs/ojsunburst';
import { ojSunburst } from 'ojs/ojsunburst';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/cityStateData.json';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type MenuNode = {
  id: string;
  label: string;
  value: number;
  nodes?: MenuNode[];
};

const nodes = JSON.parse(jsonDataText as string) as MenuNode[];

export const SunburstContextMenu = () => {
  const sunburstRef = useRef<ojSunburst<string, MenuNode> | null>(null);
  const [selectedItemsValue, setSelectedItemsValue] = useState<string[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
  const nodeRef = useRef<MenuNode | null>(null);
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
    const map: Record<string, MenuNode> = {};

    const addToIdMap = (node: MenuNode): void => {
      if (node.id) {
        map[node.id] = node;
      }

      node.nodes?.forEach(addToIdMap);
    };

    nodes.forEach(addToIdMap);
    return map;
  }, []);

  const getColor = (): string => colorHandler.getValue(Math.floor(Math.random() * 4).toString());
  const getShortDesc = (label: string, value: number): string =>
    `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Value: ${value}`;

  const beforeOpenFunction = (event: ojMenu.ojBeforeOpen): void => {
    const target = event.detail.originalEvent.target as Element;

    if (target.id === 'sunburst1') {
      const [nodeId] = selectedItemsValue;
      nodeRef.current = nodeId ? idToItemMap[nodeId] ?? null : null;
      return;
    }

    const context = sunburstRef.current?.getContextByNode(target) as ojSunburst.NodeContext | null;

    if (context != null) {
      nodeRef.current = context.indexPath.reduce<{ nodes: MenuNode[] }>(
        (acc, cur) => ({ nodes: acc.nodes[cur]?.nodes ?? [] }),
        { nodes }
      ).nodes[0] ?? null;
    }
  };

  const menuItemAction = (event: ojMenu.ojMenuAction): void => {
    const text = String(event.detail.selectedValue);

    if (nodeRef.current) {
      setSelectedMenuItem(`${text} from ${nodeRef.current.label}`);
      nodeRef.current = null;
      return;
    }

    setSelectedMenuItem(`${text} from Sunburst background`);
  };

  const nodeTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-sunburst-node
      label={$current.data.label}
      value={$current.data.value}
      color={getColor()}
      shortDesc={getShortDesc($current.data.label, $current.data.value)}
    />
  );

  return (
    <div id="sunburst-container">
      <oj-sunburst
        ref={sunburstRef}
        id="sunburst1"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        selectionMode="single"
        onselectionChanged={(event: Parameters<NonNullable<ComponentProps<'oj-sunburst'>['onselectionChanged']>>[0]) =>
          setSelectedItemsValue((event.detail.value ?? []).map(String))
        }
        selection={selectedItemsValue}
        data={sunburstData}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
        <oj-menu
          slot="contextMenu"
          aria-label="Region Edit"
          onojMenuAction={menuItemAction}
          onojBeforeOpen={beforeOpenFunction}
        >
          <oj-option value="Action 1">Action 1</oj-option>
          <oj-option value="Action 2">Action 2</oj-option>
          <oj-option value="Action 3">Action 3</oj-option>
        </oj-menu>
      </oj-sunburst>
      <p>
        Last selected menu item:
        <span class="oj-typography-bold">{selectedMenuItem}</span>
      </p>
    </div>
  );
};

export default SunburstContextMenu;
