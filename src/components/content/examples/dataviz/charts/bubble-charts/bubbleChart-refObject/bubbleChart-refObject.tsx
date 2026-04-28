import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartProps = ComponentProps<'oj-chart'>;
type ChartYAxis = NonNullable<ChartProps['yAxis']>;
type ChartXAxis = NonNullable<ChartProps['xAxis']>;
type YReferenceObject = NonNullable<ChartYAxis['referenceObjects']>[number];
type XReferenceObject = NonNullable<ChartXAxis['referenceObjects']>[number];
type AxisKey = 'yAxis' | 'xAxis';
type RefObjectType = 'line' | 'area';
type RefObjectItemsType = 'constant' | 'varied';
type LocationValue = 'back' | 'front';
type DisabledValues = string[];
type ReferenceAxisData = {
  xAxisData: ChartXAxis;
  yAxisData: ChartYAxis;
};
type BubbleChartItem = {
  id: number;
  x: number;
  y: number;
  z: number;
  group: string;
  series: string;
};
type ItemTemplateContext = {
  data: BubbleChartItem;
};

const data = JSON.parse(dataText as string) as BubbleChartItem[];
const EMPTY_X_AXIS: ChartXAxis = {};
const EMPTY_Y_AXIS: ChartYAxis = {};

const createConstantLineY = (location: LocationValue): ChartYAxis => ({
  referenceObjects: [
    {
      text: 'Constant Line Y',
      type: 'line',
      value: 55,
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      shortDesc: 'Constant Line Y'
    } satisfies YReferenceObject
  ]
});

const createConstantLineX = (location: LocationValue): ChartXAxis => ({
  referenceObjects: [
    {
      text: 'Constant Line X',
      type: 'line',
      value: 20,
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      shortDesc: 'Constant Line X'
    } satisfies XReferenceObject
  ]
});

const createConstantAreaY = (location: LocationValue): ChartYAxis => ({
  referenceObjects: [
    {
      text: 'Constant Area Y',
      type: 'area',
      low: 25,
      high: 65,
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      location,
      shortDesc: 'Constant Area Y'
    } satisfies YReferenceObject
  ]
});

const createConstantAreaX = (location: LocationValue): ChartXAxis => ({
  referenceObjects: [
    {
      text: 'Constant Area X',
      type: 'area',
      low: 15,
      high: 25,
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      location,
      shortDesc: 'Constant Area X'
    } satisfies XReferenceObject
  ]
});

const createVariedLineY = (location: LocationValue): ChartYAxis => ({
  referenceObjects: [
    {
      text: 'Varied Line Y',
      type: 'line',
      items: [
        { x: 0, value: 10 },
        { x: 5, value: 20 },
        { x: 15, value: 20 },
        { x: 25, value: 40 },
        { x: 35, value: 40 },
        { x: 45, value: 60 },
        { x: 50, value: 60 }
      ],
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      shortDesc: 'Varied Line Y'
    } satisfies YReferenceObject
  ]
});

const createVariedAreaY = (location: LocationValue): ChartYAxis => ({
  referenceObjects: [
    {
      text: 'Varied Area Y',
      type: 'area',
      items: [
        { x: 0, low: 10, high: 35 },
        { x: 10, low: 10, high: 35 },
        { x: 40, low: 35, high: 60 },
        { x: 50, low: 35, high: 60 }
      ],
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      shortDesc: 'Varied Area Y'
    } satisfies YReferenceObject
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

export const BubbleChartRefObject = () => {
  const [locationValue, setLocationValue] = useState<LocationValue>('back');
  const [refObjTypeValue, setRefObjTypeValue] = useState<RefObjectType>('line');
  const [refObjItemsTypeValue, setRefObjItemsTypeValue] = useState<RefObjectItemsType>('constant');
  const [axisValue, setAxisValue] = useState<AxisKey>('yAxis');

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
      <oj-form-layout maxColumns={2}>
        <demo-radioset-enum
          aria-controls="bubbleChart"
          labelHint="In Reference to"
          value={axisValue}
          direction="row"
          disabledValues={disabledAxis}
          enumValues={["yAxis","xAxis"]}
          onvalueChanged={handleAxisValueChanged}
        />
        <demo-radioset-enum
          aria-controls="bubbleChart"
          labelHint="Type"
          direction="row"
          value={refObjTypeValue}
          enumValues={["line","area"]}
          onvalueChanged={handleRefObjTypeValueChanged}
        />
        <demo-radioset-enum
          labelHint="Values"
          aria-controls="bubbleChart"
          direction="row"
          value={refObjItemsTypeValue}
          disabledValues={disabledValueType}
          enumValues={["constant","varied"]}
          onvalueChanged={handleRefObjItemsTypeValueChanged}
        />
        <demo-radioset-enum
          labelHint="Location"
          aria-controls="bubbleChart"
          direction="row"
          value={locationValue}
          enumValues={["back","front"]}
          onvalueChanged={handleLocationValueChanged}
        />
      </oj-form-layout>
      <oj-chart
        id="bubbleChart"
        type="bubble"
        selectionMode="multiple"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        yAxis={yAxisData}
        xAxis={xAxisData}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default BubbleChartRefObject;
