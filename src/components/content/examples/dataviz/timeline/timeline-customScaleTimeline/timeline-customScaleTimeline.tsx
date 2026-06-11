// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/customScaleTimeline/seriesCustomData.json';
import 'ojs/ojtimeline';
import 'css!./demo.css';
type TimelineCustomScaleItem = {
    id: string;
    title: string;
    begin: string;
    description: string;
    series: string;
};
const customScaleItems = JSON.parse(timelineSeriesDataText) as TimelineCustomScaleItem[];
const majorAxis = { scale: 'weeks' };
const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (<oj-timeline-series label={series.id} emptyText="No Data."/>);
const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-timeline-item seriesId={item.data.series} start={item.data.begin} label={item.data.title} description={item.data.description}/>);
export const TimelineCustomScaleTimeline = () => {
    const dataProvider = useMemo(() => new ArrayDataProvider(customScaleItems, {
        keyAttributes: 'id'
    }), []);
    const hourConverter = useMemo(() => new IntlDateTimeConverter({
        hour: '2-digit',
        hour12: true
    }), []);
    const hour = 60 * 60 * 1000;
    const createHourScale = (hours: number) => ({
        name: `${hours}hr`,
        formatter: (date: string) => hourConverter.format(date),
        getNextDate: (date: string) => new Date(new Date(date).getTime() + hours * hour).toISOString(),
        getPreviousDate: (date: string) => {
            const current = new Date(date);
            current.setHours(Math.floor(current.getHours() / hours) * hours, 0, 0, 0);
            return current.toISOString();
        }
    });
    const custom3HrScale = useMemo(() => createHourScale(3), [hourConverter]);
    const custom6HrScale = useMemo(() => createHourScale(6), [hourConverter]);
    const minorAxis = useMemo(() => ({
        scale: custom3HrScale,
        zoomOrder: ['days', custom6HrScale, custom3HrScale, 'hours']
    }), [custom3HrScale, custom6HrScale]);
    return (<oj-timeline id="tline" aria-label="Custom Date Formatting Demo" class="demo-timeline" data={dataProvider} start={new Date('Jan 8, 2021').toISOString()} end={new Date('Feb 5, 2021').toISOString()} viewportStart={new Date('Jan 8, 2021').toISOString()} viewportEnd={new Date('Jan 9, 2021').toISOString()} selection={['e4']} selectionMode="single" majorAxis={majorAxis} minorAxis={minorAxis}>
      <template slot="seriesTemplate" render={renderSeriesTemplate}/>
      <template slot="itemTemplate" render={renderItemTemplate}/>
    </oj-timeline>);
};
export default TimelineCustomScaleTimeline;
