/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h, ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';

import 'oj-c/area-chart';
import 'oj-c/area-chart-group';
import 'oj-c/area-chart-item';
import 'oj-c/area-chart-series';
import 'ojs/ojswitch';
import 'ojs/ojtoolbar';

import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

import type { ojSwitch } from 'ojs/ojswitch';

// Template context shapes mirror the public JET documentation for oj-c-area-chart.
type AreaChartItemTemplateContext = {
  data: AreaChartDataItem;
  key: string;
  index: number;
};

type AreaChartSeriesTemplateContext = {
  id: string;
  index: number;
  items: AreaChartItemTemplateContext[];
};

type AreaChartGroupTemplateContext = {
  ids: string[];
  index: number;
  depth: number;
  items: AreaChartItemTemplateContext[];
};

type AreaChartDataItem = {
  id: string;
  series: string;
  quarter: string;
  value: number;
  shortDesc: string;
};

const quarterlySalesData: AreaChartDataItem[] = [
  { id: '0', series: 'Series 1', quarter: 'Q1', value: 74, shortDesc: 'Series 1 Q1 value: 74' },
  { id: '1', series: 'Series 1', quarter: 'Q2', value: 42, shortDesc: 'Series 1 Q2 value: 42' },
  { id: '2', series: 'Series 1', quarter: 'Q3', value: 70, shortDesc: 'Series 1 Q3 value: 70' },
  { id: '3', series: 'Series 1', quarter: 'Q4', value: 46, shortDesc: 'Series 1 Q4 value: 46' },
  { id: '4', series: 'Series 2', quarter: 'Q1', value: 50, shortDesc: 'Series 2 Q1 value: 50' },
  { id: '5', series: 'Series 2', quarter: 'Q2', value: 58, shortDesc: 'Series 2 Q2 value: 58' },
  { id: '6', series: 'Series 2', quarter: 'Q3', value: 46, shortDesc: 'Series 2 Q3 value: 46' },
  { id: '7', series: 'Series 2', quarter: 'Q4', value: 54, shortDesc: 'Series 2 Q4 value: 54' },
  { id: '8', series: 'Series 3', quarter: 'Q1', value: 34, shortDesc: 'Series 3 Q1 value: 34' },
  { id: '9', series: 'Series 3', quarter: 'Q2', value: 22, shortDesc: 'Series 3 Q2 value: 22' },
  { id: '10', series: 'Series 3', quarter: 'Q3', value: 30, shortDesc: 'Series 3 Q3 value: 30' },
  { id: '11', series: 'Series 3', quarter: 'Q4', value: 32, shortDesc: 'Series 3 Q4 value: 32' },
  { id: '12', series: 'Series 4', quarter: 'Q1', value: 18, shortDesc: 'Series 4 Q1 value: 18' },
  { id: '13', series: 'Series 4', quarter: 'Q2', value: 6, shortDesc: 'Series 4 Q2 value: 6' },
  { id: '14', series: 'Series 4', quarter: 'Q3', value: 14, shortDesc: 'Series 4 Q3 value: 14' },
  { id: '15', series: 'Series 4', quarter: 'Q4', value: 22, shortDesc: 'Series 4 Q4 value: 22' }
];

const renderItemTemplate = (context: AreaChartItemTemplateContext) => {
  const item = context.data;

  return (
    <oj-c-area-chart-item
      seriesId={item.series}
      groupId={[item.quarter]}
      value={item.value}
      shortDesc={item.shortDesc}
    />
  );
};

const renderSeriesTemplate = (context: AreaChartSeriesTemplateContext) => (
  <oj-c-area-chart-series id={context.id} name={context.id} />
);

const renderGroupTemplate = (context: AreaChartGroupTemplateContext) => {
  const label = context.ids.length ? context.ids[context.ids.length - 1] : `Group ${context.index + 1}`;
  const identifier = context.ids.length ? context.ids.join('-') : `group-${context.index}`;

  return <oj-c-area-chart-group id={identifier} name={label} />;
};

export const AreaChartDefault = () => {
  const [isHorizontal, setIsHorizontal] = useState<boolean>(false);
  const [isStacked, setIsStacked] = useState<boolean>(true);

  const handleOrientationToggle = useCallback((event: ojSwitch.valueChanged) => {
    setIsHorizontal(event.detail.value as boolean);
  }, []);

  const handleStackToggle = useCallback((event: ojSwitch.valueChanged) => {
    setIsStacked(event.detail.value as boolean);
  }, []);

  const dataProvider = useMemo(
    () => new MutableArrayDataProvider<string, AreaChartDataItem>(quarterlySalesData, { keyAttributes: 'id' }),
    []
  );

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-margin-4x-vertical oj-sm-padding-4x">
      <header class="oj-sm-margin-0">
        <h2 class="oj-typography-heading-sm oj-sm-margin-0">Regional Revenue Trend</h2>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
          Sample oj-c-area-chart configuration powered by the Oracle JET MCP server in a VDOM component.
        </p>
      </header>

      <oj-toolbar id="myToolbar" aria-label="Chart display options toolbar" aria-controls="areaChart" class="oj-sm-margin-2x-top">
        <oj-switch
          id="orientationControl"
          value={isHorizontal}
          labelHint="Horizontal orientation"
          onvalueChanged={handleOrientationToggle}
          aria-label="Toggle chart orientation between vertical and horizontal"
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <oj-switch
          id="stackControl"
          value={isStacked}
          labelHint="Stack series"
          onvalueChanged={handleStackToggle}
          aria-label="Toggle chart stacking between on and off"
        />
      </oj-toolbar>

      <oj-c-area-chart
        id="areaChart"
        class="oj-sm-margin-3x-top"
        aria-label="Area chart with four series over four quarters"
        data={dataProvider}
        orientation={isHorizontal ? 'horizontal' : 'vertical'}
        hoverBehavior="dim"
        stack={isStacked ? 'on' : 'off'}
        selectionMode="single"
        legend={{ rendered: 'on', position: 'top' }}
        xAxis={{ title: 'Fiscal Quarter' }}
        yAxis={{ title: 'Revenue (Millions USD)' }}
      >
        <template slot="groupTemplate" render={renderGroupTemplate} />
        <template slot="seriesTemplate" render={renderSeriesTemplate} />
        <template slot="itemTemplate" render={renderItemTemplate} />
      </oj-c-area-chart>
    </section>
  );
};

