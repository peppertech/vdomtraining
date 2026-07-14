import 'css!./demo.css';
import 'ojs/ojfilmstrip';
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import 'preact';
import { useRef } from 'preact/hooks';
import {
  filmStripDemoItems,
  getItemInitialDisplay,
  useFilmStripPagingModel,
  usePagingState
} from '../film-strip-demo-utils';

export const FilmStripFilmStripPagingText = () => {
  const filmStripRef = useRef<FilmStripElement>(null);
  const pagingModel = useFilmStripPagingModel(filmStripRef);
  const pagingState = usePagingState(pagingModel);
  const pageLabel =
    pagingState.pageCount > 0
      ? `Page ${pagingState.page + 1} of ${pagingState.pageCount}`
      : 'Page 1';

  const renderItem = (item: (typeof filmStripDemoItems)[number], index: number) => {
    return (
      <div
        id={`pagingText-${item.id}`}
        class="oj-panel filmstrip-paging-text-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index) }}
      >
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div id="filmstrip-pagingtext-example">
      <div
        class="filmstrip-paging-text-status oj-typography-body-md oj-sm-margin-4x"
        aria-live="polite"
      >
        {pageLabel}
      </div>
      <div id="filmStripDiv" class="oj-panel oj-sm-margin-4x">
        <oj-film-strip ref={filmStripRef} id="pagingTextFilmStrip" aria-label="Set of chemicals">
          {filmStripDemoItems.map(renderItem)}
        </oj-film-strip>
      </div>
    </div>
  );
};

export default FilmStripFilmStripPagingText;
