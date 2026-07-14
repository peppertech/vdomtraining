import 'css!./demo.css';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';
import 'ojs/ojtagcloud';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type SocialNetwork = {
  id: string;
  total: number;
  '14-17': number;
  '18-34': number;
  '35-54': number;
};

type ChartItem = {
  seriesId: string;
  groupId: string[];
  value: number;
  color: string;
};

const renderTooltipTagCloudItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-tag-cloud-item
    label={item.data.id}
    value={item.data.total}
    short-desc={`${item.data.id}: ${item.data.total}% of respondents`}
  />
);

export const TagCloudTooltip = () => {
  const socialNetworks = useMemo(() => JSON.parse(jsonData as string) as SocialNetwork[], []);
  const handler = useMemo(
    () =>
      new ColorAttributeGroupHandler({
        '14-17': '#195f74',
        '18-34': '#f9b70e',
        '35-54': '#32925e'
      }),
    []
  );
  const dataProvider = useMemo(
    () => new ArrayDataProvider(socialNetworks, { keyAttributes: 'id' }),
    [socialNetworks]
  );
  const tooltipElem = useMemo(() => {
    const element = document.createElement('div');
    element.innerHTML =
      '<div style="float:left;padding:10px 8px 10px 3px">' +
      '<span style="font-weight:bold">Usage by Age Group</span>' +
      '<br>' +
      '<span class="demo-tagCloud-tooltip-value" style="font-style:italic"></span>' +
      '</div>' +
      '<oj-chart data-oj-binding-provider="none" type="pie" style="width:200px;height:70px;float:left" style-defaults.data-label-position="none"></oj-chart>';
    return element;
  }, []);
  const valueText = useMemo(
    () => tooltipElem.querySelector('.demo-tagCloud-tooltip-value') as HTMLSpanElement,
    [tooltipElem]
  );
  const pieChart = useMemo(() => tooltipElem.querySelector('oj-chart') as HTMLElement & { data?: unknown }, [tooltipElem]);

  const getDataForId = (id: string) => socialNetworks.find((item) => item.id === id);

  const tooltipFunction = (dataContext: DatavizTooltipContext<DatavizChartDatum>) => {
    dataContext.parentElement.style.borderWidth = '2px';
    valueText.textContent = dataContext.label;

    const ageGroupValues = getDataForId(dataContext.id);
    const chartItems: ChartItem[] = [
      {
        value: ageGroupValues?.['14-17'] ?? 0,
        groupId: ['Group'],
        color: handler.getValue('14-17'),
        seriesId: '14-17'
      },
      {
        value: ageGroupValues?.['18-34'] ?? 0,
        groupId: ['Group'],
        color: handler.getValue('18-34'),
        seriesId: '18-34'
      },
      {
        value: ageGroupValues?.['35-54'] ?? 0,
        groupId: ['Group'],
        color: handler.getValue('35-54'),
        seriesId: '35-54'
      }
    ];

    pieChart.data = new ArrayDataProvider(chartItems, { keyAttributes: 'seriesId' });
    return { insert: tooltipElem };
  };

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center demo-tagCloud-tooltip-max-width">
      <p class="oj-flex-item oj-typography-bold">
        Social Networks Used by US Internet Users (Ages 14-54)
      </p>
      <oj-tag-cloud
        id="tagcloud1"
        layout="cloud"
        data={dataProvider}
        {...{ 'tooltip.renderer': tooltipFunction }}
      >
        <template slot="itemTemplate" render={renderTooltipTagCloudItem} />
      </oj-tag-cloud>
    </div>
  );
};

export default TagCloudTooltip;
