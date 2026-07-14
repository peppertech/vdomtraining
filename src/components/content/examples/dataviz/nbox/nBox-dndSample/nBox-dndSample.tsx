import 'css!./demo.css';
import 'ojs/ojavatar';
import 'ojs/ojlistitemlayout';
import 'ojs/ojlistview';
import { ojListView } from 'ojs/ojlistview';
import 'ojs/ojlistviewdnd';
import 'ojs/ojnbox';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/nBox/resources/employeesNoInitials.json';
import { DemoDataTransfer } from './DemoDataTransfer';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type EmployeeNode = {
    name: string;
    position: string;
    potential: string;
    performance: string;
    image?: string;
    initials?: string;
    background?: string;
};

interface DataInfo {
    id: string;
    name: string;
    title: string;
    image: string;
}

type TransferNode = {
    id?: string;
    name?: string;
    label?: string;
    title?: string;
    position?: string;
    image?: string;
};

type Cell = {
    row: string;
    column: string;
    shortDesc: string;
};

type NBoxCellContext = {
    row: string | number;
    column: string | number;
};

type NodeTemplateContext = {
    data: EmployeeNode;
};

type ListItemTemplateContext = {
    key: string;
    item: {
        data: DataInfo;
        metadata: {
            key: string;
        };
    };
};

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;
type ClipboardAction = 'cut' | 'copy' | 'none' | null;

const initialEmployees = JSON.parse(jsonDataText as string) as EmployeeNode[];

const initialListData: DataInfo[] = [
    {
        id: 'i1',
        name: 'Chris Black',
        title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
        image: 'images/hcm/placeholder-male-01.png'
    },
    {
        id: 'i2',
        name: 'Christine Cooper',
        title: 'Senior Principal Escalation Manager',
        image: 'images/hcm/placeholder-female-01.png'
    },
    {
        id: 'i3',
        name: 'Chris Benalamore',
        title: 'Area Business Operations Director EMEA & JAPAC',
        image: 'images/hcm/placeholder-male-03.png'
    },
    {
        id: 'i4',
        name: 'Christopher Johnson',
        title: 'Vice-President HCM Application Development',
        image: 'images/hcm/placeholder-male-04.png'
    },
    {
        id: 'i5',
        name: 'Samire Christian',
        title: 'Consulting Project Technical Manager',
        image: 'images/hcm/placeholder-male-05.png'
    },
    {
        id: 'i6',
        name: 'Kurt Marchris',
        title: 'Customer Service Analyst',
        image: 'images/hcm/placeholder-male-06.png'
    }
];

export const NBoxDndSample = () => {
    const [data, setData] = useState<EmployeeNode[]>(initialEmployees);
    const [cutItem, setCutItem] = useState<string | null>();
    const [currentItem, setCurrentItem] = useState<string>();
    const [listArr, setListArr] = useState<DataInfo[]>(initialListData);

    const latestNboxActionRef = useRef<ClipboardAction>('none');
    const latestListviewActionRef = useRef<ClipboardAction>('none');
    const dragItemIdRef = useRef<string | null>(null);
    const accInfoRef = useRef<HTMLDivElement | null>(null);
    const listViewRef = useRef<ojListView<DataInfo['id'], DataInfo> | null>(null);

    const clipboard = useMemo(() => new DemoDataTransfer(), []);
    const rows = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
    const columns = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
    const cells = useMemo<Cell[]>(() => [
        {
            row: '0',
            column: '0',
            shortDesc: 'Low Potential, Poor Performance'
        },
        {
            row: '0',
            column: '1',
            shortDesc: 'Low Potential, Fair Performance'
        },
        {
            row: '0',
            column: '2',
            shortDesc: 'Low Potential, Good Performance'
        },
        {
            row: '1',
            column: '0',
            shortDesc: 'Medium Potential, Poor Performance'
        },
        {
            row: '1',
            column: '1',
            shortDesc: 'Medium Potential, Fair Performance'
        },
        {
            row: '1',
            column: '2',
            shortDesc: 'Medium Potential, Good Performance'
        },
        {
            row: '2',
            column: '0',
            shortDesc: 'High Potential, Poor Performance'
        },
        {
            row: '2',
            column: '1',
            shortDesc: 'High Potential, Fair Performance'
        },
        {
            row: '2',
            column: '2',
            shortDesc: 'High Potential, Good Performance'
        }
    ], []);
    const dataProvider = useMemo(() => new ArrayDataProvider<EmployeeNode['name'], EmployeeNode>(data, {
        keyAttributes: 'name'
    }), [data]);
    const listDataProvider = useMemo(() => new ArrayDataProvider<DataInfo['id'], DataInfo>(listArr, {
        keyAttributes: 'id'
    }), [listArr]);

    const handleCurrentItemChanged = (event: PropertyChangedEvent<string>) => {
        setCurrentItem(event.detail.value);
    };

    const onNBoxDrop = (event: DragEvent, context: NBoxCellContext) => {
        let fromListView = false;
        let dropData = event.dataTransfer?.getData('application/nbox') ?? '';
        if (!dropData) {
            dropData = event.dataTransfer?.getData('application/ojlistviewitems') ?? '';
            fromListView = true;
        }
        if (dropData) {
            _drop(context.row, context.column, dropData, false, fromListView);
        }
    };

    const cutRequest = (event: DatavizNBoxKeyboardRequestEvent) => {
        _keyboardCutCopy(event, 'cut');
    };

    const copyRequest = (event: DatavizNBoxKeyboardRequestEvent) => {
        _keyboardCutCopy(event, 'copy');
    };

    const pasteRequest = (event: DatavizNBoxKeyboardRequestEvent) => {
        const isCopy = latestNboxActionRef.current === 'copy';
        let fromListView = false;
        let dropData = clipboard.getData('application/nbox');
        if (!dropData) {
            dropData = clipboard.getData('application/ojlistviewitems');
            fromListView = true;
        }
        clipboard.setData('application/nbox', null);
        if (!dropData) {
            return;
        }
        const target = event.detail.target;
        if (!target) {
            return;
        }
        const row = target.row;
        const column = target.column;
        if (isCopy && !fromListView) {
            return;
        }
        _drop(row, column, dropData, true, fromListView);
        setCutItem(null);
    };

    const _drop = (
        row: string | number,
        column: string | number,
        dropData: string,
        keyboard: boolean,
        fromListView: boolean
    ) => {
        const dataObj = JSON.parse(dropData) as TransferNode[];
        const names: string[] = [];
        for (let i = 0; i < dataObj.length; i++) {
            const itemName = dataObj[i].name ?? dataObj[i].id;
            if (itemName) {
                names.push(itemName);
            }
        }

        let movedItems: Array<DataInfo | EmployeeNode> = [];
        if (fromListView) {
            movedItems = listArr.filter((item) => names.includes(item.name));
            if (latestListviewActionRef.current !== 'copy') {
                setListArr((items) => items.filter((item) => !names.includes(item.name)));
            }
        }
        else {
            movedItems = data.filter((item) => names.includes(item.name));
        }

        const movedNodes = movedItems.map((item) => {
            const movedNode = {
                ...item,
                potential: String(row),
                performance: String(column)
            } as EmployeeNode;
            if (fromListView && 'title' in item) {
                movedNode.image = item.image.split('placeholder-')[1]?.split('.png')[0] ?? item.image;
                movedNode.position = item.title;
            }
            return movedNode;
        });
        const remainingNodes = fromListView ? data : data.filter((item) => !names.includes(item.name));
        setData([...movedNodes, ...remainingNodes]);

        let accText;
        const cell = _findCellDesc(String(column), String(row));
        if (movedItems.length > 1) {
            accText = `Moved multiple nodes from ${fromListView ? 'listview ' : ''}to ${cell} cell`;
        }
        else {
            const movedLabel = fromListView ? dataObj[0].name : dataObj[0].label;
            accText = `Moved node ${movedLabel} from ${fromListView ? 'listview ' : 'nbox '} to ${cell} cell`;
        }
        accText = accText + (keyboard ? ' via keyboard' : ' via drag and drop');
        _updateAcc(accText);
        latestListviewActionRef.current = 'none';
        latestNboxActionRef.current = 'none';
        clipboard.setData('application/nbox', null);
        clipboard.setData('application/ojlistviewitems', null);
    };

    const _keyboardCutCopy = (event: DatavizNBoxKeyboardRequestEvent, type: 'cut' | 'copy') => {
        const src = event.detail.source ?? [];
        const jsonStr = JSON.stringify(src);
        clipboard.setData('application/nbox', jsonStr);
        latestNboxActionRef.current = type;
        _updateAcc(`${src[0].id} ${type === 'copy' ? 'Copied' : 'Cut'}`);
    };

    const _updateAcc = (text: string) => {
        const acc = accInfoRef.current;
        if (acc) {
            acc.textContent = text;
        }
    };

    const _findCellDesc = (col: string, row: string) => {
        for (let i = 0; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.row === row && cell.column === col) {
                return cell.shortDesc;
            }
        }
    };

    const handleDrop = (event: DragEvent, context: ojListView.ItemsDropContext) => {
        event.preventDefault();
        let index = -1;
        if (context.item) {
            const listView = listViewRef.current;
            const itemContext = listView?.getContextByNode(context.item);
            if (itemContext) {
                index = itemContext.index;
                if (context.position === 'after') {
                    index += 1;
                }
            }
        }
        const dataStr = event.dataTransfer?.getData('application/nbox') ?? '';
        _listDrop(dataStr, false, index);
    };

    const handleDragStart = (event: DragEvent) => {
        const dataStr = event.dataTransfer?.getData('application/ojlistviewitems') ?? '';
        if (!dataStr) {
            return;
        }
        const transferData = JSON.parse(dataStr) as DataInfo[];
        dragItemIdRef.current = transferData[0]?.id ?? null;
    };

    const handleDragEnd = (event: DragEvent) => {
        if (event.dataTransfer?.dropEffect !== 'none') {
            _removeSourceItem(dragItemIdRef.current);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
            _cutCurrentItem();
        }
        else if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
            _copyCurrentItem();
        }
        else if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
            _paste();
        }
    };

    const _cutCurrentItem = () => {
        _cutCopyKeyboardListview('cut');
    };

    const _copyCurrentItem = () => {
        _cutCopyKeyboardListview('copy');
    };

    const _cutCopyKeyboardListview = (type: 'cut' | 'copy') => {
        const listView = listViewRef.current;
        const listCurrentItem = listView?.currentItem;
        if (!listView || listCurrentItem == null) {
            return;
        }
        const itemData = listView.getDataForVisibleItem({ key: listCurrentItem });
        if (!itemData) {
            return;
        }
        const jsonStr = JSON.stringify([itemData]);
        clipboard.setData('application/ojlistviewitems', jsonStr);
        if (type === 'cut') {
            setCutItem(String(listCurrentItem));
        }
        _updateAcc(`${itemData.name} ${type === 'copy' ? 'Copied' : 'Cut'}`);
        latestListviewActionRef.current = type;
    };

    const _paste = () => {
        const dataStr = clipboard.getData('application/nbox');
        if (dataStr) {
            const listView = listViewRef.current;
            const listCurrentItem = listView?.currentItem;
            const index = _findIndex(listArr, listCurrentItem);
            _listDrop(dataStr, true, index + 1);
        }
    };

    const _findIndex = (arr: DataInfo[], key: DataInfo['id'] | null | undefined) => {
        const keys = arr.map((item) => item.id);
        return keys.indexOf(String(key));
    };

    const _listDrop = (dropData: string, keyboard: boolean, index: number) => {
        if (!dropData) {
            return;
        }
        const droppedNodes = JSON.parse(dropData) as TransferNode[];
        const names: string[] = [];
        for (let i = 0; i < droppedNodes.length; i++) {
            const nodeId = droppedNodes[i].id;
            if (nodeId) {
                names.push(nodeId);
            }
        }
        const movedNodes = data.filter((item) => names.includes(item.name));
        if (latestNboxActionRef.current !== 'copy') {
            setData((items) => items.filter((item) => !names.includes(item.name)));
        }
        const listItems = movedNodes.map((item) => ({
            id: item.name,
            name: item.name,
            title: item.position,
            image: `images/hcm/placeholder-${item.image}.png`
        }));
        setListArr((items) => {
            const nextItems = [...items];
            for (let i = 0; i < listItems.length; i++) {
                const newData = listItems[i];
                if (index === -1) {
                    // Empty list case.
                    nextItems.push(newData);
                }
                else {
                    nextItems.splice(index + i, 0, newData);
                }
            }
            return nextItems;
        });

        let accText;
        if (movedNodes.length > 1) {
            accText = 'Moved multiple nodes from nbox to listView';
        }
        else {
            accText = `Moved node ${names[0]} from nbox to listview`;
        }
        accText = accText + (keyboard ? ' via keyboard' : ' via drag and drop');
        _updateAcc(accText);
        latestListviewActionRef.current = 'none';
        latestNboxActionRef.current = 'none';
        clipboard.setData('application/nbox', null);
        clipboard.setData('application/ojlistviewitems', null);
        setCurrentItem(movedNodes[0]?.name);
    };

    const _removeSourceItem = (itemId: string | null) => {
        if (itemId) {
            setListArr((items) => items.filter((item) => item.id !== itemId));
        }
    };

    const listViewDndProps = {
        dnd: {
            drag: {
                items: {
                    dataTypes: ['application/ojlistviewitems'],
                    dragStart: handleDragStart,
                    dragEnd: handleDragEnd
                }
            },
            drop: {
                items: {
                    dataTypes: ['application/nbox'],
                    drop: handleDrop
                }
            }
        }
    } as unknown as Partial<ComponentProps<'oj-list-view'>>;

    const nboxDndProps = {
        dnd: {
            drag: {
                nodes: {
                    dataTypes: ['application/nbox']
                }
            },
            drop: {
                cells: {
                    dataTypes: ['application/nbox', 'application/ojlistviewitems'],
                    drop: onNBoxDrop
                }
            }
        },
        dataTransferOptions: {
            cut: 'enable',
            copy: 'enable',
            paste: 'enable'
        }
    } as unknown as Partial<ComponentProps<'oj-n-box'>>;

    const listItemTemplateRenderer = (item: ListItemTemplateContext) => (
        <li class={cutItem === item.key ? 'demo-cut-item' : ''}>
            <oj-list-item-layout>
                <span class="oj-typography-body-md oj-text-color-primary">{item.item.data.name}</span>
                <oj-avatar slot="leading" size="xs" src={item.item.data.image} />
                <span slot="secondary" class="oj-typography-body-sm oj-text-color-secondary">
                    {item.item.data.title}
                </span>
                <div
                    id={`${item.item.metadata.key}_draghandle`}
                    slot="action"
                    role="presentation"
                    class="oj-sm-margin-4x-horizontal oj-listview-drag-handle"
                />
            </oj-list-item-layout>
        </li>
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

    return (
        <div id="nbox-container">
            <div class="oj-sm-odd-cols-4">
                <div class="oj-flex">
                    <div class="oj-flex-item">
                        <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">Listview</div>
                        <oj-list-view
                            ref={listViewRef}
                            id="listview"
                            aria-label="list drag source"
                            class="demo-list oj-listview-item-padding-off"
                            data={listDataProvider}
                            oncurrentItemChanged={handleCurrentItemChanged}
                            currentItem={currentItem}
                            onKeyDown={handleKeyDown}
                            {...listViewDndProps}
                        >
                            <template slot="itemTemplate" render={listItemTemplateRenderer} />
                        </oj-list-view>
                    </div>
                    <div class="oj-flex-item">
                        <div class="oj-typography-heading-xs oj-sm-margin-2x-horizontal">NBox</div>
                        <oj-n-box
                            animationOnDataChange="auto"
                            data={dataProvider}
                            rows={rows}
                            columns={columns}
                            cells={cells}
                            rowsTitle="Potential"
                            columnsTitle="Performance"
                            onojCutRequest={cutRequest}
                            onojCopyRequest={copyRequest}
                            onojPasteRequest={pasteRequest}
                            {...nboxDndProps}
                        >
                            <template slot="nodeTemplate" render={nodeTemplateRenderer} />
                        </oj-n-box>
                    </div>
                </div>
            </div>
            <div ref={accInfoRef} id="accInfo" aria-live="polite" class="oj-helper-hidden-accessible" />
        </div>
    );
};

export default NBoxDndSample;
