import 'css!./demo.css';
import 'ojs/ojtimeline';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/basicVertDualTimeline/basicSeriesData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type TimelineBasicVertDualItem = {
  id: string;
  title: string;
  begin: string;
  description: string;
  series: string;
};

const basicVertDualItems = JSON.parse(timelineSeriesDataText) as TimelineBasicVertDualItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };
const overview = { rendered: 'on' } as const;

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

export const TimelineBasicVertDualTimeline = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(basicVertDualItems, {
        keyAttributes: 'id'
      }),
    []
  );

  return (
    <oj-timeline
      id="tline"
      aria-label="Vertical Two Series Timeline Demo"
      class="demo-timeline"
      data={dataProvider}
      start={new Date('Jan 1, 2013').toISOString()}
      end={new Date('Dec 31, 2013').toISOString()}
      viewportStart={new Date('Jan 27, 2013').toISOString()}
      viewportEnd={new Date('Mar 24, 2013').toISOString()}
      orientation="vertical"
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

export default TimelineBasicVertDualTimeline;
