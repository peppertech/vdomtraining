import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as quarterDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/quarterData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type LabelPosition = 'auto' | 'center' | 'aboveMarker' | 'belowMarker' | 'beforeMarker' | 'afterMarker';
type QuarterDatum = {
    id: number;
    quarter: string;
    series: string;
    value: number;
};
const quarterData = JSON.parse(quarterDataText as string) as QuarterDatum[];
export const CombinationChartDataLabels = () => {
    const [stackValue, setStackValue] = useState<ChartStack>('off');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [labelPosition, setLabelPosition] = useState<LabelPosition>('auto');
    const dataProvider = useMemo(() => new ArrayDataProvider(quarterData, {
        keyAttributes: 'id'
    }), []);
    const handleLabelPositionValueChanged = (event: JetElementCustomEvent<LabelPosition>) => {
        setLabelPosition(event.detail.value);
    };
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };
    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value);
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.quarter]} seriesId={item.data.series} label={(Number(item.data.id) === 0 || Number(item.data.id) === 5 || Number(item.data.id) === 10 || Number(item.data.id) === 15) ? item.data.value.toString() : ''}/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { styleDefaults: {
            dataLabelPosition: labelPosition,
            dataLabelStyle: { fontSize: '12px' }
        } };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="comboChart">
                    <demo-select-enum labelHint="Label Position" id="comboId" onvalueChanged={handleLabelPositionValueChanged} value={labelPosition} enumValues={["auto","center","aboveMarker","belowMarker","beforeMarker","afterMarker"]}/>
                </oj-form-layout>
            <oj-chart id="comboChart" type="combo" selectionMode="multiple" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" orientation={orientationValue} stack={stackValue} {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="comboChart">
                    <demo-chart-orientation-control id="orientationControl" type="combo" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                    <demo-chart-stack-control id="stackControl" type="combo" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
                </oj-toolbar>
        </div>);
};
export default CombinationChartDataLabels;
