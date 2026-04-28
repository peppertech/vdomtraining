import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as boatSpeedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/boatSpeedData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'css!./demo.css';

type LineType = 'straight' | 'curved' | 'stepped' | 'segmented' | 'none';
type BoatSpeedItem = {
  id: number;
  series: string;
  angle: number;
  speed: number;
};

const boatSpeedData = JSON.parse(boatSpeedDataText as string) as BoatSpeedItem[];

const degreeConverter = {
  format: (value: number) => `${value}°`,
  parse: (value: string | number) =>
    typeof value === 'number' ? value : Number(value.replace('°', ''))
};

const speedConverter = {
  format: (value: number) => `${value} mph `,
  parse: (value: string | number) =>
    typeof value === 'number' ? value : Number(value.replace(' mph ', ''))
};

export const PolarChartLineConnectors = () => {
  const [lineTypeValue, setLineTypeValue] = useState<LineType>('curved');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, BoatSpeedItem>(boatSpeedData, { keyAttributes: 'id' }),
    []
  );

  const handleLineTypeChanged = (event: JetElementCustomEvent<LineType>) => {
    setLineTypeValue(event.detail.value);
  };

  const itemTemplateRenderer = (item: { data: BoatSpeedItem }) => (
    <oj-chart-item
      value={item.data.speed}
      x={item.data.angle}
      y={item.data.speed}
      groupId={[item.data.angle.toString()]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <div class="oj-typography-subheading-sm oj-sm-padding-1x-bottom">My Boat&apos;s Speed Chart</div>
      <oj-form-layout aria-controls="scatterChart">
        <demo-radioset-enum
          labelHint="Line Type"
          direction="row"
          value={lineTypeValue}
          onvalueChanged={handleLineTypeChanged}
          enumValues={["straight","curved","stepped","segmented","none"]}
        />
      </oj-form-layout>

      <oj-chart
        id="scatterChart"
        type="scatter"
        class="demo-polar-chart"
        coordinateSystem="polar"
        data={dataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        styleDefaults={{ lineType: lineTypeValue, markerShape: 'circle', markerSize: 6 }}
        legend={{
          title: 'Wind Speed',
          sectionTitleHalign: 'center',
          sectionTitleStyle: { fontWeight: 'bold' },
          position: 'bottom'
        }}
        yAxis={{ title: 'Boat Speed (mph)' }}
        xAxis={{ min: 0, max: 360, step: 30, tickLabel: { converter: degreeConverter } }}
        valueFormats={{
          series: { tooltipLabel: 'Wind Speed' },
          group: { tooltipDisplay: 'off' },
          x: { converter: degreeConverter, tooltipLabel: 'Wind Angle' },
          y: { converter: speedConverter, tooltipLabel: 'Boat Speed' }
        }}
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default PolarChartLineConnectors;
