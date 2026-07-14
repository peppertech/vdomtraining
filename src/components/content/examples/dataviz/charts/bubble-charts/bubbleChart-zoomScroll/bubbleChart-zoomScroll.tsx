import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojchart';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojformlayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface BubbleChartItem {
    id: string;
    x: number;
    y: number;
    z: number;
    group: string;
    series: string;
}

type ZoomValue = ComponentProps<'oj-chart'>['zoomAndScroll'];
type ZoomDirection = ComponentProps<'oj-chart'>['zoomDirection'];
type ChartXAxis = NonNullable<ComponentProps<'oj-chart'>['xAxis']>;
type ChartYAxis = NonNullable<ComponentProps<'oj-chart'>['yAxis']>;
type ItemTemplateContext = {
    data: BubbleChartItem;
};

const data = JSON.parse(dataText as string) as BubbleChartItem[];

export const BubbleChartZoomScroll = () => {
    const [zoomValue, setZoomValue] = useState<ZoomValue>('live');
    const [zoomDirectionValue, setZoomDirectionValue] = useState<ZoomDirection>('auto');
    const [viewportText, setViewportText] = useState<string>('');

    const dataProvider = useMemo(() => new ArrayDataProvider<BubbleChartItem['id'], BubbleChartItem>(data, {
        keyAttributes: 'id'
    }), []);
    const xAxis = useMemo<ChartXAxis>(() => {
        return {
            viewportMin: 20,
            viewportMax: 40
        };
    }, []);
    const yAxis = useMemo<ChartYAxis>(() => {
        return {
            viewportMin: 30,
            viewportMax: 50
        };
    }, []);

    const getViewportChangeText = () => {
        return viewportText.trim();
    };

    const handleZoomValueValueChanged = (event: JetElementCustomEvent<ZoomValue>) => {
        setZoomValue(event.detail.value ?? 'live');
    };

    const handleZoomDirectionValueValueChanged = (event: JetElementCustomEvent<ZoomDirection>) => {
        setZoomDirectionValue(event.detail.value ?? 'auto');
    };

    const viewportChangeListener = (event: ojChart.ojViewportChange) => {
        let viewportInfo = 'Viewport Change\n';
        if (event.detail.startGroup) {
            viewportInfo += `startGroup: ${event.detail.startGroup}`;
        }
        if (event.detail.endGroup) {
            viewportInfo += `\nendGroup: ${event.detail.endGroup}\n\n`;
        }
        if (event.detail.xMin != null) {
            viewportInfo += `xMin: ${event.detail.xMin.toFixed(2)}`;
        }
        if (event.detail.xMax != null) {
            viewportInfo += `\nxMax: ${event.detail.xMax.toFixed(2)}\n\n`;
        }
        if (event.detail.yMin != null) {
            viewportInfo += `yMin: ${event.detail.yMin.toFixed(2)}`;
        }
        if (event.detail.yMax != null) {
            viewportInfo += `\nyMax: ${event.detail.yMax.toFixed(2)}`;
        }
        setViewportText(viewportInfo);
    };

    const itemTemplateRenderer = (item: ItemTemplateContext) => {
        return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };

    return (
        <div id="chart-container">
            <oj-form-layout maxColumns={2}>
                <demo-radioset-enum aria-controls="bubbleChart" labelHint="Zoom and Scroll" direction="row" enumValues={["live","liveScrollOnly"]} onvalueChanged={handleZoomValueValueChanged} value={zoomValue} />
                <demo-radioset-enum aria-controls="bubbleChart" labelHint="Zoom Direction" direction="row" enumValues={["auto","x","y"]} onvalueChanged={handleZoomDirectionValueValueChanged} value={zoomDirectionValue} />
            </oj-form-layout>
            <div class="oj-flex oj-sm-padding-2x oj-sm-flex-direction-column">
                <oj-chart class="oj-flex-item" id="bubbleChart" type="bubble" selectionMode="multiple" data={dataProvider} onojViewportChange={viewportChangeListener} zoomAndScroll={zoomValue} zoomDirection={zoomDirectionValue} xAxis={xAxis} yAxis={yAxis}>
                    <template slot="itemTemplate" render={itemTemplateRenderer} />
                </oj-chart>
                <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical" style={{ whiteSpace: 'pre-line' }}>{getViewportChangeText()}</div>
            </div>
        </div>
    );
};

export default BubbleChartZoomScroll;
