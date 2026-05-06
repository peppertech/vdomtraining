import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import * as regularDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/regularTimeAxisData.json';
import * as mixedDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/mixedTimeAxisData.json';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type TimeAxisTypeValue = NonNullable<ComponentProps<'oj-chart'>['timeAxisType']>;
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ApplyConverterValue = 'apply' | 'remove';
type XAxisValue = ComponentProps<'oj-chart'>['xAxis'];
type RegularDatum = {
    id: number;
    group: string;
    series: string;
    value: number;
};
type MixedDatum = {
    id: number;
    group: string;
    series: string;
    x: string | number | Date;
    y: number;
};
const regularData = JSON.parse(regularDataText as string) as RegularDatum[];
const mixedData = JSON.parse(mixedDataText as string) as MixedDatum[];
export const ChartTimeAxis = () => {
    const [timeAxisTypeValue, setTimeAxisTypeValue] = useState<TimeAxisTypeValue>('enabled');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [applyConverter, setApplyConverter] = useState<ApplyConverterValue>('remove');
    const [xAxisOptions1, setXAxisOptions1] = useState<XAxisValue>({});
    const [xAxisOptions2, setXAxisOptions2] = useState<XAxisValue>({});
    const regularDataProvider = useMemo(() => new ArrayDataProvider(regularData, {
        keyAttributes: 'id'
    }), []);
    const mixedDataProvider = useMemo(() => new ArrayDataProvider(mixedData, {
        keyAttributes: 'id'
    }), []);
    const dayMonth = useMemo(() => new IntlDateTimeConverter({
        day: 'numeric',
        month: 'numeric'
    }), []);
    const year = useMemo(() => new IntlDateTimeConverter({ year: 'numeric' }), []);
    const dayMonthYear = useMemo(() => new IntlDateTimeConverter({
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
    }), []);
    const handleTimeAxisTypeValueValueChanged = (event: JetElementCustomEvent<TimeAxisTypeValue>) => {
        setTimeAxisTypeValue(event.detail.value);
    };
    const handleApplyConverterValueChanged = (event: JetElementCustomEvent<ApplyConverterValue>) => {
        setApplyConverter(event.detail.value);
    };
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };
    const groupComparator = (groupContext1: ojChart.GroupTemplateContext<Record<string, string | number>>, groupContext2: ojChart.GroupTemplateContext<Record<string, string | number>>) => {
        return new Date(groupContext1.ids[0]).getTime() - new Date(groupContext2.ids[0]).getTime();
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item groupId={[item.data.group]} seriesId={item.data.series} value={item.data.value}/>;
    };
    const OjChartProps2: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer2 = (item: any) => {
        return <oj-chart-item groupId={[item.data.group]} seriesId={item.data.series} x={item.data.x} y={item.data.y}/>;
    };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="comboChart1 comboChart2" maxColumns={2}>
                    <demo-radioset-enum direction="row" labelHint="Time Axis Type" onvalueChanged={handleTimeAxisTypeValueValueChanged} value={timeAxisTypeValue} enumValues={["skipGaps", "enabled"]}/>
                    <demo-radioset-enum onvalueChanged={handleApplyConverterValueChanged} value={applyConverter} direction="row" labelHint="Date Time Converters" enumValues={["apply", "remove"]}/>
                </oj-form-layout>
            <div class="oj-flex">
                    <div class="oj-flex-item">
                              <h6>Regular Time Axis</h6>
                              <oj-chart id="comboChart1" type="combo" data={regularDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" timeAxisType={timeAxisTypeValue} orientation={orientationValue} xAxis={xAxisOptions1} groupComparator={groupComparator} {...OjChartProps}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer}/>
                                      </oj-chart>
                          </div>
                    <div class="oj-flex-item">
                              <h6>Mixed Frequency Time Axis</h6>
                              <oj-chart id="comboChart2" type="combo" data={mixedDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" timeAxisType="mixedFrequency" orientation={orientationValue} xAxis={xAxisOptions2} {...OjChartProps2}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2}/>
                                      </oj-chart>
                          </div>
                </div>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart1 comboChart2">
                    <demo-chart-orientation-control id="orientationControl" type="combo" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                </oj-toolbar>
        </div>);
};
export default ChartTimeAxis;
