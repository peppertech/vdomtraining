// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import * as eventTypeDataText from 'text!../data/cookbook/dataVisualizations/timeline/resources/different_event_types.json';
import 'ojs/ojtimeline';
import 'ojs/ojlabel';
import 'ojs/ojformlayout';
import 'ojs/ojbutton';
type TimelineDurationEventItem = {
    id: string;
    series: string;
    begin: string;
    finish: string;
};
const durationEventItems = JSON.parse(eventTypeDataText) as TimelineDurationEventItem[];
const itemTypeOptions = [
    { id: 'duration-event', label: 'duration-event' },
    { id: 'event', label: 'event' }
];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks' };
const valueFormats = { title: { tooltipDisplay: 'auto' } };
const getBackgroundColor = (series: string) => {
    switch (series) {
        case 'Review':
            return 'red';
        case 'Performance Review':
            return 'blue';
        case 'Feedback':
            return 'purple';
        case 'Celebration':
            return 'orange';
        case 'Check-in':
            return 'green';
        case 'Performance':
            return 'teal';
        default:
            return undefined;
    }
};
export const TimelineDurationEventBackground = () => {
    const [itemTypeValue, setItemTypeValue] = useState('duration-event');
    const dataProvider = useMemo(() => new ArrayDataProvider(durationEventItems, {
        keyAttributes: 'id'
    }), []);
    const dateConverter = useMemo(() => new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'long'
    }), []);
    const handleItemTypeChanged = (event: DatavizValueChangedEvent<string>) => {
        if (event.detail.updatedFrom === 'internal') {
            setItemTypeValue(event.detail.value);
        }
    };
    const getShortDesc = (itemData: TimelineDurationEventItem) => {
        const startTimeString = dateConverter.format(new Date(itemData.begin).toISOString());
        const endTimeString = dateConverter.format(new Date(itemData.finish).toISOString());
        return itemTypeValue === 'duration-event' ? `${startTimeString} - ${endTimeString}` : startTimeString;
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-timeline-item description={getShortDesc(item.data)} background={getBackgroundColor(item.data.series)} itemType={itemTypeValue} start={item.data.begin} end={item.data.finish} label={item.data.series}/>);
    return (<div id="timeline-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 class="oj-typography-subheading-md">Options To Control Event Types Below</h2>
        <oj-form-layout maxColumns={2} direction="row" class="oj-formlayout-full-width">
          <oj-label for="radioButtonset">Event types</oj-label>
          <oj-buttonset-one id="radioButtonset" class="oj-buttonset-width-auto" aria-label="Choose an overview." aria-controls="timeline" value={itemTypeValue} onvalueChanged={handleItemTypeChanged}>
            {itemTypeOptions.map((option) => (<oj-option key={option.id} value={option.id}>
                {option.label}
              </oj-option>))}
          </oj-buttonset-one>
        </oj-form-layout>
      </div>
      <oj-timeline id="timeline" aria-label="Events schedule" data={dataProvider} start={new Date('Jan 1, 2013').toISOString()} end={new Date('Dec 31, 2013').toISOString()} viewportStart={new Date('Jan 1, 2013').toISOString()} viewportEnd={new Date('May 31, 2013').toISOString()} selectionMode="single" majorAxis={majorAxis} minorAxis={minorAxis} valueFormats={valueFormats}>
        <template slot="itemTemplate" render={itemTemplateRenderer}/>
      </oj-timeline>
    </div>);
};
export default TimelineDurationEventBackground;
