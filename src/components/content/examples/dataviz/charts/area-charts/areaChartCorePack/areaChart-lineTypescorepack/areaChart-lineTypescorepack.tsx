import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as quarterDataText from 'text!../../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import 'ojs/ojformlayout';
import '../../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../../jet-composites/demo-radioset-enum/loader';
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ChartLineType = 'straight' | 'curved';
type AreaChartItem = {
    id: number;
    quarter: string;
    series: string;
    value: number;
};
const quarterData = JSON.parse(quarterDataText as string) as AreaChartItem[];
export const AreaChartLineTypescorepack = () => {
    const [stackValue, setStackValue] = useState<ChartStack>('on');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [lineTypeValue, setLineTypeValue] = useState<ChartLineType>('curved');
    const dataProvider = useMemo(() => new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
    }), []);
    const handleLineTypeValueValueChanged = (event: JetElementCustomEvent<ChartLineType>) => {
        setLineTypeValue(event.detail.value);
    };
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };
    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value);
    };
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series}/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { styleDefaults: {
            markerDisplayed: "on",
            lineType: lineTypeValue
        } };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="areaChart">
                    <demo-radioset-enum labelHint="lineType" direction="row" onvalueChanged={handleLineTypeValueValueChanged} value={lineTypeValue} enumValues={["straight", "curved"]}/>
                </oj-form-layout>
            <oj-chart id="areaChart" type="area" orientation={orientationValue} stack={stackValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="areaChart">
                    <demo-chart-orientation-control id="orientationControl" type="area" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                    <demo-chart-stack-control id="stackControl" type="area" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
                </oj-toolbar>
        </div>);
};
export default AreaChartLineTypescorepack;
