// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartData from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/dashboardData.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojpictochart';

export const PictoChartDashboard = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler({
      0: '#D32109',
      1: '#946837',
      2: '#4E7B24',
      3: '#297693'
  }), []);
  const colorMap = useMemo(() => ({
      jb: 0,
      jb1: 0,
      ppn: 1,
      ppn1: 1,
      nma: 2,
      nma1: 2,
      rahh: 3,
      rahh1: 3,
      sm: 0,
      sm1: 0,
      idtp: 1,
      idtp1: 1,
      ja: 2,
      ja1: 2,
      cfe: 3,
      cfe1: 3
  }), []);
  const data: any = JSON.parse(chartData);
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), [data]);

  const getFooterColor = (id: string) => {
      return colorHandler.getValue(colorMap[id]);
  };

  const getChartDataProvider = (data: Record<string, string | number>) => {
      const chartData = [];
      const newItem = {};
      for (let prop in data) {
          if (prop === 'count') {
              newItem[prop] = 100 - (data[prop] as number);
          }
          else if (prop === 'id') {
              newItem[prop] = `${data[prop]}1`;
          }
          else {
              newItem[prop] = data[prop];
          }
      }
      chartData.push(newItem);
      data.color = colorHandler.getValue(colorMap[data.id]);
      chartData.push(data);
      return new ArrayDataProvider(chartData, { keyAttributes: 'id' });
  };

  return (
      <div id="chart-container">
            <div class="oj-typography-bold">What is your preferred method of recruitment? (UK)</div>
            <div class="oj-flex oj-sm-margin-1x demo-pictochart-dashboard-width-style">
                    {
                            (data ?? []).map((method: any, index: any) => (
                              <>
                                <div class="oj-flex oj-sm-flex-direction-column oj-sm-margin-4x-bottom oj-helper-inline-block oj-helper-text-align-center">
                                              <div class="oj-flex-item oj-sm-margin-2x demo-pictochart-dashboard-name-style">{method.name}</div>
                                              <oj-picto-chart class="oj-flex-item oj-sm-width-full demo-pictochart-dashboard-data-style" id="pictochart1" data={getChartDataProvider(method)}>
                                                              <template slot="itemTemplate" render={(item: any) => (
                                                                              <>
                                                                                  <oj-picto-chart-item name={item.data.name} short-desc={item.data.color ? (item.data.name + ': ' + item.data.count + '%') : (item.data.name + ': ' + (100 - item.data.count) + '%')} shape="circle" color={item.data.color} count={item.data.count} />
                                                                              </>
                                                                            )} />
                                                          </oj-picto-chart>
                                              <div class="oj-flex-item oj-sm-margin-2x" {...{ 'style.color': getFooterColor(method.id) }}><span>{method.count + '%'}</span></div>
                                          </div>
                              </>
                            ))
                          }
                </div>
        </div>
    );
};

export default PictoChartDashboard;
