import "css!./demo.css";
import "oj-c/tag-cloud";
import { useMemo } from "preact/hooks";
import * as socialNetworksText from "text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

type SocialNetwork = {
  id: string;
  total: number;
};

type TagCloudItemTemplateContext = {
  data: SocialNetwork;
};

const socialNetworks = JSON.parse(socialNetworksText as string) as SocialNetwork[];

const renderTagCloudItem = (item: TagCloudItemTemplateContext) => (
  <oj-c-tag-cloud-item
    label={item.data.id}
    value={item.data.total}
    shortDesc={`${item.data.id}: ${item.data.total}% of respondents`}
  />
);

export const TagCloudBasiccorepack = () => {
  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, SocialNetwork>(socialNetworks, { keyAttributes: "id" }),
    []
  );

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center demo-tagCloud-default-max-width">
      <p id="title" class="oj-flex-item oj-typography-bold">
        Social Networks Used by US Internet Users (Ages 14-54)
      </p>
      <oj-c-tag-cloud id="tagcloud1" layout="cloud" data={dataProvider} aria-labelledby="title">
        <template slot="itemTemplate" render={renderTagCloudItem} />
      </oj-c-tag-cloud>
    </div>
  );
};

export default TagCloudBasiccorepack;
