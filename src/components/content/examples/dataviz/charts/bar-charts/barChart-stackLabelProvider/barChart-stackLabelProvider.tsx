import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/barChart/stackLabelProvider/stackData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);
export const BarChartStackLabelProvider = () => {
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const currencyConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD'
    }), []);
    const decimalConverter = useMemo(() => new IntlNumberConverter({
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }), []);
    const labelProvider = (stackLabelContext: ojChart.StackLabelContext<string | Array<string>, Array<Record<string, string | number>>, null>) => {
        if (stackLabelContext.groups === 'Revenue') {
            return currencyConverter.format(stackLabelContext.value);
        }
        else {
            return decimalConverter.format(stackLabelContext.value);
        }
    };
    const dataItemLabel = (dataContext: ojChart.DataLabelContext<string, Record<string, string | number>, null>) => {
        if (dataContext.group === 'Revenue') {
            return currencyConverter.format(dataContext.value);
        }
        else {
            return decimalConverter.format(dataContext.value);
        }
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.description]} seriesId={item.data.company}/>;
    };
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = { yAxis: {
            tickLabel: {
                rendered: "off"
            }
        } };
    return (<div id="chart-container">
            <div class="oj-typography-heading-xs">Company Revenues and Sales Quantity</div>
            <oj-chart id="barChart" type="bar" data={dataProvider} animationOnDisplay="auto" stack="on" stackLabel="on" dataLabel={dataItemLabel} stackLabelProvider={labelProvider} {...ojChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
        </div>);
};
export default BarChartStackLabelProvider;
