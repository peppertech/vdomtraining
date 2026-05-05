// @ts-nocheck
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/sparkShapedData.json';
import * as rangeDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/sparkShapedRangeData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';

type SparkShapedValueItem = {
  id: number;
  value: number;
};

type SparkShapedRangeItem = {
  id: number;
  low: number;
  high: number;
};

const sparkData = JSON.parse(dataText as string) as SparkShapedValueItem[];
const sparkRangeData = JSON.parse(rangeDataText as string) as SparkShapedRangeItem[];

const barChartAriaLabel =
  'Bar Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';
const rangeChartAriaLabel =
  'Range Bar Spark Chart, Average Value: 4.5, Average Float Value: 4.6';
const lineChartAriaLabel =
  'Line Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';
const areaChartAriaLabel =
  'Area Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';

const SparkChartRow = ({ label, children }) => (
  <tr>
    <td>{label}</td>
    <td>{children}</td>
  </tr>
);

const createTooltipRenderer = (ariaLabel: string) => () => ({
  insert: ariaLabel.replaceAll(',', '<br>')
});

export const SparkChartShapedData = () => {
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

  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const barColor = colorHandler.getValue('barColor');
  const rangeBarColor = colorHandler.getValue('rangeBarColor');
  const lineColor = colorHandler.getValue('lineColor');
  const lineWithAreaColor = colorHandler.getValue('lineWithAreaColor');
  const areaColor = colorHandler.getValue('areaColor');
  const rangeAreaColor = colorHandler.getValue('rangeAreaColor');

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
              color={barColor}
              aria-label={barChartAriaLabel}
              {...barTooltipProps}
            />
          </SparkChartRow>
          <SparkChartRow label="Range Bar">
            <oj-spark-chart
              id="sparkChart2"
              type="bar"
              data={rangeDataProvider}
              color={rangeBarColor}
              aria-label={rangeChartAriaLabel}
              {...rangeTooltipProps}
            />
          </SparkChartRow>
          <SparkChartRow label="Line">
            <oj-spark-chart
              id="sparkChart3"
              type="line"
              data={dataProvider}
              color={lineColor}
              line-width={2}
              aria-label={lineChartAriaLabel}
              {...lineTooltipProps}
            />
          </SparkChartRow>
          <SparkChartRow label="Line with Area">
            <oj-spark-chart
              id="sparkChart4"
              type="lineWithArea"
              data={dataProvider}
              color={lineWithAreaColor}
              line-type="curved"
              aria-label={lineChartAriaLabel}
              {...lineTooltipProps}
            />
          </SparkChartRow>
          <SparkChartRow label="Area">
            <oj-spark-chart
              id="sparkChart5"
              type="area"
              data={dataProvider}
              color={areaColor}
              aria-label={areaChartAriaLabel}
              {...areaTooltipProps}
            />
          </SparkChartRow>
          <SparkChartRow label="Range Area">
            <oj-spark-chart
              id="sparkChart6"
              type="area"
              data={rangeDataProvider}
              color={rangeAreaColor}
              aria-label={areaChartAriaLabel}
              {...areaTooltipProps}
            />
          </SparkChartRow>
        </tbody>
      </table>
    </div>
  );
};

export default SparkChartShapedData;
