import 'css!./demo.css';
import 'ojs/ojgantt';
import { ojGantt } from 'ojs/ojgantt';
import 'ojs/ojmenu';
import { ojMenu } from 'ojs/ojmenu';
import 'ojs/ojoption';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as dataText from 'text!../data/cookbook/dataVisualizations/gantt/multipleTasks/rowData.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type GanttProps = ComponentProps<'oj-gantt'>;
type GanttStart = GanttProps['start'];
type GanttEnd = GanttProps['end'];
type GanttSelection = NonNullable<GanttProps['selection']>;
type GanttSelectionChangedEvent = Parameters<NonNullable<GanttProps['onselectionChanged']>>[0];

type Task = {
  id: string;
  begin: string;
  finish: string;
  name: string;
};

type Row = {
  resource: string;
  shifts: Task[];
};

type RowMappingTemplateContext = {
  data: Row;
};

type TaskMappingTemplateContext = {
  data: Task;
};

type GanttTaskbarContext = {
  subId: 'oj-gantt-taskbar';
  rowIndex: number;
  index: number;
};

const data = JSON.parse(dataText as string) as Row[];

export const GanttContextMenu = () => {
  const ganttRef = useRef<ojGantt<null, null, null, null, Row['resource'], Row> | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
  const [selectedItemsValue, setSelectedItemsValue] = useState<GanttSelection>([]);
  const rowIndexRef = useRef<number | null>(null);
  const taskIndexRef = useRef<number | null>(null);
  const projectStartDate = useMemo<GanttStart>(() => new Date('Jan 04, 2021').toISOString(), []);
  const projectEndDate = useMemo<GanttEnd>(() => new Date('Jan 26, 2021').toISOString(), []);
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Row['resource'], Row>(data, {
        keyAttributes: 'resource'
      }),
    []
  );
  const gridlines: GanttProps['gridlines'] = { vertical: 'visible', horizontal: 'visible' };
  const majorAxis: GanttProps['majorAxis'] = {
    scale: 'days',
    zoomOrder: ['weeks', 'days', 'hours']
  };
  const minorAxis: GanttProps['minorAxis'] = {
    scale: 'hours',
    zoomOrder: ['weeks', 'days', 'hours']
  };
  const ganttProps: Partial<GanttProps> = { gridlines, majorAxis, minorAxis };

  const handleSelectedItemsValueSelectionChanged = (event: GanttSelectionChangedEvent) => {
    setSelectedItemsValue(event.detail.value ?? []);
  };

  const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
    const target = event.detail.originalEvent.target as Element | null;
    if (target?.id === 'gantt') {
      const selection = selectedItemsValue;
      if (selection.length > 0) {
        const selectedItem = String(selection[0]);
        const parsedId = selectedItem.split(/(\d*)-(\d*)/g);
        rowIndexRef.current = Number(parsedId[1]) - 1;
        taskIndexRef.current = Number(parsedId[2]) - 1;
      }
    } else if (target) {
      const context = ganttRef.current?.getContextByNode(target) as GanttTaskbarContext | null;
      if (context?.subId === 'oj-gantt-taskbar') {
        rowIndexRef.current = context.rowIndex;
        taskIndexRef.current = context.index;
      } else {
        rowIndexRef.current = null;
        taskIndexRef.current = null;
      }
    }
  };

  const menuItemAction = (event: ojMenu.ojMenuAction) => {
    const selectedValue = String(event.detail.selectedValue);
    let text = `${selectedValue} from gantt background`;
    if (rowIndexRef.current !== null && taskIndexRef.current !== null) {
      text = `${selectedValue} from Row ${rowIndexRef.current + 1} Task ${taskIndexRef.current + 1}`;
    }
    setSelectedMenuItem(text);
  };

  const rowMappingTemplateRenderer = (row: RowMappingTemplateContext) => {
    return <oj-gantt-row tasks={row.data.shifts} label={row.data.resource} />;
  };

  const taskMappingTemplateRenderer = (task: TaskMappingTemplateContext) => {
    return (
      <oj-gantt-task
        taskId={task.data.id}
        start={task.data.begin}
        end={task.data.finish}
        label={task.data.name}
      />
    );
  };

  return (
    <div id="gantt-container">
      <oj-gantt
        ref={ganttRef}
        id="gantt"
        aria-label="Project Gantt Context Menu Demo"
        start={projectStartDate}
        end={projectEndDate}
        rowData={dataProvider}
        class="demo-gantt"
        selectionMode="single"
        onselectionChanged={handleSelectedItemsValueSelectionChanged}
        selection={selectedItemsValue}
        {...ganttProps}
      >
        <template slot="rowMappingTemplate" render={rowMappingTemplateRenderer} />
        <template slot="taskMappingTemplate" render={taskMappingTemplateRenderer} />
        <oj-menu
          id="ctxMenu"
          slot="contextMenu"
          aria-label="Match Edit"
          onojMenuAction={menuItemAction}
          onojBeforeOpen={beforeOpenFunction}
        >
          <oj-option value="Action 1">Action 1</oj-option>
          <oj-option value="Action 2">Action 2</oj-option>
          <oj-option value="Action 3">Action 3</oj-option>
        </oj-menu>
      </oj-gantt>
      <p>
        Last selected menu item:
        <span id="results" class="italic oj-typography-body-md oj-typography-bold">
          {selectedMenuItem}
        </span>
      </p>
    </div>
  );
};

export default GanttContextMenu;
