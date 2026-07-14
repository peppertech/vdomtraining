import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/stockData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import Converter = require('ojs/ojconverter');
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface StockDatum {
    id: string;
    stock: string;
    series: string;
    value: number;
    size: number;
}
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type ItemTemplateContext = {
    data: StockDatum;
    index: number;
};
const data = JSON.parse(dataText as string) as StockDatum[];
export const BarChartVariableBarWidth = () => {
    const [stackValue] = useState<ChartStack>('off');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const dataProvider = useMemo(() => new ArrayDataProvider<StockDatum['id'], StockDatum>(data, {
        keyAttributes: 'id'
    }), []);
    const currencyConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD'
    }), []);
    const percentConverter = useMemo<Converter<number>>(() => ({
        format(value: number) {
            return `${value}%`;
        },
        parse(value: string) {
            return Number(value.replace('%', ''));
        }
    }), []);
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value ?? 'vertical');
    };
    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item y={item.data.value} z={item.data.size} label={(item.data.value > 0 ? "+" : "") + item.data.value + "%"} groupId={[item.data.stock]} seriesId={item.data.series} color={colorHandler.getValue(String(item.index))}/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { legend: {
            rendered: "off"
        }, yAxis: {
            title: "% Change"
        }, styleDefaults: {
            barGapRatio: 0.25
        }, valueFormats: {
            series: {
                tooltipDisplay: "off"
            },
            group: {
                tooltipLabel: "Symbol"
            },
            y: {
                converter: percentConverter,
                tooltipLabel: "Change"
            },
            z: {
                converter: currencyConverter,
                scaling: "none",
                tooltipLabel: "Value"
            }
        } };
    return (<div id="chart-container">
            <oj-chart id="barChart" type="bar" orientation={orientationValue} stack={stackValue} data={dataProvider} animationOnDataChange="auto" animationOnDisplay="auto" {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
            <oj-toolbar aria-controls="barChart">
                    <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                </oj-toolbar>
        </div>);
};
export default BarChartVariableBarWidth;
