import 'css!./demo.css';
import 'ojs/ojtagcloud';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/shapedSocialNetworks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ShapedTag = {
  id: string;
  label: string;
  value: number;
};

export const TagCloudShapedData = () => {
  const socialNetworks = useMemo(() => JSON.parse(jsonData as string) as ShapedTag[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider(socialNetworks, { keyAttributes: 'id' }),
    [socialNetworks]
  );

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center demo-tagCloud-shapedData-max-width">
      <p class="oj-flex-item oj-typography-bold">
        Social Networks Used by US Internet Users (Ages 14-54)
      </p>
      <oj-tag-cloud
        id="tagcloud1"
        layout="cloud"
        data={dataProvider}
        aria-label="Tag Cloud with a dataProvider that contains data that has already been shaped for the tag cloud"
      />
    </div>
  );
};

export default TagCloudShapedData;
