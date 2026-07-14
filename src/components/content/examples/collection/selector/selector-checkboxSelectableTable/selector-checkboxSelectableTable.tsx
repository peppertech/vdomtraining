import { KeySet,KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojselector';
import type { SelectorElement } from 'ojs/ojselector';
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type Department = {
  id: number;
  name: string;
  manager: string;
};
type SelectionMode = Extract<
  ComponentProps<'oj-selector'>['selectionMode'],
  'single' | 'multiple'
>;
type SelectedKeySet = KeySet<Department['id']>;
type SelectorCellTemplateContext = ojTable.CellTemplateContext<
  Department['id'],
  Department
>;
type RadioValueChangedEvent = CustomEvent<{ value: SelectionMode | null }>;
type SelectorSelectedKeysChangedEvent =
  SelectorElement.selectedKeysChanged<Department['id']>;

const createEmptySelection = () => new KeySetImpl<Department['id']>();

export const SelectorCheckboxSelectableTable = () => {
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('multiple');
  const [selectedKeys, setSelectedKeys] = useState<SelectedKeySet>(
    createEmptySelection()
  );
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

  const renderSelectorTemplate = (cell: SelectorCellTemplateContext) => (
    <oj-selector
      aria-label={cell.item.data.name}
      selected-keys={selectedKeys}
      onselectedKeysChanged={(event: SelectorSelectedKeysChangedEvent) =>
        setSelectedKeys(event.detail.value ?? createEmptySelection())
      }
      selection-mode={selectionMode}
      row-key={cell.item.data.id}
    />
  );

  return (
    <div id="tableDemo">
      <oj-radioset
        value={selectionMode}
        onvalueChanged={(event: RadioValueChangedEvent) => {
          setSelectionMode(event.detail.value ?? 'multiple');
          setSelectedKeys(createEmptySelection());
        }}
        labelHint="Selection Mode"
      >
        <oj-option value="single">Single Row</oj-option>
        <oj-option value="multiple">Multiple Rows</oj-option>
      </oj-radioset>
      <oj-table aria-label="selector table" data={dataProvider} columns={columns}>
        <template slot="selectorTemplate" render={renderSelectorTemplate} />
      </oj-table>
      <div class="oj-sm-margin-4x-top">
        Current selection:{" "}
        {JSON.stringify(Array.from((selectedKeys as KeySetImpl<number>).values()))}
      </div>
    </div>
  );
};

export default SelectorCheckboxSelectableTable;
