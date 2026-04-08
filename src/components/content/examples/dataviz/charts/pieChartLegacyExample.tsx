/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h, ComponentProps } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';

import 'ojs/ojchart';
import 'oj-c/buttonset-single';

import ArrayDataProvider = require('ojs/ojarraydataprovider');

import type { ojChart } from 'ojs/ojchart';

type PieChartDataItem = {
  id: number;
  series: string;
  group: string;
  value: number;
};

type PieItemTemplateContext = ojChart.ItemTemplateContext<number, PieChartDataItem>;
type ButtonsetSingleProps = ComponentProps<'oj-c-buttonset-single'>;
type ButtonsetSingleValueChangedEvent = Parameters<NonNullable<ButtonsetSingleProps['onvalueChanged']>>[0];

const pieChartData: PieChartDataItem[] = [
  { id: 0, series: 'Series 1', group: 'Group A', value: 42 },
  { id: 1, series: 'Series 2', group: 'Group A', value: 55 },
  { id: 2, series: 'Series 3', group: 'Group A', value: 36 },
  { id: 3, series: 'Series 4', group: 'Group A', value: 22 },
  { id: 4, series: 'Series 5', group: 'Group A', value: 22 }
];

const presentationOptions = [
  { value: 'pie', label: 'Pie' },
  { value: 'donut', label: 'Donut' }
] as const;

const presentationItems = presentationOptions.map(({ value, label }) => ({ value, label }));

const renderPieItemTemplate = (context: PieItemTemplateContext) => {
  const { data } = context;

  return (
    <oj-chart-item
      value={data.value}
      groupId={[data.group]}
      seriesId={data.series}
      shortDesc={`${data.series}: ${data.value}`}
    />
  );
};

export const PieChartLegacyExample = () => {
  const [presentation, setPresentation] = useState<(typeof presentationOptions)[number]['value']>('pie');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, PieChartDataItem>(pieChartData, { keyAttributes: 'id' }),
    []
  );

  const styleDefaults = useMemo(() => (presentation === 'donut' ? { pieInnerRadius: 0.5 } : {}), [presentation]);

  const handlePresentationChange = useCallback((event: ButtonsetSingleValueChangedEvent) => {
    const nextValue = event.detail.value;
    setPresentation(nextValue === 'donut' ? 'donut' : 'pie');
  }, []);

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-margin-4x-vertical oj-sm-padding-4x">
      <header class="oj-sm-margin-0">
        <h2 class="oj-typography-heading-sm oj-sm-margin-0">Share by Series (oj-chart Pie)</h2>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
          Demonstrates a basic oj-chart pie visualization powered by the Oracle JET MCP server.
        </p>
      </header>

      <div class="oj-sm-margin-3x-top">
        <div id="chart-container">
          <oj-chart
            id="pieChart"
            type="pie"
            data={dataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hoverBehavior="dim"
            styleDefaults={styleDefaults}
            aria-label="Pie chart comparing series contribution within Group A"
          >
            <template slot="itemTemplate" render={renderPieItemTemplate} />
          </oj-chart>
        </div>

        <div class="oj-sm-margin-3x-top" role="group" aria-label="Pie presentation mode">
          <h3 class="oj-typography-heading-2xs oj-sm-margin-0 oj-sm-margin-1x-bottom">Presentation</h3>
          <oj-c-buttonset-single
            aria-label="Select pie presentation mode"
            value={presentation}
            onvalueChanged={handlePresentationChange}
            items={presentationItems}
          />
        </div>
      </div>
    </section>
  );
};
