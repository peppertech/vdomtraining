// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as employeeStartDataText from 'text!../data/cookbook/dataVisualizations/timeline/customRendererTimeline/employeeStartData.json';
import 'ojs/ojtimeline';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojbutton';
import 'ojs/ojmenu';
import 'css!./demo.css';

type TimelineEmployeeItem = {
  id: number;
  name: string;
  title: string;
  image: string;
  begin: string;
  series: string;
};

const employeeItems = (JSON.parse(employeeStartDataText) as TimelineEmployeeItem[]).map((item) => ({
  ...item,
  image: `/styles/images/hcm/${item.image.split('/').pop()}`
}));
const majorAxis = { scale: 'quarters' };
const minorAxis = { scale: 'weeks', zoomOrder: ['months', 'weeks', 'days'] };
const bubbleWidth = '24.5em';
const bubbleHeight = '6em';
const bubbleRtlX = '-22.5em';
const menuItems = [
  { id: 'save', label: 'Save', icon: 'oj-ux-ico-save' },
  { id: 'download', label: 'Download', icon: 'oj-ux-ico-download' },
  { id: 'print', label: 'Print...', icon: 'oj-ux-ico-print' }
];

const renderSeriesTemplate = (series: DatavizSeriesTemplateContext) => (
  <oj-timeline-series label={series.id} emptyText="No Data." />
);

const renderItemTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-timeline-item
    seriesId={item.data.series}
    start={item.data.begin}
    label={item.data.title}
    description={item.data.title}
  />
);

export const TimelineCustomRendererTimeline = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(employeeItems, {
        keyAttributes: 'id'
      }),
    []
  );
  const currentDateString = 'Mar 1, 2013';
  const currentDate = new Date(currentDateString).toISOString();
  const referenceObjects = useMemo(() => [{ value: currentDate }], [currentDate]);
  const bubbleX = document.documentElement.getAttribute('dir') === 'ltr' ? '0' : bubbleRtlX;

  const renderItemBubbleContentTemplate = (item: DatavizTemplateContext<DatavizChartDatum>) => (
    <svg class="demo-timeline-bubble" width={bubbleWidth} height={bubbleHeight}>
      <g>
        <foreignObject x={bubbleX} y="0" width={bubbleWidth} height={bubbleHeight}>
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            class="oj-timeline-item-bubble-container demo-timeline-bubble-content"
          >
            <oj-list-item-layout class="demo-timeline-list-item">
              <div slot="leading">
                <oj-avatar
                  role="img"
                  size="xs"
                  initials={item.itemData.name}
                  src={item.itemData.image}
                  aria-label={`Avatar of ${item.itemData.name}`}
                  title={`Avatar of ${item.itemData.name}`}
                />
              </div>
              <div class="oj-typography-body-sm">{item.itemData.name}</div>
              <div slot="secondary">
                <span class="oj-badge oj-badge-subtle oj-badge-info">{item.itemData.title}</span>
              </div>
              <div slot="tertiary">{item.itemData.begin}</div>
              <div slot="action">
                <oj-menu-button
                  chroming="borderless"
                  id={`menu${item.data.id}`}
                  class="oj-button-sm"
                  display="icons"
                >
                  <oj-menu slot="menu">
                    {menuItems.map((menuItem) => (
                      <oj-option key={`${menuItem.id}${item.data.id}`} value={menuItem.label} id={`${menuItem.id}${item.data.id}`}>
                        <span slot="startIcon" class={menuItem.icon}></span>
                        <span>{menuItem.label}</span>
                      </oj-option>
                    ))}
                  </oj-menu>
                </oj-menu-button>
              </div>
            </oj-list-item-layout>
          </div>
        </foreignObject>
      </g>
    </svg>
  );

  return (
    <oj-timeline
      id="tline"
      aria-label={`Single Series Timeline Demo. Current date is ${currentDateString}`}
      class="demo-timeline"
      data={dataProvider}
      start={new Date('Jan 1, 2013').toISOString()}
      end={new Date('Dec 31, 2013').toISOString()}
      viewportStart={new Date('Jan 27, 2013').toISOString()}
      viewportEnd={new Date('Mar 24, 2013').toISOString()}
      selection={[3]}
      selectionMode="single"
      referenceObjects={referenceObjects}
      majorAxis={majorAxis}
      minorAxis={minorAxis}
    >
      <template slot="seriesTemplate" render={renderSeriesTemplate} />
      <template slot="itemTemplate" render={renderItemTemplate} />
      <template slot="itemBubbleContentTemplate" render={renderItemBubbleContentTemplate} />
    </oj-timeline>
  );
};

export default TimelineCustomRendererTimeline;
