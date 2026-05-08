import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { ojColorSpectrum } from 'ojs/ojcolorspectrum';
import Color = require('ojs/ojcolor');
import ColorConverter = require('ojs/ojconverter-color');
import 'ojs/ojcolorspectrum';
import 'ojs/ojlabel';
import "css!./demo.css";

export const ConvertersColorConverters = () => {
  const initialColor = useMemo(() => new Color('rgba(21,0,255,0.8)'), []);
  const [colorValue, setColorValue] = useState<Color>(initialColor);
  const [hslColor, setHslColor] = useState<string>('');
  const [hexColor, setHexColor] = useState<string>('');
  const [rgbColor, setRgbColor] = useState<string>('');
  const [hsvColor, setHsvColor] = useState<string>('');
  const [hex3Color, setHex3Color] = useState<string>('');

  const updateColor = (event: ojColorSpectrum.valueChanged | ojColorSpectrum.transientValueChanged) => {
      let value = event.detail.value;
      setColorValue(value);
      formatColor(value);
  };

  const formatColor = (color: Color) => {
      let cvHSL = new ColorConverter({ format: 'hsl' });
      let cvHEX = new ColorConverter({ format: 'hex' });
      let cvRGB = new ColorConverter({ format: 'rgb' });
      let cvHEX3 = new ColorConverter({ format: 'hex3' });
      let cvHSV = new ColorConverter({ format: 'hsv' });
      let cvHSL_format = cvHSL.format(color);
      let cvHEX_format = cvHEX.format(color);
      let cvRGB_format = cvRGB.format(color);
      let cvHEX3_format = cvHEX3.format(color);
      let cvHSV_format = cvHSV.format(color);
      if (cvHSL_format != null) {
          setHslColor(cvHSL_format);
      }
      if (cvHEX_format != null) {
          setHexColor(cvHEX_format);
      }
      if (cvRGB_format != null) {
          setRgbColor(cvRGB_format);
      }
      if (cvHEX3_format != null) {
          setHex3Color(cvHEX3_format);
      }
      if (cvHSV_format != null) {
          setHsvColor(cvHSV_format);
      }
  };

  return (
      <div id="colorSpectrumDemo" class="oj-flex demo-margin">
            <div>
                    <oj-label id="mainlabelid">Color spectrum</oj-label>
                    <div class="oj-panel oj-panel-shadow-lg">
                              <oj-color-spectrum labelledBy="mainlabelid" value={colorValue} onvalueChanged={updateColor} ontransientValueChanged={updateColor} />
                          </div>
                </div>
            <div class="demo-color-values">
                    <div class="demo-margin">
                              rgb value:
                              <span>{rgbColor}</span>
                          </div>
                    <div class="demo-margin">
                              hsl value:
                              <span>{hslColor}</span>
                          </div>
                    <div class="demo-margin">
                              hsv value:
                              <span>{hsvColor}</span>
                          </div>
                    <div class="demo-margin">
                              hex value:
                              <span>{hexColor}</span>
                          </div>
                    <div class="demo-margin">
                              hex3 value:
                              <span>{hex3Color}</span>
                          </div>
                </div>
        </div>
    );
};

export default ConvertersColorConverters;
