import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';

type SparkValueItem = {
  id: number;
  val: number;
};

type SparkRangeItem = {
  id: number;
  value0: number;
  value1: number;
};

const barChartAriaLabel =
  'Bar Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';
const rangeChartAriaLabel =
  'Range Bar Spark Chart, Average Value: 4.5, Average Float Value: 4.6';
const lineChartAriaLabel =
  'Line Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';
const areaChartAriaLabel =
  'Area Spark Chart, First Value: 5, Last Value: 2, Low Value: 0, High Value: 9';

const createTooltipRenderer = (ariaLabel: string) => () => ({
  insert: ariaLabel.replaceAll(',', '<br>')
});

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

const createSparkValues = () => {
  const values: SparkValueItem[] = [];
  const rangeValues: SparkRangeItem[] = [];

  for (let i = 0; i < 10; i += 1) {
    const val1 = Math.random();
    const val2 = Math.random() * 2;

    values.push({ id: i, val: val2 });
    rangeValues.push({
      id: i,
      value0: Math.min(val1, val2),
      value1: Math.max(val1, val2)
    });
  }

  return { values, rangeValues };
};

export const SparkChartAnimation = () => {
  const initialValues = useMemo(() => createSparkValues(), []);
  const [sparkValues, setSparkValues] = useState<SparkValueItem[]>(initialValues.values);
  const [sparkRangeValues, setSparkRangeValues] = useState<SparkRangeItem[]>(
    initialValues.rangeValues
  );

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(sparkValues, {
        keyAttributes: 'id'
      }),
    [sparkValues]
  );
  const rangeDataProvider = useMemo(
    () =>
      new ArrayDataProvider(sparkRangeValues, {
        keyAttributes: 'id'
      }),
    [sparkRangeValues]
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

  const updateButtonClick = () => {
    const nextValues = createSparkValues();
    setSparkValues(nextValues.values);
    setSparkRangeValues(nextValues.rangeValues);
  };

  return (
    <div id="sparkChart-container">
      <oj-toolbar
        id="buttonToolbar"
        chroming="outlined"
        aria-label="Chart Update Button Toolbar"
        aria-controls="sparkChart1 sparkChart2 sparkChart3 sparkChart4 sparkChart5 sparkChart6"
      >
        <oj-button id="button" onojAction={updateButtonClick}>
          Update values
        </oj-button>
      </oj-toolbar>

      <table role="presentation">
        <tbody>
          <SparkChartRow label="Bar">
            <oj-spark-chart
              id="sparkChart1"
              type="bar"
              animation-on-data-change="auto"
              data={dataProvider}
              color={barColor}
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
              animation-on-data-change="auto"
              data={rangeDataProvider}
              color={rangeBarColor}
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
              animation-on-data-change="auto"
              data={dataProvider}
              color={lineColor}
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
              animation-on-data-change="auto"
              data={dataProvider}
              color={lineWithAreaColor}
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
              animation-on-data-change="auto"
              data={dataProvider}
              color={areaColor}
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
              animation-on-data-change="auto"
              data={rangeDataProvider}
              color={rangeAreaColor}
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

export default SparkChartAnimation;
