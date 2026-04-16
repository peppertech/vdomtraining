import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/form-layout";
import "oj-c/list-view";
import "oj-c/list-item-layout";
import "oj-c/selector";
import "oj-c/selector-all";
import "oj-c/button";
import "oj-c/avatar";
import "oj-c/radioset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import {
  AllKeySetImpl,
  ImmutableKeySet,
  KeySetImpl,
} from "ojs/ojkeyset";
import { CListViewElement } from "oj-c/list-view";
import * as peopleData from "text!../data/peopleData.json";

type Employee = {
  id: number;
  image: string;
  name: string;
  title: string;
  department: string;
};

const employees = JSON.parse(peopleData as string) as Employee[];

type ListViewProps = ComponentProps<"oj-c-list-view">;
type ButtonProps = ComponentProps<"oj-c-button">;
type RadiosetProps = ComponentProps<"oj-c-radioset">;
type SelectorAllProps = ComponentProps<"oj-c-selector-all">;
type SelectionMode = Extract<
  NonNullable<ListViewProps["selectionMode"]>,
  "multiple" | "multipleToggle"
>;
type SelectionModeOption = {
  value: SelectionMode;
  label: string;
};

const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const selectionModeOptions: SelectionModeOption[] = [
  { value: "multiple", label: "Multiple" },
  { value: "multipleToggle", label: "Multiple Toggle" },
];

const emptyKeySet = () =>
  new KeySetImpl<Employee["id"]>([]) as ImmutableKeySet<Employee["id"]>;

const keySetToArray = (
  keySet: ImmutableKeySet<Employee["id"]> | undefined,
) => {
  if (!keySet) {
    return [];
  }

  if (keySet instanceof AllKeySetImpl) {
    const deleted = keySet.deletedValues();
    return employees
      .map((employee) => employee.id)
      .filter((id) => !deleted.has(id));
  }

  if (keySet instanceof KeySetImpl) {
    return Array.from(keySet.values());
  }

  if (typeof keySet.isAddAll === "function" && keySet.isAddAll()) {
    return employees.map((employee) => employee.id);
  }

  return [];
};

const CorePackListView = () => {
  const dataProvider = useMemo(
    () =>
      new MutableArrayDataProvider<Employee["id"], Employee>(employees, {
        keyAttributes: "id",
      }),
    [],
  );

  const employeeById = useMemo(() => {
    const map = new Map<Employee["id"], Employee>();
    employees.forEach((employee) => map.set(employee.id, employee));
    return map;
  }, []);

  const [selectedKeys, setSelectedKeys] = useState<
    ImmutableKeySet<Employee["id"]>
  >(() => emptyKeySet());
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("multiple");
  const [selectedIds, setSelectedIds] = useState<Employee["id"][]>([]);

  const syncSelection = useCallback(
    (keySet?: ImmutableKeySet<Employee["id"]>) => {
      const nextKeySet = keySet ?? emptyKeySet();
      setSelectedKeys(nextKeySet);
      setSelectedIds(keySetToArray(nextKeySet));
    },
    [],
  );

  const handleSelectedChanged = useCallback(
    (
      event: Parameters<
        NonNullable<ListViewProps["onselectedChanged"]>
      >[0],
    ) => {
      syncSelection(event.detail.value as ImmutableKeySet<Employee["id"]>);
    },
    [syncSelection],
  );

  const handleSelectAllChanged = useCallback(
    (
      event: Parameters<
        NonNullable<SelectorAllProps["onselectedKeysChanged"]>
      >[0],
    ) => {
      syncSelection(event.detail.value as ImmutableKeySet<Employee["id"]>);
    },
    [syncSelection],
  );

  const handleSelectionModeChanged = useCallback(
    (event: Parameters<NonNullable<RadiosetProps["onvalueChanged"]>>[0]) => {
      const value = event.detail.value;
      if (value === "multiple" || value === "multipleToggle") {
        setSelectionMode(value);
      }
      syncSelection();
    },
    [syncSelection],
  );

  const clearSelection = useCallback(
    (_event: Parameters<NonNullable<ButtonProps["onojAction"]>>[0]) => {
      syncSelection();
    },
    [syncSelection],
  );

  const renderItem = useCallback(
    (
      itemContext: CListViewElement.ItemTemplateContext<
        Employee["id"],
        Employee
      >,
    ) => {
      const employee = itemContext.data;
      return (
        <oj-c-list-item-layout>
          <oj-c-selector
            slot="selector"
            aria-label={`Select ${employee.name}`}
            id={`core-pack-listview-selector-${employee.id}`}
          ></oj-c-selector>
          <oj-c-avatar
            slot="leading"
            size="xs"
            src={employee.image}
            title={`Avatar of ${employee.name}`}
          ></oj-c-avatar>
          <span class="oj-typography-body-md oj-typography-bold">
            {employee.name}
          </span>
          <span
            slot="secondary"
            class="oj-typography-body-sm oj-text-color-secondary"
          >
            {employee.title}
          </span>
          <div slot="action" class="oj-flex oj-sm-flex-wrap-nowrap">
            <oj-c-button
              id={`save-${employee.id}`}
              size="sm"
              chroming="borderless"
              display="icons"
            >
              <span slot="startIcon" class="oj-ux-ico-save"></span>
              Save
            </oj-c-button>
            <oj-c-button
              id={`download-${employee.id}`}
              size="sm"
              chroming="borderless"
              display="icons"
            >
              <span slot="startIcon" class="oj-ux-ico-download"></span>
              Download
            </oj-c-button>
            <oj-c-button
              id={`print-${employee.id}`}
              size="sm"
              chroming="borderless"
              display="icons"
            >
              <span slot="startIcon" class="oj-ux-ico-print"></span>
              Print
            </oj-c-button>
          </div>
        </oj-c-list-item-layout>
      );
    },
    [],
  );

  const selectionDisplay = useMemo(() => {
    if (!selectedIds.length) {
      return "None";
    }
    return selectedIds
      .map((id) => employeeById.get(id)?.name ?? `Employee ${id}`)
      .join(", ");
  }, [employeeById, selectedIds]);

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <oj-c-form-layout maxColumns={1} userAssistanceDensity="compact">
          <oj-c-radioset
            id="core-pack-listview-selection-mode"
            labelHint="Selection Mode"
            options={selectionModeOptions}
            value={selectionMode}
            onvalueChanged={handleSelectionModeChanged}
          ></oj-c-radioset>
          <div>
            <oj-c-button
              size="sm"
              label="Clear Selection"
              onojAction={clearSelection}
            ></oj-c-button>
          </div>
        </oj-c-form-layout>
      </div>
      <oj-c-list-item-layout>
        <oj-c-selector-all
          slot="selector"
          id="core-pack-listview-select-all"
          aria-label="Select all employees"
          selectedKeys={selectedKeys}
          onselectedKeysChanged={handleSelectAllChanged}
        ></oj-c-selector-all>
        <span class="oj-typography-body-md oj-typography-bold">Select All</span>
      </oj-c-list-item-layout>
      <oj-c-list-view
        id="core-pack-listview"
        aria-label="list of employees"
        data={dataProvider}
        gridlines={gridlines}
        selectionMode={selectionMode}
        selected={selectedKeys}
        onselectedChanged={handleSelectedChanged}
        class="listview-sizing"
      >
        <template slot="itemTemplate" render={renderItem}></template>
      </oj-c-list-view>
      <div class="oj-sm-margin-4x-top">
        <div class="oj-typography-body-sm oj-sm-margin-2x-top">
          <span class="oj-typography-bold">Current Selection:</span>&nbsp;
          <span>{selectionDisplay}</span>
        </div>
        <div class="oj-typography-body-sm oj-sm-margin-2x-top">
          <span class="oj-typography-bold">
            IDs from selected change event:
          </span>
          &nbsp;
          <span>{JSON.stringify(selectedIds)}</span>
        </div>
      </div>
    </div>
  );
};

export default CorePackListView;
