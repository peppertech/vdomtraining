// @ts-nocheck
import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartData from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/customShapesData.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojpictochart';
import 'ojs/ojlegend';

export const PictoChartCustomShapes = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const dataProvider = useMemo(() => new ArrayDataProvider(JSON.parse(chartData), {
      keyAttributes: 'name'
  }), []);

  return (
      <div id="chart-container">
            <div class="oj-typography-bold">Mode Of Transport For Personal Travels (England 2013)</div>
            <oj-picto-chart id="pictochart1" class="oj-sm-margin-6x-bottom" column-count="10" data={dataProvider}>
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                <oj-picto-chart-item categories={[item.data.name]} short-desc={item.data.count + '%' + ' ' + item.data.name} name={item.data.name} shape={item.data.shape} color={colorHandler.getValue(item.data.name)} count={item.data.count} />
                            </>
                          )} />
                </oj-picto-chart>
            <oj-legend id="legend1" symbol-height="20" orientation="horizontal" data={dataProvider}>
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                <oj-legend-item short-desc={item.data.name} categories={[item.data.name]} text={item.data.name} marker-shape={item.data.shape} color={colorHandler.getValue(item.data.name)} />
                            </>
                          )} />
                </oj-legend>
        </div>
    );
};

export default PictoChartCustomShapes;
