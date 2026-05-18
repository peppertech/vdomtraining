import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojfilmstrip';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'css!./demo.css';

type FilmStripArrowPlacement = ComponentProps<'oj-film-strip'>['arrowPlacement'];
type FilmStripArrowVisibility = ComponentProps<'oj-film-strip'>['arrowVisibility'];
type RadioSetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>
>[0];

type Chemical = {
  id: string;
  name: string;
};

export const FilmStripFilmStripNavArrows = () => {
  const [currentNavArrowPlacement, setCurrentNavArrowPlacement] =
    useState<FilmStripArrowPlacement>('adjacent');
  const [currentNavArrowVisibility, setCurrentNavArrowVisibility] =
    useState<FilmStripArrowVisibility>('auto');
  const chemicals = useMemo<Chemical[]>(
    () => [
      { id: 'hydrogen', name: 'Hydrogen' },
      { id: 'helium', name: 'Helium' },
      { id: 'lithium', name: 'Lithium' },
      { id: 'beryllium', name: 'Beryllium' },
      { id: 'boron', name: 'Boron' },
      { id: 'carbon', name: 'Carbon' },
      { id: 'nitrogen', name: 'Nitrogen' },
      { id: 'oxygen', name: 'Oxygen' },
      { id: 'fluorine', name: 'Fluorine' },
      { id: 'neon', name: 'Neon' },
      { id: 'sodium', name: 'Sodium' },
      { id: 'magnesium', name: 'Magnesium' }
    ],
    []
  );

  const handleCurrentNavArrowPlacementValueChanged = (event: RadioSetValueChangedEvent) => {
    setCurrentNavArrowPlacement(event.detail.value ?? 'adjacent');
  };

  const handleCurrentNavArrowVisibilityValueChanged = (event: RadioSetValueChangedEvent) => {
    setCurrentNavArrowVisibility(event.detail.value ?? 'auto');
  };

  const getItemInitialDisplay = (index: number): string => {
    return index < 3 ? '' : 'none';
  };

  const renderChemical = (chemical: Chemical, index: number) => {
    return (
      <div
        id={chemical.id}
        class="oj-panel demo-filmstrip-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index) }}
      >
        <span>{chemical.name}</span>
      </div>
    );
  };

  return (
    <div id="filmstrip-navarrows-example">
      <div class="oj-sm-margin-4x">
        <div class="demo-arrow-controls oj-sm-margin-8x-end">
          <oj-label id="navArrowPlacementLabel">Arrow placement</oj-label>
          <oj-radioset
            id="navArrowPlacementRadioset"
            labelledBy="navArrowPlacementLabel"
            onvalueChanged={handleCurrentNavArrowPlacementValueChanged}
            value={currentNavArrowPlacement}
          >
            <oj-option value="adjacent">Adjacent</oj-option>
            <oj-option value="overlay">Overlay</oj-option>
          </oj-radioset>
        </div>
        <div class="demo-arrow-visibility-controls">
          <oj-label id="navArrowVisibilityLabel">Arrow visibility</oj-label>
          <oj-radioset
            id="navArrowVisibilityRadioset"
            labelledBy="navArrowVisibilityLabel"
            onvalueChanged={handleCurrentNavArrowVisibilityValueChanged}
            value={currentNavArrowVisibility}
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
          arrowPlacement={currentNavArrowPlacement}
          arrowVisibility={currentNavArrowVisibility}
        >
          {chemicals.map(renderChemical)}
        </oj-film-strip>
      </div>
    </div>
  );
};

export default FilmStripFilmStripNavArrows;
