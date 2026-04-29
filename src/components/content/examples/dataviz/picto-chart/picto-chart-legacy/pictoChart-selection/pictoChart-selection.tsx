// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartData from 'text!../../data/cookbook/dataVisualizations/pictoChart/resources/appleData.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { ojRadioset } from 'ojs/ojradioset';
import { ojPictoChart } from 'ojs/ojpictochart';
import 'ojs/ojpictochart';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojformlayout';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const data = JSON.parse(chartData as string);
const initialSelection = ['iPad'];

export const PictoChartSelection = () => {
  const [selectionValue, setSelectionValue] = useState<string>('single');
  const [drillingValue, setDrillingValue] = useState<string>('on');
  const [selectedItemsValue, setSelectedItemsValue] = useState<string[]>(initialSelection);
  const [selectedImageItemsValue, setSelectedImageItemsValue] = useState<string[]>(initialSelection);
  const [drillInfo, setDrillInfo] = useState<string>();
  const [drillInfo2, setDrillInfo2] = useState<string>();

  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const dataProvider = useMemo(() => new ArrayDataProvider(data, { keyAttributes: 'name' }), []);
  const itemRootMap = useMemo(
    () => ({
      iPhone: 'iphone',
      iPad: 'ipad',
      Mac: 'macBook'
    }),
    []
  );
  const itemSuffixMap = useMemo(
    () => ({
      source: '',
      sourceHover: '-faded',
      sourceHoverSelected: '-inverted-faded',
      sourceSelected: '-inverted'
    }),
    []
  );

  const getImageSourceVariation = (item: string, variation: string) =>
    `../images/pictoChart/${itemRootMap[item]}${itemSuffixMap[variation]}.png`;

  const getResetSelection = (mode: string) => {
    if (mode === 'multiple') {
      return ['iPhone', 'Mac'];
    }
    if (mode === 'single') {
      return ['iPad'];
    }
    return [];
  };

  const handleSelectionModeChanged = (event: ojRadioset.valueChanged<string, string>) => {
    const nextSelectionMode = event.detail.value;
    const nextSelection = getResetSelection(nextSelectionMode);

    setSelectionValue(nextSelectionMode);
    setSelectedItemsValue(nextSelection);
    setSelectedImageItemsValue(nextSelection);
    return true;
  };

  const handleDrillingModeChanged = (event: PropertyChangedEvent<string>) => {
    setDrillingValue(event.detail.value);
  };

  const handleSelectedItemsChanged = (event: PropertyChangedEvent<string[]>) => {
    setSelectedItemsValue(event.detail.value ?? []);
  };

  const handleSelectedImageItemsChanged = (event: PropertyChangedEvent<string[]>) => {
    setSelectedImageItemsValue(event.detail.value ?? []);
  };

  const handlePicto1Drill = (event: ojPictoChart.ojDrill) => {
    setDrillInfo(event.detail.id);
  };

  const handlePicto2Drill = (event: ojPictoChart.ojDrill) => {
    setDrillInfo2(event.detail.id);
  };

  const renderColorItem = (item: any) => (
    <oj-picto-chart-item
      name={item.data.name}
      color={colorHandler.getValue(item.data.name)}
      count={item.data.count * 2}
    />
  );

  const renderImageItem = (item: any) => (
    <oj-picto-chart-item
      name={item.data.name}
      count={item.data.count * 2}
      source={getImageSourceVariation(item.data.name, 'source')}
      source-hover-selected={getImageSourceVariation(item.data.name, 'sourceHoverSelected')}
      source-hover={getImageSourceVariation(item.data.name, 'sourceHover')}
      source-selected={getImageSourceVariation(item.data.name, 'sourceSelected')}
    />
  );

  const renderSelectionList = (items: string[]) =>
    items.length > 0 ? items.map((item: any) => <div key={item}>{item}</div>) : <span>None</span>;

  return (
    <div id="chart-container">
      <oj-form-layout aria-controls="pictochart1 pictochart2" max-columns={2}>
        <demo-radioset-enum
          id="radioButtonset3"
          value={selectionValue}
          onvalueChanged={handleSelectionModeChanged}
          direction="row"
          enumValues={["none", "single", "multiple"]}
          labelHint="Selection Mode"
        />
        <demo-radioset-enum
          id="radioButtonset4"
          value={drillingValue}
          onvalueChanged={handleDrillingModeChanged}
          direction="row"
          enumValues={["off", "on"]}
          labelHint="Drilling"
        />
      </oj-form-layout>
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <oj-picto-chart
            id="pictochart1"
            data={dataProvider}
            selection-mode={selectionValue}
            onselectionChanged={handleSelectedItemsChanged}
            selection={selectedItemsValue}
            drilling={drillingValue}
            animation-on-data-change="auto"
            column-count="12"
            onojDrill={handlePicto1Drill}
          >
            <template slot="itemTemplate" render={renderColorItem} />
          </oj-picto-chart>
          <div class="oj-flex">
            <div class="oj-flex-item">
              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Selected</div>
              {renderSelectionList(selectedItemsValue)}
            </div>
            <div class="oj-flex-item">
              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Drilled</div>
              <span>{drillInfo ?? 'None'}</span>
            </div>
          </div>
        </div>
        <div class="oj-flex-item oj-sm-margin-1x-horizontal">
          <oj-picto-chart
            id="pictochart2"
            data={dataProvider}
            selection-mode={selectionValue}
            onselectionChanged={handleSelectedImageItemsChanged}
            selection={selectedImageItemsValue}
            drilling={drillingValue}
            animation-on-data-change="auto"
            column-count="12"
            onojDrill={handlePicto2Drill}
          >
            <template slot="itemTemplate" render={renderImageItem} />
          </oj-picto-chart>
          <div class="oj-flex">
            <div class="oj-flex-item">
              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Selected</div>
              {renderSelectionList(selectedImageItemsValue)}
            </div>
            <div class="oj-flex-item">
              <div class="oj-typography-bold oj-sm-margin-2x-vertical">Drilled</div>
              <span>{drillInfo2 ?? 'None'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictoChartSelection;
