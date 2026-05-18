import { useEffect, useState } from 'preact/hooks';
import Context = require('ojs/ojcontext');
import type { FilmStripElement } from 'ojs/ojfilmstrip';
import type { PagingModel } from 'ojs/ojpagingmodel';

export type FilmStripDemoItem = {
  id: string;
  name: string;
  detail: string;
};

export type PagingState = {
  page: number;
  pageCount: number;
  startItemIndex: number;
  endItemIndex: number;
  totalSize: number;
};

type PagingEventHandler = (event?: unknown) => void;
type EventfulPagingModel = PagingModel & {
  on?: (eventType: string, handler: PagingEventHandler) => void;
  off?: (eventType: string, handler: PagingEventHandler) => void;
};

export const filmStripDemoItems: FilmStripDemoItem[] = [
  {
    id: 'hydrogen',
    name: 'Hydrogen',
    detail: 'Hydrogen is the first element in the periodic table.'
  },
  {
    id: 'helium',
    name: 'Helium',
    detail: 'Helium is a light noble gas commonly used in balloons.'
  },
  {
    id: 'lithium',
    name: 'Lithium',
    detail: 'Lithium is an alkali metal used in rechargeable batteries.'
  },
  {
    id: 'beryllium',
    name: 'Beryllium',
    detail: 'Beryllium is a lightweight alkaline earth metal.'
  },
  {
    id: 'boron',
    name: 'Boron',
    detail: 'Boron is a metalloid used in glass and ceramics.'
  },
  {
    id: 'carbon',
    name: 'Carbon',
    detail: 'Carbon is the basis for organic chemistry.'
  },
  {
    id: 'nitrogen',
    name: 'Nitrogen',
    detail: "Nitrogen makes up most of the air in Earth's atmosphere."
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    detail: 'Oxygen supports respiration and combustion.'
  },
  {
    id: 'fluorine',
    name: 'Fluorine',
    detail: 'Fluorine is a highly reactive halogen.'
  },
  {
    id: 'neon',
    name: 'Neon',
    detail: 'Neon is a noble gas used in signs and lighting.'
  },
  {
    id: 'sodium',
    name: 'Sodium',
    detail: 'Sodium is a soft alkali metal.'
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    detail: 'Magnesium is a lightweight metal used in alloys.'
  }
];

export const pagingDotsOptions = { type: 'dots' } as const;

export const getItemInitialDisplay = (index: number, visibleCount = 3): string =>
  index < visibleCount ? '' : 'none';

const getPagingState = (pagingModel: PagingModel | null): PagingState => {
  if (!pagingModel) {
    return {
      page: 0,
      pageCount: 0,
      startItemIndex: 0,
      endItemIndex: 0,
      totalSize: 0
    };
  }

  return {
    page: Math.max(pagingModel.getPage(), 0),
    pageCount: Math.max(pagingModel.getPageCount(), 0),
    startItemIndex: Math.max(pagingModel.getStartItemIndex(), 0),
    endItemIndex: Math.max(pagingModel.getEndItemIndex(), 0),
    totalSize: Math.max(pagingModel.totalSize(), 0)
  };
};

export const getVisibleIndexes = ({ startItemIndex, endItemIndex }: PagingState): number[] => {
  if (endItemIndex < startItemIndex) {
    return [];
  }

  return Array.from(
    { length: endItemIndex - startItemIndex + 1 },
    (_value, offset) => startItemIndex + offset
  );
};

export const useFilmStripPagingModel = (filmStripRef: {
  current: FilmStripElement | null;
}): PagingModel | null => {
  const [pagingModel, setPagingModel] = useState<PagingModel | null>(null);

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

  return pagingModel;
};

export const usePagingState = (pagingModel: PagingModel | null): PagingState => {
  const [pagingState, setPagingState] = useState<PagingState>(() =>
    getPagingState(pagingModel)
  );

  useEffect(() => {
    if (!pagingModel) {
      setPagingState(getPagingState(null));
      return;
    }

    const eventfulPagingModel = pagingModel as EventfulPagingModel;
    const updatePagingState = () => setPagingState(getPagingState(pagingModel));

    updatePagingState();
    eventfulPagingModel.on?.('page', updatePagingState);
    eventfulPagingModel.on?.('pageCount', updatePagingState);
    eventfulPagingModel.on?.('pagecount', updatePagingState);

    return () => {
      eventfulPagingModel.off?.('page', updatePagingState);
      eventfulPagingModel.off?.('pageCount', updatePagingState);
      eventfulPagingModel.off?.('pagecount', updatePagingState);
    };
  }, [pagingModel]);

  return pagingState;
};
