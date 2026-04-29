// @ts-nocheck
import { h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import * as tooltipSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/tooltip/basicSeriesData.json';
import 'ojs/ojtimeline';
import 'ojs/ojgauge';
import 'css!./demo.css';

type TimelineTooltipItem = {
  id: string;
  title: string;
  begin: string;
  finish: string;
  description: string;
  winPercentage: string;
  series: string;
};

const tooltipItems = JSON.parse(tooltipSeriesDataText) as TimelineTooltipItem[];
const majorAxis = { scale: 'months' };
const minorAxis = { scale: 'weeks', zoomOrder: ['quarters', 'months', 'weeks', 'days'] };

const renderSeriesTemplate = (series: any) => (
  <oj-timeline-series label={series.id} emptyText="No Data." />
);

export const TimelineTooltip = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(tooltipItems, {
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
  const tooltipElemRef = useRef<HTMLDivElement | null>(null);
  const assignmentTextRef = useRef<HTMLSpanElement | null>(null);
  const startTimeTextRef = useRef<HTMLSpanElement | null>(null);
  const endTimeTextRef = useRef<HTMLSpanElement | null>(null);
  const gaugeRef = useRef<HTMLElement | null>(null);

  const getShortDesc = (itemData: TimelineTooltipItem) => {
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

  const tooltipFunction = (dataContext: any) => {
    if (!tooltipElemRef.current) {
      const tooltipElem = document.createElement('div');
      const textDiv = document.createElement('div');
      const assignmentText = document.createElement('span');
      const startTimeText = document.createElement('span');
      const endTimeText = document.createElement('span');
      const gauge = document.createElement('oj-status-meter-gauge');

      textDiv.style.cssFloat = 'left';
      textDiv.style.padding = '10px 8px 10px 3px';
      assignmentText.style.fontWeight = 'bold';
      textDiv.appendChild(assignmentText);
      textDiv.appendChild(document.createElement('br'));
      textDiv.appendChild(startTimeText);
      textDiv.appendChild(document.createElement('br'));
      textDiv.appendChild(endTimeText);

      gauge.style.width = '50px';
      gauge.style.height = '50px';
      gauge.style.cssFloat = 'right';
      gauge.style.paddingTop = '5px';
      gauge.setAttribute('data-oj-binding-provider', 'none');
      gauge.setAttribute('readonly', '');

      tooltipElem.appendChild(textDiv);
      tooltipElem.appendChild(gauge);

      tooltipElemRef.current = tooltipElem;
      assignmentTextRef.current = assignmentText;
      startTimeTextRef.current = startTimeText;
      endTimeTextRef.current = endTimeText;
      gaugeRef.current = gauge;
    }

    dataContext.parentElement.style.borderWidth = '4px';
    assignmentTextRef.current.textContent = dataContext.seriesData.label;
    startTimeTextRef.current.textContent = `Start Date: ${dateConverter.format(dataContext.data.start)}`;
    endTimeTextRef.current.textContent = `End Date: ${dateConverter.format(dataContext.data.end)}`;
    gaugeRef.current.min = 0;
    gaugeRef.current.max = 100;
    gaugeRef.current.value = Number(dataContext.itemData.winPercentage);
    gaugeRef.current.color = dataContext.color;
    gaugeRef.current.orientation = 'circular';
    gaugeRef.current.setProperty('metricLabel.rendered', 'on');
    gaugeRef.current.plotArea = {
      rendered: 'on',
      color: '#E0E0E0'
    };

    return { insert: tooltipElemRef.current };
  };

  const renderItemTemplate = (item: any) => (
    <oj-timeline-item
      seriesId={item.data.series}
      start={item.data.begin}
      end={item.data.finish}
      label={item.data.title}
      description={item.data.description}
      shortDesc={getShortDesc(item.data)}
    />
  );

  return (
    <oj-timeline
      id="timeline"
      aria-label="Custom Tooltip Renderer"
      class="demo-timeline"
      data={dataProvider}
      start={new Date('Jan 1, 2013').toISOString()}
      end={new Date('Dec 31, 2013').toISOString()}
      selectionMode="single"
      tooltip={{ renderer: tooltipFunction }}
      majorAxis={majorAxis}
      minorAxis={minorAxis}
    >
      <template slot="seriesTemplate" render={renderSeriesTemplate} />
      <template slot="itemTemplate" render={renderItemTemplate} />
    </oj-timeline>
  );
};

export default TimelineTooltip;
