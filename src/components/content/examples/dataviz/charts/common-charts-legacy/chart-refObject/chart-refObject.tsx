import "css!./demo.css";
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';
import 'ojs/ojlegend';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as testDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/testScoresData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface TestScoreDatum {
    id: string;
    series: string;
    group: string;
    value: number;
    low: number;
    high: number;
}
type HiddenCategories = NonNullable<ComponentProps<'oj-chart'>['hiddenCategories']>;
type HighlightedCategories = NonNullable<ComponentProps<'oj-chart'>['highlightedCategories']>;
type HiddenCategoriesChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onhiddenCategoriesChanged']>>[0];
type HighlightedCategoriesChangedEvent = Parameters<NonNullable<ComponentProps<'oj-chart'>['onhighlightedCategoriesChanged']>>[0];
type LegendTemplateContext = {
    data: {
        text: string;
        id: string;
    };
};
type ItemTemplateContext = {
    data: TestScoreDatum;
};
type RangeItem = {
    low: number;
    high: number;
};
const testData = JSON.parse(testDataText as string) as TestScoreDatum[];
export const ChartRefObject = () => {
    const [hiddenCategoriesValue, setHiddenCategoriesValue] = useState<HiddenCategories>([]);
    const [highlightedCategoriesValue, setHighlightedCategoriesValue] = useState<HighlightedCategories>([]);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const data = testData;
    const getRangeData = (rangeData: TestScoreDatum[], category: string) => {
        return rangeData.reduce<RangeItem[]>((acc, cur) => {
            if (cur.series === category) {
                return acc.concat([{ low: cur.low, high: cur.high }]);
            }
            return acc;
        }, []);
    };
    const chartDataProvider = useMemo(() => new ArrayDataProvider<TestScoreDatum['id'], TestScoreDatum>(data, {
        keyAttributes: 'id'
    }), [data]);
    const legendData = useMemo(() => [
        { text: 'Math Scores', id: 'math' },
        { text: 'English Scores', id: 'english' }
    ], []);
    const legendDataProvider = useMemo(() => new ArrayDataProvider<string, {
        text: string;
        id: string;
    }>(legendData, {
        keyAttributes: 'id'
    }), [legendData]);
    const yAxisData = useMemo<NonNullable<ComponentProps<'oj-chart'>['yAxis']>>(() => ({
        title: 'Test Score',
        referenceObjects: [
            {
                text: 'Math Range',
                type: 'area',
                items: getRangeData(data, 'Math Scores'),
                categories: ['Math Scores'],
                color: 'rgba(38, 125, 179,0.5)',
                displayInLegend: 'off',
                location: 'back'
            },
            {
                text: 'English Range',
                type: 'area',
                items: getRangeData(data, 'English Scores'),
                categories: ['English Scores'],
                color: 'rgba(104,193,130,0.5)',
                displayInLegend: 'off',
                location: 'back'
            }
        ]
    }), [data]);
    const handleHiddenCategoriesValueHiddenCategoriesChanged = (event: HiddenCategoriesChangedEvent) => {
        setHiddenCategoriesValue(event.detail.value ?? []);
    };
    const handleHighlightedCategoriesValueHighlightedCategoriesChanged = (event: HighlightedCategoriesChangedEvent) => {
        setHighlightedCategoriesValue(event.detail.value ?? []);
    };
    const itemTemplateRenderer = ($current: LegendTemplateContext) => {
        return <oj-legend-item shortDesc={'Filter: ' + $current.data.text} text={$current.data.text} color={colorHandler.getValue($current.data.text)} categories={[$current.data.text]}/>;
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        }, xAxis: {
            title: "Test Number"
        } };
    const itemTemplateRenderer2 = (item: ItemTemplateContext) => {
        return <oj-chart-item value={item.data.value} categories={[item.data.series]} color={colorHandler.getValue(item.data.series)} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    return (<div id="chart-container">
            <oj-legend id="legend1" class="demo-ref-object-legend" orientation="horizontal" data={legendDataProvider} halign="center" onhiddenCategoriesChanged={handleHiddenCategoriesValueHiddenCategoriesChanged} hiddenCategories={hiddenCategoriesValue} onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim" hideAndShowBehavior="on">
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-legend>
            <oj-chart id="lineChart" type="line" data={chartDataProvider} yAxis={yAxisData} animationOnDisplay="auto" animationOnDataChange="auto" onhiddenCategoriesChanged={handleHiddenCategoriesValueHiddenCategoriesChanged} hiddenCategories={hiddenCategoriesValue} onhighlightedCategoriesChanged={handleHighlightedCategoriesValueHighlightedCategoriesChanged} highlightedCategories={highlightedCategoriesValue} hoverBehavior="dim" {...OjChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer2}/>
                </oj-chart>
        </div>);
};
export default ChartRefObject;
