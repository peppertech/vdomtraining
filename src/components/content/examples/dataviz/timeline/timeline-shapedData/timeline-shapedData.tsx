import 'css!./demo.css';
import 'ojs/ojtimeline';
import 'preact';
import * as shapedSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/shapedData/seriesData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type TimelineShapedItem = {
  seriesId: string;
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
};

const shapedSeriesData = JSON.parse(shapedSeriesDataText) as TimelineShapedItem[];
const timelineDataProvider = new ArrayDataProvider(shapedSeriesData, {
  keyAttributes: 'id'
});
const startDate = new Date('Jan 1, 2013').toISOString();
const endDate = new Date('Dec 31, 2013').toISOString();
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'months', zoomOrder: ['months', 'weeks', 'days'] };

export const TimelineShapedData = () => {
  return (
    <oj-timeline
      id="timeline"
      class="demo-timeline"
      start={startDate}
      end={endDate}
      data={timelineDataProvider}
      selectionMode="single"
      majorAxis={majorAxis}
      minorAxis={minorAxis}
    />
  );
};

export default TimelineShapedData;
