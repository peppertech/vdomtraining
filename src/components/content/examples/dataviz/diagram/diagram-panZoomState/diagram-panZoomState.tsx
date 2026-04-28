import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojbutton';
type DiagramNode = {
    id: string;
};
type PanZoomState = NonNullable<ComponentProps<'oj-diagram'>['panZoomState']>;
type NodeTemplateContext = {
    data: DiagramNode;
};
type InputNumberChangedEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
export const DiagramPanZoomState = () => {
    const baseNodes = useMemo<DiagramNode[]>(() => [
        { id: 'N0' }, { id: 'N1' }, { id: 'N2' }, { id: 'N3' }, { id: 'N4' },
        { id: 'N5' }, { id: 'N6' }, { id: 'N7' }, { id: 'N8' }
    ], []);
    const extraNodes = useMemo<DiagramNode[]>(() => [
        { id: 'N9' }, { id: 'N10' }, { id: 'N11' }, { id: 'N12' }
    ], []);
    const [nodeValues, setNodeValues] = useState<DiagramNode[]>(baseNodes);
    const [panZoomState, setPanZoomState] = useState<PanZoomState>({
        zoom: 1,
        centerX: null,
        centerY: null
    });
    const nodeDataProvider = useMemo(() => new ArrayDataProvider<DiagramNode['id'], DiagramNode>(nodeValues, {
        keyAttributes: 'id'
    }), [nodeValues]);
    const addRemoveNodeButtonClick = () => {
        setNodeValues((current) => current.length > baseNodes.length ? baseNodes : baseNodes.concat(extraNodes));
    };
    const handleZoomChanged = (event: InputNumberChangedEvent) => {
        setPanZoomState((current) => ({ ...current, zoom: event.detail.value ?? 1 }));
    };
    const handleCenterXChanged = (event: InputNumberChangedEvent) => {
        setPanZoomState((current) => ({ ...current, centerX: event.detail.value ?? null }));
    };
    const handleCenterYChanged = (event: InputNumberChangedEvent) => {
        setPanZoomState((current) => ({ ...current, centerY: event.detail.value ?? null }));
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                shape: 'square',
                width: 50,
                height: 50,
                color: '#5FB9B5'
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={`Node ${node.data.id}`} {...ojDiagramNodeProps}/>;
    };
    const ojDiagramProps: Partial<ComponentProps<'oj-diagram'>> = { overview: {
            rendered: 'on'
        } };
    return (<div id="diagram-container">
            <div class="oj-panel oj-bg-info-30">
                    <h2 class="oj-typography-subheading-md">Options To Control The Diagram Below</h2>
                    <oj-form-layout aria-controls="diagram1" maxColumns={3} direction="row">
                              <oj-input-number onvalueChanged={handleZoomChanged} value={panZoomState.zoom} labelHint="Zoom" step={0.1}/>
                              <oj-input-number onvalueChanged={handleCenterXChanged} value={panZoomState.centerX} labelHint="CenterX" step={10}/>
                              <oj-input-number onvalueChanged={handleCenterYChanged} value={panZoomState.centerY} labelHint="CenterY" step={10}/>
                              <oj-button id="addRemoveNodeButton" onojAction={addRemoveNodeButtonClick}>Add/Remove Nodes</oj-button>
                          </oj-form-layout>
                </div>
            <oj-diagram id="diagram1" nodeData={nodeDataProvider} layout={layout.circleLayoutWithLayoutArgs(nodeValues.length > baseNodes.length ? 220 : 150)} aria-label="This is a diagram showing panZoomState attribute." zooming="auto" panning="auto" minZoom={0.5} maxZoom={2} panZoomState={panZoomState} {...ojDiagramProps}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramPanZoomState;
