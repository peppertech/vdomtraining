import { JetElementCustomEvent } from 'ojs/index';
import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import BufferingDataProvider = require('ojs/ojbufferingdataprovider');
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import * as Context from 'ojs/ojcontext';
import { ojTable } from 'ojs/ojtable';
import { ojInputText } from 'ojs/ojinputtext';
import { ojInputDate } from 'ojs/ojdatetimepicker';
import { ojSelectSingle } from 'ojs/ojselectsingle';
import { ojComboboxOne } from 'ojs/ojselectcombobox';
import { ojValidationGroup } from 'ojs/ojvalidationgroup';
import * as deptDataText from 'text!../../../data/cookbook/dataCollections/table/shared/departmentData.json';
import 'ojs/ojvalidationgroup';
import 'ojs/ojinputtext';
import 'ojs/ojinputnumber';
import 'ojs/ojdatetimepicker';
import 'ojs/ojselectcombobox';
import 'ojs/ojcheckboxset';
import 'ojs/ojtable';
import 'ojs/ojtoolbar';
import 'ojs/ojbutton';
import 'ojs/ojselectsingle';
import 'ojs/ojoption';
import 'ojs/ojformlayout';
import 'ojs/ojlabelvalue';
import '../../../../../../jet-composites/demo-radioset-enum/loader';
import { Item } from 'ojs/ojdataprovider';
import { KeySetImpl } from 'ojs/ojkeyset';
import 'ojs/ojlabel';
import "css!./demo.css";
interface DepartmentData {
    DepartmentId: number;
    DepartmentName: string;
    LocationId: number;
    ManagerId: number;
    Type: string;
    Currency: string;
    StartDate: string;
}
interface SelectSingleData {
    label: string;
}
type SimulatedDelays = 'off' | 'on';
type InputNumberValue = ComponentProps<'oj-input-number'>['value'];
type TableEditRow = ComponentProps<'oj-table'>['editRow'];
type TableColumns = ComponentProps<'oj-table'>['columns'];
type EditableRowTemplateContext = ojTable.RowTemplateContext<DepartmentData['DepartmentId'], DepartmentData> & {
    mode?: 'navigation' | 'edit';
};
const deptData = JSON.parse(deptDataText as string) as DepartmentData[];
export const TableEditableFormTable = () => {
    const deptArray = useMemo<DepartmentData[]>(() => deptData, []);
    const [deptObservableArray, setDeptObservableArray] = useState<DepartmentData[]>(() => [...deptArray]);
    const [simulatedDelays, setSimulatedDelays] = useState<SimulatedDelays>('off');
    const [editDelay, setEditDelay] = useState<InputNumberValue>(2000);
    const [editEndDelay, setEditEndDelay] = useState<InputNumberValue>(2000);
    const [editedData, setEditedData] = useState<string>('');
    const [editRow, setEditRow] = useState<TableEditRow>({ rowKey: null });
    const originalDataRef = useRef<DepartmentData | null>(null);
    const rowDataRef = useRef<DepartmentData | null>(null);
    const cancelEditRef = useRef<boolean | null>(null);
    const tableRef = useRef<ojTable<DepartmentData['DepartmentId'], DepartmentData> | null>(null);
    const dataprovider = useMemo(() => new BufferingDataProvider(new ArrayDataProvider(deptObservableArray, {
        keyAttributes: 'DepartmentId'
    })), [deptObservableArray]);
    const departments = useMemo(() => new ArrayDataProvider([{ label: 'Sales' }, { label: 'HR' }, { label: 'Marketing' }, { label: 'Finance' }], { keyAttributes: 'label' }), []);
    const isDelayDisabled = simulatedDelays === 'off';
    const disabledKeys = useMemo(() => new KeySetImpl([20, 40]), []);
    const numberConverter = useMemo(() => new IntlNumberConverter({ useGrouping: false }), []);
    const dateConverter = useMemo(() => new IntlDateTimeConverter({
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    }), []);
    const columns = useMemo<TableColumns>(() => ([
        {
            field: 'DepartmentId',
            headerText: 'Department Id',
            headerClassName: 'oj-helper-text-align-end',
            className: 'oj-helper-text-align-end',
            sortProperty: 'DepartmentId',
            id: 'depId'
        },
        {
            field: 'DepartmentName',
            headerText: 'Department Name',
            headerClassName: 'oj-sm-only-hide',
            className: 'oj-sm-only-hide',
            sortProperty: 'DepartmentName',
            id: 'depName'
        },
        {
            field: 'LocationId',
            headerText: 'Location Id',
            headerClassName: 'oj-helper-text-align-end oj-sm-only-hide ',
            className: 'oj-helper-text-align-end oj-sm-only-hide',
            sortProperty: 'LocationId',
            id: 'locId'
        },
        {
            field: 'Type',
            headerText: 'Type',
            sortProperty: 'Type',
            id: 'type'
        },
        {
            field: 'StartDate',
            headerText: 'Start Date',
            headerClassName: 'oj-sm-only-hide',
            className: 'oj-sm-only-hide',
            sortProperty: 'StartDate',
            id: 'start'
        },
        {
            sortable: 'disabled',
            width: '5rem',
            headerClassName: 'oj-helper-text-align-end',
            className: 'oj-helper-text-align-end',
            id: 'action'
        }
    ]), []);
    const handleSimulatedDelaysValueChanged = (event: JetElementCustomEvent<SimulatedDelays>) => {
        setSimulatedDelays(event.detail.value);
    };
    const handleEditDelayValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setEditDelay(event.detail.value);
    };
    const handleEditEndDelayValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0]) => {
        setEditEndDelay(event.detail.value);
    };
    const handleEditRowEditRowChanged = (event: Parameters<NonNullable<ComponentProps<'oj-table'>['oneditRowChanged']>>[0]) => {
        setEditRow(event.detail.value);
    };
    const rowEditable = (item: Item<DepartmentData['DepartmentId'], DepartmentData>) => {
        if (disabledKeys.has(item.metadata.key)) {
            return 'off';
        }
        return 'on';
    };
    const beforeRowEditListener = (event: ojTable.ojBeforeRowEdit<DepartmentData['DepartmentId'], DepartmentData>) => {
        event.detail.accept(new Promise<void>((resolve) => {
            if (simulatedDelays === 'on') {
                setTimeout(() => {
                    prepareEdit(event);
                    resolve();
                }, editDelay ?? 0);
            }
            else {
                prepareEdit(event);
                resolve();
            }
        }));
    };
    const prepareEdit = (event: ojTable.ojBeforeRowEdit<DepartmentData['DepartmentId'], DepartmentData>) => {
        cancelEditRef.current = false;
        const itemData = event.detail.rowContext.item.data;
        originalDataRef.current = Object.assign({}, itemData);
        rowDataRef.current = Object.assign({}, itemData);
    };
    const beforeRowEditEndListener = (event: ojTable.ojBeforeRowEditEnd<DepartmentData['DepartmentId'], DepartmentData>) => {
        setEditedData('');
        const detail = event.detail;
        // an edit cancel via the 'cancel' button is a submit as far as the table is concerned,
        // so we prevent an extra fetch by pushing the existing item data back into the table.
        // this is NOT needed when detail.cancelEdit is set as no fetch is triggered in that case.
        if (cancelEditRef.current) {
            detail.setUpdatedItem(new Promise((resolve) => {
                resolve({ updatedItem: detail.rowContext.item });
            }));
        }
        else if (!detail.cancelEdit) {
            const validateAndUpdate = async () => {
                const ok = await validateEdits(event);
                if (!ok) {
                    // if an invalid input is found, prevent edit mode from exiting
                    throw new Error('validation failed');
                }
                else {
                    // validation succeeded. prevent an extra fetch by pushing the new item data back
                    // into the table. otherwise, the table will need to trigger its own fetch.
                    detail.setUpdatedItem(new Promise((resolve) => {
                        resolve({
                            updatedItem: {
                                data: rowDataRef.current!,
                                metadata: detail.rowContext.item.metadata
                            }
                        });
                    }));
                }
            };
            // utilizing the detail.accept functionality ensures that the table properly waits for
            // any async input validation to occur before exiting edit mode fully. a loading bar will
            // be rendered in place of the edited row while pending validation is still running.
            detail.accept(simulatedDelays === 'off'
                ? validateAndUpdate()
                : new Promise<void>((resolve, reject) => {
                    const validate = () => {
                        validateAndUpdate()
                            .then(() => {
                            resolve();
                        })
                            .catch(() => {
                            // catch and reject validation promise if any invalid inputs are present
                            reject();
                        });
                    };
                    if (simulatedDelays === 'on') {
                        setTimeout(() => {
                            validate();
                        }, editEndDelay ?? 0);
                    }
                    else {
                        validate();
                    }
                }));
        }
    };
    const validateEdits = async (event: ojTable.ojBeforeRowEditEnd<DepartmentData['DepartmentId'], DepartmentData>) => {
        if (!tableRef.current) {
            return false;
        }
        const hasError = await hasValidationErrorInRow(tableRef.current);
        if (hasError) {
            return false;
        }
        else {
            if (isRowDataUpdated()) {
                const key = event.detail.rowContext.item.data.DepartmentId;
                submitRow(key);
            }
            return true;
        }
    };
    const submitRow = (key: DepartmentData['DepartmentId']) => {
        dataprovider.updateItem({
            metadata: { key: key },
            data: rowDataRef.current
        });
        const editItem = dataprovider.getSubmittableItems()[0];
        if (!editItem) {
            return;
        }
        dataprovider.setItemStatus(editItem, 'submitting');
        for (let idx = 0; idx < deptObservableArray.length; idx++) {
            if (deptObservableArray[idx].DepartmentId === editItem.item.metadata.key) {
                deptObservableArray.splice(idx, 1, editItem.item.data as DepartmentData);
                break;
            }
        }
        // Set the edit item to "submitted" if successful
        dataprovider.setItemStatus(editItem, 'submitted');
        setEditedData(JSON.stringify(editItem.item.data));
    };
    const isRowDataUpdated = () => {
        if (!rowDataRef.current || !originalDataRef.current) {
            return false;
        }
        const propNames = Object.keys(rowDataRef.current) as Array<keyof DepartmentData>;
        for (let i = 0; i < propNames.length; i++) {
            if (rowDataRef.current[propNames[i]] !== originalDataRef.current[propNames[i]]) {
                return true;
            }
        }
        return false;
    };
    const updateRowData = <K extends keyof DepartmentData>(field: K, value: DepartmentData[K]) => {
        if (!rowDataRef.current) {
            return;
        }
        rowDataRef.current = { ...rowDataRef.current, [field]: value };
    };
    const hasValidationErrorInRow = async (table: ojTable<DepartmentData['DepartmentId'], DepartmentData>) => {
        const editables = table.querySelectorAll('.editable');
        for (let i = 0; i < editables.length; i++) {
            const inputControl = editables.item(i) as ojInputText | ojInputDate | ojSelectSingle<SelectSingleData['label'], SelectSingleData> | ojComboboxOne<string, string>;
            // make sure to call 'validate' on each input control to ensure component is fully
            // validated prior to checking its 'valid' state below. otherwise pending edits could
            // be missed due to race conditions between the table's edit mode ending due to focus
            // loss and the input control's new value being submitted due to the same focus loss
            await inputControl.validate();
        }
        const tracker = table.querySelector<ojValidationGroup>('#tracker');
        if (tracker?.valid === 'valid') {
            return false;
        }
        else {
            const tableElement = tableRef.current;
            if (!tableElement) {
                return true;
            }
            let busyContext = Context.getContext(tableElement).getBusyContext();
            busyContext.whenReady().then(() => {
                tracker?.focusOn('@firstInvalidShown');
            });
            return true;
        }
    };
    const handleUpdate = (rowKey: DepartmentData['DepartmentId']) => () => {
        setEditRow({ rowKey });
    };
    const handleDone = () => {
        setEditRow({ rowKey: null });
    };
    const handleCancel = () => {
        cancelEditRef.current = true;
        setEditRow({ rowKey: null });
    };
    const ojTableProps: Partial<ComponentProps<'oj-table'>> = { accessibility: {
            rowHeader: "depName"
        }, row: {
            editable: rowEditable
        } };
    const rowTemplateRenderer = (row: EditableRowTemplateContext) => {
        const rowData = row.item.data;
        const currentRowData = rowDataRef.current ?? rowData;
        if (row.mode === 'edit') {
            return (
                <tr>
                    <td colSpan={6} class="oj-form-control-default">
                        <oj-validation-group id="tracker">
                            <oj-form-layout maxColumns={3} direction="row" class="oj-formlayout-full-width">
                                <oj-input-text
                                    labelHint="Department Name"
                                    value={currentRowData.DepartmentName}
                                    class="editable"
                                    onvalueChanged={(event) => updateRowData('DepartmentName', event.detail.value ?? '')}
                                />
                                <oj-input-number
                                    labelHint="Location Id"
                                    value={currentRowData.LocationId}
                                    converter={numberConverter}
                                    class="editable"
                                    onvalueChanged={(event) => updateRowData('LocationId', Number(event.detail.value ?? 0))}
                                />
                                <oj-input-number
                                    labelHint="Manager Id"
                                    value={currentRowData.ManagerId}
                                    converter={numberConverter}
                                    class="editable"
                                    onvalueChanged={(event) => updateRowData('ManagerId', Number(event.detail.value ?? 0))}
                                />
                                <oj-select-single
                                    labelHint="Type"
                                    value={currentRowData.Type}
                                    data={departments}
                                    class="editable"
                                    onvalueChanged={(event) => updateRowData('Type', event.detail.value ?? '')}
                                />
                                <oj-combobox-one
                                    labelHint="Currency"
                                    value={currentRowData.Currency}
                                    class="editable"
                                    onvalueChanged={(event) => updateRowData('Currency', event.detail.value ?? '')}
                                >
                                    <oj-option value="USD">USD</oj-option>
                                    <oj-option value="JPY">JPY</oj-option>
                                    <oj-option value="EUR">EUR</oj-option>
                                </oj-combobox-one>
                                <oj-input-date
                                    labelHint="Start Date"
                                    value={currentRowData.StartDate}
                                    class="editable"
                                    onvalueChanged={(event) => updateRowData('StartDate', event.detail.value ?? '')}
                                />
                            </oj-form-layout>
                            <oj-toolbar chroming="borderless" class="oj-sm-padding-0-vertical oj-sm-padding-4x-end oj-sm-float-end">
                                <oj-button display="icons" onojAction={handleDone} data-oj-clickthrough="disabled">
                                    <span slot="startIcon" class="oj-ux-ico-check" />
                                    Save
                                </oj-button>
                                <oj-button display="icons" onojAction={handleCancel} data-oj-clickthrough="disabled">
                                    <span slot="startIcon" class="oj-ux-ico-multiply" />
                                    Cancel
                                </oj-button>
                            </oj-toolbar>
                        </oj-validation-group>
                    </td>
                </tr>
            );
        }
        return (
            <tr>
                <td class="oj-helper-text-align-end">{numberConverter.format(rowData.DepartmentId)}</td>
                <td class="oj-sm-only-hide">{rowData.DepartmentName}</td>
                <td class="oj-helper-text-align-end oj-sm-only-hide">{numberConverter.format(rowData.LocationId)}</td>
                <td>{rowData.Type}</td>
                <td class="oj-sm-only-hide">{dateConverter.format(rowData.StartDate)}</td>
                <td class="oj-helper-text-align-end">
                    <oj-button
                        display="icons"
                        chroming="borderless"
                        disabled={disabledKeys.has(row.item.metadata.key)}
                        onojAction={handleUpdate(row.item.metadata.key)}
                        data-oj-clickthrough="disabled"
                    >
                        <span slot="startIcon" class="oj-ux-ico-edit" />
                        Edit
                    </oj-button>
                </td>
            </tr>
        );
    };
    return (<div id="tableWrapper">
            <div class="oj-panel oj-bg-neutral-30">
                    <h2 id="table-controls-heading" class="oj-typography-subheading-md">Options To Control The Table Below</h2>
                    <oj-form-layout aria-controls="table" maxColumns={3} class="oj-formlayout-full-width">
                              <demo-radioset-enum direction="row" labelHint="Simulated Delays" onvalueChanged={handleSimulatedDelaysValueChanged} value={simulatedDelays} enumValues={"[\"off\", \"on\"]"}/>
                              <oj-input-number id="edit-delay-input" min={0} disabled={isDelayDisabled} step={200} onvalueChanged={handleEditDelayValueChanged} value={editDelay} labelHint="Simulated Enter Edit Mode Delay (ms)"/>
                              <oj-input-number id="edit-end-delay-input" min={0} disabled={isDelayDisabled} step={200} onvalueChanged={handleEditEndDelayValueChanged} value={editEndDelay} labelHint="Simulated Submit Edit Delay (ms)"/>
                          </oj-form-layout>
                </div>
            <oj-table ref={tableRef} id="table" class="demo-table-container" aria-label="Departments Table" data={dataprovider} editMode="rowEdit" oneditRowChanged={handleEditRowEditRowChanged} editRow={editRow} onojBeforeRowEdit={beforeRowEditListener} onojBeforeRowEditEnd={beforeRowEditEndListener} layout="fixed" columns={columns} {...ojTableProps}>
                <template slot="rowTemplate" render={rowTemplateRenderer}/>
            </oj-table>
            <br />
            <br />
            <oj-label for="editedContent">Edited Data:</oj-label>
            <oj-text-area id="editedContent" rows={3} value={editedData}/>
        </div>);
};
export default TableEditableFormTable;
