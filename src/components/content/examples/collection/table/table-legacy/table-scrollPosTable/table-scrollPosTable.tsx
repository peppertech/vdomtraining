import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';
import 'ojs/ojdatasource-common';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojformlayout';
import 'ojs/ojbutton';
import 'ojs/ojoption';

interface ColumnOption {
    headerText: string;
    field: string;
    id: string;
}

interface TableData {
    id: string;
    data: Array<string>;
}

type TableScrollPosition = NonNullable<ComponentProps<'oj-table'>['scrollPosition']>;
type ScrollPolicyValue = 'loadMoreOnScroll' | 'loadAll';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type ScrollPosition = {
    x?: number | null;
    y?: number | null;
    rowIndex?: number | null;
    columnIndex?: number | null;
    rowKey?: string | null;
    columnKey?: string | null;
    offsetY?: number | null;
    offsetX?: number | null;
};

export const TableScrollPosTable = () => {
  const [scrollPolicyValue, setScrollPolicyValue] = useState<ScrollPolicyValue>('loadMoreOnScroll');
  const [scrollPosValue, setScrollPosValue] = useState<ScrollPosition>({});
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Id', field: 'id', id: 'id' }
  ], []);
  const dataArray = useMemo<Array<TableData>>(() => [], []);
  const rowPixel = scrollPosValue?.y;
  const columnPixel = scrollPosValue?.x;
  const rowIndex = scrollPosValue?.rowIndex;
  const columnIndex = scrollPosValue?.columnIndex;
  const rowKey = scrollPosValue?.rowKey;
  const columnKey = scrollPosValue?.columnKey;
  const rowOffset = scrollPosValue?.offsetY;
  const columnOffset = scrollPosValue?.offsetX;
  const scrollingOptions = useMemo(() => [
      {
          id: 'off',
          label: 'High-Water Mark Scrolling',
          value: 'loadMoreOnScroll'
      },
      { id: 'on', label: 'None', value: 'loadAll' }
  ], []);
  const dataprovider = useMemo(() => new ArrayDataProvider(dataArray, {
      keyAttributes: 'id'
  }), []);

  const handleScrollPolicyValueValueChanged = (event: PropertyChangedEvent<ScrollPolicyValue>) => {
    setScrollPolicyValue(event.detail.value ?? 'loadMoreOnScroll');
  };

  const handleScrollPosValueScrollPositionChanged = (event: PropertyChangedEvent<ScrollPosition>) => {
    setScrollPosValue(event.detail.value ?? {});
  };

  const handleRowPixelValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setScrollPosValue((current) => ({ ...current, y: event.detail.value }));
  };

  const handleColumnPixelValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setScrollPosValue((current) => ({ ...current, x: event.detail.value }));
  };

  const handleRowIndexValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setScrollPosValue((current) => ({ ...current, rowIndex: event.detail.value }));
  };

  const handleColumnIndexValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setScrollPosValue((current) => ({ ...current, columnIndex: event.detail.value }));
  };

  const handleRowKeyValueChanged = (event: PropertyChangedEvent<string>) => {
    setScrollPosValue((current) => ({ ...current, rowKey: event.detail.value }));
  };

  const handleColumnKeyValueChanged = (event: PropertyChangedEvent<string>) => {
    setScrollPosValue((current) => ({ ...current, columnKey: event.detail.value }));
  };

  const handleRowOffsetValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setScrollPosValue((current) => ({ ...current, offsetY: event.detail.value }));
  };

  const handleColumnOffsetValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setScrollPosValue((current) => ({ ...current, offsetX: event.detail.value }));
  };

  const normalizedScrollPosition = useMemo<TableScrollPosition>(() => {
      const position: TableScrollPosition = {};
      if (scrollPosValue.x != null) position.x = scrollPosValue.x;
      if (scrollPosValue.y != null) position.y = scrollPosValue.y;
      if (scrollPosValue.rowIndex != null) position.rowIndex = scrollPosValue.rowIndex;
      if (scrollPosValue.columnIndex != null) position.columnIndex = scrollPosValue.columnIndex;
      if (scrollPosValue.rowKey != null) position.rowKey = scrollPosValue.rowKey;
      if (scrollPosValue.columnKey != null) position.columnKey = scrollPosValue.columnKey;
      if (scrollPosValue.offsetY != null) position.offsetY = scrollPosValue.offsetY;
      if (scrollPosValue.offsetX != null) position.offsetX = scrollPosValue.offsetX;
      return position;
  }, [scrollPosValue]);

  return (
      <div id="table-container">
            <div class="oj-panel oj-bg-neutral-30">
                    <h2 class="oj-typography-subheading-sm">Table scroll position attributes:</h2>
                    <oj-form-layout label-edge="inside" max-columns="2" direction="row">
                              <oj-input-number label-hint="Row Pixel" min={0} value={rowPixel} onvalueChanged={handleRowPixelValueChanged} />
                              <oj-input-number label-hint="Column Pixel" min={0} value={columnPixel} onvalueChanged={handleColumnPixelValueChanged} />
                              <oj-input-number label-hint="Row Index" min={0} value={rowIndex} onvalueChanged={handleRowIndexValueChanged} />
                              <oj-input-number label-hint="Column Index" min={0} value={columnIndex} onvalueChanged={handleColumnIndexValueChanged} />
                              <oj-input-text label-hint="Row Key" value={rowKey} onvalueChanged={handleRowKeyValueChanged} />
                              <oj-input-text label-hint="Column Key" value={columnKey} onvalueChanged={handleColumnKeyValueChanged} />
                              <oj-input-number label-hint="Row Offset" min={0} value={rowOffset} onvalueChanged={handleRowOffsetValueChanged} />
                              <oj-input-number label-hint="Column Offset" min={0} value={columnOffset} onvalueChanged={handleColumnOffsetValueChanged} />
                              <oj-buttonset-one id="policyButtonSet" class="oj-sm-only-float-start oj-buttonset-width-auto" aria-label="Choose only one setting." aria-controls="table" onvalueChanged={handleScrollPolicyValueValueChanged} value={scrollPolicyValue}>
                                           {
                                                      (scrollingOptions ?? []).map(($current) => (
                                                        <oj-option key={$current.id} value={$current.value}><span>{$current.label}</span></oj-option>
                                                      ))
                                                    }
                                       </oj-buttonset-one>
                           </oj-form-layout>
                 </div>
            <oj-table id="table" aria-label="Scroll Position Table" data={dataprovider} scrollPolicy={scrollPolicyValue} onscrollPositionChanged={handleScrollPosValueScrollPositionChanged} scrollPosition={normalizedScrollPosition} columns={columns} class="demo-table-container" />
        </div>
    );
};

export default TableScrollPosTable;
