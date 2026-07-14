import 'css!./demo.css';
import 'ojs/ojfilmstrip';
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import 'ojs/ojpagingcontrol';
import 'preact';
import { useRef } from 'preact/hooks';
import {
  filmStripDemoItems,
  getItemInitialDisplay,
  pagingDotsOptions,
  useFilmStripPagingModel
} from '../film-strip-demo-utils';

export const FilmStripFilmStripOverlaidNavDots = () => {
  const filmStripRef = useRef<FilmStripElement>(null);
  const pagingModel = useFilmStripPagingModel(filmStripRef);

  const renderItem = (item: (typeof filmStripDemoItems)[number], index: number) => {
    return (
      <div
        id={`overlaidNavDots-${item.id}`}
        class="oj-panel filmstrip-overlaid-navdots-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index, 1) }}
      >
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div id="filmstrip-overlaidpagingcontrol-example">
      <div class="filmstrip-overlaid-navdots-container oj-panel oj-sm-margin-4x">
        <oj-film-strip
          ref={filmStripRef}
          id="overlaidNavDotsFilmStrip"
          aria-label="Set of chemicals"
          arrowVisibility="hidden"
          maxItemsPerPage={1}
        >
          {filmStripDemoItems.map(renderItem)}
        </oj-film-strip>
        {pagingModel ? (
          <oj-paging-control
            id="overlaidPagingControl"
            class="filmstrip-overlaid-navdots-paging-control"
            data={pagingModel}
            pageSize={0}
            pageOptions={pagingDotsOptions}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FilmStripFilmStripOverlaidNavDots;
