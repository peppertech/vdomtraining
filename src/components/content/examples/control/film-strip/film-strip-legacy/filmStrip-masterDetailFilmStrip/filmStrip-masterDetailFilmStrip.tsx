import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import 'ojs/ojfilmstrip';
import 'css!./demo.css';
import {
  filmStripDemoItems,
  getItemInitialDisplay,
  useFilmStripPagingModel
} from '../film-strip-demo-utils';

type FilmStripCurrentItemChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-film-strip'>['oncurrentItemChanged']>
>[0];

export const FilmStripMasterDetailFilmStrip = () => {
  const detailFilmStripRef = useRef<FilmStripElement>(null);
  const masterFilmStripRef = useRef<FilmStripElement>(null);
  const detailPagingModel = useFilmStripPagingModel(detailFilmStripRef);
  const masterPagingModel = useFilmStripPagingModel(masterFilmStripRef);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    detailPagingModel?.setPage(selectedIndex).catch(() => undefined);

    if (masterPagingModel && masterFilmStripRef.current) {
      const itemsPerPage = Math.max(masterFilmStripRef.current.getItemsPerPage(), 1);
      const masterPage = Math.floor(selectedIndex / itemsPerPage);
      masterPagingModel.setPage(masterPage).catch(() => undefined);
    }
  }, [detailPagingModel, masterPagingModel, selectedIndex]);

  const handleDetailCurrentItemChanged = (event: FilmStripCurrentItemChangedEvent) => {
    const index = event.detail.value?.index;

    if (typeof index === 'number') {
      setSelectedIndex(index);
    }
  };

  const selectItem = (index: number) => {
    setSelectedIndex(index);
  };

  const handleMasterItemKeyDown = (event: KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectItem(index);
    }
  };

  const renderDetailItem = (item: (typeof filmStripDemoItems)[number], index: number) => {
    return (
      <div
        id={`detail-${item.id}`}
        class="oj-panel filmstrip-master-detail-detail-item oj-bg-info-30 oj-sm-margin-2x oj-helper-text-align-center oj-text-color-primary"
        style={{ display: getItemInitialDisplay(index, 1) }}
      >
        <div class="oj-typography-heading-sm oj-typography-bold">{item.name}</div>
        <div class="oj-typography-body-sm oj-sm-margin-2x-top">{item.detail}</div>
      </div>
    );
  };

  const renderMasterItem = (item: (typeof filmStripDemoItems)[number], index: number) => {
    const isSelected = index === selectedIndex;

    return (
      <div
        id={`master-${item.id}`}
        class={`oj-panel filmstrip-master-detail-master-item oj-sm-margin-1x oj-helper-text-align-center oj-typography-bold ${
          isSelected ? 'filmstrip-master-detail-master-item-selected oj-bg-brand-30' : 'oj-bg-neutral-30'
        }`}
        role="button"
        tabIndex={0}
        aria-pressed={isSelected}
        onClick={() => selectItem(index)}
        onKeyDown={(event) => handleMasterItemKeyDown(event as KeyboardEvent, index)}
        style={{ display: getItemInitialDisplay(index, 4) }}
      >
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div id="filmstrip-masterdetail-example">
      <div class="filmstrip-master-detail-detail-section oj-panel oj-sm-margin-4x">
        <oj-film-strip
          ref={detailFilmStripRef}
          id="detailFilmStrip"
          aria-label="Selected chemical details"
          maxItemsPerPage={1}
          oncurrentItemChanged={handleDetailCurrentItemChanged}
        >
          {filmStripDemoItems.map(renderDetailItem)}
        </oj-film-strip>
      </div>
      <div class="oj-panel oj-sm-margin-4x">
        <oj-film-strip
          ref={masterFilmStripRef}
          id="masterFilmStrip"
          aria-label="Chemical choices"
          maxItemsPerPage={4}
        >
          {filmStripDemoItems.map(renderMasterItem)}
        </oj-film-strip>
      </div>
    </div>
  );
};

export default FilmStripMasterDetailFilmStrip;
