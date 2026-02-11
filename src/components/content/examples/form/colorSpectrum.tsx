import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import "ojs/ojcolorspectrum";
import "ojs/ojswitch";
import "ojs/ojlabel";
import Color = require("ojs/ojcolor");

export const ColorSpectrum = () => {
  type ColorInfo = {
    color: Color;
    label?: string;
  };
  // Initial color
  const initialColor = new Color("#FF0000");

  // State for color values
  const [colorValue, setColorValue] = useState<Color>(new Color("#FF0000"));
  const [transientValue, setTransientValue] = useState<Color>(
    new Color("#FF0000"),
  );
  const [spectrumDisabled, setSpectrumDisabled] = useState<boolean>(false);

  // Event handlers
  const handleValueChanged = useCallback((event: any) => {
    setColorValue(event.detail.value as Color);
  }, []);

  const handleTransientValueChanged = useCallback((event: any) => {
    setTransientValue(event.detail.value as Color);
  }, []);

  const handleDisabledChanged = useCallback((event: any) => {
    setSpectrumDisabled(event.detail.value as boolean);
  }, []);

  const reset = useCallback(() => {
    setColorValue(initialColor);
    setTransientValue(initialColor);
  }, [initialColor]);

  return (
    <div id="colorSpectrumDemo">
      <div class="oj-flex oj-sm-margin-3x-horizontal">
        <div class="oj-flex-item oj-sm-margin-2x-vertical">
          <p class="bold oj-typography-subheading-xs">Initial</p>
          <div
            class="demo-color-preview demo-pointer"
            tabIndex={0}
            style={{ backgroundColor: initialColor.toString() }}
            onClick={reset}
          />
        </div>
        <div class="oj-flex-item oj-sm-margin-2x-vertical">
          <p class="bold oj-typography-subheading-xs">Current</p>
          <div
            class="demo-color-preview"
            style={{ backgroundColor: colorValue.toString() }}
          />
        </div>
        <div class="oj-flex-item oj-sm-margin-2x-vertical">
          <p class="bold oj-typography-subheading-xs">Transient Value</p>
          <div
            class="demo-color-preview"
            style={{ backgroundColor: transientValue.toString() }}
          />
        </div>
        <div class="oj-flex-item oj-sm-margin-2x-vertical">
          <oj-label id="switchLabel" for="switch">
            <p class="bold oj-typography-subheading-xs oj-text-color-primary">
              Disabled
            </p>
          </oj-label>
          <div class="oj-flex oj-sm-align-items-center">
            <oj-switch
              id="switch"
              value={spectrumDisabled}
              onvalueChanged={handleDisabledChanged}
            />
          </div>
        </div>
      </div>
      <br />
      <div class="oj-sm-margin-3x-horizontal">
        <div class="demo-color-panel oj-panel oj-panel-shadow-lg oj-sm-margin-4x-vertical">
          <oj-color-spectrum
            class="demo-color-spectrum"
            label-hint="Choose a color"
            label-edge="none"
            value={colorValue}
            onvalueChanged={handleValueChanged}
            ontransientValueChanged={handleTransientValueChanged}
            disabled={spectrumDisabled}
          />
        </div>
      </div>
    </div>
  );
};
