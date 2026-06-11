import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojtable';

export const TableColumnContentWrapping = () => {
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      {
          headerText: 'Column 1',
          field: 'Column1',
          headerClassName: 'oj-helper-text-align-start',
          className: 'oj-helper-overflow-wrap-anywhere oj-helper-white-space-normal oj-helper-text-align-start',
          style: 'vertical-align: top'
      },
      {
          headerText: 'Column 2',
          field: 'Column2',
          headerClassName: 'oj-helper-text-align-center',
          className: 'oj-helper-overflow-wrap-anywhere oj-helper-white-space-normal oj-helper-text-align-center',
          style: 'vertical-align: middle'
      },
      {
          headerText: 'Column 3',
          field: 'Column3',
          headerClassName: 'oj-helper-text-align-end',
          className: 'oj-helper-overflow-wrap-anywhere oj-helper-white-space-normal oj-helper-text-align-end',
          style: 'vertical-align: bottom'
      }
  ], []);
  const columnDataArray = useMemo(() => [
      {
          Column1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce condimentum vulputate finibus. Cras quis pharetra felis. Curabitur imperdiet maximus nulla, at rhoncus odio facilisis in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam ac finibus turpis.',
          Column2: 'Praesent orci arcu, dictum id odio non, hendrerit lacinia nibh. Sed gravida leo quis mauris condimentum sagittis. Fusce aliquam diam in purus condimentum tristique. Phasellus ut sapien a nisl euismod sollicitudin. Quisque nec bibendum turpis.',
          Column3: 'Etiam vel venenatis eros, in blandit elit. Aenean finibus fermentum dolor, nec semper magna tempor faucibus. Quisque euismod porttitor ipsum a molestie. Proin vestibulum, nulla at gravida interdum, turpis massa tristique neque, vel auctor lorem leo et ex. Nullam pellentesque posuere lobortis.'
      },
      {
          Column1: 'Morbi a auctor erat, in pellentesque turpis. Morbi vel urna et turpis fringilla gravida sed eu risus. Morbi faucibus ipsum at eros tempus, lacinia aliquet risus tristique. Cras ullamcorper, enim eu pulvinar convallis, orci erat porta tortor, vitae luctus erat libero eget erat. Etiam viverra ligula ut lacus ornare fringilla in eu dui. Pellentesque in magna a lorem sodales tempor.',
          Column2: 'Vestibulum ut odio sed velit eleifend fringilla et dictum tortor. Praesent mi purus, varius eget vulputate eget, laoreet luctus quam. Sed interdum lobortis orci, eget porttitor odio pulvinar in. Quisque sed nibh ut lectus pharetra vehicula sed a eros. Ut mauris libero, porttitor et varius ac, elementum sed massa.',
          Column3: 'Ut non semper nunc, sed eleifend ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed pretium laoreet nibh et blandit. Fusce faucibus neque dui, eget commodo sapien aliquet ac. Mauris luctus tortor arcu, eu facilisis dolor porttitor id.'
      }
  ], []);
  const dataprovider = useMemo(() => new ArrayDataProvider(columnDataArray), [columnDataArray]);

  return (
      <oj-table id="table" aria-label="Column Text Wrapping Table" data={dataprovider} columnsDefault={{ sortable: 'disabled' }} columns={columns} class="demo-table-container" />
    );
};

export default TableColumnContentWrapping;
