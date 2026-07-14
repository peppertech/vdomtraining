import 'css!./demo.css';
import 'ojs/ojfilmstrip';
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import 'ojs/ojpagingcontrol';
import type { PagingModel } from 'ojs/ojpagingmodel';
import 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import Context = require('ojs/ojcontext');

type Chemical = {
  id: string;
  name: string;
};

const pagingOptions = { type: 'dots' } as const;

export const FilmStripFilmStripNavDots = () => {
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
        class="oj-panel filmstrip-navdots-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index) }}
      >
        <span>{chemical.name}</span>
      </div>
    );
  };

  return (
    <div id="filmstrip-navdots-example">
      <div id="filmStripDiv" class="oj-panel oj-sm-margin-4x">
        <oj-film-strip
          ref={filmStripRef}
          id="filmStrip"
          aria-label="Set of chemicals"
          arrowVisibility="hidden"
        >
          {chemicals.map(renderChemical)}
        </oj-film-strip>
      </div>
      {pagingModel ? (
        <div class="filmstrip-navdots-paging-control-container">
          <oj-paging-control
            id="pagingControl"
            class="filmstrip-navdots-paging-control"
            data={pagingModel}
            pageSize={0}
            pageOptions={pagingOptions}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilmStripFilmStripNavDots;
