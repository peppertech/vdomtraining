import { h } from 'preact';
import { useRef } from 'preact/hooks';
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import 'ojs/ojdefer';
import 'ojs/ojfilmstrip';
import 'ojs/ojpagingcontrol';
import 'css!./demo.css';
import {
  filmStripDemoItems,
  getItemInitialDisplay,
  pagingDotsOptions,
  useFilmStripPagingModel
} from '../film-strip-demo-utils';

export const FilmStripFilmStripDeferredRendering = () => {
  const filmStripRef = useRef<FilmStripElement>(null);
  const pagingModel = useFilmStripPagingModel(filmStripRef);

  const renderItem = (item: (typeof filmStripDemoItems)[number], index: number) => {
    return (
      <div
        id={`deferredRendering-${item.id}`}
        class="oj-panel filmstrip-deferred-rendering-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index, 1) }}
      >
        {h('oj-defer', null, <span>{item.name}</span>)}
      </div>
    );
  };

  return (
    <div id="filmstrip-deferredrendering-example">
      <div class="oj-panel oj-sm-margin-4x">
        <oj-film-strip
          ref={filmStripRef}
          id="deferredRenderingFilmStrip"
          aria-label="Set of chemicals"
          arrowVisibility="hidden"
          maxItemsPerPage={1}
        >
          {filmStripDemoItems.map(renderItem)}
        </oj-film-strip>
      </div>
      {pagingModel ? (
        <div class="filmstrip-deferred-rendering-paging-control-container">
          <oj-paging-control
            id="deferredRenderingPagingControl"
            class="filmstrip-deferred-rendering-paging-control"
            data={pagingModel}
            pageSize={0}
            pageOptions={pagingDotsOptions}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilmStripFilmStripDeferredRendering;
