// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import * as Context from 'ojs/ojcontext';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojnbox';
import 'ojs/ojinputnumber';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
type PropertyChangedEvent<T> = CustomEvent<{
    value: T;
}>;
const cells = [
    { row: 0, column: 0, shortDesc: 'Low Potential, Poor Performance' },
    { row: 0, column: 1, shortDesc: 'Low Potential, Fair Performance' },
    { row: 0, column: 2, shortDesc: 'Low Potential, Good Performance' },
    { row: 1, column: 0, shortDesc: 'Medium Potential, Poor Performance' },
    { row: 1, column: 1, shortDesc: 'Medium Potential, Fair Performance' },
    { row: 1, column: 2, shortDesc: 'Medium Potential, Good Performance' },
    { row: 2, column: 0, shortDesc: 'High Potential, Poor Performance' },
    { row: 2, column: 1, shortDesc: 'High Potential, Fair Performance' },
    { row: 2, column: 2, shortDesc: 'High Potential, Good Performance' }
];
export const NBoxPerformance = () => {
    const [animationValue, setAnimationValue] = useState<any>('auto');
    const [labelValue, setLabelValue] = useState<any>('short');
    const [secondaryLabelValue, setSecondaryLabelValue] = useState<any>('off');
    const [groupingValue, setGroupingValue] = useState<any>('off');
    const [shapedData, setShapedData] = useState<any>('off');
    const [sizeValue, setSizeValue] = useState<any>(100);
    const [nodes, setNodes] = useState<any[]>([]);
    const [timeValue, setTimeValue] = useState<any>(undefined);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler({
        'Group A': '#bacfd5',
        'Group B': '#c1dece',
        'Group C': '#fde9b6',
        'Group D': '#e3bede'
    }), []);
    const nodeGroups = useMemo(() => ['Group A', 'Group B', 'Group C', 'Group D'], []);
    const rows = useMemo(() => [{ id: 0 }, { id: 1 }, { id: 2 }], []);
    const columns = useMemo(() => [{ id: 0 }, { id: 1 }, { id: 2 }], []);
    const dataProvider = useMemo(() => new ArrayDataProvider(nodes, { keyAttributes: 'id' }), [nodes]);
    const timerText = useMemo(() => (timeValue > 0 ? `Time: ${timeValue}ms` : ''), [timeValue]);
    const getRandomNodeGroup = () => nodeGroups[Math.floor(Math.random() * 4)];
    const generateNodes = (size: number, nboxCells: {
        row: string;
        column: string;
        shortDesc: string;
    }[], currentLabelValue: string, currentSecondaryLabelValue: string, currentGroupingValue: string) => {
        const generatedNodes: any[] = [];
        for (let i = 0; i < size; i++) {
            const node: any = {};
            node.id = i.toString();
            if (currentLabelValue !== 'none') {
                node.label =
                    currentLabelValue === 'short' ? `Node ${i}` : `N${i} Long Label`;
                node.secondaryLabel =
                    currentSecondaryLabelValue === 'off' ? null : `N${i} Secondary Label`;
            }
            const cell = nboxCells[Math.floor((9 * i) / Math.max(size, 1))] || nboxCells[0];
            node.row = cell.row;
            node.column = cell.column;
            node.icon = { shape: 'human' };
            const randomGroup = getRandomNodeGroup();
            node.color = colorHandler.getValue(randomGroup);
            node.groupCategory = currentGroupingValue === 'off' ? null : randomGroup;
            node.shortDesc = `Node ${i} - ${randomGroup}`;
            generatedNodes.push(node);
        }
        return generatedNodes;
    };
    useEffect(() => {
        setNodes(generateNodes(sizeValue, cells, labelValue, secondaryLabelValue, groupingValue));
    }, []);
    const handleAnimationValueValueChanged = (event: PropertyChangedEvent<any>) => {
        setAnimationValue(event.detail.value);
    };
    const handleLabelValueValueChanged = (event: PropertyChangedEvent<any>) => {
        setLabelValue(event.detail.value);
    };
    const handleSecondaryLabelValueValueChanged = (event: PropertyChangedEvent<any>) => {
        setSecondaryLabelValue(event.detail.value);
    };
    const handleGroupingValueValueChanged = (event: PropertyChangedEvent<any>) => {
        setGroupingValue(event.detail.value);
    };
    const handleShapedDataValueChanged = (event: PropertyChangedEvent<any>) => {
        setShapedData(event.detail.value);
    };
    const handleSizeValueChanged = (event: PropertyChangedEvent<any>) => {
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
      {shapedData === 'off' ? (<oj-n-box id="nbox1" animation-on-data-change={animationValue} animation-on-display={animationValue} data={dataProvider} rows={rows} columns={columns} cells={cells}>
          <template slot="nodeTemplate" render={($current) => (<>
                <oj-n-box-node label={$current.data.label} secondary-label={$current.data.secondaryLabel} row={$current.data.row} column={$current.data.column} short-desc={$current.data.shortDesc} icon={$current.data.icon} color={$current.data.color} group-category={$current.data.groupCategory}/>
              </>)}/>
        </oj-n-box>) : null}
      {shapedData === 'on' ? (<oj-n-box id="nbox2" animation-on-data-change={animationValue} animation-on-display={animationValue} data={dataProvider} rows={rows} columns={columns} cells={cells} aria-label="NBox chart performance"/>) : null}
    </div>);
};
export default NBoxPerformance;
