import { h } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import type { ojTable } from "ojs/ojtable";
import * as deptData from "text!../../../data/cookbook/dataCollections/table/shared/departmentData.json";
import "ojs/ojinputtext";
import "ojs/ojradioset";
import "ojs/ojtable";
import "css!./demo.css";

interface Department {
  DepartmentId: number;
  DepartmentName: string;
  LocationId: number;
  ManagerId: number;
}

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type TableLayout = "contents" | "fixed";
type ColumnSizeValue = string | null;
type ColumnWeightValue = string | null;

const toColumnWeight = (value: ColumnWeightValue): number | null => {
  if (value == null || value.trim() === "") {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

export const TableColumnLayoutscorepack = () => {
  const tableRef = useRef<ojTable<Department["DepartmentId"], Department> | null>(null);
  const [selectedLayout, setSelectedLayout] = useState<TableLayout>("contents");
  const [col1Width, setCol1Width] = useState<ColumnSizeValue>(null);
  const [col1MinWidth, setCol1MinWidth] = useState<ColumnSizeValue>(null);
  const [col1MaxWidth, setCol1MaxWidth] = useState<ColumnSizeValue>(null);
  const [col1Weight, setCol1Weight] = useState<ColumnWeightValue>("1");
  const [col2Width, setCol2Width] = useState<ColumnSizeValue>(null);
  const [col2MinWidth, setCol2MinWidth] = useState<ColumnSizeValue>(null);
  const [col2MaxWidth, setCol2MaxWidth] = useState<ColumnSizeValue>(null);
  const [col2Weight, setCol2Weight] = useState<ColumnWeightValue>("1");
  const [col3Width, setCol3Width] = useState<ColumnSizeValue>(null);
  const [col3MinWidth, setCol3MinWidth] = useState<ColumnSizeValue>(null);
  const [col3MaxWidth, setCol3MaxWidth] = useState<ColumnSizeValue>(null);
  const [col3Weight, setCol3Weight] = useState<ColumnWeightValue>("1");
  const [col4Width, setCol4Width] = useState<ColumnSizeValue>(null);
  const [col4MinWidth, setCol4MinWidth] = useState<ColumnSizeValue>(null);
  const [col4MaxWidth, setCol4MaxWidth] = useState<ColumnSizeValue>(null);
  const [col4Weight, setCol4Weight] = useState<ColumnWeightValue>("1");

  const departments = useMemo(
    () => JSON.parse(deptData as string) as Department[],
    []
  );
  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<Department["DepartmentId"], Department>(departments, {
        keyAttributes: "DepartmentId"
      }),
    [departments]
  );
  const layoutValues = useMemo(
    () => [
      { value: "contents", label: "contents" },
      { value: "fixed", label: "fixed" }
    ],
    []
  );
  const selectedLayoutDP = useMemo(
    () => new ArrayDataProvider(layoutValues, { keyAttributes: "value" }),
    [layoutValues]
  );
  const tableColumns = useMemo(
    () => [
      {
        headerText: "Department Id",
        field: "DepartmentId",
        id: "depId",
        width: col1Width,
        minWidth: col1MinWidth,
        maxWidth: col1MaxWidth,
        weight: toColumnWeight(col1Weight)
      },
      {
        headerText: "Department Name",
        field: "DepartmentName",
        id: "depName",
        width: col2Width,
        minWidth: col2MinWidth,
        maxWidth: col2MaxWidth,
        weight: toColumnWeight(col2Weight)
      },
      {
        headerText: "Location Id",
        field: "LocationId",
        id: "locId",
        width: col3Width,
        minWidth: col3MinWidth,
        maxWidth: col3MaxWidth,
        weight: toColumnWeight(col3Weight)
      },
      {
        headerText: "Manager Id",
        field: "ManagerId",
        id: "manId",
        width: col4Width,
        minWidth: col4MinWidth,
        maxWidth: col4MaxWidth,
        weight: toColumnWeight(col4Weight)
      }
    ],
    [
      col1MaxWidth,
      col1MinWidth,
      col1Weight,
      col1Width,
      col2MaxWidth,
      col2MinWidth,
      col2Weight,
      col2Width,
      col3MaxWidth,
      col3MinWidth,
      col3Weight,
      col3Width,
      col4MaxWidth,
      col4MinWidth,
      col4Weight,
      col4Width
    ]
  );

  useEffect(() => {
    tableRef.current?.refresh();
  }, [tableColumns]);

  const handleSelectedLayoutValueChanged = (
    event: PropertyChangedEvent<TableLayout>
  ) => {
    setSelectedLayout(event.detail.value ?? "contents");
  };

  return (
    <div class="demo-column-layout-container">
      <section
        class="demo-column-layout-controls oj-panel oj-bg-neutral-30"
        aria-labelledby="tableLayoutHeading"
      >
        <div class="demo-column-layout-options">
          <h2 id="tableLayoutHeading" class="oj-typography-subheading-xs">
            Table layout
          </h2>
          <oj-radioset
            id="tableLayout"
            class="oj-choice-direction-row"
            labelledBy="tableLayoutHeading"
            value={selectedLayout}
            options={selectedLayoutDP}
            onvalueChanged={handleSelectedLayoutValueChanged}
          />
        </div>

        <div class="demo-column-layout-grid">
          <section class="demo-column-layout-column" aria-labelledby="column1Heading">
            <h3 id="column1Heading" class="oj-typography-subheading-xs">
              Column 1
            </h3>
            <oj-input-text
              id="width1"
              labelHint="width"
              labelEdge="inside"
              value={col1Width}
              onvalueChanged={(event) => setCol1Width(event.detail.value)}
            />
            <oj-input-text
              id="minWidth1"
              labelHint="minWidth"
              labelEdge="inside"
              value={col1MinWidth}
              onvalueChanged={(event) => setCol1MinWidth(event.detail.value)}
            />
            <oj-input-text
              id="maxWidth1"
              labelHint="maxWidth"
              labelEdge="inside"
              value={col1MaxWidth}
              onvalueChanged={(event) => setCol1MaxWidth(event.detail.value)}
            />
            <oj-input-text
              id="weight1"
              labelHint="weight"
              labelEdge="inside"
              value={col1Weight}
              onvalueChanged={(event) => setCol1Weight(event.detail.value)}
            />
          </section>

          <section class="demo-column-layout-column" aria-labelledby="column2Heading">
            <h3 id="column2Heading" class="oj-typography-subheading-xs">
              Column 2
            </h3>
            <oj-input-text
              id="width2"
              labelHint="width"
              labelEdge="inside"
              value={col2Width}
              onvalueChanged={(event) => setCol2Width(event.detail.value)}
            />
            <oj-input-text
              id="minWidth2"
              labelHint="minWidth"
              labelEdge="inside"
              value={col2MinWidth}
              onvalueChanged={(event) => setCol2MinWidth(event.detail.value)}
            />
            <oj-input-text
              id="maxWidth2"
              labelHint="maxWidth"
              labelEdge="inside"
              value={col2MaxWidth}
              onvalueChanged={(event) => setCol2MaxWidth(event.detail.value)}
            />
            <oj-input-text
              id="weight2"
              labelHint="weight"
              labelEdge="inside"
              value={col2Weight}
              onvalueChanged={(event) => setCol2Weight(event.detail.value)}
            />
          </section>

          <section class="demo-column-layout-column" aria-labelledby="column3Heading">
            <h3 id="column3Heading" class="oj-typography-subheading-xs">
              Column 3
            </h3>
            <oj-input-text
              id="width3"
              labelHint="width"
              labelEdge="inside"
              value={col3Width}
              onvalueChanged={(event) => setCol3Width(event.detail.value)}
            />
            <oj-input-text
              id="minWidth3"
              labelHint="minWidth"
              labelEdge="inside"
              value={col3MinWidth}
              onvalueChanged={(event) => setCol3MinWidth(event.detail.value)}
            />
            <oj-input-text
              id="maxWidth3"
              labelHint="maxWidth"
              labelEdge="inside"
              value={col3MaxWidth}
              onvalueChanged={(event) => setCol3MaxWidth(event.detail.value)}
            />
            <oj-input-text
              id="weight3"
              labelHint="weight"
              labelEdge="inside"
              value={col3Weight}
              onvalueChanged={(event) => setCol3Weight(event.detail.value)}
            />
          </section>

          <section class="demo-column-layout-column" aria-labelledby="column4Heading">
            <h3 id="column4Heading" class="oj-typography-subheading-xs">
              Column 4
            </h3>
            <oj-input-text
              id="width4"
              labelHint="width"
              labelEdge="inside"
              value={col4Width}
              onvalueChanged={(event) => setCol4Width(event.detail.value)}
            />
            <oj-input-text
              id="minWidth4"
              labelHint="minWidth"
              labelEdge="inside"
              value={col4MinWidth}
              onvalueChanged={(event) => setCol4MinWidth(event.detail.value)}
            />
            <oj-input-text
              id="maxWidth4"
              labelHint="maxWidth"
              labelEdge="inside"
              value={col4MaxWidth}
              onvalueChanged={(event) => setCol4MaxWidth(event.detail.value)}
            />
            <oj-input-text
              id="weight4"
              labelHint="weight"
              labelEdge="inside"
              value={col4Weight}
              onvalueChanged={(event) => setCol4Weight(event.detail.value)}
            />
          </section>
        </div>
      </section>

      <oj-table
        ref={tableRef}
        id="table"
        aria-label="Departments Table"
        class="demo-column-layout-table"
        data={dataProvider}
        layout={selectedLayout}
        columns={tableColumns}
        accessibility={{ rowHeader: "depName" }}
      />
    </div>
  );
};

export default TableColumnLayoutscorepack;
