import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as barDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicData.json';
import * as bubbleDataText from 'text!../data/cookbook/dataVisualizations/chart/resources/basicCoordData.json';
import { ojChart } from 'ojs/ojchart';
import 'ojs/ojchart';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import "css!./demo.css";
const barData = JSON.parse(barDataText as string);
const bubbleData = JSON.parse(bubbleDataText as string);
export const ChartDndEvents = () => {
    const dataProvider = useMemo(() => new ArrayDataProvider(barData, {
        keyAttributes: 'id'
    }), []);
    const dataProvider2 = useMemo(() => new ArrayDataProvider(bubbleData, {
        keyAttributes: 'id'
    }), []);
    const onDragOver = (event: DragEvent) => {
        if (!event.dataTransfer) {
            return;
        }
        const dataTypes = event.dataTransfer.types;
        for (let i = 0; i < dataTypes.length; i++) {
            const dataType = dataTypes[i];
            if (dataType === 'text/barchart') {
                const dropTarget = document.getElementById('dropTarget');
                if (dropTarget) {
                    dropTarget.style.backgroundColor = 'rgb(208,234,193)';
                }
                event.preventDefault();
                break;
            }
        }
    };
    const onDragLeave = () => {
        const dropTarget = document.getElementById('dropTarget');
        if (dropTarget) {
            dropTarget.style.backgroundColor = '#EEEEEE';
        }
    };
    const onDrop = (event: DragEvent) => {
        const dropTarget = document.getElementById('dropTarget');
        if (dropTarget) {
            dropTarget.style.backgroundColor = '#EEEEEE';
        }
        const jsonString = event.dataTransfer?.getData('text/barchart') ?? '';
        let text = '';
        if (jsonString) {
            const data = JSON.parse(jsonString);
            for (let i = 0; i < data.length; i++) {
                if (data[i].series != null)
                    text += `Series: <i>${data[i].series}</i><br>`;
                if (data[i].group != null)
                    text += `Group: <i>${data[i].group}</i><br>`;
                if (data[i].value != null)
                    text += `Value: <i>${data[i].value}</i><br>`;
                text += '<hr>';
            }
        }
        const targetText = document.getElementById('dropTargetText');
        if (targetText) {
            targetText.innerHTML = text;
        }
    };
    const onDragStart = (event: DragEvent) => {
        event.dataTransfer?.setData('text/circle', '{}');
        return true;
    };
    const onPlotAreaDrop = (event: DragEvent, ui: ojChart.DndDrop) => {
        let text = 'Target: <i>Plot Area</i><br>';
        text += `X: <i>${(ui.x ?? 0).toFixed(3)}</i><br>`;
        text += `Y: <i>${(ui.y ?? 0).toFixed(3)}</i><br>`;
        const dragSourceText = document.getElementById('dragSourceText');
        if (dragSourceText) {
            dragSourceText.innerHTML = text;
        }
    };
    const onXAxisDrop = (event: DragEvent, ui: ojChart.DndDrop) => {
        let text = 'Target: <i>X-Axis</i><br>';
        text += `X: <i>${(ui.x ?? 0).toFixed(3)}</i><br>`;
        const dragSourceText = document.getElementById('dragSourceText');
        if (dragSourceText) {
            dragSourceText.innerHTML = text;
        }
    };
    const onYAxisDrop = (event: DragEvent, ui: ojChart.DndDrop) => {
        let text = 'Target: <i>Y-Axis</i><br>';
        text += `Y: <i>${(ui.y ?? 0).toFixed(3)}</i><br>`;
        const dragSourceText = document.getElementById('dragSourceText');
        if (dragSourceText) {
            dragSourceText.innerHTML = text;
        }
    };
    const onLegendDrop = () => {
        let text = 'Target: <i>Legend</i><br>';
        const dragSourceText = document.getElementById('dragSourceText');
        if (dragSourceText) {
            dragSourceText.innerHTML = text;
        }
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { dnd: {
            drag: {
                items: {
                    dataTypes: ["text/barchart"]
                },
                series: {
                    dataTypes: ["text/barchart"]
                },
                groups: {
                    dataTypes: ["text/barchart"]
                }
            }
        } };
    const itemTemplateRenderer = (item: any) => {
        return <oj-chart-item value={item.data.value} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    const OjChartProps2: Partial<ComponentProps<'oj-chart'>> = { xAxis: {
            title: "X-Axis"
        }, yAxis: {
            title: "Y-Axis"
        }, legend: {
            title: "Legend"
        }, dnd: {
            drop: {
                plotArea: {
                    dataTypes: ["text/circle"],
                    drop: onPlotAreaDrop
                },
                xAxis: {
                    dataTypes: ["text/circle"],
                    drop: onXAxisDrop
                },
                yAxis: {
                    dataTypes: ["text/circle"],
                    drop: onYAxisDrop
                },
                legend: {
                    dataTypes: ["text/circle"],
                    drop: onLegendDrop
                }
            }
        } };
    const itemTemplateRenderer2 = (item: any) => {
        return <oj-chart-item x={item.data.x} y={item.data.y} z={item.data.z} groupId={[item.data.group]} seriesId={item.data.series}/>;
    };
    return (<div id="chart-container">
            <div class="oj-flex oj-sm-flex-items-1">
                    <oj-chart class="oj-flex-item" id="barChart" type="bar" data={dataProvider} selectionMode="multiple" dragMode="off" {...OjChartProps}>
                              <template slot="itemTemplate" render={itemTemplateRenderer}/>
                          </oj-chart>
                    <div id="dropTarget" class="oj-flex-item oj-sm-margin-1x-start oj-bg-neutral-30" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                              <div class="oj-sm-padding-3x">Drop bars, x-axis labels, or legend items here.</div>
                              <div class="oj-sm-padding-3x" id="dropTargetText"/>
                          </div>
                </div>
            <hr class="oj-sm-margin-4x-vertical"/>
            <div class="oj-flex oj-sm-flex-items-1">
                    <div class="oj-flex-item oj-sm-margin-1x-start">
                              <div class="oj-sm-padding-3x">
                                          Drag the circle below to the plot area, x-axis, y-axis, or legend of the bubble chart.
                                      </div>
                              <div class="oj-sm-padding-2x-vertical oj-sm-padding-3x-horizontal">
                                          <div class="oj-bg-success-30" id="circle" draggable={true} onDragStart={onDragStart}/>
                                      </div>
                              <div id="dragSourceText" class="oj-sm-padding-2x"/>
                          </div>
                    <oj-chart id="bubbleChart" class="oj-flex-item" type="bubble" data={dataProvider2} {...OjChartProps2}>
                              <template slot="itemTemplate" render={itemTemplateRenderer2}/>
                          </oj-chart>
                </div>
        </div>);
};
export default ChartDndEvents;
