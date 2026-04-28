// @ts-nocheck
import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/usaRainfall.json';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import { ojPopup } from 'ojs/ojpopup';
import { ojThematicMap } from 'ojs/ojthematicmap';
import 'css!./demo.css';
import 'ojs/ojlegend';
import 'ojs/ojpopup';
import 'ojs/ojthematicmap';

type RainfallDatum = {
  State: string;
  Inches: number;
};

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];
type ThematicMapSelection = NonNullable<ComponentProps<'oj-thematic-map'>['selection']>;

const geo = JSON.parse(geoText as string);
const rainfallData = JSON.parse(jsonDataText as string) as RainfallDatum[];

export const ThematicMapPopup = () => {
  const [selectedItemsValue, setSelectedItemsValue] = useState<ThematicMapSelection>([]);
  const [popupText, setPopupText] = useState('');

  const colors = useMemo(() => getColorValuesFromPalette('viridis', 5), []);
  const mapProvider = useMemo<ThematicMapProvider>(
    () => ({
      geo,
      propertiesKeys: {
        id: 'Name',
        shortLabel: 'CC3',
        longLabel: 'Name'
      }
    }),
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(rainfallData, {
        keyAttributes: 'State'
      }),
    []
  );
  const legendSections = useMemo(
    () => [
      {
        items: [
          { text: '0-20', color: colors[0] },
          { text: '21-30', color: colors[1] },
          { text: '31-40', color: colors[2] },
          { text: '41-50', color: colors[3] },
          { text: '51+', color: colors[4] }
        ]
      }
    ],
    [colors]
  );
  const legendDataProvider = useMemo(
    () =>
      new ArrayDataProvider(legendSections, {
        keyAttributes: '@index'
      }),
    [legendSections]
  );
  const stateToItemMap = useMemo(
    () =>
      rainfallData.reduce<Record<string, RainfallDatum>>((map: any, item: any) => {
        map[item.State] = item;
        return map;
      }, {}),
    []
  );

  const getRainfallColor = (rainfall: number) => {
    if (rainfall <= 20) return colors[0];
    if (rainfall <= 30) return colors[1];
    if (rainfall <= 40) return colors[2];
    if (rainfall <= 50) return colors[3];
    return colors[4];
  };

  const handleSelectionChanged = (event: any) => {
    setSelectedItemsValue(event.detail.value ?? []);
  };

  const openPopup = (event: MouseEvent | KeyboardEvent) => {
    let popupArea: RainfallDatum | null = null;
    let pageX: number | undefined;
    let pageY: number | undefined;
    const target = event.target as Element | null;

    if ((target as HTMLElement | null)?.id === 'map1') {
      const selection = selectedItemsValue;
      if (selection.length > 0) {
        popupArea = stateToItemMap[String(selection[0])] ?? null;
      }
    } else if (target != null) {
      const map = document.getElementById('map1') as ojThematicMap<
        RainfallDatum['State'],
        null,
        null,
        RainfallDatum,
        null,
        null
      > | null;
      const context = map?.getContextByNode(target);
      if (context != null && context.subId === 'oj-thematicmap-area') {
        popupArea = rainfallData[context.index] ?? null;
        if (event instanceof MouseEvent) {
          pageX = event.pageX;
          pageY = event.pageY;
        }
      }
    }

    if (
      popupArea != null &&
      event instanceof KeyboardEvent &&
      event.key === 'Enter' &&
      target instanceof HTMLElement
    ) {
      pageX = target.offsetWidth / 2;
      pageY = target.offsetHeight / 5;
    }

    const popup = document.getElementById('popup1') as (HTMLElement & ojPopup) | null;
    if (popupArea != null && pageX != null && pageY != null && popup != null) {
      setPopupText(`${popupArea.Inches} inches of annual rainfall`);
      popup.open(null, {
        of: { x: pageX, y: pageY },
        my: { horizontal: 'start', vertical: 'bottom' },
        at: { horizontal: 'center', vertical: 'center' },
        collision: 'fit'
      });
    } else {
      popup?.close();
    }
  };

  const handleMapClick: NonNullable<ComponentProps<'oj-thematic-map'>['onClick']> = (event: any) => {
    openPopup(event as MouseEvent);
  };

  const handleMapKeyDown: NonNullable<ComponentProps<'oj-thematic-map'>['onKeyDown']> = (event: any) => {
    openPopup(event as KeyboardEvent);
  };

  const areaTemplateRenderer = (area: any) => {
    return (
      <oj-thematic-map-area
        color={getRainfallColor(area.data.Inches)}
        location={area.data.State}
        shortDesc={`${area.data.Inches} inches of annual rainfall`}
      />
    );
  };

  return (
    <Fragment>
      <div id="mapdemo">
        <oj-thematic-map
          id="map1"
          tooltipDisplay="none"
          onClick={handleMapClick}
          onKeyDown={handleMapKeyDown}
          selectionMode="single"
          selection={selectedItemsValue}
          onselectionChanged={handleSelectionChanged}
          mapProvider={mapProvider}
          areaData={dataProvider}
          class="demo-thematicmap-min-width"
        >
          <template slot="areaTemplate" render={areaTemplateRenderer} />
        </oj-thematic-map>
        <div class="oj-typography-bold oj-sm-margin-2x-top oj-helper-text-align-center">
          Annual Rainfall (Inches)
        </div>
        <oj-legend
          id="legend1"
          halign="center"
          orientation="horizontal"
          data={legendDataProvider}
          aria-label="legend showing annual rainfall categorised in five ranges"
        />
      </div>
      <oj-popup id="popup1">{popupText}</oj-popup>
    </Fragment>
  );
};

export default ThematicMapPopup;
