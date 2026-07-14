import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import 'ojs/ojdiagram';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'preact';
import type { ComponentProps } from 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import * as layout from '../diagram-layouts';
import ArrayDataProvider = require('ojs/ojarraydataprovider');

type AnimationValue = 'auto' | 'none';
type ToggleValue = 'show' | 'hide';
type ShapedDataValue = 'on' | 'off';
type NumberChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>
>[0];
type RadioChangedEvent<T> = {
  detail: {
    value: T;
  };
};
type DiagramNode = {
  id: string;
  shortDesc: string;
  label: string | null;
};
type DiagramLink = {
  id: string;
  shortDesc: string;
  startNode: string;
  endNode: string;
};

const createNode = (index: number, labels: ToggleValue): DiagramNode => {
  const nodeId = 'N' + index;
  return {
    id: nodeId,
    shortDesc: nodeId,
    label: labels === 'show' ? nodeId : null
  };
};

const createLink = (index: number, startId: string, endId: string): DiagramLink => ({
  id: 'L' + index,
  shortDesc: `L${index}, connects ${startId} to ${endId}`,
  startNode: startId,
  endNode: endId
});

const buildData = (itemCount: number, labels: ToggleValue, showLinks: ToggleValue) => {
  const nodes = Array.from({ length: itemCount }, (_, index) => createNode(index, labels));
  const links =
    showLinks === 'show'
      ? Array.from({ length: itemCount }, (_, index) => {
          const endNodeId = (2 * index + 1) % Math.max(itemCount, 1);
          return endNodeId !== index ? createLink(index, 'N' + index, 'N' + endNodeId) : null;
        }).filter((link): link is DiagramLink => link !== null)
      : [];

  return { nodes, links };
};

export const DiagramPerformance = () => {
  const defaultColor = useMemo(() => new ColorAttributeGroupHandler().getValue('A'), []);
  const [nodesCount, setNodesCount] = useState<number | null>(50);
  const [animationValue, setAnimationValue] = useState<AnimationValue>('none');
  const [labelValue, setLabelValue] = useState<ToggleValue>('hide');
  const [toggleLinksValue, setToggleLinksValue] = useState<ToggleValue>('show');
  const [shapedData, setShapedData] = useState<ShapedDataValue>('on');
  const [timeValue, setTimeValue] = useState<number>(0);
  const renderStartRef = useRef<number>(performance.now());

  const count = Math.max(0, nodesCount ?? 0);
  const data = useMemo(
    () => buildData(count, labelValue, toggleLinksValue),
    [count, labelValue, toggleLinksValue]
  );

  const nodeDataProvider = useMemo(
    () => new ArrayDataProvider<string, DiagramNode>(data.nodes, { keyAttributes: 'id' }),
    [data.nodes]
  );
  const linkDataProvider = useMemo(
    () => new ArrayDataProvider<string, DiagramLink>(data.links, { keyAttributes: 'id' }),
    [data.links]
  );

  useEffect(() => {
    renderStartRef.current = performance.now();
  }, [count, labelValue, toggleLinksValue, shapedData, animationValue]);

  useEffect(() => {
    const handle = window.requestAnimationFrame(() => {
      setTimeValue(Math.round(performance.now() - renderStartRef.current));
    });
    return () => window.cancelAnimationFrame(handle);
  }, [data.links, data.nodes, shapedData, animationValue]);

  const styleDefaultsValue = {
    nodeDefaults: {
      icon: { color: defaultColor, width: 10, height: 10 }
    }
  };

  const nodeTemplateRenderer = (node: { data: DiagramNode }) => (
    <oj-diagram-node label={node.data.label ?? undefined} shortDesc={node.data.id} />
  );

  const linkTemplateRenderer = (link: { data: DiagramLink }) => (
    <oj-diagram-link
      startNode={link.data.startNode}
      endNode={link.data.endNode}
      shortDesc={link.data.shortDesc}
    />
  );

  return (
    <div id="diagram-container">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-padding-2x-horizontal">
          <oj-form-layout aria-controls="diagram1" direction="column" maxColumns={2}>
            <oj-input-number
              id="nodeNumber"
              labelHint="Number of Nodes"
              min={0}
              step={50}
              value={nodesCount}
              onvalueChanged={(event: NumberChangedEvent) => setNodesCount(event.detail.value)}
            />
            <demo-radioset-enum
              id="animationButtonSet"
              value={animationValue}
              onvalueChanged={(event: RadioChangedEvent<AnimationValue>) =>
                setAnimationValue(event.detail.value)
              }
              direction="row"
              labelHint="Animation"
              enumValues={["auto", "none"]}
            />
            <demo-radioset-enum
              id="linksButtonSet"
              labelHint="Links"
              value={toggleLinksValue}
              onvalueChanged={(event: RadioChangedEvent<ToggleValue>) =>
                setToggleLinksValue(event.detail.value)
              }
              direction="row"
              enumValues={["show", "hide"]}
            />
            <demo-radioset-enum
              id="labelButtonSet"
              labelHint="Node Labels"
              value={labelValue}
              onvalueChanged={(event: RadioChangedEvent<ToggleValue>) =>
                setLabelValue(event.detail.value)
              }
              direction="row"
              enumValues={["show", "hide"]}
            />
            <demo-radioset-enum
              id="renderTemplateId"
              labelHint="Shaped Data"
              value={shapedData}
              onvalueChanged={(event: RadioChangedEvent<ShapedDataValue>) =>
                setShapedData(event.detail.value)
              }
              direction="row"
              enumValues={["on", "off"]}
            />
            <div class="oj-sm-padding-4x">
              <p class="bold" id="timerText">
                {timeValue > 0 ? `Time:  ${timeValue}ms` : ''}
              </p>
            </div>
          </oj-form-layout>
        </div>
      </div>
      {shapedData === 'on' ? (
        <oj-diagram
          id="diagram1"
          animationOnDataChange={animationValue}
          animationOnDisplay={animationValue}
          nodeData={nodeDataProvider}
          linkData={linkDataProvider}
          layout={layout.circleLayoutWithLayoutArgs(150)}
          styleDefaults={styleDefaultsValue}
        />
      ) : (
        <oj-diagram
          id="diagram2"
          animationOnDataChange={animationValue}
          animationOnDisplay={animationValue}
          nodeData={nodeDataProvider}
          linkData={linkDataProvider}
          layout={layout.circleLayoutWithLayoutArgs(150)}
          styleDefaults={styleDefaultsValue}
        >
          <template slot="nodeTemplate" render={nodeTemplateRenderer} />
          <template slot="linkTemplate" render={linkTemplateRenderer} />
        </oj-diagram>
      )}
    </div>
  );
};

export default DiagramPerformance;
