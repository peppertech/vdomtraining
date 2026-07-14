import 'css!./demo.css';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojthematicmap';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as data2000Text from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/data/electionData2000.json';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type ThematicMapProvider = ComponentProps<'oj-thematic-map'>['mapProvider'];
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];

const geo = JSON.parse(geoText as string);
const electionData = JSON.parse(data2000Text as string);
type ElectionDatum = (typeof electionData)[number];

export const ThematicMapAnimation = () => {
  const [electionYear, setElectionYear] = useState(2000);
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
  const areaData = useMemo(() => {
    return electionData.map((item: ElectionDatum, index: number) => ({
      id: index.toString(),
      color: (item.Democrat + electionYear) % 100 > item.Republican % 100 ? '#336791' : '#C53333',
      location: item.State,
      shortDesc: ((item.Democrat + electionYear) % 100 > item.Republican % 100 ? 'Democrat' : 'Republican') + ' win'
    }));
  }, [electionYear]);
  const areaDataProvider = useMemo(
    () => new ArrayDataProvider(areaData, { keyAttributes: 'id' }),
    [areaData]
  );
  const handleElectionYearChanged = (event: InputNumberValueChangedEvent) => {
    setElectionYear(event.detail.value ?? 2000);
  };

  return (
    <div id="mapdemo">
      <oj-form-layout aria-controls="map1" maxColumns={3}>
        <oj-input-number
          id="inputnumber1"
          labelHint="Election Year"
          max={2012}
          min={2000}
          step={4}
          value={electionYear}
          displayOptions={{ validatorHint: 'none' }}
          onvalueChanged={handleElectionYearChanged}
        />
      </oj-form-layout>
      <oj-thematic-map
        id="map1"
        animation-on-display="auto"
        animation-on-data-change="auto"
        areaData={areaDataProvider}
        mapProvider={mapProvider}
        class="demo-thematicmap-min-width"
      />
    </div>
  );
};

export default ThematicMapAnimation;
