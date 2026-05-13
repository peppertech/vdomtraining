import { h } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojselector';
import 'ojs/ojtable';

export const SelectorCheckboxSelectableTable = () => {
  const [selectionMode, setSelectionMode] = useState('multiple');
  const [selectedKeys, setSelectedKeys] = useState<any>(new KeySetImpl());
  const departments = useMemo(
    () => [
      { id: 10, name: 'Sales', manager: 'Chris Black' },
      { id: 20, name: 'Finance', manager: 'Christine Cooper' },
      { id: 30, name: 'Marketing', manager: 'Samire Christian' }
    ],
    []
  );
  const dataProvider = useMemo(
    () => new ArrayDataProvider(departments, { keyAttributes: 'id' }),
    [departments]
  );
  const columns = useMemo(
    () => [
      { headerText: '', field: 'id', template: 'selectorTemplate', id: 'selector' },
      { headerText: 'Department', field: 'name', id: 'name' },
      { headerText: 'Manager', field: 'manager', id: 'manager' }
    ],
    []
  );

  const renderSelectorTemplate = (cell: any) => (
    <oj-selector
      aria-label={cell.item.data.name}
      selected-keys={selectedKeys}
      onselectedKeysChanged={(event: any) => setSelectedKeys(event.detail.value)}
      selection-mode={selectionMode}
      row-key={cell.item.data.id}
    />
  );

  return (
    <div id="tableDemo">
      <oj-radioset
        value={selectionMode}
        onvalueChanged={(event: any) => {
          setSelectionMode(event.detail.value ?? 'multiple');
          setSelectedKeys(new KeySetImpl());
        }}
        labelHint="Selection Mode"
      >
        <oj-option value="single">Single Row</oj-option>
        <oj-option value="multiple">Multiple Rows</oj-option>
      </oj-radioset>
      <oj-table aria-label="selector table" data={dataProvider} columns={columns}>
        <template slot="selectorTemplate" render={renderSelectorTemplate} />
      </oj-table>
      <div class="oj-sm-margin-4x-top">Current selection: {JSON.stringify(Array.from(selectedKeys.values?.() ?? []))}</div>
    </div>
  );
};

export default SelectorCheckboxSelectableTable;
