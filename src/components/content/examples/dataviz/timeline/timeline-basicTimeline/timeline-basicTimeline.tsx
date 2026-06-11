// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/basicTimeline/seriesOneData.json';
import 'ojs/ojtimeline';
import 'ojs/ojformlayout';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'css!./demo.css';

type TimelineBasicItem = {
  id: string;
  title: string;
  begin: string;
  description: string;
  series: string;
};

const basicTimelineItems = JSON.parse(timelineSeriesDataText) as TimelineBasicItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };

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

export const TimelineBasicTimeline = () => {
  const [orientationValue, setOrientationValue] = useState('horizontal');
  const [overviewValue, setOverviewValue] = useState('on');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(basicTimelineItems, {
        keyAttributes: 'id'
      }),
    []
  );

  const currentDateString = 'Feb 1, 2010';
  const currentDate = new Date(currentDateString).toISOString();
  const referenceObjects = useMemo(() => [{ value: currentDate }], [currentDate]);

  const handleOrientationChanged = (event: DatavizValueChangedEvent<string>) => {
    if (event.detail.updatedFrom === 'internal') {
      setOrientationValue(event.detail.value);
    }
  };

  const handleOverviewChanged = (event: DatavizValueChangedEvent<string>) => {
    if (event.detail.updatedFrom === 'internal') {
      setOverviewValue(event.detail.value);
    }
  };

  return (
    <div id="timelineContainer">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Timeline Below</h2>
        <oj-form-layout maxColumns={2} direction="row" class="oj-formlayout-full-width">
          <oj-label for="orientationButtonSet">Timeline Orientation</oj-label>
          <oj-buttonset-one
            id="orientationButtonSet"
            aria-label="Choose only one setting."
            value={orientationValue}
            onvalueChanged={handleOrientationChanged}
          >
            <oj-option value="horizontal">Horizontal</oj-option>
            <oj-option value="vertical">Vertical</oj-option>
          </oj-buttonset-one>

          <oj-label for="overViewButtonSet">Timeline Overview</oj-label>
          <oj-buttonset-one
            id="overViewButtonSet"
            aria-label="Choose only one setting."
            value={overviewValue}
            onvalueChanged={handleOverviewChanged}
          >
            <oj-option value="on">Enabled</oj-option>
            <oj-option value="off">Disabled</oj-option>
          </oj-buttonset-one>
        </oj-form-layout>
      </div>
      <oj-timeline
        id="tline"
        aria-label={`Overview Timeline Demo. Current date is ${currentDateString}`}
        class="demo-timeline"
        data={dataProvider}
        start={new Date('Jan 1, 2010').toISOString()}
        end={new Date('Dec 31, 2010').toISOString()}
        selection={['e4']}
        selectionMode="single"
        orientation={orientationValue}
        overview={{ rendered: overviewValue }}
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

export default TimelineBasicTimeline;
