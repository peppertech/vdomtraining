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

type BarChartDataItem = {
  id: number;
  series: string;
  group: string;
  value: number;
};

type ButtonsetSingleComponentProps = ComponentProps<'oj-c-buttonset-single'>;
type ButtonsetSingleValueChangedEvent = Parameters<
  NonNullable<ButtonsetSingleComponentProps['onvalueChanged']>
>[0];

type ChartItemTemplateContext = ojChart.ItemTemplateContext<number, BarChartDataItem>;

const barChartSampleData: BarChartDataItem[] = [
  { id: 0, series: 'Series 1', group: 'Group A', value: 42 },
  { id: 1, series: 'Series 1', group: 'Group B', value: 34 },
  { id: 2, series: 'Series 2', group: 'Group A', value: 55 },
  { id: 3, series: 'Series 2', group: 'Group B', value: 30 },
  { id: 4, series: 'Series 3', group: 'Group A', value: 36 },
  { id: 5, series: 'Series 3', group: 'Group B', value: 50 },
  { id: 6, series: 'Series 4', group: 'Group A', value: 22 },
  { id: 7, series: 'Series 4', group: 'Group B', value: 46 },
  { id: 8, series: 'Series 5', group: 'Group A', value: 22 },
  { id: 9, series: 'Series 5', group: 'Group B', value: 46 }
];

const orientationOptions = [
  { value: 'vertical', label: 'Vertical Bars' },
  { value: 'horizontal', label: 'Horizontal Bars' }
] as const;

const stackingOptions = [
  { value: 'off', label: 'Unstacked' },
  { value: 'on', label: 'Stacked' }
] as const;

const chartToggleStartIcon = {
  type: 'class' as const,
  class: 'oj-ux-ico-chart-bar-v-alt oj-button-icon oj-start'
};

const orientationButtonItems = orientationOptions.map((option) => ({
  ...option,
  startIcon: chartToggleStartIcon
}));

const stackingButtonItems = stackingOptions.map((option) => ({
  ...option,
  startIcon: chartToggleStartIcon
}));

const renderItemTemplate = (context: ChartItemTemplateContext) => {
  const { data } = context;

  return (
    <oj-chart-item
      value={data.value}
      groupId={[data.group]}
      seriesId={data.series}
      shortDesc={`${data.series} in ${data.group}: ${data.value}`}
    />
  );
};

export const BarChartLegacyExample = () => {
  const [orientationValue, setOrientationValue] = useState<(typeof orientationOptions)[number]['value']>(
    'vertical'
  );
  const [stackValue, setStackValue] = useState<(typeof stackingOptions)[number]['value']>('off');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, BarChartDataItem>(barChartSampleData, { keyAttributes: 'id' }),
    []
  );

  const { groupTotals, topSeries, averageValue } = useMemo(() => {
    const groupedTotals = new Map<string, number>();
    const seriesTotals = new Map<string, number>();
    let totalValue = 0;

    barChartSampleData.forEach(({ group, series, value }) => {
      groupedTotals.set(group, (groupedTotals.get(group) ?? 0) + value);
      seriesTotals.set(series, (seriesTotals.get(series) ?? 0) + value);
      totalValue += value;
    });

    const groupTotalsArray = Array.from(groupedTotals.entries()).map(([group, total]) => ({ group, total }));
    const seriesTotalsArray = Array.from(seriesTotals.entries()).map(([seriesName, total]) => ({
      series: seriesName,
      total
    }));

    const leadingSeries =
      seriesTotalsArray.reduce(
        (highest, entry) => (entry.total > highest.total ? entry : highest),
        seriesTotalsArray[0] ?? { series: '', total: 0 }
      ) ?? { series: '', total: 0 };

    return {
      groupTotals: groupTotalsArray,
      topSeries: leadingSeries,
      averageValue: totalValue / (barChartSampleData.length || 1)
    };
  }, []);

  const handleOrientationChange = useCallback(
    (event: ButtonsetSingleValueChangedEvent) => {
      const nextValue = event.detail.value;
      setOrientationValue(nextValue === 'horizontal' ? 'horizontal' : 'vertical');
    },
    []
  );

  const handleStackChange = useCallback(
    (event: ButtonsetSingleValueChangedEvent) => {
      const nextValue = event.detail.value;
      setStackValue(nextValue === 'on' ? 'on' : 'off');
    },
    []
  );

  return (
    <section class="oj-panel oj-panel-alt1 oj-sm-margin-4x-vertical oj-sm-padding-4x">
      <header class="oj-sm-margin-0">
        <h2 class="oj-typography-heading-sm oj-sm-margin-0">Sales Mix (oj-chart)</h2>
        <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-0 oj-sm-margin-1x-top">
          Classic oj-chart VDOM example that mirrors the Oracle JET MCP HTML pattern with interactive orientation and
          stacking controls.
        </p>
      </header>

      <div class="oj-sm-margin-3x-top">
        <div id="chart-container" class="oj-sm-margin-2x-bottom">
          <oj-chart
            id="barChart"
            type="bar"
            orientation={orientationValue}
            stack={stackValue}
            data={dataProvider}
            animationOnDisplay="auto"
            animationOnDataChange="auto"
            hoverBehavior="dim"
            legend={{ rendered: 'on', position: orientationValue === 'vertical' ? 'top' : 'end' }}
            xAxis={{ title: 'Group' }}
            yAxis={{ title: 'Value' }}
            aria-label="Comparison of series performance across groups"
          >
            <template slot="itemTemplate" render={renderItemTemplate} />
          </oj-chart>
        </div>

        <div
          class="oj-flex oj-sm-flex-items-inherit oj-sm-align-items-center oj-sm-justify-content-space-between"
          role="group"
          aria-label="Chart display options"
        >
          <div class="oj-sm-flex-1">
            <h3 class="oj-typography-heading-2xs oj-sm-margin-0 oj-sm-margin-1x-bottom">Orientation</h3>
            <oj-c-buttonset-single
              aria-label="Toggle bar chart orientation"
              value={orientationValue}
              onvalueChanged={handleOrientationChange}
              items={orientationButtonItems}
            />
          </div>

          <div class="oj-sm-flex-1">
            <h3 class="oj-typography-heading-2xs oj-sm-margin-0 oj-sm-margin-1x-bottom">Stacking</h3>
            <oj-c-buttonset-single
              aria-label="Toggle bar chart stacking"
              value={stackValue}
              onvalueChanged={handleStackChange}
              items={stackingButtonItems}
            />
          </div>
        </div>

        <div class="oj-sm-margin-4x-top">
          <h3 class="oj-typography-heading-2xs oj-sm-margin-0 oj-sm-margin-1x-bottom">Highlights</h3>
          <ul
            class="oj-typography-body-sm oj-sm-margin-0"
            style={{ listStyleType: 'disc', paddingInlineStart: '20px' }}
          >
            <li>
              Strongest series:&nbsp;
              {topSeries.series ? `${topSeries.series} (${topSeries.total})` : 'Not available'}
            </li>
            {groupTotals.map(({ group, total }) => (
              <li key={group}>
                {group} total value: {total}
              </li>
            ))}
            <li>Average value per data point: {averageValue.toFixed(1)}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
