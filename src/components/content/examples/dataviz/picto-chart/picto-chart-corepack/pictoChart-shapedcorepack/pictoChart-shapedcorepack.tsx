// @ts-nocheck
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartData from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/shapedData.json';
import 'ojs/ojpictochart';

export const PictoChartShapedcorepack = () => {
  const dataProvider = useMemo(() => new ArrayDataProvider(JSON.parse(chartData), {
      keyAttributes: 'name'
  }), []);

  return (
      <div id="picto-container">
            <oj-picto-chart id="pictochart1" data={dataProvider} column-count="5" aria-label="Picto chart showing information using icons " />
            <div><b>7 out of 10 college students</b></div>
            <div><b>have sleep problems.</b></div>
        </div>
    );
};

export default PictoChartShapedcorepack;
