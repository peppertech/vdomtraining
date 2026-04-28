// @ts-nocheck
import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import * as Context from 'ojs/ojcontext';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import * as geoText from 'text!../data/cookbook/dataVisualizations/thematicMap/resources/maps/usa_states.json';
import { usaProj } from './usaProj';
import 'css!./demo.css';
import 'ojs/ojbutton';
import 'ojs/ojinputnumber';
import 'ojs/ojformlayout';
import 'ojs/ojthematicmap';
import '../../../../../jet-composites/demo-radioset-enum/loader';

const geo = JSON.parse(geoText as string);

export const ThematicMapPerformance = () => {
  const [animationValue, setAnimationValue] = useState('auto');
  const [labelValue, setLabelValue] = useState('off');
  const [numMarkers, setNumMarkers] = useState(30);
  const [timeValue, setTimeValue] = useState(undefined);
  const [markers, setMarkers] = useState([]);
  const mapProvider = useMemo(
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
  const generateRandomData = (markerCount: number) => {
    const data = [];
    for (let i = 0; i < markerCount; i++) {
      const randomValueX = -124 + Math.random() * 57;
      const randomValueY = 25 + Math.random() * 24;
      const projectedCoord = usaProj.project(randomValueX, randomValueY);
      if (projectedCoord) {
        const size = 10 + Math.random() * 20;
        const city = {
          id: i.toString(),
          x: projectedCoord.x,
          y: projectedCoord.y,
          width: size,
          height: size,
          color: handler.getValue(i.toString())
        };
        if (labelValue === 'on') city.label = 'Label for City ' + i.toString();
        data.push(city);
      }
    }
    return data;
  };
  const updateData = () => {
    setTimeValue(0);
    const busyContext = Context.getPageContext().getBusyContext();
    const data = generateRandomData(numMarkers);
    const start = new Date().getTime();
    setMarkers(data);
    busyContext.whenReady().then(() => {
      const end = new Date().getTime();
      setTimeValue(end - start);
    });
  };

  useEffect(() => {
    updateData();
  }, []);

  const timerText = timeValue > 0 ? 'Time:  ' + timeValue + 'ms' : '';

  return (
    <div id="tmap-container">
      <div class="oj-sm-padding-4x-horizontal">
        <oj-form-layout aria-controls="tmap1" maxColumns={3}>
          <oj-button id="updateButton" onojAction={updateData}>
            Regenerate Data
          </oj-button>
          <div class="oj-sm-padding-4x-horizontal">
            <div class="bold" id="timerText">
              {timerText}
            </div>
          </div>
          <oj-input-number
            id="markerCount"
            min={5}
            step={20}
            value={numMarkers}
            onvalueChanged={(event) => setNumMarkers(event.detail.value ?? 0)}
            labelHint="Markers"
            class="demo-thematicmap-perf-width-rem"
          />
          <demo-radioset-enum
            id="animationButtonSet1"
            labelHint="Animation"
            value={animationValue}
            onvalueChanged={(event) => setAnimationValue(event.detail.value ?? 'auto')}
            enumValues={['auto', 'none']}
          />
          <demo-radioset-enum
            id="animationButtonSet"
            value={labelValue}
            labelHint="Labels"
            onvalueChanged={(event) => {
              setLabelValue(event.detail.value ?? 'off');
              window.setTimeout(updateData, 0);
            }}
            enumValues={['on', 'off']}
          />
        </oj-form-layout>
      </div>
      <oj-thematic-map
        id="map1"
        animationOnDataChange={animationValue}
        markers={markers}
        mapProvider={mapProvider}
        class="demo-thematicmap-min-width"
      />
    </div>
  );
};

export default ThematicMapPerformance;
