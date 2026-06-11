// @ts-nocheck
import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojtimeline';
import 'ojs/ojtoolbar';
import 'css!./demo.css';

type TimelineAnimationsItem = {
  id: number;
  begin: string;
  finish: string;
  title: string;
  series: string;
};

const START_DATE = new Date(2014, 0, 1);
const END_DATE = new Date(2014, 5, 23);
const TIMELINE_START = new Date('Jan 1, 2014').toISOString();
const TIMELINE_END = new Date('July 30, 2014').toISOString();
const MINOR_AXIS = {
  scale: 'months',
  zoomOrder: ['quarters', 'months', 'weeks', 'days']
};

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateRandomEvent = (id: number): TimelineAnimationsItem => {
  const start = randomDate(START_DATE, END_DATE);

  return {
    id,
    begin: start.toISOString(),
    finish: randomDate(new Date(start), new Date(start.getTime() + 604800000)).toISOString(),
    title: `Item ${id}`,
    series: 'series'
  };
};

const generateRandomData = (numItems: number): TimelineAnimationsItem[] =>
  Array.from({ length: numItems }, (_unused: unknown, index: number) => generateRandomEvent(index));

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => <oj-timeline-series label={series.id} />;

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    end={item.data.finish}
    label={item.data.title}
  />
);

export const TimelineAnimations = () => {
  const [items, setItems] = useState<TimelineAnimationsItem[]>(() => generateRandomData(10));
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

  const addNode = () => {
    setItems((current) => [...current, generateRandomEvent(current.length)]);
  };

  const removeNode = () => {
    setItems((current) => current.slice(0, -1));
  };

  const updateNode = () => {
    setItems((current) => {
      if (current.length === 0) {
        return current;
      }

      const nextItems = current.slice();
      nextItems[0] = generateRandomEvent(current[0].id);
      return nextItems;
    });
  };

  const updateNodeDuration = () => {
    setItems((current) => {
      if (current.length === 0) {
        return current;
      }

      const nextItems = current.slice();
      const firstItem = current[0];
      nextItems[0] = {
        ...firstItem,
        finish: new Date(new Date(firstItem.finish).getTime() + 604800000).toISOString()
      };
      return nextItems;
    });
  };

  const updateAll = () => {
    setItems(generateRandomData(10));
  };

  return (
    <div id="timeline-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Timeline Below</h2>
        <oj-toolbar
          id="demoToolBar"
          aria-label="Animation Toolbar"
          aria-controls="timeline"
          chroming="outlined"
        >
          <oj-button id="buttonAdd" onojAction={addNode}>
            Add Node
          </oj-button>
          <oj-button id="buttonRemove" onojAction={removeNode}>
            Remove Last Node
          </oj-button>
          <oj-button id="buttonUpdate" onojAction={updateNode}>
            Update First Node
          </oj-button>
          <oj-button id="buttonUpdateDuration" onojAction={updateNodeDuration}>
            Update First Node Duration
          </oj-button>
          <oj-button id="buttonUpdateAll" onojAction={updateAll}>
            Update All
          </oj-button>
        </oj-toolbar>
      </div>
      <oj-timeline
        id="timeline"
        aria-label="Animations Demo"
        class="demo-timeline"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        start={TIMELINE_START}
        end={TIMELINE_END}
        selectionMode="single"
        minorAxis={MINOR_AXIS}
        data={dataProvider}
      >
        <template slot="seriesTemplate" render={renderSeriesTemplate} />
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-timeline>
    </div>
  );
};

export default TimelineAnimations;
