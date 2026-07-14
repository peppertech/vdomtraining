import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/usaRevenueData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ApplyStackCategory = 'apply' | 'remove';
type ChartDatum = {
  id: number;
  year: string;
  region: string;
  tier: string;
  value: number;
};
type LegendItem = {
  value: number;
  text: string;
  color: string;
};
type LegendSections = {
  sections: Array<{
    title: string;
    items: LegendItem[];
  }>;
};
type ChartSeriesContext = {
  id: string;
};
type ChartItemContext = {
  data: ChartDatum;
};

const chartData = JSON.parse(chartDataText as string) as ChartDatum[];

export const ChartStackCategory = () => {
  const currencyConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD'
      }),
    []
  );
  const colorMap = useMemo<Record<string, string>>(
    () => ({
      'North America - Applications': '#195174',
      'North America - Middleware': '#267db3',
      'North America - Hardware': '#4ca3d9',
      'EMEA - Applications': '#409c5b',
      'EMEA - Middleware': '#68C182',
      'EMEA - Hardware': '#9ed7af',
      'Asia - Applications': '#F8c212',
      'Asia - Middleware': '#FAD55C',
      'Asia - Hardware': '#Fce8a6'
    }),
    []
  );
  const legendData = useMemo<LegendSections>(
    () => ({
      sections: [
        { title: 'North America', items: [] },
        { title: 'EMEA', items: [] },
        { title: 'Asia', items: [] }
      ]
    }),
    []
  );
  const [stackValue, setStackValue] = useState<ChartStack>('on');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [applyStackCategory, setApplyStackCategory] = useState<ApplyStackCategory>('apply');
  const stackButtonsetDisabled = false;
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<ChartDatum['id'], ChartDatum>(chartData, {
        keyAttributes: 'id'
      }),
    []
  );

  const handleApplyStackCategoryValueChanged = (event: JetElementCustomEvent<ApplyStackCategory>) => {
    setApplyStackCategory(event.detail.value);
  };

  const handleOrientationValueOrientationChanged = (
    event: JetElementCustomEvent<ChartOrientation>
  ) => {
    setOrientationValue(event.detail.value);
  };

  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
  };

  const getSeriesColor = (seriesId: string) => {
    return colorMap[seriesId] ?? '#267db3';
  };

  const getStackCategory = (seriesId: string): string | undefined => {
    if (seriesId.indexOf('North America') !== -1) {
      return 'group 1';
    }
    if (seriesId.indexOf('EMEA') !== -1) {
      return 'group 2';
    }
    if (seriesId.indexOf('Asia') !== -1) {
      return 'group 3';
    }

    return undefined;
  };

  const ojChartProps: Partial<ComponentProps<'oj-chart'>> = {
    yAxis: {
      tickLabel: {
        converter: currencyConverter
      }
    },
    valueFormats: {
      y: {
        converter: currencyConverter
      }
    }
  };

  const itemTemplateRenderer = (item: ChartItemContext) => {
    return (
      <oj-chart-item
        value={item.data.value}
        groupId={[item.data.year]}
        seriesId={`${item.data.region} - ${item.data.tier}`}
      />
    );
  };

  const seriesTemplateRenderer = (series: ChartSeriesContext) => {
    return (
      <oj-chart-series
        displayInLegend="off"
        color={getSeriesColor(series.id)}
        categories={[series.id]}
        stackCategory={applyStackCategory === 'apply' ? getStackCategory(series.id) : undefined}
      />
    );
  };

  return (
    <div id="chart-container">
      <oj-form-layout aria-label="Apply/remove stack catgeories from data." aria-controls="barChart">
        <demo-radioset-enum
          direction="row"
          disabled={stackButtonsetDisabled}
          labelHint="Stack Category"
          onvalueChanged={handleApplyStackCategoryValueChanged}
          value={applyStackCategory}
          enumValues={["apply", "remove"]}
        />
      </oj-form-layout>
      <oj-chart
        id="barChart"
        type="bar"
        orientation={orientationValue}
        stack={stackValue}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        legend={legendData}
        {...ojChartProps}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
        <template slot="seriesTemplate" render={seriesTemplateRenderer} />
      </oj-chart>
      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
        <demo-chart-orientation-control
          id="orientationControl"
          type="bar"
          focusManagement="none"
          onorientationChanged={handleOrientationValueOrientationChanged}
          orientation={orientationValue}
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <demo-chart-stack-control
          id="stackControl"
          type="bar"
          focusManagement="none"
          onstackChanged={handleStackValueStackChanged}
          stack={stackValue}
        />
      </oj-toolbar>
    </div>
  );
};

export default ChartStackCategory;
