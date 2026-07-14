import 'css!./demo.css';
import 'ojs/ojfilmstrip';
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import 'ojs/ojpagingcontrol';
import 'preact';
import { useEffect,useRef,useState } from 'preact/hooks';
import {
  filmStripDemoItems,
  getItemInitialDisplay,
  getVisibleIndexes,
  pagingDotsOptions,
  useFilmStripPagingModel,
  usePagingState
} from '../film-strip-demo-utils';

export const FilmStripFilmStripLazyRendering = () => {
  const filmStripRef = useRef<FilmStripElement>(null);
  const pagingModel = useFilmStripPagingModel(filmStripRef);
  const pagingState = usePagingState(pagingModel);
  const [renderedIndexes, setRenderedIndexes] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    const visibleIndexes = getVisibleIndexes(pagingState);

    if (visibleIndexes.length > 0) {
      setRenderedIndexes((previousIndexes) => {
        const nextIndexes = new Set(previousIndexes);
        visibleIndexes.forEach((index) => nextIndexes.add(index));
        return nextIndexes;
      });
    }
  }, [pagingState.endItemIndex, pagingState.startItemIndex]);

  const renderItem = (item: (typeof filmStripDemoItems)[number], index: number) => {
    const hasRendered = renderedIndexes.has(index);

    return (
      <div
        id={`lazyRendering-${item.id}`}
        class="oj-panel filmstrip-lazy-rendering-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-typography-bold oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index, 1) }}
      >
        <span>{hasRendered ? item.name : 'Fetching data...'}</span>
      </div>
    );
  };

  return (
    <div id="filmstrip-lazyrendering-example">
      <div class="oj-panel oj-sm-margin-4x">
        <oj-film-strip
          ref={filmStripRef}
          id="lazyRenderingFilmStrip"
          aria-label="Set of chemicals"
          arrowVisibility="hidden"
          maxItemsPerPage={1}
        >
          {filmStripDemoItems.map(renderItem)}
        </oj-film-strip>
      </div>
      {pagingModel ? (
        <div class="filmstrip-lazy-rendering-paging-control-container">
          <oj-paging-control
            id="lazyRenderingPagingControl"
            class="filmstrip-lazy-rendering-paging-control"
            data={pagingModel}
            pageSize={0}
            pageOptions={pagingDotsOptions}
          />
        </div>
      ) : null}
    </div>
  );
};

export default FilmStripFilmStripLazyRendering;
