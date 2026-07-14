import { ColorAttributeGroupHandler,ShapeAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojlegend';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/coordDrinksData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

const data = JSON.parse(dataText as string);

export const BubbleChartAttrGroups = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const shapeHandler = useMemo(() => new ShapeAttributeGroupHandler(), []);
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const legendSections = useMemo(() => ({
      sections: [
          {
              title: 'Year',
              items: [
                  {
                      markerShape: shapeHandler.getValue('2010'),
                      text: '2010',
                      id: '2010'
                  },
                  {
                      markerShape: shapeHandler.getValue('2011'),
                      text: '2011',
                      id: '2011'
                  },
                  {
                      markerShape: shapeHandler.getValue('2012'),
                      text: '2012',
                      id: '2012'
                  }
              ]
          },
          {
              title: 'Brand',
              items: [
                  {
                      color: colorHandler.getValue('Coke'),
                      text: 'Coke',
                      id: 'Coke'
                  },
                  {
                      color: colorHandler.getValue('Pepsi'),
                      text: 'Pepsi',
                      id: 'Pepsi'
                  },
                  {
                      color: colorHandler.getValue('Snapple'),
                      text: 'Snapple',
                      id: 'Snapple'
                  },
                  {
                      color: colorHandler.getValue('Nestle'),
                      text: 'Nestle',
                      id: 'Nestle'
                  }
              ]
          }
      ]
  }), [colorHandler, shapeHandler]);

  const getDesc = (item: ojChart.ItemTemplateContext) => {
      const data = item.data as Record<string, string | number>;
      return `${data.company} ${data.year}&lt;br/&gt;X: ${data.x}&lt;br/&gt;Y: ${data.y}&lt;br/&gt;Z: ${data.z}`;
  };

    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
      return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.year]} seriesId={item.data.company} color={colorHandler.getValue(item.data.company)} markerShape={shapeHandler.getValue(item.data.year)} categories={[item.data.company, item.data.year]} shortDesc={getDesc(item)}/>;
  };

  const seriesTemplateRenderer = ($current: DatavizSeriesTemplateContext) => {
      return <oj-chart-series displayInLegend="off"/>;
  };

return (
      <div id="chart-container">
            <oj-chart id="Chart" type="bubble" data={dataProvider} hideAndShowBehavior="withRescale" hoverBehavior="dim" animationOnDisplay="auto" legend={legendSections}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                    <template slot="seriesTemplate" render={seriesTemplateRenderer} />
                </oj-chart>
        </div>
    );
};

export default BubbleChartAttrGroups;

