// @ts-nocheck
import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import * as timelineSeriesDataText from 'text!../data/cookbook/dataVisualizations/timeline/controlsTimeline/seriesData.json';
import 'ojs/ojtimeline';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojformlayout';
import 'css!./demo.css';

type TimelineControlsItem = {
  id: string;
  title: string;
  begin: string;
  finish: string;
  description: string;
  series: string;
};

const controlTimelineItems = JSON.parse(timelineSeriesDataText) as TimelineControlsItem[];
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };
const overviewOptions = [
  { id: 'on', label: 'on' },
  { id: 'off', label: 'off' }
];

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (
  <oj-timeline-series label={series.id} emptyText="No Tournaments Played." />
);

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    end={item.data.finish}
    label={item.data.title}
    description={item.data.description}
  />
);

export const TimelineControlsTimeline = () => {
  const [overviewValue, setOverviewValue] = useState('on');
  const [orientationValue, setOrientationValue] = useState('horizontal');
  const [screenSize, setScreenSize] = useState('large');
  const timelineRef = useRef<HTMLElement | null>(null);

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(controlTimelineItems, {
        keyAttributes: 'id'
      }),
    []
  );
  const smQuery = useMemo(
    () => ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY) || '(max-width: 599px)',
    []
  );
  const mdQuery = useMemo(
    () =>
      ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_ONLY) ||
      '(min-width: 600px) and (max-width: 1023px)',
    []
  );

  useEffect(() => {
    const updateResponsiveState = () => {
      if (window.matchMedia(smQuery).matches) {
        setScreenSize('small');
        setOrientationValue('vertical');
      } else if (window.matchMedia(mdQuery).matches) {
        setScreenSize('medium');
        setOrientationValue('vertical');
      } else {
        setScreenSize('large');
        setOrientationValue('horizontal');
      }

      const timelineElement = timelineRef.current;
      if (timelineElement) {
        const ratio = timelineElement.offsetWidth / timelineElement.offsetHeight;
        setOverviewValue(ratio < 0.95 ? 'off' : 'on');
      }
    };

    updateResponsiveState();
    window.addEventListener('resize', updateResponsiveState);

    return () => {
      window.removeEventListener('resize', updateResponsiveState);
    };
  }, [mdQuery, smQuery]);

  const handleOverviewChanged = (event: DatavizValueChangedEvent<string>) => {
    if (event.detail.updatedFrom === 'internal') {
      setOverviewValue(event.detail.value);
    }
  };

  return (
    <div id="timeline-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Timeline Below</h2>
        <oj-form-layout maxColumns={2} direction="row" class="oj-formlayout-full-width">
          <oj-label for="radioButtonset">Overview Rendered</oj-label>
          <oj-buttonset-one
            id="radioButtonset"
            class="oj-buttonset-width-auto oj-sm-padding-4x"
            aria-label="Choose an overview."
            aria-controls="timeline"
            value={overviewValue}
            onvalueChanged={handleOverviewChanged}
          >
            {overviewOptions.map((option) => (
              <oj-option key={option.id} value={option.id}>
                {option.label}
              </oj-option>
            ))}
          </oj-buttonset-one>
          <div>
            Current screen range: <span>{screenSize}</span>
          </div>
        </oj-form-layout>
      </div>
      <div>
        <oj-timeline
          ref={timelineRef}
          id="timeline"
          aria-label="Responsive Timeline Demo"
          class="demo-timeline"
          data={dataProvider}
          start={new Date('Jan 1, 2013').toISOString()}
          end={new Date('Dec 31, 2013').toISOString()}
          viewportStart={new Date('Jan 27, 2013').toISOString()}
          viewportEnd={new Date('Mar 24, 2013').toISOString()}
          selectionMode="single"
          orientation={orientationValue}
          overview={{ rendered: overviewValue }}
          majorAxis={majorAxis}
          minorAxis={minorAxis}
        >
          <template slot="seriesTemplate" render={renderSeriesTemplate} />
          <template slot="itemTemplate" render={renderItemTemplate} />
        </oj-timeline>
      </div>
    </div>
  );
};

export default TimelineControlsTimeline;
