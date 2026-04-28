import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'css!./demo.css';

type AxisKey = 'xAxis' | 'yAxis';
type RefObjectType = 'line' | 'area';
type RefObjectItemsType = 'constant' | 'varied';
type LocationValue = 'back' | 'front';
type DisabledValues = string[];
type ChartProps = ComponentProps<'oj-chart'>;
type ChartYAxis = NonNullable<ChartProps['yAxis']>;
type ChartXAxis = NonNullable<ChartProps['xAxis']>;
type ReferenceAxisData = {
  xAxisData: ChartXAxis;
  yAxisData: ChartYAxis;
};
type ScatterChartItem = {
  id: number;
  group: string;
  series: string;
  x: number;
  y: number;
  z?: number;
};
type ItemTemplateContext = {
  data: ScatterChartItem;
};

const data = JSON.parse(dataText as string) as ScatterChartItem[];
const EMPTY_X_AXIS: ChartXAxis = {};
const EMPTY_Y_AXIS: ChartYAxis = {};

const createConstantLineY = (location: LocationValue): ChartYAxis => ({
  referenceObjects: [
    {
      text: 'Constant Line Y',
      type: 'line',
      value: 36,
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      shortDesc: 'Constant Line Y'
    }
  ]
});

const createConstantLineX = (location: LocationValue): ChartXAxis => ({
  referenceObjects: [
    {
      text: 'Constant Line X',
      type: 'line',
      value: 25,
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      shortDesc: 'Constant Line X'
    }
  ]
});

const createConstantAreaY = (location: LocationValue): ChartYAxis => ({
  referenceObjects: [
    {
      text: 'Constant Area Y',
      type: 'area',
      low: 22,
      high: 47,
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      location,
      shortDesc: 'Constant Area Y'
    }
  ]
});

const createConstantAreaX = (location: LocationValue): ChartXAxis => ({
  referenceObjects: [
    {
      text: 'Constant Area X',
      type: 'area',
      low: 15,
      high: 32,
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      location,
      shortDesc: 'constant Area X'
    }
  ]
});

const createVariedLineY = (location: LocationValue): ChartYAxis => ({
  max: 60,
  referenceObjects: [
    {
      text: 'varied Line Y',
      type: 'line',
      items: [
        { x: 0, value: 0 },
        { x: 5, value: 10 },
        { x: 15, value: 10 },
        { x: 25, value: 30 },
        { x: 35, value: 30 },
        { x: 45, value: 50 },
        { x: 55, value: 50 },
        { x: 60, value: 60 }
      ],
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      shortDesc: 'Varied Line Y'
    }
  ]
});

const createVariedAreaY = (location: LocationValue): ChartYAxis => ({
  max: 60,
  referenceObjects: [
    {
      text: 'Varied Area Y',
      type: 'area',
      items: [
        { x: 0, low: 5, high: 30 },
        { x: 10, low: 5, high: 30 },
        { x: 50, low: 30, high: 55 },
        { x: 60, low: 30, high: 55 }
      ],
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      shortDesc: 'varied Area Y'
    }
  ]
});

const getReferenceAxisData = (
  axis: AxisKey,
  type: RefObjectType,
  itemsType: RefObjectItemsType,
  location: LocationValue
): ReferenceAxisData => {
  if (type === 'line' && itemsType === 'constant' && axis === 'yAxis') {
    return { xAxisData: EMPTY_X_AXIS, yAxisData: createConstantLineY(location) };
  }
  if (type === 'line' && itemsType === 'constant' && axis === 'xAxis') {
    return { xAxisData: createConstantLineX(location), yAxisData: EMPTY_Y_AXIS };
  }
  if (type === 'line' && itemsType === 'varied' && axis === 'yAxis') {
    return { xAxisData: EMPTY_X_AXIS, yAxisData: createVariedLineY(location) };
  }
  if (type === 'area' && itemsType === 'constant' && axis === 'yAxis') {
    return { xAxisData: EMPTY_X_AXIS, yAxisData: createConstantAreaY(location) };
  }
  if (type === 'area' && itemsType === 'constant' && axis === 'xAxis') {
    return { xAxisData: createConstantAreaX(location), yAxisData: EMPTY_Y_AXIS };
  }
  if (type === 'area' && itemsType === 'varied' && axis === 'yAxis') {
    return { xAxisData: EMPTY_X_AXIS, yAxisData: createVariedAreaY(location) };
  }
  return { xAxisData: EMPTY_X_AXIS, yAxisData: EMPTY_Y_AXIS };
};

const itemTemplateRenderer = (item: ItemTemplateContext) => {
  return (
    <oj-chart-item
      x={item.data.x}
      y={item.data.y}
      z={item.data.z}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );
};

export const ScatterChartRefObject = () => {
  const [axisValue, setAxisValue] = useState<AxisKey>('yAxis');
  const [refObjTypeValue, setRefObjTypeValue] = useState<RefObjectType>('line');
  const [refObjItemsTypeValue, setRefObjItemsTypeValue] = useState<RefObjectItemsType>('constant');
  const [locationValue, setLocationValue] = useState<LocationValue>('back');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(data, {
        keyAttributes: 'id'
      }),
    []
  );

  const disabledAxis = useMemo<DisabledValues>(
    () => (refObjItemsTypeValue === 'varied' ? ['xAxis'] : []),
    [refObjItemsTypeValue]
  );
  const disabledValueType = useMemo<DisabledValues>(() => (axisValue === 'xAxis' ? ['varied'] : []), [axisValue]);
  const { xAxisData, yAxisData } = useMemo(
    () => getReferenceAxisData(axisValue, refObjTypeValue, refObjItemsTypeValue, locationValue),
    [axisValue, locationValue, refObjItemsTypeValue, refObjTypeValue]
  );

  const handleAxisValueChanged = (event: JetElementCustomEvent<AxisKey>) => {
    const nextAxis = event.detail.value;

    setAxisValue(nextAxis);
    if (nextAxis === 'xAxis' && refObjItemsTypeValue === 'varied') {
      setRefObjItemsTypeValue('constant');
    }
  };

  const handleRefObjTypeValueChanged = (event: JetElementCustomEvent<RefObjectType>) => {
    setRefObjTypeValue(event.detail.value);
  };

  const handleRefObjItemsTypeValueChanged = (event: JetElementCustomEvent<RefObjectItemsType>) => {
    const nextItemsType = event.detail.value;

    if (nextItemsType === 'varied') {
      setAxisValue('yAxis');
    }
    setRefObjItemsTypeValue(nextItemsType);
  };

  const handleLocationValueChanged = (event: JetElementCustomEvent<LocationValue>) => {
    setLocationValue(event.detail.value);
  };

  return (
    <div id="chart-container">
      <oj-form-layout maxColumns={2} aria-controls="scatterChart">
        <demo-radioset-enum
          direction="row"
          labelHint="Reference Axis"
          disabledValues={disabledAxis}
          enumValues={["xAxis","yAxis"]}
          value={axisValue}
          onvalueChanged={handleAxisValueChanged}
        />
        <demo-radioset-enum
          direction="row"
          labelHint="Type"
          value={refObjTypeValue}
          enumValues={["line","area"]}
          onvalueChanged={handleRefObjTypeValueChanged}
        />
        <demo-radioset-enum
          direction="row"
          labelHint="Values"
          disabledValues={disabledValueType}
          value={refObjItemsTypeValue}
          enumValues={["constant","varied"]}
          onvalueChanged={handleRefObjItemsTypeValueChanged}
        />
        <demo-radioset-enum
          direction="row"
          value={locationValue}
          labelHint="Location"
          enumValues={["back","front"]}
          onvalueChanged={handleLocationValueChanged}
        />
      </oj-form-layout>
      <oj-chart
        id="scatterChart"
        type="scatter"
        selectionMode="multiple"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        yAxis={yAxisData}
        xAxis={xAxisData}
        class="demo-scatterchart-refobject-style"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default ScatterChartRefObject;
