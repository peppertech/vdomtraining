import "ojs/ojbutton";
import "ojs/ojcolorpalette";
import "ojs/ojlabel";
import "ojs/ojoption";
import "ojs/ojswitch";
import 'preact';
import { type ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";
import Color = require("ojs/ojcolor");

type SwatchSizeEvent = Parameters<
  NonNullable<ComponentProps<"oj-buttonset-one">["onvalueChanged"]>
>[0];
type ColorValueEvent = Parameters<
  NonNullable<ComponentProps<"oj-color-palette">["onvalueChanged"]>
>[0];
type SwatchSize = "xs" | "sm" | "lg";

interface SwatchSizeOption {
  size: SwatchSize;
  disabled?: boolean;
}

type ColorInfo = {
  color: Color;
  label?: string;
};

export const ColorPalette = () => {
  // State for swatch size
  const [swatchSize, setSwatchSize] = useState<SwatchSize>("sm");

  // State for selected color
  const [colorValue, setColorValue] = useState<Color>(new Color("#FF0000"));

  // Swatch size options
  const swatchSizes: SwatchSizeOption[] = useMemo(
    () => [{ size: "xs" }, { size: "sm" }, { size: "lg" }],
    [],
  );

  // Color palette data
  const mypalette: Array<{ color: Color; label?: string }> = useMemo(
    () => [
      { color: Color.TRANSPARENT, label: "None" },
      { color: new Color("#FF0000"), label: "Red" },
      { color: new Color("#00FF00"), label: "Green" },
      { color: new Color("#0000FF"), label: "Blue" },
      { color: new Color("#FFFF00"), label: "Yellow" },
      { color: new Color("#FF00FF"), label: "Magenta" },
      { color: new Color("#00FFFF"), label: "Cyan" },
      { color: new Color("#000000"), label: "Black" },
      { color: new Color("#FFFFFF"), label: "White" },
      { color: new Color("#808080"), label: "Gray" },
      { color: new Color("#FFA500"), label: "Orange" },
      { color: new Color("#800080"), label: "Purple" },
      { color: new Color("#008000"), label: "Dark Green" },
      { color: new Color("#000080"), label: "Navy" },
      { color: new Color("#800000"), label: "Maroon" },
      { color: new Color("#808000"), label: "Olive" },
      { color: new Color("#008080"), label: "Teal" },
    ],
    [],
  );

  // Event handlers
  const handleSwatchSizeChanged = useCallback((event: SwatchSizeEvent) => {
    setSwatchSize(event.detail.value as SwatchSize);
  }, []);

  const handleColorValueChanged = useCallback((event: ColorValueEvent) => {
    setColorValue(event.detail.value as Color);
  }, []);

  // Get color string for preview
  const getColorString = useCallback(() => {
    return colorValue ? colorValue.toString() : "transparent";
  }, [colorValue]);

  // Check if color is transparent/none
  const isTransparent = useCallback(() => {
    return colorValue && colorValue.getRGBA().a === 0;
  }, [colorValue]);

  return (
    <div id="colorPaletteDemo" class="oj-web-applayout-max-width oj-web-applayout-content">
        <div class="oj-flex-item oj-sm-padding-2x-horizontal">
          <p class="bold">Swatch size</p>
          <oj-buttonset-one
            id="swatchSizesSet"
            aria-label="Swatch size"
            value={swatchSize}
            onvalueChanged={handleSwatchSizeChanged}
            class="oj-buttonset-width-auto"
          >
            {swatchSizes.map((option) => (
              <oj-option
                key={option.size}
                value={option.size}
                disabled={option.disabled || false}
              >
                <span>{option.size}</span>
              </oj-option>
            ))}
          </oj-buttonset-one>
        </div>
      <br />
      <br />
      <div class="oj-sm-padding-2x-horizontal">
        <p class="bold">Selected color</p>
        <div
          class="demo-palette-preview oj-helper-text-align-center"
          style={{ backgroundColor: getColorString() }}
        >
          <span class="demo-text">{isTransparent() ? "None" : null}</span>
        </div>
      </div>
      <div
        class={`demo-palette-panel oj-panel oj-panel-shadow-lg oj-sm-margin-0-horizontal oj-md-margin-2x-horizontal demo-container-size-${swatchSize}`}
      >
        <div class="demo-palette-inner-panel">
          <oj-color-palette
            class="demo-palette-picker"
            palette={mypalette}
            swatchSize={swatchSize}
            value={colorValue}
            onvalueChanged={handleColorValueChanged}
          />
        </div>
      </div>
    </div>
  );
};
