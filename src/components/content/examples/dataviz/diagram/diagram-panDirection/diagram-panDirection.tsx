import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojdiagram';
import 'ojs/ojformlayout';
import 'preact';
import type { ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import * as jsonDataText from 'text!../data/cookbook/dataVisualizations/diagram/resources/lateralLinksDataSample.json';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
interface DiagramNode {
    id: string;
    category: string;
}
interface DiagramData {
    nodes: DiagramNode[];
}
type PanDirection = ComponentProps<'oj-diagram'>['panDirection'];
type LayoutValue = 'grid' | 'horizontal' | 'vertical';
type NodeTemplateContext = {
    data: DiagramNode;
};
const jsonData = JSON.parse(jsonDataText as string) as DiagramData;
export const DiagramPanDirection = () => {
    const [panDirValue, setPanDirValue] = useState<PanDirection>('auto');
    const [layoutValue, setLayoutValue] = useState<LayoutValue>('grid');
    const data = jsonData;
    const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider<DiagramNode['id'], DiagramNode>(data.nodes, {
        keyAttributes: 'id'
    }), [data]);
    const layoutCallback = useMemo(() => {
        if (layoutValue === 'horizontal') {
            return layout.circleLayoutWithLayoutArgs(220);
        }
        if (layoutValue === 'vertical') {
            return layout.containerLayout;
        }
        return layout.circleLayoutWithLayoutArgs(160);
    }, [layoutValue]);
    const handlePanDirectionChanged = (event: JetElementCustomEvent<PanDirection>) => {
        setPanDirValue(event.detail.value ?? 'auto');
    };
    const handleLayoutChanged = (event: JetElementCustomEvent<LayoutValue>) => {
        setLayoutValue(event.detail.value ?? 'grid');
    };
    const nodeTemplateRenderer = (node: NodeTemplateContext) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                color: colorHandler.getValue(node.data.category)
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={`Node ${node.data.id}, Category ${node.data.category}`} {...ojDiagramNodeProps}/>;
    };
    return (<div id="diagram-container">
            <div class="oj-sm-padding-4x-start">
                    <oj-form-layout aria-controls="diagram1" maxColumns={2}>
                              <demo-radioset-enum id="radioButtonset1" labelHint="Pan Direction" onvalueChanged={handlePanDirectionChanged} value={panDirValue} direction="row" enumValues={["auto", "x", "y"]}/>
                              <demo-radioset-enum id="radioButtonset2" labelHint="Layout" value={layoutValue} onvalueChanged={handleLayoutChanged} direction="row" enumValues={["grid", "horizontal", "vertical"]}/>
                          </oj-form-layout>
                </div>
            <oj-diagram id="diagram1" animationOnDataChange="auto" layout={layoutCallback} nodeData={nodeDataProvider} minZoom={1} maxZoom={1} panning="auto" panDirection={panDirValue} selectionMode="multiple" styleDefaults={{ nodeDefaults: { icon: { width: 50, height: 50, shape: 'circle' } } }}>
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramPanDirection;
