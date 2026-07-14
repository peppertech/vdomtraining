import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojlabel';
import 'ojs/ojtimeline';
import 'preact';
import { type ComponentProps } from 'preact';
import { useEffect,useMemo,useState } from 'preact/hooks';
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/moveResizeDurationTimeline/basicSingleSeriesData.json';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

type TimelineMoveResizeItem = {
  id: string;
  title: string;
  begin: string;
  finish: string;
  description: string;
  series: string;
};

type TimelineProps = ComponentProps<'oj-timeline'>;
type Orientation = NonNullable<TimelineProps['orientation']>;
type OverviewRendered = NonNullable<NonNullable<TimelineProps['overview']>['rendered']>;
type ItemType = NonNullable<ComponentProps<'oj-timeline-item'>['itemType']>;
type ButtonsetValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>>[0];
type TimelineMoveEvent = Parameters<NonNullable<TimelineProps['onojMove']>>[0];
type TimelineResizeEvent = Parameters<NonNullable<TimelineProps['onojResize']>>[0];

const initialItems = JSON.parse(timelineSeriesDataText) as TimelineMoveResizeItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };
const dnd: NonNullable<TimelineProps['dnd']> = { move: { items: 'enabled' } };
const itemDefaults: NonNullable<TimelineProps['itemDefaults']> = { resizable: 'enabled' };

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (
  <oj-timeline-series label={series.id} emptyText="No Tournaments Played." />
);

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>, itemType: ItemType) => (
  <oj-timeline-item
    itemType={itemType}
    seriesId={item.data.series}
    start={item.data.begin}
    end={item.data.finish}
    label={item.data.title}
    description={item.data.description}
  />
);

const getTime = (isoString: string) => new Date(isoString).getTime();
const getString = (time: number) => new Date(time).toISOString();

export const TimelineMoveResizeDurationTimeline = () => {
  const [items, setItems] = useState(initialItems);
  const [orientationValue, setOrientationValue] = useState<Orientation>('horizontal');
  const [overviewValue, setOverviewValue] = useState<OverviewRendered>('on');
  const [itemType, setItemType] = useState<ItemType>('duration-event');
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider(items, {
        keyAttributes: 'id'
      }),
    []
  );

  useEffect(() => {
    dataProvider.data = items;
  }, [dataProvider, items]);

  const handleOrientationChanged = (event: ButtonsetValueChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setOrientationValue((event.detail.value as Orientation | null) ?? 'horizontal');
    }
  };

  const handleOverviewChanged = (event: ButtonsetValueChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setOverviewValue((event.detail.value as OverviewRendered | null) ?? 'on');
    }
  };

  const handleItemTypeChanged = (event: ButtonsetValueChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setItemType((event.detail.value as ItemType | null) ?? 'duration-event');
    }
  };

  const updateEventData = (event: TimelineMoveEvent | TimelineResizeEvent) => {
    const itemContexts = event.detail.itemContexts;
    const resizeEdge = event.detail.typeDetail;
    const sourceTaskContext = itemContexts[0];
    const timeOffsetFromReference =
      resizeEdge === 'end'
        ? getTime(event.detail.end ?? sourceTaskContext.data.end ?? '')
        : getTime(event.detail.start ?? sourceTaskContext.data.start ?? '');

    setItems((current) => {
      const nextItems = current.slice();

      itemContexts.forEach((itemContext) => {
        const itemIndex = nextItems.findIndex((item) => item.id === itemContext.data.id);

        if (itemIndex === -1) {
          return;
        }

        const currentItem = nextItems[itemIndex];
        const itemStartTime = getTime(itemContext.data.start ?? currentItem.begin);
        const itemEndTime = getTime(itemContext.data.end ?? currentItem.finish);
        let begin = currentItem.begin;
        let finish = currentItem.finish;

        if (resizeEdge === 'start') {
          begin = getString(Math.min(itemEndTime, itemStartTime + timeOffsetFromReference));
        } else if (resizeEdge === 'end') {
          finish = getString(Math.max(itemStartTime, itemEndTime + timeOffsetFromReference));
        } else {
          begin = getString(itemStartTime + timeOffsetFromReference);
          finish = getString(itemEndTime + timeOffsetFromReference);
        }

        nextItems[itemIndex] = {
          ...currentItem,
          begin,
          finish
        };
      });

      return nextItems;
    });
  };

  const handleMove = (event: TimelineMoveEvent) => {
    updateEventData(event);
  };

  const handleResize = (event: TimelineResizeEvent) => {
    updateEventData(event);
  };

  const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => renderItemTemplate(item, itemType);

  return (
    <div id="timelineContainer">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Timeline Below</h2>
        <oj-form-layout maxColumns={2} direction="row" class="oj-formlayout-full-width">
          <oj-label for="orientationButtonSet">Timeline Orientation</oj-label>
          <oj-buttonset-one
            id="orientationButtonSet"
            aria-label="Choose only one setting."
            value={orientationValue}
            onvalueChanged={handleOrientationChanged}
          >
            <oj-option value="horizontal">Horizontal</oj-option>
            <oj-option value="vertical">Vertical</oj-option>
          </oj-buttonset-one>

          <oj-label for="overViewButtonSet">Timeline Overview</oj-label>
          <oj-buttonset-one
            id="overViewButtonSet"
            aria-label="Choose only one setting."
            value={overviewValue}
            onvalueChanged={handleOverviewChanged}
          >
            <oj-option value="on">Enabled</oj-option>
            <oj-option value="off">Disabled</oj-option>
          </oj-buttonset-one>

          <oj-label for="itemTypeButtonSet">Item-type</oj-label>
          <oj-buttonset-one
            id="itemTypeButtonSet"
            aria-label="Choose only one setting."
            value={itemType}
            onvalueChanged={handleItemTypeChanged}
          >
            <oj-option value="auto">Auto</oj-option>
            <oj-option value="event">Event</oj-option>
            <oj-option value="duration-event">Duration Event</oj-option>
          </oj-buttonset-one>
        </oj-form-layout>
      </div>
      <oj-timeline
        id="tline"
        aria-label="Move Resize Duration Event Timeline Demo"
        class="demo-timeline"
        data={dataProvider}
        dnd={dnd}
        itemDefaults={itemDefaults}
        onojMove={handleMove}
        onojResize={handleResize}
        start={new Date('Dec 1, 2012').toISOString()}
        end={new Date('Feb 1, 2014').toISOString()}
        viewportStart={new Date('Jan 1, 2013').toISOString()}
        viewportEnd={new Date('Mar 31, 2013').toISOString()}
        selectionMode="single"
        orientation={orientationValue}
        viewportNavigationMode="discrete"
        overview={{ rendered: overviewValue }}
        majorAxis={majorAxis}
        minorAxis={minorAxis}
      >
        <template slot="seriesTemplate" render={renderSeriesTemplate} />
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-timeline>
    </div>
  );
};

export default TimelineMoveResizeDurationTimeline;
