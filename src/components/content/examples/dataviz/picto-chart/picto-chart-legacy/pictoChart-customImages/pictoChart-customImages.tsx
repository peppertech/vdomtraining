// @ts-nocheck
import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartData from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/fruitData.json';
import 'ojs/ojpictochart';
import 'ojs/ojlegend';

export const PictoChartCustomImages = () => {
  const dataProvider = useMemo(() => new ArrayDataProvider(JSON.parse(chartData), {
      keyAttributes: 'name'
  }), []);
  const imageSourceMap = useMemo(() => ({
      Bananas: '../images/dvt/bananas-icon.png',
      Apples: '../images/dvt/apple-icon.png',
      Oranges: '../images/dvt/orange-icon.png',
      Strawberries: '../images/dvt/strawberry-icon.png',
      Grapes: '../images/dvt/grapes-icon.png',
      Lemons: '../images/dvt/lemon-icon.png',
      Peaches: '../images/dvt/peach-icon.png',
      Pears: '../images/dvt/pear-icon.png'
  }), []);
  const colorMap = useMemo(() => ({
      Bananas: '#F7F37B',
      Apples: '#ED6647',
      Oranges: '#FFB54D',
      Strawberries: '#ED6647',
      Grapes: '#A75DBA',
      Lemons: '#F7F37B',
      Peaches: '#FFB54D',
      Pears: '#A2BF39'
  }), []);

  return (
      <div id="chart-container">
            <div class="oj-typography-bold">Amount of Fresh Fruit Consumed Per Capita in the US (2014)</div>
            <oj-picto-chart id="pictochart1" column-count="10" data={dataProvider} class="oj-sm-margin-6x-bottom">
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                <oj-picto-chart-item name={item.data.name} short-desc={item.data.name + ': ' + item.data.count + ' Pounds'} source={imageSourceMap[item.data.name]} count={item.data.count} color={colorMap[item.data.name]} />
                            </>
                          )} />
                </oj-picto-chart>
            <oj-legend id="legend1" symbol-height="20" orientation="horizontal" data={dataProvider}>
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                <oj-legend-item short-desc={item.data.name} text={item.data.name} symbol-type="image" source={imageSourceMap[item.data.name]} />
                            </>
                          )} />
                </oj-legend>
        </div>
    );
};

export default PictoChartCustomImages;
