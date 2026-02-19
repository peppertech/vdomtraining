import { useMemo, useState, useCallback } from 'preact/hooks';
import 'ojs/ojgantt';
import type { ojGantt } from 'ojs/ojgantt';
import type { JetElementCustomEvent } from 'ojs/index';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');
import { KeySetImpl } from 'ojs/ojkeyset';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojcheckboxset';
import 'ojs/ojformlayout';

/**
 * Single-file TSX conversion of the MVVM Gantt Overview demo (demo.html + demo.ts)
 * Notes:
 * - This component uses a minimal inline dataset modeled after the original rowData/depData
 *   to keep everything self-contained in a single .tsx file.
 * - It preserves the key behaviors: task elements toggles (attribute/overtime/downtime),
 *   timeCursor and zooming toggles, current time indicator, move/resize handlers, and expanded rows.
 * - If you want to use the full original dataset, replace the inline rowData/depData with imports
 *   from local JSON files via `text!./data/...` and feed them into the data providers similarly.
 */


/** Minimal sample data (modeled after the original rowData.json structure) */
type Task = {
  id: string;
  start: string;
  end: string;
  svgClassName?: string;
  attributeDesc?: string;
  downtimeStart?: string;
  downtimeEnd?: string;
  overtimeStart?: string;
  overtimeEnd?: string;
};
type Row = {
  id: string;
  label: string;
  tasks?: Task[];
  rows?: Row[];
  referenceObjects?: Array<{ start?: string; end?: string; value?: string; label?: string; svgClassName?: string }>;
};

const iso = (s: string) => new Date(s).toISOString();

const sampleRowData: Row[] = [
  {
    label: 'Premix A',
    id: 'Premix A',
    tasks: [
      {
        id: 'Premix_A_1601524800000',
        start: iso('2020-10-01T04:00:00Z'),
        end: iso('2020-10-01T05:00:00Z'),
        svgClassName: 'demo-gantt-task-emphasis-low',
        attributeDesc: 'Attribute Description',
        downtimeStart: iso('2020-10-01T04:15:00Z'),
        downtimeEnd: iso('2020-10-01T04:30:00Z'),
        overtimeStart: iso('2020-10-01T04:45:00Z'),
        overtimeEnd: iso('2020-10-01T05:00:00Z')
      },
      {
        id: 'Premix_A_1601528400000',
        start: iso('2020-10-01T05:00:00Z'),
        end: iso('2020-10-01T08:00:00Z'),
        svgClassName: 'demo-gantt-task',
        attributeDesc: 'Attribute Description',
        downtimeStart: iso('2020-10-01T05:45:00Z'),
        downtimeEnd: iso('2020-10-01T06:30:00Z'),
        overtimeStart: iso('2020-10-01T07:15:00Z'),
        overtimeEnd: iso('2020-10-01T08:00:00Z')
      }
    ],
    rows: [
      {
        label: 'Premix B',
        id: 'Premix B',
        tasks: [
          {
            id: 'Premix_B_1601596800000',
            start: iso('2020-10-02T00:00:00Z'),
            end: iso('2020-10-02T09:00:00Z'),
            svgClassName: 'demo-gantt-task',
            attributeDesc: 'Attribute Description',
            downtimeStart: iso('2020-10-02T02:15:00Z'),
            downtimeEnd: iso('2020-10-02T04:30:00Z'),
            overtimeStart: iso('2020-10-02T06:45:00Z'),
            overtimeEnd: iso('2020-10-02T09:00:00Z')
          }
        ]
      },
      {
        label: 'Premix C',
        id: 'Premix C',
        tasks: [
          {
            id: 'Premix_C_1601568000000',
            start: iso('2020-10-01T16:00:00Z'),
            end: iso('2020-10-01T19:00:00Z'),
            svgClassName: 'demo-gantt-task',
            attributeDesc: 'Attribute Description',
            downtimeStart: iso('2020-10-01T16:45:00Z'),
            downtimeEnd: iso('2020-10-01T17:30:00Z'),
            overtimeStart: iso('2020-10-01T18:15:00Z'),
            overtimeEnd: iso('2020-10-01T19:00:00Z')
          }
        ]
      }
    ]
  },
  {
    label: 'Mixer A',
    id: 'Mixer A',
    tasks: [
      {
        id: 'Mixer_A_1601683200000',
        start: iso('2020-10-03T00:00:00Z'),
        end: iso('2020-10-03T09:00:00Z'),
        svgClassName: 'demo-gantt-task-emphasis-high',
        attributeDesc: 'Attribute Description',
        downtimeStart: iso('2020-10-03T02:15:00Z'),
        downtimeEnd: iso('2020-10-03T04:30:00Z'),
        overtimeStart: iso('2020-10-03T06:45:00Z'),
        overtimeEnd: iso('2020-10-03T09:00:00Z')
      }
    ],
    rows: [
      {
        label: 'Mixer B',
        id: 'Mixer B',
        referenceObjects: [
          { start: '2020-10-02T08:00:00.000Z', end: '2020-10-03T08:00:00.000Z' }
        ],
        tasks: [
          {
            id: 'Mixer_B_1601722800000',
            start: iso('2020-10-03T11:00:00Z'),
            end: iso('2020-10-03T14:00:00Z'),
            svgClassName: 'demo-gantt-task',
            attributeDesc: 'Attribute Description'
          }
        ]
      }
    ]
  },
  {
    label: 'Packaging A',
    id: 'Packaging A',
    tasks: [
      {
        id: 'Packaging_A_1601798400000',
        start: iso('2020-10-04T08:00:00Z'),
        end: iso('2020-10-04T11:00:00Z'),
        svgClassName: 'demo-gantt-task',
        attributeDesc: 'Attribute Description'
      }
    ],
    rows: [
      {
        label: 'Packaging B',
        id: 'Packaging B',
        tasks: [
          {
            id: 'Packaging_B_1601834400000',
            start: iso('2020-10-04T18:00:00Z'),
            end: iso('2020-10-04T21:00:00Z'),
            svgClassName: 'demo-gantt-task',
            attributeDesc: 'Attribute Description'
          }
        ]
      }
    ]
  }
];

/** Minimal sample dependencies (modeled after depData.json structure) */
type Dep = { id: string; predecessor: string; successor: string };
const sampleDepData: Dep[] = [
  { id: 'dep1', predecessor: 'Premix_A_1601524800000', successor: 'Premix_B_1601596800000' },
  { id: 'dep2', predecessor: 'Mixer_A_1601683200000', successor: 'Mixer_B_1601722800000' },
  { id: 'dep3', predecessor: 'Mixer_B_1601722800000', successor: 'Packaging_A_1601798400000' }
];

/** Custom N-hour scale (from demo.ts) for completeness, not wired to axes configuration here */
class DemoCustomScaleNHr {
  converter: IntlDateTimeConverter;
  hour = 60 * 60 * 1000;
  name: string;
  N: number;

  constructor(N: number) {
    this.converter = new IntlDateTimeConverter({
      hour: '2-digit',
      hour12: true
    });
    this.name = `${N}hr`;
    this.N = N;
  }
  formatter(date: string) {
    return this.converter.format(date);
  }
  getNextDate(date: string) {
    return new Date(new Date(date).getTime() + this.N * this.hour).toISOString();
  }
  getPreviousDate(date: string) {
    const d = new Date(date);
    d.setHours(Math.floor(d.getHours() / this.N) * this.N, 0, 0, 0);
    return d.toISOString();
  }
}

const dateConverter = new IntlDateTimeConverter({
  formatType: 'date',
  dateFormat: 'long'
});
const timeConverter = new IntlDateTimeConverter({
  formatType: 'time'
});

const GanttOverview = () => {
  // Data providers (hierarchical rows + flat dependencies)
  const dataProvider = useMemo(
    () =>
      new ArrayTreeDataProvider<string, Row>(sampleRowData, {
        keyAttributes: 'id',
        childrenAttribute: 'rows'
      }),
    []
  );
  const dependenciesDataProvider = useMemo(
    () => new ArrayDataProvider<string, Dep>(sampleDepData, { keyAttributes: 'id' }),
    []
  );

  // UI toggles and state (converted from Knockout observables)
  const [taskElementsDetails, setTaskElementsDetails] = useState<string[]>([]);
  const [togglesDetails, setTogglesDetails] = useState<string[]>([]);
  const [showAttribute, setShowAttribute] = useState(false);
  const [showOvertime, setShowOvertime] = useState(false);
  const [showDowntime, setShowDowntime] = useState(false);
  const [timeCursor, setTimeCursor] = useState<'on' | 'off'>('off');
  const [zooming, setZooming] = useState<'on' | 'off'>('off');
  const [dndAction, setDndAction] = useState('(Move or Resize a Task)');

  const applySettings = useCallback((details: string[]) => {
    setShowAttribute(details.indexOf('attribute') !== -1);
    setShowOvertime(details.indexOf('overtime') !== -1);
    setShowDowntime(details.indexOf('downtime') !== -1);
    setTimeCursor(details.indexOf('timeCursor') !== -1 ? 'on' : 'off');
    setZooming(details.indexOf('zooming') !== -1 ? 'on' : 'off');
  }, []);

  const onTaskElementsChanged = useCallback(
    (event: JetElementCustomEvent<string[] | null>) => {
      const v = event.detail.value ?? [];
      setTaskElementsDetails(v);
      applySettings(v.concat(togglesDetails));
    },
    [applySettings, togglesDetails]
  );

  const onTogglesChanged = useCallback(
    (event: JetElementCustomEvent<string[] | null>) => {
      const v = event.detail.value ?? [];
      setTogglesDetails(v);
      applySettings(taskElementsDetails.concat(v));
    },
    [applySettings, taskElementsDetails]
  );

  // Expanded rows (initial)
  const expanded = useMemo(() => new KeySetImpl<string>(['Mixer A', 'Packaging A']), []);

  // Project timeline and viewport
  const projectStartDate = useMemo(() => new Date('2020-10-01T00:00:00Z'), []);
  const projectEndDate = useMemo(() => new Date('2020-10-31T00:00:00Z'), []);
  const currentDate = useMemo(() => new Date('2020-10-03T17:00:00Z'), []);
  const currentDateString = currentDate.toISOString();
  const currentDateFormatted = dateConverter.format(currentDateString);
  const day = 1000 * 60 * 60 * 24;
  const viewportStart = useMemo(() => new Date('2020-10-03T00:00:00Z'), []);
  const viewportEnd = useMemo(() => new Date(viewportStart.getTime() + 3 * day), [viewportStart]);

  // Reference objects (current time indicator)
  const referenceObjects: ojGantt.ReferenceObject[] = useMemo(
    () => [
      {
        value: currentDateString,
        label: timeConverter.format(currentDateString) ?? undefined,
        svgClassName: 'demo-current-time-indicator'
      }
    ],
    [currentDateString]
  );

  // DnD handlers
  const handleMove = useCallback((event: ojGantt.ojMove<string, unknown, string, Row>) => {
    const taskContexts = event?.detail?.taskContexts ?? [];
    const rowContext = event?.detail?.rowContext;
    const dropDate = event?.detail?.value;
    setDndAction(
      `${taskContexts.length} task(s) dropped on ${rowContext?.rowData?.label ?? 'row'} at ${dropDate}`
    );
  }, []);
  const handleResize = useCallback((event: ojGantt.ojResize<string, unknown, string, Row>) => {
    const taskContexts = event?.detail?.taskContexts ?? [];
    const dropDate = event?.detail?.value;
    setDndAction(`${taskContexts.length} task(s) resized to ${dropDate}`);
  }, []);

  // Derived taskElements array (if supported by the runtime); kept for parity with the MVVM demo.
  const taskElements = useMemo(() => {
    const elems: string[] = [];
    if (showAttribute) elems.push('attribute');
    if (showOvertime) elems.push('overtime');
    if (showDowntime) elems.push('downtime');
    return elems;
  }, [showAttribute, showOvertime, showDowntime]);

  return (
    <div class="oj-sm-padding-4x-vertical oj-md-margin-4x-horizontal">
      <h2 class="oj-typography-heading-md oj-sm-margin-2x-bottom">Gantt - Overview</h2>

      <div class="oj-sm-margin-4x-bottom">
        <h3 class="oj-typography-heading-sm">Options To Control The Gantt Below</h3>

        <oj-form-layout columns={2} max-columns={2} label-edge="inside">
          <div>
            <h4 class="oj-typography-subheading-sm oj-sm-margin-1x-bottom">Task elements to show</h4>
            <oj-checkboxset
              value={taskElementsDetails}
              onvalueChanged={onTaskElementsChanged}
              aria-label="Task elements to show"
            >
              <oj-option value="attribute">Attribute</oj-option>
              <oj-option value="overtime">Overtime</oj-option>
              <oj-option value="downtime">Downtime</oj-option>
            </oj-checkboxset>
          </div>

          <div>
            <h4 class="oj-typography-subheading-sm oj-sm-margin-1x-bottom">Controls</h4>
            <oj-checkboxset
              value={togglesDetails}
              onvalueChanged={onTogglesChanged}
              aria-label="Controls"
            >
              <oj-option value="timeCursor">Time Cursor</oj-option>
              <oj-option value="zooming">Zooming</oj-option>
            </oj-checkboxset>
          </div>
        </oj-form-layout>
      </div>

      <div class="oj-sm-margin-2x-bottom oj-typography-body-sm oj-contrast-marker-subtle">
        {currentDateFormatted}
      </div>

      <div class="oj-sm-margin-2x-bottom oj-typography-body-sm">Task Action: {dndAction}</div>

      <oj-gantt
        aria-label="Gantt Overview"
        start={projectStartDate.toISOString()}
        end={projectEndDate.toISOString()}
        rowData={dataProvider}
        dependencyData={dependenciesDataProvider}
        expanded={expanded}
        viewportStart={viewportStart.toISOString()}
        viewportEnd={viewportEnd.toISOString()}
        timeCursor={timeCursor}
        zooming={zooming}
        // Keep a best-effort parity with the original 'task elements' toggles if supported
        onojMove={handleMove}
        onojResize={handleResize}
        // Helpful defaults
        selectionMode="none"
        minorAxis={{ scale: 'hours' }}
        majorAxis={{ scale: 'days' }}
        referenceObjects={referenceObjects}
        class="oj-sm-padding-2x-vertical"
      />
    </div>
  );
};

export default GanttOverview;
