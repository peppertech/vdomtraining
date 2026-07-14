import 'preact';
import type { ComponentProps } from 'preact';

import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicData.json';
import * as pieDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemTwelveSeriesData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartDrilling = ComponentProps<'oj-chart'>['drilling'];
type ChartSelectionMode = ComponentProps<'oj-chart'>['selectionMode'];
type MultiSeriesDrilling = ComponentProps<'oj-chart'>['multiSeriesDrilling'];
type NumberValue = ComponentProps<'oj-input-number'>['value'];
type BarChartItem = {
    id: number;
    group: string;
    series: string;
    value: number;
};
type PieChartItem = {
    id: number;
    group: string;
    series: string;
    value: number;
};

const data = JSON.parse(dataText as string) as BarChartItem[];
const pieData = JSON.parse(pieDataText as string) as PieChartItem[];
export const ChartDrillingEvents = () => {
  const [stackValue, setStackValue] = useState<ChartStack>('off');
  const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
  const [drillingValue, setDrillingValue] = useState<ChartDrilling>('on');
  const [selectionValue, setSelectionValue] = useState<ChartSelectionMode>('none');
  const [drillText, setDrillText] = useState<string>('');
  const [drillType, setDrillType] = useState<string>(' ');
  const [drillSource, setDrillSource] = useState<string>(' ');
  const [multiSeriesDrillingValue, setMultiSeriesDrillingValue] = useState<MultiSeriesDrilling>('on');
  const [otherThresholdValue] = useState<number>(0.03);
  const [pieChartData] = useState<PieChartItem[]>(pieData);

  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: 'id'
  }), []);
  const pieChartDataProvider = useMemo(() => new ArrayDataProvider(pieChartData, {
      keyAttributes: 'id'
  }), [pieChartData]);
  const handleDrillingValueValueChanged = (event: JetElementCustomEvent<ChartDrilling>) => {
    setDrillingValue(event.detail.value);
  };
  const handleSelectionValueValueChanged = (event: JetElementCustomEvent<ChartSelectionMode>) => {
    setSelectionValue(event.detail.value);
  };
  const handleMultiSeriesDrillingValueValueChanged = (event: JetElementCustomEvent<MultiSeriesDrilling>) => {
    setMultiSeriesDrillingValue(event.detail.value);
  };
  const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
    setOrientationValue(event.detail.value);
  };
  const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
    setStackValue(event.detail.value);
  };
  const itemDrillHandler = (event: ojChart.ojItemDrill<string, Record<string, string | number>, null>) => {
      let sourceElement = (event.target as HTMLElement).id;
      setDrillSource(sourceElement);
      setDrillType('itemDrill');
      let text = '';
      let group = event.detail.group;
      let series = event.detail.series;
      text += 'series: ' + series + '; ';
      text += 'group: ' + group + ' ';
      setDrillText(text);
  };
  const groupDrillHandler = (event: ojChart.ojGroupDrill<string, Record<string, string | number>, null>) => {
      setDrillType('groupDrill');
      let sourceElement = (event.target as HTMLElement).id;
      setDrillSource(sourceElement);
      let group = event.detail.group;
      let text = '';
      text += 'group: ' + group + ' ';
      setDrillText(text);
  };
  const seriesDrillHandler = (event: ojChart.ojSeriesDrill<string, Record<string, string | number>, null>) => {
      setDrillType('seriesDrill');
      let sourceElement = (event.target as HTMLElement).id;
      setDrillSource(sourceElement);
      let series = event.detail.series;
      var text = '';
      text += 'series: ' + series + '; ';
      setDrillText(text);
  };
  const multiSeriesHandler = (event: ojChart.ojMultiSeriesDrill<string, Record<string, string | number>, null>) => {
      setDrillType('multiSeriesDrill');
      let sourceElement = (event.target as HTMLElement).id;
      setDrillSource(sourceElement);
      let series = event.detail.series;
      let text = '';
      text += 'series: ' + series.toString() + '; ';
      setDrillText(text);
  };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
    return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
};
  const itemTemplateRenderer2 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
    return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
};

return (
      <div id="chart-container">
            <oj-form-layout maxColumns={2} aria-controls="barChart">
                    <demo-radioset-enum labelHint="Drilling" direction="row" onvalueChanged={handleDrillingValueValueChanged} value={drillingValue} enumValues={["off", "groupsOnly", "seriesOnly", "on"]} />
                    <demo-radioset-enum labelHint="Selection" direction="row" onvalueChanged={handleSelectionValueValueChanged} value={selectionValue} enumValues={["none", "single", "multiple"]} />
                    <demo-radioset-enum labelHint="MultiSeriesDrilling" direction="row" onvalueChanged={handleMultiSeriesDrillingValueValueChanged} value={multiSeriesDrillingValue} enumValues={["on", "off"]} />
                </oj-form-layout>
            <div class="oj-flex">
                    <div class="oj-flex-item">
                              <oj-chart id="barChart" type="bar" drilling={drillingValue} selectionMode={selectionValue} data={dataProvider} orientation={orientationValue} stack={stackValue} animationOnDisplay="auto" animationOnDataChange="auto" onojGroupDrill={groupDrillHandler} onojSeriesDrill={seriesDrillHandler} onojItemDrill={itemDrillHandler}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer} />
                                      </oj-chart>
                              <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
                                          <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} />
                                          <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator" />
                                          <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue} />
                                      </oj-toolbar>
                          </div>
                    <div class="oj-flex-item">
                              <oj-chart id="pieChart" type="pie" data={pieChartDataProvider} drilling={drillingValue} sorting="ascending" selectionMode={selectionValue} multiSeriesDrilling={multiSeriesDrillingValue} onojMultiSeriesDrill={multiSeriesHandler} onojGroupDrill={groupDrillHandler} onojSeriesDrill={seriesDrillHandler} onojItemDrill={itemDrillHandler} animationOnDisplay="auto" animationOnDataChange="auto" otherThreshold={otherThresholdValue}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2} />
                                      </oj-chart>
                          </div>
                </div>
            <div class="oj-sm-padding-1x">
                    <div>
                              Type:
                              <b>{drillType}</b>
                          </div>
                    <div>
                              Source:
                              {drillSource}
                          </div>
                    <div>
                              Details:
                              {drillText}
                          </div>
                </div>
        </div>
    );
};
export default ChartDrillingEvents;
