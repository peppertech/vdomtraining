// @ts-nocheck
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojlegend';
import 'ojs/ojpictochart';
import 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type PropertyChangedEvent<T> = CustomEvent<{
    value: T;
}>;
export const PictoChartMixedSizescorepack = () => {
    const [softwareRowSpan, setSoftwareRowSpan] = useState(1);
    const [softwareColumnSpan, setSoftwareColumnSpan] = useState(1);
    const [softwareCount, setSoftwareCount] = useState(12);
    const [hardwareRowSpan, setHardwareRowSpan] = useState(1);
    const [hardwareColumnSpan, setHardwareColumnSpan] = useState(1);
    const [hardwareCount, setHardwareCount] = useState(12);
    const [servicesRowSpan, setServicesRowSpan] = useState(1);
    const [servicesColumnSpan, setServicesColumnSpan] = useState(1);
    const [servicesCount, setServicesCount] = useState(12);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const pictoChartItems = useMemo(() => [
        {
            name: 'Software & Cloud',
            rowSpan: softwareRowSpan,
            columnSpan: softwareColumnSpan,
            color: colorHandler.getValue('Software & Cloud'),
            count: softwareCount
        },
        {
            name: 'Hardware',
            rowSpan: hardwareRowSpan,
            columnSpan: hardwareColumnSpan,
            color: colorHandler.getValue('Hardware'),
            count: hardwareCount
        },
        {
            name: 'Services',
            rowSpan: servicesRowSpan,
            columnSpan: servicesColumnSpan,
            color: colorHandler.getValue('Services'),
            count: servicesCount
        }
    ], [
        colorHandler,
        hardwareColumnSpan,
        hardwareCount,
        hardwareRowSpan,
        servicesColumnSpan,
        servicesCount,
        servicesRowSpan,
        softwareColumnSpan,
        softwareCount,
        softwareRowSpan
    ]);
    const chartDataProvider = useMemo(() => new ArrayDataProvider(pictoChartItems, { keyAttributes: 'name' }), [pictoChartItems]);
    const getColor = (name: string) => colorHandler.getValue(name);
    const numberChanged = (setter: (value: number) => void) => (event: PropertyChangedEvent<number>) => {
        setter(event.detail.value ?? 1);
    };
    const renderPictoItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-picto-chart-item name={item.data.name} short-desc={`${item.data.name}: ${item.data.count}`} shape="rectangle" row-span={item.data.rowSpan} column-span={item.data.columnSpan} color={item.data.color} count={item.data.count}/>);
    const renderLegendItem = (item: DatavizTemplateContext<DatavizChartDatum>) => (<oj-legend-item short-desc={`Department: ${item.data.name}`} text={item.data.name} marker-shape="square" color={getColor(item.data.name)}/>);
    return (<div id="chart-container" class="oj-flex oj-sm-flex-items-1">
      <div class="oj-flex-item">
        <oj-picto-chart id="pictochart1" column-count={12} data={chartDataProvider} animation-on-data-change="auto">
          <template slot="itemTemplate" render={renderPictoItem}/>
        </oj-picto-chart>
        <div class="oj-typography-bold">Departments</div>
        <oj-legend id="legend" orientation="horizontal" data={chartDataProvider}>
          <template slot="itemTemplate" render={renderLegendItem}/>
        </oj-legend>
      </div>
      <div class="oj-flex-item">
        <div class="oj-typography-bold oj-sm-margin-2x-vertical">Software and Cloud</div>
        <oj-form-layout aria-controls="pictochart1" max-columns={2}>
          <oj-input-number labelHint="rowSpan" min={1} step={1} value={softwareRowSpan} onvalueChanged={numberChanged(setSoftwareRowSpan)}/>
          <oj-input-number labelHint="columnSpan" min={1} step={1} value={softwareColumnSpan} onvalueChanged={numberChanged(setSoftwareColumnSpan)}/>
          <oj-input-number labelHint="count" min={1} step={1} value={softwareCount} onvalueChanged={numberChanged(setSoftwareCount)}/>
        </oj-form-layout>
        <div class="oj-typography-bold oj-sm-margin-2x-vertical">Hardware</div>
        <oj-form-layout aria-controls="pictochart1" max-columns={2}>
          <oj-input-number labelHint="rowSpan" min={1} step={1} value={hardwareRowSpan} onvalueChanged={numberChanged(setHardwareRowSpan)}/>
          <oj-input-number labelHint="columnSpan" min={1} step={1} value={hardwareColumnSpan} onvalueChanged={numberChanged(setHardwareColumnSpan)}/>
          <oj-input-number labelHint="count" min={1} step={1} value={hardwareCount} onvalueChanged={numberChanged(setHardwareCount)}/>
        </oj-form-layout>
        <div class="oj-typography-bold oj-sm-margin-2x-vertical">Services</div>
        <oj-form-layout aria-controls="pictochart1" max-columns={2}>
          <oj-input-number labelHint="rowSpan" min={1} step={1} value={servicesRowSpan} onvalueChanged={numberChanged(setServicesRowSpan)}/>
          <oj-input-number labelHint="columnSpan" min={1} step={1} value={servicesColumnSpan} onvalueChanged={numberChanged(setServicesColumnSpan)}/>
          <oj-input-number labelHint="count" min={1} step={1} value={servicesCount} onvalueChanged={numberChanged(setServicesCount)}/>
        </oj-form-layout>
      </div>
    </div>);
};
export default PictoChartMixedSizescorepack;
