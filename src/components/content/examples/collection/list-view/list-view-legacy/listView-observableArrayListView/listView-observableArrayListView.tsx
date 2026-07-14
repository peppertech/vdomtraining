import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import { inputBase,ojInputText } from 'ojs/ojinputtext';
import { KeySet,KeySetImpl,type ImmutableKeySet } from 'ojs/ojkeyset';
import 'ojs/ojlistview';
import { ojListView } from 'ojs/ojlistview';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ItemData = {
  id: number;
  item: string;
};

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type SelectedItems = KeySet<ItemData['id']>;

const getSelectedValues = (selection: SelectedItems): Set<ItemData['id']> => {
  const keySet = selection as ImmutableKeySet<ItemData['id']>;
  return keySet.keys.all ? new Set() : new Set(Array.from(keySet.keys.keys.values()));
};

const initialItems: ItemData[] = [
  { id: 1, item: 'Milk' },
  { id: 2, item: 'Flour' },
  { id: 3, item: 'Sugar' },
  { id: 4, item: 'Vanilla Extract' }
];

export const ListViewObservableArrayListView = () => {
  const [currentItem, setCurrentItem] = useState('');
  const [allItems, setAllItems] = useState<ItemData[]>(initialItems);
  const [selectedItems, setSelectedItems] = useState<SelectedItems>(
    new KeySetImpl([]) as SelectedItems
  );
  const [isTextEmpty, setIsTextEmpty] = useState(true);
  const nextItemIdRef = useRef(initialItems.length + 1);

  const dataProvider = useMemo(
    () => new ArrayDataProvider<ItemData['id'], ItemData>(allItems, { keyAttributes: 'id' }),
    [allItems]
  );

  const selectedValues = getSelectedValues(selectedItems);
  const isSelectionEmpty = selectedValues.size === 0;
  const isTextOrSelectionEmpty = isTextEmpty || isSelectionEmpty;

  const clearForm = () => {
    setCurrentItem('');
    setIsTextEmpty(true);
  };

  const handleCurrentItemValueChanged = (event: PropertyChangedEvent<string>) => {
    setCurrentItem(event.detail.value ?? '');
  };

  const handleRawValueChanged = (event: inputBase.rawValueChanged<string, ojInputText>) => {
    const value = event.detail.value ?? '';
    setIsTextEmpty(value.trim().length === 0);
  };

  const addItem = () => {
    const itemToAdd = currentItem.trim();
    if (itemToAdd === '') {
      return;
    }

    const id = nextItemIdRef.current++;
    setAllItems((items) => [...items, { id, item: itemToAdd }]);
    clearForm();
  };

  const updateSelected = () => {
    const key = Array.from(selectedValues)[0];
    if (key == null) {
      return;
    }

    setAllItems((items) =>
      items.map((item) => (item.id === key ? { ...item, item: currentItem } : item))
    );
    clearForm();
  };

  const removeSelected = () => {
    const keys = new Set(selectedValues);
    setAllItems((items) => items.filter((item) => !keys.has(item.id)));
    setSelectedItems(new KeySetImpl([]) as SelectedItems);
    clearForm();
  };

  const handleSelectedChanged = (
    event: ojListView.selectedChanged<ItemData['id'], ItemData>
  ) => {
    const nextSelection = event.detail.value as SelectedItems;
    setSelectedItems(nextSelection);
    const key = Array.from(getSelectedValues(nextSelection))[0];
    const selectedItem = allItems.find((item) => item.id === key);
    if (selectedItem) {
      setCurrentItem(selectedItem.item);
      setIsTextEmpty(selectedItem.item.trim().length === 0);
    }
  };

  return (
    <div id="listViewContainer">
      <p>
        Enter a value in the text box, then click "Add" to add a new item to the end, or
        "Update" to update the value of the selected item.
      </p>
      <p>Click "Remove" to remove the selected item.</p>
      <oj-form-layout max-columns="2" direction="row">
        <oj-input-text
          id="inputItem"
          onvalueChanged={handleCurrentItemValueChanged}
          value={currentItem}
          label-hint="Enter a value here"
          onrawValueChanged={handleRawValueChanged}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <oj-button id="addButton" class="oj-button-lg" onojAction={addItem} disabled={isTextEmpty}>
            Add
          </oj-button>
          <oj-button
            id="updateButton"
            class="oj-button-lg"
            onojAction={updateSelected}
            disabled={isTextOrSelectionEmpty}
          >
            Update
          </oj-button>
          <oj-button
            id="removeButton"
            class="oj-button-lg"
            onojAction={removeSelected}
            disabled={isSelectionEmpty}
          >
            Remove
          </oj-button>
        </div>
      </oj-form-layout>
      <oj-list-view
        id="listview"
        aria-label="list using observable array"
        data={dataProvider}
        selection-mode="multiple"
        selected={selectedItems}
        onselectedChanged={handleSelectedChanged}
        {...{ 'item.enter-key-focus-behavior': 'focusWithin' }}
      >
        <template
          slot="itemTemplate"
          render={(item: ojListView.ItemTemplateContext<ItemData['id'], ItemData>) => (
            <span>{item.data.item}</span>
          )}
        />
      </oj-list-view>
    </div>
  );
};

export default ListViewObservableArrayListView;
