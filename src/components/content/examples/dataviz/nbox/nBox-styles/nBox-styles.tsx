import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/nBox/resources/employees.json';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'css!./demo.css';
import 'ojs/ojnbox';
import 'ojs/ojinputtext';
import 'ojs/ojinputnumber';
import 'ojs/ojcheckboxset';
import 'ojs/ojformlayout';
import '../../../../../jet-composites/demo-input-json/loader';
import '../../../../../jet-composites/demo-select-enum/loader';
import '../../../../../jet-composites/demo-tabs/loader';
import 'ojs/ojoption';

type Employee = {
    name: string;
    position: string;
    potential: string;
    performance: string;
    image?: string;
    initials?: string;
    background?: string;
};

type NodeTemplateContext = {
    data: Employee;
};

type PropertyChangedEvent<T> = CustomEvent<{
    value: T;
}>;
type NullableArrayChangedEvent<T> = CustomEvent<{
    value: T[] | null;
}>;
type StyleObject = Record<string, string | number>;
type NBoxTab = 'gridStyles' | 'cellStyles' | 'nodeStyles';
type CellLabelAlign = 'start' | 'center' | 'end';
type CountLabelContext = {
    nodeCount: number;
    totalNodeCount: number;
};
type NBoxCellDefaults = {
    labelStyle: StyleObject;
    labelHalign?: CellLabelAlign;
};
type NBoxNodeDefaults = {
    labelStyle: StyleObject;
    secondaryLabelStyle: StyleObject;
    borderWidth: number;
    color?: string;
    indicatorColor?: string;
    borderColor?: string;
};
type NBoxStyleDefaults = {
    rowsTitleStyle: StyleObject;
    rowLabelStyle: StyleObject;
    columnsTitleStyle: StyleObject;
    columnLabelStyle: StyleObject;
    cellDefaults?: NBoxCellDefaults;
    nodeDefaults?: NBoxNodeDefaults;
};

const data = JSON.parse(jsonDataText as string) as Employee[];

export const NBoxStyles = () => {
    const [currentTab, setCurrentTab] = useState<NBoxTab>('gridStyles');
    const [rowsTitleStyle, setRowsTitleStyle] = useState<StyleObject>({ color: '#000000' });
    const [rowsTitleShow, setRowsTitleShow] = useState<string[]>(['true']);
    const [rowLabelStyle, setRowLabelStyle] = useState<StyleObject>({ fontWeight: 'bold' });
    const [rowLabelShow, setRowLabelShow] = useState<string[]>(['true']);
    const [columnsTitleStyle, setColumnsTitleStyle] = useState<StyleObject>({ color: '#000000' });
    const [columnsTitleShow, setColumnsTitleShow] = useState<string[]>(['true']);
    const [columnLabelStyle, setColumnLabelStyle] = useState<StyleObject>({ fontWeight: 'bold' });
    const [columnLabelShow, setColumnLabelShow] = useState<string[]>(['true']);
    const [cellLabelStyle, setCellLabelStyle] = useState<StyleObject>({ color: '#226622' });
    const [cellLabelShow, setCellLabelShow] = useState<string[]>(['true']);
    const [cellShowCount, setCellShowCount] = useState<string[]>([]);
    const [cellCustomCount, setCellCustomCount] = useState<string[]>([]);
    const [cellLabelAlign, setCellLabelAlign] = useState<CellLabelAlign>('start');
    const [nodeColor, setNodeColor] = useState<string>('rgb(255,255,255)');
    const [nodeIndicatorColor, setNodeIndicatorColor] = useState<string>('rgb(97, 99, 96)');
    const [nodeLabelStyle, setNodeLabelStyle] = useState<StyleObject>({ color: '#000000' });
    const [nodeSecondaryLabelStyle, setNodeSecondaryLabelStyle] = useState<StyleObject>({ color: '#000000' });
    const [nodeBorderColor, setNodeBorderColor] = useState<string>('rgb(0,0,0)');
    const [nodeBorderWidth, setNodeBorderWidth] = useState<number>(0);
    const dataProvider = useMemo(
        () => new ArrayDataProvider<Employee['name'], Employee>(data, { keyAttributes: 'name' }),
        []
    );
    const disableCustomCount = useMemo(() => !cellShowCount[0], [cellShowCount]);
    const rows = useMemo(() => rowLabelShow[0]
        ? [
            { id: '0', label: 'Low' },
            { id: '1', label: 'Medium' },
            { id: '2', label: 'High' }
        ]
        : [{ id: '0' }, { id: '1' }, { id: '2' }], [rowLabelShow]);
    const columns = useMemo(() => columnLabelShow[0]
        ? [
            { id: '0', label: 'Poor' },
            { id: '1', label: 'Fair' },
            { id: '2', label: 'Good' }
        ]
        : [{ id: '0' }, { id: '1' }, { id: '2' }], [columnLabelShow]);
    const cells = useMemo(() => {
        const showCount = cellShowCount[0] ? 'on' : 'off';
        return cellLabelShow[0]
            ? [
                { row: '0', column: '0', label: 'Misaligned Talent', shortDesc: 'Misaligned Talent', showCount },
                { row: '0', column: '1', label: 'Solid Talent', shortDesc: 'Solid Talent', showCount },
                { row: '0', column: '2', label: 'Expert Talent', shortDesc: 'Expert Talent', showCount },
                { row: '1', column: '0', label: 'Unproven Talent', shortDesc: 'Unproven Talent', showCount },
                { row: '1', column: '1', label: 'Core Talent', shortDesc: 'Core Talent', showCount },
                { row: '1', column: '2', label: 'Flexible Talent', shortDesc: 'Flexible Talent', showCount },
                { row: '2', column: '0', label: 'Evolving Talent', shortDesc: 'Evolving Talent', showCount },
                { row: '2', column: '1', label: 'Emerging Talent', shortDesc: 'Emerging Talent', showCount },
                { row: '2', column: '2', label: 'Top Talent', shortDesc: 'Top Talent', showCount }
            ]
            : [
                { row: '0', column: '0', shortDesc: 'Low Potential, Poor Performance' },
                { row: '0', column: '1', shortDesc: 'Low Potential, Fair Performance' },
                { row: '0', column: '2', shortDesc: 'Low Potential, Good Performance' },
                { row: '1', column: '0', shortDesc: 'Medium Potential, Poor Performance' },
                { row: '1', column: '1', shortDesc: 'Medium Potential, Fair Performance' },
                { row: '1', column: '2', shortDesc: 'Medium Potential, Good Performance' },
                { row: '2', column: '0', shortDesc: 'High Potential, Poor Performance' },
                { row: '2', column: '1', shortDesc: 'High Potential, Fair Performance' },
                { row: '2', column: '2', shortDesc: 'High Potential, Good Performance' }
            ];
    }, [cellLabelShow, cellShowCount]);
    const customCountLabelFunc = useMemo(() => {
        if (!cellCustomCount[0]) {
            return null;
        }
        return (dataContext: CountLabelContext) => {
            let s = String(dataContext.nodeCount);
            const percent = Math.round((100 * dataContext.nodeCount) / dataContext.totalNodeCount);
            s += ` (${percent}%)`;
            return s;
        };
    }, [cellCustomCount]);
    const rowsTitle = useMemo(() => (rowsTitleShow[0] ? 'Potential' : undefined), [rowsTitleShow]);
    const columnsTitle = useMemo(() => (columnsTitleShow[0] ? 'Performance' : undefined), [columnsTitleShow]);
    const styleDefaults = useMemo(() => {
        const defaults: NBoxStyleDefaults = {
            rowsTitleStyle,
            rowLabelStyle,
            columnsTitleStyle,
            columnLabelStyle
        };
        const cellDefaults: NBoxCellDefaults = { labelStyle: cellLabelStyle };
        if (cellLabelAlign) {
            cellDefaults.labelHalign = cellLabelAlign;
        }
        defaults.cellDefaults = cellDefaults;
        const nodeDefaults: NBoxNodeDefaults = {
            labelStyle: nodeLabelStyle,
            secondaryLabelStyle: nodeSecondaryLabelStyle,
            borderWidth: nodeBorderWidth
        };
        if (nodeColor && nodeColor.trim().length > 0) {
            nodeDefaults.color = nodeColor;
        }
        if (nodeIndicatorColor && nodeIndicatorColor.trim().length > 0) {
            nodeDefaults.indicatorColor = nodeIndicatorColor;
        }
        if (nodeBorderColor && nodeBorderColor.trim().length > 0) {
            nodeDefaults.borderColor = nodeBorderColor;
        }
        defaults.nodeDefaults = nodeDefaults;
        return defaults;
    }, [
        rowsTitleStyle,
        rowLabelStyle,
        columnsTitleStyle,
        columnLabelStyle,
        cellLabelStyle,
        cellLabelAlign,
        nodeColor,
        nodeIndicatorColor,
        nodeLabelStyle,
        nodeSecondaryLabelStyle,
        nodeBorderColor,
        nodeBorderWidth
    ]);
    const tabHeaders = useMemo(() => [
        { id: 'gridStyles', label: 'Grid Styles' },
        { id: 'cellStyles', label: 'Cell Styles' },
        { id: 'nodeStyles', label: 'Node Styles' }
    ], []);
    const handleCurrentTabValueChanged = (event: PropertyChangedEvent<NBoxTab>) => {
        setCurrentTab(event.detail.value);
    };
    const handleRowsTitleStyleValueChanged = (event: PropertyChangedEvent<StyleObject>) => {
        setRowsTitleStyle(event.detail.value);
    };
    const handleRowsTitleShowValueChanged = (event: NullableArrayChangedEvent<string>) => {
        setRowsTitleShow(event.detail.value ?? []);
    };
    const handleRowLabelStyleValueChanged = (event: PropertyChangedEvent<StyleObject>) => {
        setRowLabelStyle(event.detail.value);
    };
    const handleRowLabelShowValueChanged = (event: NullableArrayChangedEvent<string>) => {
        setRowLabelShow(event.detail.value ?? []);
    };
    const handleColumnsTitleStyleValueChanged = (event: PropertyChangedEvent<StyleObject>) => {
        setColumnsTitleStyle(event.detail.value);
    };
    const handleColumnsTitleShowValueChanged = (event: NullableArrayChangedEvent<string>) => {
        setColumnsTitleShow(event.detail.value ?? []);
    };
    const handleColumnLabelStyleValueChanged = (event: PropertyChangedEvent<StyleObject>) => {
        setColumnLabelStyle(event.detail.value);
    };
    const handleColumnLabelShowValueChanged = (event: NullableArrayChangedEvent<string>) => {
        setColumnLabelShow(event.detail.value ?? []);
    };
    const handleCellLabelStyleValueChanged = (event: PropertyChangedEvent<StyleObject>) => {
        setCellLabelStyle(event.detail.value);
    };
    const handleCellLabelShowValueChanged = (event: NullableArrayChangedEvent<string>) => {
        setCellLabelShow(event.detail.value ?? []);
    };
    const handleCellShowCountValueChanged = (event: NullableArrayChangedEvent<string>) => {
        setCellShowCount(event.detail.value ?? []);
    };
    const handleCellCustomCountValueChanged = (event: NullableArrayChangedEvent<string>) => {
        setCellCustomCount(event.detail.value ?? []);
    };
    const handleCellLabelAlignValueChanged = (event: PropertyChangedEvent<CellLabelAlign>) => {
        setCellLabelAlign(event.detail.value);
    };
    const handleNodeColorValueChanged = (event: PropertyChangedEvent<string>) => {
        setNodeColor(event.detail.value);
    };
    const handleNodeIndicatorColorValueChanged = (event: PropertyChangedEvent<string>) => {
        setNodeIndicatorColor(event.detail.value);
    };
    const handleNodeLabelStyleValueChanged = (event: PropertyChangedEvent<StyleObject>) => {
        setNodeLabelStyle(event.detail.value);
    };
    const handleNodeSecondaryLabelStyleValueChanged = (event: PropertyChangedEvent<StyleObject>) => {
        setNodeSecondaryLabelStyle(event.detail.value);
    };
    const handleNodeBorderColorValueChanged = (event: PropertyChangedEvent<string>) => {
        setNodeBorderColor(event.detail.value);
    };
    const handleNodeBorderWidthValueChanged = (event: PropertyChangedEvent<number | null>) => {
        setNodeBorderWidth(event.detail.value ?? 0);
    };

    const nboxStyleProps = useMemo(
        () =>
            ({
                styleDefaults,
                countLabel: customCountLabelFunc
            }) as unknown as Partial<ComponentProps<'oj-n-box'>>,
        [customCountLabelFunc, styleDefaults]
    );

    const nodeTemplateRenderer = (current: NodeTemplateContext) => {
        const employee = current.data;

        return (
            <oj-n-box-node
                label={employee.name}
                secondaryLabel={employee.position}
                row={employee.potential}
                column={employee.performance}
                shortDesc={`${employee.name} - ${employee.position}`}
                icon={{
                    source: employee.image ? `images/hcm/placeholder-${employee.image}.png` : '',
                    initials: employee.initials,
                    background: employee.background
                }}
            />
        );
    };

    return (<div id="nbox-container" class="oj-flex">
      <oj-n-box
        id="nbox"
        class="demo-nbox-flex-style"
        animationOnDataChange="auto"
        data={dataProvider}
        rows={rows}
        columns={columns}
        cells={cells}
        rowsTitle={rowsTitle}
        columnsTitle={columnsTitle}
        {...nboxStyleProps}
      >
        <template slot="nodeTemplate" render={nodeTemplateRenderer} />
      </oj-n-box>
      <demo-tabs class="oj-flex-item" headers={tabHeaders} onvalueChanged={handleCurrentTabValueChanged} value={currentTab}>
        <div class="oj-sm-padding-1x">
          <oj-form-layout direction="row" aria-controls="nbox">
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Row</div>
            <demo-input-json id="rowsTitle" onvalueChanged={handleRowsTitleStyleValueChanged} value={rowsTitleStyle} labelHint="Title Style" class="oj-sm-margin-2x-end"/>
            <oj-checkboxset id="rowsTitleShow" onvalueChanged={handleRowsTitleShowValueChanged} value={rowsTitleShow}><oj-option id="rowsTitleShowOption" value="true">Title</oj-option></oj-checkboxset>
            <demo-input-json id="rowLabel" onvalueChanged={handleRowLabelStyleValueChanged} value={rowLabelStyle} labelHint="Label Style" class="oj-sm-margin-2x-end"/>
            <oj-checkboxset id="rowLabelShow" onvalueChanged={handleRowLabelShowValueChanged} value={rowLabelShow}><oj-option id="rowLabelShowOption" value="true">Labels</oj-option></oj-checkboxset>
            <div class="oj-typography-heading-xs oj-sm-margin-2x-vertical">Column</div>
            <demo-input-json id="columnsTitle" onvalueChanged={handleColumnsTitleStyleValueChanged} value={columnsTitleStyle} labelHint="Title Style" class="oj-sm-margin-2x-end"/>
            <oj-checkboxset id="columnsTitleShow" onvalueChanged={handleColumnsTitleShowValueChanged} value={columnsTitleShow}><oj-option id="columnsTitleShowOption" value="true">Title</oj-option></oj-checkboxset>
            <demo-input-json id="columnLabel" onvalueChanged={handleColumnLabelStyleValueChanged} value={columnLabelStyle} labelHint="Column Label Style" class="oj-sm-margin-2x-end"/>
            <oj-checkboxset id="columnLabelShow" onvalueChanged={handleColumnLabelShowValueChanged} value={columnLabelShow}><oj-option id="columnLabelShowOption" value="true">Labels</oj-option></oj-checkboxset>
          </oj-form-layout>
        </div>
        <div class="oj-sm-padding-1x">
          <oj-form-layout direction="row" aria-controls="nbox">
            <demo-input-json id="cellLabel" onvalueChanged={handleCellLabelStyleValueChanged} value={cellLabelStyle} labelHint="Label Style" class="oj-sm-margin-2x-end"/>
            <oj-checkboxset id="cellLabelShow" onvalueChanged={handleCellLabelShowValueChanged} value={cellLabelShow}><oj-option id="cellLabelShowOption" value="true">Show Labels</oj-option></oj-checkboxset>
            <oj-checkboxset id="cellShowCount" onvalueChanged={handleCellShowCountValueChanged} value={cellShowCount}><oj-option id="cellShowCountOption" value="true">Show Counts</oj-option></oj-checkboxset>
            <oj-checkboxset id="cellCustomCount" onvalueChanged={handleCellCustomCountValueChanged} value={cellCustomCount} disabled={disableCustomCount}><oj-option id="cellCustomCountOption" value="true">Custom Counts</oj-option></oj-checkboxset>
            <demo-select-enum id="cellLabelAlign" labelHint="Label Align" aria-controls="NBox" onvalueChanged={handleCellLabelAlignValueChanged} value={cellLabelAlign} enumValues={["start", "center", "end"]}/>
          </oj-form-layout>
        </div>
        <div class="oj-sm-padding-1x">
          <oj-form-layout direction="row" aria-controls="nbox">
            <oj-input-text id="nodeColor" onvalueChanged={handleNodeColorValueChanged} value={nodeColor} label-hint="Node Color"/>
            <oj-input-text id="nodeIndicatorColor" onvalueChanged={handleNodeIndicatorColorValueChanged} value={nodeIndicatorColor} label-hint="Indicator Color"/>
            <demo-input-json id="nodeLabel" onvalueChanged={handleNodeLabelStyleValueChanged} value={nodeLabelStyle} labelHint="Label Style"/>
            <demo-input-json id="nodeSecondaryLabel" onvalueChanged={handleNodeSecondaryLabelStyleValueChanged} value={nodeSecondaryLabelStyle} labelHint="Secondary Label Style"/>
            <oj-input-text id="nodeBorderColor" onvalueChanged={handleNodeBorderColorValueChanged} value={nodeBorderColor} label-hint="Border Color"/>
            <oj-input-number id="nodeBorderWidth" onvalueChanged={handleNodeBorderWidthValueChanged} value={nodeBorderWidth} label-hint="Border Width" min={0} max={10}/>
          </oj-form-layout>
        </div>
      </demo-tabs>
    </div>);
};
export default NBoxStyles;
