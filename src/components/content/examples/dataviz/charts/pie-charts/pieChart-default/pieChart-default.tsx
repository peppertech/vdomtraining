/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojchart';

type PieChartItem = {
    id: number;
    group: string;
    series: string;
    value: number;
};

const data = JSON.parse(dataText as string) as PieChartItem[];

export const PieChartDefault = () => {
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series} />;
    };

    return (
        <div id="chart-container">
            <oj-chart id="pieChart" type="pie" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim">
                <template slot="itemTemplate" render={itemTemplateRenderer} />
            </oj-chart>
        </div>
    );
};

export default PieChartDefault;
