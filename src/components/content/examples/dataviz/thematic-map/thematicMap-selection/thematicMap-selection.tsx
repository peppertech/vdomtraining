import 'css!./demo.css';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojformlayout';
import 'ojs/ojlegend';
import 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/sodaPop.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];
type SelectionMode = NonNullable<ComponentProps<'oj-thematic-map'>['selectionMode']>;
type ThematicMapSelectionChanged = Parameters<NonNullable<ComponentProps<'oj-thematic-map'>['onselectionChanged']>>[0];

const geo = JSON.parse(geoText as string);
const sodaData = JSON.parse(jsonDataText as string);

export const ThematicMapSelection = () => {
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('multiple');
  const [selectionValue, setSelectionValue] = useState([3, 28, 39]);
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
  const handler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider(sodaData, {
        keyAttributes: '@index'
      }),
    []
  );
  const legendDataProvider = useMemo(
    () =>
      new ArrayDataProvider([{ text: 'soda' }, { text: 'pop' }, { text: 'coke' }], {
        keyAttributes: 'text'
      }),
    []
  );
  const getColor = (value: string) => handler.getValue(value);
  const selectionText = useMemo(() => {
    let items = '';
    selectionValue.forEach((index) => {
      const area = sodaData[index];
      if (area) {
        items += 'location: ' + area.state + ', value: ' + area.sodaVsPop + '; ';
      }
    });
    return items;
  }, [selectionValue]);
  const handleSelectionModeChanged = (event: DatavizValueChangedEvent<SelectionMode | null>) => {
    const nextMode = event.detail.value ?? 'multiple';
    setSelectionMode(nextMode);
    if (nextMode === 'multiple') setSelectionValue([3, 28, 39]);
    else if (nextMode === 'single') setSelectionValue([28]);
    else setSelectionValue([]);
  };
  const areaTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-thematic-map-area
        location={$current.data.state}
        shortDesc={$current.data.sodaVsPop}
        color={getColor($current.data.sodaVsPop)}
      />
    );
  };
  const itemTemplateRenderer = ($current: DatavizTemplateContext<DatavizChartDatum>) => {
    return (
      <oj-legend-item
        shortDesc={$current.data.text}
        text={$current.data.text}
        markerShape="square"
        color={getColor($current.data.text)}
      />
    );
  };

  return (
    <div id="mapdemo">
      <oj-form-layout aria-controls="map1">
        <demo-radioset-enum
          id="radioButtonset"
          direction="row"
          labelHint="Data Layer Selection"
          value={selectionMode}
          onvalueChanged={handleSelectionModeChanged}
          enumValues={['none', 'single', 'multiple']}
        />
      </oj-form-layout>
      <oj-thematic-map
        id="map1"
        animationOnDisplay="auto"
        mapProvider={mapProvider}
        selectionMode={selectionMode}
        selection={selectionValue}
        onselectionChanged={(event: ThematicMapSelectionChanged) =>
          setSelectionValue((event.detail.value ?? []).filter((value): value is number => typeof value === 'number'))
        }
        areaData={dataProvider}
        class="demo-thematicmap-min-width"
      >
        <template slot="areaTemplate" render={areaTemplateRenderer} />
      </oj-thematic-map>
      <oj-legend
        id="legend1"
        halign="center"
        orientation="horizontal"
        data={legendDataProvider}
        class="demo-thematicmap-selection-height"
      >
        <template slot="itemTemplate" render={itemTemplateRenderer} />
      </oj-legend>
      <div class="oj-sm-padding-1x">
        <div class="oj-typography-heading-xs oj-typography-bold oj-sm-margin-2x-vertical">
          Selected Areas:
        </div>
        <div id="selectedObjects">{selectionText}</div>
      </div>
    </div>
  );
};

export default ThematicMapSelection;
