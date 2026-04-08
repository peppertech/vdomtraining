import { h, ComponentProps } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/list-view";
import "oj-c/list-item-layout";
import "oj-c/selector";
import "oj-c/button";
import "oj-c/avatar";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import {
  AllKeySetImpl,
  ImmutableKeySet,
  KeySet,
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
type SelectorProps = ComponentProps<"oj-c-selector">;
type ButtonProps = ComponentProps<"oj-c-button">;

const gridlines: ListViewProps["gridlines"] = { item: "visible" };

const emptyKeySet = () =>
  new KeySetImpl<Employee["id"]>([]) as ImmutableKeySet<Employee["id"]>;

const normalizeKeySet = (
  keySet: KeySet<Employee["id"]>,
): ImmutableKeySet<Employee["id"]> => {
  if (!keySet) {
    return emptyKeySet();
  }

  if (keySet instanceof AllKeySetImpl) {
    return keySet as ImmutableKeySet<Employee["id"]>;
  }

  if (keySet instanceof KeySetImpl) {
    return new KeySetImpl<Employee["id"]>(
      Array.from(keySet.values()),
    ) as ImmutableKeySet<Employee["id"]>;
  }

  return emptyKeySet();
};

const keySetToArray = (
  keySet: KeySet<Employee["id"]> | ImmutableKeySet<Employee["id"]>,
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
  const [selectedIds, setSelectedIds] = useState<Employee["id"][]>([]);

  const handleSelectedChanged = useCallback(
    (
      event: Parameters<
        NonNullable<ListViewProps["onselectedChanged"]>
      >[0],
    ) => {
      const keySet = event.detail.value as KeySet<Employee["id"]>;
      const normalized = normalizeKeySet(keySet);
      const ids = keySetToArray(normalized);
      setSelectedKeys(normalized);
      setSelectedIds(ids);
    },
    [],
  );

  const handleSelectorKeyChanged = useCallback(
    (
      event: Parameters<NonNullable<SelectorProps["onselectedKeysChanged"]>>[0],
    ) => {
      const keySet = event.detail.value as KeySet<Employee["id"]>;
      const normalized = normalizeKeySet(keySet);
      const ids = keySetToArray(normalized);
      setSelectedKeys(normalized);
      setSelectedIds(ids);
    },
    [],
  );

  const clearSelection = useCallback(
    (_event: Parameters<NonNullable<ButtonProps["onojAction"]>>[0]) => {
      setSelectedKeys(emptyKeySet());
      setSelectedIds([]);
    },
    [],
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
          {/* <oj-c-selector
            slot="selector"
            aria-label={`Select ${employee.name}`}
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onselectedKeysChanged={handleSelectorKeyChanged}
            rowKey={employee.id}
            id={`core-pack-listview-selector-${employee.id}`}
          ></oj-c-selector> */}
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
    [handleSelectorKeyChanged, selectedKeys],
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
      <oj-c-list-view
        id="core-pack-listview"
        aria-label="list of employees"
        data={dataProvider}
        gridlines={gridlines}
        selectionMode="multiple"
        selected={selectedKeys}
        onselectedChanged={handleSelectedChanged}
        class="listview-sizing"
      >
        <template slot="itemTemplate" render={renderItem}></template>
      </oj-c-list-view>
      <div class="oj-sm-margin-4x-top">
        <oj-c-button size="sm" label="Clear Selection" onojAction={clearSelection}></oj-c-button>
        <div class="oj-typography-body-sm oj-sm-margin-2x-top">
          <span class="oj-typography-bold">Current Selection:</span>&nbsp;
          <span>{selectionDisplay}</span>
        </div>
      </div>
    </div>
  );
};

export default CorePackListView;
