import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojchart';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/boxPlotWithMeanData.json';
import '../../../../../../jet-composites/demo-chart-orientation-control/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const data = JSON.parse(dataText as string);
type ChartOrientation = NonNullable<ComponentProps<'oj-chart'>['orientation']>;
export const BoxPlotMeans = () => {
    const [orientationValue, setOrientationValue] = useState<ChartOrientation>('vertical');
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleOrientationValueOrientationChanged = (event: JetElementCustomEvent<ChartOrientation>) => {
        setOrientationValue(event.detail.value ?? 'vertical');
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item low={item.data.low} high={item.data.high} q1={item.data.q1} q2={item.data.q2} q3={item.data.q3} items={item.data.outliers} value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const seriesTemplateRenderer = (series: DatavizSeriesTemplateContext) => {
        const ojChartSeriesProps: Partial<ComponentProps<'oj-chart-series'>> = { boxPlot: {
                q2Color: series.id === 'Box Plot' ? colorHandler.getValue('q2') : undefined,
                q3Color: series.id === 'Box Plot' ? colorHandler.getValue('q3') : undefined
            } };
        return <oj-chart-series type={series.id === 'Mean' ? 'line' : undefined} markerColor={series.id === 'Box Plot' ? '#9E9E9E' : undefined} color={series.id === 'Mean' ? colorHandler.getValue('mean') : colorHandler.getValue('box')} markerDisplayed={series.id === 'Mean' ? 'on' : undefined} markerShape={series.id === 'Mean' ? 'circle' : 'auto'} markerSize={series.id === 'Mean' ? 11 : undefined} {...ojChartSeriesProps}/>;
    };
    return (<div id="chart-container">
            <oj-chart id="boxPlot" type="boxPlot" orientation={orientationValue} data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hideAndShowBehavior="withRescale">
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                    <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                </oj-chart>
            <oj-toolbar id="myToolbar" aria-label="Chart Display Options Toolbar" aria-controls="boxPlot">
                    <demo-chart-orientation-control id="orientationControl" type="boxPlot" focusManagement="none" onorientationChanged={handleOrientationValueOrientationChanged} orientation={orientationValue}/>
                </oj-toolbar>
        </div>);
};
export default BoxPlotMeans;
