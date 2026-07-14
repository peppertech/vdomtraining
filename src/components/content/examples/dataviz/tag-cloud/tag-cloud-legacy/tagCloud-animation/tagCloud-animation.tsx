import 'css!./demo.css';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojtagcloud';
import 'ojs/ojtoolbar';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type SocialNetwork = {
  id: string;
  total: number;
  '14-17': number;
  '18-34': number;
  '35-54': number;
};

type TagItemTemplateContext = {
  data: SocialNetwork;
};

const ageBrackets = ['14-17', '18-34', '35-54'] as const;

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

export const TagCloudAnimation = () => {
  const handler = useMemo(
    () =>
      new ColorAttributeGroupHandler({
        '14-17': '#195f74',
        '18-34': '#c84e3c',
        '35-54': '#a02591'
      }),
    []
  );
  const initialData = useMemo(() => JSON.parse(jsonData as string) as SocialNetwork[], []);
  const socialNetworksRef = useRef<SocialNetwork[]>(initialData.map((item) => ({ ...item })));
  const addIndexRef = useRef<number | null>(null);
  const [tags, setTags] = useState<SocialNetwork[]>(() => socialNetworksRef.current.map((item) => ({ ...item })));
  const dataProvider = useMemo(() => new ArrayDataProvider(tags, { keyAttributes: 'id' }), [tags]);

  const getColor = (ageGroups: SocialNetwork) => handler.getValue(getAgeGroup(ageGroups));

  const renderAnimatedTagCloudItem = (item: TagItemTemplateContext) => (
    <oj-tag-cloud-item
      label={item.data.id}
      value={item.data.total}
      color={getColor(item.data)}
      short-desc={`${item.data.id}: Most popular amongst age group ${getAgeGroup(item.data)}`}
    />
  );

  const syncTags = () => {
    setTags(socialNetworksRef.current.map((item) => ({ ...item })));
  };

  const valueButtonClick = () => {
    socialNetworksRef.current.forEach((item) => {
      if (Math.random() < 0.4) {
        item.total = Math.random() * 100;
      }
    });
    syncTags();
  };

  const colorButtonClick = () => {
    socialNetworksRef.current.forEach((item) => {
      const age = ageBrackets[Math.floor(Math.random() * ageBrackets.length)];
      item[age] += 1000;
    });
    syncTags();
  };

  const itemButtonClick = () => {
    if (socialNetworksRef.current.length <= 13) {
      addIndexRef.current = Math.round(Math.random() * 4);
      socialNetworksRef.current.splice(addIndexRef.current, 0, {
        id: 'NewNetwork',
        total: 42.5,
        '14-17': 500,
        '18-34': 250,
        '35-54': 125
      });
    } else if (addIndexRef.current !== null) {
      socialNetworksRef.current.splice(addIndexRef.current, 1);
      addIndexRef.current = null;
    }
    syncTags();
  };

  return (
    <div id="tagcloud-container" class="oj-flex oj-sm-flex-direction-column demo-tagCloud-animation-max-width">
      <oj-toolbar
        class="oj-flex-item"
        chroming="outlined"
        aria-label="Tag Cloud Toolbar"
        aria-controls="tagcloud1"
      >
        <oj-button id="button1" onojAction={valueButtonClick}>Update values</oj-button>
        <oj-button id="button2" onojAction={colorButtonClick}>Update colors</oj-button>
        <oj-button id="button3" onojAction={itemButtonClick}>Add/Remove item</oj-button>
      </oj-toolbar>
      <oj-tag-cloud
        id="tagcloud1"
        class="oj-flex-item"
        layout="cloud"
        data={dataProvider}
        animation-on-display="auto"
        animation-on-data-change="auto"
      >
        <template slot="itemTemplate" render={renderAnimatedTagCloudItem} />
      </oj-tag-cloud>
    </div>
  );
};

export default TagCloudAnimation;
