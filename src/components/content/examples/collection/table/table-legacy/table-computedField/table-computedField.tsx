import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as Context from 'ojs/ojcontext';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import BufferingDataProvider = require('ojs/ojbufferingdataprovider');
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import { ojInputNumber } from 'ojs/ojinputnumber';
import { ojTable } from 'ojs/ojtable';
import * as empData from 'text!../../../data/cookbook/dataCollections/table/shared/employeeData.json';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojlabel';
import 'ojs/ojtable';
import "css!./demo.css";

interface EmployeeData {
    EmployeeId: number;
    FirstName: string;
    LastName: string;
    Salary: number;
    Bonus: number;
}

type TableColumns = ComponentProps<'oj-table'>['columns'];
type EditRowState = ComponentProps<'oj-table'>['editRow'];
type EditableRowTemplateContext = ojTable.RowTemplateContext<EmployeeData['EmployeeId'], EmployeeData> & {
    mode?: 'navigation' | 'edit';
};

export const TableComputedField = () => {
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>(
        () => JSON.parse(empData as string) as EmployeeData[]
    );
    const [rowData, setRowData] = useState<EmployeeData | null>(null);
    const [editRow, setEditRow] = useState<EditRowState>({ rowKey: null });
    const [editedData, setEditedData] = useState('');

    const tableRef = useRef<ojTable<EmployeeData['EmployeeId'], EmployeeData> | null>(null);
    const numberConverter = useMemo(() => new IntlNumberConverter(), []);
    const dataprovider = useMemo(() => new BufferingDataProvider<EmployeeData['EmployeeId'], EmployeeData>(
        new ArrayDataProvider<EmployeeData['EmployeeId'], EmployeeData>(employeeData, {
            keyAttributes: 'EmployeeId'
        })
    ), [employeeData]);
    const columnArray = useMemo<TableColumns>(() => [
        {
            field: 'EmployeeId',
            headerText: 'Employee Id',
            headerClassName: 'oj-helper-text-align-end',
            className: 'oj-helper-text-align-end oj-table-data-cell-padding',
            id: 'empId',
            minWidth: '8rem'
        },
        {
            headerText: 'Employee Name',
            minWidth: '10rem',
            className: 'oj-table-data-cell-padding',
            id: 'name'
        },
        {
            field: 'Salary',
            headerText: 'Salary',
            minWidth: '7rem',
            headerClassName: 'oj-helper-text-align-end',
            className: 'oj-helper-text-align-end',
            id: 'salary'
        },
        {
            field: 'Bonus',
            headerText: 'Bonus',
            minWidth: '6rem',
            headerClassName: 'oj-helper-text-align-end',
            className: 'oj-helper-text-align-end',
            id: 'bonus'
        },
        {
            headerText: 'Total Compensation',
            minWidth: '10rem',
            headerClassName: 'oj-helper-text-align-end',
            className: 'oj-helper-text-align-end oj-table-data-cell-padding',
            id: 'total'
        }
    ], []);

    const handleEditRowChanged = (event: Parameters<NonNullable<ComponentProps<'oj-table'>['oneditRowChanged']>>[0]) => {
        setEditRow(event.detail.value ?? { rowKey: null });
    };

    const updateRowData = <K extends keyof EmployeeData>(field: K, value: EmployeeData[K]) => {
        setRowData((currentData) => currentData ? { ...currentData, [field]: value } : currentData);
    };

    const beforeRowEditListener = (event: ojTable.ojBeforeRowEdit<EmployeeData['EmployeeId'], EmployeeData>) => {
        const itemData = event.detail.rowContext.item.data;
        setRowData(Object.assign({}, itemData));
    };

    const beforeRowEditEndListener = (event: ojTable.ojBeforeRowEditEnd<EmployeeData['EmployeeId'], EmployeeData>) => {
        setEditedData('');
        const detail = event.detail;
        if (!detail.cancelEdit) {
            const validateAndUpdate = async () => {
                const table = tableRef.current;
                if (!table) {
                    return;
                }
                const invalidInputs = await getValidationErrorElementsInRow(table);
                if (invalidInputs.length > 0) {
                    applyFocus(invalidInputs[0]);
                    throw new Error('validation failed');
                }
                const updatedRow = rowData ?? detail.rowContext.item.data;
                submitRow(detail.rowContext.item.data.EmployeeId, updatedRow);
                detail.setUpdatedItem(new Promise((resolve) => {
                    resolve({
                        updatedItem: {
                            data: updatedRow,
                            metadata: detail.rowContext.item.metadata
                        }
                    });
                }));
            };
            detail.accept(validateAndUpdate());
        }
    };

    const getValidationErrorElementsInRow = async (table: ojTable<EmployeeData['EmployeeId'], EmployeeData>) => {
        const invalidInputs: HTMLElement[] = [];
        const editables = table.querySelectorAll('.editable');
        for (let i = 0; i < editables.length; i++) {
            const inputControl = editables.item(i) as ojInputNumber;
            await inputControl.validate();
            if (inputControl.valid !== 'valid') {
                invalidInputs.push(inputControl);
            }
        }
        return invalidInputs;
    };

    const applyFocus = (element: HTMLElement) => {
        const tableElement = tableRef.current;
        if (!tableElement) {
            return;
        }
        const busyContext = Context.getContext(tableElement).getBusyContext();
        busyContext.whenReady().then(() => {
            element.focus();
        });
    };

    const submitRow = (key: EmployeeData['EmployeeId'], updatedRow: EmployeeData) => {
        dataprovider.updateItem({
            metadata: { key },
            data: updatedRow
        });
        const editItem = dataprovider.getSubmittableItems()[0];
        if (!editItem) {
            return;
        }
        dataprovider.setItemStatus(editItem, 'submitting');
        const itemData = editItem.item.data;
        if (itemData == null) {
            dataprovider.setItemStatus(editItem, 'submitted');
            return;
        }
        setEmployeeData((currentData) =>
            currentData.map((employee) =>
                employee.EmployeeId === editItem.item.metadata.key ? itemData : employee
            )
        );
        dataprovider.setItemStatus(editItem, 'submitted');
        setEditedData(JSON.stringify(editItem.item.data));
    };

    const rowTemplateRenderer = (row: EditableRowTemplateContext) => {
        const rowItem = row.item.data;
        const currentRowData = rowData?.EmployeeId === rowItem.EmployeeId ? rowData : rowItem;
        const isEditing = row.mode === 'edit' || editRow?.rowKey === row.item.metadata.key;
        const totalCompensation = currentRowData.Salary + currentRowData.Bonus;

        return (
            <tr>
                <td class="oj-helper-text-align-end oj-table-data-cell-padding">
                    {numberConverter.format(rowItem.EmployeeId)}
                </td>
                <td class="oj-table-data-cell-padding">
                    {rowItem.FirstName} {rowItem.LastName}
                </td>
                <td class="oj-helper-text-align-end">
                    {isEditing ? (
                        <oj-input-number
                            aria-label="Salary"
                            value={currentRowData.Salary}
                            min={1000}
                            max={1500000}
                            step={0}
                            class="editable"
                            onvalueChanged={(event) => updateRowData('Salary', event.detail.value ?? 0)}
                        />
                    ) : (
                        numberConverter.format(rowItem.Salary)
                    )}
                </td>
                <td class="oj-helper-text-align-end">
                    {isEditing ? (
                        <oj-input-number
                            aria-label="Bonus"
                            value={currentRowData.Bonus}
                            min={1000}
                            max={1500000}
                            step={0}
                            class="editable"
                            onvalueChanged={(event) => updateRowData('Bonus', event.detail.value ?? 0)}
                        />
                    ) : (
                        numberConverter.format(rowItem.Bonus)
                    )}
                </td>
                <td class="oj-helper-text-align-end oj-table-data-cell-padding">
                    {numberConverter.format(isEditing ? totalCompensation : rowItem.Salary + rowItem.Bonus)}
                </td>
            </tr>
        );
    };

    const ojTableProps: Partial<ComponentProps<'oj-table'>> = {
        accessibility: { rowHeader: 'name' },
        columnsDefault: { sortable: 'disabled' }
    };

    return (
        <div id="demoContainer">
            <oj-table
                ref={tableRef}
                id="table"
                aria-label="Employee Table"
                class="demo-table-container"
                data={dataprovider}
                editMode="rowEdit"
                layout="fixed"
                editRow={editRow}
                oneditRowChanged={handleEditRowChanged}
                onojBeforeRowEdit={beforeRowEditListener}
                onojBeforeRowEditEnd={beforeRowEditEndListener}
                columns={columnArray}
                {...ojTableProps}
            >
                <template slot="rowTemplate" render={rowTemplateRenderer} />
            </oj-table>
            <br />
            <br />
            To edit a row, double click on the row, or press Enter. Press Enter to submit the edit.
            Press the Esc key to cancel the edit and return to readonly.
            <br />
            <br />
            <oj-label for="editedContent">Edited Data:</oj-label>
            <oj-text-area id="editedContent" rows={3} value={editedData} />
        </div>
    );
};

export default TableComputedField;
