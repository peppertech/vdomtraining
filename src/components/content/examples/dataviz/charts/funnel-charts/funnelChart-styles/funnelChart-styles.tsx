import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';

import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/targetData.json';
import '../../../../../../jet-composites/demo-tabs/loader';
import 'ojs/ojinputtext';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-select-enum/loader';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
type SelectedTab = 'funnelStyles' | 'seriesStyles';
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type DataLabelPosition = 'auto' | 'none';
type Pattern = 'auto' | 'smallChecker' | 'smallCrosshatch' | 'smallDiagonalLeft' | 'smallDiagonalRight' | 'smallDiamond' | 'smallTriangle' | 'largeChecker' | 'largeCrosshatch' | 'largeDiagonalLeft' | 'largeDiagonalRight' | 'largeDiamond' | 'largeTriangle';
type FunnelChartItem = {
    id: number;
    group: string;
    series: string;
    value: number;
    targetValue: number;
};

const chartData = JSON.parse(chartDataText as string) as FunnelChartItem[];
export const FunnelChartStyles = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>('funnelStyles');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [backgroundColor, setBackgroundColor] = useState<TextInputValue>('#F2F2F2');
  const [dataItemGaps, setDataItemGaps] = useState<TextInputValue>('50%');
  const [dataLabelPosition, setDataLabelPosition] = useState<DataLabelPosition>('auto');
  const [color1, setColor1] = useState<TextInputValue>('#8561C8');
  const [borderColor1, setBorderColor1] = useState<TextInputValue>('#0F3248');
  const [pattern1, setPattern1] = useState<Pattern>('smallChecker');

  const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
      keyAttributes: 'id'
  }), []);
  const styleDefaultsValue = (() => {
      return {
          dataItemGaps: dataItemGaps,
          dataLabelPosition: dataLabelPosition,
          funnelBackgroundColor: backgroundColor
      };
  })();
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };
  const handleSelectedTabValueChanged = (event: JetElementCustomEvent<SelectedTab>) => {
    setSelectedTab(event.detail.value);
  };
  const handleDataItemGapsValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
    setDataItemGaps(event.detail.value);
  };
  const handleDataLabelPositionValueChanged = (event: JetElementCustomEvent<DataLabelPosition>) => {
    setDataLabelPosition(event.detail.value);
  };
  const handleBackgroundColorValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
    setBackgroundColor(event.detail.value);
  };
  const handleColor1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
    setColor1(event.detail.value);
  };
  const handleBorderColor1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
    setBorderColor1(event.detail.value);
  };
  const handlePattern1ValueChanged = (event: JetElementCustomEvent<Pattern>) => {
    setPattern1(event.detail.value);
  };
    const itemTemplateRenderer = ($current: any) => {
      return <oj-chart-item value={$current.data.value} targetValue={$current.data.targetValue} groupId={[$current.data.group]} seriesId={$current.data.series}/>;
  };

  const seriesTemplateRenderer = ($current: any) => {
      return <oj-chart-series color={$current.id == 'Series 5' ? color1 : undefined} borderColor={$current.id == 'Series 5' ? borderColor1 : undefined} pattern={$current.id == 'Series 5' ? pattern1 : undefined}/>;
  };

return (
      <div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
            <div class="oj-flex-item">
                    <oj-chart id="funnelChart" type="funnel" data={dataProvider} animationOnDataChange="auto" orientation={orientationValue} styleDefaults={styleDefaultsValue}>
                              <template slot="itemTemplate" render={itemTemplateRenderer} />
                              <template slot="seriesTemplate" render={seriesTemplateRenderer} />
                          </oj-chart>
                    <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="funnelChart">
                              <demo-chart-orientation-control id="orientationControl" type="funnel" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                          </oj-toolbar>
                </div>
            <demo-tabs class="oj-flex-item" headers={[{"id":"funnelStyles","label":"Funnel Styles"},{"id":"seriesStyles","label":"Series Styles"}]} onvalueChanged={handleSelectedTabValueChanged} value={selectedTab}>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Funnel Styles Attributes</div>
                              <oj-form-layout aria-controls="funnelChart" maxColumns={2}>
                                          <oj-input-text labelHint="dataItemGaps" onvalueChanged={handleDataItemGapsValueChanged} value={dataItemGaps} />
                                          <demo-select-enum enumValues={["auto","none"]} onvalueChanged={handleDataLabelPositionValueChanged} value={dataLabelPosition} labelHint="dataLabelPosition" />
                                          <oj-input-text labelHint="funnelBackgroundColor" onvalueChanged={handleBackgroundColorValueChanged} value={backgroundColor} />
                                      </oj-form-layout>
                          </div>
                    <div class="oj-sm-padding-1x">
                              <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Series Attributes - Series 5</div>
                              <oj-form-layout aria-controls="funnelChart" maxColumns={2}>
                                          <oj-input-text labelHint="color" onvalueChanged={handleColor1ValueChanged} value={color1} />
                                          <oj-input-text labelHint="borderColor" onvalueChanged={handleBorderColor1ValueChanged} value={borderColor1} />
                                          <demo-select-enum onvalueChanged={handlePattern1ValueChanged} value={pattern1} labelHint="pattern" enumValues={["auto","smallChecker","smallCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle","largeChecker","largeCrosshatch","largeDiagonalLeft","largeDiagonalRight","largeDiamond","largeTriangle"]} />
                                      </oj-form-layout>
                          </div>
                </demo-tabs>
        </div>
    );
};
export default FunnelChartStyles;
