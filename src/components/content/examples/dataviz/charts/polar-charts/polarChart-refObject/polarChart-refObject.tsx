import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as coordDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';

type ReferenceAxis = 'yAxis' | 'xAxis';
type ReferenceType = 'line' | 'area';
type ReferenceValuesType = 'constant' | 'varied';
type ReferenceLocation = 'back' | 'front';
type DisabledValues = string[];
type CoordItem = {
  id: number;
  group: string;
  series: string;
  x: number;
  y: number;
};
type AxisReferenceItem = {
  x: number;
  value?: number;
  low?: number;
  high?: number;
};
type ReferenceObject = {
  text: string;
  type: ReferenceType;
  value?: number;
  low?: number;
  high?: number;
  items?: AxisReferenceItem[];
  color: string;
  displayInLegend: 'on';
  lineWidth?: number;
  location: ReferenceLocation;
  shortDesc: string;
};
type ChartAxisConfig = {
  referenceObjects?: ReferenceObject[];
};

const coordData = JSON.parse(coordDataText as string) as CoordItem[];

const getYAxisReferenceObject = (
  type: ReferenceType,
  valuesType: ReferenceValuesType,
  location: ReferenceLocation
): ChartAxisConfig => {
  if (type === 'line' && valuesType === 'constant') {
    return {
      referenceObjects: [
        {
          text: 'Constant Line Y',
          type: 'line',
          value: 35,
          color: '#A0CEEC',
          displayInLegend: 'on',
          lineWidth: 3,
          location,
          shortDesc: 'Constant Line Y'
        }
      ]
    };
  }

  if (type === 'line' && valuesType === 'varied') {
    return {
      referenceObjects: [
        {
          text: 'Varied Line Y',
          type: 'line',
          items: [
            { x: 0, value: 35 },
            { x: 15, value: 30 },
            { x: 25, value: 40 },
            { x: 35, value: 40 },
            { x: 45, value: 35 }
          ],
          color: '#A0CEEC',
          displayInLegend: 'on',
          lineWidth: 3,
          location,
          shortDesc: 'Varied Line Y'
        }
      ]
    };
  }

  if (type === 'area' && valuesType === 'constant') {
    return {
      referenceObjects: [
        {
          text: 'Constant Area Y',
          type: 'area',
          low: 35,
          high: 50,
          color: 'rgba(160,206,236,0.5)',
          displayInLegend: 'on',
          location,
          shortDesc: 'Constant Area Y'
        }
      ]
    };
  }

  return {
    referenceObjects: [
      {
        text: 'Varied Area Y',
        type: 'area',
        items: [
          { x: 0, low: 35, high: 55 },
          { x: 15, low: 30, high: 50 },
          { x: 25, low: 40, high: 60 },
          { x: 35, low: 40, high: 60 },
          { x: 45, low: 35, high: 55 }
        ],
        color: 'rgba(160,206,236,0.5)',
        displayInLegend: 'on',
        location,
        shortDesc: 'Varied Area Y'
      }
    ]
  };
};

const getXAxisReferenceObject = (
  type: ReferenceType,
  location: ReferenceLocation
): ChartAxisConfig => {
  if (type === 'line') {
    return {
      referenceObjects: [
        {
          text: 'Constant Line X',
          type: 'line',
          value: 40,
          color: '#A0CEEC',
          displayInLegend: 'on',
          lineWidth: 3,
          location,
          shortDesc: 'Constant Line X'
        }
      ]
    };
  }

  return {
    referenceObjects: [
      {
        text: 'Constant Area X',
        type: 'area',
        low: 30,
        high: 40,
        color: 'rgba(160,206,236,0.5)',
        displayInLegend: 'on',
        location,
        shortDesc: 'Constant Area X'
      }
    ]
  };
};

export const PolarChartRefObject = () => {
  const [locationValue, setLocationValue] = useState<ReferenceLocation>('back');
  const [refObjTypeValue, setRefObjTypeValue] = useState<ReferenceType>('line');
  const [refObjItemsTypeValue, setRefObjItemsTypeValue] =
    useState<ReferenceValuesType>('constant');
  const [axisValue, setAxisValue] = useState<ReferenceAxis>('yAxis');

  const disabledAxis: DisabledValues =
    refObjItemsTypeValue === 'varied' ? ['xAxis'] : [];
  const disabledValueType: DisabledValues = axisValue === 'xAxis' ? ['varied'] : [];

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, CoordItem>(coordData, { keyAttributes: 'id' }),
    []
  );

  const yAxisData = useMemo<ChartAxisConfig>(
    () =>
      axisValue === 'yAxis'
        ? getYAxisReferenceObject(refObjTypeValue, refObjItemsTypeValue, locationValue)
        : {},
    [axisValue, locationValue, refObjItemsTypeValue, refObjTypeValue]
  );

  const xAxisData = useMemo<ChartAxisConfig>(
    () =>
      axisValue === 'xAxis' && refObjItemsTypeValue === 'constant'
        ? getXAxisReferenceObject(refObjTypeValue, locationValue)
        : {},
    [axisValue, locationValue, refObjItemsTypeValue, refObjTypeValue]
  );

  const itemTemplateRenderer = (item: { data: CoordItem }) => (
    <oj-chart-item x={item.data.x} y={item.data.y} groupId={[item.data.group]} seriesId={item.data.series} />
  );

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="scatterChart" maxColumns={2}>
        <demo-radioset-enum
          id="radioButtonset5"
          value={axisValue}
          disabledValues={disabledAxis}
          direction="row"
          labelHint="Reference Axis"
          onvalueChanged={(event: JetElementCustomEvent<ReferenceAxis>) =>
            setAxisValue(event.detail.value)
          }
          enumValues={["yAxis","xAxis"]}
        />
        <demo-radioset-enum
          id="radioButtonset6"
          labelHint="Type"
          direction="row"
          value={refObjTypeValue}
          onvalueChanged={(event: JetElementCustomEvent<ReferenceType>) =>
            setRefObjTypeValue(event.detail.value)
          }
          enumValues={["line","area"]}
        />
        <demo-radioset-enum
          labelHint="Values"
          id="radioButtonset4"
          direction="row"
          value={refObjItemsTypeValue}
          disabledValues={disabledValueType}
          onvalueChanged={(event: JetElementCustomEvent<ReferenceValuesType>) =>
            setRefObjItemsTypeValue(event.detail.value)
          }
          enumValues={["constant","varied"]}
        />
        <demo-radioset-enum
          id="radioButtonset3"
          direction="row"
          value={locationValue}
          labelHint="Location"
          onvalueChanged={(event: JetElementCustomEvent<ReferenceLocation>) =>
            setLocationValue(event.detail.value)
          }
          enumValues={["back","front"]}
        />
      </oj-form-layout>

      <oj-chart
        id="scatterChart"
        coordinateSystem="polar"
        type="scatter"
        polarGridShape="circle"
        data={dataProvider}
        animationOnDataChange="auto"
        animationOnDisplay="auto"
        yAxis={yAxisData}
        xAxis={xAxisData}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default PolarChartRefObject;
