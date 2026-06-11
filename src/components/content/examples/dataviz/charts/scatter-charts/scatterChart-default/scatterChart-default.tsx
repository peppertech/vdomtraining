import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import 'ojs/ojchart';

type ScatterChartItem = {
  id: number;
  group: string;
  series: string;
  x: number;
  y: number;
};

const data = JSON.parse(dataText as string) as ScatterChartItem[];

export const ScatterChartDefault = () => {
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(data, {
        keyAttributes: 'id'
      }),
    []
  );

  const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => (
    <oj-chart-item
      x={item.data.x}
      y={item.data.y}
      groupId={[item.data.group]}
      seriesId={item.data.series}
    />
  );

  return (
    <div id="chart-container">
      <oj-chart
        type="scatter"
        selectionMode="multiple"
        data={dataProvider}
        animationOnDisplay="auto"
        hoverBehavior="dim"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-chart>
    </div>
  );
};

export default ScatterChartDefault;
