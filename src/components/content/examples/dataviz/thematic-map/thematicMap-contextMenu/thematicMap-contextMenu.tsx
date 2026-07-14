import 'css!./demo.css';
import 'ojs/ojlegend';
import 'ojs/ojmenu';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojoption';
import { getColorValuesFromPalette } from 'ojs/ojpalette';
import 'ojs/ojthematicmap';
import { ojThematicMap } from 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/usaRainfall.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type RainfallDatum = {
  State: string;
  Inches: number;
};

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];
type ThematicMapSelection = NonNullable<ComponentProps<'oj-thematic-map'>['selection']>;

const geo = JSON.parse(geoText as string);
const rainfallData = JSON.parse(jsonDataText as string) as RainfallDatum[];

export const ThematicMapContextMenu = () => {
  const thematicMapRef = useRef<ojThematicMap<
    RainfallDatum['State'],
    null,
    null,
    RainfallDatum,
    null,
    null
  > | null>(null);
  const [selectedItemsValue, setSelectedItemsValue] = useState<ThematicMapSelection>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('(None selected yet)');
  const [activeState, setActiveState] = useState<RainfallDatum | null>(null);

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
      rainfallData.reduce<Record<string, RainfallDatum>>((map, item) => {
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

  const handleSelectionChanged = (event: DatavizValueChangedEvent<string[] | undefined>) => {
    setSelectedItemsValue(event.detail.value ?? []);
  };

  const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
    const target = event.detail.originalEvent.target as Element | null;
    let nextState: RainfallDatum | null = null;

    if (target?.id === 'map1') {
      const selection = selectedItemsValue;
      if (selection.length > 0) {
        nextState = stateToItemMap[String(selection[0])] ?? null;
      }
    } else if (target != null) {
      const context = thematicMapRef.current?.getContextByNode(target);
      if (context != null && context.subId === 'oj-thematicmap-area') {
        nextState = rainfallData[context.index] ?? null;
      }
    }

    setActiveState(nextState);
  };

  const menuItemAction = (event: ojMenu.ojMenuAction) => {
    const text = event.detail.selectedValue;
    if (activeState != null) {
      setSelectedMenuItem(`${text} from ${activeState.State}`);
    } else {
      setSelectedMenuItem(`${text} from Thematic Map background`);
    }
  };

  const areaTemplateRenderer = (area: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-area
        color={getRainfallColor(area.data.Inches)}
        location={area.data.State}
        shortDesc={`${area.data.Inches} inches of annual rainfall`}
      />
    );
  };

  return (
    <div id="mapdemo">
      <oj-thematic-map
        ref={thematicMapRef}
        id="map1"
        areaData={dataProvider}
        mapProvider={mapProvider}
        selectionMode="single"
        selection={selectedItemsValue}
        onselectionChanged={handleSelectionChanged}
        class="demo-thematicmap-min-width"
      >
        <template slot="areaTemplate" render={areaTemplateRenderer} />
        <oj-menu
          id="menu1"
          slot="contextMenu"
          aria-label="State Edit"
          onojMenuAction={menuItemAction}
          onojBeforeOpen={beforeOpenFunction}
        >
          <oj-option value="Action 1">Action 1</oj-option>
          <oj-option value="Action 2">Action 2</oj-option>
          <oj-option value="Action 3">Action 3</oj-option>
        </oj-menu>
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
      <div class="oj-sm-padding-1x">
        <div id="results" class="oj-typography-bold">
          Last selected menu item:
        </div>
        <div>{selectedMenuItem}</div>
      </div>
    </div>
  );
};

export default ThematicMapContextMenu;
