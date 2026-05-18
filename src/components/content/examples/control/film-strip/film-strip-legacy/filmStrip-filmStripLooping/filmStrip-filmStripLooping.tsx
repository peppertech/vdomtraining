import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import 'ojs/ojfilmstrip';
import 'ojs/ojradioset';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import "css!./demo.css";

type LoopingChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];

export const FilmStripFilmStripLooping = () => {
  const [currentLooping, setCurrentLooping] = useState<'page' | 'off'>('page');

  const chemicals = useMemo(() => [
      { name: 'Hydrogen' },
      { name: 'Helium' },
      { name: 'Lithium' },
      { name: 'Beryllium' },
      { name: 'Boron' },
      { name: 'Carbon' },
      { name: 'Nitrogen' },
      { name: 'Oxygen' },
      { name: 'Fluorine' },
      { name: 'Neon' },
      { name: 'Sodium' },
      { name: 'Magnesium' }
  ], []);

  const handleCurrentLoopingValueChanged = (event: LoopingChangedEvent) => {
    setCurrentLooping((event.detail.value as 'page' | 'off' | null) ?? 'page');
  };

  const getItemInitialDisplay = (index: number): string => {
      return index < 3 ? '' : 'none';
  };

  return (
      <div id="filmstrip-looping-example">
            <div class="oj-sm-margin-4x">
                    <oj-label id="navLoopingLabel">Looping</oj-label>
                    <oj-radioset id="navLoopingRadioset" labelledBy="navLoopingLabel" onvalueChanged={handleCurrentLoopingValueChanged} value={currentLooping}>
                              <oj-option value="page">Page</oj-option>
                              <oj-option value="off">Off</oj-option>
                          </oj-radioset>
                </div>
            <div id="filmStripDiv" class="oj-panel oj-sm-margin-4x">
                    <oj-film-strip id="filmStrip" aria-label="Set of chemicals" looping={currentLooping}>
                              {
                                        chemicals.map((chemical, index: number) => (
                                          <>
                                            <div class="oj-panel demo-filmstrip-item oj-bg-info-30 oj-typography-bold oj-helper-text-align-center oj-sm-margin-2x oj-text-color-primary" style={{ display: getItemInitialDisplay(index) }}><span>{chemical.name}</span></div>
                                          </>
                                        ))
                                      }
                          </oj-film-strip>
                </div>
        </div>
    );
};

export default FilmStripFilmStripLooping;

