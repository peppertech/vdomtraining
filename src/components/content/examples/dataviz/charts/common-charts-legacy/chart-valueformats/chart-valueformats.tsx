import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import { ColorAttributeGroupHandler, ShapeAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as dataText from 'text!../data/cookbook/dataVisualizations/chart/resources/coordDrinksData.json';
import 'ojs/ojchart';
import 'ojs/ojinputtext';
import 'ojs/ojcheckboxset';
import 'ojs/ojoption';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type ChartType = ComponentProps<'oj-chart'>['type'];
type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type CheckboxValue = ComponentProps<'oj-checkboxset'>['value'];
type LegendSections = ComponentProps<'oj-chart'>['legend'];
type DrinkPoint = {
    id: number;
    year: string;
    company: string;
    x: number;
    y: number;
    z: number;
};
const data = JSON.parse(dataText as string) as DrinkPoint[];
export const ChartValueformats = () => {
    const [typeValue] = useState<ChartType>('bubble');
    const [groupOption, setGroupOption] = useState<TextInputValue>('Year');
    const [seriesOption, setSeriesOption] = useState<TextInputValue>('Company');
    const [xOption, setXOption] = useState<TextInputValue>('Deals');
    const [yOption, setYOption] = useState<TextInputValue>('Sales');
    const [zOption, setZOption] = useState<TextInputValue>('Stores');
    const [seriesDisplay, setSeriesDisplay] = useState<CheckboxValue>(['auto']);
    const [groupDisplay, setGroupDisplay] = useState<CheckboxValue>(['auto']);
    const [xDisplay, setXDisplay] = useState<CheckboxValue>(['auto']);
    const [yDisplay, setYDisplay] = useState<CheckboxValue>(['auto']);
    const [zDisplay, setZDisplay] = useState<CheckboxValue>(['auto']);
    const normalizedSeriesDisplay = seriesDisplay ?? [];
    const normalizedGroupDisplay = groupDisplay ?? [];
    const normalizedXDisplay = xDisplay ?? [];
    const normalizedYDisplay = yDisplay ?? [];
    const normalizedZDisplay = zDisplay ?? [];
    const tooltipDisplaySeries = (() => {
        return normalizedSeriesDisplay.length > 0 ? 'auto' : 'off';
    })();
    const tooltipDisplayGroup = (() => {
        return normalizedGroupDisplay.length > 0 ? 'auto' : 'off';
    })();
    const tooltipDisplayX = (() => {
        return normalizedXDisplay.length > 0 ? 'auto' : 'off';
    })();
    const tooltipDisplayY = (() => {
        return normalizedYDisplay.length > 0 ? 'auto' : 'off';
    })();
    const tooltipDisplayZ = (() => {
        return normalizedZDisplay.length > 0 ? 'auto' : 'off';
    })();
    const xConverter = useMemo(() => new IntlNumberConverter({
        style: 'currency',
        currency: 'USD'
    }), []);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const shapeHandler = useMemo(() => new ShapeAttributeGroupHandler(), []);
    const legendSectionsObj = useMemo(() => ({
        sections: [
            {
                title: 'Year',
                items: [
                    {
                        markerShape: shapeHandler.getValue('2010'),
                        text: '2010',
                        id: '2010'
                    },
                    {
                        markerShape: shapeHandler.getValue('2011'),
                        text: '2011',
                        id: '2011'
                    },
                    {
                        markerShape: shapeHandler.getValue('2012'),
                        text: '2012',
                        id: '2012'
                    }
                ]
            },
            {
                title: 'Brand',
                items: [
                    {
                        color: colorHandler.getValue('Coke'),
                        text: 'Coke',
                        id: 'Coke'
                    },
                    {
                        color: colorHandler.getValue('Pepsi'),
                        text: 'Pepsi',
                        id: 'Pepsi'
                    },
                    {
                        color: colorHandler.getValue('Snapple'),
                        text: 'Snapple',
                        id: 'Snapple'
                    },
                    {
                        color: colorHandler.getValue('Nestle'),
                        text: 'Nestle',
                        id: 'Nestle'
                    }
                ]
            }
        ]
    }), [colorHandler, shapeHandler]);
    const [legendSections] = useState<LegendSections>(legendSectionsObj);
    const dataProvider = useMemo(() => new ArrayDataProvider(data, {
        keyAttributes: 'id'
    }), []);
    const handleSeriesDisplayValueChanged = (event: JetElementCustomEvent<CheckboxValue>) => {
        setSeriesDisplay(event.detail.value ?? []);
    };
    const handleSeriesOptionValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setSeriesOption(event.detail.value);
    };
    const handleGroupDisplayValueChanged = (event: JetElementCustomEvent<CheckboxValue>) => {
        setGroupDisplay(event.detail.value ?? []);
    };
    const handleGroupOptionValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setGroupOption(event.detail.value);
    };
    const handleXDisplayValueChanged = (event: JetElementCustomEvent<CheckboxValue>) => {
        setXDisplay(event.detail.value ?? []);
    };
    const handleXOptionValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setXOption(event.detail.value);
    };
    const handleYDisplayValueChanged = (event: JetElementCustomEvent<CheckboxValue>) => {
        setYDisplay(event.detail.value ?? []);
    };
    const handleYOptionValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setYOption(event.detail.value);
    };
    const handleZDisplayValueChanged = (event: JetElementCustomEvent<CheckboxValue>) => {
        setZDisplay(event.detail.value ?? []);
    };
    const handleZOptionValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setZOption(event.detail.value);
    };
    const OjChartProps: Partial<ComponentProps<'oj-chart'>> = { xAxis: {
            title: "Deals"
        }, yAxis: {
            title: "Sales",
            tickLabel: {
                converter: xConverter
            }
        }, valueFormats: {
            y: {
                converter: xConverter,
                tooltipDisplay: tooltipDisplayY,
                tooltipLabel: yOption
            },
            series: {
                tooltipDisplay: tooltipDisplaySeries,
                tooltipLabel: seriesOption
            },
            group: {
                tooltipDisplay: tooltipDisplayGroup,
                tooltipLabel: groupOption
            },
            x: {
                tooltipDisplay: tooltipDisplayX,
                tooltipLabel: xOption
            },
            z: {
                tooltipDisplay: tooltipDisplayZ,
                tooltipLabel: zOption
            }
        } };
    const itemTemplateRenderer = (item: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-chart-item x={item.data.x} y={item.data.y * 1000} z={item.data.z} groupId={[item.data.year]} seriesId={item.data.company} color={colorHandler.getValue(item.data.company)} markerShape={shapeHandler.getValue(item.data.year)} categories={[item.data.company, item.data.year]}/>;
    };
    const seriesTemplateRenderer = ($current: DatavizSeriesTemplateContext) => {
        return <oj-chart-series displayInLegend="off"/>;
    };
    return (<div class="oj-flex" id="chart-container">
            <div class="oj-flex-item">
                    <h6 class="oj-sm-padding-4x-start">Sales Data</h6>
                    <oj-chart class="oj-flex-item" id="valuesChart" type={typeValue} data={dataProvider} animationOnDisplay="alphaFade" hideAndShowBehavior="withRescale" hoverBehavior="dim" legend={legendSections} {...OjChartProps}>
                              <template slot="itemTemplate" render={itemTemplateRenderer}/>
                              <template slot="seriesTemplate" render={seriesTemplateRenderer}/>
                          </oj-chart>
                </div>
            <div aria-controls="valuesChart" class="oj-flex-item">
                    <h6 class="oj-sm-padding-1x-start">Tooltip Label</h6>
                    <div class="oj-sm-padding-2x-horizontal">
                              <oj-checkboxset id="series_checkboxSetId" onvalueChanged={handleSeriesDisplayValueChanged} value={seriesDisplay} title="add/remove from tooltip"><oj-option value="auto">Series</oj-option></oj-checkboxset>
                              <oj-input-text id="series" aria-label="Series" onvalueChanged={handleSeriesOptionValueChanged} value={seriesOption}/>
                          </div>
                    <div class="oj-sm-padding-2x-horizontal">
                              <oj-checkboxset id="group_checkboxSetId" onvalueChanged={handleGroupDisplayValueChanged} value={groupDisplay} title="add/remove from tooltip"><oj-option value="auto">Group</oj-option></oj-checkboxset>
                              <oj-input-text id="group" aria-label="Group" onvalueChanged={handleGroupOptionValueChanged} value={groupOption}/>
                          </div>
                    <div class="oj-sm-padding-2x-horizontal">
                              <oj-checkboxset id="x_checkboxSetId" onvalueChanged={handleXDisplayValueChanged} value={xDisplay} title="add/remove from tooltip"><oj-option value="auto">X</oj-option></oj-checkboxset>
                              <oj-input-text id="xValue" aria-label="X" onvalueChanged={handleXOptionValueChanged} value={xOption}/>
                          </div>
                    <div class="oj-sm-padding-2x-horizontal">
                              <oj-checkboxset id="y_checkboxSetId" onvalueChanged={handleYDisplayValueChanged} value={yDisplay} title="add/remove from tooltip"><oj-option value="auto">Y</oj-option></oj-checkboxset>
                              <oj-input-text id="yValue" aria-label="Y" onvalueChanged={handleYOptionValueChanged} value={yOption}/>
                          </div>
                    <div class="oj-sm-padding-2x-horizontal">
                              <oj-checkboxset id="z_checkboxSetId" onvalueChanged={handleZDisplayValueChanged} value={zDisplay} title="add/remove from tooltip"><oj-option value="auto">Z</oj-option></oj-checkboxset>
                              <oj-input-text id="zValue" aria-label="Z" onvalueChanged={handleZOptionValueChanged} value={zOption}/>
                          </div>
                </div>
        </div>);
};
export default ChartValueformats;
