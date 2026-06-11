// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import * as tooltipSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/tooltipTemplate/basicSeriesData.json';
import 'ojs/ojtimeline';
import 'ojs/ojgauge';
import 'css!./demo.css';

type TimelineTooltipTemplateItem = {
  id: string;
  title: string;
  begin: string;
  finish: string;
  description: string;
  winPercentage: string;
  series: string;
};

const tooltipTemplateItems = JSON.parse(tooltipSeriesDataText) as TimelineTooltipTemplateItem[];
const majorAxis = { scale: 'months' };
const minorAxis = { scale: 'weeks', zoomOrder: ['quarters', 'months', 'weeks', 'days'] };

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (
  <oj-timeline-series label={series.id} emptyText="No Data." />
);

export const TimelineTooltipTemplate = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(tooltipTemplateItems, {
        keyAttributes: 'id'
      }),
    []
  );
  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
      }),
    []
  );

  const getShortDesc = (itemData: TimelineTooltipTemplateItem) => {
    const assignmentString = itemData.series;
    const titleString = `Title is ${itemData.title}`;
    const descString = `Description is ${itemData.description}`;
    const startTimeString = `Start Date is ${dateConverter.format(itemData.begin)}`;
    const endTimeString = `End Date is ${dateConverter.format(itemData.finish)}`;
    const winPercentString = `Tournament winning percentage is ${itemData.winPercentage}`;
    return [
      assignmentString,
      titleString,
      descString,
      startTimeString,
      endTimeString,
      winPercentString
    ].join(', ');
  };

  const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-timeline-item
      seriesId={item.data.series}
      start={item.data.begin}
      end={item.data.finish}
      label={item.data.title}
      description={item.data.description}
      shortDesc={getShortDesc(item.data)}
    />
  );

  const renderTooltipTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
    <div>
      <div class="oj-sm-float-start oj-sm-padding-2x-vertical oj-sm-padding-2x-end oj-sm-padding-1x-start">
        <span class="oj-typography-body-sm oj-typography-bold">{item.seriesData.label}</span>
        <br />
        <span>{`Start Date: ${dateConverter.format(item.data.start)}`}</span>
        <br />
        <span>{`End Date: ${dateConverter.format(item.data.end)}`}</span>
      </div>
      <oj-status-meter-gauge
        id="gauge"
        min={0}
        max={100}
        value={Number(item.itemData.winPercentage)}
        orientation="circular"
        color={item.color}
        readonly
        class="oj-sm-float-end demo-timeline-gauge oj-sm-padding-1x-top"
        aria-label="circular status meter gauge inside tooltip"
      />
    </div>
  );

  return (
    <div id="timeline-container">
      <oj-timeline
        id="timeline"
        aria-label="Custom Tooltip Renderer"
        class="demo-timeline"
        data={dataProvider}
        start={new Date('Jan 1, 2013').toISOString()}
        end={new Date('Dec 31, 2013').toISOString()}
        selectionMode="single"
        majorAxis={majorAxis}
        minorAxis={minorAxis}
      >
        <template slot="seriesTemplate" render={renderSeriesTemplate} />
        <template slot="itemTemplate" render={renderItemTemplate} />
        <template slot="tooltipTemplate" render={renderTooltipTemplate} />
      </oj-timeline>
    </div>
  );
};

export default TimelineTooltipTemplate;
