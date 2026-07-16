import "css!./demo.css";
import "oj-c/tag-cloud";
import type { ComponentProps } from "preact";
import { useMemo } from "preact/hooks";
import * as socialNetworksText from "text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

type TagCloudDatatipConfig = NonNullable<ComponentProps<"oj-c-tag-cloud">["datatipConfig"]>;

type SocialNetwork = {
  id: string;
  total: number;
};

type TagCloudItemTemplateContext = {
  data: SocialNetwork;
};

type TagCloudDatatipTemplateContext = {
  label?: string;
  value: number;
};

const socialNetworks = JSON.parse(socialNetworksText as string) as SocialNetwork[];

const datatipConfig: TagCloudDatatipConfig = () => ({
  defaultContainer: "enabled",
  style: {
    borderColor: "red"
  },
  rendered: "on"
});

const renderTagCloudItem: import("ojs/ojvcomponent").TemplateSlot<TagCloudItemTemplateContext> = (item) => (
  <oj-c-tag-cloud-item
    label={item.data.id}
    value={item.data.total}
    shortDesc={`${item.data.id}: ${item.data.total}% of respondents`}
  />
);

const renderDatatip: import("ojs/ojvcomponent").TemplateSlot<TagCloudDatatipTemplateContext> = (item) => (
  <div>
    {item.label ?? ""}: {item.value}
  </div>
);

export const TagCloudDatatipcorepack = () => {
  const dataProvider = useMemo(
    () => new ArrayDataProvider<string, SocialNetwork>(socialNetworks, { keyAttributes: "id" }),
    []
  );

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center demo-tagCloud-datatip-max-width">
      <p class="oj-flex-item oj-typography-bold">
        Social Networks Used by US Internet Users (Ages 14-54)
      </p>
      <oj-c-tag-cloud
        id="tagcloud1"
        layout="cloud"
        aria-label="demo tag cloud with datatip"
        data={dataProvider}
        datatipConfig={datatipConfig}
      >
        <template slot="itemTemplate" render={renderTagCloudItem} />
        <template slot="datatipTemplate" render={renderDatatip} />
      </oj-c-tag-cloud>
    </div>
  );
};

export default TagCloudDatatipcorepack;
