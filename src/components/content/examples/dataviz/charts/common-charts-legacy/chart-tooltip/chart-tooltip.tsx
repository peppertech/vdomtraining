import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojgauge';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/departmentHiresData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);
export const ChartTooltip = () => {
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const yAxisData = useMemo<NonNullable<ComponentProps<'oj-chart'>['yAxis']>>(() => ({
        referenceObjects: [
            {
                id: 'ref',
                type: 'area',
                low: 25,
                high: 45,
                color: 'rgba(160,206,236,0.5)'
            }
        ]
    }), []);
    const referenceTooltip = document.createElement('div');
    const barTooltip = document.createElement('div');
    const tooltipFunction = (dataContext: ojChart.TooltipContext<string, Record<string, string | number>, null>) => {
        if (dataContext.id == 'ref') {
            // Reference area
            (dataContext.parentElement as HTMLElement).style.borderWidth = '';
            // Return the elem and the chart will append it to the parentElement
            return { insert: referenceTooltip };
        }
        else {
            // Set a thick border for the data item tooltip
            (dataContext.parentElement as HTMLElement).style.borderWidth = '4px';
            const itemData = dataContext.itemData;
            barTooltip.children[0].children[0].textContent = dataContext.series;
            barTooltip.children[0].children[2].textContent = `Supervisor: ${itemData.supervisor}`;
            barTooltip.children[0].children[4].textContent = dataContext.group as string;
            barTooltip.children[1].setAttribute('max', String(itemData.totalDeptHires));
            barTooltip.children[1].setAttribute('value', String(dataContext.value));
            barTooltip.children[1].setAttribute('color', dataContext.color);
            // Return the elem and the chart will append it to the parentElement
            return { insert: barTooltip };
        }
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { tooltip: {
            renderer: tooltipFunction
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item groupId={[item.data.season]} seriesId={item.data.department} value={item.data.value}/>;
    };
    return (<div id="chart-container">
            <h6>New Hires Per Department</h6>
            <oj-chart id="barChart" type="bar" data={dataProvider} yAxis={yAxisData} {...OjChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
        </div>);
};
export default ChartTooltip;
