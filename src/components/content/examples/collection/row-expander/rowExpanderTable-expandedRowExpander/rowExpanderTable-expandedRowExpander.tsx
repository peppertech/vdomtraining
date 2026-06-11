import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');
import * as jsonDataStr from 'text!../../data/cookbook/dataCollections/rowExpanderTable/expandedRowExpander/projectData.json';
import { KeySetImpl, AllKeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojkeyset';
import 'ojs/ojtable';
import 'ojs/ojrowexpander';
import 'ojs/ojbutton';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojtoolbar';


interface Project {
    id: string;
    name: string;
    resource: string;
    start: string;
    end: string;
    children?: Array<Project>;
}

type ExpandedKeySetImpl = KeySetImpl<Project['id']>;

type ExpandedAllKeySetImpl = AllKeySetImpl<Project['id']>;

type ExpandedKeySet = ExpandedKeySetImpl | ExpandedAllKeySetImpl;

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

export const RowExpanderTableExpandedRowExpander = () => {
  const [value, setValue] = useState('');
  const [task1expanded, setTask1expanded] = useState(false);
  const [isAddAll, setIsAddAll] = useState(false);
  const columns = useMemo<ComponentProps<'oj-table'>['columns']>(() => [
      { headerText: 'Task Name', sortProperty: 'name', weight: 2, minWidth: '13rem', id: 'name' },
      { headerText: 'Resource', sortProperty: 'resource', minWidth: '9rem', id: 'resource' },
      { headerText: 'Start Date', sortProperty: 'start', minWidth: '8rem', id: 'start' },
      { headerText: 'End Date', sortProperty: 'end', minWidth: '8rem', id: 'end' }
  ], []);
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
      accessibility: { rowHeader: 'name' }
  };

  const expandedRef = useRef<ExpandedKeySet>(new KeySetImpl<Project['id']>());

  const arrayTreeDataProvider = useMemo(() => new ArrayTreeDataProvider<Project['id'], Project>(JSON.parse(jsonDataStr), {
      keyAttributes: 'id'
  }), []);
  const dataProvider = useMemo(() => new FlattenedTreeDataProviderView(arrayTreeDataProvider, {
      expanded: expandedRef.current
  }), [arrayTreeDataProvider]);
  useEffect(() => {
      const expandedObservable = dataProvider.getExpandedObservable();
      const subscriber = expandedObservable.subscribe((nextValue) => {
          let expandText = '';
          const expanded = nextValue.value as unknown as ExpandedKeySet;
          expandedRef.current = expanded;
          if (expanded.isAddAll()) {
              (expanded as ExpandedAllKeySetImpl).deletedValues().forEach((key) => {
                  expandText = expandText.length === 0 ? key : expandText + ', ' + key;
              });
          }
          else {
              (expanded as ExpandedKeySetImpl).values().forEach((key) => {
                  expandText = expandText.length === 0 ? key : expandText + ', ' + key;
              });
          }
          setIsAddAll(expanded.isAddAll());
          setValue(expandText);
          setTask1expanded(expanded.has('t1'));
      });

      return () => subscriber.unsubscribe?.();
  }, [dataProvider]);

  const handleValueValueChanged = (event: PropertyChangedEvent<string>) => {
    setValue(event.detail.value);
  };

  const expand = () => {
      if (!expandedRef.current.has('t1')) {
          dataProvider.setExpanded(expandedRef.current.add(['t1']));
      }
  };

  const collapse = () => {
      dataProvider.setExpanded(expandedRef.current.delete(['t1']));
  };

  const expandAll = () => {
      dataProvider.setExpanded(new AllKeySetImpl<Project['id']>());
  };

  const collapseAll = () => {
      dataProvider.setExpanded(new KeySetImpl<Project['id']>());
  };

  return (
      <div id="tablecontainer">
            <div class="oj-panel oj-bg-neutral-30">
                    <h2 id="h1" class="oj-typography-subheading-md">Options To Control The Expansion State Below</h2>
                    <oj-toolbar id="demoToolBar" aria-label="Expansion Toolbar" class="oj-sm-margin-5x-bottom" aria-controls="controlled" chroming="outlined">
                              <oj-button id="expand" onojAction={expand}>Expand Task 1</oj-button>
                              <oj-button id="collapse" onojAction={collapse}>Collapse Task 1</oj-button>
                              <oj-button id="expandAll" onojAction={expandAll}>Expand All</oj-button>
                              <oj-button id="collapseAll" onojAction={collapseAll}>Collapse All</oj-button>
                          </oj-toolbar>
                    <oj-label id="layoutLabel">Expansion state of Task 1:</oj-label>
                    {task1expanded ? 'expanded' : 'collapsed'}
                </div>
            <oj-table id="table" aria-label="Tasks Table" data={dataProvider} layout="fixed" columns={columns} class="oj-sm-width-full" {...ojTableProps}>
                    <template slot="rowTemplate" render={(row) => (
                      <tr>
                        <td>
                          <oj-row-expander context={row} data-oj-clickthrough="disabled" />
                          <span>{row.item.data.name}</span>
                        </td>
                        <td><span>{row.item.data.resource}</span></td>
                        <td><span>{row.item.data.start}</span></td>
                        <td><span>{row.item.data.end}</span></td>
                      </tr>
                          )} />
                </oj-table>
            <oj-text-area id="text-area" label-hint={isAddAll ? 'Collapsed Keys:' : 'Expanded Keys:'} readonly rows={6} onvalueChanged={handleValueValueChanged} value={value} />
        </div>
    );
};

export default RowExpanderTableExpandedRowExpander;
