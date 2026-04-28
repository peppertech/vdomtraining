import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import { ojChart } from 'ojs/ojchart';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as shapedRevenueDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/shapedRevenueData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type RevenueYear = '2013' | '2014' | '2015';

type ShapedRevenueDatum = {
  id: string;
  groupId: [RevenueYear];
  seriesId: string;
  value: number;
};

type RevenueDataByYear = Record<RevenueYear, ShapedRevenueDatum[]>;

const revenueData = JSON.parse(shapedRevenueDataText as string) as RevenueDataByYear;

export const PyramidChartShapedData = () => {
  const [year, setYear] = useState<RevenueYear>('2015');
  const chartData = revenueData[year];
  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, ShapedRevenueDatum>(chartData, { keyAttributes: 'id' }),
    [chartData]
  );

  const tooltipFunc = (dataContext: ojChart.TooltipContext<string, ShapedRevenueDatum, null>) => ({
    insert: `${dataContext.series} : ${dataContext.value}B`
  });

  const handleYearChanged = (event: JetElementCustomEvent<RevenueYear>) => {
    setYear(event.detail.value);
  };

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
          id="basicSelect"
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
        aria-label="Pyramid chart with five series over three years"
        {...ojChartProps}
      />
    </div>
  );
};

export default PyramidChartShapedData;
