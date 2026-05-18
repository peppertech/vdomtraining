import { h } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import Context = require('ojs/ojcontext');
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import type { PagingModel } from 'ojs/ojpagingmodel';
import 'ojs/ojfilmstrip';
import 'ojs/ojpagingcontrol';
import 'css!./demo.css';

type Chemical = {
  id: string;
  name: string;
};

const pagingOptions = { type: 'dots', orientation: 'vertical' } as const;

export const FilmStripVerticalFilmStripNavDots = () => {
  const filmStripRef = useRef<FilmStripElement>(null);
  const [pagingModel, setPagingModel] = useState<PagingModel | null>(null);
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

  useEffect(() => {
    let isMounted = true;
    const filmStrip = filmStripRef.current;

    if (filmStrip) {
      Context.getContext(filmStrip)
        .getBusyContext()
        .whenReady()
        .then(() => {
          if (isMounted) {
            setPagingModel(filmStrip.getPagingModel());
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const getItemInitialDisplay = (index: number): string => {
    return index < 3 ? '' : 'none';
  };

  const renderChemical = (chemical: Chemical, index: number) => {
    return (
      <div
        id={chemical.id}
        class="oj-panel filmstrip-vertical-navdots-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index) }}
      >
        <span>{chemical.name}</span>
      </div>
    );
  };

  return (
    <div id="filmstrip-verticalnavdots-example">
      <div class="filmstrip-vertical-navdots-outer-container oj-panel oj-sm-margin-4x">
        <div class="filmstrip-vertical-navdots-wrapper">
          <oj-film-strip
            ref={filmStripRef}
            id="verticalFilmStrip"
            class="filmstrip-vertical-navdots-filmstrip"
            aria-label="Set of chemicals"
            orientation="vertical"
            arrowVisibility="hidden"
          >
            {chemicals.map(renderChemical)}
          </oj-film-strip>
        </div>
        {pagingModel ? (
          <div class="filmstrip-vertical-navdots-paging-container">
            <oj-paging-control
              id="verticalPagingControl"
              data={pagingModel}
              pageSize={0}
              pageOptions={pagingOptions}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FilmStripVerticalFilmStripNavDots;
