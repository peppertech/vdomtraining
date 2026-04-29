// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojMenu } from 'ojs/ojmenu';
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/contextMenuTimeline/seriesData.json';
import 'ojs/ojtimeline';
import 'ojs/ojmenu';
import 'css!./demo.css';

type TimelineContextItem = {
  id: string;
  title: string;
  begin: string;
  finish: string;
  description: string;
  series: string;
};

const contextMenuItems = JSON.parse(timelineSeriesDataText) as TimelineContextItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };

const renderSeriesTemplate = (series: any) => (
  <oj-timeline-series label={series.id} emptyText="No Data." />
);

const renderItemTemplate = (item: any) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    end={item.data.finish}
    label={item.data.title}
    description={item.data.description}
  />
);

export const TimelineContextMenuTimeline = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('(None selected yet)');
  const [selectedItemsValue, setSelectedItemsValue] = useState([]);
  const [itemTitle, setItemTitle] = useState<string | null>(null);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(contextMenuItems, {
        keyAttributes: 'id'
      }),
    []
  );
  const idToItemMap = useMemo(
    () =>
      contextMenuItems.reduce<Record<string, TimelineContextItem>>((acc: any, item: any) => {
        acc[item.id] = item;
        return acc;
      }, {}),
    []
  );

  const handleSelectionChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setSelectedItemsValue(event.detail.value ?? []);
    }
  };

  const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
    const target = event.detail.originalEvent.target as HTMLElement | null;
    if (!target) {
      return;
    }

    if (target.id === 'timeline') {
      const selection = selectedItemsValue;
      if (selection.length > 0) {
        setItemTitle(idToItemMap[selection[0]]?.title ?? null);
      }
      return;
    }

    const timeline = document.getElementById('timeline');
    const context = timeline?.getContextByNode(target);
    if (context != null && context.subId === 'oj-timeline-item') {
      setItemTitle(contextMenuItems[context.itemIndex]?.title ?? null);
    }
  };

  const menuItemAction = (event: ojMenu.ojMenuAction) => {
    const text = event.detail.selectedValue;
    if (itemTitle) {
      setSelectedMenuItem(`${text} from ${itemTitle}`);
      setItemTitle(null);
    } else {
      setSelectedMenuItem(`${text} from timeline background`);
    }
  };

  return (
    <div id="timeline-container">
      <oj-timeline
        id="timeline"
        aria-label="Timeline Context Menu Demo"
        class="demo-timeline"
        data={dataProvider}
        start={new Date('Jan 1, 2013').toISOString()}
        end={new Date('Dec 31, 2013').toISOString()}
        selectionMode="single"
        selection={selectedItemsValue}
        onselectionChanged={handleSelectionChanged}
        majorAxis={majorAxis}
        minorAxis={minorAxis}
      >
        <template slot="seriesTemplate" render={renderSeriesTemplate} />
        <template slot="itemTemplate" render={renderItemTemplate} />
        <oj-menu
          slot="contextMenu"
          aria-label="Match Edit"
          onojMenuAction={menuItemAction}
          onojBeforeOpen={beforeOpenFunction}
        >
          <oj-option value="Action 1">Action 1</oj-option>
          <oj-option value="Action 2">Action 2</oj-option>
          <oj-option value="Action 3">Action 3</oj-option>
        </oj-menu>
      </oj-timeline>

      <p>
        Last selected menu item:
        <span id="results" class="italic oj-typography-body-md oj-typography-bold">
          {selectedMenuItem}
        </span>
      </p>
    </div>
  );
};

export default TimelineContextMenuTimeline;
