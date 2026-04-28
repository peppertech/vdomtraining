// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemTwelveSeriesData.json';
import 'ojs/ojinputtext';
import 'ojs/ojchart';
import 'ojs/ojinputnumber';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-select-enum/loader';
type PropertyChangedEvent<T> = CustomEvent<{
    value: T;
}>;
const chartData = JSON.parse(dataText as string);
export const PieChartSorting = () => {
    const [sortingValue, setSortingValue] = useState('descending');
    const [otherThresholdValue, setOtherThresholdValue] = useState(0.03);
    const [otherColorValue, setOtherColorValue] = useState('#4b4b4b');
    const dataProvider = useMemo(() => new ArrayDataProvider(chartData, { keyAttributes: 'id' }), []);
    const handleSortingValueChanged = (event: PropertyChangedEvent<string>) => {
        setSortingValue(event.detail.value);
    };
    const handleOtherThresholdValueChanged = (event: PropertyChangedEvent<number>) => {
        setOtherThresholdValue(event.detail.value);
    };
    const handleOtherColorValueChanged = (event: PropertyChangedEvent<string>) => {
        setOtherColorValue(event.detail.value);
    };
    const renderItem = (item: any) => (<oj-chart-item value={item.data.value} group-id={[item.data.group]} series-id={item.data.series}/>);
    return (<div id="chart-container">
      <oj-form-layout aria-controls="pieChart">
        <demo-select-enum onvalueChanged={handleSortingValueChanged} value={sortingValue} labelHint="Sorting" enumValues={["ascending","descending","off"]}/>
        <oj-input-number labelHint="other threshold" max={1} min={0} step={0.01} onvalueChanged={handleOtherThresholdValueChanged} value={otherThresholdValue}/>
        <oj-input-text labelHint="other color" onvalueChanged={handleOtherColorValueChanged} value={otherColorValue}/>
      </oj-form-layout>
      <oj-chart id="pieChart" type="pie" data={dataProvider} animation-on-display="auto" animation-on-data-change="auto" sorting={sortingValue} other-threshold={otherThresholdValue} {...{ 'style-defaults.other-color': otherColorValue }}>
        <template slot="itemTemplate" render={renderItem}/>
      </oj-chart>
    </div>);
};
export default PieChartSorting;
