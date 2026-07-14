import 'css!./demo.css';
import 'ojs/ojtagcloud';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type SocialNetwork = {
  id: string;
  total: number;
};

const renderStyledTagCloudItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (
  <oj-tag-cloud-item
    label={item.data.id}
    value={item.data.total}
    color={item.data.total > 50 ? '#a02591' : item.data.total > 15 ? '#195f74' : '#c84e3c'}
    short-desc={`${item.data.id}: ${item.data.total}% of respondents`}
    svg-class-name={item.data.total < 15 ? 'demo-tagCloud-styles-borderStyle' : ''}
  />
);

export const TagCloudStyles = () => {
  const socialNetworks = useMemo(() => JSON.parse(jsonData as string) as SocialNetwork[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider(socialNetworks, { keyAttributes: 'id' }),
    [socialNetworks]
  );

  return (
    <>
      <svg height="0" width="0">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" class="demo-tagCloud-styles-offset-0" />
            <stop offset="70%" class="demo-tagCloud-styles-offset-70" />
          </linearGradient>
          <filter id="filter1" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
      </svg>
      <oj-tag-cloud id="tagcloud1" layout="cloud" data={dataProvider} class="demo-tagCloud-styles-max-width">
        <template slot="itemTemplate" render={renderStyledTagCloudItem} />
      </oj-tag-cloud>
    </>
  );
};

export default TagCloudStyles;
