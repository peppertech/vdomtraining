import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/baseComponentClasses.json';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
const jsonData = JSON.parse(jsonDataText as string);
type TreeNode = {
    name: string;
    children?: TreeNode[];
};
type InputNumberValueChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
export const DiagramLayoutHelper = () => {
    const [angleExtent, setAngleExtent] = useState<number>(360);
    const treeData = jsonData as TreeNode;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const { nodes, links } = useMemo(() => {
        const flatNodes: Array<{
            id: string;
            depth: number;
        }> = [];
        const flatLinks: Array<{
            id: string;
            start: string;
            end: string;
        }> = [];
        const visit = (node: TreeNode, depth: number, parentId?: string) => {
            flatNodes.push({ id: node.name, depth });
            if (parentId) {
                flatLinks.push({ id: `${parentId}_${node.name}`, start: parentId, end: node.name });
            }
            node.children?.forEach((child) => visit(child, depth + 1, node.name));
        };
        visit(treeData, 0);
        return { nodes: flatNodes, links: flatLinks };
    }, [treeData]);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(nodes, {
        keyAttributes: 'id'
    }), [nodes]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(links, {
        keyAttributes: 'id'
    }), [links]);
    const nodeTemplateRenderer = (node: DatavizTemplateContext<DatavizChartDatum>) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(String(node.data.depth)),
                shape: 'circle'
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={node.data.id} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={`${link.data.start} extends ${link.data.end}`}/>;
    };
    return (<div id="diagram-container">
            <oj-form-layout aria-controls="diagram1">
                    <oj-input-number id="angleExtent" value={angleExtent} labelHint="Angle Extent" onvalueChanged={(event: InputNumberValueChangedEvent) => setAngleExtent(event.detail.value ?? 360)} min={90} max={360} step={30}/>
                </oj-form-layout>
            <oj-diagram id="diagram1" animationOnDataChange="auto" animationOnDisplay="auto" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.circleLayoutWithLayoutArgs(Math.max(120, Math.round(angleExtent / 2)))} styleDefaults={{ nodeDefaults: { icon: { color: '#9bb2c7', width: 44, height: 44 } } }}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramLayoutHelper;
