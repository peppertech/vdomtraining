/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as data from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojinputtext';
import 'ojs/ojinputnumber';
import 'ojs/ojchart';
import '../../../../../../jet-composites/demo-input-json/loader';
import 'ojs/ojformlayout';
type PropertyChangedEvent<T> = CustomEvent<{
    value: T;
}>;
export const PieChartDonut = () => {
    const [innerRadius, setInnerRadius] = useState<any>(0.5);
    const [centerLabel, setCenterLabel] = useState<any>('Center Label');
    const [labelStyle, setLabelStyle] = useState<any>({ fontSize: '20px', color: '#999999' });
    const [chartData, setChartData] = useState<any[]>(JSON.parse(data));
    const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
        keyAttributes: 'id'
    }), [chartData]);
    const handleInnerRadiusValueChanged = (event: PropertyChangedEvent<any>) => {
        setInnerRadius(event.detail.value);
    };
    const handleCenterLabelValueChanged = (event: PropertyChangedEvent<any>) => {
        setCenterLabel(event.detail.value);
    };
    const handleLabelStyleValueChanged = (event: PropertyChangedEvent<any>) => {
        setLabelStyle(event.detail.value);
    };
    return (<div id="chart-container">
            <oj-form-layout aria-controls="pieChart">
                    <oj-input-number onvalueChanged={handleInnerRadiusValueChanged} value={innerRadius} min={0} max={1} step={0.1} labelHint="innerRadius"/>
                    <oj-input-text labelHint="label" onvalueChanged={handleCenterLabelValueChanged} value={centerLabel}/>
                    <demo-input-json labelHint="labelStyle" onvalueChanged={handleLabelStyleValueChanged} value={labelStyle}/>
                </oj-form-layout>
            <oj-chart id="pieChart" type="pie" data={dataProvider} animation-on-data-change="auto" {...{ 'style-defaults.pie-inner-radius': innerRadius, 'pie-center.label': centerLabel, 'pie-center.label-style': labelStyle }}>
                    <template slot="itemTemplate" render={(item) => (<>
                                <oj-chart-item value={item.data.value} group-id={[item.data.group]} series-id={item.data.series}/>
                            </>)}/>
                </oj-chart>
        </div>);
};
export default PieChartDonut;
