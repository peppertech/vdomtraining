// @ts-nocheck
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojlegend';
import 'ojs/ojtagcloud';
import 'css!./demo.css';

type SocialNetwork = {
  id: string;
  total: number;
  '14-17': number;
  '18-34': number;
  '35-54': number;
};

type HiddenCategoriesChangedEvent = CustomEvent<{ value: string[]; updatedFrom?: string }>;

type LegendItem = {
  text: string;
  shortDesc: string;
  color: string;
};

const getAgeGroup = (ageGroups: SocialNetwork) => {
  const teenager = ageGroups['14-17'];
  const youngAdult = ageGroups['18-34'];
  const middleAged = ageGroups['35-54'];

  if (teenager > youngAdult && teenager > middleAged) {
    return '14-17';
  }
  if (youngAdult > teenager && youngAdult > middleAged) {
    return '18-34';
  }
  return '35-54';
};

export const TagCloudLegend = () => {
  const [hiddenCategoriesValue, setHiddenCategoriesValue] = useState<string[]>([]);
  const handler = useMemo(
    () =>
      new ColorAttributeGroupHandler({
        '14-17': '#195f74',
        '18-34': '#c84e3c',
        '35-54': '#a02591'
      }),
    []
  );
  const socialNetworks = useMemo(() => JSON.parse(jsonData as string) as SocialNetwork[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider(socialNetworks, { keyAttributes: 'id' }),
    [socialNetworks]
  );
  const legendItems = useMemo<LegendItem[]>(
    () => [
      {
        text: '14-17',
        shortDesc: 'Age Group 14-17: Most popular network is Youtube',
        color: handler.getValue('14-17')
      },
      {
        text: '18-34',
        shortDesc: 'Age Group 18-34: Most popular network is Facebook',
        color: handler.getValue('18-34')
      },
      {
        text: '35-54',
        shortDesc: 'Age Group 35-54: Most popular network is LinkedIn',
        color: handler.getValue('35-54')
      }
    ],
    [handler]
  );
  const legendData = useMemo(
    () => new ArrayDataProvider(legendItems, { keyAttributes: 'text' }),
    [legendItems]
  );

  const getColor = (ageGroups: SocialNetwork) => handler.getValue(getAgeGroup(ageGroups));

  const handleHiddenCategoriesChanged = (event: HiddenCategoriesChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setHiddenCategoriesValue(event.detail.value);
    }
  };

  const renderLegendTagCloudItem = (item: any) => {
    const ageGroup = getAgeGroup(item.data);
    return (
      <oj-tag-cloud-item
        label={item.data.id}
        value={item.data.total}
        color={getColor(item.data)}
        categories={[ageGroup]}
        short-desc={`${item.data.id}: Most popular amongst age group ${ageGroup}`}
      />
    );
  };

  const renderLegendItem = (item: any) => (
    <oj-legend-item
      text={item.data.text}
      color={item.data.color}
      short-desc={item.data.shortDesc}
      categories={[item.data.text]}
    />
  );

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center demo-tagCloud-legend-max-width">
      <p class="oj-flex-item oj-typography-bold">
        Social Networks Used by US Internet Users (Ages 14-54)
      </p>
      <oj-tag-cloud
        id="tagcloud1"
        layout="cloud"
        onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
        hiddenCategories={hiddenCategoriesValue}
        data={dataProvider}
        animation-on-display="auto"
        animation-on-data-change="auto"
      >
        <template slot="itemTemplate" render={renderLegendTagCloudItem} />
      </oj-tag-cloud>
      <span class="oj-flex-item oj-typography-body-2xs oj-typography-bold oj-sm-padding-2x-top">
        Usage by Age Groups
      </span>
      <oj-legend
        id="legend1"
        class="oj-flex-item"
        orientation="horizontal"
        halign="center"
        onhiddenCategoriesChanged={handleHiddenCategoriesChanged}
        hiddenCategories={hiddenCategoriesValue}
        hide-and-show-behavior="on"
        data={legendData}
      >
        <template slot="itemTemplate" render={renderLegendItem} />
      </oj-legend>
    </div>
  );
};

export default TagCloudLegend;
