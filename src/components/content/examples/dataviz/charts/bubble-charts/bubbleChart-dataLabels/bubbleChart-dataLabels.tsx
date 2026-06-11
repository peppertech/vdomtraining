import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-select-enum/loader';
import "css!./demo.css";
const data = JSON.parse(dataText as string);
type DataLabelPosition = NonNullable<NonNullable<ComponentProps<'oj-chart'>['styleDefaults']>['dataLabelPosition']>;
export const BubbleChartDataLabels = () => {
    const [labelPosition, setLabelPosition] = useState<DataLabelPosition>('auto');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleLabelPositionValueChanged = (event: JetElementCustomEvent<DataLabelPosition>) => {
        setLabelPosition(event.detail.value ?? 'auto');
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} label={item.data.group} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { styleDefaults: {
            dataLabelPosition: labelPosition
        } };
    return (<div id="chart-container">
            <oj-form-layout>
                    <demo-select-enum aria-controls="lineChart" onvalueChanged={handleLabelPositionValueChanged} value={labelPosition} labelHint="Label Position" enumValues={["auto","center","aboveMarker","belowMarker","beforeMarker","afterMarker"]}/>
                </oj-form-layout>
            <oj-chart id="bubbleChart" type="bubble" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" class="demo-bubblechart-datalabels-height" {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
        </div>);
};
export default BubbleChartDataLabels;
