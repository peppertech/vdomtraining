// @ts-nocheck
import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import Context = require('ojs/ojcontext');
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import 'ojs/ojtagcloud';
import 'css!./demo.css';
type RandomTag = {
    id: string;
    label: string;
    value: number;
};
type ValueChangedEvent<T> = CustomEvent<{
    value: T;
}>;
const words = ['chart', 'treemap', 'sunburst', 'tag', 'cloud', 'map', 'nbox', 'diagram'];
const generateRandomData = (numTags: number): RandomTag[] => {
    const data: RandomTag[] = [];
    for (let i = 0; i < numTags; i += 1) {
        const randomValue = 1 + Math.random() * 100;
        const word = `${words[i % 7]}${i}`;
        data.push({ id: word, label: word, value: randomValue });
    }
    return data;
};
const renderPerformanceTagCloudItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-tag-cloud-item label={item.data.label} value={item.data.value}/>);
export const TagCloudPerformance = () => {
    const [animationValue, setAnimationValue] = useState<'auto' | 'none'>('none');
    const [layoutValue, setLayoutValue] = useState<'rectangular' | 'cloud'>('rectangular');
    const [numTags, setNumTags] = useState(20);
    const [timeValue, setTimeValue] = useState<number | undefined>(undefined);
    const [shapedData, setShapedData] = useState<'on' | 'off'>('on');
    const [tags, setTags] = useState<RandomTag[]>(() => generateRandomData(20));
    const dataProvider = useMemo(() => new ArrayDataProvider(tags, { keyAttributes: 'id' }), [tags]);
    const timerText = timeValue && timeValue > 0 ? `Time:  ${timeValue}ms` : '';
    const regenerateData = (count: number = numTags) => {
        setTimeValue(0);
        const busyContext = Context.getPageContext().getBusyContext();
        const data = generateRandomData(count);
        const start = Date.now();
        setTags(data);
        busyContext.whenReady().then(() => {
            setTimeValue(Date.now() - start);
        });
    };
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            regenerateData(numTags);
        }, 500);
        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [numTags]);
    const handleItemCountChanged = (event: ValueChangedEvent<number>) => {
        setNumTags(event.detail.value ?? 0);
    };
    const handleAnimationChanged = (event: ValueChangedEvent<'auto' | 'none'>) => {
        setAnimationValue(event.detail.value);
    };
    const handleLayoutChanged = (event: ValueChangedEvent<'rectangular' | 'cloud'>) => {
        setLayoutValue(event.detail.value);
        regenerateData();
    };
    const handleShapedDataChanged = (event: ValueChangedEvent<'on' | 'off'>) => {
        setShapedData(event.detail.value);
        regenerateData();
    };
    return (<div id="tagcloud-container">
      <oj-button id="updateButton" aria-controls={shapedData === 'off' ? 'tagcloud1' : 'tagcloud2'} onojAction={() => regenerateData()} class="oj-sm-padding-2x-horizontal">
        Regenerate Data
      </oj-button>
      <span id="timerText" class="oj-sm-padding-2x-horizontal">{timerText}</span>
      <oj-form-layout direction="column" max-columns={2} class="oj-sm-margin-4x-top">
        <oj-input-number label-hint="Items" min={10} step={30} value={numTags} onvalueChanged={handleItemCountChanged}/>
        <demo-radioset-enum label-hint="Animation" value={animationValue} onvalueChanged={handleAnimationChanged} direction="row" enum-values='["auto", "none"]'/>
        <demo-radioset-enum label-hint="Layout" value={layoutValue} onvalueChanged={handleLayoutChanged} direction="row" enum-values='["rectangular", "cloud"]'/>
        <demo-radioset-enum label-hint="Shaped Data" value={shapedData} onvalueChanged={handleShapedDataChanged} direction="row" enum-values='["on", "off"]'/>
      </oj-form-layout>
      <div class="demo-tagCloud-performance-max-width">
        {shapedData === 'off' ? (<oj-tag-cloud id="tagcloud1" layout={layoutValue} animation-on-display={animationValue} animation-on-data-change={animationValue} data={dataProvider} aria-label="Tagcloud performance demo">
            <template slot="itemTemplate" render={renderPerformanceTagCloudItem}/>
          </oj-tag-cloud>) : undefined}
        {shapedData === 'on' ? (<oj-tag-cloud id="tagcloud2" layout={layoutValue} animation-on-display={animationValue} animation-on-data-change={animationValue} data={dataProvider} aria-label="Tagcloud performance demo"/>) : undefined}
      </div>
    </div>);
};
export default TagCloudPerformance;
