import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as areaDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import * as barDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesData.json';
import * as coordDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import * as lineDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesDualYData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type PolarChartType = 'bar' | 'line' | 'area' | 'scatter' | 'bubble';
type PolarGridShape = 'circle' | 'polygon';
type DisabledValues = string[];
type BarLikeItem = {
  id: number | string;
  series: string;
  value: number;
  group?: string;
  quarter?: string;
};
type CoordItem = {
  id: number | string;
  series: string;
  x: number;
  y: number;
  z?: number;
  group: string;
};
type ChartItem = BarLikeItem | CoordItem;

const parsedData = {
  bar: JSON.parse(barDataText as string) as ChartItem[],
  area: JSON.parse(lineDataText as string) as ChartItem[],
  line: JSON.parse(areaDataText as string) as ChartItem[],
  coord: JSON.parse(coordDataText as string) as ChartItem[]
};

export const PolarChartDefault = () => {
  const [typeValue, setTypeValue] = useState<PolarChartType>('bar');
  const [stackValue, setStackValue] = useState<'on' | 'off'>('on');
  const [polarGridShapeValue, setPolarGridShapeValue] = useState<PolarGridShape>('circle');
  const [typeValueDisabled, setTypeValueDisabled] = useState<DisabledValues>([]);
  const [gridValueDisabled, setGridValueDisabled] = useState<DisabledValues>(['polygon']);
  const [chartData, setChartData] = useState<ChartItem[]>(parsedData.bar);

  const dataProvider = useMemo(
    () => new ArrayDataProvider<string | number, ChartItem>(chartData, { keyAttributes: 'id' }),
    [chartData]
  );

  const handleTypeChanged = (event: JetElementCustomEvent<PolarChartType>) => {
    const newValue = event.detail.value;
    setTypeValue(newValue);

    if (newValue === 'bar') {
      setChartData(parsedData.bar);
      setStackValue('on');
      setGridValueDisabled(['polygon']);
    } else if (newValue === 'line') {
      setChartData(parsedData.line);
      setStackValue('off');
      setGridValueDisabled([]);
    } else if (newValue === 'area') {
      setChartData(parsedData.area);
      setStackValue('off');
      setGridValueDisabled([]);
    } else if (newValue === 'scatter' || newValue === 'bubble') {
      setChartData(parsedData.coord);
      setGridValueDisabled(['polygon']);
    }
  };

  const handleGridShapeChanged = (event: JetElementCustomEvent<PolarGridShape>) => {
    const value = event.detail.value;
    setPolarGridShapeValue(value);
    setTypeValueDisabled(value === 'polygon' ? ['bar', 'scatter', 'bubble'] : []);
  };

  const itemTemplateRenderer = (item: { data: ChartItem }) => {
    const isCoord = 'x' in item.data || 'y' in item.data;

    return (
      <oj-chart-item
        value={'value' in item.data ? item.data.value : undefined}
        x={isCoord ? (item.data as CoordItem).x : undefined}
        y={isCoord ? (item.data as CoordItem).y : undefined}
        z={isCoord ? (item.data as CoordItem).z ?? undefined : undefined}
        groupId={[(item.data as BarLikeItem).quarter ?? item.data.group ?? '']}
        seriesId={item.data.series}
      />
    );
  };

  return (
    <div id="chart-container">
      <oj-form-layout aria-label="Choose only one setting." aria-controls="polarChart" maxColumns={2}>
        <demo-radioset-enum
          direction="row"
          labelHint="Type"
          disabledValues={typeValueDisabled}
          enumValues={["bar","line","area","scatter","bubble"]}
          onvalueChanged={handleTypeChanged}
          value={typeValue}
        />
        <demo-radioset-enum
          direction="row"
          labelHint="Grid Shape"
          disabledValues={gridValueDisabled}
          onvalueChanged={handleGridShapeChanged}
          value={polarGridShapeValue}
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
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default PolarChartDefault;
