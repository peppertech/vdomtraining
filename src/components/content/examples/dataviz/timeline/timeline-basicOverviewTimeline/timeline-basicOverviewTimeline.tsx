// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/basicOverviewTimeline/basicThumbSeriesData.json';
import 'ojs/ojtimeline';
import 'css!./demo.css';

type TimelineBasicOverviewItem = {
  id: string;
  title: string;
  begin: string;
  image: string;
  description: string;
  series: string;
};

const basicOverviewItems = (JSON.parse(timelineSeriesDataText) as TimelineBasicOverviewItem[]).map(
  (item: any) => ({
    ...item,
    image: `/styles/images/${item.image.split('/').pop()}`
  })
);
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };
const overview = { rendered: 'on' };

const renderSeriesTemplate = (series: any) => (
  <oj-timeline-series label={series.id} emptyText="No Tournaments Played." />
);

const renderItemTemplate = (item: any) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    label={item.data.title}
    thumbnail={item.data.image}
    description={item.data.description}
  />
);

export const TimelineBasicOverviewTimeline = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(basicOverviewItems, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <oj-timeline
      id="tline"
      aria-label="Single Series With Overview Demo"
      class="demo-timeline"
      data={dataProvider}
      start={new Date('Jan 1, 2013').toISOString()}
      end={new Date('Dec 31, 2013').toISOString()}
      viewportStart={new Date('Jan 27, 2013').toISOString()}
      viewportEnd={new Date('Mar 24, 2013').toISOString()}
      selection={['e4']}
      selectionMode="single"
      overview={overview}
      majorAxis={majorAxis}
      minorAxis={minorAxis}
    >
      <template slot="seriesTemplate" render={renderSeriesTemplate} />
      <template slot="itemTemplate" render={renderItemTemplate} />
    </oj-timeline>
  );
};

export default TimelineBasicOverviewTimeline;
