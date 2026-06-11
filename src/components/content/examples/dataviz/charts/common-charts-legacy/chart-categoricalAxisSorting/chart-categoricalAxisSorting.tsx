import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/hiringData.json';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type SortingValue = NonNullable<ComponentProps<'oj-chart'>['sorting']>;
type HiringDatum = {
    id: number;
    company: string;
    year: string;
    value: number;
};
const data = JSON.parse(dataText as string) as HiringDatum[];
export const ChartCategoricalAxisSorting = () => {
    const [stackValue, setStackValue] = useState<ChartStack>('on');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const [sortingValue, setSortingValue] = useState<SortingValue>('descending');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleSortingValueValueChanged = (event: JetElementCustomEvent<SortingValue>) => {
        setSortingValue(event.detail.value);
    };
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };
    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value);
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { valueFormats: {
            series: {
                tooltipLabel: "Region"
            },
            group: {
                tooltipLabel: "Product"
            },
            value: {
                tooltipLabel: "Revenue"
            }
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.company]} seriesId={item.data.year}/>;
    };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="barChart">
                    <demo-radioset-enum onvalueChanged={handleSortingValueValueChanged} value={sortingValue} labelHint="Sorting" direction="row" enumValues={["off", "ascending", "descending"]}/>
                </oj-form-layout>
            <oj-chart id="barChart" type="bar" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" orientation={orientationValue} sorting={sortingValue} stack={stackValue} {...OjChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
                    <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                    <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                    <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
                </oj-toolbar>
        </div>);
};
export default ChartCategoricalAxisSorting;
