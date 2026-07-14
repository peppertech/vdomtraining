import 'css!./demo.css';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojthematicmap';
import { ojThematicMap } from 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import * as territoriesText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/europeSalesTerritories.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/europe_countries.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type TerritoryDatum = {
  Country: string;
  Territory: string;
};

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];

const geo = JSON.parse(geoText as string);
const territories = JSON.parse(territoriesText as string) as TerritoryDatum[];

const createSvg = () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '70');
  svg.setAttribute('height', '70');
  svg.setAttribute('viewBox', '0 0 70 70');
  return svg;
};

const addGroup = (parent: Element) => {
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  parent.appendChild(group);
  return group;
};

const addPath = (parent: Element, fill: string, path: string) => {
  const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath.setAttribute('d', path);
  svgPath.setAttribute('fill', fill);
  svgPath.setAttribute('stroke', '#aaaaaa');
  svgPath.setAttribute('stroke-width', '1');
  parent.appendChild(svgPath);
};

const addCircle = (parent: Element, color: string, radius: number) => {
  const svgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  svgCircle.setAttribute('cx', '50');
  svgCircle.setAttribute('cy', '50');
  svgCircle.setAttribute('fill', color);
  svgCircle.setAttribute('stroke', '#aaaaaa');
  svgCircle.setAttribute('stroke-width', '1');
  svgCircle.setAttribute('r', radius.toString());
  parent.appendChild(svgCircle);
};

const addRect = (parent: Element) => {
  const svgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  svgRect.setAttribute('x', '1');
  svgRect.setAttribute('y', '1');
  svgRect.setAttribute('width', '50');
  svgRect.setAttribute('height', '50');
  svgRect.setAttribute('fill', 'white');
  svgRect.setAttribute('stroke', '#aaaaaa');
  svgRect.setAttribute('stroke-width', '1');
  parent.appendChild(svgRect);
};

export const ThematicMapRenderer = () => {
  const mapProvider = useMemo<ThematicMapProvider>(
    () => ({
      geo,
      propertiesKeys: {
        id: 'CC3',
        shortLabel: 'CC3',
        longLabel: 'NAME'
      }
    }),
    []
  );
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(territories, {
        keyAttributes: 'Country'
      }),
    []
  );

  const getColor = (territory: string) => {
    return colorHandler.getValue(territory);
  };

  const rendererFunc = (
    context: ojThematicMap.RendererContext<null, null, TerritoryDatum['Country'], null, null, TerritoryDatum>
  ) => {
    const itemData = context.itemData;
    if (!itemData) {
      return undefined;
    }
    const color = getColor(itemData.Territory);
    let rootElement = context.root as SVGElement | null;

    if (rootElement == null) {
      rootElement = createSvg();
      const group = addGroup(rootElement);
      addRect(group);
      addPath(group, color, 'M28,28 h-17 a17,17 0 1,0 17,-17 z');
      addPath(group, 'yellow', 'M23,23 v-17 a17,17 0 0,0 -17,17 z');
      addCircle(group, color, 10);
    }

    return { insert: rootElement };
  };

  const selectionRenderer = (
    context: ojThematicMap.RendererContext<null, null, TerritoryDatum['Country'], null, null, TerritoryDatum>
  ) => {
    const itemData = context.itemData;
    const rootElement = context.root as SVGElement | null;
    if (rootElement != null && itemData != null) {
      const group = rootElement.childNodes[0] as Element | undefined;
      const circle = group?.childNodes[3] as Element | undefined;
      circle?.setAttribute(
        'fill',
        context.state.selected ? 'red' : getColor(itemData.Territory)
      );
    }
  };

  const hoverRenderer = (
    context: ojThematicMap.RendererContext<null, null, TerritoryDatum['Country'], null, null, TerritoryDatum>
  ) => {
    const rootElement = context.root as SVGElement | null;
    if (rootElement != null) {
      const group = rootElement.childNodes[0] as Element | undefined;
      const circle = group?.childNodes[3] as Element | undefined;
      circle?.setAttribute('r', context.state.hovered ? '20' : '10');
    }
  };

  const markerTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-marker
        location={$current.data.Country}
        shortDesc={`Sales Territory ${$current.data.Territory}`}
        color={getColor($current.data.Territory)}
      />
    );
  };

  return (
    <div id="mapdemo">
      <oj-thematic-map
        id="map1"
        zooming="auto"
        panning="auto"
        mapProvider={mapProvider}
        selectionMode="single"
        renderer={rendererFunc}
        selectionRenderer={selectionRenderer}
        hoverRenderer={hoverRenderer}
        markerData={dataProvider}
        class="demo-thematicmap-min-width"
      >
        <template slot="markerTemplate" render={markerTemplateRenderer} />
      </oj-thematic-map>
    </div>
  );
};

export default ThematicMapRenderer;
