import { ComponentProps } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import GroupingDataProvider = require('ojs/ojgroupingdataprovider');
import { AllKeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojstreamlist';
import { StreamListElement } from 'ojs/ojstreamlist';
import 'ojs/ojtoolbar';
import 'css!./demo.css';

type DataStructure = 'flat' | 'group';
type FlatItem = {
  id: number;
  item: string;
};
type GroupedItem = {
  id: number | string;
  item: string;
  group: string;
};
type CurrentItem = FlatItem | GroupedItem;
type DataStructureChangedEvent = CustomEvent<{
  value: DataStructure | null;
  updatedFrom?: 'external' | 'internal';
}>;
type InputTextValueChangedEvent = CustomEvent<{
  value: string | null;
  updatedFrom?: 'external' | 'internal';
}>;
type StreamListData = NonNullable<ComponentProps<'oj-stream-list'>['data']>;

const initialFlatItems: FlatItem[] = [
  { id: 1, item: 'All-purpose flour' },
  { id: 2, item: 'Bread flour' },
  { id: 3, item: 'Cake flour' },
  { id: 4, item: 'Self-rising flour' },
  { id: 5, item: 'Cornmeal' },
  { id: 6, item: 'Cornstarch' },
  { id: 7, item: 'Baking soda ' },
  { id: 8, item: 'Baking powder' },
  { id: 9, item: 'Yeast' },
  { id: 10, item: 'Granulated sugar' },
  { id: 11, item: 'Brown sugar' },
  { id: 12, item: 'Powdered sugar' },
  { id: 13, item: 'Table salt' },
  { id: 14, item: 'Flaky sea salt' },
  { id: 15, item: 'Unsalted Butter' },
  { id: 16, item: 'Eggs' },
  { id: 17, item: 'Milk' },
  { id: 19, item: 'Vegetable Oil' }
];

const initialGroupedItems: GroupedItem[] = [
  { id: 1, item: 'All-purpose flour', group: 'Flours' },
  { id: 2, item: 'Bread flour', group: 'Flours' },
  { id: 3, item: 'Cake flour', group: 'Flours' },
  { id: 4, item: 'Self-rising flour', group: 'Flours' },
  { id: 5, item: 'Cornmeal', group: 'Flours' },
  { id: 6, item: 'Cornstarch', group: 'Flours' },
  { id: 7, item: 'Baking soda ', group: 'Leaveners' },
  { id: 8, item: 'Baking powder', group: 'Leaveners' },
  { id: 9, item: 'Yeast', group: 'Leaveners' },
  { id: 10, item: 'Granulated sugar', group: 'Sugars' },
  { id: 11, item: 'Brown sugar', group: 'Sugars' },
  { id: 12, item: 'Powdered sugar', group: 'Sugars' },
  { id: 13, item: 'Table salt', group: 'Salts' },
  { id: 14, item: 'Flaky sea salt', group: 'Salts' },
  { id: 15, item: 'Unsalted Butter', group: 'Dairy' },
  { id: 16, item: 'Eggs', group: 'Dairy' },
  { id: 17, item: 'Milk', group: 'Dairy' },
  { id: 19, item: 'Vegetable Oil', group: 'Fats' }
];

const isGroupedItem = (item: CurrentItem | null): item is GroupedItem =>
  item != null && 'group' in item;

export const StreamListMutations = () => {
  const [dataStructure, setDataStructure] = useState<DataStructure>('flat');
  const [currentItem, setCurrentItem] = useState<CurrentItem | null>(null);
  const [currentText, setCurrentText] = useState<string>('');
  const [lastItemId, setLastItemId] = useState<number>(100);
  const [newGroupId, setNewGroupId] = useState<number>(0);
  const [flatItems, setFlatItems] = useState<FlatItem[]>(initialFlatItems);
  const [groupedItems, setGroupedItems] = useState<GroupedItem[]>(initialGroupedItems);

  const [flatDataProvider] = useState(
    () => new MutableArrayDataProvider<number, FlatItem>(initialFlatItems, { keyAttributes: 'id' })
  );
  const [groupedBaseDataProvider] = useState(
    () =>
      new MutableArrayDataProvider<number | string, GroupedItem>(initialGroupedItems, {
        keyAttributes: 'id'
      })
  );

  const groupedDataProvider = useMemo(
    () =>
      new GroupingDataProvider(
        groupedBaseDataProvider as unknown as MutableArrayDataProvider<string, GroupedItem>,
        (itemA: GroupedItem, itemB: GroupedItem) => Number(itemA.id) > Number(itemB.id),
        ((key: string) => ({ id: key, item: key, group: key })) as unknown as (
          param0: string
        ) => GroupedItem,
        {
          keyAttributes: 'id',
          groupByStrategy: (item: GroupedItem) => [item.group]
        }
      ) as StreamListData,
    [groupedBaseDataProvider]
  );

  useEffect(() => {
    flatDataProvider.data = flatItems;
  }, [flatDataProvider, flatItems]);

  useEffect(() => {
    groupedBaseDataProvider.data = groupedItems;
  }, [groupedBaseDataProvider, groupedItems]);

  const expanded = useMemo(() => new AllKeySetImpl<string | number>(), []);
  const dataProvider: StreamListData =
    dataStructure === 'flat' ? flatDataProvider : groupedDataProvider;

  const handleDataStructureChanged = (event: DataStructureChangedEvent) => {
    if (event.detail.updatedFrom === 'external' || !event.detail.value) {
      return;
    }

    setDataStructure(event.detail.value);
    setCurrentItem(null);
  };

  const handleCurrentTextChanged = (event: InputTextValueChangedEvent) => {
    setCurrentText(event.detail.value ?? '');
  };

  const selectCurrentItem = (item: CurrentItem) => {
    setCurrentItem(item);
    setCurrentText(item.item);
  };

  const getCurrentFlatIndex = (key: number) => flatItems.findIndex((item) => item.id === key);
  const getCurrentGroupedIndex = (items: GroupedItem[], key: number | string) =>
    items.findIndex((item) => item.id === key);
  const getEndOfGroup = (items: GroupedItem[], group: string) => {
    const lastMatch = items.reduce(
      (index, item, itemIndex) => (item.group === group ? itemIndex : index),
      -1
    );

    return lastMatch === -1 ? items.length - 1 : lastMatch;
  };

  const createNewFlatItem = (itemText: string): FlatItem => ({
    id: lastItemId + 1,
    item: itemText
  });

  const addAtFlatIndex = (index: number) => {
    if (!currentText) {
      return;
    }

    const newItem = createNewFlatItem(currentText);
    setLastItemId((current) => current + 1);
    setFlatItems((current) => {
      const next = [...current];
      next.splice(index, 0, newItem);
      return next;
    });
  };

  const addBefore = () => {
    if (!currentItem || isGroupedItem(currentItem)) {
      return;
    }

    addAtFlatIndex(getCurrentFlatIndex(currentItem.id));
  };

  const addAfter = () => {
    if (!currentItem || isGroupedItem(currentItem)) {
      return;
    }

    addAtFlatIndex(getCurrentFlatIndex(currentItem.id) + 1);
  };

  const updateFlat = () => {
    if (!currentItem || isGroupedItem(currentItem)) {
      return;
    }

    setFlatItems((current) => {
      const index = current.findIndex((item) => item.id === currentItem.id);
      if (index === -1) {
        return current;
      }

      const next = [...current];
      next.splice(index, 1, { id: currentItem.id, item: currentText });
      return next;
    });
    setCurrentItem({ id: currentItem.id, item: currentText });
  };

  const removeFlat = () => {
    if (!currentItem || isGroupedItem(currentItem)) {
      return;
    }

    setFlatItems((current) => current.filter((item) => item.id !== currentItem.id));
    setCurrentItem(null);
  };

  const addToGroup = () => {
    if (!currentItem || !isGroupedItem(currentItem) || !currentText) {
      return;
    }

    const nextId = lastItemId + 1;
    setLastItemId(nextId);
    setGroupedItems((current) => {
      const index = getEndOfGroup(current, currentItem.group) + 1;
      const next = [...current];
      next.splice(index, 0, { id: nextId, item: currentText, group: currentItem.group });
      return next;
    });
  };

  const addNewGroup = () => {
    if (!currentItem || !isGroupedItem(currentItem) || !currentText) {
      return;
    }

    const nextId = lastItemId + 1;
    const nextGroupId = newGroupId + 1;
    setLastItemId(nextId);
    setNewGroupId(nextGroupId);
    setGroupedItems((current) => {
      const index = getEndOfGroup(current, currentItem.group);
      const next = [...current];
      next.splice(index, 0, {
        id: nextId,
        item: currentText,
        group: `New Group ${nextGroupId}`
      });
      return next;
    });
  };

  const removeGroup = () => {
    if (!currentItem || !isGroupedItem(currentItem) || String(currentItem.id) === currentItem.group) {
      return;
    }

    setGroupedItems((current) => current.filter((item) => item.id !== currentItem.id));
  };

  const updateGroup = () => {
    if (!currentItem || !isGroupedItem(currentItem) || String(currentItem.id) === currentItem.group) {
      return;
    }

    setGroupedItems((current) => {
      const index = getCurrentGroupedIndex(current, currentItem.id);
      if (index === -1) {
        return current;
      }

      const next = [...current];
      next.splice(index, 1, {
        id: currentItem.id,
        item: currentText,
        group: currentItem.group
      });
      return next;
    });
    setCurrentItem({
      id: currentItem.id,
      item: currentText,
      group: currentItem.group
    });
  };

  const renderGroupTemplate = (
    item: StreamListElement.GroupTemplateContext<string | number, GroupedItem>
  ) => (
    <div
      class="demo-stream-list-group oj-bg-neutral-30 oj-sm-margin-4x-top oj-sm-padding-2x-vertical oj-sm-padding-6x-horizontal oj-typography-bold"
      onClick={() =>
        selectCurrentItem({ id: item.data.item, item: item.data.item, group: item.data.item })
      }
      onFocusIn={() =>
        selectCurrentItem({ id: item.data.item, item: item.data.item, group: item.data.item })
      }
    >
      {item.data.item}
    </div>
  );

  const renderFlatItemTemplate = (
    item: StreamListElement.ItemTemplateContext<number, FlatItem>
  ) => (
    <div
      class="oj-sm-margin-4x-top oj-sm-padding-6x-horizontal"
      onClick={() => selectCurrentItem(item.data)}
      onFocusIn={() => selectCurrentItem(item.data)}
    >
      <span class="demo-stream-list-item-text">{item.data.item}</span>
    </div>
  );

  const renderGroupedItemTemplate = (
    item: StreamListElement.ItemTemplateContext<number | string, GroupedItem>
  ) => (
    <div
      class="oj-sm-margin-4x-top oj-sm-padding-6x-horizontal"
      onClick={() => selectCurrentItem(item.data)}
      onFocusIn={() => selectCurrentItem(item.data)}
    >
      <span class="demo-stream-list-item-text">{item.data.item}</span>
    </div>
  );

  const currentItemText =
    currentItem == null ? null : `id: ${String(currentItem.id)}, item: ${currentItem.item}`;
  const isGroupHeaderSelection =
    currentItem != null && isGroupedItem(currentItem) && String(currentItem.id) === currentItem.group;

  return (
    <div id="streamListContainer">
      <div class="oj-panel oj-bg-neutral-30">
        <oj-form-layout>
          <h2 id="h1" class="oj-typography-subheading-sm">
            Options To Control The Streamlist Below
          </h2>
          <oj-label>Data Structure</oj-label>
          <oj-buttonset-one
            id="dataStructureBtn"
            value={dataStructure}
            onvalueChanged={handleDataStructureChanged}
            class="oj-buttonset-width-auto"
          >
            <oj-option value="flat">Flat</oj-option>
            <oj-option value="group">Group</oj-option>
          </oj-buttonset-one>

          <oj-label for="currentItem">Current Item:</oj-label>
          <span id="currentItem">{currentItemText}</span>

          <oj-input-text
            id="inputItem"
            value={currentText}
            labelHint="item text"
            onvalueChanged={handleCurrentTextChanged}
          />

          <oj-toolbar aria-label="Mutations Toolbar" chroming="outlined">
            {dataStructure === 'flat' && (
              <>
                <oj-button onojAction={addAfter} id="addAfter" disabled={currentItem == null}>
                  Add After
                </oj-button>
                <oj-button onojAction={addBefore} id="addBefore" disabled={currentItem == null}>
                  Add before
                </oj-button>
                <oj-button onojAction={removeFlat} id="removeFlat" disabled={currentItem == null}>
                  Remove
                </oj-button>
                <oj-button onojAction={updateFlat} id="updateFlat" disabled={currentItem == null}>
                  Update
                </oj-button>
              </>
            )}
            {dataStructure === 'group' && (
              <>
                <oj-button onojAction={addToGroup} disabled={currentItem == null}>
                  Add To Group
                </oj-button>
                <oj-button onojAction={addNewGroup} disabled={currentItem == null}>
                  Add Group
                </oj-button>
                <oj-button onojAction={removeGroup} disabled={currentItem == null || isGroupHeaderSelection}>
                  Remove
                </oj-button>
                <oj-button onojAction={updateGroup} disabled={currentItem == null || isGroupHeaderSelection}>
                  Update
                </oj-button>
              </>
            )}
          </oj-toolbar>
        </oj-form-layout>
      </div>

      <oj-stream-list
        id="demostreamlist"
        class="demo-max-height"
        aria-label="stream list showing mutations"
        data={dataProvider}
        expanded={expanded}
      >
        {dataStructure === 'group' && <template slot="groupTemplate" render={renderGroupTemplate} />}
        <template
          slot="itemTemplate"
          render={dataStructure === 'flat' ? renderFlatItemTemplate : renderGroupedItemTemplate}
        />
      </oj-stream-list>
    </div>
  );
};

export default StreamListMutations;
