// @ts-nocheck
import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import * as Context from 'ojs/ojcontext';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojbutton';
import 'ojs/ojinputnumber';
import 'ojs/ojtimeline';
import 'ojs/ojlabel';
import 'ojs/ojformlayout';
import 'css!./demo.css';

type ToggleValue = 'on' | 'off';
type OrientationValue = 'horizontal' | 'vertical';
type ScaleValue = 'hours' | 'days' | 'weeks' | 'months';

type TimelinePerformanceItem = {
  id: string;
  start: string;
  end: string;
  title: string;
  description: string;
  seriesId: string;
  series: string;
};

type TimelineInstance = {
  id: string;
  dataProvider: ArrayDataProvider<string, TimelinePerformanceItem>;
};

const START_DATE = new Date('Jan 1, 2014').toISOString();
const END_DATE = new Date('Dec 31, 2014').toISOString();
const overviewOptions = [
  { id: 'on', label: 'on' },
  { id: 'off', label: 'off' }
];
const orientationOptions = [
  { id: 'horizontal', label: 'horizontal' },
  { id: 'vertical', label: 'vertical' }
];
const minTimeScaleOptions = [
  { id: 'hours', label: 'hours' },
  { id: 'days', label: 'days' },
  { id: 'weeks', label: 'weeks' },
  { id: 'months', label: 'months' }
];
const zoomOrderByScale = {
  hours: ['months', 'weeks', 'days', 'hours'],
  days: ['months', 'weeks', 'days'],
  weeks: ['months', 'weeks'],
  months: ['months']
};
const scaleRank = {
  hours: 0,
  days: 1,
  weeks: 2,
  months: 3
};

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const prettyDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}`;
};

const generateRandomData = (numItems: number, instance: number): TimelinePerformanceItem[] => {
  const data: TimelinePerformanceItem[] = [];
  const week = 604800000;

  for (let index = 0; index < numItems; index++) {
    const start = randomDate(new Date(2014, 0, 1), new Date(2014, 11, 30));
    const seriesId = `series_${instance}`;
    data.push({
      id: `timeline-${instance}-item-${index}`,
      start: start.toISOString(),
      end: randomDate(new Date(start), new Date(start.getTime() + week)).toISOString(),
      title: `Item ${index}`,
      description: prettyDate(start),
      seriesId,
      series: seriesId
    });
  }

  return data;
};

const buildTimelineList = (numTimelines: number, numItems: number): TimelineInstance[] =>
  Array.from({ length: numTimelines }, (_: any, index: any) => ({
    id: `timeline-${index}`,
    dataProvider: new ArrayDataProvider(generateRandomData(numItems, index), {
      keyAttributes: 'id'
    })
  }));

const renderSeriesTemplate = (series: any) => <oj-timeline-series label={series.id} />;

const renderItemTemplate = (item: any) => (
  <oj-timeline-item
    seriesId={item.data.series ?? item.data.seriesId}
    start={item.data.start}
    end={item.data.end}
    description={item.data.description}
    label={item.data.title}
  />
);

const getIntervalCount = (scale: ScaleValue) => {
  if (scale === 'months') {
    return 12 + 4 + 1;
  }
  if (scale === 'weeks') {
    return 52 + 12 + 4 + 1;
  }
  if (scale === 'days') {
    return 365 + 52 + 12 + 4 + 1;
  }
  return 8760 + 365 + 52 + 12 + 4 + 1;
};

export const TimelinePerformanceMultipleInstances = () => {
  const [overviewValue, setOverviewValue] = useState<ToggleValue>('on');
  const [orientationValue, setOrientationValue] = useState<OrientationValue>('horizontal');
  const [shapedDataValue, setShapedDataValue] = useState<ToggleValue>('on');
  const [minTimeScaleValue, setMinTimeScaleValue] = useState<ScaleValue>('days');
  const [timeScaleValue, setTimeScaleValue] = useState<ScaleValue>('days');
  const [currentTimeScaleValue, setCurrentTimeScaleValue] = useState<ScaleValue>('days');
  const [zoomOrderValue, setZoomOrderValue] = useState(zoomOrderByScale.days);
  const [numTimelines, setNumTimelines] = useState(1);
  const [numItems, setNumItems] = useState(100);
  const [timeValue, setTimeValue] = useState(0);
  const [timelines, setTimelines] = useState<TimelineInstance[]>(() => buildTimelineList(1, 100));
  const renderCycleRef = useRef(0);
  const skipInitialRegenerationRef = useRef(true);

  const measureUpdate = (update: () => void) => {
    const cycle = ++renderCycleRef.current;
    const start = Date.now();
    setTimeValue(0);
    update();
    Context.getPageContext()
      .getBusyContext()
      .whenReady()
      .then(() => {
        if (renderCycleRef.current === cycle) {
          setTimeValue(Date.now() - start);
        }
      });
  };

  useEffect(() => {
    if (skipInitialRegenerationRef.current) {
      skipInitialRegenerationRef.current = false;
      return;
    }

    const timeout = window.setTimeout(() => {
      measureUpdate(() => {
        setTimelines(buildTimelineList(numTimelines, numItems));
      });
    }, 500);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [numItems, numTimelines]);

  const handleOverviewChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      measureUpdate(() => {
        setOverviewValue(event.detail.value);
      });
    }
  };

  const handleOrientationChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      measureUpdate(() => {
        setOrientationValue(event.detail.value);
      });
    }
  };

  const handleShapedDataChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      measureUpdate(() => {
        setShapedDataValue(event.detail.value);
      });
    }
  };

  const handleMinTimeScaleChanged = (event: any) => {
    if (event.detail.updatedFrom !== 'internal') {
      return;
    }

    const nextScale = event.detail.value as ScaleValue;
    const nextZoomOrder = zoomOrderByScale[nextScale];

    measureUpdate(() => {
      setMinTimeScaleValue(nextScale);
      setZoomOrderValue(nextZoomOrder);

      if (scaleRank[currentTimeScaleValue] < scaleRank[nextScale]) {
        setTimeScaleValue(nextScale);
        setCurrentTimeScaleValue(nextScale);
      }
    });
  };

  const handleNumTimelinesChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setNumTimelines(event.detail.value ?? 1);
    }
  };

  const handleNumItemsChanged = (event: any) => {
    if (event.detail.updatedFrom === 'internal') {
      setNumItems(event.detail.value ?? 0);
    }
  };

  const handleViewportChange = (event: any) => {
    if (event.detail.minorAxisScale) {
      setCurrentTimeScaleValue(event.detail.minorAxisScale);
    }
  };

  const refreshData = () => {
    measureUpdate(() => {
      setTimelines(buildTimelineList(numTimelines, numItems));
    });
  };

  const timerText = timeValue > 0 ? `Time:  ${timeValue}ms` : '';
  const intervalText = `Number of Time Intervals:  ${getIntervalCount(minTimeScaleValue)}`;
  const minorAxis = { scale: timeScaleValue, zoomOrder: zoomOrderValue };
  const overview = { rendered: overviewValue };

  return (
    <div id="timeline-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Timeline Below</h2>
        <oj-form-layout maxColumns={2} direction="row" class="oj-formlayout-full-width">
          <oj-button id="updateButton" onojAction={refreshData}>
            Regenerate Data
          </oj-button>
          <p class="bold" id="timerText">
            {timerText}
          </p>
        </oj-form-layout>
        <oj-form-layout maxColumns={3} direction="row" class="oj-formlayout-full-width">
          <oj-label for="radioButtonset1">Overview</oj-label>
          <oj-buttonset-one
            id="radioButtonset1"
            class="oj-buttonset-width-auto"
            aria-label="Choose an overview."
            value={overviewValue}
            onvalueChanged={handleOverviewChanged}
          >
            {overviewOptions.map((option: any) => (
              <oj-option key={option.id} value={option.id}>
                {option.label}
              </oj-option>
            ))}
          </oj-buttonset-one>

          <oj-label for="radioButtonset2">Orientation</oj-label>
          <oj-buttonset-one
            id="radioButtonset2"
            class="oj-buttonset-width-auto"
            aria-label="Choose only one setting."
            value={orientationValue}
            onvalueChanged={handleOrientationChanged}
          >
            {orientationOptions.map((option: any) => (
              <oj-option key={option.id} value={option.id}>
                {option.label}
              </oj-option>
            ))}
          </oj-buttonset-one>

          <oj-label for="radioButtonset4">Shaped Data</oj-label>
          <oj-buttonset-one
            id="radioButtonset4"
            class="oj-buttonset-width-auto"
            aria-label="Choose whether data is already shaped."
            value={shapedDataValue}
            onvalueChanged={handleShapedDataChanged}
          >
            {overviewOptions.map((option: any) => (
              <oj-option key={option.id} value={option.id}>
                {option.label}
              </oj-option>
            ))}
          </oj-buttonset-one>

          <oj-label for="radioButtonset3">Smallest Time Scale</oj-label>
          <oj-buttonset-one
            id="radioButtonset3"
            class="oj-buttonset-width-auto"
            aria-label="Choose only one setting."
            value={minTimeScaleValue}
            onvalueChanged={handleMinTimeScaleChanged}
          >
            {minTimeScaleOptions.map((option: any) => (
              <oj-option key={option.id} value={option.id}>
                {option.label}
              </oj-option>
            ))}
          </oj-buttonset-one>

          <span class="bold" id="intervalText">
            {intervalText}
          </span>
        </oj-form-layout>
        <oj-form-layout maxColumns={4} direction="row" class="oj-formlayout-full-width">
          <oj-input-number
            id="inputnumber-id1"
            min={1}
            step={1}
            value={numTimelines}
            onvalueChanged={handleNumTimelinesChanged}
            labelEdge="inside"
            labelHint="Number of Instances"
            class="demo-timeline-input-number"
          />
          <oj-input-number
            id="inputnumber-id2"
            min={0}
            step={10}
            value={numItems}
            onvalueChanged={handleNumItemsChanged}
            labelEdge="inside"
            labelHint="Number of Items"
            class="demo-timeline-input-number"
          />
        </oj-form-layout>
      </div>
      {timelines.map((timeline: any) =>
        shapedDataValue === 'on' ? (
          <oj-timeline
            key={`${timeline.id}-shaped`}
            id={`${timeline.id}-shaped`}
            aria-label="Performance Multiple Instances Demo"
            minorAxis={minorAxis}
            start={START_DATE}
            end={END_DATE}
            selectionMode="single"
            data={timeline.dataProvider}
            orientation={orientationValue}
            overview={overview}
            onojViewportChange={handleViewportChange}
            class="demo-timeline-viewport"
          />
        ) : (
          <oj-timeline
            key={`${timeline.id}-templated`}
            id={`${timeline.id}-templated`}
            aria-label="Performance Multiple Instances Demo"
            minorAxis={minorAxis}
            start={START_DATE}
            end={END_DATE}
            selectionMode="single"
            data={timeline.dataProvider}
            orientation={orientationValue}
            overview={overview}
            onojViewportChange={handleViewportChange}
            class="demo-timeline-viewport"
          >
            <template slot="seriesTemplate" render={renderSeriesTemplate} />
            <template slot="itemTemplate" render={renderItemTemplate} />
          </oj-timeline>
        )
      )}
    </div>
  );
};

export default TimelinePerformanceMultipleInstances;
