import 'ojs/ojchart';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

const data = JSON.parse(dataText as string);

export const BubbleChartDefault = () => {
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);

    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
  };

return (
      <div id="chart-container">
            <oj-chart type="bubble" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim">
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
        </div>
    );
};

export default BubbleChartDefault;

