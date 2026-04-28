import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import { ojChart } from 'ojs/ojchart';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as revenueDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/revenueData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type RevenueYear = '2013' | '2014' | '2015';

type RevenueDatum = {
  id: string;
  year: RevenueYear;
  product: string;
  revenue: number;
};

type RevenueDataByYear = Record<RevenueYear, RevenueDatum[]>;

const revenueData = JSON.parse(revenueDataText as string) as RevenueDataByYear;

export const PyramidChartDefault = () => {
  const [year, setYear] = useState<RevenueYear>('2015');
  const chartData = revenueData[year];
  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, RevenueDatum>(chartData, { keyAttributes: 'id' }),
    [chartData]
  );

  const tooltipFunc = (dataContext: ojChart.TooltipContext<string, RevenueDatum, null>) => ({
    insert: `${dataContext.series} : ${dataContext.value}B`
  });

  const handleYearChanged = (event: JetElementCustomEvent<RevenueYear>) => {
    setYear(event.detail.value);
  };

  const itemTemplateRenderer = (item: { data: RevenueDatum }) => (
    <oj-chart-item
      value={item.data.revenue}
      groupId={[item.data.year]}
      seriesId={item.data.product}
    />
  );

  const ojChartProps = { 'tooltip.renderer': tooltipFunc };

  return (
    <div id="chart-container">
      <div class="oj-typography-heading-xs">
        Company&apos;s Revenue (<span>{year}</span>)
      </div>

      <br />

      <oj-form-layout aria-controls="pyramidChart">
        <demo-radioset-enum
          direction="row"
          labelHint="Year"
          value={year}
          onvalueChanged={handleYearChanged}
          enumValues={["2013","2014","2015"]}
        />
      </oj-form-layout>

      <oj-chart
        id="pyramidChart"
        type="pyramid"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        {...ojChartProps}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default PyramidChartDefault;
