// @ts-nocheck
import { h } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as smallScaleSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/smallScaleTimeline/seriesData.json';
import 'ojs/ojtimeline';
import 'css!./demo.css';

type TimelineSmallScaleItem = {
  begin: string;
  title: string;
  series: string;
};

const smallScaleSeriesData = JSON.parse(smallScaleSeriesDataText) as TimelineSmallScaleItem[];
const timelineDataProvider = new ArrayDataProvider(smallScaleSeriesData, {
  keyAttributes: 'begin'
});
const minorAxis = {
  scale: 'minutes',
  zoomOrder: ['minutes', 'seconds']
};

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => <oj-timeline-series label={series.id} />;

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    label={item.data.title}
  />
);

export const TimelineSmallScaleTimeline = () => {
  return (
    <oj-timeline
      id="tline"
      aria-label="Small Scale Demo"
      class="demo-timeline"
      data={timelineDataProvider}
      start="1969-07-16T09:32:00-05:00"
      end="1969-07-16T09:47:00-05:00"
      viewportStart="1969-07-16T09:32:00-05:00"
      viewportEnd="1969-07-16T09:36:00-05:00"
      selectionMode="single"
      minorAxis={minorAxis}
    >
      <template slot="seriesTemplate" render={renderSeriesTemplate} />
      <template slot="itemTemplate" render={renderItemTemplate} />
    </oj-timeline>
  );
};

export default TimelineSmallScaleTimeline;
