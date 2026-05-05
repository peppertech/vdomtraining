import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/sparkData.json';
import * as rangeDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/sparkRangeData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';

type SparkValueItem = {
  id: number;
  val: number;
};

type SparkRangeItem = {
  id: number;
  value0: number;
  value1: number;
};

const sparkData = JSON.parse(dataText as string) as SparkValueItem[];
const sparkRangeData = JSON.parse(rangeDataText as string) as SparkRangeItem[];

const barChartAriaLabel =
  'Bar Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';
const rangeChartAriaLabel =
  'Range Bar Spark Chart, Average Value: 4.5, Average Float Value: 4.6';
const lineChartAriaLabel =
  'Line Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';
const areaChartAriaLabel =
  'Area Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';

const renderValueItem = (item: any) => <oj-spark-chart-item value={item.data.val} />;

const renderRangeItem = (item: any) => (
  <oj-spark-chart-item low={item.data.value0} high={item.data.value1} />
);

const SparkChartRow = ({ label, children }: any) => (
  <tr>
    <td>{label}</td>
    <td>{children}</td>
  </tr>
);

const createTooltipRenderer = (ariaLabel: string) => () => ({
  insert: ariaLabel.replaceAll(',', '<br>')
});

export const SparkChartDefault = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(sparkData, {
        keyAttributes: 'id'
      }),
    []
  );
  const rangeDataProvider = useMemo(
    () =>
      new ArrayDataProvider(sparkRangeData, {
        keyAttributes: 'id'
      }),
    []
  );

  const barTooltipProps = useMemo(
    () => ({ 'tooltip.renderer': createTooltipRenderer(barChartAriaLabel) }),
    []
  );
  const rangeTooltipProps = useMemo(
    () => ({ 'tooltip.renderer': createTooltipRenderer(rangeChartAriaLabel) }),
    []
  );
  const lineTooltipProps = useMemo(
    () => ({ 'tooltip.renderer': createTooltipRenderer(lineChartAriaLabel) }),
    []
  );
  const areaTooltipProps = useMemo(
    () => ({ 'tooltip.renderer': createTooltipRenderer(areaChartAriaLabel) }),
    []
  );

  return (
    <div id="sparkChart-container">
      <table role="presentation">
        <tbody>
          <SparkChartRow label="Bar">
            <oj-spark-chart
              id="sparkChart1"
              type="bar"
              data={dataProvider}
              aria-label={barChartAriaLabel}
              {...barTooltipProps}
            >
              <template slot="itemTemplate" render={renderValueItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Range Bar">
            <oj-spark-chart
              id="sparkChart2"
              type="bar"
              data={rangeDataProvider}
              aria-label={rangeChartAriaLabel}
              {...rangeTooltipProps}
            >
              <template slot="itemTemplate" render={renderRangeItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Line">
            <oj-spark-chart
              id="sparkChart3"
              type="line"
              data={dataProvider}
              line-width={2}
              aria-label={lineChartAriaLabel}
              {...lineTooltipProps}
            >
              <template slot="itemTemplate" render={renderValueItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Line with Area">
            <oj-spark-chart
              id="sparkChart4"
              type="lineWithArea"
              data={dataProvider}
              line-type="curved"
              aria-label={lineChartAriaLabel}
              {...lineTooltipProps}
            >
              <template slot="itemTemplate" render={renderValueItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Area">
            <oj-spark-chart
              id="sparkChart5"
              type="area"
              data={dataProvider}
              aria-label={areaChartAriaLabel}
              {...areaTooltipProps}
            >
              <template slot="itemTemplate" render={renderValueItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Range Area">
            <oj-spark-chart
              id="sparkChart6"
              type="area"
              data={rangeDataProvider}
              aria-label={areaChartAriaLabel}
              {...areaTooltipProps}
            >
              <template slot="itemTemplate" render={renderRangeItem} />
            </oj-spark-chart>
          </SparkChartRow>
        </tbody>
      </table>
    </div>
  );
};

export default SparkChartDefault;
