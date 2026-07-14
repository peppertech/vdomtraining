import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojpictochart';
import 'preact';
import { type ComponentProps } from 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import Context = require('ojs/ojcontext');
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type PictoChartItem = {
    name: string;
    shape: string;
    color: string;
    count: number;
};
export const PictoChartPerformance = () => {
    const [timeValue, setTimeValue] = useState<number>(0);
    const [numSets, setNumSets] = useState<number>(10);
    const [numCounts, setNumCounts] = useState<number>(10);
    const [animationValue, setAnimationValue] = useState<string>('none');
    const [shapedData, setShapedData] = useState<string>('on');
    const [pictoChartItems, setPictoChartItems] = useState<PictoChartItem[]>([]);
    const initialLoadRef = useRef(true);
    const busyContext = Context.getPageContext().getBusyContext();
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const chartDataProvider = useMemo(() => new ArrayDataProvider(pictoChartItems, { keyAttributes: 'name' }), [pictoChartItems]);
    const numDataItems = numSets * numCounts;
    const timerText = timeValue > 0 ? `Time: ${timeValue}ms` : '';
    const generateRandomData = (setCount: number, countPerSet: number): PictoChartItem[] => Array.from({ length: setCount }, (_unused: unknown, index: number) => ({
        name: `Set ${index + 1}`,
        shape: 'circle',
        color: colorHandler.getValue(String(Math.random())),
        count: countPerSet
    }));
    const updateData = () => {
        setTimeValue(0);
        const chartData = generateRandomData(numSets, numCounts);
        const start = Date.now();
        setPictoChartItems(chartData);
        busyContext.whenReady().then(() => {
            const end = Date.now();
            if (!initialLoadRef.current) {
                setTimeValue(end - start);
            }
            else {
                initialLoadRef.current = false;
            }
        });
        return true;
    };
    useEffect(() => {
        updateData();
    }, [numSets, numCounts, shapedData]);
    const handleNumSetsChanged = (event: InputNumberValueChangedEvent) => {
        setNumSets(event.detail.value ?? 0);
    };
    const handleNumCountsChanged = (event: InputNumberValueChangedEvent) => {
        setNumCounts(event.detail.value ?? 0);
    };
    const handleAnimationValueChanged = (event: PropertyChangedEvent<string>) => {
        setAnimationValue(event.detail.value);
    };
    const handleShapedDataChanged = (event: PropertyChangedEvent<string>) => {
        setShapedData(event.detail.value);
    };
    const renderItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-picto-chart-item name={item.data.name} shape={item.data.shape} color={item.data.color} count={item.data.count}/>);
    return (<div id="chart-container">
      <div class="oj-sm-padding-2x-vertical">
        <oj-button class="oj-sm-margin-2x-end" id="updateButton" onojAction={updateData} aria-controls="pictochart1 pictochart2">
          Regenerate Data
        </oj-button>
        <span class="oj-typography-bold">
          Data Items: {numDataItems} {timerText}
        </span>
      </div>
      <oj-form-layout aria-controls="pictochart1 pictochart2" direction="column" max-columns={2}>
        <oj-input-number id="inputnumber" labelHint="Set(s)" min={0} step={5} value={numSets} onvalueChanged={handleNumSetsChanged}/>
        <demo-radioset-enum id="animationButtonSet" labelHint="Animation" onvalueChanged={handleAnimationValueChanged} value={animationValue} direction="row" enumValues={["auto", "none"]}/>
        <oj-input-number id="inputnumber-id2" labelHint="Items Per Set" min={0} step={5} value={numCounts} onvalueChanged={handleNumCountsChanged}/>
        <demo-radioset-enum onvalueChanged={handleShapedDataChanged} value={shapedData} labelHint="Shaped Data" direction="row" enumValues={["on", "off"]}/>
      </oj-form-layout>
      {shapedData === 'off' ? (<oj-picto-chart id="pictochart1" class="demo-picto-chart-fixed-width" data={chartDataProvider} animation-on-data-change={animationValue} aria-label="Picto chart performance demo with explicit item template">
          <template slot="itemTemplate" render={renderItem}/>
        </oj-picto-chart>) : undefined}
      {shapedData === 'on' ? (<oj-picto-chart id="pictochart2" class="demo-picto-chart-fixed-width" data={chartDataProvider} animation-on-data-change={animationValue} aria-label="Picto chart performance demo"/>) : undefined}
    </div>);
};
export default PictoChartPerformance;
