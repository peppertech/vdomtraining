import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojlabel';
import 'ojs/ojtimeline';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as selectionDataText from 'text!./nadal_2013.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type TimelineSelectionItem = {
  event: string;
  startDate: string;
  endDate: string;
  result: string;
};

const selectionItems = JSON.parse(selectionDataText) as TimelineSelectionItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'months', zoomOrder: ['months', 'weeks', 'days'] };

const renderSeriesTemplate = () => <oj-timeline-series label="Rafael Nadal: 75-5" />;

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    start={item.data.startDate}
    end={item.data.endDate}
    label={item.data.event}
    description={item.data.result}
  />
);

export const TimelineSelection = () => {
  const [selectionMode, setSelectionMode] = useState<NonNullable<ComponentProps<'oj-timeline'>['selectionMode']>>('multiple');
  const [selectionValue, setSelectionValue] = useState(['FRENCH OPEN', 'US OPEN']);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(selectionItems, {
        keyAttributes: 'event'
      }),
    []
  );

  const handleSelectionModeChanged = (event: DatavizValueChangedEvent<typeof selectionMode>) => {
    if (event.detail.updatedFrom !== 'internal') {
      return;
    }

    const nextMode = event.detail.value;
    setSelectionMode(nextMode);

    if (nextMode === 'multiple') {
      setSelectionValue(['FRENCH OPEN', 'US OPEN']);
    } else if (nextMode === 'single') {
      setSelectionValue(['FRENCH OPEN']);
    } else {
      setSelectionValue([]);
    }
  };

  const handleSelectionChanged = (event: DatavizValueChangedEvent<string[] | null>) => {
    if (event.detail.updatedFrom === 'internal') {
      setSelectionValue(event.detail.value ?? []);
    }
  };

  const selectionText = selectionValue.join(', ');

  return (
    <div id="timeline-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Timeline Selection</h2>
        <oj-form-layout maxColumns={2} direction="row" class="oj-formlayout-full-width">
          <oj-label for="radioButtonset">Selection</oj-label>
          <oj-buttonset-one
            id="radioButtonset"
            aria-controls="timeline"
            class="oj-sm-padding-4x-start"
            value={selectionMode}
            onvalueChanged={handleSelectionModeChanged}
          >
            <oj-option value="none">none</oj-option>
            <oj-option value="single">single</oj-option>
            <oj-option value="multiple">multiple</oj-option>
          </oj-buttonset-one>
          <div class="demo-selection-text-container">
            <span id="currentText" class="demo-timeline-selection oj-text-color-secondary">
              Current Selection:
            </span>
            <span
              id="currentText2"
              class="oj-sm-padding-2x-start demo-timeline-selection oj-text-color-secondary"
            >
              {selectionText}
            </span>
          </div>
        </oj-form-layout>
      </div>

      <oj-timeline
        id="timeline"
        class="demo-timeline"
        data={dataProvider}
        start={new Date('Jan 1, 2013').toISOString()}
        end={new Date('Dec 31, 2013').toISOString()}
        selection={selectionValue}
        selectionMode={selectionMode}
        onselectionChanged={handleSelectionChanged}
        majorAxis={majorAxis}
        minorAxis={minorAxis}
      >
        <template slot="seriesTemplate" render={renderSeriesTemplate} />
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-timeline>
    </div>
  );
};

export default TimelineSelection;
