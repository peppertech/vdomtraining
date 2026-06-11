import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/twoSeriesData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojchart';
import 'ojs/ojformlayout';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
type ChartLineType = NonNullable<NonNullable<ComponentProps<'oj-chart'>['styleDefaults']>['lineType']>;
type ScatterChartLineTypeItem = {
    id: number;
    group: string;
    series: string;
    x: number;
    y: number;
};
const data = JSON.parse(dataText as string) as ScatterChartLineTypeItem[];
export const ScatterChartLineTypes = () => {
    const [lineTypeValue, setLineTypeValue] = useState<ChartLineType>('curved');
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleLineTypeValueChanged = (event: JetElementCustomEvent<ChartLineType>) => {
        setLineTypeValue(event.detail.value ?? 'curved');
    };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-chart-item x={item.data.x} y={item.data.y} groupId={[item.data.group]} seriesId={item.data.series}/>);
    const ojChartProps: Partial<ComponentProps<'oj-chart'>> = {
        styleDefaults: {
            lineType: lineTypeValue,
            markerDisplayed: 'on'
        }
    };
    return (<div id="chart-container">
      <oj-form-layout aria-controls="scatterChart">
        <demo-radioset-enum direction="row" labelHint="Line Type" id="radioButtonset" value={lineTypeValue} onvalueChanged={handleLineTypeValueChanged} enumValues={["straight","curved","stepped","segmented","none"]}/>
      </oj-form-layout>

      <oj-chart id="scatterChart" type="scatter" data={dataProvider} animationOnDisplay="auto" animationOnDataChange="auto" {...ojChartProps}>
        <template slot="itemTemplate" render={itemTemplateRenderer}/>
      </oj-chart>
    </div>);
};
export default ScatterChartLineTypes;
