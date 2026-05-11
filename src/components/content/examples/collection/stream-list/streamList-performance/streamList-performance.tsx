import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import Context = require('ojs/ojcontext');
import { AllKeySetImpl, KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojoption';
import 'ojs/ojstreamlist';
import { StreamListElement } from 'ojs/ojstreamlist';
import 'ojs/ojtoolbar';
import 'css!./demo.css';

type TreeItem = {
  id: string;
  item: string;
  children?: TreeItem[];
};
type ScrollPolicy = 'loadMoreOnScroll' | 'loadAll';
type ExpandValue = 'collapse' | 'expand';
type NumberValueChangedEvent = CustomEvent<{
  value: number | null;
  updatedFrom?: 'external' | 'internal';
}>;
type StringValueChangedEvent<T extends string> = CustomEvent<{
  value: T | null;
  updatedFrom?: 'external' | 'internal';
}>;

const COLLAPSED_NODE_LIMIT = 1_000_000;
const EXPANDED_NODE_LIMIT = 100_000;
const scrollingOptions: Array<{ id: string; label: string; value: ScrollPolicy }> = [
  { id: 'on', label: 'Load More On Scroll', value: 'loadMoreOnScroll' },
  { id: 'off', label: 'Load All', value: 'loadAll' }
];

const generateTreeData = (
  count: number,
  idPrefix: string | number,
  hasChildren: boolean,
  childCount: number
): TreeItem[] =>
  Array.from({ length: count }, (_, index) => {
    const childIndex = index + 1;
    const id = `p${idPrefix}c${childIndex}`;

    if (hasChildren) {
      return {
        id,
        item: `Item ${childIndex}`,
        children: generateTreeData(childCount, childIndex, false, 0)
      };
    }

    return {
      id,
      item: `Child Item ${childIndex}`
    };
  });

export const StreamListPerformance = () => {
  const streamListRef = useRef<StreamListElement<string, TreeItem>>(null);
  const [numItems, setNumItems] = useState<number>(100);
  const [numChild, setNumChild] = useState<number>(5);
  const [renderTime, setRenderTime] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [scrollPolicyValue, setScrollPolicyValue] = useState<ScrollPolicy>('loadMoreOnScroll');
  const [expandValue, setExpandValue] = useState<ExpandValue>('expand');
  const [renderVersion, setRenderVersion] = useState<number>(0);

  const totalItems = useMemo(() => numItems + numItems * numChild, [numChild, numItems]);
  const exceedsLimits = useMemo(() => {
    if (expandValue === 'collapse') {
      return totalItems > COLLAPSED_NODE_LIMIT;
    }

    return totalItems > EXPANDED_NODE_LIMIT;
  }, [expandValue, totalItems]);

  const treeData = useMemo(
    () => (exceedsLimits ? [] : generateTreeData(numItems, '', true, numChild)),
    [exceedsLimits, numChild, numItems, renderVersion]
  );
  const dataProvider = useMemo(
    () => new ArrayTreeDataProvider<string, TreeItem>(treeData, { keyAttributes: 'id' }),
    [treeData]
  );
  const expandKeySet = useMemo(
    () => (expandValue === 'collapse' ? new KeySetImpl<string>() : new AllKeySetImpl<string>()),
    [expandValue]
  );

  const getLimitForMessage = () =>
    expandValue === 'collapse' ? COLLAPSED_NODE_LIMIT : EXPANDED_NODE_LIMIT;

  useEffect(() => {
    const streamListElement = streamListRef.current;

    if (!streamListElement) {
      return;
    }

    const start = Date.now();
    const busyContext = Context.getContext(streamListElement).getBusyContext();

    busyContext.whenReady().then(() => {
      if (exceedsLimits) {
        setRenderTime(0);
        setErrorMessage(
          `Error: Too Many Nodes. ${expandValue}: (select total node amount that is less than ${getLimitForMessage()} nodes)`
        );
        return;
      }

      setErrorMessage('');
      setRenderTime(Date.now() - start);
    });
  }, [dataProvider, exceedsLimits, expandValue, scrollPolicyValue]);

  const updateData = () => {
    setRenderVersion((current) => current + 1);
  };

  const updateNumItems = (event: NumberValueChangedEvent) => {
    if (event.detail.value == null) {
      return;
    }

    setNumItems(event.detail.value);
    setRenderVersion((current) => current + 1);
  };

  const updateNumChild = (event: NumberValueChangedEvent) => {
    if (event.detail.value == null) {
      return;
    }

    setNumChild(event.detail.value);
    setRenderVersion((current) => current + 1);
  };

  const handleScrollPolicyChanged = (event: StringValueChangedEvent<ScrollPolicy>) => {
    if (event.detail.updatedFrom === 'external' || !event.detail.value) {
      return;
    }

    setScrollPolicyValue(event.detail.value);
  };

  const handleExpandValueChanged = (event: StringValueChangedEvent<ExpandValue>) => {
    if (event.detail.updatedFrom === 'external' || !event.detail.value) {
      return;
    }

    setExpandValue(event.detail.value);
    setRenderVersion((current) => current + 1);
  };

  const renderGroupTemplate = (
    item: StreamListElement.GroupTemplateContext<string, TreeItem>
  ) => (
    <div class="demo-stream-list-group oj-bg-neutral-30 oj-sm-margin-4x-top oj-sm-padding-2x-vertical oj-sm-padding-6x-horizontal oj-typography-bold">
      {item.data.item}
    </div>
  );

  const renderItemTemplate = (item: StreamListElement.ItemTemplateContext<string, TreeItem>) => (
    <div class="oj-sm-margin-4x-top oj-sm-padding-6x-horizontal">{item.data.item}</div>
  );

  return (
    <div id="streamListContainer" class="demo-max-height">
      <div class="demo-container">
        <div class="oj-panel oj-bg-neutral-30">
          <oj-form-layout maxColumns={2} direction="row">
            <oj-input-number
              id="inputnumber-id1"
              labelHint="Number of Parent items"
              onvalueChanged={updateNumItems}
              min={10}
              step={40}
              value={numItems}
            />
            <oj-input-number
              id="inputnumber-id2"
              labelHint="Number of Children"
              onvalueChanged={updateNumChild}
              min={5}
              step={1}
              value={numChild}
            />
          </oj-form-layout>
          <oj-toolbar
            id="myToolbar1"
            aria-label="Action Toolbar"
            aria-controls="controlled"
            chroming="outlined"
          >
            <oj-buttonset-one
              id="policyButtonSet"
              class="oj-buttonset-width-auto oj-button-lg"
              aria-label="Choose only one setting."
              aria-controls="streamlistview"
              value={scrollPolicyValue}
              onvalueChanged={handleScrollPolicyChanged}
            >
              {scrollingOptions.map((option) => (
                <oj-option value={option.value} id={option.id}>
                  <span>{option.label}</span>
                </oj-option>
              ))}
            </oj-buttonset-one>
            <oj-buttonset-one
              id="expandButtonSet"
              class="oj-buttonset-width-auto oj-button-lg"
              aria-label="Choose only one setting."
              aria-controls="streamlist-perf"
              value={expandValue}
              onvalueChanged={handleExpandValueChanged}
            >
              <oj-option value="collapse">Collapse All</oj-option>
              <oj-option value="expand">Expand All</oj-option>
            </oj-buttonset-one>
            <oj-button id="updateButton" class="oj-button-lg" onojAction={updateData}>
              Re-Render
            </oj-button>
          </oj-toolbar>

          <div class="oj-sm-padding-1x-start oj-sm-margin-4x-top">
            <p>
              Total Items:
              {totalItems}
              {'  '}Time to render:
              {renderTime}
              ms
            </p>
          </div>
          <div class="oj-sm-padding-1x-start">
            <p class="oj-typography-body-lg oj-typography-bold oj-text-color-danger">
              {errorMessage}
            </p>
          </div>
        </div>

        <oj-stream-list
          id="demostreamlist"
          ref={streamListRef}
          class="demo-streamlist-height"
          aria-label="stream list showing scroll position"
          data={dataProvider}
          expanded={expandKeySet}
          scrollPolicy={scrollPolicyValue}
          scrollPolicyOptions={{ maxCount: 100000 }}
        >
          <template slot="groupTemplate" render={renderGroupTemplate} />
          <template slot="itemTemplate" render={renderItemTemplate} />
        </oj-stream-list>
      </div>
    </div>
  );
};

export default StreamListPerformance;
