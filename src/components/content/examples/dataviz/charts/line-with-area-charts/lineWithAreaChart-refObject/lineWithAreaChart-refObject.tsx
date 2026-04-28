import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import 'ojs/ojtoolbar';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type AxisKey = 'yAxis' | 'xAxis';
type RefObjType = 'line' | 'area';
type RefObjItemsType = 'constant' | 'varied';
type LocationValue = 'back' | 'front';
type XAxisData = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type YAxisData = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;
type LineWithAreaChartItem = {
  id: number;
  quarter: string;
  series: string;
  value: number;
};
type ChartItemTemplateContext = { data: LineWithAreaChartItem };

const quarterData = JSON.parse(quarterDataText as string) as LineWithAreaChartItem[];

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
            lineType: 'stepped',
            items: [{ value: 60 }, { value: 60 }, { value: 78 }, { value: 78 }],
            color: '#FFCCCC',
            displayInLegend: 'on',
            lineWidth: 3,
            location: locationValue,
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
              color: 'rgba(255, 204, 204, 0.5)',
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
            color: 'rgba(255, 204, 204, 0.5)',
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
          lineType: 'curved',
          items: [
            { low: 40, high: 60 },
            { low: 40, high: 60 },
            { low: 58, high: 78 },
            { low: 58, high: 78 }
          ],
          color: 'rgba(255, 204, 204, 0.5)',
          displayInLegend: 'on',
          location: locationValue,
          shortDesc: 'Sample Reference Area'
        }
      ]
    }
  };
};

export const LineWithAreaChartRefObject = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
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

  const itemTemplateRenderer = (item: ChartItemTemplateContext) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-form-layout maxColumns={2} aria-controls="lineAreaChart">
        <demo-radioset-enum
          labelHint="In reference to"
          direction="row"
          value={axisValue}
          enumValues={["yAxis","xAxis"]}
          disabledValues={disabledAxis}
          onvalueChanged={(event: JetElementCustomEvent<AxisKey>) => {
            const nextAxis = event.detail.value;
            setAxisValue(nextAxis);
            if (nextAxis === 'xAxis') setRefObjItemsTypeValue('constant');
          }}
        />
        <demo-radioset-enum
          labelHint="Type"
          direction="row"
          value={refObjTypeValue}
          enumValues={["line","area"]}
          onvalueChanged={(event: JetElementCustomEvent<RefObjType>) => setRefObjTypeValue(event.detail.value)}
        />
        <demo-radioset-enum
          labelHint="Values"
          direction="row"
          value={refObjItemsTypeValue}
          enumValues={["constant","varied"]}
          disabledValues={disabledValueType}
          onvalueChanged={(event: JetElementCustomEvent<RefObjItemsType>) => {
            const nextValue = event.detail.value;
            setRefObjItemsTypeValue(nextValue);
            if (nextValue === 'varied') setAxisValue('yAxis');
          }}
        />
        <demo-radioset-enum
          labelHint="Location"
          direction="row"
          value={locationValue}
          enumValues={["back","front"]}
          onvalueChanged={(event: JetElementCustomEvent<LocationValue>) => setLocationValue(event.detail.value)}
        />
      </oj-form-layout>
      <oj-chart
        id="lineAreaChart"
        type="lineWithArea"
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
      <oj-toolbar aria-controls="lineAreaChart">
        <demo-chart-orientation-control
          type="lineWithArea"
          focusManagement="none"
          orientation={orientationValue}
          onorientationChanged={(event: JetElementCustomEvent<ChartOrientation>) =>
            setOrientationValue(event.detail.value)
          }
        />
        <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
        <demo-chart-stack-control
          type="lineWithArea"
          focusManagement="none"
          stack={stackValue}
          onstackChanged={(event: JetElementCustomEvent<ChartStack>) => setStackValue(event.detail.value)}
        />
      </oj-toolbar>
    </div>
  );
};

export default LineWithAreaChartRefObject;
