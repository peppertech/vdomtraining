import 'css!./demo.css';
import 'ojs/ojbutton';
import { KeySet,KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import { ojListView } from 'ojs/ojlistview';
import 'ojs/ojswitch';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface ItemData {
  id: string;
  title: string;
  date: string;
}

type ScrollPosition = {
  x?: number;
  y?: number;
  index?: number;
  key?: string;
  offsetX?: number;
  offsetY?: number;
};
type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type SelectedKeySet = KeySet<ItemData['id']>;
type SwitchValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0];

const createItems = (count: number): ItemData[] =>
  Array.from({ length: count }, (_unused, index) => ({
    id: `i${index}`,
    title: `Note item ${index + 1}`,
    date: '1/1/20'
  }));

const formatScrollValue = (value?: number) => value ?? 0;

export const ListViewScrollPosListView = () => {
  const initialItems = useMemo(() => createItems(200), []);
  const [items, setItems] = useState<ItemData[]>(initialItems);
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ index: 25 });
  const [scrollToKey, setScrollToKey] = useState<'capability' | 'never'>('capability');
  const [selectedItems, setSelectedItems] = useState<SelectedKeySet>(
    () => new KeySetImpl<ItemData['id']>().add(['i25'])
  );

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<ItemData['id'], ItemData>(items, {
        keyAttributes: 'id'
      }),
    [items]
  );

  const handleScrollPositionChanged = (event: PropertyChangedEvent<ScrollPosition>) => {
    setScrollPosition(event.detail.value ?? {});
  };

  const handleScrollToSelectedChanged = (event: SwitchValueChangedEvent) => {
    setScrollToKey(event.detail.value ? 'capability' : 'never');
  };

  const handleSelectedChanged = (event: ojListView.selectedChanged<ItemData['id'], ItemData>) => {
    setSelectedItems(event.detail.value as SelectedKeySet);
  };

  const reverse = () => {
    setItems((current) => current.slice().reverse());
  };

  return (
    <div id="listview-container">
      <p class="demo-scroll-position-instructions">
        Select an item and hit the Reverse button to refresh ListView with data reversed. If scrollByKey
        behavior is set to 'capability' then ListView should scroll to the selected item.
      </p>
      <div class="oj-panel oj-bg-neutral-30 demo-scroll-position-panel">
        <oj-switch
          id="switch"
          value={scrollToKey === 'capability'}
          labelHint="Scroll to selected"
          onvalueChanged={handleScrollToSelectedChanged}
        />
      </div>
      <oj-button id="reverseButton" class="demo-reverse-button" onojAction={reverse}>
        Reverse
      </oj-button>
      <oj-list-view
        id="listview"
        aria-label="list view scroll position"
        class="demo-list oj-listview-item-padding-off"
        data={dataProvider}
        selection-mode="single"
        scrollPolicy="loadMoreOnScroll"
        scrollPosition={scrollPosition}
        scrollToKey={scrollToKey}
        selected={selectedItems}
        onscrollPositionChanged={handleScrollPositionChanged}
        onselectedChanged={handleSelectedChanged}
        {...{ 'item.enter-key-focus-behavior': 'focusWithin', 'scroll-policy-options.fetch-size': '25' }}
      >
        <template
          slot="itemTemplate"
          render={(item) => (
            <div class="demo-note-item">
              <span>{item.data.title}</span>
              <span>{item.data.date}</span>
            </div>
          )}
        />
      </oj-list-view>
      <div class="demo-scroll-position-status" aria-live="polite">
        <span>
          Current scroll position: x: {formatScrollValue(scrollPosition.x)} y:{' '}
          {formatScrollValue(scrollPosition.y)} key: {scrollPosition.key ?? 'None'} index:{' '}
          {formatScrollValue(scrollPosition.index)} offsetX: {formatScrollValue(scrollPosition.offsetX)}{' '}
          offsetY: {formatScrollValue(scrollPosition.offsetY)}
        </span>
      </div>
    </div>
  );
};

export default ListViewScrollPosListView;
