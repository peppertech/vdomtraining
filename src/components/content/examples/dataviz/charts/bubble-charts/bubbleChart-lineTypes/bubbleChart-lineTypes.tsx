import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/oneSeriesData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojformlayout';
const data = JSON.parse(dataText as string);
type ChartLineType = NonNullable<NonNullable<ComponentProps<'oj-chart'>['styleDefaults']>['lineType']>;
export const BubbleChartLineTypes = () => {
    const [lineTypeValue, setLineTypeValue] = useState<ChartLineType>('curved');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleLineTypeValueValueChanged = (event: JetElementCustomEvent<ChartLineType>) => {
        setLineTypeValue(event.detail.value ?? 'curved');
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { styleDefaults: {
            lineType: lineTypeValue,
            markerDisplayed: "on"
        }, legend: {
            rendered: "off"
        } };
    return (<div id="chart-container">
            <oj-form-layout>
                    <demo-radioset-enum aria-controls="bubbleChart" onvalueChanged={handleLineTypeValueValueChanged} value={lineTypeValue} enumValues={["straight","curved","stepped","segmented","none"]} direction="row" labelHint="Line Type"/>
                </oj-form-layout>
            <oj-chart id="bubbleChart" type="bubble" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
        </div>);
};
export default BubbleChartLineTypes;
