// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/dateFormatsTimeline/seriesData.json';
import 'ojs/ojtimeline';
import 'css!./demo.css';

type TimelineDateFormatsItem = {
  id: string;
  title: string;
  begin: string;
  finish: string;
  description: string;
  series: string;
};

const dateFormatsItems = JSON.parse(timelineSeriesDataText) as TimelineDateFormatsItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (
  <oj-timeline-series label={series.id} emptyText="No Data." />
);

const dateToLocalISO = (dateString: string) => IntlConverterUtils.dateToLocalIso(new Date(dateString));

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.id === 'e5' ? dateToLocalISO(item.data.begin) : item.data.begin}
    end={item.data.id === 'e5' ? dateToLocalISO(item.data.finish) : item.data.finish}
    label={item.data.title}
    description={item.data.description}
  />
);

export const TimelineDateFormatsTimeline = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(dateFormatsItems, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <oj-timeline
      id="tline"
      aria-label="Date and Time Formats Demo"
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

export default TimelineDateFormatsTimeline;
