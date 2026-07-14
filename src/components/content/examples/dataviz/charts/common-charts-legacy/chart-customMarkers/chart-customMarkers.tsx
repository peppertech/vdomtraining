import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/transportationData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);
export const ChartCustomMarkers = () => {
    const car = 'M -53.582954,-415.35856 c -13.726061,-0.48561 -25.554278,3.95581 -32.848561,19.90697 l -26.336555,65.94442 c -19.18907,5.29042 -27.54259,19.22853 -27.98516,30.66415 l 0,86.34597 25.30617,0 0,29.05676 c -1.22633,27.69243 44.157018,28.76272 45.171926,-0.28851 l 0.535799,-28.52096 164.160378,0 0.535798,28.52096 c 1.014898,29.05121 46.439469,27.98094 45.213139,0.28851 l 0,-29.05676 25.26495,0 0,-86.34597 c -0.44257,-11.43562 -8.79607,-25.37375 -27.98516,-30.66415 l -26.33655,-65.94442 c -7.29428,-15.95113 -19.122506,-20.39255 -32.848559,-19.90697 l -131.847615,0 z';
    const bike = 'M625.001 150l-25 50 100 37.5l0 112.5l-350 0l0 -50l50 0l0 -24.998c0 -12.305 -12.696 -25 -25 -25l-125 -.001c-25 0 -25 25 -25 25l0 25l75 0l0 50l-53.125 106.25c-14.984 -3.6 -30.792 -6.25 -46.876 -6.25 -110.458 0 -200 89.545 -200 200s89.543 200 200 200 200 -89.545 200 -200c0 0 50 .001 75 .001s25 -25.001 25 -25.001c5.136 -73.53 43.018 -131.201 92.188 -168.751 33.996 -25.96 70.637 -41.98 107.813 -49.999l0 51.563c-86.215 22.23 -150 99.028 -150 192.188 0 110.455 89.543 200 200 200s200 -89.545 200 -200c0 -91.415 -61.554 -166.76 -145.313 -190.626l-54.688 -109.375l0 -125c0 -14.495 -11.626 -30.618 -25 -35.938zm-275 250.001l225 0c-50 25.001 -125 150.001 -125 200.002l-57.812 -.001c-12.642 -49.02 -41.498 -90.298 -82.812 -117.187zm-150 125c69.036 0 125 55.964 125 125s-55.964 125 -125 125 -125 -55.964 -125 -125 55.964 -125 125 -125zm550 0c69.036 0 125 55.964 125 125s-55.964 125 -125 125 -125 -55.964 -125 -125 55.964 -125 125 -125z';
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const legend = useMemo<ojChart.Legend>(() => ({
        position: 'end',
        sections: [
            {
                title: 'Mode of transportation',
                items: [
                    { text: 'Vehicles', id: 'Vehicles', markerShape: car },
                    { text: 'Bikes', id: 'Bikes', markerShape: bike }
                ]
            }
        ]
    }), [car, bike]);
    const getMarkerShape = (type: string) => {
        return type === 'Vehicles' ? car : bike;
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { valueFormats: {
            series: {
                tooltipLabel: "Country"
            },
            group: {
                tooltipLabel: "Transportation"
            },
            x: {
                tooltipLabel: "Price of Gasoline"
            },
            y: {
                tooltipLabel: "Distance traveled"
            }
        }, xAxis: {
            title: "Price of Gasoline Per Liter"
        }, yAxis: {
            title: "Distance Traveled (km)"
        }, styleDefaults: {
            markerSize: 25,
            markerShape: "square"
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item groupId={[item.data.type]} seriesId={item.data.country} x={item.data.gasPricePerLiter} y={item.data.distanceTraveled} categories={[item.data.country, item.data.type]} markerShape={getMarkerShape(item.data.type)}/>;
    };
    return (<div id="chart-container">
            <h6>Distance Traveled Using Mode Of Transportation Per Capita</h6>
            <oj-chart id="Chart" type="scatter" data={dataProvider} selectionMode="multiple" hoverBehavior="dim" hideAndShowBehavior="withRescale" zoomAndScroll="live" legend={legend} {...OjChartProps}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
        </div>);
};
export default ChartCustomMarkers;
