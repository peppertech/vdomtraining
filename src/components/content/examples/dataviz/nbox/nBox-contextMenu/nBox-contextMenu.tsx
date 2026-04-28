/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonData from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojNBox } from 'ojs/ojnbox';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojnbox';
import 'ojs/ojmenu';
import 'ojs/ojoption';

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const NBoxContextMenu = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>('(None selected yet)');
  const [selectedItemsValue, setSelectedItemsValue] = useState<any>([]);

  const cellRef = useRef<any>(null);
  const nodeRef = useRef<any>(null);

  const data: any = JSON.parse(jsonData);
  const rows = useMemo(() => [
      {
          id: '0'
      },
      {
          id: '1'
      },
      {
          id: '2'
      }
  ], []);
  const columns = useMemo(() => [
      {
          id: '0'
      },
      {
          id: '1'
      },
      {
          id: '2'
      }
  ], []);
  const cells = useMemo(() => [
      {
          row: '0',
          column: '0',
          shortDesc: 'Low Potential, Poor Performance'
      },
      {
          row: '0',
          column: '1',
          shortDesc: 'Low Potential, Fair Performance'
      },
      {
          row: '0',
          column: '2',
          shortDesc: 'Low Potential, Good Performance'
      },
      {
          row: '1',
          column: '0',
          shortDesc: 'Medium Potential, Poor Performance'
      },
      {
          row: '1',
          column: '1',
          shortDesc: 'Medium Potential, Fair Performance'
      },
      {
          row: '1',
          column: '2',
          shortDesc: 'Medium Potential, Good Performance'
      },
      {
          row: '2',
          column: '0',
          shortDesc: 'High Potential, Poor Performance'
      },
      {
          row: '2',
          column: '1',
          shortDesc: 'High Potential, Fair Performance'
      },
      {
          row: '2',
          column: '2',
          shortDesc: 'High Potential, Good Performance'
      }
  ], []);
  const dataProvider = useMemo(() => new ArrayDataProvider(data, {
      keyAttributes: '@index'
  }), [data]);

  const handleSelectedItemsValueSelectionChanged = (event: PropertyChangedEvent<any>) => {
    setSelectedItemsValue(event.detail.value);
  };

  const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
      (nodeRef.current = null), (cellRef.current = null);
      const target = event.detail.originalEvent.target as HTMLElement;
      if (target.id === 'nbox1') {
          // Handle keyboard interaction.
          const selection = selectedItemsValue;
          if (selection.length > 0) {
              const id = selection[0];
              nodeRef.current = data[id];
          }
      }
      else {
          // Handle mouse interaction
          const nbox = document.getElementById('nbox1') as ojNBox<string, Record<string, string>>;
          const context = nbox.getContextByNode(target);
          if (context != null) {
              if (context.subId == 'oj-nbox-node') {
                  nodeRef.current = data[context['id']];
              }
              else if (context.subId == 'oj-nbox-cell') {
                  for (let obj of cells) {
                      if (obj.row == context.row && obj.column == context.column) {
                          cellRef.current = obj;
                          break;
                      }
                  }
              }
          }
      }
  };

  const menuItemAction = (event: ojMenu.ojMenuAction) => {
      const text = event.detail.selectedValue;
      if (nodeRef.current) {
          setSelectedMenuItem(text + ' from Node ' + nodeRef.current.name);
      }
      else if (cellRef.current) {
          setSelectedMenuItem(text + ' from Cell ' + cellRef.current.shortDesc);
      }
      else {
          setSelectedMenuItem(text + ' from NBox background');
      }
  };

  return (
      <div id="nbox-container">
            <oj-n-box id="nbox1" animation-on-data-change="auto" data={dataProvider} rows={rows} columns={columns} cells={cells} rows-title="Potential" onselectionChanged={handleSelectedItemsValueSelectionChanged} selection={selectedItemsValue} selection-mode="single" columns-title="Performance">
                    <template slot="nodeTemplate" render={($current) => (
                            <>
                                <oj-n-box-node label={$current.data.name} secondary-label={$current.data.position} row={$current.data.potential} column={$current.data.performance} short-desc={$current.data.name + ' - ' + $current.data.position} {...{ 'icon.source': $current.data.image ? 'images/hcm/placeholder-' + $current.data.image + '.png' : '', 'icon.initials': $current.data.initials, 'icon.background': $current.data.background }} />
                            </>
                          )} />
                    <oj-menu slot="contextMenu" aria-label="Edit" onojMenuAction={menuItemAction} onojBeforeOpen={beforeOpenFunction}>
                              <oj-option value="Action 1">Action 1</oj-option>
                              <oj-option value="Action 2">Action 2</oj-option>
                              <oj-option value="Action 3">Action 3</oj-option>
                          </oj-menu>
                </oj-n-box>
            <p>
                    Last selected menu item:
                    <span id="results" class="italic bold">{selectedMenuItem}</span>
                </p>
        </div>
    );
};

export default NBoxContextMenu;
