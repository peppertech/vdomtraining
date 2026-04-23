import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import type { ItemContext } from "ojs/ojcommontypes";
import type {
  DataProvider,
  FetchByKeysParameters,
  FetchByKeysResults,
  FetchByOffsetParameters,
  FetchByOffsetResults,
  FetchListParameters,
  FetchListResult,
} from "ojs/ojdataprovider";
import { InputSearchElement } from "ojs/ojinputsearch";
import * as employeeDataText from "text!../data/employeeData.json";
import "ojs/ojhighlighttext";

export type BrowserSuggestion = {
  value: string;
  label: string;
};

export type OracleEmployee = {
  EMPLOYEE_ID: number;
  FIRST_NAME: string;
  LAST_NAME: string;
  EMAIL: string;
  PHONE_NUMBER: string;
  HIRE_DATE: string;
  SALARY: number;
  DEPARTMENT_ID: number;
  TITLE: string;
  IMAGE: string;
};

type SearchExampleState = {
  value: string;
  rawValue: string;
  searchTerm: string;
  searchItemContext: string;
  previousSearchTerm: string;
  searchTimestamp: string;
};

const browserSuggestions: BrowserSuggestion[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SA", label: "Safari" },
];

const employeeSuggestions = JSON.parse(employeeDataText) as OracleEmployee[];

const DEFAULT_STATE: SearchExampleState = {
  value: "",
  rawValue: "",
  searchTerm: "",
  searchItemContext: "",
  previousSearchTerm: "",
  searchTimestamp: "",
};

export const createBrowserSuggestionsDataProvider = () =>
  new ArrayDataProvider<BrowserSuggestion["value"], BrowserSuggestion>(
    browserSuggestions,
    { keyAttributes: "value" },
  );

export const createEmployeeLastNameDataProvider = () =>
  new ArrayDataProvider<OracleEmployee["EMPLOYEE_ID"], OracleEmployee>(
    employeeSuggestions,
    {
      keyAttributes: "EMPLOYEE_ID",
      textFilterAttributes: ["LAST_NAME"],
    },
  );

export const createEmployeeTemplateDataProvider = () =>
  new ArrayDataProvider<OracleEmployee["EMPLOYEE_ID"], OracleEmployee>(
    employeeSuggestions,
    {
      keyAttributes: "EMPLOYEE_ID",
      textFilterAttributes: ["LAST_NAME", "FIRST_NAME"],
    },
  );

const getCurrentTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};

const trimItemContext = <K, D>(itemContext?: ItemContext<K, D> | null) => {
  if (!itemContext) {
    return "";
  }

  return JSON.stringify({
    key: itemContext.key,
    data: itemContext.data,
    metadata: itemContext.metadata
      ? {
          key: itemContext.metadata.key,
        }
      : undefined,
  });
};

const wait = (duration: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, duration);
  });

export class DelayingDataProvider<K, D> implements DataProvider<K, D> {
  constructor(
    private readonly dataProvider: DataProvider<K, D>,
    private readonly delayMs: number,
  ) {}

  addEventListener(eventType: string, listener: EventListener): void {
    this.dataProvider.addEventListener(eventType, listener);
  }

  removeEventListener(eventType: string, listener: EventListener): void {
    this.dataProvider.removeEventListener(eventType, listener);
  }

  dispatchEvent(evt: Event): boolean {
    return this.dataProvider.dispatchEvent(evt);
  }

  containsKeys(parameters: FetchByKeysParameters<K>) {
    return this.dataProvider.containsKeys(parameters);
  }

  fetchByKeys(
    parameters: FetchByKeysParameters<K>,
  ): Promise<FetchByKeysResults<K, D>> {
    return this.dataProvider.fetchByKeys(parameters);
  }

  async fetchByOffset(
    parameters: FetchByOffsetParameters<D>,
  ): Promise<FetchByOffsetResults<K, D>> {
    await wait(this.delayMs);
    return this.dataProvider.fetchByOffset(parameters);
  }

  fetchFirst(
    parameters?: FetchListParameters<D>,
  ): AsyncIterable<FetchListResult<K, D>> {
    const iterable = this.dataProvider.fetchFirst(parameters);

    return {
      [Symbol.asyncIterator]: () => {
        const iterator = iterable[Symbol.asyncIterator]();

        return {
          next: async () => {
            await wait(this.delayMs);
            return iterator.next();
          },
          return:
            typeof iterator.return === "function"
              ? async (value?: unknown) => iterator.return!(value)
              : undefined,
          throw:
            typeof iterator.throw === "function"
              ? async (error?: unknown) => iterator.throw!(error)
              : undefined,
        };
      },
    };
  }

  getCapability(capabilityName: string): any {
    return this.dataProvider.getCapability(capabilityName);
  }

  getTotalSize(): Promise<number> {
    return this.dataProvider.getTotalSize();
  }

  isEmpty(): "yes" | "no" | "unknown" {
    return this.dataProvider.isEmpty();
  }

  createOptimizedKeyMap?(initialMap?: Map<K, D>): Map<K, D> {
    return this.dataProvider.createOptimizedKeyMap
      ? this.dataProvider.createOptimizedKeyMap(initialMap)
      : new Map(initialMap);
  }

  createOptimizedKeySet?(initialSet?: Set<K>): Set<K> {
    return this.dataProvider.createOptimizedKeySet
      ? this.dataProvider.createOptimizedKeySet(initialSet)
      : new Set(initialSet);
  }
}

export const useInputSearchExampleState = <
  K,
  D,
>(): SearchExampleState & {
  handleValueChanged: (event: InputSearchElement.valueChanged<K, D>) => void;
  handleRawValueChanged: (
    event: InputSearchElement.rawValueChanged<K, D>,
  ) => void;
  handleValueAction: (event: InputSearchElement.ojValueAction<K, D>) => void;
} => {
  const [state, setState] = useState<SearchExampleState>(DEFAULT_STATE);

  const handleValueChanged = useCallback(
    (event: InputSearchElement.valueChanged<K, D>) => {
      setState((current) => ({
        ...current,
        value: event.detail.value ?? "",
      }));
    },
    [],
  );

  const handleRawValueChanged = useCallback(
    (event: InputSearchElement.rawValueChanged<K, D>) => {
      setState((current) => ({
        ...current,
        rawValue: String(event.detail.value ?? ""),
      }));
    },
    [],
  );

  const handleValueAction = useCallback(
    (event: InputSearchElement.ojValueAction<K, D>) => {
      const { detail } = event;

      setState((current) => ({
        ...current,
        value: detail.value ?? "",
        searchTerm: detail.value ?? "",
        searchItemContext: trimItemContext(detail.itemContext),
        previousSearchTerm: detail.previousValue ?? "",
        searchTimestamp: getCurrentTime(),
      }));
    },
    [],
  );

  return {
    ...state,
    handleValueChanged,
    handleRawValueChanged,
    handleValueAction,
  };
};

type InputSearchDiagnosticsProps = {
  value: string;
  rawValue?: string;
  searchTerm?: string;
  searchItemContext?: string;
  previousSearchTerm?: string;
  searchTimestamp?: string;
  itemContextNote?: string;
};

export function InputSearchDiagnostics({
  value,
  rawValue,
  searchTerm,
  searchItemContext,
  previousSearchTerm,
  searchTimestamp,
  itemContextNote,
}: InputSearchDiagnosticsProps) {
  return (
    <div class="input-search-demo__metrics oj-sm-margin-4x-bottom">
      <div class="input-search-demo__metric">
        <span class="input-search-demo__metric-label">Value:</span>
        <span>{value || "None"}</span>
      </div>
      {rawValue !== undefined ? (
        <div class="input-search-demo__metric">
          <span class="input-search-demo__metric-label">Raw value:</span>
          <span>{rawValue || "None"}</span>
        </div>
      ) : null}
      {searchTerm !== undefined ? (
        <div class="input-search-demo__metric">
          <span class="input-search-demo__metric-label">
            ValueAction event search term:
          </span>
          <span>{searchTerm || "None"}</span>
        </div>
      ) : null}
      {searchItemContext !== undefined ? (
        <div class="input-search-demo__metric">
          <span class="input-search-demo__metric-label">
            ValueAction event item context:
          </span>
          <span>{searchItemContext || "None"}</span>
          {itemContextNote ? (
            <span class="input-search-demo__note">{itemContextNote}</span>
          ) : null}
        </div>
      ) : null}
      {previousSearchTerm !== undefined ? (
        <div class="input-search-demo__metric">
          <span class="input-search-demo__metric-label">
            ValueAction event previous search term:
          </span>
          <span>{previousSearchTerm || "None"}</span>
        </div>
      ) : null}
      {searchTimestamp !== undefined ? (
        <div class="input-search-demo__metric">
          <span class="input-search-demo__metric-label">
            ValueAction event last received:
          </span>
          <span>{searchTimestamp || "None"}</span>
        </div>
      ) : null}
    </div>
  );
}

export const renderEmployeeSuggestionItem = (
  itemCtx: InputSearchElement.SuggestionItemTemplateContext<
    OracleEmployee["EMPLOYEE_ID"],
    OracleEmployee
  >,
) => (
  <div class="input-search-demo__employee-result">
    <oj-highlight-text
      text={`${itemCtx.data.LAST_NAME}, ${itemCtx.data.FIRST_NAME}`}
      matchText={itemCtx.searchText ?? ""}
    ></oj-highlight-text>
  </div>
);
