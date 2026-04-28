import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/hiringData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import "css!./demo.css";
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartStackLabel = ComponentProps<'oj-chart'>['stackLabel'];
type ChartDataLabelPosition = 'auto' | 'center' | 'insideBarEdge' | 'outsideBarEdge' | 'none';
type BarChartDataLabelItem = {
    id: number;
    year: string;
    company: string;
    value: number;
};
const data = JSON.parse(dataText as string) as BarChartDataLabelItem[];
export const BarChartDataLabels = () => {
    const [stackValue, setStackValue] = useState<ChartStack>('on');
    const [stackLabelValue, setStackLabelValue] = useState<ChartStackLabel>('on');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [labelPosition, setLabelPosition] = useState<ChartDataLabelPosition>('auto');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleLabelPositionValueChanged = (event: JetElementCustomEvent<ChartDataLabelPosition>) => {
        setLabelPosition(event.detail.value);
    };
    const handleStackLabelValueValueChanged = (event: JetElementCustomEvent<ChartStackLabel>) => {
        setStackLabelValue(event.detail.value);
    };
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };
    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value);
    };
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.year]} seriesId={item.data.company} label={item.data.value.toString()}/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { styleDefaults: {
            dataLabelPosition: labelPosition
        }, yAxis: {
            tickLabel: {
                rendered: "off"
            }
        } };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="barChart">
                    <demo-select-enum id="labelPositionId" labelHint="Data Label Position" onvalueChanged={handleLabelPositionValueChanged} value={labelPosition} enumValues={["auto", "center", "insideBarEdge", "outsideBarEdge", "none"]}/>
                    <demo-radioset-enum labelHint="Stack Label" id="stackLabelToggle" direction="row" onvalueChanged={handleStackLabelValueValueChanged} value={stackLabelValue} enumValues={["off", "on"]}/>
                </oj-form-layout>
            <div class="oj-typography-heading-xs">Company New Hires</div>
            <oj-chart class="demo-barchart-datalabels-style" id="barChart" type="bar" data={dataProvider} animationOnDisplay="auto" orientation={orientationValue} stack={stackValue} stackLabel={stackLabelValue} {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
                    <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                    <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
                </oj-toolbar>
        </div>);
};
export default BarChartDataLabels;
