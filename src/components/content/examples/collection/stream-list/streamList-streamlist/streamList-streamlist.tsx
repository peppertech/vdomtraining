import { ComponentProps } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import * as pastDataText from 'text!./pastData.json';
import * as pendingDataText from 'text!./pendingData.json';
import * as pinnedDataText from 'text!./pinnedData.json';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import GroupingDataProvider = require('ojs/ojgroupingdataprovider');
import { AllKeySetImpl } from 'ojs/ojkeyset';
import type TreeDataProvider = require('ojs/ojtreedataprovider');
import 'ojs/ojcollapsible';
import type { ojCollapsible } from 'ojs/ojcollapsible';
import 'ojs/ojstreamlist';
import type { StreamListElement } from 'ojs/ojstreamlist';
import '../../../../../jet-composites/demo-activity-stream/demo-activity-stream-item/loader';
import DemoDelayingDataProvider from '../../shared/DemoDelayingDataProvider';
import DemoDelayingTreeDataProvider from '../../shared/DemoDelayingTreeDataProvider';
import 'css!./demo.css';

type StreamId = number;
type StreamEvent = {
  id: number;
  event: string;
};
type StreamItem = {
  id: StreamId;
  date: number;
  label: string;
  type: 'Ping' | 'Call' | 'Send' | 'Followup';
  events: StreamEvent[];
};
type StreamGroup = {
  id: string;
  value: string;
};
type SuggestedAction = {
  id: string;
  label: string;
  type: 'Suggestion';
  eventsData: StreamEvent[];
};
type StreamNodeKey = string | number;
type StreamNodeData = StreamItem | StreamGroup;
type StreamSection = 'pending' | 'pinned' | 'past' | 'suggestion';
type StreamScrollPosition = NonNullable<ComponentProps<'oj-stream-list'>['scrollPosition']>;
type StreamActionEvent = CustomEvent<{
  itemContext: StreamListElement.ItemTemplateContext<StreamId, StreamItem>;
  section: StreamSection;
}>;

const PENDING_DATA_DELAY = 3000;
const SUGGESTED_ACTION_DELAY = 1000;
const PINNED_DATA_DELAY = 4000;
const PAST_DATA_DELAY = 500;
const NOW = 1563414680000;

const initialPendingData = JSON.parse(pendingDataText) as StreamItem[];
const initialPinnedData = JSON.parse(pinnedDataText) as StreamItem[];
const initialPastData = JSON.parse(pastDataText) as StreamItem[];
const initialSuggestedQueue: SuggestedAction[] = [
  {
    id: 'action1',
    label: 'Discuss possible opportunities with Carlos',
    type: 'Suggestion',
    eventsData: [{ id: 0, event: 'Porta nibh venenatis cras sed felis eget velit aliquet sagittis' }]
  },
  {
    id: 'action2',
    label: 'Suggested Action 2',
    type: 'Suggestion',
    eventsData: [{ id: 0, event: 'Porta nibh venenatis cras sed felis eget velit aliquet sagittis' }]
  },
  {
    id: 'action3',
    label: 'Suggested Action 3',
    type: 'Suggestion',
    eventsData: [{ id: 0, event: 'Porta nibh venenatis cras sed felis eget velit aliquet sagittis' }]
  },
  {
    id: 'action4',
    label: 'Suggested Action 4',
    type: 'Suggestion',
    eventsData: [{ id: 0, event: 'Porta nibh venenatis cras sed felis eget velit aliquet sagittis' }]
  },
  {
    id: 'action5',
    label: 'Suggested Action 5',
    type: 'Suggestion',
    eventsData: [{ id: 0, event: 'Porta nibh venenatis cras sed felis eget velit aliquet sagittis' }]
  }
];

const sortByDateDescending = (items: StreamItem[]) =>
  [...items].sort((itemA, itemB) => itemB.date - itemA.date);

const dateGroupingStrategy = (data: StreamItem): string[] => {
  const date = new Date(data.date).getTime();

  if (new Date(2019, 6, 17).getTime() <= date && date < new Date(2019, 6, 18).getTime()) {
    return ['Today, July 17'];
  }

  if (new Date(2019, 6, 16).getTime() <= date && date < new Date(2019, 6, 17).getTime()) {
    return ['Yesterday, July 16'];
  }

  if (new Date(2019, 6, 15).getTime() <= date && date < new Date(2019, 6, 16).getTime()) {
    return ['Tuesday, July 15'];
  }

  if (new Date(2019, 6, 14).getTime() <= date && date < new Date(2019, 6, 15).getTime()) {
    return ['Monday, July 14'];
  }

  if (new Date(2019, 6, 1).getTime() <= date && date < new Date(2019, 6, 12).getTime()) {
    return ['July 1-12'];
  }

  if (new Date(2019, 5, 1).getTime() <= date && date < new Date(2019, 5, 30).getTime()) {
    return ['June 2019'];
  }

  if (new Date(2019, 4, 1).getTime() <= date && date < new Date(2019, 4, 31).getTime()) {
    return ['May 2019'];
  }

  return ['Tomorrow'];
};

const insertSorted = (items: StreamItem[], item: StreamItem): StreamItem[] => {
  if (items.some((existingItem) => existingItem.id === item.id)) {
    return items;
  }

  return sortByDateDescending([...items, item]);
};

const removeById = (items: StreamItem[], id: StreamId) => items.filter((item) => item.id !== id);

const renderGroupHeader = (
  item: StreamListElement.GroupTemplateContext<StreamNodeKey, StreamNodeData>
) => (
  <div class="demo-stream-list-group oj-bg-neutral-30 oj-sm-margin-4x-top oj-sm-padding-2x-vertical oj-sm-padding-6x-horizontal oj-typography-bold">
    {(item.data as StreamGroup).value}
  </div>
);

export const StreamListStreamlist = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scroller, setScroller] = useState<HTMLDivElement | null>(null);
  const [pendingExpanded, setPendingExpanded] = useState<boolean>(true);
  const [pinnedExpanded, setPinnedExpanded] = useState<boolean>(false);
  const [pendingItems, setPendingItems] = useState<StreamItem[]>(initialPendingData);
  const [pinnedItems, setPinnedItems] = useState<StreamItem[]>(initialPinnedData);
  const [pastItems, setPastItems] = useState<StreamItem[]>(initialPastData);
  const [suggestedItems, setSuggestedItems] = useState<SuggestedAction[]>(
    initialSuggestedQueue.slice(0, 1)
  );
  const [suggestedQueue, setSuggestedQueue] = useState<SuggestedAction[]>(
    initialSuggestedQueue.slice(1)
  );

  const [pendingBaseDataProvider] = useState(
    () => new MutableArrayDataProvider<StreamId, StreamItem>(initialPendingData, { keyAttributes: 'id' })
  );
  const [pinnedBaseDataProvider] = useState(
    () => new MutableArrayDataProvider<StreamId, StreamItem>(initialPinnedData, { keyAttributes: 'id' })
  );
  const [pastBaseDataProvider] = useState(
    () => new MutableArrayDataProvider<StreamId, StreamItem>(initialPastData, { keyAttributes: 'id' })
  );
  const [suggestedBaseDataProvider] = useState(
    () =>
      new MutableArrayDataProvider<string, SuggestedAction>(initialSuggestedQueue.slice(0, 1), {
        keyAttributes: 'id'
      })
  );

  const [pendingDataProvider] = useState(
    () => new DemoDelayingDataProvider<StreamId, StreamItem>(pendingBaseDataProvider, PENDING_DATA_DELAY)
  );
  const [pinnedDataProvider] = useState(
    () => new DemoDelayingDataProvider<StreamId, StreamItem>(pinnedBaseDataProvider, PINNED_DATA_DELAY)
  );
  const [suggestedActionDataProvider] = useState(
    () =>
      new DemoDelayingDataProvider<string, SuggestedAction>(
        suggestedBaseDataProvider,
        SUGGESTED_ACTION_DELAY
      )
  );

  const pastGroupingDataProvider = useMemo(
    () =>
      new GroupingDataProvider(
        pastBaseDataProvider as unknown as MutableArrayDataProvider<string, StreamItem>,
        (itemA: StreamItem, itemB: StreamItem) => itemA.date < itemB.date,
        ((key: string) => ({ id: key, value: key })) as unknown as (param0: string) => StreamItem,
        { groupByStrategy: dateGroupingStrategy }
      ) as TreeDataProvider<StreamNodeKey, StreamNodeData>,
    [pastBaseDataProvider]
  );

  const [pastDataProvider] = useState(
    () =>
      new DemoDelayingTreeDataProvider<StreamNodeKey, StreamNodeData>(
        pastGroupingDataProvider,
        PAST_DATA_DELAY,
        PAST_DATA_DELAY
      )
  );

  const pastExpanded = useMemo(() => new AllKeySetImpl<StreamNodeKey>(), []);

  useEffect(() => {
    pendingBaseDataProvider.data = pendingItems;
  }, [pendingBaseDataProvider, pendingItems]);

  useEffect(() => {
    pinnedBaseDataProvider.data = pinnedItems;
  }, [pinnedBaseDataProvider, pinnedItems]);

  useEffect(() => {
    pastBaseDataProvider.data = pastItems;
  }, [pastBaseDataProvider, pastItems]);

  useEffect(() => {
    suggestedBaseDataProvider.data = suggestedItems;
  }, [suggestedBaseDataProvider, suggestedItems]);

  const handlePendingExpandedChanged = (event: ojCollapsible.expandedChanged) => {
    setPendingExpanded(event.detail.value);
  };

  const handlePinnedExpandedChanged = (event: ojCollapsible.expandedChanged) => {
    setPinnedExpanded(event.detail.value);
  };

  const handleItemAction = (event: Event) => {
    const detail = (event as StreamActionEvent).detail;
    const itemContext = detail.itemContext;
    const section = detail.section;

    if (section === 'pinned') {
      setPinnedItems((current) => removeById(current, itemContext.key));
      return;
    }

    if (section === 'past') {
      setPinnedItems((current) => insertSorted(current, itemContext.data));
      return;
    }

    if (section === 'pending') {
      let removedPendingItem: StreamItem | null = null;

      setPendingItems((current) => {
        removedPendingItem = current.find((item) => item.id === itemContext.key) ?? null;
        return removeById(current, itemContext.key);
      });

      if (removedPendingItem) {
        setPastItems((current) =>
          insertSorted(current, { ...removedPendingItem!, date: NOW })
        );
      }
      return;
    }

    if (section === 'suggestion') {
      setSuggestedItems(suggestedQueue.length > 0 ? [suggestedQueue[0]] : []);
      setSuggestedQueue((current) => current.slice(1));
    }
  };

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    root.addEventListener('itemAction', handleItemAction);
    return () => root.removeEventListener('itemAction', handleItemAction);
  });

  const pendingHeaderText = `Pending${pendingExpanded ? '' : ` (${pendingItems.length})`}`;
  const pendingHeaderDetail = useMemo(() => {
    const upcomingData = pendingItems[pendingItems.length - 1];

    if (pendingExpanded || !upcomingData) {
      return '';
    }

    return `Next: ${dateGroupingStrategy(upcomingData)[0]} ${new Date(
      upcomingData.date
    ).toLocaleTimeString()}`;
  }, [pendingExpanded, pendingItems]);
  const pinnedHeaderText = `Pinned${pinnedExpanded ? '' : ` (${pinnedItems.length})`}`;

  const renderPendingItem = (item: StreamListElement.ItemTemplateContext<StreamId, StreamItem>) => (
    <demo-activity-stream-item
      expanded={false}
      headerText={item.data.label}
      eventsData={item.data.events}
      buttonIconClass="oj-ux-ico-calendar-clock"
      section="pending"
      itemContext={item}
    />
  );

  const renderSuggestedItem = (
    item: StreamListElement.ItemTemplateContext<string, SuggestedAction>
  ) => (
    <demo-activity-stream-item
      class="demo-suggested"
      expanded={true}
      headerText={item.data.label}
      eventsData={item.data.eventsData}
      buttonIconClass="oj-ux-ico-calendar"
      section="suggestion"
      itemContext={item}
    />
  );

  const renderPinnedItem = (item: StreamListElement.ItemTemplateContext<StreamId, StreamItem>) => (
    <demo-activity-stream-item
      class="oj-sm-margin-4x-top demo-stream-list-item"
      expanded={false}
      headerText={item.data.label}
      eventsData={item.data.events}
      buttonIconClass="oj-ux-ico-plus"
      section="pinned"
      itemContext={item}
    />
  );

  const renderPastItem = (item: StreamListElement.ItemTemplateContext<StreamId, StreamItem>) => (
    <demo-activity-stream-item
      class="oj-sm-margin-4x-top"
      expanded={item.data.type === 'Followup' && item.data.events.length < 4}
      headerText={item.data.label}
      eventsData={item.data.events}
      buttonIconClass="oj-ux-ico-check"
      section="past"
      itemContext={item}
    />
  );

  const pastScrollPosition: StreamScrollPosition = { y: 0 };

  return (
    <div id="app" class="oj-bg-neutral-0" ref={rootRef}>
      <div
        id="container"
        class="oj-sm-padding-4x-horizontal oj-md-padding-12x-horizontal"
        ref={setScroller}
      >
        <oj-collapsible
          expanded={pendingExpanded}
          class="oj-sm-margin-4x-vertical"
          onexpandedChanged={handlePendingExpandedChanged}
        >
          <h6
            slot="header"
            class="demo-stream-list-group oj-bg-brand-30 oj-sm-padding-6x-horizontal oj-typography-body-md oj-typography-bold"
          >
            <span class="oj-ux-ico-clock oj-sm-padding-4x-end" />
            <span>{pendingHeaderText}</span>
            <span class="oj-helper-margin-start-auto">{pendingHeaderDetail}</span>
          </h6>

          <oj-stream-list
            id="pending"
            data={pendingDataProvider}
            aria-label="pending items"
            scrollPolicyOptions={{ scroller }}
          >
            <template slot="itemTemplate" render={renderPendingItem} />
          </oj-stream-list>
        </oj-collapsible>

        <oj-stream-list
          id="suggested"
          data={suggestedActionDataProvider}
          aria-label="suggested items"
          class="oj-panel oj-bg-neutral-20 oj-sm-padding-0"
          scrollPolicyOptions={{ scroller }}
        >
          <template slot="itemTemplate" render={renderSuggestedItem} />
        </oj-stream-list>

        <oj-collapsible
          expanded={pinnedExpanded}
          class="oj-sm-margin-4x-vertical"
          onexpandedChanged={handlePinnedExpandedChanged}
        >
          <h6
            slot="header"
            class="demo-stream-list-group oj-bg-brand-30 oj-sm-padding-6x-horizontal oj-typography-body-md oj-typography-bold"
          >
            <span class="oj-ux-ico-check oj-sm-padding-4x-end" />
            <span>{pinnedHeaderText}</span>
          </h6>

          <oj-stream-list
            id="pinned"
            data={pinnedDataProvider}
            aria-label="pinned items"
            scrollPolicyOptions={{ scroller }}
          >
            <template slot="itemTemplate" render={renderPinnedItem} />
          </oj-stream-list>
        </oj-collapsible>

        <oj-stream-list
          id="past"
          data={pastDataProvider}
          aria-label="past items"
          expanded={pastExpanded}
          scrollPolicyOptions={{ scroller, fetchSize: 12 }}
          scrollPosition={pastScrollPosition}
        >
          <template slot="groupTemplate" render={renderGroupHeader} />
          <template slot="itemTemplate" render={renderPastItem} />
        </oj-stream-list>
      </div>
    </div>
  );
};

export default StreamListStreamlist;
