import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type AxisKey = 'yAxis' | 'xAxis';
type RefObjType = 'line' | 'area';
type RefObjItemsType = 'constant' | 'varied';
type LocationValue = 'back' | 'front';
type XAxisData = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type YAxisData = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;

type LineChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};

type ChartItemTemplateContext = {
  data: LineChartItem;
};

const quarterData = JSON.parse(quarterDataText as string) as LineChartItem[];

const createReferenceData = (
  refObjTypeValue: RefObjType,
  refObjItemsTypeValue: RefObjItemsType,
  axisValue: AxisKey,
  locationValue: LocationValue
): { xAxisData: XAxisData; yAxisData: YAxisData } => {
  if (refObjTypeValue === 'line' && refObjItemsTypeValue === 'constant') {
    if (axisValue === 'yAxis') {
      return {
        xAxisData: {} as XAxisData,
        yAxisData: {
          referenceObjects: [
            {
              text: 'Sample Reference Line',
              type: 'line',
              value: 63,
              color: '#FFCCCC',
              displayInLegend: 'on',
              lineWidth: 3,
              location: locationValue,
              lineStyle: 'dashed',
              shortDesc: 'Sample Reference Line'
            }
          ]
        }
      };
    }

    return {
      xAxisData: {
        referenceObjects: [
          {
            text: 'Sample Reference Line',
            type: 'line',
            value: 'Q2',
            color: '#FFCCCC',
            displayInLegend: 'on',
            lineWidth: 3,
            location: locationValue,
            lineStyle: 'dashed',
            shortDesc: 'Sample Reference Line'
          }
        ]
      },
      yAxisData: {} as YAxisData
    };
  }

  if (refObjTypeValue === 'line' && refObjItemsTypeValue === 'varied') {
    return {
      xAxisData: {} as XAxisData,
      yAxisData: {
        referenceObjects: [
          {
            text: 'Sample Reference Line',
            type: 'line',
            items: [{ value: 60 }, { value: 60 }, { value: 78 }, { value: 78 }],
            color: '#FFCCCC',
            displayInLegend: 'on',
            lineWidth: 3,
            location: locationValue,
            lineStyle: 'dashed',
            shortDesc: 'Sample Reference Line'
          }
        ]
      }
    };
  }

  if (refObjTypeValue === 'area' && refObjItemsTypeValue === 'constant') {
    if (axisValue === 'yAxis') {
      return {
        xAxisData: {} as XAxisData,
        yAxisData: {
          referenceObjects: [
            {
              text: 'Sample Reference Area',
              type: 'area',
              low: 50,
              high: 75,
              color: 'rgba(255, 204, 204,0.5)',
              displayInLegend: 'on',
              location: locationValue,
              shortDesc: 'Sample Reference Area'
            }
          ]
        }
      };
    }

    return {
      xAxisData: {
        referenceObjects: [
          {
            text: 'Sample Reference Area',
            type: 'area',
            low: 0.5,
            high: 1.5,
            color: 'rgba(255, 204, 204,0.5)',
            displayInLegend: 'on',
            location: locationValue,
            shortDesc: 'Sample Reference Area'
          }
        ]
      },
      yAxisData: {} as YAxisData
    };
  }

  return {
    xAxisData: {} as XAxisData,
    yAxisData: {
      referenceObjects: [
        {
          text: 'Sample Reference Area',
          type: 'area',
          items: [
            { low: 40, high: 60 },
            { low: 40, high: 60 },
            { low: 58, high: 78 },
            { low: 58, high: 78 }
          ],
          color: 'rgba(255, 204, 204,0.5)',
          displayInLegend: 'on',
          location: locationValue,
          shortDesc: 'Sample Reference Area'
        }
      ]
    }
  };
};

export const LineChartRefObject = () => {
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [locationValue, setLocationValue] = useState<LocationValue>('back');
  const [refObjTypeValue, setRefObjTypeValue] = useState<RefObjType>('line');
  const [refObjItemsTypeValue, setRefObjItemsTypeValue] = useState<RefObjItemsType>('constant');
  const [axisValue, setAxisValue] = useState<AxisKey>('yAxis');

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
      }),
    []
  );

  const { xAxisData, yAxisData } = useMemo(
    () => createReferenceData(refObjTypeValue, refObjItemsTypeValue, axisValue, locationValue),
    [axisValue, locationValue, refObjItemsTypeValue, refObjTypeValue]
  );

  const disabledAxis: AxisKey[] = refObjItemsTypeValue === 'varied' ? ['xAxis'] : [];
  const disabledValueType: RefObjItemsType[] = axisValue === 'xAxis' ? ['varied'] : [];

  const handleAxisChanged = (event: JetElementCustomEvent<AxisKey>) => {
    const nextAxis = event.detail.value;
    setAxisValue(nextAxis);
    if (nextAxis === 'xAxis') {
      setRefObjItemsTypeValue('constant');
    }
  };

  const handleTypeChanged = (event: JetElementCustomEvent<RefObjType>) => {
    setRefObjTypeValue(event.detail.value);
  };

  const handleValuesChanged = (event: JetElementCustomEvent<RefObjItemsType>) => {
    const nextValueType = event.detail.value;
    setRefObjItemsTypeValue(nextValueType);
    if (nextValueType === 'varied') {
      setAxisValue('yAxis');
    }
  };

  const handleLocationChanged = (event: JetElementCustomEvent<LocationValue>) => {
    setLocationValue(event.detail.value);
  };

  const handleOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };

  const renderChartItem = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-form-layout maxColumns={2}>
        <demo-radioset-enum
          aria-controls="lineChart"
          labelHint="In reference to"
          direction="row"
          value={axisValue}
          onvalueChanged={handleAxisChanged}
          enumValues={["yAxis", "xAxis"]}
          disabledValues={disabledAxis}
        />
        <demo-radioset-enum
          aria-controls="lineChart"
          labelHint="Type"
          direction="row"
          value={refObjTypeValue}
          onvalueChanged={handleTypeChanged}
          enumValues={["line", "area"]}
        />
        <demo-radioset-enum
          aria-controls="lineChart"
          labelHint="Values"
          direction="row"
          value={refObjItemsTypeValue}
          onvalueChanged={handleValuesChanged}
          enumValues={["constant", "varied"]}
          disabledValues={disabledValueType}
        />
        <demo-radioset-enum
          aria-controls="lineChart"
          labelHint="Location"
          direction="row"
          value={locationValue}
          onvalueChanged={handleLocationChanged}
          enumValues={["back", "front"]}
        />
      </oj-form-layout>
      <oj-chart
        id="lineChart"
        type="line"
        selectionMode="multiple"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        orientation={orientationValue}
        yAxis={yAxisData}
        xAxis={xAxisData}
      >
        <template slot="itemTemplate" render={renderChartItem} />
      </oj-chart>
      <demo-chart-orientation-control
        type="line"
        orientation={orientationValue}
        onorientationChanged={handleOrientationChanged}
        aria-controls="lineChart"
      />
    </div>
  );
};

export default LineChartRefObject;
