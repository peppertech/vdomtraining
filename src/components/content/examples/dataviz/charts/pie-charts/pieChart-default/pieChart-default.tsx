import 'ojs/ojchart';
import 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

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
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
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
