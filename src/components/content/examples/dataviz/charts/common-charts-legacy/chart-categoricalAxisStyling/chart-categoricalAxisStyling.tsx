import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/hiringData.json';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import '../../../../../../jet-composites/demo-chart-stack-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface HiringDatum {
    id: string;
    company: string;
    year: string;
    value: number;
}
type ChartStack = ComponentProps<'oj-chart'>['stack'];
type ChartOrientation = ComponentProps<'oj-chart'>['orientation'];
type GroupLabelStyle = ComponentProps<'oj-chart-group'>['labelStyle'];
type ChartItemTemplateContext = {
    data: HiringDatum;
};
type ChartGroupTemplateContext = {
    ids: [
        string
    ];
};
const data = JSON.parse(dataText as string) as HiringDatum[];
export const ChartCategoricalAxisStyling = () => {
    const [stackValue, setStackValue] = useState<ChartStack>('off');
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const chartData = data;
    const yAxisConverter = useMemo(() => new IntlNumberConverter({
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }), []);
    const dataProvider = useMemo(() => new ArrayDataProvider<HiringDatum['id'], HiringDatum>(data, {
        keyAttributes: 'id'
    }), []);
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value ?? 'vertical');
    };
    const handleStackValueStackChanged = (event: JetElementCustomEvent<ChartStack>) => {
        setStackValue(event.detail.value ?? 'off');
    };
    const numberOfEmployees = (companyId: string) => {
        return chartData.reduce((acc: number, cur) => {
            return acc + (cur.company === companyId ? cur.value : 0);
        }, 0);
    };
    const getNumberOfEmployees = (companyId: string) => {
        return numberOfEmployees(companyId);
    };
    const getSvgStyle = (companyId: string): GroupLabelStyle => {
        const value = numberOfEmployees(companyId);
        let style: GroupLabelStyle;
        if (value > 150) {
            style = {
                fontSize: '14px',
                backgroundColor: '#d33815',
                borderRadius: '4px'
            };
        }
        else if (value > 100) {
            style = {
                fontSize: '14px',
                backgroundColor: '#409c5b',
                borderRadius: '4px'
            };
        }
        else {
            style = {
                fontSize: '14px',
                backgroundColor: '#E2E7EC',
                borderRadius: '4px'
            };
        }
        return style;
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = {
        xAxis: {
            title: "Company Name"
        },
        legend: {
            position: "top"
        },
        valueFormats: {
            series: {
                tooltipDisplay: "off"
            },
            group: {
                tooltipLabel: "Company"
            },
            y: {
                tooltipLabel: "Number of Hires",
                converter: yAxisConverter
            }
        }
    };
    const itemTemplateRenderer = (item: ChartItemTemplateContext) => {
        return (<oj-chart-item value={item.data.value} groupId={[item.data.company]} seriesId={item.data.year}/>);
    };
    const groupTemplateRenderer = (group: ChartGroupTemplateContext) => {
        return (<oj-chart-group shortDesc={group.ids[0] + " has hired " + getNumberOfEmployees(group.ids[0]) + " new employees."} labelStyle={getSvgStyle(group.ids[0])}/>);
    };
    return (<div id="chart-container">
            <h6 class="oj-sm-padding-4x-start">Employees Hired</h6>
            <oj-chart id="barChart" type="bar" data={dataProvider} orientation={orientationValue} stack={stackValue} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim" {...OjChartProps}>
                <template slot="itemTemplate" render={itemTemplateRenderer}/>
                <template slot="groupTemplate" render={groupTemplateRenderer}/>
            </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="barChart">
                <demo-chart-orientation-control id="orientationControl" type="bar" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                <span role="separator" aria-orientation="vertical" class="oj-toolbar-separator"/>
                <demo-chart-stack-control id="stackControl" type="bar" focusManagement="none" onstackChanged={handleStackValueStackChanged} stack={stackValue}/>
            </oj-toolbar>
        </div>);
};
export default ChartCategoricalAxisStyling;
