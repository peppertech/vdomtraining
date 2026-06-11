import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
type ReferenceAxis = 'yAxis' | 'xAxis';
type ReferenceType = 'line' | 'area';
type ReferenceValuesType = 'constant' | 'varied';
type ReferenceLocation = 'back' | 'front';
type RangeChartItem = {
  id: number;
  group: string;
  series: string;
  low: number;
  high: number;
};
type ReferenceObjectItem = {
  value?: number;
  low?: number;
  high?: number;
};
type ReferenceObjectBase = {
  text: string;
  type: ReferenceType;
  low?: number;
  high?: number;
  items?: ReferenceObjectItem[];
  color: string;
  displayInLegend: 'on';
  lineWidth?: number;
  location: ReferenceLocation;
  shortDesc: string;
  lineType?: 'centeredStepped' | 'curved';
};
type YReferenceObject = ReferenceObjectBase & {
  value?: number;
};
type XReferenceObject = ReferenceObjectBase & {
  value?: number | string;
};
type YAxisReferenceData = {
  referenceObjects?: YReferenceObject[];
};
type XAxisReferenceData = {
  referenceObjects?: XReferenceObject[];
};

const rangeData = JSON.parse(dataText as string) as RangeChartItem[];

const constantLineY: YAxisReferenceData = {
  referenceObjects: [
    {
      text: 'Constant line Y',
      type: 'line',
      value: 50,
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location: 'back',
      shortDesc: 'Constant Line Y'
    }
  ]
};

const constantLineX: XAxisReferenceData = {
  referenceObjects: [
    {
      text: 'Constant Line X',
      type: 'line',
      value: 'Group C',
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location: 'back',
      shortDesc: 'Constant Line X'
    }
  ]
};

const constantAreaY: YAxisReferenceData = {
  referenceObjects: [
    {
      text: 'Constant Area Y',
      type: 'area',
      low: 35,
      high: 75,
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      location: 'back',
      shortDesc: 'Constant Area Y'
    }
  ]
};

const constantAreaX: XAxisReferenceData = {
  referenceObjects: [
    {
      text: 'Constant Area X',
      type: 'area',
      low: 1.5,
      high: 2.5,
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      location: 'back',
      shortDesc: 'Constant Area X'
    }
  ]
};

const variedLineY: YAxisReferenceData = {
  referenceObjects: [
    {
      text: 'Varied Line Y',
      type: 'line',
      lineType: 'centeredStepped',
      items: [
        { value: 49 },
        { value: 45 },
        { value: 95 },
        { value: 60 },
        { value: 60 },
        { value: 40 },
        { value: 49 }
      ],
      color: '#A0CEEC',
      displayInLegend: 'on',
      lineWidth: 3,
      location: 'back',
      shortDesc: 'Varied Line Y'
    }
  ]
};

const variedAreaY: YAxisReferenceData = {
  referenceObjects: [
    {
      text: 'Varied Area Y',
      type: 'area',
      lineType: 'curved',
      items: [
        { low: 10, high: 40 },
        { low: 40, high: 70 },
        { low: 25, high: 55 },
        { low: 60, high: 90 },
        { low: 60, high: 90 },
        { low: 30, high: 60 },
        { low: 30, high: 60 }
      ],
      color: 'rgba(160,206,236,0.5)',
      displayInLegend: 'on',
      location: 'back',
      shortDesc: 'Varied Area Y'
    }
  ]
};

const cloneAxisReferenceData = <T extends YReferenceObject | XReferenceObject>(
  axisData: { referenceObjects?: T[] },
  location: ReferenceLocation
): { referenceObjects?: T[] } => ({
  referenceObjects: axisData.referenceObjects?.map((referenceObject) => ({
    ...referenceObject,
    location,
    items: referenceObject.items?.map((item) => ({ ...item }))
  }))
});

const getYAxisReferenceData = (
  refObjTypeValue: ReferenceType,
  refObjItemsTypeValue: ReferenceValuesType,
  locationValue: ReferenceLocation
): YAxisReferenceData => {
  if (refObjTypeValue === 'line' && refObjItemsTypeValue === 'constant') {
    return cloneAxisReferenceData(constantLineY, locationValue);
  }

  if (refObjTypeValue === 'line' && refObjItemsTypeValue === 'varied') {
    return cloneAxisReferenceData(variedLineY, locationValue);
  }

  if (refObjTypeValue === 'area' && refObjItemsTypeValue === 'constant') {
    return cloneAxisReferenceData(constantAreaY, locationValue);
  }

  return cloneAxisReferenceData(variedAreaY, locationValue);
};

const getXAxisReferenceData = (
  refObjTypeValue: ReferenceType,
  locationValue: ReferenceLocation
): XAxisReferenceData => {
  if (refObjTypeValue === 'line') {
    return cloneAxisReferenceData(constantLineX, locationValue);
  }

  return cloneAxisReferenceData(constantAreaX, locationValue);
};

export const RangeChartRefObject = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [locationValue, setLocationValue] = useState<ReferenceLocation>('back');
  const [refObjTypeValue, setRefObjTypeValue] = useState<ReferenceType>('line');
  const [refObjItemsTypeValue, setRefObjItemsTypeValue] =
    useState<ReferenceValuesType>('constant');
  const [axisValue, setAxisValue] = useState<ReferenceAxis>('yAxis');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, RangeChartItem>(rangeData, { keyAttributes: 'id' }),
    []
  );

  const disabledAxis = useMemo<string[]>(
    () => (refObjItemsTypeValue === 'varied' ? ['xAxis'] : []),
    [refObjItemsTypeValue]
  );

  const disabledValueType = useMemo<string[]>(
    () => (axisValue === 'xAxis' ? ['varied'] : []),
    [axisValue]
  );

  const yAxisData = useMemo<YAxisReferenceData>(
    () =>
      axisValue === 'yAxis'
        ? getYAxisReferenceData(refObjTypeValue, refObjItemsTypeValue, locationValue)
        : {},
    [axisValue, locationValue, refObjItemsTypeValue, refObjTypeValue]
  );

  const xAxisData = useMemo<XAxisReferenceData>(
    () =>
      axisValue === 'xAxis' && refObjItemsTypeValue === 'constant'
        ? getXAxisReferenceData(refObjTypeValue, locationValue)
        : {},
    [axisValue, locationValue, refObjItemsTypeValue, refObjTypeValue]
  );

  const handleAxisChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setAxisValue(event.detail.value as ReferenceAxis);
  };

  const handleTypeChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setRefObjTypeValue(event.detail.value as ReferenceType);
  };

  const handleValuesChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setRefObjItemsTypeValue(event.detail.value as ReferenceValuesType);
  };

  const handleLocationChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setLocationValue(event.detail.value as ReferenceLocation);
  };

  const handleOrientationChanged = (
    event: DatavizValueChangedEvent<string>
  ) => {
    setOrientationValue(event.detail.value as ChartOrientation);
  };

  const itemTemplateRenderer = (item: { data: RangeChartItem }) => (
    <oj-chart-item
      low={item.data.low}
      high={item.data.high}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="barChart" maxColumns={2}>
        <demo-radioset-enum
          direction="row"
          labelHint="Reference Axis"
          value={axisValue}
          disabledValues={disabledAxis}
          enumValues={["yAxis","xAxis"]}
          onvalueChanged={handleAxisChanged}
        />

        <demo-radioset-enum
          direction="row"
          labelHint="Type"
          value={refObjTypeValue}
          enumValues={["line","area"]}
          onvalueChanged={handleTypeChanged}
        />

        <demo-radioset-enum
          direction="row"
          labelHint="Values"
          value={refObjItemsTypeValue}
          disabledValues={disabledValueType}
          enumValues={["constant","varied"]}
          onvalueChanged={handleValuesChanged}
        />

        <demo-radioset-enum
          direction="row"
          labelHint="Location"
          value={locationValue}
          enumValues={["back","front"]}
          onvalueChanged={handleLocationChanged}
        />
      </oj-form-layout>

      <oj-chart
        id="barChart"
        type="bar"
        selectionMode="multiple"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        yAxis={yAxisData}
        xAxis={xAxisData}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>

      <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
        <demo-chart-orientation-control
          id="orientationControl"
          type="bar"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={handleOrientationChanged}
        />
      </oj-toolbar>
    </div>
  );
};

export default RangeChartRefObject;
