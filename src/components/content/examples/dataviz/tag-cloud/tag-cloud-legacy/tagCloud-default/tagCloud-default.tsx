import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtagcloud';
import 'css!./demo.css';

type SocialNetwork = {
  id: string;
  total: number;
};

const renderTagCloudItem = (item: any) => (
  <oj-tag-cloud-item
    label={item.data.id}
    value={item.data.total}
    short-desc={`${item.data.id}: ${item.data.total}% of respondents`}
  />
);

export const TagCloudDefault = () => {
  const socialNetworks = useMemo(() => JSON.parse(jsonData as string) as SocialNetwork[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider(socialNetworks, { keyAttributes: 'id' }),
    [socialNetworks]
  );

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center demo-tagCloud-default-max-width">
      <p class="oj-flex-item oj-typography-bold">
        Social Networks Used by US Internet Users (Ages 14-54)
      </p>
      <oj-tag-cloud id="tagcloud1" layout="cloud" data={dataProvider}>
        <template slot="itemTemplate" render={renderTagCloudItem} />
      </oj-tag-cloud>
    </div>
  );
};

export default TagCloudDefault;
