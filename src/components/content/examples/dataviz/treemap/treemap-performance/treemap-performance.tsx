import { JetElementCustomEvent } from 'ojs/index';
import { ColorAttributeGroupHandler } from 'ojs/ojattributegrouphandler';
import 'ojs/ojbutton';
import * as Context from 'ojs/ojcontext';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'ojs/ojinputtext';
import 'ojs/ojtreemap';
import 'preact';
import { useEffect,useMemo,useRef,useState } from 'preact/hooks';
import '../../../../../jet-composites/demo-radioset-enum/loader';
import ArrayTreeDataProvider = require('ojs/ojarraytreedataprovider');

type AnimationValue = 'auto' | 'none';
type ShapedDataValue = 'on' | 'off';

type TreemapNodeData = {
  label: string;
  id: string;
  value: number;
  color: string;
  nodes: TreemapNodeData[];
  shortDesc: string;
  groupLabelDisplay?: 'off';
};

export const TreemapPerformance = () => {
  const [animationValue, setAnimationValue] = useState<AnimationValue>('auto');
  const [animationColor, setAnimationColor] = useState('#CCCCCC');
  const [timeValue, setTimeValue] = useState<number | undefined>(undefined);
  const [shapedData, setShapedData] = useState<ShapedDataValue>('on');
  const [branchCount, setBranchCount] = useState(10);
  const [depthValue, setDepthValue] = useState(2);
  const [nodeValues, setNodeValues] = useState<TreemapNodeData[]>([]);

  const nRef = useRef(1);
  const colorHandler = useMemo(() => new ColorAttributeGroupHandler(), []);
  const numBranches = 10;
  const treemapData = useMemo(
    () =>
      new ArrayTreeDataProvider<string, TreemapNodeData>(nodeValues, {
        keyAttributes: 'id',
        childrenAttribute: 'nodes'
      }),
    [nodeValues]
  );
  const numDataItems = useMemo(() => {
    let numPoints = 0;
    for (let i = 0; i < depthValue; i++) {
      numPoints += branchCount * Math.pow(numBranches, i);
    }
    return numPoints;
  }, [branchCount, depthValue]);
  const timerText = timeValue && timeValue > 0 ? ` Time: ${timeValue}ms` : '';

  const handleAnimationColorValueChanged = (event: JetElementCustomEvent<string | null>) => {
    setAnimationColor(event.detail.value ?? '#CCCCCC');
  };

  const handleShapedDataValueChanged = (event: JetElementCustomEvent<ShapedDataValue>) => {
    setShapedData(event.detail.value);
  };

  const handleAnimationValueChanged = (event: JetElementCustomEvent<AnimationValue>) => {
    setAnimationValue(event.detail.value);
  };

  const handleBranchCountValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setBranchCount(event.detail.value ?? 10);
  };

  const handleDepthValueChanged = (event: JetElementCustomEvent<number | null>) => {
    setDepthValue(event.detail.value ?? 2);
  };

  const createNode = (label: string, id: string, value: number, color: string): TreemapNodeData => {
    nRef.current += 1;
    return {
      label,
      id,
      value,
      color,
      nodes: [],
      shortDesc: `<b>${label}</b><br/>Value: ${value}`
    };
  };

  const getValue = () => Math.round(50 + 50 * Math.random());

  const getColor = () => colorHandler.getValue(Math.floor(Math.random() * 4).toString());

  const generateRandomData = (perBranch: number, depth: number) => {
    const branches = perBranch * Math.pow(numBranches, depth - 1);
    let lastLevelNodes: TreemapNodeData[] = [];
    nRef.current = 1;

    for (let i = 0; i < branches; i++) {
      lastLevelNodes.push(createNode(`Node ${nRef.current}`, `${nRef.current}`, getValue(), getColor()));
    }

    for (let i = 1; i < depth; i++) {
      const thisLevelNodes: TreemapNodeData[] = [];
      const currentLevelCount = lastLevelNodes.length / numBranches;
      for (let j = 0; j < currentLevelCount; j++) {
        const node = createNode(`Node ${nRef.current}`, `${nRef.current}`, getValue(), getColor());
        for (let k = 0; k < numBranches; k++) {
          const childNode = lastLevelNodes.pop();
          if (childNode) {
            node.nodes.push(childNode);
          }
        }
        if (i < depth - 2) {
          node.groupLabelDisplay = 'off';
        }
        thisLevelNodes.push(node);
      }
      lastLevelNodes = thisLevelNodes;
    }

    return lastLevelNodes;
  };

  const updateData = () => {
    setTimeValue(undefined);
    const busyContext = Context.getPageContext().getBusyContext();
    const start = Date.now();
    setNodeValues(generateRandomData(branchCount, depthValue));
    void busyContext.whenReady().then(() => {
      setTimeValue(Date.now() - start);
    });
  };

  useEffect(() => {
    setNodeValues(generateRandomData(branchCount, depthValue));
  }, []);

  return (
    <div id="treemap-container">
      <div class="oj-sm-padding-2x-vertical">
        <oj-button class="oj-sm-margin-2x-end" aria-controls="treemap" onojAction={updateData}>
          Regenerate Data
        </oj-button>
        <span class="oj-typography-bold">
          Data Items: {numDataItems}
          {timerText}
        </span>
      </div>
      <oj-form-layout maxColumns={2} aria-controls="treemap">
        <oj-input-number min={2} max={4} step={1} value={depthValue} labelHint="Depth" onvalueChanged={handleDepthValueChanged} />
        <oj-input-text onvalueChanged={handleAnimationColorValueChanged} value={animationColor} labelHint="Animation Update Color" />
        <demo-radioset-enum
          onvalueChanged={handleShapedDataValueChanged}
          value={shapedData}
          labelHint="Shaped Data"
          direction="row"
          enumValues={['on', 'off']}
        />
        <oj-input-number min={10} step={5} value={branchCount} labelHint="Branches" onvalueChanged={handleBranchCountValueChanged} />
        <demo-radioset-enum
          onvalueChanged={handleAnimationValueChanged}
          value={animationValue}
          labelHint="Animation"
          direction="row"
          enumValues={['auto', 'none']}
        />
      </oj-form-layout>
      {shapedData === 'off' ? (
        <oj-treemap
          id="treemap1"
          animationOnDisplay={animationValue}
          animationOnDataChange={animationValue}
          animationUpdateColor={animationColor}
          data={treemapData}
          aria-label="TreeMap performance demo"
        >
          <template
            slot="nodeTemplate"
            render={($current: { data: TreemapNodeData }) => (
              <oj-treemap-node
                label={$current.data.label}
                color={$current.data.color}
                shortDesc={$current.data.shortDesc}
                value={$current.data.value}
              />
            )}
          />
        </oj-treemap>
      ) : null}
      {shapedData === 'on' ? (
        <oj-treemap
          id="treemap2"
          animationOnDisplay={animationValue}
          animationOnDataChange={animationValue}
          animationUpdateColor={animationColor}
          data={treemapData}
          aria-label="TreeMap performance demo"
        />
      ) : null}
    </div>
  );
};

export default TreemapPerformance;
