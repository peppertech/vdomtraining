import { h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { AllKeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojbutton';
import 'ojs/ojlistview';
import "css!./demo.css";

type ListItem = {
  id: string;
  label: string;
  children?: ListItem[];
};

type ItemTemplateContext = {
  leaf: boolean;
  data: ListItem;
};

const initialData: ListItem[] = [
  {
    id: 'group-1',
    label: 'Group 1',
    children: [
      { id: 'item-1-1', label: 'Item 1-1' },
      { id: 'item-1-2', label: 'Item 1-2' }
    ]
  },
  {
    id: 'group-2',
    label: 'Group 2',
    children: [
      { id: 'item-2-1', label: 'Item 2-1' },
      { id: 'item-2-2', label: 'Item 2-2' }
    ]
  }
];

const cloneData = (data: ListItem[]): ListItem[] =>
  data.map((item) => ({
    ...item,
    children: item.children ? cloneData(item.children) : undefined
  }));

const addItemToGroup = (data: ListItem[], groupId: string, newItem: ListItem): ListItem[] =>
  data.map((item) => {
    if (item.id === groupId) {
      return {
        ...item,
        children: [...(item.children ?? []), newItem]
      };
    }

    return item.children
      ? { ...item, children: addItemToGroup(item.children, groupId, newItem) }
      : item;
  });

const removeItem = (data: ListItem[], itemId: string): ListItem[] =>
  data.reduce<ListItem[]>((result, item) => {
    if (item.id === itemId) {
      return result;
    }

    result.push(
      item.children
        ? { ...item, children: removeItem(item.children, itemId) }
        : item
    );
    return result;
  }, []);

export const ListViewObservableNestedArrayListView = () => {
  const itemCounter = useRef(5);
  const [data, setData] = useState<ListItem[]>(() => cloneData(initialData));
  const expanded = useMemo(() => new AllKeySetImpl(), []);
  const dataProvider = useMemo(
    () => new ArrayTreeDataProvider<ListItem['id'], ListItem>(data, { keyAttributes: 'id' }),
    [data]
  );

  const handleAddItem = (groupId: string) => {
    itemCounter.current += 1;
    const newItem = {
      id: `item-new-${itemCounter.current}`,
      label: `New Item ${itemCounter.current}`
    };

    setData((currentData) => addItemToGroup(currentData, groupId, newItem));
  };

  const handleRemoveItem = (itemId: string) => {
    setData((currentData) => removeItem(currentData, itemId));
  };

  const renderItem = (item: ItemTemplateContext) => {
    if (item.leaf) {
      return (
        <div class="demo-item">
          <div class="oj-flex oj-sm-justify-content-space-between oj-sm-align-items-center">
            <span class="oj-typography-body-md oj-text-color-primary">
              {item.data.label}
            </span>
            <oj-button
              data-oj-clickthrough="disabled"
              id={`delete_${item.data.id}`}
              display="icons"
              chroming="borderless"
              label="Remove Item"
              onojAction={() => handleRemoveItem(item.data.id)}
            >
              <span slot="startIcon" class="oj-ux-ico-trash" />
            </oj-button>
          </div>
        </div>
      );
    }

    return (
      <div class="oj-flex oj-sm-justify-content-space-between oj-sm-align-items-center demo-group">
        <span>{item.data.label}</span>
        <oj-button
          class="oj-sm-margin-4x-end"
          data-oj-clickthrough="disabled"
          id={`add_${item.data.id}`}
          display="icons"
          chroming="borderless"
          label="Add Item"
          onojAction={() => handleAddItem(item.data.id)}
        >
          <span slot="startIcon" class="oj-ux-ico-plus-circle" />
        </oj-button>
      </div>
    );
  };

  return (
    <oj-list-view
      id="listview"
      aria-label="list using nested observable array"
      data={dataProvider}
      expanded={expanded}
      group-header-position="static"
    >
      <template slot="itemTemplate" render={renderItem} />
    </oj-list-view>
  );
};

export default ListViewObservableNestedArrayListView;
