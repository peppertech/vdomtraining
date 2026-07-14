import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import { getLabelFormatInfo } from 'ojs/ojchart-utils';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojformlayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as chartDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/regionGDP.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type FormatValue = 'decimal' | 'currency';
type PercentFormatValue = 'default' | 'percent';
type GDPDatum = {
    id: number;
    country: string;
    gdp: number;
};
type GDPData = {
    gdp: GDPDatum[];
    percent: GDPDatum[];
};
const chartData = JSON.parse(chartDataText as string) as GDPData;
export const ChartNumberFormat = () => {
    const [format, setFormat] = useState<FormatValue>('decimal');
    const [percentFormat, setPercentFormat] = useState<PercentFormatValue>('percent');
    const percentAxisScale: 'log' | 'linear' = 'log';
    const totalGDP2012 = 71874027000000;
    const data = chartData;
    const decimalConverter = useMemo(() => new IntlNumberConverter({
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }), []);
    const currencyConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD'
    }), []);
    const _getFormattingOptions = (chartSeriesData: Array<{
        gdp: number;
    }>, scale: 'log' | 'linear') => {
        const max = chartSeriesData.reduce((acc: number, cur: {
            gdp: number;
        }) => Math.max(acc, cur.gdp), 0);
        const min = chartSeriesData.reduce((acc: number, cur: {
            gdp: number;
        }) => Math.min(acc, cur.gdp), Infinity);
        return getLabelFormatInfo({
            scale,
            range: { min, max },
            rangeType: 'data'
        });
    };
    const percentData = data.percent.map((el: GDPDatum): GDPDatum => {
        const pData = { ...el };
        pData.gdp = pData.gdp / totalGDP2012;
        return pData;
    });
    const dataProvider = useMemo(() => new ArrayDataProvider(data.gdp, {
        keyAttributes: 'id'
    }), [data]);
    const percentDataProvider = useMemo(() => new ArrayDataProvider(percentData, {
        keyAttributes: 'id'
    }), [percentData]);
    const logPercentFormat = _getFormattingOptions(percentData, percentAxisScale);
    const percentConverter = useMemo(() => new IntlNumberConverter({
        style: 'percent',
        minimumFractionDigits: Math.max(0, logPercentFormat.minimumFractionDigits - 2),
        maximumFractionDigits: Math.max(0, logPercentFormat.maximumFractionDigits - 2)
    }), [logPercentFormat]);
    const yAxisConverter = format === 'currency' ? currencyConverter : decimalConverter;
    const y2AxisConverter = percentFormat === 'percent' ? percentConverter : decimalConverter;
    const handleFormatValueChanged = (event: JetElementCustomEvent<FormatValue>) => {
        setFormat(event.detail.value);
    };
    const handlePercentFormatValueChanged = (event: JetElementCustomEvent<PercentFormatValue>) => {
        setPercentFormat(event.detail.value);
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { yAxis: {
            title: "GDP in USD",
            tickLabel: {
                converter: yAxisConverter
            }
        }, valueFormats: {
            y: {
                converter: yAxisConverter
            }
        }, legend: {
            rendered: "off"
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.gdp} groupId={[item.data.country]} seriesId="GDP"/>;
    };
    const OjChartProps2: Partial<ComponentProps<'oj-chart'>> = { yAxis: {
            scale: "log",
            title: "Fraction of global GDP",
            tickLabel: {
                converter: y2AxisConverter
            }
        }, legend: {
            rendered: "off"
        }, valueFormats: {
            y: {
                converter: y2AxisConverter
            }
        } };
    const itemTemplateRenderer2 = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.gdp} groupId={[item.data.country]} seriesId="GDP"/>;
    };
    return (<div id="chart-container">
            <div class="oj-flex">
                    <div class="oj-flex-item oj-sm-12 oj-md-6">
                              <oj-form-layout aria-controls="dataChart">
                                          <demo-radioset-enum labelHint="Number Format" onvalueChanged={handleFormatValueChanged} value={format} direction="row" enumValues={["decimal", "currency"]}/>
                                      </oj-form-layout>
                              <oj-chart id="dataChart" type="bar" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" {...OjChartProps}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer}/>
                                      </oj-chart>
                          </div>
                    <div class="oj-flex-item oj-sm-12 oj-md-6">
                              <oj-form-layout aria-controls="percentChart">
                                          <demo-radioset-enum labelHint="Percent Format" onvalueChanged={handlePercentFormatValueChanged} value={percentFormat} direction="row" enumValues={["default", "percent"]}/>
                                      </oj-form-layout>
                              <oj-chart id="percentChart" type="bar" data={percentDataProvider} animationOnDisplay="auto" animationOnDataChange="auto" {...OjChartProps2}>
                                          <template slot="itemTemplate" render={itemTemplateRenderer2}/>
                                      </oj-chart>
                          </div>
                </div>
        </div>);
};
export default ChartNumberFormat;
