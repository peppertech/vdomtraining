import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/fourSeriesData.json';
import 'ojs/ojformlayout';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartProps = ComponentProps<'oj-chart'>;
type ChartStack = ChartProps['stack'];
type ChartOrientation = ChartProps['orientation'];
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
type CombinationChartItem = {
  id: number;
  group: string;
  series: string;
  value: number;
};
type ItemTemplateContext = {
  data: CombinationChartItem;
};

const data = JSON.parse(dataText as string) as CombinationChartItem[];
const EMPTY_X_AXIS: ChartXAxis = {};
const EMPTY_Y_AXIS: ChartYAxis = {};

const createConstantLineY = (location: LocationValue): ChartYAxis => ({
  referenceObjects: [
    {
      text: 'Constant Line Y',
      type: 'line',
      value: 70,
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      lineStyle: 'dashed',
      shortDesc: 'Constant Line Y'
    } satisfies YReferenceObject
  ]
});

const createConstantLineX = (location: LocationValue): ChartXAxis => ({
  referenceObjects: [
    {
      text: 'Constant Line X',
      type: 'line',
      value: 'Group D',
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      lineStyle: 'dashed',
      shortDesc: 'Constant Line X'
    } satisfies XReferenceObject
  ]
});

const createConstantAreaY = (location: LocationValue): ChartYAxis => ({
  referenceObjects: [
    {
      text: 'Constant Area Y',
      type: 'area',
      low: 35,
      high: 75,
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
      low: 1.5,
      high: 4.5,
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
      items: [{ value: 49 }, { value: 45 }, { value: 95 }, { value: 60 }, { value: 60 }, { value: 40 }, { value: 49 }],
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location,
      lineStyle: 'dashed',
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
        { low: 10, high: 40 },
        { low: 40, high: 70 },
        { low: 25, high: 55 },
        { low: 60, high: 90 },
        { low: 25, high: 55 },
        { low: 40, high: 70 },
        { low: 10, high: 40 }
      ],
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
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
  return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />;
};

export const CombinationChartRefObject = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
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

  const handleOrientationValueChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const handleStackValueChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
  };

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="comboChart" maxColumns={2}>
        <demo-radioset-enum
          direction="row"
          labelHint="Reference Axis"
          value={axisValue}
          disabledValues={disabledAxis}
          enumValues={["yAxis","xAxis"]}
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
          enumValues={["constant","varied"]}
          value={refObjItemsTypeValue}
          onvalueChanged={handleRefObjItemsTypeValueChanged}
        />
        <demo-radioset-enum
          direction="row"
          labelHint="Location"
          enumValues={["back","front"]}
          value={locationValue}
          onvalueChanged={handleLocationValueChanged}
        />
      </oj-form-layout>
      <oj-chart
        id="comboChart"
        type="combo"
        selectionMode="multiple"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        stack={stackValue}
        yAxis={yAxisData}
        xAxis={xAxisData}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart">
        <demo-chart-orientation-control
          id="orientationControl"
          type="combo"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={handleOrientationValueChanged}
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <demo-chart-stack-control
          id="stackControl"
          type="combo"
          focusManagement="none"
          stack={stackValue}
          onstackChanged={handleStackValueChanged}
        />
      </oj-toolbar>
    </div>
  );
};

export default CombinationChartRefObject;
