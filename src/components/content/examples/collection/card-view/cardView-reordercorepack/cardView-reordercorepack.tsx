import { h, type ComponentProps } from "preact";
import { useMemo, useState } from "preact/hooks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import "../../../../../jet-composites/demo-profile-card-layout/loader";
import "css!./demo.css";
import "oj-c/card-view";
import "oj-c/drag-handle";

interface EmployeeData {
  id: number;
  image: string;
  initials: string;
  name: string;
  title: string;
}

interface ReorderDetail {
  itemKeys: EmployeeData["id"][];
  referenceKey: EmployeeData["id"] | null;
  reorderedKeys: EmployeeData["id"][];
}

type CurrentItemChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-card-view">["oncurrentItemChanged"]>
>[0];
type ReorderEvent = Parameters<NonNullable<ComponentProps<"oj-c-card-view">["onojReorder"]>>[0];
type CardItemContext = {
  data: EmployeeData;
  isTabbable?: boolean;
  item: { data: EmployeeData; metadata: { key: EmployeeData["id"] } };
};

const EMPLOYEES: EmployeeData[] = [
  {
    id: 1,
    name: "Chris Black",
    initials: "CB",
    title: "Oracle Cloud Infrastructure GTM Channel Director EMEA",
    image: "/styles/images/hcm/placeholder-male-01.png"
  },
  {
    id: 2,
    name: "Christine Cooper",
    initials: "CC",
    title: "Senior Principal Escalation Manager",
    image: "/styles/images/hcm/placeholder-female-01.png"
  },
  {
    id: 3,
    name: "Chris Benalamore",
    initials: "CB",
    title: "Area Business Operations Director EMEA & JAPAC",
    image: "/styles/images/hcm/placeholder-male-03.png"
  },
  {
    id: 4,
    name: "Christopher Johnson",
    initials: "CJ",
    title: "Vice-President HCM Application Development",
    image: "/styles/images/hcm/placeholder-male-04.png"
  },
  {
    id: 5,
    name: "Samire Christian",
    initials: "SC",
    title: "Consulting Project Technical Manager",
    image: "/styles/images/hcm/placeholder-male-05.png"
  },
  {
    id: 6,
    name: "Kurt Marchris",
    initials: "KM",
    title: "Customer Service Analyst",
    image: "/styles/images/hcm/placeholder-male-06.png"
  },
  {
    id: 7,
    name: "Zelda Christian Cooperman",
    initials: "ZC",
    title: "Senior Principal Escalation Manager",
    image: "/styles/images/hcm/placeholder-female-02.png"
  }
];

export const CardViewReordercorepack = () => {
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [currentItem, setCurrentItem] = useState<EmployeeData["id"] | undefined>(undefined);
  const [cutItem, setCutItem] = useState<EmployeeData["id"] | null>(null);
  const [liveText, setLiveText] = useState("");

  const dataProvider = useMemo(
    () =>
      new ArrayDataProvider<EmployeeData["id"], EmployeeData>(employees, {
        keyAttributes: "id"
      }),
    [employees]
  );
  const dataMap = useMemo(
    () => new Map<EmployeeData["id"], EmployeeData>(employees.map((employee) => [employee.id, employee])),
    [employees]
  );

  const updateLiveRegion = (sourceKey: EmployeeData["id"] | undefined, destKey: EmployeeData["id"] | null) => {
    if (sourceKey === undefined) {
      return;
    }
    const source = dataMap.get(sourceKey)?.name ?? "";
    const dest = destKey !== null ? dataMap.get(destKey)?.name ?? "" : "the beginning";
    setLiveText(`move ${source} after ${dest}`);
  };

  const handleReorder = (event: ReorderEvent) => {
    const detail = event.detail as ReorderDetail;
    const reorderedData = detail.reorderedKeys
      .map((key) => dataMap.get(key))
      .filter((item): item is EmployeeData => item !== undefined);
    setEmployees(reorderedData);
    updateLiveRegion(detail.itemKeys[0], detail.referenceKey);
  };

  const handleCurrentItemChanged = (event: CurrentItemChangedEvent) => {
    setCurrentItem(event.detail.value ?? undefined);
  };

  const handleCutAndPaste = (
    sourceKey: EmployeeData["id"] | null,
    destinationKey: EmployeeData["id"] | undefined
  ) => {
    if (sourceKey == null || destinationKey == null) {
      return;
    }

    const currentData = [...employees];
    const sourceIndex = currentData.findIndex((employee) => employee.id === sourceKey);
    const destinationIndex = currentData.findIndex((employee) => employee.id === destinationKey);

    if (sourceIndex === -1 || destinationIndex === -1) {
      return;
    }

    const [sourceItem] = currentData.splice(sourceIndex, 1);
    const insertIndex = sourceIndex < destinationIndex ? destinationIndex : destinationIndex + 1;
    currentData.splice(insertIndex, 0, sourceItem);
    setEmployees(currentData);
    updateLiveRegion(sourceKey, destinationKey);
  };

  const handleKeyDown: ComponentProps<"oj-c-card-view">["onKeyDown"] = (event) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === "x") {
        setCutItem(currentItem ?? null);
      } else if (event.key === "v") {
        const sourceKey = cutItem;
        setCutItem(null);
        handleCutAndPaste(sourceKey, currentItem);
      }
    } else if (event.key === "Escape") {
      setCutItem(null);
    }
  };

  const renderCard = (context: CardItemContext) => (
    <div class={cutItem === context.data.id ? "oj-panel demo-cut-item" : "oj-panel"}>
      <div class="oj-flex oj-sm-justify-content-center">
        <oj-c-drag-handle />
      </div>
      {h("demo-profile-card-layout", {
        name: context.data.name,
        workTitle: context.data.title,
        initials: context.data.initials,
        image: context.data.image,
        layout: "reorder",
      })}
    </div>
  );

  return (
    <div id="cardviewContainer">
      <oj-c-card-view
        id="cardview"
        aria-label="basic cardview"
        data={dataProvider}
        oncurrentItemChanged={handleCurrentItemChanged}
        reorderable={{ items: "enabled" }}
        onojReorder={handleReorder}
        onKeyDown={handleKeyDown}
      >
        <template slot="itemTemplate" render={renderCard} />
      </oj-c-card-view>
      <div id="reorderInfo" aria-live="polite" class="oj-helper-hidden-accessible">
        {liveText}
      </div>
    </div>
  );
};

export default CardViewReordercorepack;
