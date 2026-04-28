import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';

type SelectedTab = 'pyramidStyles' | 'seriesStyles';
type DataLabelPosition = 'auto' | 'none';
type Pattern =
  | 'auto'
  | 'smallChecker'
  | 'largeTriangle'
  | 'largeDiagonalRight'
  | 'largeDiamond'
  | 'smallCrosshatch'
  | 'largeDiagonalLeft'
  | 'largeCrosshatch'
  | 'smallDiagonalLeft'
  | 'smallDiagonalRight'
  | 'smallDiamond'
  | 'smallTriangle'
  | 'largeChecker';
type PyramidChartItem = {
  id: number;
  group: string;
  series: string;
  value: number;
};

type InputValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];

const chartData = JSON.parse(chartDataText as string) as PyramidChartItem[];

export const PyramidChartStyles = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('pyramidStyles');
  const [backgroundColor] = useState('#F2F2F2');
  const [dataItemGaps, setDataItemGaps] = useState('50%');
  const [dataLabelPosition, setDataLabelPosition] = useState<DataLabelPosition>('auto');
  const [color1, setColor1] = useState('#8561C8');
  const [borderColor1, setBorderColor1] = useState('#0F3248');
  const [pattern1, setPattern1] = useState<Pattern>('smallChecker');

  const dataProvider = useMemo(
    () => new ArrayDataProvider<number, PyramidChartItem>(chartData, { keyAttributes: 'id' }),
    []
  );
  const styleDefaultsValue = useMemo(
    () => ({
      dataItemGaps,
      dataLabelPosition,
      pyramidBackgroundColor: backgroundColor
    }),
    [backgroundColor, dataItemGaps, dataLabelPosition]
  );

  const handleSelectedTabValueChanged = (event: JetElementCustomEvent<SelectedTab>) => {
    setSelectedTab(event.detail.value);
  };

  const handleDataItemGapsValueChanged = (event: InputValueChangedEvent) => {
    setDataItemGaps(event.detail.value ?? '');
  };

  const handleDataLabelPositionValueChanged = (event: JetElementCustomEvent<DataLabelPosition>) => {
    setDataLabelPosition(event.detail.value);
  };

  const handleColor1ValueChanged = (event: InputValueChangedEvent) => {
    setColor1(event.detail.value ?? '');
  };

  const handleBorderColor1ValueChanged = (event: InputValueChangedEvent) => {
    setBorderColor1(event.detail.value ?? '');
  };

  const handlePattern1ValueChanged = (event: JetElementCustomEvent<Pattern>) => {
    setPattern1(event.detail.value);
  };

  const itemTemplateRenderer = (item: { data: PyramidChartItem }) => (
    <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />
  );

  const seriesTemplateRenderer = (series: { id: string }) => (
    <oj-chart-series
      color={series.id === 'Series 5' ? color1 : undefined}
      borderColor={series.id === 'Series 5' ? borderColor1 : undefined}
      pattern={series.id === 'Series 5' ? pattern1 : undefined}
    />
  );

  return (
    <div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
      <div class="oj-flex-item">
        <oj-chart
          id="pyramidChart"
          type="pyramid"
          data={dataProvider}
          animationOnDataChange="auto"
          styleDefaults={styleDefaultsValue}
        >
          <template slot="itemTemplate" render={itemTemplateRenderer} />
          <template slot="seriesTemplate" render={seriesTemplateRenderer} />
        </oj-chart>
      </div>

      <demo-tabs
        class="oj-flex-item"
        headers={[{"id":"pyramidStyles","label":"Pyramid Styles"},{"id":"seriesStyles","label":"Series Styles"}]}
        value={selectedTab}
        onvalueChanged={handleSelectedTabValueChanged}
      >
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">
            Pyramid Styles Attributes
          </div>

          <oj-form-layout aria-controls="pyramidChart" maxColumns={2}>
            <oj-input-text
              value={dataItemGaps}
              labelHint="dataItemGaps"
              onvalueChanged={handleDataItemGapsValueChanged}
            />

            <demo-select-enum
              value={dataLabelPosition}
              labelHint="dataLabelPosition"
              enumValues={["auto","none"]}
              onvalueChanged={handleDataLabelPositionValueChanged}
            />
          </oj-form-layout>
        </div>

        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">
            Series Attributes - Series 5
          </div>

          <oj-form-layout aria-controls="pyramidChart" maxColumns={2}>
            <oj-input-text labelHint="color" value={color1} onvalueChanged={handleColor1ValueChanged} />

            <oj-input-text
              labelHint="borderColor"
              value={borderColor1}
              onvalueChanged={handleBorderColor1ValueChanged}
            />

            <demo-select-enum
              value={pattern1}
              labelHint="pattern"
              enumValues={
                '["auto", "smallChecker", "largeTriangle", "largeDiagonalRight", "largeDiamond", "smallCrosshatch", "largeDiagonalLeft", "largeCrosshatch", "smallDiagonalLeft", "smallDiagonalRight", "smallDiamond", "smallTriangle", "largeChecker"]'
              }
              onvalueChanged={handlePattern1ValueChanged}
            />
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>
  );
};

export default PyramidChartStyles;
