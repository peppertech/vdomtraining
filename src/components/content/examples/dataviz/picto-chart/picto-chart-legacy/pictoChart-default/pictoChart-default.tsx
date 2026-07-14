import 'ojs/ojpictochart';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as chartData from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/defaultData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

export const PictoChartDefault = () => {
  const data = JSON.parse(chartData) as DatavizChartDatum[];
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'name'
  }), [data]);

  const getColor = (index: number) => {
      return index === 0 ? '#ed6647' : '';
  };

  return (
      <div id="picto-container">
            <oj-picto-chart id="pictochart1" data={dataProvider} column-count="5">
                    <template slot="itemTemplate" render={(item) => (
                            <>
                                <oj-picto-chart-item name={item.data.name} shape="human" count={item.data.count} color={getColor(item.index)} />
                            </>
                          )} />
                </oj-picto-chart>
            <div><b>7 out of 10 college students</b></div>
            <div><b>have sleep problems.</b></div>
        </div>
    );
};

export default PictoChartDefault;
