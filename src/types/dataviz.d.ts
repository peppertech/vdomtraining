import type { JetElementCustomEvent } from "ojs/index";
import type { ComponentChildren } from "preact";

declare global {
  type DatavizChartDatum = Record<string, any>;

  type DatavizTemplateContext<D = DatavizChartDatum, K = any> = {
    componentElement: Element;
    data: D;
    index: number;
    key: K;
    [key: string]: any;
  };

  type DatavizSeriesTemplateContext<D = DatavizChartDatum> = {
    componentElement?: Element;
    id: string;
    data?: D;
    index?: number;
    items?: Array<{
      data: D;
      index: number;
      key: any;
    }>;
    [key: string]: any;
  };

  type DatavizValueChangedEvent<V> = JetElementCustomEvent<V>;

  type DatavizTooltipContext<D = DatavizChartDatum> = {
    data?: D;
    itemData?: D;
    componentElement?: Element;
    [key: string]: any;
  };

  type DatavizThematicMapMarkerContentContext<D = DatavizChartDatum> =
    DatavizTemplateContext<D>;

  type DatavizSparkChartRowProps = {
    label: string;
    children?: ComponentChildren;
  };

  type DatavizNBoxDragContext = {
    nodes: Array<{
      id: string;
      label: string;
      secondaryLabel?: string;
      [key: string]: any;
    }>;
    [key: string]: any;
  };

  type DatavizNBoxKeyboardRequestEvent = CustomEvent<{
    source?: Array<{
      id: string;
      [key: string]: any;
    }>;
    target?: {
      row: string;
      column: string;
      [key: string]: any;
    };
    [key: string]: any;
  }>;

  type DatavizSunburstProps = Record<string, any>;

  type DatavizListSelectionChangedEvent<K, V> = JetElementCustomEvent<V> & {
    detail: JetElementCustomEvent<V>["detail"] & {
      items?: Array<{ key: K }>;
    };
  };
}

export {};
