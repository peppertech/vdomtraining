import 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/singleItemData.json';
import '../../../../../../jet-composites/demo-input-json/loader';
import '../../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../../jet-composites/demo-tabs/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartProps = ComponentProps<'oj-chart'>;
type Pattern = NonNullable<ComponentProps<'oj-chart-series'>['pattern']>;
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
type InputTextValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];
type DemoValueChangedEvent<T> = CustomEvent<{ value: T }>;
const chartData = JSON.parse(dataText as string);
const tabHeaders = [
    { id: 'pieStyles', label: 'Pie Styles' },
    { id: 'seriesStyles', label: 'Series Styles' }
];
export const PieChartStyles = () => {
    const [selectedTab, setSelectedTab] = useState('pieStyles');
    const [color1, setColor1] = useState('#267DB3');
    const [borderColor1, setBorderColor1] = useState('#0F3248');
    const [borderWidth1, setBorderWidth1] = useState(2);
    const [pattern1, setPattern1] = useState<Pattern>('smallChecker');
    const [explode, setExplode] = useState(0.5);
    const [innerRadius, setInnerRadius] = useState(0);
    const [dataItemGaps, setDataItemGaps] = useState('50%');
    const [centerLabel, setCenterLabel] = useState('Center Label');
    const [centerLabelStyle, setCenterLabelStyle] = useState({
        fontSize: '20px',
        color: '#999999'
    });
    const pieCenter = useMemo(() => ({
        labelStyle: centerLabelStyle,
        label: centerLabel
    }), [centerLabel, centerLabelStyle]);
    const styleDefaults = useMemo(() => ({
        dataItemGaps,
        pieInnerRadius: innerRadius
    }), [dataItemGaps, innerRadius]);
    const dataProvider = useMemo(() => new ArrayDataProvider(chartData, { keyAttributes: 'id' }), []);
    const handleSelectedTabValueChanged = (event: DemoValueChangedEvent<string>) => {
        setSelectedTab(event.detail.value);
    };
    const handleDataItemGapsValueChanged = (event: InputTextValueChangedEvent) => {
        setDataItemGaps(event.detail.value ?? '50%');
    };
    const handleInnerRadiusValueChanged = (event: InputNumberValueChangedEvent) => {
        setInnerRadius(event.detail.value ?? 0);
    };
    const handleCenterLabelValueChanged = (event: InputTextValueChangedEvent) => {
        setCenterLabel(event.detail.value ?? '');
    };
    const handleCenterLabelStyleValueChanged = (event: DemoValueChangedEvent<Record<string, string>>) => {
        setCenterLabelStyle(event.detail.value as { fontSize: string; color: string });
    };
    const handleColor1ValueChanged = (event: InputTextValueChangedEvent) => {
        setColor1(event.detail.value ?? '');
    };
    const handleBorderColor1ValueChanged = (event: InputTextValueChangedEvent) => {
        setBorderColor1(event.detail.value ?? '');
    };
    const handleBorderWidth1ValueChanged = (event: InputNumberValueChangedEvent) => {
        setBorderWidth1(event.detail.value ?? 0);
    };
    const handlePattern1ValueChanged = (event: CustomEvent<{ value?: Pattern }>) => {
        setPattern1(event.detail.value ?? 'smallChecker');
    };
    const handleExplodeValueChanged = (event: InputNumberValueChangedEvent) => {
        setExplode(event.detail.value ?? 0);
    };
    const renderItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>);
    const renderSeries = (series: DatavizSeriesTemplateContext) => (<oj-chart-series color={series.id === 'Series 1' ? color1 : undefined} borderColor={series.id === 'Series 1' ? borderColor1 : undefined} borderWidth={series.id === 'Series 1' ? borderWidth1 : undefined} pattern={series.id === 'Series 1' ? pattern1 : undefined} pieSliceExplode={series.id === 'Series 1' ? explode : undefined}/>);
    return (<div id="chart-container" class="oj-flex oj-sm-padding-1x oj-sm-flex-items-1">
      <div class="oj-flex-item">
        <oj-chart id="pieChart" type="pie" data={dataProvider} animationOnDataChange="auto" pieCenter={pieCenter} styleDefaults={styleDefaults} legend={{ position: 'bottom' }}>
          <template slot="itemTemplate" render={renderItem}/>
          <template slot="seriesTemplate" render={renderSeries}/>
        </oj-chart>
      </div>
      <demo-tabs class="oj-flex-item" headers={tabHeaders} onvalueChanged={handleSelectedTabValueChanged} value={selectedTab}>
        <div class="oj-sm-padding-1x">
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Pie Style Attributes</div>
          <oj-form-layout aria-controls="pieChart" maxColumns={2}>
            <oj-input-text id="gaps" onvalueChanged={handleDataItemGapsValueChanged} value={dataItemGaps} labelHint="slice gaps"/>
            <oj-input-number id="innerRadius" onvalueChanged={handleInnerRadiusValueChanged} value={innerRadius} min={0} max={1} step={0.1} labelHint="innerRadius" aria-controls="pieChart"/>
          </oj-form-layout>
          <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Center Label Attributes</div>
          <oj-form-layout aria-controls="pieChart" maxColumns={2}>
            <oj-input-text id="centerLabel" aria-controls="pieChart" onvalueChanged={handleCenterLabelValueChanged} value={centerLabel} labelHint="text"/>
            <demo-input-json id="centerLabelStyle" onvalueChanged={handleCenterLabelStyleValueChanged} value={centerLabelStyle} labelHint="centerLabelStyle"/>
          </oj-form-layout>
        </div>
        <div>
          <h3>Series Attributes - Series 1</h3>
          <oj-form-layout aria-controls="pieChart" maxColumns={2}>
            <oj-input-text id="color" onvalueChanged={handleColor1ValueChanged} value={color1} labelHint="color"/>
            <oj-input-text id="borderColor1" onvalueChanged={handleBorderColor1ValueChanged} value={borderColor1} labelHint="border color"/>
            <oj-input-number id="borderWidth1" onvalueChanged={handleBorderWidth1ValueChanged} value={borderWidth1} min={0} max={10} step={1} labelHint="border width"/>
            <demo-select-enum onvalueChanged={handlePattern1ValueChanged} value={pattern1} labelHint="pattern" enumValues={["auto","smallChecker","smallCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle","largeChecker","largeCrosshatch","largeDiagonalLeft","largeDiagonalRight","largeTriangle","largeDiamond"]}/>
            <oj-input-number id="explode" onvalueChanged={handleExplodeValueChanged} value={explode} min={0} max={1} step={0.1} labelHint="pie slice explode"/>
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>);
};
export default PieChartStyles;
