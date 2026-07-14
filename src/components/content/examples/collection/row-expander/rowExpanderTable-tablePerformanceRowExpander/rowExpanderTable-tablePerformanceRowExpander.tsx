import 'css!./demo.css';
import 'ojs/ojbutton';
import * as Context from 'ojs/ojcontext';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import { AllKeySetImpl,KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojoption';
import 'ojs/ojrowexpander';
import 'ojs/ojtable';
import { ojTable } from 'ojs/ojtable';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import FlattenedTreeDataProviderView = require('ojs/ojflattenedtreedataproviderview');

interface Item {
  title: string;
  id: string;
  text: string;
  children?: Array<Item>;
}

type ScrollPolicyValue = 'loadMoreOnScroll' | 'loadAll';
type ExpandValue = 'collapse' | 'expand';
type InputNumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
type ButtonsetChangedEvent = Parameters<NonNullable<ComponentProps<'oj-buttonset-one'>['onvalueChanged']>>[0];
type TableColumns = ComponentProps<'oj-table'>['columns'];
type ItemRowTemplateContext = ojTable.RowTemplateContext<Item['id'], Item>;

export const RowExpanderTableTablePerformanceRowExpander = () => {
  const [scrollPolicyValue, setScrollPolicyValue] = useState<ScrollPolicyValue>('loadMoreOnScroll');
  const [countPerLevel, setCountPerLevel] = useState(40);
  const [numLevels, setNumLevels] = useState(3);
  const [renderTime, setRenderTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [expandValue, setExpandValue] = useState<ExpandValue>('collapse');
  const [data, setData] = useState<FlattenedTreeDataProviderView<Item['id'], Item> | undefined>(undefined);

  const expandedRef = useRef<KeySetImpl<Item['id']> | AllKeySetImpl<Item['id']>>(new KeySetImpl());
  const startRef = useRef<number | null>(null);

  const NODE_LIMIT = 100000;
  const EXPAND_LOAD_ALL_LIMIT = 5000;
  const totalItems = useMemo(() => Math.pow(countPerLevel, numLevels), [countPerLevel, numLevels]);
  const columns = useMemo<TableColumns>(
    () => [
      { headerText: 'Id', field: 'id', weight: 1, id: 'id' },
      { headerText: 'Title', field: 'title', weight: 1, id: 'title' },
      { headerText: 'Text', field: 'text', weight: 2, id: 'text' }
    ],
    []
  );
  const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
    accessibility: { rowHeader: 'id' },
    scrollPolicyOptions: { fetchSize: 10 }
  };

  const handleExpandValueValueChanged = (event: ButtonsetChangedEvent) => {
    setExpandValue((event.detail.value ?? 'collapse') as ExpandValue);
  };

  const exceedsLimits = () => {
    if (isLoadAllAndExpand() && totalItems > EXPAND_LOAD_ALL_LIMIT) {
      return true;
    }
    if (totalItems > NODE_LIMIT) {
      return true;
    }
    return false;
  };

  const isLoadAllAndExpand = () => scrollPolicyValue === 'loadAll' && expandValue === 'expand';

  const generateData = (level = 1, parentId = ''): Item[] => {
    if (exceedsLimits()) {
      return [];
    }

    const nextData: Item[] = [];
    for (let i = 0; i < countPerLevel; i++) {
      const id = `${parentId}l${level}i${i}`;
      const item: Item = {
        id,
        title: `Level: ${level}`,
        text: `Parent Key: ${parentId || 'null'}, Item: ${i + 1}`
      };
      if (level < numLevels) {
        item.children = generateData(level + 1, id);
      }
      nextData.push(item);
    }
    return nextData;
  };

  const updateErrorState = () => {
    setRenderTime('0ms');
    setErrorMessage(
      `Error: Too Many Nodes. ${scrollPolicyValue} with ${expandValue}: (select total node amount that is less than ${
        isLoadAllAndExpand() ? EXPAND_LOAD_ALL_LIMIT : NODE_LIMIT
      } nodes)`
    );
  };

  const updateData = () => {
    setData(
      new FlattenedTreeDataProviderView(
        new ArrayTreeDataProvider<Item['id'], Item>(generateData(), {
          keyAttributes: 'id'
        }),
        {
          expanded: expandedRef.current
        }
      )
    );
    setErrorMessage('');
    startRef.current = Date.now();
    const busyContext = Context.getPageContext().getBusyContext();
    void busyContext.whenReady().then(() => {
      if (exceedsLimits()) {
        updateErrorState();
        return false;
      }

      if (startRef.current !== null) {
        setRenderTime(`${Date.now() - startRef.current}ms`);
      }
      return true;
    });
  };

  const reRender = () => {
    if (!exceedsLimits()) {
      updateData();
      return;
    }

    setData(
      new FlattenedTreeDataProviderView(
        new ArrayTreeDataProvider<Item['id'], Item>([], {
          keyAttributes: 'id'
        })
      )
    );
    updateErrorState();
  };

  const updateScrollPolicy = (event: ButtonsetChangedEvent) => {
    setScrollPolicyValue((event.detail.value ?? 'loadMoreOnScroll') as ScrollPolicyValue);
  };

  const updateCount = (event: InputNumberChangedEvent) => {
    setCountPerLevel(event.detail.value ?? 1);
  };

  const updateLevels = (event: InputNumberChangedEvent) => {
    setNumLevels(event.detail.value ?? 1);
  };

  useEffect(() => {
    expandedRef.current = expandValue === 'collapse' ? new KeySetImpl() : new AllKeySetImpl();
    reRender();
  }, [expandValue]);

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    updateData();
  }, [scrollPolicyValue, countPerLevel, numLevels]);

  return (
    <div id="tableWrapper">
      <div class="row-expander-performance-controls">
        <div class="oj-panel oj-bg-neutral-30">
          <h2 id="h1" class="oj-typography-subheading-md">
            Options To Control The Performance Below
          </h2>
          <oj-form-layout maxColumns={3} direction="row">
            <oj-input-number
              id="inputnumber-id1"
              min={1}
              onvalueChanged={updateCount}
              labelHint="Items Per Level"
              value={countPerLevel}
            />
            <oj-input-number
              id="inputnumber-id2"
              min={1}
              max={10}
              onvalueChanged={updateLevels}
              value={numLevels}
              labelHint="Number of Levels"
            />
            <div>
              <oj-button id="reRenderButton" onojAction={reRender}>
                Re-Render Table
              </oj-button>
            </div>
          </oj-form-layout>
          <oj-form-layout maxColumns={12} direction="row">
            <oj-buttonset-one
              id="expandButtonSet"
              aria-label="Choose only one setting."
              aria-controls="rowexpander-perf-expand"
              onvalueChanged={handleExpandValueValueChanged}
              value={expandValue}
            >
              <oj-option value="collapse">Collapse All</oj-option>
              <oj-option value="expand">Expand All</oj-option>
            </oj-buttonset-one>
            <oj-buttonset-one
              id="scrollButtonSet"
              aria-label="Choose only one setting."
              aria-controls="rowexpander-perf-scrolling"
              value={scrollPolicyValue}
              onvalueChanged={updateScrollPolicy}
            >
              <oj-option value="loadMoreOnScroll">High-Water Mark Scrolling</oj-option>
              <oj-option value="loadAll">None</oj-option>
            </oj-buttonset-one>
          </oj-form-layout>
          <div class="oj-sm-padding-1x-start">
            <p>
            <span>Total Items: {totalItems}</span>  
             <span>Render Time:
              {renderTime}
            </span>
            </p>
          </div>
          <div class="oj-sm-padding-1x-start">
            <p class="oj-typography-body-lg oj-typography-bold oj-text-color-danger">{errorMessage}</p>
          </div>
        </div>
      </div>
      <oj-table
        id="table"
        aria-label="High Watermark Table"
        data={data}
        scrollPolicy={scrollPolicyValue}
        class="demo-table-container oj-sm-width-full"
        layout="fixed"
        columns={columns}
        {...ojTableProps}
      >
        <template
          slot="rowTemplate"
          render={(row: ItemRowTemplateContext) => (
            <tr>
              <td>
                <oj-row-expander context={row} data-oj-clickthrough="disabled" />
                <span>{row.item.data.id}</span>
              </td>
              <td>
                <span>{row.item.data.title}</span>
              </td>
              <td>
                <span>{row.item.data.text}</span>
              </td>
            </tr>
          )}
        />
      </oj-table>
    </div>
  );
};

export default RowExpanderTableTablePerformanceRowExpander;
