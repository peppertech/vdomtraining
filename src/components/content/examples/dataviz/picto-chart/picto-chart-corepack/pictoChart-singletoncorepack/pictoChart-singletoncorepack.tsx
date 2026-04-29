// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { useMemo } from 'preact/hooks';
import * as chartData from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/winterMedalData.json';
import 'ojs/ojpictochart';

type MedalName = 'gold' | 'silver' | 'bronze';
type MedalData = {
  name: string;
  medal: MedalName;
};
type CategoryData = {
  category: string;
  description: string;
  medals: MedalData[];
};
type ItemTemplateContext = {
  data: MedalData;
};

export const PictoChartSingletoncorepack = () => {
  const colorMap = useMemo<Record<MedalName, string>>(
    () => ({
      gold: '#ffd700',
      silver: '#c0c0c0',
      bronze: '#cd7f32'
    }),
    []
  );
  const categories = useMemo(() => JSON.parse(chartData as string) as CategoryData[], []);

  const getItemColor = (medalName: MedalName) => {
    return colorMap[medalName];
  };

  const getDataProvider = (medalData: MedalData[]) => {
    return new ArrayDataProvider<MedalData['name'], MedalData>(medalData, { keyAttributes: 'name' });
  };

  const renderPictoItem = (item: ItemTemplateContext) => {
    return (
      <oj-picto-chart-item
        name={item.data.name}
        short-desc={item.data.name}
        shape="circle"
        color={getItemColor(item.data.medal)}
      />
    );
  };

  const renderCategory = (category: CategoryData) => {
    return (
      <div class="oj-flex-item oj-sm-padding-2x-horizontal oj-helper-inline-block">
        <oj-picto-chart
          id="pictochart1"
          data={getDataProvider(category.medals)}
          layout="horizontal"
          layout-origin="bottomStart"
          column-count="3"
          class="oj-sm-width-full demo-pictochart-singleton-style oj-helper-inline-block"
        >
          <template slot="itemTemplate" render={renderPictoItem} />
        </oj-picto-chart>
        <div>
          <span>{category.description}</span>
        </div>
      </div>
    );
  };

  return (
    <div id="chart-container">
      <div class="oj-typography-bold">USA Winter Olympics Medal Count (2014)</div>
      <div class="oj-flex oj-sm-flex-items-initial">{categories.map(renderCategory)}</div>
    </div>
  );
};

export default PictoChartSingletoncorepack;
