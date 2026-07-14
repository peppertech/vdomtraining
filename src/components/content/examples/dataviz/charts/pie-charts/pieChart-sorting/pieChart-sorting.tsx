import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemTwelveSeriesData.json';
import '../../../../../../jet-composites/demo-select-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartProps = ComponentProps<'oj-chart'>;
type Sorting = NonNullable<ChartProps['sorting']>;
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
type InputTextValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];
const chartData = JSON.parse(dataText as string);
export const PieChartSorting = () => {
    const [sortingValue, setSortingValue] = useState<Sorting>('descending');
    const [otherThresholdValue, setOtherThresholdValue] = useState(0.03);
    const [otherColorValue, setOtherColorValue] = useState('#4b4b4b');
    const dataProvider = useMemo(() => new ArrayDataProvider(chartData, { keyAttributes: 'id' }), []);
    const handleSortingValueChanged = (event: CustomEvent<{ value?: Sorting }>) => {
        setSortingValue(event.detail.value ?? 'descending');
    };
    const handleOtherThresholdValueChanged = (event: InputNumberValueChangedEvent) => {
        setOtherThresholdValue(event.detail.value ?? 0.03);
    };
    const handleOtherColorValueChanged = (event: InputTextValueChangedEvent) => {
        setOtherColorValue(event.detail.value ?? '#4b4b4b');
    };
    const renderItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>);
    return (<div id="chart-container">
      <oj-form-layout aria-controls="pieChart">
        <demo-select-enum onvalueChanged={handleSortingValueChanged} value={sortingValue} labelHint="Sorting" enumValues={["ascending","descending","off"]}/>
        <oj-input-number labelHint="other threshold" max={1} min={0} step={0.01} onvalueChanged={handleOtherThresholdValueChanged} value={otherThresholdValue}/>
        <oj-input-text labelHint="other color" onvalueChanged={handleOtherColorValueChanged} value={otherColorValue}/>
      </oj-form-layout>
      <oj-chart id="pieChart" type="pie" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" sorting={sortingValue} otherThreshold={otherThresholdValue} styleDefaults={{ otherColor: otherColorValue }}>
        <template slot="itemTemplate" render={renderItem}/>
      </oj-chart>
    </div>);
};
export default PieChartSorting;
