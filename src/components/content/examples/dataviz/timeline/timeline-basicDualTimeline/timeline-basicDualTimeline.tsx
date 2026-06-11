// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/basicDualTimeline/basicSeriesData.json';
import 'ojs/ojtimeline';
import 'css!./demo.css';

type TimelineBasicDualItem = {
  id: string;
  title: string;
  begin: string;
  description: string;
  series: string;
};

const basicDualTimelineItems = JSON.parse(timelineSeriesDataText) as TimelineBasicDualItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (
  <oj-timeline-series label={series.id} emptyText="No Tournaments Played." />
);

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    label={item.data.title}
    description={item.data.description}
  />
);

export const TimelineBasicDualTimeline = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(basicDualTimelineItems, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <oj-timeline
      id="tline"
      aria-label="Two Series Timeline Demo"
      class="demo-timeline"
      data={dataProvider}
      start={new Date('Jan 1, 2013').toISOString()}
      end={new Date('Dec 31, 2013').toISOString()}
      selection={['e4']}
      selectionMode="single"
      majorAxis={majorAxis}
      minorAxis={minorAxis}
    >
      <template slot="seriesTemplate" render={renderSeriesTemplate} />
      <template slot="itemTemplate" render={renderItemTemplate} />
    </oj-timeline>
  );
};

export default TimelineBasicDualTimeline;
