/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import 'ojs/ojinputtext';
import 'ojs/ojinputnumber';
import 'ojs/ojchart';
import 'ojs/ojformlayout';
type PropertyChangedEvent<T> = CustomEvent<{
    value: T;
}>;

const data = JSON.parse(dataText as string);
const centerLabelStyle = { fontSize: '20px', color: '#999999' };

export const PieChartDonut = () => {
    const [innerRadius, setInnerRadius] = useState<any>(0.5);
    const [centerLabel, setCenterLabel] = useState<any>('Center Label');
    const [chartData] = useState<any[]>(data);
    const dataProvider = useMemo(() => new ArrayDataProvider(chartData, {
        keyAttributes: 'id'
    }), [chartData]);
    const styleDefaults = useMemo<NonNullable<ComponentProps<'oj-chart'>['styleDefaults']>>(
        () => ({
            pieInnerRadius: Number.isFinite(Number(innerRadius)) ? Number(innerRadius) : 0
        }),
        [innerRadius]
    );
    const pieCenter = useMemo<NonNullable<ComponentProps<'oj-chart'>['pieCenter']>>(
        () => ({
            label: centerLabel,
            labelStyle: centerLabelStyle
        }),
        [centerLabel]
    );
    const handleInnerRadiusValueChanged = (event: PropertyChangedEvent<any>) => {
        setInnerRadius(event.detail.value);
    };
    const handleCenterLabelValueChanged = (event: PropertyChangedEvent<any>) => {
        setCenterLabel(event.detail.value);
    };
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };

    return (<div id="chart-container">
            <oj-form-layout aria-controls="pieChart">
                    <oj-input-number onvalueChanged={handleInnerRadiusValueChanged} value={innerRadius} min={0} max={1} step={0.1} labelHint="innerRadius"/>
                    <oj-input-text labelHint="label" onvalueChanged={handleCenterLabelValueChanged} value={centerLabel}/>
                </oj-form-layout>
            <oj-chart id="pieChart" type="pie" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" hoverBehavior="dim" styleDefaults={styleDefaults} pieCenter={pieCenter}>
                    <template slot="itemTemplate" render={itemTemplateRenderer}/>
                </oj-chart>
        </div>);
};
export default PieChartDonut;
