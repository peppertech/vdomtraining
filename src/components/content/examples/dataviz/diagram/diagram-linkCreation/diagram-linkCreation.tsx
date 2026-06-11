import { Fragment, h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as layout from '../diagram-layouts';
import 'ojs/ojdiagram';
import 'ojs/ojbutton';
import "css!./demo.css";
type LinkRecord = {
    id: string;
    start: string;
    end: string;
};
export const DiagramLinkCreation = () => {
    const nodes = useMemo(() => [
        { id: 'N0' },
        { id: 'N1' },
        { id: 'N2' },
        { id: 'N3' },
        { id: 'N4' },
        { id: 'N5' }
    ], []);
    const [links, setLinks] = useState<LinkRecord[]>([
        { id: 'L0', start: 'N0', end: 'N1' },
        { id: 'L1', start: 'N1', end: 'N2' }
    ]);
    const nodeDataProvider = useMemo(() => new ArrayDataProvider(nodes, {
        keyAttributes: 'id'
    }), [nodes]);
    const linkDataProvider = useMemo(() => new ArrayDataProvider(links, {
        keyAttributes: 'id'
    }), [links]);
    const addLink = () => {
        const nextIndex = links.length;
        const start = nodes[nextIndex % nodes.length].id;
        const end = nodes[(nextIndex + 1) % nodes.length].id;
        setLinks((current) => current.concat({ id: `L${nextIndex}`, start, end }));
    };
    const removeLink = () => {
        setLinks((current) => current.slice(0, -1));
    };
    const nodeTemplateRenderer = (node: DatavizTemplateContext<DatavizChartDatum>) => {
        const ojDiagramNodeProps: Partial<ComponentProps<'oj-diagram-node'>> = { icon: {
                shape: 'square',
                width: 54,
                height: 54,
                color: '#5FB9B5'
            } };
        return <oj-diagram-node label={node.data.id} shortDesc={`Node ${node.data.id}`} {...ojDiagramNodeProps}/>;
    };
    const linkTemplateRenderer = (link: DatavizTemplateContext<DatavizChartDatum>) => {
        return <oj-diagram-link startNode={link.data.start} endNode={link.data.end} shortDesc={`Link ${link.data.id} connects ${link.data.start} to ${link.data.end}`}/>;
    };
    return (<div id="diagram-container">
            <div class="oj-flex oj-sm-gap-2 oj-sm-margin-4x-bottom">
                    <oj-button onojAction={addLink}>Add Link</oj-button>
                    <oj-button onojAction={removeLink}>Remove Link</oj-button>
                </div>
            <oj-diagram id="diagram1" nodeData={nodeDataProvider} linkData={linkDataProvider} layout={layout.circleLayoutWithLayoutArgs(150)} minZoom={1} maxZoom={1} panning="auto">
                    <template slot="nodeTemplate" render={nodeTemplateRenderer}/>
                    <template slot="linkTemplate" render={linkTemplateRenderer}/>
                </oj-diagram>
        </div>);
};
export default DiagramLinkCreation;
