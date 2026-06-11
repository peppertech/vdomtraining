import { h } from 'preact';
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';
import * as Context from 'ojs/ojcontext';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojnbox';
import 'ojs/ojinputnumber';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import '../../../../../jet-composites/demo-radioset-enum/loader';

type PropertyChangedEvent<T> = CustomEvent<{
    value: T;
}>;

type AnimationValue = 'auto' | 'none';
type LabelValue = 'short' | 'long' | 'none';
type ToggleValue = 'on' | 'off';
type NodeGroup = 'Group A' | 'Group B' | 'Group C' | 'Group D';

type Cell = {
    row: string;
    column: string;
    shortDesc: string;
};

type PerformanceNode = {
    id: string;
    label?: string;
    secondaryLabel?: string;
    row: string;
    column: string;
    icon: {
        shape: 'human';
    };
    color: string;
    groupCategory?: NodeGroup;
    shortDesc: string;
};

type NodeTemplateContext = {
    data: PerformanceNode;
};

const cells = [
    { row: '0', column: '0', shortDesc: 'Low Potential, Poor Performance' },
    { row: '0', column: '1', shortDesc: 'Low Potential, Fair Performance' },
    { row: '0', column: '2', shortDesc: 'Low Potential, Good Performance' },
    { row: '1', column: '0', shortDesc: 'Medium Potential, Poor Performance' },
    { row: '1', column: '1', shortDesc: 'Medium Potential, Fair Performance' },
    { row: '1', column: '2', shortDesc: 'Medium Potential, Good Performance' },
    { row: '2', column: '0', shortDesc: 'High Potential, Poor Performance' },
    { row: '2', column: '1', shortDesc: 'High Potential, Fair Performance' },
    { row: '2', column: '2', shortDesc: 'High Potential, Good Performance' }
] satisfies Cell[];

export const NBoxPerformance = () => {
    const [animationValue, setAnimationValue] = useState<AnimationValue>('auto');
    const [labelValue, setLabelValue] = useState<LabelValue>('short');
    const [secondaryLabelValue, setSecondaryLabelValue] = useState<ToggleValue>('off');
    const [groupingValue, setGroupingValue] = useState<ToggleValue>('off');
    const [shapedData, setShapedData] = useState<ToggleValue>('off');
    const [sizeValue, setSizeValue] = useState(100);
    const [nodes, setNodes] = useState<PerformanceNode[]>([]);
    const [timeValue, setTimeValue] = useState<number | undefined>(undefined);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler({
        'Group A': '#bacfd5',
        'Group B': '#c1dece',
        'Group C': '#fde9b6',
        'Group D': '#e3bede'
    }), []);
    const nodeGroups = useMemo<NodeGroup[]>(() => ['Group A', 'Group B', 'Group C', 'Group D'], []);
    const rows = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
    const columns = useMemo(() => [{ id: '0' }, { id: '1' }, { id: '2' }], []);
    const dataProvider = useMemo(
        () => new ArrayDataProvider<PerformanceNode['id'], PerformanceNode>(nodes, { keyAttributes: 'id' }),
        [nodes]
    );
    const timerText = useMemo(() => ((timeValue ?? 0) > 0 ? `Time: ${timeValue}ms` : ''), [timeValue]);
    const getRandomNodeGroup = useCallback(
        () => nodeGroups[Math.floor(Math.random() * nodeGroups.length)],
        [nodeGroups]
    );
    const generateNodes = useCallback((
        size: number,
        nboxCells: Cell[],
        currentLabelValue: LabelValue,
        currentSecondaryLabelValue: ToggleValue,
        currentGroupingValue: ToggleValue
    ) => {
        const generatedNodes: PerformanceNode[] = [];
        for (let i = 0; i < size; i++) {
            const cell = nboxCells[Math.floor((9 * i) / Math.max(size, 1))] || nboxCells[0];
            const randomGroup = getRandomNodeGroup();
            const node: PerformanceNode = {
                id: i.toString(),
                row: cell.row,
                column: cell.column,
                icon: { shape: 'human' },
                color: colorHandler.getValue(randomGroup),
                groupCategory: currentGroupingValue === 'off' ? undefined : randomGroup,
                shortDesc: `Node ${i} - ${randomGroup}`
            };
            if (currentLabelValue !== 'none') {
                node.label =
                    currentLabelValue === 'short' ? `Node ${i}` : `N${i} Long Label`;
                node.secondaryLabel =
                    currentSecondaryLabelValue === 'off' ? undefined : `N${i} Secondary Label`;
            }
            generatedNodes.push(node);
        }
        return generatedNodes;
    }, [colorHandler, getRandomNodeGroup]);

    useEffect(() => {
        setNodes(generateNodes(sizeValue, cells, labelValue, secondaryLabelValue, groupingValue));
    }, [generateNodes]);

    const handleAnimationValueValueChanged = (event: PropertyChangedEvent<AnimationValue>) => {
        setAnimationValue(event.detail.value ?? 'auto');
    };
    const handleLabelValueValueChanged = (event: PropertyChangedEvent<LabelValue>) => {
        setLabelValue(event.detail.value ?? 'short');
    };
    const handleSecondaryLabelValueValueChanged = (event: PropertyChangedEvent<ToggleValue>) => {
        setSecondaryLabelValue(event.detail.value ?? 'off');
    };
    const handleGroupingValueValueChanged = (event: PropertyChangedEvent<ToggleValue>) => {
        setGroupingValue(event.detail.value ?? 'off');
    };
    const handleShapedDataValueChanged = (event: PropertyChangedEvent<ToggleValue>) => {
        setShapedData(event.detail.value ?? 'off');
    };
    const handleSizeValueChanged = (event: PropertyChangedEvent<number | null>) => {
        setSizeValue(event.detail.value ?? 0);
    };
    const updateData = () => {
        setTimeValue(0);
        const busyContext = Context.getPageContext().getBusyContext();
        const newNodes = generateNodes(sizeValue, cells, labelValue, secondaryLabelValue, groupingValue);
        const start = new Date().getTime();
        setNodes(newNodes);
        busyContext.whenReady().then(() => {
            const end = new Date().getTime();
            setTimeValue(end - start);
        });
    };

    const nodeTemplateRenderer = (current: NodeTemplateContext) => {
        const node = current.data;

        return (
            <oj-n-box-node
                label={node.label}
                secondaryLabel={node.secondaryLabel}
                row={node.row}
                column={node.column}
                shortDesc={node.shortDesc}
                icon={node.icon}
                color={node.color}
                groupCategory={node.groupCategory}
            />
        );
    };

    return (<div id="nbox-container">
      <oj-form-layout class="oj-sm-padding-2x" aria-controls="nbox1 nbox2">
        <oj-button id="updateButton" onojAction={updateData}>Regenerate Data</oj-button>
        <div class="bold" id="timerText">{timerText}</div>
        <oj-input-number id="inputnumber" label-hint="Nodes" aria-controls="nbox" min={0} step={50} onvalueChanged={handleSizeValueChanged} value={sizeValue}/>
      </oj-form-layout>
      <oj-form-layout direction="row" max-columns={5} class="oj-sm-padding-2x" aria-controls="nbox1 nbox2">
        <demo-radioset-enum labelHint="Animation" onvalueChanged={handleAnimationValueValueChanged} value={animationValue} enumValues={["auto", "none"]}/>
        <demo-radioset-enum labelHint="Labels" onvalueChanged={handleLabelValueValueChanged} value={labelValue} enumValues={["short", "long", "none"]}/>
        <demo-radioset-enum labelHint="Secondary Labels" onvalueChanged={handleSecondaryLabelValueValueChanged} value={secondaryLabelValue} enumValues={["on", "off"]}/>
        <demo-radioset-enum labelHint="Grouping" onvalueChanged={handleGroupingValueValueChanged} value={groupingValue} enumValues={["on", "off"]}/>
        <demo-radioset-enum labelHint="Shaped Data" onvalueChanged={handleShapedDataValueChanged} value={shapedData} enumValues={["on", "off"]}/>
      </oj-form-layout>
      {shapedData === 'off' ? (<oj-n-box id="nbox1" animationOnDataChange={animationValue} animationOnDisplay={animationValue} data={dataProvider} rows={rows} columns={columns} cells={cells}>
          <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
        </oj-n-box>) : null}
      {shapedData === 'on' ? (<oj-n-box id="nbox2" animationOnDataChange={animationValue} animationOnDisplay={animationValue} data={dataProvider} rows={rows} columns={columns} cells={cells} aria-label="NBox chart performance"/>) : null}
    </div>);
};
export default NBoxPerformance;
