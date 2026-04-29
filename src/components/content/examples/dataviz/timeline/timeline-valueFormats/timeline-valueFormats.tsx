// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import * as eventDataText from 'text!../data/cookbook/dataVisualizations/timeline/valueFormats/seriesData.json';
import * as durationDataText from 'text!../data/cookbook/dataVisualizations/timeline/valueFormats/basicSingleSeriesData.json';
import 'ojs/ojtimeline';
import 'ojs/ojinputtext';
import 'ojs/ojcheckboxset';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';
import 'ojs/ojbutton';
import 'ojs/ojlabel';

type TimelineEventItem = {
  id: string;
  title: string;
  begin: string;
  description: string;
  series: string;
};

type TimelineDurationItem = TimelineEventItem & {
  finish: string;
};

const eventItems = JSON.parse(eventDataText) as TimelineEventItem[];
const durationItems = JSON.parse(durationDataText) as TimelineDurationItem[];
const eventMinorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };
const eventMajorAxis = { scale: 'quarters' };

const renderEventSeriesTemplate = (series: any) => <oj-timeline-series label={series.id} />;
const renderDurationSeriesTemplate = (series: any) => (
  <oj-timeline-series label={series.id} emptyText="No Tournaments Played." />
);

export const TimelineValueFormats = () => {
  const [dataValue, setDataValue] = useState('Duration Event');
  const [seriesOption, setSeriesOption] = useState('Series Name');
  const [startOption, setStartOption] = useState('Start Date');
  const [endOption, setEndOption] = useState('End Date');
  const [dateOption, setDateOption] = useState('Date');
  const [titleOption, setTitleOption] = useState('Primary Text');
  const [descriptionOption, setDescriptionOption] = useState('Secondary Text');
  const [seriesDisplay, setSeriesDisplay] = useState(['auto']);
  const [startDisplay, setStartDisplay] = useState(['auto']);
  const [endDisplay, setEndDisplay] = useState(['auto']);
  const [dateDisplay, setDateDisplay] = useState(['auto']);
  const [titleDisplay, setTitleDisplay] = useState(['auto']);
  const [descriptionDisplay, setDescriptionDisplay] = useState(['auto']);

  const dateConverter = useMemo(
    () =>
      new IntlDateTimeConverter({
        formatType: 'date',
        dateFormat: 'short'
      }),
    []
  );
  const eventDataProvider = useMemo(
    () =>
      new ArrayDataProvider(eventItems, {
        keyAttributes: 'id'
      }),
    []
  );
  const durationDataProvider = useMemo(
    () =>
      new ArrayDataProvider(durationItems, {
        keyAttributes: 'id'
      }),
    []
  );

  const displayValue = (values: string[]) => (values.length > 0 ? 'auto' : 'off');
  const isDurationMode = dataValue === 'Duration Event';
  const valueFormats = useMemo(
    () => ({
      series: { tooltipDisplay: displayValue(seriesDisplay), tooltipLabel: seriesOption },
      start: { tooltipDisplay: displayValue(startDisplay), tooltipLabel: startOption, converter: dateConverter },
      end: { tooltipDisplay: displayValue(endDisplay), tooltipLabel: endOption, converter: dateConverter },
      date: { tooltipDisplay: displayValue(dateDisplay), tooltipLabel: dateOption, converter: dateConverter },
      title: { tooltipDisplay: displayValue(titleDisplay), tooltipLabel: titleOption },
      description: {
        tooltipDisplay: displayValue(descriptionDisplay),
        tooltipLabel: descriptionOption
      }
    }),
    [
      dateConverter,
      dateDisplay,
      dateOption,
      descriptionDisplay,
      descriptionOption,
      endDisplay,
      endOption,
      seriesDisplay,
      seriesOption,
      startDisplay,
      startOption,
      titleDisplay,
      titleOption
    ]
  );

  const handleRadioChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setDataValue(event.detail.value);
    }
  };

  const renderEventItemTemplate = (item: any) => (
    <oj-timeline-item
      itemType="event"
      seriesId={item.data.series}
      start={item.data.begin}
      label={item.data.title}
      description={item.data.description}
    />
  );

  const renderDurationItemTemplate = (item: any) => (
    <oj-timeline-item
      itemType="duration-event"
      seriesId={item.data.series}
      start={item.data.begin}
      end={item.data.finish}
      label={item.data.title}
      description={item.data.description}
    />
  );

  return (
    <div id="timeline-container">
      <div
        class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom"
        aria-controls="timeline"
        aria-label="controls for item type"
      >
        <h2 class="oj-typography-subheading-md">Options To Control The Timeline Below</h2>
        <h2 class="oj-typography-subheading-xs">Item Type</h2>
        <oj-buttonset-one value={dataValue} onvalueChanged={handleRadioChanged}>
          <oj-option value="Duration Event">Duration Event</oj-option>
          <oj-option value="Event">Event</oj-option>
        </oj-buttonset-one>

        <h3 class="oj-typography-subheading-xs oj-sm-margin-4x-top">Tooltip Label Options</h3>
        <oj-form-layout labelEdge="top" maxColumns={3} direction="row" userAssistanceDensity="reflow">
          <oj-label-value>
            <oj-checkboxset
              slot="label"
              id="title_checkboxSetId"
              value={titleDisplay}
              onvalueChanged={(event: any) => setTitleDisplay(event.detail.value)}
              aria-controls="timeline"
            >
              <oj-option value="auto">Title</oj-option>
            </oj-checkboxset>
            <oj-input-text
              slot="value"
              id="title"
              aria-label="Title"
              value={titleOption}
              onvalueChanged={(event: any) => setTitleOption(event.detail.value)}
              aria-controls="timeline"
            />
          </oj-label-value>
          <oj-label-value>
            <oj-checkboxset
              slot="label"
              id="description_checkboxSetId"
              value={descriptionDisplay}
              onvalueChanged={(event: any) => setDescriptionDisplay(event.detail.value)}
              aria-controls="timeline"
            >
              <oj-option value="auto">Description</oj-option>
            </oj-checkboxset>
            <oj-input-text
              slot="value"
              id="description"
              aria-label="Description"
              value={descriptionOption}
              onvalueChanged={(event: any) => setDescriptionOption(event.detail.value)}
              aria-controls="timeline"
            />
          </oj-label-value>
          <oj-label-value>
            <oj-checkboxset
              slot="label"
              id="date_checkboxSetId"
              value={dateDisplay}
              onvalueChanged={(event: any) => setDateDisplay(event.detail.value)}
              aria-controls="timeline"
            >
              <oj-option value="auto">Date</oj-option>
            </oj-checkboxset>
            <oj-input-text
              slot="value"
              id="date"
              aria-label="Date"
              value={dateOption}
              onvalueChanged={(event: any) => setDateOption(event.detail.value)}
              aria-controls="timeline"
            />
          </oj-label-value>
          <oj-label-value>
            <oj-checkboxset
              slot="label"
              id="series_checkboxSetId"
              value={seriesDisplay}
              onvalueChanged={(event: any) => setSeriesDisplay(event.detail.value)}
              aria-controls="timeline"
            >
              <oj-option value="auto">Series</oj-option>
            </oj-checkboxset>
            <oj-input-text
              slot="value"
              id="series"
              aria-label="Series"
              value={seriesOption}
              onvalueChanged={(event: any) => setSeriesOption(event.detail.value)}
              aria-controls="timeline"
            />
          </oj-label-value>
          <oj-label-value>
            <oj-checkboxset
              slot="label"
              id="start_checkboxSetId"
              value={startDisplay}
              onvalueChanged={(event: any) => setStartDisplay(event.detail.value)}
              aria-controls="timeline"
              disabled={!isDurationMode}
            >
              <oj-option value="auto">Start</oj-option>
            </oj-checkboxset>
            <oj-input-text
              slot="value"
              id="start"
              aria-label="Start"
              value={startOption}
              onvalueChanged={(event: any) => setStartOption(event.detail.value)}
              aria-controls="timeline"
              disabled={!isDurationMode}
            />
          </oj-label-value>
          <oj-label-value>
            <oj-checkboxset
              slot="label"
              id="end_checkboxSetId"
              value={endDisplay}
              onvalueChanged={(event: any) => setEndDisplay(event.detail.value)}
              aria-controls="timeline"
              disabled={!isDurationMode}
            >
              <oj-option value="auto">End</oj-option>
            </oj-checkboxset>
            <oj-input-text
              slot="value"
              id="end"
              aria-label="End"
              value={endOption}
              onvalueChanged={(event: any) => setEndOption(event.detail.value)}
              aria-controls="timeline"
              disabled={!isDurationMode}
            />
          </oj-label-value>
        </oj-form-layout>
      </div>
      {isDurationMode ? (
        <oj-timeline
          id="duration-event-timeline"
          aria-label="Duration Events timeline"
          data={durationDataProvider}
          dnd={{ move: { items: 'enabled' } }}
          itemDefaults={{ resizable: 'enabled' }}
          start={new Date('Dec 15, 2012').toISOString()}
          end={new Date('Jan 15, 2014').toISOString()}
          viewportStart={new Date('Jan 1, 2013').toISOString()}
          viewportEnd={new Date('Mar 31, 2013').toISOString()}
          viewportNavigationMode="discrete"
          selectionMode="single"
          majorAxis={eventMajorAxis}
          minorAxis={eventMinorAxis}
          valueFormats={valueFormats}
        >
          <template slot="seriesTemplate" render={renderDurationSeriesTemplate} />
          <template slot="itemTemplate" render={renderDurationItemTemplate} />
        </oj-timeline>
      ) : (
        <oj-timeline
          id="event-timeline"
          aria-label="Event timeline"
          data={eventDataProvider}
          start={new Date('Jan 1, 2010').toISOString()}
          end={new Date('Dec 31, 2010').toISOString()}
          selectionMode="single"
          majorAxis={eventMajorAxis}
          minorAxis={eventMinorAxis}
          valueFormats={valueFormats}
        >
          <template slot="seriesTemplate" render={renderEventSeriesTemplate} />
          <template slot="itemTemplate" render={renderEventItemTemplate} />
        </oj-timeline>
      )}
    </div>
  );
};

export default TimelineValueFormats;
