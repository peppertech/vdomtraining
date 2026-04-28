import { h } from 'preact';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { useMemo } from 'preact/hooks';
import * as chartData from 'text!../data/cookbook/dataVisualizations/chart/resources/salesData.json';
import * as geo from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import * as tMapData from 'text!../data/cookbook/dataVisualizations/chart/resources/salesRegionData.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import 'ojs/ojchart';
import 'ojs/ojthematicmap';

type SalesDatum = {
  id: number;
  value: number;
  year: string;
  region: string;
};
type AreaDatum = {
  State: string;
  Region: number;
  Sales: number;
};

export const PieChartCenterCallback = () => {
  const numberConverter = useMemo(
    () =>
      new IntlNumberConverter({
        style: 'currency',
        currency: 'USD'
      }),
    []
  );
  const dataProvider = useMemo(
    () => new ArrayDataProvider(JSON.parse(chartData as string), { keyAttributes: 'id' }),
    []
  );
  const colorAttributeHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const areaDataProvider = useMemo(
    () => new ArrayDataProvider(JSON.parse(tMapData as string), { keyAttributes: 'State' }),
    []
  );
  const mapProvider = useMemo(
    () => ({
      geo: JSON.parse(geo as string),
      propertiesKeys: {
        id: 'Name',
        shortLabel: 'CC3',
        longLabel: 'Name'
      }
    }),
    []
  );

  const renderChartItem = (item: { data: SalesDatum }) => {
    return <oj-chart-item value={item.data.value} group-id={[item.data.year]} series-id={item.data.region} />;
  };

  const renderChartSeries = (series: { index: number }) => {
    return <oj-chart-series color={colorAttributeHandler.getValue(String(series.index))} />;
  };

  const renderArea = (area: { data: AreaDatum }) => {
    return (
      <oj-thematic-map-area
        color={colorAttributeHandler.getValue(String(area.data.Region - 1))}
        location={area.data.State}
        short-desc={numberConverter.format(area.data.Sales)}
      />
    );
  };

  const renderPieCenter = ($current: any) => {
    return (
      <div
        class="oj-flex"
        style={{
          position: 'absolute',
          top: `${$current.innerBounds.y}px`,
          left: `${$current.innerBounds.x}px`,
          height: `${$current.innerBounds.height}px`,
          width: `${$current.innerBounds.width}px`,
          textAlign: 'center'
        }}
      >
        <div class="oj-flex-item oj-typography-body-lg oj-typography-bold">SALES</div>
        <oj-thematic-map
          class="oj-flex-item"
          label-display="off"
          area-data={areaDataProvider}
          map-provider={mapProvider}
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            width: `${$current.innerBounds.width}px`,
            height: `${$current.innerBounds.height * 0.75}px`
          }}
        >
          <template slot="areaTemplate" render={renderArea} />
        </oj-thematic-map>
        <div class="oj-flex-item oj-typography-body-sm oj-typography-bold">$212,600,000</div>
      </div>
    );
  };

  return (
    <div id="chart-container">
      <oj-chart
        id="pieChart"
        type="pie"
        data={dataProvider}
        {...{
          'style-defaults.pie-inner-radius': '.9',
          'style-defaults.data-label-position': 'none',
          'value-formats.series.tooltip-label': 'Region',
          'value-formats.value.converter': numberConverter,
          'value-formats.value.tooltip-label': 'Sales'
        }}
      >
        <template slot="itemTemplate" render={renderChartItem} />
        <template slot="seriesTemplate" render={renderChartSeries} />
        <template slot="pieCenterTemplate" render={renderPieCenter} />
      </oj-chart>
    </div>
  );
};

export default PieChartCenterCallback;
