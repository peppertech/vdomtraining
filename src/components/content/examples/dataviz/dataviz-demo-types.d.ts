import type { ComponentChildren, ComponentProps } from 'preact';
import type { DataProvider } from 'ojs/ojdataprovider';

declare global {
  type DatavizKey = string;

  type DatavizValueChangedEvent<TValue> = CustomEvent<{
    value: TValue;
    previousValue?: TValue;
    updatedFrom?: string;
  }>;

  type DatavizNullableArrayChangedEvent<TValue> = CustomEvent<{
    value: TValue[] | null;
    previousValue?: TValue[] | null;
    updatedFrom?: string;
  }>;

  type DatavizListSelectionChangedEvent<TKey, TValue = unknown> = CustomEvent<{
    items?: Array<{ key: TKey }>;
    value: TValue;
  }>;

  type DatavizTemplateContext<TData, TKey extends DatavizKey = string> = {
    data: TData;
    id?: TKey;
    key: TKey;
    index: number;
    item?: TData;
    itemData: TData;
    state: {
      hovered?: boolean;
      selected?: boolean;
      expanded?: boolean;
    };
    content: {
      width: number;
      height: number;
    };
    group?: string;
    series?: string;
    value?: number;
    color?: string;
    innerBounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    parentElement: HTMLElement;
    componentElement: Element;
  };

  type DatavizSeriesTemplateContext<TKey extends DatavizKey = string> = {
    id: TKey;
    index?: number;
    parentElement?: Element;
    componentElement?: Element;
  };

  type DatavizTooltipContext<TData = unknown, TKey extends DatavizKey = string> = {
    data?: TData;
    id: TKey;
    label: string;
    value?: string | number;
    color?: string;
    parentElement: HTMLElement;
    componentElement: Element;
  };

  type DatavizTimelineMoveResizeEvent = CustomEvent<{
    itemContexts: Array<DatavizTemplateContext<DatavizChartDatum>>;
    typeDetail?: 'start' | 'end' | string;
    start: string;
    end: string;
  }>;

  type DatavizTimelineViewportChangeEvent = CustomEvent<{
    minorAxisScale?: string;
  }>;

  type DatavizNBoxDragContext = {
    nodes: Array<{
      id: string;
      label: string;
      secondaryLabel?: string;
    }>;
  };

  type DatavizNBoxKeyboardRequestEvent = CustomEvent<{
    source?: Array<{
      id: string;
      label?: string;
      name?: string;
      position?: string;
    }>;
    target?: {
      row: string;
      column: string;
    };
  }>;

  type DatavizSunburstProps = {
    'nodeDefaults.labelDisplay'?: 'rotated';
    'tooltip.renderer'?: (context?: DatavizTooltipContext<DatavizChartDatum>) => {
      insert?: Element | string;
      preventDefault?: boolean;
    };
  };

  type DatavizSparkChartRowProps = {
    label: string;
    children?: ComponentChildren;
  };

  type DatavizTableCellTemplateContext<TData> = {
    item: {
      data: TData;
    };
    columnIndex: number;
    data: string | number;
  };

  type DatavizThematicMapMarkerContentContext<TData> = DatavizTemplateContext<TData> & {
    itemData: TData;
    state?: {
      hovered?: boolean;
      selected?: boolean;
    };
  };

  type DatavizChartDatum = {
    Country: string;
    Democrat: number;
    GDP: number;
    Inches: number;
    Product: string;
    Region: string;
    Republican: number;
    Sales: number;
    Season: string;
    State: string;
    Territory: string;
    angle: number;
    attributeDesc: string;
    baseline: number;
    id: DatavizKey;
    category: string;
    city: string;
    company: string;
    country: string;
    data: DatavizChartDatum[];
    dataProvider: DataProvider<DatavizKey, DatavizChartDatum>;
    department: string;
    depth: number;
    distanceTraveled: number;
    domesticProduction: number;
    downtimeBegin: string;
    downtimeEnd: string;
    downtimeFinish: string;
    downtimeStart: string;
    drink: string;
    endDate: string;
    endNode: string;
    event: string;
    flight: string;
    fruit: string;
    gasPricePerLiter: number;
    gdp: number;
    group: string;
    groupId: Array<string | number>;
    groups: string;
    image: string;
    imports: number;
    incoming: number;
    isCorePack: boolean;
    latitude: number;
    location: string;
    longitude: number;
    marker: string;
    meanIncome: number;
    medal: string;
    month: string;
    nodeType: string;
    outliers: number[];
    outgoing: number;
    overtimeBegin: string;
    overtimeEnd: string;
    overtimeFinish: string;
    overtimeStart: string;
    plannedFinish: string;
    plannedStart: string;
    population: number;
    predecessor: string;
    product: string;
    progress: number;
    project: string;
    projectedLatitude: number;
    projectedLongitude: number;
    properties: Record<string, unknown>;
    q1: number;
    q2: number;
    q3: number;
    quarter: string;
    referenceObjects: Record<string, unknown>[];
    region: string;
    relation: string;
    resource: string;
    result: string;
    revenue: number;
    sales: number;
    schedule: string;
    season: string;
    series: string;
    seriesId: string;
    shifts: DatavizChartDatum[];
    shapedValue: 'on' | 'off';
    size: number;
    sodaVsPop: string;
    speed: number;
    startDate: string;
    startNode: string;
    state: string;
    status: string;
    stock: string;
    subTasks: DatavizChartDatum[];
    successor: string;
    svgClassName: string;
    taskId: DatavizKey;
    tasks: DatavizChartDatum[];
    tier: string;
    total: number;
    url: string;
    user: string;
    users: number;
    label: string;
    title: string;
    description: string;
    name: string;
    text: string;
    type: NonNullable<ComponentProps<'oj-chart'>['type']>;
    value: number;
    val: number;
    value0: number;
    value1: number;
    x: number | string;
    y: number;
    z: number;
    low: number;
    high: number;
    open: number;
    close: number;
    volume: number;
    count: number;
    color: string;
    borderColor: string;
    markerShape: string;
    markerSize: number;
    supervisor: string;
    totalDeptHires: number;
    year: string;
    shape: string;
    rowSpan: number;
    columnSpan: number;
    begin: string;
    finish: string;
    start: string;
    end: string;
    shortDesc: string;
    targetValue: number;
    max: number;
    min: number;
    items: DatavizChartDatum[];
    nodes: DatavizChartDatum[];
  };
}

export {};
