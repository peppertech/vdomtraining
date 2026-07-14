// @ts-nocheck
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojformlayout';
import 'ojs/ojlegend';
import 'ojs/ojpictochart';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as populationDataText from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/populationData.json';
import * as medalDataText from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/summerMedalData.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const dataPopulation = JSON.parse(populationDataText as string);
const dataMedal = JSON.parse(medalDataText as string);

export const PictoChartLayoutcorepack = () => {
  const [layoutOrigin, setLayoutOrigin] = useState<string>('topStart');
  const [layout, setLayout] = useState<string>('horizontal');
  const [dataset, setDataset] = useState<string>('Population');
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);

  const headerMap = useMemo(
    () => ({
      Population: '2014 USA Population Age Brackets',
      Medals: '2012 USA Summer Olympics Medals'
    }),
    []
  );
  const medalMap = useMemo(
    () => ({
      Gold: { rowSpan: 4, columnSpan: 4, color: '#ffd700' },
      Silver: { rowSpan: 2, columnSpan: 2, color: '#c0c0c0' },
      Bronze: { rowSpan: 1, columnSpan: 1, color: '#cd7f32' }
    }),
    []
  );
  const populationDataProvider = useMemo(() => new ArrayDataProvider(dataPopulation, { keyAttributes: 'name' }), []);
  const populationLegendData = useMemo(() => [{ title: 'Sizes', items: [{ name: '1%' }] }, { title: 'Ages', items: dataPopulation }], []);
  const populationLegendDataProvider = useMemo(
    () => new ArrayTreeDataProvider(populationLegendData, { keyAttributes: 'name', childrenAttribute: 'items' }),
    [populationLegendData]
  );
  const medalDataProvider = useMemo(() => new ArrayDataProvider(dataMedal, { keyAttributes: 'name' }), []);
  const medalLegendData = useMemo(() => [{ title: 'Medals', items: dataMedal }], []);
  const medalLegendDataProvider = useMemo(
    () => new ArrayTreeDataProvider(medalLegendData, { keyAttributes: 'name', childrenAttribute: 'items' }),
    [medalLegendData]
  );

  const handleLayoutValueChanged = (event: PropertyChangedEvent<string>) => setLayout(event.detail.value);
  const handleLayoutOriginValueChanged = (event: PropertyChangedEvent<string>) => setLayoutOrigin(event.detail.value);
  const handleDatasetValueChanged = (event: PropertyChangedEvent<string>) => setDataset(event.detail.value);

  return (
    <div id="chart-container">
      <div class="oj-typography-bold oj-sm-margin-3x-vertical">{headerMap[dataset]}</div>
      <oj-form-layout max-columns={2} aria-controls="pictochart1 pictochart2">
        <demo-radioset-enum labelHint="layout" direction="row" onvalueChanged={handleLayoutValueChanged} value={layout} enumValues={["vertical", "horizontal"]} />
        <demo-radioset-enum labelHint="layoutOrigin" direction="row" onvalueChanged={handleLayoutOriginValueChanged} value={layoutOrigin} enumValues={["topStart", "topEnd", "bottomStart", "bottomEnd"]} />
        <demo-radioset-enum labelHint="Dataset" direction="row" value={dataset} onvalueChanged={handleDatasetValueChanged} enumValues={["Population", "Medals"]} />
      </oj-form-layout>
      {dataset === 'Population' ? (
        <>
          <oj-picto-chart id="pictochart1" class="oj-sm-margin-6x-bottom" data={populationDataProvider} animation-on-data-change="auto" layout={layout} column-count={10} column-width={30} layout-origin={layoutOrigin}>
            <template slot="itemTemplate" render={(item) => <oj-picto-chart-item name={`${item.data.name} years`} short-desc={`${item.data.name}: ${item.data.count}%`} shape="human" color={colorHandler.getValue(item.data.name)} count={item.data.count} />} />
          </oj-picto-chart>
          <oj-legend orientation="horizontal" id="legend1" data={populationLegendDataProvider}>
            <template slot="itemTemplate" render={(item) => <oj-legend-item short-desc={item.data.name} text={item.data.name} marker-shape="human" color={item.data.name !== '1%' ? colorHandler.getValue(item.data.name) : ''} />} />
            <template slot="sectionTemplate" render={(section) => <oj-legend-section text={section.data.title} />} />
          </oj-legend>
        </>
      ) : null}
      {dataset === 'Medals' ? (
        <>
          <oj-picto-chart class="oj-sm-margin-6x-bottom" id="pictochart2" data={medalDataProvider} animation-on-data-change="auto" column-count={28} column-width={10} layout={layout} layout-origin={layoutOrigin}>
            <template slot="itemTemplate" render={(item) => <oj-picto-chart-item name={item.data.name} shape="circle" color={medalMap[item.data.name].color} count={item.data.count} row-span={medalMap[item.data.name].rowSpan} column-span={medalMap[item.data.name].columnSpan} />} />
            <template slot="tooltipTemplate" render={(item) => <span>{`${item.count} ${item.name} Medals`}</span>} />
          </oj-picto-chart>
          <oj-legend id="legend2" orientation="horizontal" data={medalLegendDataProvider}>
            <template slot="itemTemplate" render={(item) => <oj-legend-item short-desc={item.data.name} text={item.data.name} marker-shape="human" color={medalMap[item.data.name].color} />} />
            <template slot="sectionTemplate" render={(item) => <oj-legend-section text={item.data.title} />} />
          </oj-legend>
        </>
      ) : null}
    </div>
  );
};

export default PictoChartLayoutcorepack;
