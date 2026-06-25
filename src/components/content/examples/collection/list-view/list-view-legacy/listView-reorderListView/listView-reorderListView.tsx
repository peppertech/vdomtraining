import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ojListView } from 'ojs/ojlistview';
import { ojMenu } from 'ojs/ojmenu';
import 'css!./demo.css';
import 'ojs/ojactioncard';
import 'ojs/ojavatar';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import 'ojs/ojmenu';
import 'ojs/ojoption';
import 'ojs/ojswitch';

type FileNode = {
  id: string;
  name: string;
  modified?: string;
  type?: 'pdf' | 'xls' | 'ppt' | 'doc';
  children?: FileNode[];
};

type ItemTemplateContext = ojListView.ItemContext<FileNode['id'], FileNode>;
type AvatarBackground = NonNullable<ComponentProps<'oj-avatar'>['background']>;
type LayoutMode = 'list' | 'card';
type SwitchValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0];
type ButtonsetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>
>[0];
type MenuBeforeOpenEvent = ojMenu.ojBeforeOpen;
type MenuActionEvent = ojMenu.ojMenuAction;
type CurrentItemChangedEvent = CustomEvent<{ value?: FileNode['id'] | null }>;

type ItemInfo = {
  arr: FileNode[];
  index: number;
  leaf: boolean;
};

const INITIAL_DATA: FileNode[] = [
  {
    id: 'public',
    name: 'Public',
    children: [
      {
        id: 'f5',
        name: 'Letter to Parents - Kindergarden',
        modified: '05/12/2014',
        type: 'doc'
      },
      {
        id: 'f1',
        name: 'Christmas Planning',
        modified: '12/11/2014',
        type: 'xls'
      }
    ]
  },
  {
    id: 'private',
    name: 'Private',
    children: [
      {
        id: 'f2',
        name: 'Budget (2014)',
        modified: '1/1/2014',
        type: 'xls'
      },
      {
        id: 'f3',
        name: 'New Year KK',
        modified: '12/27/2014',
        type: 'xls'
      },
      {
        id: 'f4',
        name: 'Waiver For Grant Street Garage',
        modified: '12/12/2014',
        type: 'doc'
      },
      {
        id: 'f6',
        name: 'Inspection Report',
        modified: '11/10/2014',
        type: 'pdf'
      }
    ]
  },
  {
    id: 'work',
    name: 'Work',
    children: [
      {
        id: 'f7',
        name: 'Patent Declaration (Signed Copy)',
        modified: '03/04/2015',
        type: 'pdf'
      },
      {
        id: 'f8',
        name: 'Presentation - Openworld 2014',
        modified: '10/04/2014',
        type: 'ppt'
      }
    ]
  }
];

const layoutViewRadios = [
  {
    id: 'card',
    icon: 'oj-ux-ico-grid-view-small'
  },
  {
    id: 'list',
    icon: 'oj-ux-ico-list-round'
  }
];

const cloneNodes = (nodes: FileNode[]): FileNode[] =>
  nodes.map((node) => ({
    ...node,
    children: node.children ? cloneNodes(node.children) : undefined
  }));

const findItem = (nodes: FileNode[], id: string): ItemInfo | null => {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];

    if (node.id === id) {
      return {
        arr: nodes,
        index,
        leaf: node.children == null
      };
    }

    if (node.children) {
      const result = findItem(node.children, id);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

const findNode = (nodes: FileNode[], id: string | null) => {
  if (id == null) {
    return null;
  }

  const itemInfo = findItem(nodes, id);
  return itemInfo ? itemInfo.arr[itemInfo.index] : null;
};

const getIconColor = (type: FileNode['type']): AvatarBackground => {
  switch (type) {
    case 'pdf':
      return 'red';
    case 'xls':
      return 'green';
    case 'ppt':
      return 'purple';
    case 'doc':
      return 'teal';
    default:
      return 'neutral';
  }
};

const getIconClass = (type: FileNode['type']) => {
  switch (type) {
    case 'pdf':
      return 'oj-ux-ico-file-pdf';
    case 'xls':
      return 'oj-ux-ico-file-spreadsheet';
    case 'ppt':
      return 'oj-ux-ico-file-presentation';
    case 'doc':
      return 'oj-ux-ico-file-doc';
    default:
      return 'oj-ux-ico-file';
  }
};

export const ListViewReorderListView = () => {
  const listViewRef = useRef<ojListView<FileNode['id'], FileNode> | null>(null);
  const [data, setData] = useState<FileNode[]>(() => cloneNodes(INITIAL_DATA));
  const [currentItem, setCurrentItem] = useState<FileNode['id'] | null>(null);
  const [cutItem, setCutItem] = useState<FileNode['id'] | null>(null);
  const [disablePasteIntoFolder, setDisablePasteIntoFolder] = useState(true);
  const [activeLayout, setActiveLayout] = useState<LayoutMode>('list');

  const dataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider<FileNode['id'], FileNode>(data, {
        keyAttributes: 'id'
      }),
    [data]
  );
  const currentNode = findNode(data, currentItem);
  const isCurrentLeaf = currentNode?.children == null;

  const reorderItem = (
    sourceKey: FileNode['id'] | null,
    destinationKey: FileNode['id'] | null,
    position: 'before' | 'after' | 'inside'
  ) => {
    if (sourceKey == null || destinationKey == null || sourceKey === destinationKey) {
      return;
    }

    const nextData = cloneNodes(data);
    const destinationInfo = findItem(nextData, destinationKey);

    if (!destinationInfo || (disablePasteIntoFolder && !destinationInfo.leaf)) {
      return;
    }

    const sourceInfo = findItem(nextData, sourceKey);
    if (!sourceInfo) {
      return;
    }

    const [sourceData] = sourceInfo.arr.splice(sourceInfo.index, 1);
    const updatedDestinationInfo = findItem(nextData, destinationKey);

    if (!updatedDestinationInfo || !sourceData) {
      return;
    }

    if (position === 'inside') {
      const destinationNode = updatedDestinationInfo.arr[updatedDestinationInfo.index];
      destinationNode.children = destinationNode.children ?? [];
      destinationNode.children.push(sourceData);
    } else {
      const insertIndex =
        position === 'after' ? updatedDestinationInfo.index + 1 : updatedDestinationInfo.index;
      updatedDestinationInfo.arr.splice(insertIndex, 0, sourceData);
    }

    setData(nextData);
    setCutItem(null);
  };

  const handleMenuBeforeOpen = (event: MenuBeforeOpenEvent) => {
    const launcher = event.detail.openOptions.launcher;
    const target = launcher instanceof Element ? launcher : null;

    if (target instanceof Element && target.classList.contains('oj-listview-drag-handle')) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    if (event.key === 'x') {
      setCutItem(currentItem);
      event.preventDefault();
    } else if (event.key === 'v') {
      reorderItem(cutItem, currentItem, 'after');
      event.preventDefault();
    }
  };

  const handleMenuAction = (event: MenuActionEvent) => {
    const value = event.detail.selectedValue as 'cut' | 'before' | 'after' | 'inside';

    if (value === 'cut') {
      setCutItem(currentItem);
    } else {
      reorderItem(cutItem, currentItem, value);
    }
  };

  const handleDragOver = (event: DragEvent, context: { item: HTMLElement }) => {
    if (!disablePasteIntoFolder || !context.item.classList.contains('folder')) {
      event.preventDefault();
    }
  };

  const handleReorder = (event: ojListView.ojReorder) => {
    if (event.detail.items.length === 0) {
      return;
    }

    const source = listViewRef.current?.getContextByNode(event.detail.items[0]);
    const destination = listViewRef.current?.getContextByNode(event.detail.reference);

    reorderItem(
      source?.key ?? null,
      destination?.key ?? null,
      event.detail.position as 'before' | 'after' | 'inside'
    );
  };

  const handleDisablePasteIntoFolderChanged = (event: SwitchValueChangedEvent) => {
    setDisablePasteIntoFolder(event.detail.value ?? true);
  };

  const handleActiveLayoutChanged = (event: ButtonsetValueChangedEvent) => {
    setActiveLayout((event.detail.value as LayoutMode | null) ?? 'list');
  };

  const handleCurrentItemChanged = (event: CurrentItemChangedEvent) => {
    setCurrentItem(event.detail.value ?? null);
  };

  const renderFileListItem = (item: ItemTemplateContext) => (
    <li class={cutItem === item.key ? 'demo-cut-item' : ''}>
      <oj-list-item-layout>
        <span class="oj-typography-body-md oj-text-color-primary">{item.data.name}</span>
        <oj-avatar
          slot="leading"
          background={getIconColor(item.data.type)}
          size="xs"
          icon-class={getIconClass(item.data.type)}
          role="img"
          aria-label="Circular icon with type icon"
          shape="circle"
        />
        <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
          Last modified on {item.data.modified}
        </span>
        <div
          id={`${item.key}_draghandle`}
          slot="action"
          role="presentation"
          class="oj-sm-align-self-center oj-sm-margin-4x-horizontal oj-listview-drag-handle"
        />
      </oj-list-item-layout>
    </li>
  );

  const renderFileCardItem = (item: ItemTemplateContext) => (
    <li
      class={`demo-card oj-panel${cutItem === item.key ? ' demo-cut-item' : ''}`}
    >
      <div class="demo-card-header">
        <oj-avatar
          background={getIconColor(item.data.type)}
          size="xs"
          icon-class={getIconClass(item.data.type)}
          role="img"
          aria-label="Circular icon with type icon"
          shape="circle"
        />
        <div
          role="presentation"
          class="oj-listview-drag-handle demo-card-drag-handle"
        />
      </div>
      <div class="demo-card-title">
        <strong>{item.data.name}</strong>
      </div>
    </li>
  );

  const renderItem = (item: ItemTemplateContext) => {
    if (!item.leaf) {
      return (
        <li class="folder">
          <span>{item.data.name}</span>
        </li>
      );
    }

    return activeLayout === 'list' ? renderFileListItem(item) : renderFileCardItem(item);
  };

  return (
    <div id="listviewContainer">
      <div class="oj-flex-bar">
        <div class="oj-flex-bar-start oj-sm-align-items-center">
          <oj-switch
            id="switch"
            value={disablePasteIntoFolder}
            labelHint="Disable drop into folder"
            labelEdge="inside"
            onvalueChanged={handleDisablePasteIntoFolderChanged}
          />
        </div>

        <oj-buttonset-one
          id="layoutView"
          display="icons"
          value={activeLayout}
          chroming="borderless"
          class="oj-flex-bar-end"
          aria-label="Choose layout view."
          onvalueChanged={handleActiveLayoutChanged}
        >
          {layoutViewRadios.map((layout) => (
            <oj-option key={layout.id} value={layout.id} id={layout.id}>
              <span slot="startIcon" class={layout.icon} />
              <span>{layout.id}</span>
            </oj-option>
          ))}
        </oj-buttonset-one>
      </div>

      <oj-list-view
        ref={listViewRef}
        id="listview"
        aria-label="reorderable list using json data"
        class={`demo-reorder-listview oj-sm-padding-1x oj-listview-item-padding-off ${
          activeLayout === 'card' ? 'demo-reorder-listview-card' : 'demo-reorder-listview-list'
        }`}
        data={dataProvider}
        currentItem={currentItem ?? undefined}
        drillMode="none"
        display={activeLayout}
        groupHeaderPosition="static"
        oncurrentItemChanged={handleCurrentItemChanged}
        onKeyDown={handleKeyDown}
        onojReorder={handleReorder}
        {...{
          'dnd.reorder.items': 'enabled',
          'dnd.drop.items.drag-over': handleDragOver,
          'item.enter-key-focus-behavior': 'focusWithin'
        }}
      >
        <oj-menu
          id="itemMenu"
          slot="contextMenu"
          aria-label="Item Reorder"
          onojBeforeOpen={handleMenuBeforeOpen}
          onojMenuAction={handleMenuAction}
        >
          <oj-option id="cut" value="cut">
            Cut
          </oj-option>
          {isCurrentLeaf ? (
            <>
              <oj-option id="pasteBefore" value="before" disabled={cutItem === null}>
                Paste Before
              </oj-option>
              <oj-option id="pasteAfter" value="after" disabled={cutItem === null}>
                Paste After
              </oj-option>
            </>
          ) : (
            <oj-option id="paste" value="inside" disabled={cutItem === null}>
              Paste
            </oj-option>
          )}
        </oj-menu>
        <template slot="itemTemplate" render={renderItem} />
      </oj-list-view>
    </div>
  );
};

export default ListViewReorderListView;
