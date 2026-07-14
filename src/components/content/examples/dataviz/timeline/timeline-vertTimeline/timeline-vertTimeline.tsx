import 'css!./demo.css';
import 'ojs/ojtimeline';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/vertTimeline/seriesData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type TimelineVertItem = {
  id: string;
  title: string;
  begin: string;
  finish: string;
  description: string;
  series: string;
};

const vertTimelineItems = JSON.parse(timelineSeriesDataText) as TimelineVertItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };
const overview = { rendered: 'on' } as const;

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (
  <oj-timeline-series label={series.id} emptyText="No Data." />
);

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    end={item.data.finish}
    label={item.data.title}
    description={item.data.description}
  />
);

export const TimelineVertTimeline = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(vertTimelineItems, {
        keyAttributes: 'id'
      }),
    []
  );

  const currentDateString = 'Feb 10, 2013';
  const currentDate = new Date(currentDateString).toISOString();
  const referenceObjects = useMemo(() => [{ value: currentDate }], [currentDate]);

  return (
    <oj-timeline
      id="tline"
      aria-label={`Vertical Single Series Timeline with Durations Demo. Current date is ${currentDateString}`}
      class="demo-timeline"
      data={dataProvider}
      start={new Date('Jan 1, 2013').toISOString()}
      end={new Date('Dec 31, 2013').toISOString()}
      orientation="vertical"
      selection={['e4']}
      selectionMode="single"
      referenceObjects={referenceObjects}
      overview={overview}
      majorAxis={majorAxis}
      minorAxis={minorAxis}
    >
      <template slot="seriesTemplate" render={renderSeriesTemplate} />
      <template slot="itemTemplate" render={renderItemTemplate} />
    </oj-timeline>
  );
};

export default TimelineVertTimeline;
