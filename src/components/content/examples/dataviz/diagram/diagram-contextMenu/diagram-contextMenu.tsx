import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojmenu';
import 'ojs/ojdiagram';
import { ojMenu } from 'ojs/ojmenu';
import { ojDiagram } from 'ojs/ojdiagram';
import { JetElementCustomEvent } from 'ojs/index';
import * as layout from '../diagram-layouts';
import 'ojs/ojoption';
type DiagramSelection = NonNullable<ComponentProps<'oj-diagram'>['selection']>;
type DiagramNodeDatum = {
    id: string;
    category: string;
};
type DiagramLinkDatum = {
    id: string;
    category: string;
    start: string;
    end: string;
};
type DiagramData = {
    nodes: DiagramNodeDatum[];
    links: DiagramLinkDatum[];
};
type DiagramNodeContext = {
    subId: 'oj-diagram-node';
    index: number;
};
type DiagramLinkContext = {
    subId: 'oj-diagram-link';
    index: number;
};
type DiagramContext = DiagramNodeContext | DiagramLinkContext;
type NodeTemplateContext = {
    data: DiagramNodeDatum;
};
type LinkTemplateContext = {
    data: DiagramLinkDatum;
};
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramContextMenu = () => {
    const diagramRef = useRef<ojDiagram<string, string, DiagramNodeDatum, DiagramLinkDatum> | null>(null);
    const [node, setNode] = useState<DiagramNodeDatum | null>(null);
    const [link, setLink] = useState<DiagramLinkDatum | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('(None selected yet)');
    const [selectedItemsValue, setSelectedItemsValue] = useState<DiagramSelection>([]);
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const layoutFunc = layout.circleLayoutWithLayoutArgs(150);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const idToItemMap = useMemo<Record<string, DiagramNodeDatum | DiagramLinkDatum>>(() => {
        const map: Record<string, DiagramNodeDatum | DiagramLinkDatum> = {};
        data.nodes.forEach((item) => {
            map[item.id] = item;
        });
        data.links.forEach((item) => {
            map[item.id] = item;
        });
        return map;
    }, [data]);
    const handleSelectedItemsValueSelectionChanged = (event: JetElementCustomEvent<ComponentProps<'oj-diagram'>['selection']>) => {
        setSelectedItemsValue(event.detail.value ?? []);
    };
    const beforeOpenFunction = (event: ojMenu.ojBeforeOpen) => {
        const target = event.detail.originalEvent.target as HTMLElement;
        setNode(null);
        setLink(null);
        if (target.id === 'diagram1') {
            // Handle keyboard interaction.
            const selection = selectedItemsValue;
            if (selection.length > 0) {
                const id = selection[0];
                const selected = idToItemMap[String(id)];
                if (selected && 'start' in selected)
                    setLink(selected);
                // If selected has a start property then selected is a link
                else
                    setNode(selected ?? null);
            }
        }
        else {
            // Handle mouse interaction.
            const context = diagramRef.current?.getContextByNode(target) as DiagramContext | null;
            if (context != null) {
                if (context.subId === 'oj-diagram-node')
                    setNode(data.nodes[context.index] ?? null);
                else if (context.subId === 'oj-diagram-link')
                    setLink(data.links[context.index] ?? null);
            }
        }
    };
    const menuItemAction = (event: ojMenu.ojMenuAction) => {
        const text = event.detail.selectedValue;
        if (node) {
            setSelectedMenuItem(text + ' from Node ' + node.id);
        }
        else if (link) {
            setSelectedMenuItem(text + ' from Link ' + link.id);
        }
        else {
            setSelectedMenuItem(text + ' from diagram background');
        }
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(node.data.category),
                width: 50,
                height: 50
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={"Node " + node.data.id + ", Category " + node.data.category} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: LinkTemplateContext) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={"Link " + link.data.id + ", Category " + link.data.category + ", connects " + link.data.start + " to " + link.data.end} color={colorHandler.getValue(link.data.category)} startConnectorType="none" endConnectorType="arrow"/>;
    };
    return (<div id="diagram-container">
            <oj-diagram ref={diagramRef} id="diagram1" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layoutFunc} selectionMode="single" onselectionChanged={handleSelectedItemsValueSelectionChanged} selection={selectedItemsValue}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                    <oj-menu slot="contextMenu" aria-label="Edit" onojMenuAction={menuItemAction} onojBeforeOpen={beforeOpenFunction}>
                              <oj-option value="Action1">Action 1</oj-option>
                              <oj-option value="Action2">Action 2</oj-option>
                              <oj-option value="Action3">Action 3</oj-option>
                          </oj-menu>
                </oj-diagram>
            <div class="oj-sm-padding-1x">
                    <div id="results" class="oj-typography-semi-bold">Last selected menu item:</div>
                    {selectedMenuItem}
                </div>
        </div>);
};
export default DiagramContextMenu;
