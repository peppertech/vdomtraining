import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/sparkData.json';
import * as rangeDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/sparkRangeData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type RefObjectType = 'line' | 'area';
type LocationValue = 'back' | 'front';

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

const constantLine = {
  type: 'line',
  value: 5,
  color: '#ffb54d',
  lineWidth: 2,
  shortDesc: 'Sample Reference Line'
};

const constantArea = {
  type: 'area',
  low: 4,
  high: 7,
  color: '#60ffb54d',
  shortDesc: 'Sample Reference Area'
};

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

export const SparkChartRefObject = () => {
  const [locationValue, setLocationValue] = useState<LocationValue>('back');
  const [refObjTypeValue, setRefObjTypeValue] = useState<RefObjectType>('line');

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

  const referenceObjects = useMemo(
    () => [
      refObjTypeValue === 'line'
        ? { ...constantLine, location: locationValue }
        : { ...constantArea, location: locationValue }
    ],
    [locationValue, refObjTypeValue]
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

  const handleLocationValueChanged = (event: JetElementCustomEvent<LocationValue>) => {
    setLocationValue(event.detail.value);
  };

  const handleRefObjTypeValueChanged = (event: JetElementCustomEvent<RefObjectType>) => {
    setRefObjTypeValue(event.detail.value);
  };

  return (
    <div id="sparkChart-container">
      <oj-form-layout
        maxColumns={2}
        aria-controls="sparkChart1 sparkChart2 sparkChart3 sparkChart4 sparkChart5 sparkChart6"
      >
        <demo-radioset-enum
          id="radioButtonset6"
          labelHint="Reference Type"
          direction="row"
          value={refObjTypeValue}
          onvalueChanged={handleRefObjTypeValueChanged}
          enumValues={["line", "area"]}
        />
        <demo-radioset-enum
          id="radioButtonset3"
          labelHint="Location"
          direction="row"
          value={locationValue}
          onvalueChanged={handleLocationValueChanged}
          enumValues={["back", "front"]}
        />
      </oj-form-layout>

      <table role="presentation">
        <tbody>
          <SparkChartRow label="Bar">
            <oj-spark-chart
              id="sparkChart1"
              type="bar"
              data={dataProvider}
              color={barColor}
              reference-objects={referenceObjects}
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
              color={rangeBarColor}
              reference-objects={referenceObjects}
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
              color={lineColor}
              line-width={2}
              reference-objects={referenceObjects}
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
              color={lineWithAreaColor}
              line-type="curved"
              reference-objects={referenceObjects}
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
              color={areaColor}
              reference-objects={referenceObjects}
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
              color={rangeAreaColor}
              reference-objects={referenceObjects}
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

export default SparkChartRefObject;
