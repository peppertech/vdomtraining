// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/basicTimeline/seriesOneData.json';
import 'ojs/ojtimeline';
import 'css!./demo.css';

type TimelineCustomDatesItem = {
  id: string;
  title: string;
  begin: string;
  description: string;
  series: string;
};

const customDatesItems = JSON.parse(timelineSeriesDataText) as TimelineCustomDatesItem[];
const majorAxis = { scale: 'months' };

const diffDays = (dateString: string) => {
  const date = new Date(dateString);
  const startDate = new Date('Jan 1, 2010');
  const day = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs(date.getTime() - startDate.getTime()) / day + 1);
};

const minorAxis = {
  scale: 'days',
  zoomOrder: ['months', 'weeks', 'days'],
  converter: {
    days: {
      format: (date: string) => diffDays(date)
    }
  }
};

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (
  <oj-timeline-series label={series.id} emptyText="No Data." />
);

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    label={item.data.title}
    description={item.data.description}
  />
);

export const TimelineCustomDatesTimeline = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(customDatesItems, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <oj-timeline
      id="tline"
      aria-label="Custom Date Formatting Demo"
      class="demo-timeline"
      data={dataProvider}
      start={new Date('Jan 1, 2010').toISOString()}
      end={new Date('Dec 31, 2010').toISOString()}
      viewportStart={new Date('Jan 27, 2010').toISOString()}
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

export default TimelineCustomDatesTimeline;
