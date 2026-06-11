import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as chartDataJsonText from 'text!../data/cookbook/dataVisualizations/chart/resources/drinksData.json';
import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojformlayout';
import 'ojs/ojchart';
import 'ojs/ojcheckboxset';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import 'ojs/ojoption';
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type CheckboxValue = NonNullable<ComponentProps<'oj-checkboxset'>['value']>;
type DataSetValue = '2017' | '2018';
type DrinkDatum = {
    id: number;
    drink: string;
    value: number;
    year: string;
};
type DrinkDataByYear = Record<DataSetValue, DrinkDatum[]>;
type LegendSection = {
    items: Array<{
        value: number;
        text: string;
        color: string;
    }>;
};
type ChartItemContext = {
    data: DrinkDatum;
};
const chartDataJson = JSON.parse(chartDataJsonText as string) as DrinkDataByYear;

const getLegendData = (data: DrinkDatum[], colorHandler: ColorAttributeGroupHandler): LegendSection[] => {
    const items: LegendSection['items'] = [];
    for (let i = 0; i < data.length; i++) {
        items.push({
            value: data[i].value,
            text: data[i].drink,
            color: colorHandler.getValue(data[i].drink as string)
        });
    }
    return [{ items }];
};

export const BarChartAttrGroups = () => {
    const data = useMemo<DrinkDataByYear>(() => chartDataJson, []);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const xAxisRenderedValue = 'off';
    const [dataSet, setDataSet] = useState<DataSetValue>('2017');
    const [resetColors, setResetColors] = useState<CheckboxValue>([]);
    const chartData = data[dataSet];
    const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
        keyAttributes: 'id'
    }), [chartData]);
    const legendSectionsValue = useMemo(() => getLegendData(chartData, colorHandler), [chartData, colorHandler]);
    const handleDataSetValueChanged = (event: JetElementCustomEvent<DataSetValue>) => {
        setDataSet(event.detail.value);
    };
    const handleResetColorsValueChanged = (event: JetElementCustomEvent<ComponentProps<'oj-checkboxset'>['value']>) => {
        setResetColors(event.detail.value ?? []);
    };
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value);
    };
    const itemTemplateRenderer = (item: ChartItemContext) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.drink]} seriesId={item.data.year} color={colorHandler.getValue(item.data.drink)}/>;
    };
    const seriesTemplateRenderer = ($current: DatavizSeriesTemplateContext) => {
        return <oj-chart-series displayInLegend="off"/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { yAxis: {
            title: "Quantity"
        }, xAxis: {
            rendered: xAxisRenderedValue
        }, valueFormats: {
            group: {
                tooltipLabel: "Product"
            },
            value: {
                tooltipLabel: "Quantity"
            },
            series: {
                tooltipLabel: "Year"
            }
        }, legend: {
            sections: legendSectionsValue
        } };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="barChart" maxColumns={2}>
                    <demo-radioset-enum direction="row" onvalueChanged={handleDataSetValueChanged} value={dataSet} labelHint="Year" enumValues={["2018", "2017"]}/>
                    <oj-checkboxset id="checkboxSet" labelledBy="resetButton" labelHint="Reset colors between data change" onvalueChanged={handleResetColorsValueChanged} value={resetColors}><oj-option id="reset" value="reset">Reset</oj-option></oj-checkboxset>
                </oj-form-layout>
            <oj-chart id="barChart" type="bar" orientation={orientationValue} data={dataProvider} animationOnDisplay="auto" {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                    <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                </oj-chart>
            <demo-chart-orientation-control id="orientationControl" type="bar" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue} aria-controls="barChart"/>
        </div>);
};
export default BarChartAttrGroups;
