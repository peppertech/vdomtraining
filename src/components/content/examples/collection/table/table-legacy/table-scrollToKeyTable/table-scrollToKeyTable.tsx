import 'ojs/ojbutton';
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojswitch';
import 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

interface TableData {
  id: string;
  name: string;
  date: string;
  creator: string;
}

type SwitchChangedEvent = Parameters<NonNullable<ComponentProps<'oj-switch'>['onvalueChanged']>>[0];
type ScrollPositionChangedEvent = Parameters<NonNullable<ComponentProps<'oj-table'>['onscrollPositionChanged']>>[0];

export const TableScrollToKeyTable = () => {
  const arr = useMemo<TableData[]>(
    () =>
      Array.from({ length: 100 }, (_, index) => {
        const itemNumber = index + 1;

        return {
          id: `i${itemNumber}`,
          name: `Note item ${itemNumber}`,
          date: '1/1/18',
          creator: `Owner ${itemNumber}`
        };
      }),
    []
  );
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(
    () => [
      {
        headerText: 'Note Id',
        field: 'id',
        headerClassName: 'oj-sm-only-hide',
        className: 'oj-sm-only-hide',
        id: 'id'
      },
      { headerText: 'Note Title', field: 'name', id: 'title' },
      {
        headerText: 'Creation Date',
        field: 'date',
        headerClassName: 'oj-sm-only-hide',
        className: 'oj-sm-only-hide',
        id: 'date'
      },
      { headerText: 'Created By', field: 'creator', id: 'creator' }
    ],
    []
  );
  const [dataArray, setDataArray] = useState<TableData[]>(arr);
  const [scrollToKey, setScrollToKey] = useState<'capability' | 'never'>('capability');
  const [scrollPos, setScrollPos] = useState<NonNullable<ComponentProps<'oj-table'>['scrollPosition']>>({ rowIndex: 1 });
  const dataProvider = useMemo(
    () => new ArrayDataProvider<TableData['id'], TableData>(dataArray, { keyAttributes: 'id' }),
    [dataArray]
  );
  const scrollToSelected = scrollToKey === 'capability';
  const selectedRow = useMemo(() => new KeySetImpl<TableData['id']>().add(['i6']), []);

  const handleScrollPosScrollPositionChanged = (event: ScrollPositionChangedEvent) => {
    setScrollPos((event.detail.value ?? {}) as NonNullable<ComponentProps<'oj-table'>['scrollPosition']>);
  };

  const handleScrollToSelectedValueChanged = (event: SwitchChangedEvent) => {
    setScrollToKey(event.detail.value ? 'capability' : 'never');
  };

  const refresh = () => {
    setDataArray((current) => current.slice());
  };

  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'title' },
    selectionMode: { row: 'single' },
    selected: { row: selectedRow },
    scrollPolicyOptions: { fetchSize: 10 }
  };

  return (
    <div id="tableContainer">
      <p>
        Select a row, then either hit the refresh button or sort the column to update the Table. If scrollByKey behavior is set to 'capability' then Table should scroll to the selected item.
      </p>
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-switch id="switch" value={scrollToSelected} labelHint="Scroll to selected" onvalueChanged={handleScrollToSelectedValueChanged} />
      </div>
      <oj-button id="refreshButton" onojAction={refresh}>
        Refresh
      </oj-button>
      <oj-table
        id="table"
        aria-label="Notes"
        data={dataProvider}
        scrollToKey={scrollToKey}
        onscrollPositionChanged={handleScrollPosScrollPositionChanged}
        scrollPosition={scrollPos}
        scrollPolicy="loadMoreOnScroll"
        columns={columns}
        class="demo-table-container"
        {...ojTableProps}
      />
    </div>
  );
};

export default TableScrollToKeyTable;
