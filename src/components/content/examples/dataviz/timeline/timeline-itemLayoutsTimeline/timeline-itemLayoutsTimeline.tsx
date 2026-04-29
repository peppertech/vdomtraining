// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/itemLayoutsTimeline/seriesOneData.json';
import 'ojs/ojtimeline';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojformlayout';
import 'css!./demo.css';

type TimelineItemLayoutItem = {
  id: string;
  title: string;
  begin: string;
  description: string;
  series: string;
};

const itemLayoutItems = JSON.parse(timelineSeriesDataText) as TimelineItemLayoutItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };

const renderItemTemplate = (item: any) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    label={item.data.title}
    description={item.data.description}
  />
);

export const TimelineItemLayoutsTimeline = () => {
  const [itemLayoutValue, setItemLayoutValue] = useState('auto');
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(itemLayoutItems, {
        keyAttributes: 'id'
      }),
    []
  );
  const currentDateString = 'Feb 1, 2010';
  const currentDate = new Date(currentDateString).toISOString();
  const referenceObjects = useMemo(() => [{ value: currentDate }], [currentDate]);

  const handleItemLayoutChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setItemLayoutValue(event.detail.value);
    }
  };

  const renderSeriesTemplate = (series: any) => (
    <oj-timeline-series label={series.id} emptyText="No Data." itemLayout={itemLayoutValue} />
  );

  return (
    <div id="timeline-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Timeline Below</h2>
        <oj-form-layout maxColumns={2} direction="row" class="oj-formlayout-full-width">
          <oj-label for="radioButtonset">Item Layout</oj-label>
          <oj-buttonset-one
            id="radioButtonset"
            aria-controls="tline"
            value={itemLayoutValue}
            onvalueChanged={handleItemLayoutChanged}
          >
            <oj-option value="auto">auto</oj-option>
            <oj-option value="bottomToTop">bottomToTop</oj-option>
            <oj-option value="topToBottom">topToBottom</oj-option>
          </oj-buttonset-one>
        </oj-form-layout>
      </div>
      <oj-timeline
        id="tline"
        aria-label={`Item Layout Timeline Demo. Current date is ${currentDateString}`}
        class="demo-timeline"
        data={dataProvider}
        start={new Date('Jan 1, 2010').toISOString()}
        end={new Date('Dec 31, 2010').toISOString()}
        selection={['e4']}
        selectionMode="single"
        referenceObjects={referenceObjects}
        majorAxis={majorAxis}
        minorAxis={minorAxis}
      >
        <template slot="seriesTemplate" render={renderSeriesTemplate} />
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-timeline>
    </div>
  );
};

export default TimelineItemLayoutsTimeline;
