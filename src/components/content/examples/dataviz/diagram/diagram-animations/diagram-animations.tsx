import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojdiagram';
import 'ojs/ojtoolbar';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/animation.json';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface DiagramNode {
    id: string;
    group: string | number;
    size: number;
}
interface DiagramLink {
    id: string;
    start: string;
    end: string;
}
interface DiagramData {
    nodes: DiagramNode[];
    links: DiagramLink[];
}
type DiagramLayout = ComponentProps<'oj-diagram'>['layout'];
type NodeTemplateContext = {
    data: DiagramNode;
};
type LinkTemplateContext = {
    data: DiagramLink;
};
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramAnimations = () => {
    const data = jsonData;
    const [nodeValues, setNodeValues] = useState<DiagramNode[]>(data.nodes);
    const [linkValues, setLinkValues] = useState<DiagramLink[]>(data.links);
    const uniqueIdRef = useRef<number>(100);
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const layoutFunc = layout.forceDirectedLayout as DiagramLayout;
    const nodeDataProvider = useMemo(() => new ArrayDataProvider<DiagramNode['id'], DiagramNode>(nodeValues, {
        keyAttributes: 'id'
    }), [nodeValues]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider<DiagramLink['id'], DiagramLink>(linkValues, {
        keyAttributes: 'id'
    }), [linkValues]);
    const sizeButtonClick = () => {
        const nodes = nodeValues.map((item) => ({
            ...item,
            size: Math.floor(Math.random() * (80 - 20) + 20)
        }));
        setNodeValues(nodes);
    };
    const colorButtonClick = () => {
        const nodes = nodeValues.map((item) => ({
            ...item,
            group: Math.floor(Math.random() * 4)
        }));
        setNodeValues(nodes);
    };
    const addNodeButtonClick = () => {
        const nodes = [...nodeValues];
        const links = [...linkValues];
        // create a new node
        const nodeId = `N${uniqueIdRef.current++}`;
        const newNode = { id: nodeId, group: 4, size: 45 };
        // connect the new node to an existing node
        if (nodes.length > 0) {
            const linkId = `L${uniqueIdRef.current++}`;
            const startNode = Math.floor(Math.random() * nodes.length);
            const newLink = { id: linkId, start: nodes[startNode].id, end: nodeId };
            links.push(newLink);
            setLinkValues(links);
        }
        nodes.push(newNode);
        setNodeValues(nodes);
    };
    const removeNodeButtonClick = () => {
        const nodes = [...nodeValues];
        const links = [...linkValues];
        const node = nodes[nodes.length - 1];
        if (!node) {
            return;
        }
        nodes.splice(nodes.length - 1, 1);
        for (let li = links.length - 1; li >= 0; li--) {
            const link = links[li];
            if (link.start === node.id || link.end === node.id) {
                links.splice(li, 1);
            }
        }
        setNodeValues(nodes);
        setLinkValues(links);
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(String(node.data.group)),
                width: node.data.size,
                height: node.data.size,
                borderColor: "#444444",
                borderWidth: 0.5
            } };
        return <oj-diagram-node shortDesc={node.data.id + ", Category " + node.data.group} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: LinkTemplateContext) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={link.data.id + ", connects " + link.data.start + " to " + link.data.end} startConnectorType="none" endConnectorType="arrow"/>;
    };
    return (<div id="diagram-container">
            <oj-toolbar chroming="outlined" aria-label="Diagram Toolbar" aria-controls="diagram1">
                    <oj-button id="colorButton" onojAction={colorButtonClick}>Update colors</oj-button>
                    <oj-button id="sizeButton" onojAction={sizeButtonClick}>Update sizes</oj-button>
                    <oj-button id="addNodeButton" onojAction={addNodeButtonClick}>Add Node</oj-button>
                    <oj-button id="removeNodeButton" onojAction={removeNodeButtonClick}>Remove Node</oj-button>
                </oj-toolbar>
            <oj-diagram id="diagram1" animationOnDataChange="auto" animationOnDisplay="auto" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layoutFunc}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramAnimations;
