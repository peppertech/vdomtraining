import "ojs/ojcolorspectrum";
import type { ojColorSpectrum } from "ojs/ojcolorspectrum";
import "ojs/ojlabel";
import "ojs/ojswitch";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useState } from "preact/hooks";
import Color = require("ojs/ojcolor");

type SwitchValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-switch">["onvalueChanged"]>
>[0];
type ColorValueChangedEvent = ojColorSpectrum.valueChanged;
type ColorTransientValueChangedEvent = ojColorSpectrum.transientValueChanged;

const INITIAL_COLOR = new Color("#FF0000");

export default function ColorSpectrum() {
  const [colorValue, setColorValue] = useState<Color>(INITIAL_COLOR);
  const [transientValue, setTransientValue] = useState<Color>(INITIAL_COLOR);
  const [spectrumDisabled, setSpectrumDisabled] = useState(false);

  const handleValueChanged = useCallback((event: ColorValueChangedEvent) => {
    setColorValue(event.detail.value);
  }, []);

  const handleTransientValueChanged = useCallback(
    (event: ColorTransientValueChangedEvent) => {
      setTransientValue(event.detail.value);
    },
    [],
  );

  const handleDisabledChanged = useCallback((event: SwitchValueChangedEvent) => {
    setSpectrumDisabled(event.detail.value);
  }, []);

  const reset = useCallback(() => {
    setColorValue(INITIAL_COLOR);
    setTransientValue(INITIAL_COLOR);
  }, []);

  return (
    <div id="colorSpectrumDemo">
      <div class="oj-flex oj-sm-margin-3x-horizontal">
        <div class="oj-flex-item oj-sm-margin-2x-vertical">
          <p class="bold oj-typography-subheading-xs">Initial</p>
          <div
            class="demo-color-preview demo-pointer"
            tabIndex={0}
            style={{ backgroundColor: INITIAL_COLOR.toString() }}
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
}
