import { h } from 'preact';
import { useRef } from 'preact/hooks';
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import 'ojs/ojfilmstrip';
import 'ojs/ojpagingcontrol';
import 'css!./demo.css';
import {
  filmStripDemoItems,
  getItemInitialDisplay,
  pagingDotsOptions,
  useFilmStripPagingModel
} from '../film-strip-demo-utils';

export const FilmStripFilmStripStretchItems = () => {
  const filmStripRef = useRef<FilmStripElement>(null);
  const pagingModel = useFilmStripPagingModel(filmStripRef);

  const renderItem = (item: (typeof filmStripDemoItems)[number], index: number) => {
    return (
      <div
        id={`stretchItems-${item.id}`}
        class="oj-panel filmstrip-stretch-items-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index, 1) }}
      >
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div id="filmstrip-stretchitems-example">
      <div class="filmstrip-stretch-items-container oj-panel oj-sm-margin-4x">
        <oj-film-strip
          ref={filmStripRef}
          id="stretchItemsFilmStrip"
          class="filmstrip-stretch-items-filmstrip"
          aria-label="Set of chemicals"
          arrowVisibility="hidden"
          maxItemsPerPage={1}
        >
          {filmStripDemoItems.map(renderItem)}
        </oj-film-strip>
        {pagingModel ? (
          <oj-paging-control
            id="stretchItemsPagingControl"
            class="filmstrip-stretch-items-paging-control"
            data={pagingModel}
            pageSize={0}
            pageOptions={pagingDotsOptions}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FilmStripFilmStripStretchItems;
