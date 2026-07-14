import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import * as Context from 'ojs/ojcontext';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojsunburst';
import 'preact';
import type { ComponentProps,JSX } from 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type AnimationValue = NonNullable<ComponentProps<'oj-sunburst'>['animationOnDisplay']>;
type ShapedDataValue = 'on' | 'off';
type NumberInputEvent = Parameters<NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>>[0];
type TextInputEvent = Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0];
type RadioEvent<T> = JetElementCustomEvent<T>;

type PerformanceNode = {
  label: string;
  id: string;
  value: number;
  color: string;
  nodes?: PerformanceNode[];
  shortDesc: string;
  groupLabelDisplay?: 'none';
};

type NodeTemplateContext = {
  data: PerformanceNode;
};

const INNER_NODE_COUNT = 4;

const createNode = (
  label: string,
  id: string,
  value: number,
  color: string,
  idCounter: { current: number }
): PerformanceNode => {
  idCounter.current += 1;
  return {
    label,
    id,
    value,
    color,
    nodes: [],
    shortDesc: `&lt;b&gt;${label}&lt;/b&gt;&lt;br/&gt;Value: ${value}`
  };
};

const generateRandomData = (
  perBranch: number,
  depth: number,
  colorHandler: ColorAttributeGroupHandler,
  idCounter: { current: number }
): PerformanceNode[] => {
  const getValue = (): number => Math.round(50 + 50 * Math.random());
  const getColor = (): string => colorHandler.getValue(Math.floor(Math.random() * 4).toString());
  const branches = perBranch * Math.pow(INNER_NODE_COUNT, depth - 1);
  let lastLevelNodes: PerformanceNode[] = [];

  idCounter.current = 1;

  for (let i = 0; i < branches; i++) {
    const id = String(idCounter.current);
    lastLevelNodes.push(createNode(`Node ${id}`, id, getValue(), getColor(), idCounter));
  }

  for (let i = 1; i < depth; i++) {
    const thisLevelNodes: PerformanceNode[] = [];
    const groupCount = lastLevelNodes.length / INNER_NODE_COUNT;

    for (let j = 0; j < groupCount; j++) {
      const id = String(idCounter.current);
      const node = createNode(`Node ${id}`, id, getValue(), getColor(), idCounter);

      for (let k = 0; k < INNER_NODE_COUNT; k++) {
        const child = lastLevelNodes.pop();
        if (child) {
          node.nodes?.push(child);
        }
      }

      if (i < depth - 2) {
        node.groupLabelDisplay = 'none';
      }

      thisLevelNodes.push(node);
    }

    lastLevelNodes = thisLevelNodes;
  }

  return lastLevelNodes;
};

export const SunburstPerformance = (): JSX.Element => {
  const [animationValue, setAnimationValue] = useState<AnimationValue>('auto');
  const [animationColor, setAnimationColor] = useState<string>('#CCCCCC');
  const [timeValue, setTimeValue] = useState<number>(0);
  const [shapedData, setShapedData] = useState<ShapedDataValue>('on');
  const [branches, setBranches] = useState<number>(10);
  const [depth, setDepth] = useState<number>(2);

  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const nodeIdRef = useRef({ current: 1 });
  const isInitialRender = useRef(true);
  const [nodeValues, setNodeValues] = useState<PerformanceNode[]>(() =>
    generateRandomData(10, 2, colorHandler, nodeIdRef.current)
  );

  const sunburstData = useMemo(
    () =>
      new ArrayTreeDataProvider(nodeValues, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    [nodeValues]
  );
  const numDataItems = useMemo(() => {
    let total = 0;

    for (let i = 0; i < depth; i++) {
      total += branches * Math.pow(INNER_NODE_COUNT, i);
    }

    return total;
  }, [branches, depth]);
  const timerText = timeValue > 0 ? `Time:  ${timeValue}ms` : '';

  const updateData = (branchCount: number, depthCount: number): void => {
    setTimeValue(0);
    const busyContext = Context.getPageContext().getBusyContext();
    const start = Date.now();
    setNodeValues(generateRandomData(branchCount, depthCount, colorHandler, nodeIdRef.current));
    busyContext.whenReady().then(() => {
      setTimeValue(Date.now() - start);
    });
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    updateData(branches, depth);
  }, [branches, colorHandler, depth]);

  const handleAnimationColorValueChanged = (event: TextInputEvent): void => {
    setAnimationColor(event.detail.value ?? '');
  };

  const handleShapedDataValueChanged = (event: RadioEvent<ShapedDataValue>): void => {
    setShapedData(event.detail.value);
  };

  const handleAnimationValueValueChanged = (event: RadioEvent<AnimationValue>): void => {
    setAnimationValue(event.detail.value);
  };

  const handleDepthValueChanged = (event: NumberInputEvent): void => {
    setDepth(event.detail.value ?? 2);
  };

  const handleBranchesValueChanged = (event: NumberInputEvent): void => {
    setBranches(event.detail.value ?? 10);
  };

  const refreshData = (): void => {
    updateData(branches, depth);
  };

  const nodeTemplateRenderer = ($current: NodeTemplateContext): JSX.Element => (
    <oj-sunburst-node
      label={$current.data.label}
      color={$current.data.color}
      shortDesc={$current.data.shortDesc}
      value={$current.data.value}
    />
  );

  return (
    <div id="sunburst-container">
      <div class="oj-sm-padding-2x-vertical">
        <oj-button class="oj-sm-margin-2x-end" aria-controls="sunburst1 sunburst2" onojAction={refreshData}>
          Regenerate Data
        </oj-button>
        <span class="oj-typography-bold">
          Data Items: {numDataItems} {timerText}
        </span>
      </div>
      <oj-form-layout maxColumns={2} aria-controls="sunburst1 sunburst2">
        <oj-input-number min={2} max={4} step={1} value={depth} labelHint="Depth" onvalueChanged={handleDepthValueChanged} />
        <oj-input-text onvalueChanged={handleAnimationColorValueChanged} value={animationColor} labelHint="Animation Update Color" />
        <demo-radioset-enum
          onvalueChanged={handleShapedDataValueChanged}
          value={shapedData}
          labelHint="Shaped Data"
          direction="row"
          enumValues={['on', 'off']}
        />
        <oj-input-number min={10} step={5} value={branches} labelHint="Branches" onvalueChanged={handleBranchesValueChanged} />
        <demo-radioset-enum
          onvalueChanged={handleAnimationValueValueChanged}
          value={animationValue}
          labelHint="Animation"
          direction="row"
          enumValues={['auto', 'none']}
        />
      </oj-form-layout>
      {shapedData === 'off' ? (
        <oj-sunburst
          id="sunburst1"
          animationOnDisplay={animationValue}
          animationOnDataChange={animationValue}
          animationUpdateColor={animationColor}
          data={sunburstData}
          aria-label="Sunburst showing hierarchical data in concentric rings"
        >
          <template slot="nodeTemplate" render={nodeTemplateRenderer} />
        </oj-sunburst>
      ) : null}
      {shapedData === 'on' ? (
        <oj-sunburst
          id="sunburst2"
          animationOnDisplay={animationValue}
          animationOnDataChange={animationValue}
          animationUpdateColor={animationColor}
          data={sunburstData}
          aria-label="Sunburst showing hierarchical data in concentric rings"
        />
      ) : null}
    </div>
  );
};

export default SunburstPerformance;
