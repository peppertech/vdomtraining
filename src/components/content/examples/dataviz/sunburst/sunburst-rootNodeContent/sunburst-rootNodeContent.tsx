import { h } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import "css!./demo.css";
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import * as salesDataText from 'text!../data/cookbook/dataVisualizations/treeView/resources/salesByRegion.json';
import 'ojs/ojsunburst';
import 'ojs/ojthematicmap';

type SalesNode = {
  id: string;
  region: string;
  description: string;
  sales: number;
  nodes?: SalesNode[];
};

type AreaDatum = {
  id: string;
  color: string;
  shortDesc: string;
  location: string;
};

const salesData = JSON.parse(salesDataText as string) as SalesNode[];

export const SunburstRootNodeContent = () => {
  const numberConverter = useMemo(() => new IntlNumberConverter({ currency: 'USD' }), []);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(salesData, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    []
  );
  const areaData = useMemo<AreaDatum[]>(() => {
    const items: AreaDatum[] = [];

    salesData.forEach((region: any) => {
      region.nodes?.forEach((state: any) => {
        items.push({
          id: state.id,
          color: colorHandler.getValue(state.region),
          shortDesc: numberConverter.format(state.sales),
          location: state.description
        });
      });
    });

    return items;
  }, [colorHandler, numberConverter]);
  const areaDataProvider = useMemo(
    () =>
      new ArrayDataProvider(areaData, {
        keyAttributes: 'id'
      }),
    [areaData]
  );
  const mapProvider = useMemo(
    () => ({
      geo: JSON.parse(geoText as string),
      propertiesKeys: {
        id: 'Name',
        shortLabel: 'CC3',
        longLabel: 'Name'
      }
    }),
    []
  );

  const getColor = (region: string): string => colorHandler.getValue(region);
  const getShortDesc = (description: string, sales: number): string =>
    `${description} : ${numberConverter.format(sales)}`;

  const nodeTemplateRenderer = ($current: any) => (
    <oj-sunburst-node
      label={$current.data.id}
      value={$current.data.sales}
      color={getColor($current.data.region)}
      shortDesc={getShortDesc($current.data.description, $current.data.sales)}
      radius={0.1}
    />
  );

  const areaTemplateRenderer = (area: any) => (
    <oj-thematic-map-area
      color={area.data.color}
      location={area.data.location}
      shortDesc={area.data.shortDesc}
    />
  );

  const rootNodeContentTemplateRenderer = ($current: any) => (
    <div
      style={{
        position: 'absolute',
        top: `${$current.innerBounds.y}px`,
        left: `${$current.innerBounds.x}px`,
        height: `${$current.innerBounds.height}px`,
        width: `${$current.innerBounds.width}px`,
        textAlign: 'center'
      }}
    >
      <oj-thematic-map
        areaData={areaDataProvider}
        mapProvider={mapProvider}
        style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: `${$current.innerBounds.width}px`,
          height: `${$current.innerBounds.height}px`
        }}
      >
        <template slot="areaTemplate" render={areaTemplateRenderer} />
      </oj-thematic-map>
      <div
        style={{
          top: '0',
          width: `${$current.innerBounds.width}px`,
          position: 'absolute',
          fontSize: '1.25rem'
        }}
      >
        <b>SALES</b>
      </div>
      <div
        style={{
          bottom: '0',
          width: `${$current.innerBounds.width}px`,
          position: 'absolute',
          fontSize: '1.25rem'
        }}
      >
        <b>$212,600,000</b>
      </div>
    </div>
  );

  return (
    <div id="sunburst-container">
      <oj-sunburst
        id="sunburst"
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        data={sunburstData}
        class="oj-sm-width-full demo-sunburst-size"
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
        <template slot="rootNodeContentTemplate" render={rootNodeContentTemplateRenderer} />
      </oj-sunburst>
    </div>
  );
};

export default SunburstRootNodeContent;
