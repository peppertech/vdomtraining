// @ts-nocheck
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { RowDataGridProvider } from 'ojs/ojrowdatagridprovider';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as asiaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/asia_countries.json';
import * as australiaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/australia_countries.json';
import * as europeText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/europe_countries.json';
import * as northAmericaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/north_america_countries.json';
import * as southAmericaText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/south_america_countries.json';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/olympicHosts.json';
import 'css!./demo.css';
import 'ojs/ojdatagrid';
import 'ojs/ojlegend';
import 'ojs/ojthematicmap';

type OlympicHost = {
  Year: number;
  Season: string;
  Country: string;
  Continent: string;
};

type ContinentKey = 'asia' | 'australia' | 'europe' | 'northAmerica' | 'southAmerica';
type GridColumnKey = 'defaultMap' | 'zoomedMap' | 'isolatedMap';
type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

type GridRow = {
  id: number;
  year: number;
  defaultMap: OlympicHost;
  zoomedMap: OlympicHost;
  isolatedMap: OlympicHost;
};

const continentGeoByKey = {
  asia: JSON.parse(asiaText as string),
  australia: JSON.parse(australiaText as string),
  europe: JSON.parse(europeText as string),
  northAmerica: JSON.parse(northAmericaText as string),
  southAmerica: JSON.parse(southAmericaText as string)
} as const;

const olympicHosts = JSON.parse(jsonDataText as string) as OlympicHost[];
const GRID_COLUMNS: GridColumnKey[] = ['defaultMap', 'zoomedMap', 'isolatedMap'];

export const ThematicMapSmallFormFactor = () => {
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const mapProviders = useMemo<Record<ContinentKey, ThematicMapProvider>>(
    () => ({
      asia: {
        geo: continentGeoByKey.asia,
        propertiesKeys: { id: 'CC3', shortLabel: 'CC3', longLabel: 'NAME' }
      },
      australia: {
        geo: continentGeoByKey.australia,
        propertiesKeys: { id: 'CC3', shortLabel: 'CC3', longLabel: 'NAME' }
      },
      europe: {
        geo: continentGeoByKey.europe,
        propertiesKeys: { id: 'CC3', shortLabel: 'CC3', longLabel: 'NAME' }
      },
      northAmerica: {
        geo: continentGeoByKey.northAmerica,
        propertiesKeys: { id: 'CC3', shortLabel: 'CC3', longLabel: 'NAME' }
      },
      southAmerica: {
        geo: continentGeoByKey.southAmerica,
        propertiesKeys: { id: 'CC3', shortLabel: 'CC3', longLabel: 'NAME' }
      }
    }),
    []
  );
  const rows = useMemo<GridRow[]>(
    () =>
      olympicHosts.map((host) => ({
        id: host.Year,
        year: host.Year,
        defaultMap: host,
        zoomedMap: host,
        isolatedMap: host
      })),
    []
  );
  const rowDataProvider = useMemo(
    () =>
      new ArrayDataProvider(rows, {
        keyAttributes: 'id'
      }),
    [rows]
  );
  const dataGridProvider = useMemo(
    () =>
      new RowDataGridProvider<GridColumnKey, number, GridRow>(rowDataProvider, {
        columns: {
          rowHeader: ['year'],
          databody: GRID_COLUMNS
        },
        columnHeaders: {
          column: ['Default', 'Zoomed to Data', 'Isolated Data Item']
        },
        headerLabels: {
          row: ['Year']
        }
      }),
    [rowDataProvider]
  );
  const areaDataProviderByCountry = useMemo(
    () =>
      rows.reduce<Record<string, InstanceType<typeof ArrayDataProvider>>>((providers, row) => {
        providers[row.defaultMap.Country] = new ArrayDataProvider([row.defaultMap], {
          keyAttributes: 'Country'
        });
        return providers;
      }, {}),
    [rows]
  );
  const legendSections = useMemo(
    () => [
      {
        items: [
          { text: 'Winter Host', color: colorHandler.getValue('Winter') },
          { text: 'Summer Host', color: colorHandler.getValue('Summer') },
          { text: 'Winter and Summer Host', color: colorHandler.getValue('Both') }
        ]
      }
    ],
    [colorHandler]
  );
  const legendDataProvider = useMemo(
    () =>
      new ArrayDataProvider(legendSections, {
        keyAttributes: '@index'
      }),
    [legendSections]
  );

  const getMapProvider = (continent: string) => {
    return mapProviders[continent as ContinentKey];
  };

  const getColor = (season: string) => {
    return colorHandler.getValue(season);
  };

  const getDescription = (season: string) => {
    return `Host of the ${season} Olympics`;
  };

  const getAreaDataProvider = (host: OlympicHost) => {
    return areaDataProviderByCountry[host.Country];
  };

  const areaTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-area
        location={$current.data.Country}
        color={getColor($current.data.Season)}
        shortDesc={getDescription($current.data.Season)}
      />
    );
  };

  const renderMap = (host: OlympicHost, columnKey: GridColumnKey) => {
    const thematicMapProps: Partial<ComponentProps<'oj-thematic-map'>> = {};

    if (columnKey === 'zoomedMap') {
      thematicMapProps.initialZooming = 'auto';
    }
    if (columnKey === 'isolatedMap') {
      thematicMapProps.isolatedItem = host.Country;
    }

    return (
      <oj-thematic-map
        class="demo-thematicmap"
        areaData={getAreaDataProvider(host)}
        mapProvider={getMapProvider(host.Continent)}
        {...thematicMapProps}
      >
        <template slot="areaTemplate" render={areaTemplateRenderer} />
      </oj-thematic-map>
    );
  };

  const cellTemplateRenderer = (cell: DatavizTemplateContext<DatavizChartDatum>) => {
    const columnKey = GRID_COLUMNS[cell.item.columnIndex];
    const host = cell.item.data.data as OlympicHost;
    if (columnKey == null || host == null) {
      return null;
    }
    return renderMap(host, columnKey);
  };

  const ojDataGridProps: Partial<ComponentProps<'oj-data-grid'>> = {
    'header.row.className': 'oj-typography-body-md demo-header-row-style',
    'header.column.className': 'oj-typography-body-md demo-header-column-style oj-helper-text-align-center'
  };

  return (
    <div id="mapdemo">
      <oj-legend
        id="legend1"
        halign="center"
        orientation="horizontal"
        data={legendDataProvider}
        class="demo-legend"
        aria-label="legend"
      />
      <oj-data-grid
        class="demo-datagrid"
        aria-label="Small Form Factor Thematic Map Demo"
        scrollPolicy="loadMoreOnScroll"
        data={dataGridProvider}
        {...ojDataGridProps}
      >
        <template slot="cellTemplate" render={cellTemplateRenderer} />
      </oj-data-grid>
    </div>
  );
};

export default ThematicMapSmallFormFactor;
