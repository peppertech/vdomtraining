import "oj-c/button";
import "oj-c/input-text";
import "oj-c/list-item-layout";
import "oj-c/list-view";
import type { CListViewElement } from "oj-c/list-view";
import "ojs/ojformlayout";
import type { ImmutableKeySet } from "ojs/ojkeyset";
import { KeySetImpl } from "ojs/ojkeyset";
import type { ComponentProps } from "preact";
import { useMemo,useRef,useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

interface GroceryItem {
  id: number;
  item: string;
}

type InputTextValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-input-text">["onvalueChanged"]>
>[0];
type CurrentItemChangedEvent = CListViewElement.currentItemChanged<GroceryItem["id"], GroceryItem>;
type ItemTemplateContext = CListViewElement.ItemTemplateContext<GroceryItem["id"], GroceryItem>;
type SelectedChangedEvent = CListViewElement.selectedChanged<GroceryItem["id"], GroceryItem>;

const INITIAL_ITEMS: GroceryItem[] = [
  { id: 1, item: "Milk" },
  { id: 2, item: "Flour" },
  { id: 3, item: "Sugar" },
  { id: 4, item: "Vanilla Extract" }
];

const renderItem = (context: ItemTemplateContext) => (
  <oj-c-list-item-layout>
    <span>{context.data.item}</span>
  </oj-c-list-item-layout>
);

const getSelectedIds = (
  items: GroceryItem[],
  selectedItems: ImmutableKeySet<GroceryItem["id"]>
): GroceryItem["id"][] => items.filter(({ id }) => selectedItems.has(id)).map(({ id }) => id);

export const ListViewCrudcorepack = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [currentItem, setCurrentItem] = useState("");
  const [currentItemId, setCurrentItemId] = useState<GroceryItem["id"] | null>(null);
  const [selectedItems, setSelectedItems] = useState<ImmutableKeySet<GroceryItem["id"]>>(
    new KeySetImpl<GroceryItem["id"]>()
  );
  const nextIdRef = useRef(Math.max(...INITIAL_ITEMS.map(({ id }) => id)) + 1);

  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<GroceryItem["id"], GroceryItem>(items, {
        keyAttributes: "id"
      }),
    [items]
  );

  const selectedIds = getSelectedIds(items, selectedItems);
  const isTextEmpty = currentItem.trim().length === 0;
  const hasSelection = selectedIds.length > 0;

  const handleCurrentItemChanged = (event: CurrentItemChangedEvent) => {
    const nextCurrentItemId = event.detail.value ?? null;
    setCurrentItemId(nextCurrentItemId);
    if (nextCurrentItemId == null) {
      return;
    }

    const matchingItem = items.find(({ id }) => id === nextCurrentItemId);
    if (matchingItem != null) {
      setCurrentItem(matchingItem.item);
    }
  };

  const handleCurrentItemValueChanged = (event: InputTextValueChangedEvent) => {
    setCurrentItem(event.detail.value ?? "");
  };

  const handleSelectedChanged = (event: SelectedChangedEvent) => {
    setSelectedItems(event.detail.value ?? new KeySetImpl<GroceryItem["id"]>());
  };

  const handleAdd = () => {
    const nextValue = currentItem.trim();
    if (nextValue.length === 0) {
      return;
    }

    const nextItem = { id: nextIdRef.current, item: nextValue };
    nextIdRef.current += 1;
    setItems((currentItems) => [...currentItems, nextItem]);
    setCurrentItem("");
    setCurrentItemId(nextItem.id);
  };

  const handleUpdate = () => {
    const nextValue = currentItem.trim();
    const targetItemId = currentItemId ?? selectedIds[0] ?? null;
    if (nextValue.length === 0 || targetItemId == null) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === targetItemId ? { ...item, item: nextValue } : item))
    );
  };

  const handleRemove = () => {
    if (!hasSelection) {
      return;
    }

    setItems((currentItems) => currentItems.filter(({ id }) => !selectedItems.has(id)));
    setSelectedItems(new KeySetImpl<GroceryItem["id"]>());
    setCurrentItem("");
    setCurrentItemId(null);
  };

  return (
    <div id="listViewContainer">
      <p>
        Enter a value in the text box, then click "Add" to add a new item to the end, or "Update"
        to update the value of the focused selected item.
      </p>
      <p>Click "Remove" to remove the selected item.</p>
      <oj-form-layout max-columns={2} direction="row">
        <oj-c-input-text
          id="inputItem"
          value={currentItem}
          labelHint="Enter a value here"
          onvalueChanged={handleCurrentItemValueChanged}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <oj-c-button
            id="addButton"
            size="lg"
            onojAction={handleAdd}
            disabled={isTextEmpty}
            label="Add"
          />
          <oj-c-button
            id="updateButton"
            size="lg"
            onojAction={handleUpdate}
            disabled={isTextEmpty || !hasSelection}
            label="Update"
          />
          <oj-c-button
            id="removeButton"
            size="lg"
            onojAction={handleRemove}
            disabled={!hasSelection}
            label="Remove"
          />
        </div>
      </oj-form-layout>
      <oj-c-list-view
        id="listview"
        aria-label="List using mutable array data provider"
        data={dataProvider}
        selectionMode="multiple"
        selected={selectedItems}
        onselectedChanged={handleSelectedChanged}
        oncurrentItemChanged={handleCurrentItemChanged}
      >
        <template slot="itemTemplate" render={renderItem} />
      </oj-c-list-view>
    </div>
  );
};

export default ListViewCrudcorepack;
