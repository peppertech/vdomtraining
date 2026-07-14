import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import 'ojs/ojformlayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/diagramDataSample.json';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
type DiagramPanning = NonNullable<ComponentProps<'oj-diagram'>['panning']>;
type PreserveAspectRatio = 'none' | 'meet';
type FitArea = 'canvas' | 'content';
type HorizontalAlign = 'start' | 'end' | 'center';
type VerticalAlign = 'top' | 'bottom' | 'middle';
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
type NodeTemplateContext = {
    data: DiagramNodeDatum;
};
type LinkTemplateContext = {
    data: DiagramLinkDatum;
};
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramOverview = () => {
    const [panningVal, setPanningVal] = useState<DiagramPanning>('fixed');
    const [preserveAspectRatioVal, setPreserveAspectRatioVal] = useState<PreserveAspectRatio>('none');
    const [fitAreaVal, setFitAreaVal] = useState<FitArea>('canvas');
    const [halignVal, setHalignVal] = useState<HorizontalAlign>('end');
    const [valignVal, setValignVal] = useState<VerticalAlign>('bottom');
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(data.links, {
        keyAttributes: 'id'
    }), [data]);
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(node.data.category),
                shape: node.data.category === '0' ? 'rectangle' : node.data.category === '1' ? 'square' : 'circle'
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={`Node ${node.data.id}, Category ${node.data.category}`} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: LinkTemplateContext) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={`Link ${link.data.id}, Category ${link.data.category}`} color={colorHandler.getValue(link.data.category)}/>;
    };
    const ojDiagramProps: Partial<ComponentProps<'oj-diagram'>> = { overview: {
            rendered: 'on',
            valign: valignVal,
            halign: halignVal,
            fitArea: fitAreaVal,
            preserveAspectRatio: preserveAspectRatioVal,
            width: 175
        } };
    return (<div id="diagram-container">
            <div class="oj-sm-padding-4x-start">
                    <oj-form-layout aria-controls="diagram1" maxColumns={3}>
                              <demo-radioset-enum id="radioButtonset1" onvalueChanged={(event: JetElementCustomEvent<VerticalAlign>) => setValignVal(event.detail.value)} value={valignVal} direction="row" labelHint="Valign" enumValues={["top", "bottom", "middle"]}/>
                              <demo-radioset-enum id="radioButtonset2" direction="row" onvalueChanged={(event: JetElementCustomEvent<HorizontalAlign>) => setHalignVal(event.detail.value)} value={halignVal} labelHint="Halign" enumValues={["start", "end", "center"]}/>
                              <demo-radioset-enum id="radioButtonset3" direction="row" onvalueChanged={(event: JetElementCustomEvent<FitArea>) => setFitAreaVal(event.detail.value)} value={fitAreaVal} labelHint="Fit Area" enumValues={["canvas", "content"]}/>
                              <demo-radioset-enum id="radioButtonset4" direction="row" onvalueChanged={(event: JetElementCustomEvent<PreserveAspectRatio>) => setPreserveAspectRatioVal(event.detail.value)} value={preserveAspectRatioVal} labelHint="Preserve Aspect Ratio" enumValues={["none", "meet"]}/>
                              <demo-radioset-enum id="radioButtonset5" direction="row" onvalueChanged={(event: JetElementCustomEvent<DiagramPanning>) => setPanningVal(event.detail.value)} value={panningVal} labelHint="Panning" enumValues={["none", "fixed", "centerContent"]}/>
                          </oj-form-layout>
                </div>
            <oj-diagram id="diagram1" class="oj-panel oj-panel-border-radius-0 oj-sm-padding-0" panning={panningVal} zooming="auto" maxZoom={3} nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.circleLayoutWithLayoutArgs(150)} styleDefaults={{ nodeDefaults: { icon: { width: 50, height: 50 } }, linkDefaults: { endConnectorType: 'arrow' } }} {...ojDiagramProps}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramOverview;
