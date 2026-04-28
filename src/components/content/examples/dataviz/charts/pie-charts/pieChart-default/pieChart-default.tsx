/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as data from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojchart';

export const PieChartDefault = () => {
    const dataProvider = useMemo(() => new ArrayDataProvider(JSON.parse(data), {
        keyAttributes: 'id'
    }), []);

    return (
        <div id="chart-container">
            <oj-chart id="pieChart" type="pie" data={dataProvider} animation-on-display="auto" animation-on-data-change="auto" hover-behavior="dim">
                <template slot="itemTemplate" render={(item) => (
                    <>
                        <oj-chart-item value={item.data.value} group-id={[item.data.group]} series-id={item.data.series} />
                    </>
                )} />
            </oj-chart>
        </div>
    );
};

export default PieChartDefault;
