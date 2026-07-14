// @ts-nocheck
import 'css!./demo.css';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojformlayout';
import 'ojs/ojtagcloud';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonData from 'text!../../data/cookbook/dataVisualizations/tagCloud/resources/socialNetworks.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type SocialNetwork = {
  id: string;
  total: number;
  '14-17': number;
  '18-34': number;
  '35-54': number;
};

type SelectionChangedEvent = CustomEvent<{ value: string[]; updatedFrom?: string }>;
type ValueChangedEvent<T> = CustomEvent<{ value: T }>;

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

export const TagCloudSelectioncorepack = () => {
  const [selectionValue, setSelectionValue] = useState<string[]>(['Twitter', 'Google+']);
  const [selectionMode, setSelectionMode] = useState('multiple');
  const handler = useMemo(
    () =>
      new ColorAttributeGroupHandler({
        '14-17': '#267db3',
        '18-34': '#ed6647',
        '35-54': '#8561c8'
      }),
    []
  );
  const socialNetworks = useMemo(() => JSON.parse(jsonData as string) as SocialNetwork[], []);
  const dataProvider = useMemo(
    () => new ArrayDataProvider(socialNetworks, { keyAttributes: 'id' }),
    [socialNetworks]
  );
  const selectionText = selectionValue.join(', ');

  const getColor = (ageGroups: SocialNetwork) => handler.getValue(getAgeGroup(ageGroups));

  const handleSelectionChanged = (event: SelectionChangedEvent) => {
    if (event.detail.updatedFrom === 'internal') {
      setSelectionValue(event.detail.value);
    }
  };

  const handleSelectionModeChanged = (event: ValueChangedEvent<string>) => {
    const mode = event.detail.value;
    setSelectionMode(mode);

    if (mode === 'multiple') {
      setSelectionValue(['Twitter', 'Google+']);
    } else if (mode === 'single') {
      setSelectionValue(['Twitter']);
    } else {
      setSelectionValue([]);
    }
  };

  const renderSelectableTagCloudItem = (item: DatavizTemplateContext<DatavizChartDatum>) => {
    const ageGroup = getAgeGroup(item.data);
    return (
      <oj-tag-cloud-item
        label={item.data.id}
        value={item.data.total}
        color={getColor(item.data)}
        short-desc={`${item.data.id}: Most popular amongst age group ${ageGroup}`}
      />
    );
  };

  return (
    <div id="tagcloud-container">
      <oj-form-layout>
        <demo-radioset-enum
          id="radioButtonset"
          label-hint="Selection"
          direction="row"
          aria-controls="tagcloud1"
          value={selectionMode}
          onvalueChanged={handleSelectionModeChanged}
          enum-values='["none", "single", "multiple"]'
        />
      </oj-form-layout>
      <div class="oj-flex oj-sm-flex-direction-column oj-sm-align-items-center demo-tagCloud-selection-max-width">
        <p class="oj-flex-item oj-typography-bold">
          Social Networks Used by US Internet Users (Ages 14-54)
        </p>
        <oj-tag-cloud
          id="tagcloud1"
          layout="cloud"
          data={dataProvider}
          onselectionChanged={handleSelectionChanged}
          selection={selectionValue}
          selectionMode={selectionMode}
        >
          <template slot="itemTemplate" render={renderSelectableTagCloudItem} />
        </oj-tag-cloud>
        <div class="oj-flex-item oj-sm-margin-4x-top">
          <span class="oj-typography-bold">Current Selection:</span>
          <span>{selectionText}</span>
        </div>
      </div>
    </div>
  );
};

export default TagCloudSelectioncorepack;
