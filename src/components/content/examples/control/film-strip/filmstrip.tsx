import "ojs/ojfilmstrip";
import "ojs/ojlabel";
import "ojs/ojoption";
import "ojs/ojradioset";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

type RadioSetProps = ComponentProps<"oj-radioset">;
type RadioValueChangedEvent = Parameters<NonNullable<RadioSetProps["onvalueChanged"]>>[0];

type Chemical = {
  id: string;
  name: string;
};

const chemicals: Chemical[] = [
  { id: "chemical1", name: "Acetone" },
  { id: "chemical2", name: "Benzene" },
  { id: "chemical3", name: "Citric Acid" },
  { id: "chemical4", name: "Dimethyl Sulfoxide" },
  { id: "chemical5", name: "Ethanol" },
  { id: "chemical6", name: "Formaldehyde" },
  { id: "chemical7", name: "Glycerol" },
  { id: "chemical8", name: "Hydrogen Peroxide" },
];

const INITIAL_VISIBLE_COUNT = 3;

const Filmstrip = () => {
  const [arrowPlacement, setArrowPlacement] = useState<RadioSetProps["value"]>("adjacent");
  const [arrowVisibility, setArrowVisibility] = useState<RadioSetProps["value"]>("auto");

  const handlePlacementChange = useCallback((event: RadioValueChangedEvent) => {
    setArrowPlacement(event.detail.value ?? "adjacent");
  }, []);

  const handleVisibilityChange = useCallback((event: RadioValueChangedEvent) => {
    setArrowVisibility(event.detail.value ?? "auto");
  }, []);

  const getItemInitialDisplay = useCallback((index: number) => {
    return index < INITIAL_VISIBLE_COUNT ? "block" : "none";
  }, []);

  const chemicalTiles = useMemo(
    () =>
      chemicals.map((chemical, index) => (
        <div
          key={chemical.id}
          id={chemical.id}
          class="oj-panel demo-filmstrip-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
          style={{ display: getItemInitialDisplay(index) }}
        >
          <span>{chemical.name}</span>
        </div>
      )),
    [getItemInitialDisplay],
  );

  return (
    <div id="filmstrip-navarrows-example" class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-sm-margin-4x demo-filmstrip-controls">
        <div class="demo-arrow-controls demo-filmstrip-controls__panel">
          <oj-label id="navArrowPlacementLabel">Arrow placement</oj-label>
          <oj-radioset
            id="navArrowPlacementRadioset"
            labelled-by="navArrowPlacementLabel"
            value={arrowPlacement}
            onvalueChanged={handlePlacementChange}
          >
            <oj-option value="adjacent">Adjacent</oj-option>
            <oj-option value="overlay">Overlay</oj-option>
          </oj-radioset>
        </div>

        <div class="demo-arrow-visibility-controls demo-filmstrip-controls__panel">
          <oj-label id="navArrowVisibilityLabel">Arrow visibility</oj-label>
          <oj-radioset
            id="navArrowVisibilityRadioset"
            labelled-by="navArrowVisibilityLabel"
            value={arrowVisibility}
            onvalueChanged={handleVisibilityChange}
          >
            <oj-option value="auto">Auto</oj-option>
            <oj-option value="visible">Visible</oj-option>
            <oj-option value="hover">Hover</oj-option>
            <oj-option value="hidden">Hidden</oj-option>
          </oj-radioset>
        </div>
      </div>

      <div id="filmStripDiv" class="oj-panel oj-sm-margin-4x">
        <oj-film-strip
          id="filmStrip"
          aria-label="Set of chemicals"
          arrowPlacement={arrowPlacement as "adjacent" | "overlay"}
          arrowVisibility={arrowVisibility as "auto" | "visible" | "hover" | "hidden"}
        >
          {chemicalTiles}
        </oj-film-strip>
      </div>
    </div>
  );
};

export default Filmstrip;
