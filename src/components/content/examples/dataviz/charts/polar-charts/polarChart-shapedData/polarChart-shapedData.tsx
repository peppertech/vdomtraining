import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as coordShapedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicShapedCoordData.json';
import * as areaShapedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterShapedData.json';
import * as lineShapedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesDualYShapedData.json';
import * as barShapedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesShapedData.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type PolarChartType = 'bar' | 'line' | 'area' | 'scatter' | 'bubble';
type PolarGridShape = 'circle' | 'polygon';
type DisabledValues = string[];
type ShapedChartItem = Record<string, unknown> & {
  id: number | string;
};

const parsedData = {
  bar: JSON.parse(barShapedDataText as string) as ShapedChartItem[],
  area: JSON.parse(lineShapedDataText as string) as ShapedChartItem[],
  line: JSON.parse(areaShapedDataText as string) as ShapedChartItem[],
  coord: JSON.parse(coordShapedDataText as string) as ShapedChartItem[]
};

export const PolarChartShapedData = () => {
  const [typeValue, setTypeValue] = useState<PolarChartType>('bar');
  const [stackValue, setStackValue] = useState<'on' | 'off'>('on');
  const [polarGridShapeValue, setPolarGridShapeValue] = useState<PolarGridShape>('circle');
  const [typeValueDisabled, setTypeValueDisabled] = useState<DisabledValues>([]);
  const [gridValueDisabled, setGridValueDisabled] = useState<DisabledValues>(['polygon']);
  const [chartData, setChartData] = useState<ShapedChartItem[]>(parsedData.bar);

  const dataProvider = useMemo(
    () => new ArrayDataProvider<string | number, ShapedChartItem>(chartData, { keyAttributes: 'id' }),
    [chartData]
  );

  const handleTypeChanged = (event: JetElementCustomEvent<PolarChartType>) => {
    const nextType = event.detail.value;
    setTypeValue(nextType);

    if (nextType === 'bar') {
      setChartData(parsedData.bar);
      setStackValue('on');
      setGridValueDisabled(['polygon']);
    } else if (nextType === 'line') {
      setChartData(parsedData.line);
      setStackValue('off');
      setGridValueDisabled([]);
    } else if (nextType === 'area') {
      setChartData(parsedData.area);
      setStackValue('off');
      setGridValueDisabled([]);
    } else {
      setChartData(parsedData.coord);
      setGridValueDisabled(['polygon']);
    }
  };

  const handleGridShapeChanged = (event: JetElementCustomEvent<PolarGridShape>) => {
    const nextShape = event.detail.value;
    setPolarGridShapeValue(nextShape);
    setTypeValueDisabled(nextShape === 'polygon' ? ['bar', 'scatter', 'bubble'] : []);
  };

  return (
    <div id="chart-container">
      <oj-form-layout maxColumns={2} aria-label="Choose only one setting." aria-controls="polarChart">
        <demo-radioset-enum
          direction="row"
          value={typeValue}
          labelHint="Type"
          disabledValues={typeValueDisabled}
          onvalueChanged={handleTypeChanged}
          enumValues={["bar","line","area","scatter","bubble"]}
        />

        <demo-radioset-enum
          labelHint="Grid Shape"
          value={polarGridShapeValue}
          disabledValues={gridValueDisabled}
          direction="row"
          onvalueChanged={handleGridShapeChanged}
          enumValues={["circle","polygon"]}
        />
      </oj-form-layout>

      <oj-chart
        id="polarChart"
        coordinateSystem="polar"
        type={typeValue}
        stack={stackValue}
        polarGridShape={polarGridShapeValue}
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        aria-label="Polar chart being created using different types of chart"
      />
    </div>
  );
};

export default PolarChartShapedData;
