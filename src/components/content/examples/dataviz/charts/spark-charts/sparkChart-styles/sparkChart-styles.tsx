import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/sparkData.json';
import * as rangeDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/sparkRangeData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import 'css!./demo.css';

type CurrentTab = 'shapeAttrs' | 'colorAttrs';
type LineType = 'straight' | 'curved' | 'stepped' | 'segmented' | 'none';
type LineStyle = 'solid' | 'dashed' | 'dotted';
type MarkerShape =
  | 'auto'
  | 'square'
  | 'circle'
  | 'diamond'
  | 'plus'
  | 'triangleDown'
  | 'triangleUp'
  | 'human'
  | 'star';

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

const renderValueItem = (item: DatavizTemplateContext<DatavizChartDatum>) => <oj-spark-chart-item value={item.data.val} />;

const renderRangeItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-spark-chart-item low={item.data.value0} high={item.data.value1} />
);

const SparkChartRow = ({ label, children }: DatavizSparkChartRowProps) => (
  <tr>
    <td>{label}</td>
    <td>{children}</td>
  </tr>
);

const createTooltipRenderer = (ariaLabel: string) => () => ({
  insert: ariaLabel.replaceAll(',', '<br>')
});

export const SparkChartStyles = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);

  const [currentTab, setCurrentTab] = useState<CurrentTab>('shapeAttrs');
  const [color, setColor] = useState(colorHandler.getValue('color'));
  const [firstColor, setFirstColor] = useState(colorHandler.getValue('firstcolor'));
  const [highColor, setHighColor] = useState(colorHandler.getValue('highcolor'));
  const [lastColor, setLastColor] = useState(colorHandler.getValue('lastcolor'));
  const [lowColor, setLowColor] = useState(colorHandler.getValue('lowcolor'));
  const [barGapRatio, setBarGapRatio] = useState(0.2);
  const [lineType, setLineType] = useState<LineType>('curved');
  const [lineWidth, setLineWidth] = useState(2);
  const [lineStyle, setLineStyle] = useState<LineStyle>('solid');
  const [markerShape, setMarkerShape] = useState<MarkerShape>('circle');
  const [markerSize, setMarkerSize] = useState(8);

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

  const handleCurrentTabValueChanged = (event: JetElementCustomEvent<CurrentTab>) => {
    setCurrentTab(event.detail.value);
  };

  const handleBarGapRatioValueChanged = (event: DatavizValueChangedEvent<number | null>) => {
    setBarGapRatio(event.detail.value ?? 0);
  };

  const handleLineTypeValueChanged = (event: JetElementCustomEvent<LineType>) => {
    setLineType(event.detail.value);
  };

  const handleLineWidthValueChanged = (event: DatavizValueChangedEvent<number | null>) => {
    setLineWidth(event.detail.value ?? 0);
  };

  const handleLineStyleValueChanged = (event: JetElementCustomEvent<LineStyle>) => {
    setLineStyle(event.detail.value);
  };

  const handleMarkerShapeValueChanged = (event: JetElementCustomEvent<MarkerShape>) => {
    setMarkerShape(event.detail.value);
  };

  const handleMarkerSizeValueChanged = (event: DatavizValueChangedEvent<number | null>) => {
    setMarkerSize(event.detail.value ?? 0);
  };

  const handleColorValueChanged = (event: DatavizValueChangedEvent<string | null>) => {
    setColor(event.detail.value ?? '');
  };

  const handleFirstColorValueChanged = (event: DatavizValueChangedEvent<string | null>) => {
    setFirstColor(event.detail.value ?? '');
  };

  const handleLastColorValueChanged = (event: DatavizValueChangedEvent<string | null>) => {
    setLastColor(event.detail.value ?? '');
  };

  const handleHighColorValueChanged = (event: DatavizValueChangedEvent<string | null>) => {
    setHighColor(event.detail.value ?? '');
  };

  const handleLowColorValueChanged = (event: DatavizValueChangedEvent<string | null>) => {
    setLowColor(event.detail.value ?? '');
  };

  return (
    <div id="sparkChart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
      <table role="presentation" class="oj-flex-item oj-sm-margin-8x-end">
        <tbody>
          <SparkChartRow label="Bar">
            <oj-spark-chart
              class="demo-sparkChart"
              id="sparkChart1"
              type="bar"
              data={dataProvider}
              bar-gap-ratio={barGapRatio}
              color={color}
              first-color={firstColor}
              last-color={lastColor}
              high-color={highColor}
              low-color={lowColor}
              aria-label={barChartAriaLabel}
              {...barTooltipProps}
            >
              <template slot="itemTemplate" render={renderValueItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Range Bar">
            <oj-spark-chart
              class="demo-sparkChart"
              id="sparkChart2"
              type="bar"
              data={rangeDataProvider}
              bar-gap-ratio={barGapRatio}
              color={color}
              first-color={firstColor}
              last-color={lastColor}
              high-color={highColor}
              low-color={lowColor}
              aria-label={rangeChartAriaLabel}
              {...rangeTooltipProps}
            >
              <template slot="itemTemplate" render={renderRangeItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Line">
            <oj-spark-chart
              class="demo-sparkChart"
              id="sparkChart3"
              type="line"
              data={dataProvider}
              line-style={lineStyle}
              line-type={lineType}
              line-width={lineWidth}
              marker-size={markerSize}
              marker-shape={markerShape}
              color={color}
              first-color={firstColor}
              last-color={lastColor}
              high-color={highColor}
              low-color={lowColor}
              aria-label={lineChartAriaLabel}
              {...lineTooltipProps}
            >
              <template slot="itemTemplate" render={renderValueItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Line with Area">
            <oj-spark-chart
              class="demo-sparkChart"
              id="sparkChart4"
              type="lineWithArea"
              data={dataProvider}
              line-style={lineStyle}
              line-type={lineType}
              line-width={lineWidth}
              marker-size={markerSize}
              marker-shape={markerShape}
              color={color}
              first-color={firstColor}
              last-color={lastColor}
              high-color={highColor}
              low-color={lowColor}
              aria-label={lineChartAriaLabel}
              {...lineTooltipProps}
            >
              <template slot="itemTemplate" render={renderValueItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Area">
            <oj-spark-chart
              class="demo-sparkChart"
              id="sparkChart5"
              type="area"
              data={dataProvider}
              line-type={lineType}
              marker-size={markerSize}
              marker-shape={markerShape}
              color={color}
              first-color={firstColor}
              last-color={lastColor}
              high-color={highColor}
              low-color={lowColor}
              aria-label={areaChartAriaLabel}
              {...areaTooltipProps}
            >
              <template slot="itemTemplate" render={renderValueItem} />
            </oj-spark-chart>
          </SparkChartRow>
          <SparkChartRow label="Range Area">
            <oj-spark-chart
              class="demo-sparkChart"
              id="sparkChart6"
              type="area"
              data={rangeDataProvider}
              line-type={lineType}
              marker-size={markerSize}
              color={color}
              first-color={firstColor}
              last-color={lastColor}
              high-color={highColor}
              low-color={lowColor}
              aria-label={areaChartAriaLabel}
              {...areaTooltipProps}
            >
              <template slot="itemTemplate" render={renderRangeItem} />
            </oj-spark-chart>
          </SparkChartRow>
        </tbody>
      </table>

      <demo-tabs
        class="oj-flex-item"
        headers={
          '[{"id":"shapeAttrs", "label":"Shape Attributes"}, {"id":"colorAttrs", "label":"Color Attributes"}]'
        }
        value={currentTab}
        onvalueChanged={handleCurrentTabValueChanged}
      >
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Bar Style Attributes</div>
          <oj-form-layout
            maxColumns={2}
            direction="column"
            aria-controls="sparkChart1 sparkChart2 sparkChart3 sparkChart4 sparkChart5 sparkChart6"
          >
            <oj-input-number
              id="barGapRatio"
              max={1}
              min={0}
              step={0.1}
              value={barGapRatio}
              labelHint="barGapRatio"
              onvalueChanged={handleBarGapRatioValueChanged}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Line Style Attributes</div>
          <oj-form-layout
            maxColumns={2}
            direction="column"
            aria-controls="sparkChart1 sparkChart2 sparkChart3 sparkChart4 sparkChart5 sparkChart6"
          >
            <demo-select-enum
              id="lineType"
              labelHint="lineType"
              aria-controls="sparkChart"
              value={lineType}
              enumValues={["straight", "curved", "stepped", "segmented", "none"]}
              onvalueChanged={handleLineTypeValueChanged}
            />
            <oj-input-number
              id="lineWidth"
              labelHint="lineWidth"
              value={lineWidth}
              onvalueChanged={handleLineWidthValueChanged}
            />
            <demo-select-enum
              id="lineStyle"
              labelHint="lineStyle"
              aria-controls="sparkChart"
              value={lineStyle}
              enumValues={["solid", "dashed", "dotted"]}
              onvalueChanged={handleLineStyleValueChanged}
            />
          </oj-form-layout>

          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Marker Style Attributes</div>
          <oj-form-layout
            maxColumns={2}
            direction="column"
            aria-controls="sparkChart1 sparkChart2 sparkChart3 sparkChart4 sparkChart5 sparkChart6"
          >
            <demo-select-enum
              id="markerShape"
              labelHint="markerShape"
              aria-controls="sparkChart"
              value={markerShape}
              enumValues={
                '["auto", "square", "circle", "diamond", "plus", "triangleDown", "triangleUp", "human", "star"]'
              }
              onvalueChanged={handleMarkerShapeValueChanged}
            />
            <oj-input-number
              id="markerSize"
              labelHint="markerSize"
              value={markerSize}
              onvalueChanged={handleMarkerSizeValueChanged}
            />
          </oj-form-layout>
        </div>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-bold oj-sm-margin-2x-vertical">Color Attributes</div>
          <oj-form-layout
            maxColumns={2}
            direction="column"
            aria-controls="sparkChart1 sparkChart2 sparkChart3 sparkChart4 sparkChart5 sparkChart6"
          >
            <oj-input-text
              id="color"
              labelHint="color"
              value={color}
              onvalueChanged={handleColorValueChanged}
            />
            <oj-input-text
              id="firstColor"
              labelHint="firstColor"
              value={firstColor}
              onvalueChanged={handleFirstColorValueChanged}
            />
            <oj-input-text
              id="lastColor"
              labelHint="lastColor"
              value={lastColor}
              onvalueChanged={handleLastColorValueChanged}
            />
            <oj-input-text
              id="highColor"
              labelHint="highColor"
              value={highColor}
              onvalueChanged={handleHighColorValueChanged}
            />
            <oj-input-text
              id="lowColor"
              labelHint="lowColor"
              value={lowColor}
              onvalueChanged={handleLowColorValueChanged}
            />
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>
  );
};

export default SparkChartStyles;
