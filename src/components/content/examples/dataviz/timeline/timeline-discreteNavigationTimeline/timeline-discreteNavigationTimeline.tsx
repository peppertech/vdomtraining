// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/discreteNavigationTimeline/basicSingleSeriesData.json';
import 'ojs/ojtimeline';
import 'ojs/ojformlayout';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'css!./demo.css';

type TimelineDiscreteNavigationItem = {
  id: string;
  title: string;
  begin: string;
  finish: string;
  description: string;
  series: string;
};

const discreteNavigationItems = JSON.parse(timelineSeriesDataText) as TimelineDiscreteNavigationItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };

const renderSeriesTemplate = (series: any) => (
  <oj-timeline-series label={series.id} emptyText="No Tournaments Played." />
);

const renderItemTemplate = (item: any, itemType: any) => (
  <oj-timeline-item
    itemType={itemType}
    seriesId={item.data.series}
    start={item.data.begin}
    end={item.data.finish}
    label={item.data.title}
    description={item.data.description}
  />
);

export const TimelineDiscreteNavigationTimeline = () => {
  const [orientationValue, setOrientationValue] = useState('horizontal');
  const [overviewValue, setOverviewValue] = useState('on');
  const [itemType, setItemType] = useState('duration-event');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(discreteNavigationItems, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleOrientationChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setOrientationValue(event.detail.value);
    }
  };

  const handleOverviewChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setOverviewValue(event.detail.value);
    }
  };

  const handleItemTypeChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setItemType(event.detail.value);
    }
  };

  const itemTemplateRenderer = (item: any) => renderItemTemplate(item, itemType);

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

          <oj-label for="itemTypeButtonSet">Item-type</oj-label>
          <oj-buttonset-one
            id="itemTypeButtonSet"
            aria-label="Choose only one setting."
            value={itemType}
            onvalueChanged={handleItemTypeChanged}
          >
            <oj-option value="auto">Auto</oj-option>
            <oj-option value="event">Event</oj-option>
            <oj-option value="duration-event">Duration Event</oj-option>
          </oj-buttonset-one>
        </oj-form-layout>
      </div>
      <oj-timeline
        id="tline"
        aria-label="Duration Event Series Timeline Demo"
        class="demo-timeline"
        data={dataProvider}
        start={new Date('Dec 15, 2012').toISOString()}
        end={new Date('Jan 15, 2014').toISOString()}
        viewportStart={new Date('Jan 1, 2013').toISOString()}
        viewportEnd={new Date('Mar 31, 2013').toISOString()}
        selectionMode="single"
        orientation={orientationValue}
        viewportNavigationMode="discrete"
        overview={{ rendered: overviewValue }}
        majorAxis={majorAxis}
        minorAxis={minorAxis}
      >
        <template slot="seriesTemplate" render={renderSeriesTemplate} />
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-timeline>
    </div>
  );
};

export default TimelineDiscreteNavigationTimeline;
