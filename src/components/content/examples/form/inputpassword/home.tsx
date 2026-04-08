import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "ojs/ojactioncard";
import "ojs/ojbutton";
import "ojs/ojlistview";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { KeySetImpl, KeySet } from "ojs/ojkeyset";
import { ojListView } from "ojs/ojlistview";
import { ButtonElement } from "ojs/ojbutton";

import { InputPasswordCorePack } from "./inputPasswordCorePack";
import { InputSensitiveText } from "./inputSensitiveText";

type PasswordComponent = {
  id: number;
  name: string;
  image: string;
  isCorePack?: boolean;
};

const passwordComponents: PasswordComponent[] = [
  {
    id: 1,
    name: "Input Password",
    image: "oj-ux-icon-size-12x oj-ux-ico-lock",
    isCorePack: true,
  },
  {
    id: 2,
    name: "Input Sensitive Text",
    image: "oj-ux-icon-size-12x oj-ux-ico-text",
    isCorePack: true,
  },
];

const dataProvider = new MutableArrayDataProvider<
  PasswordComponent["id"],
  PasswordComponent
>(passwordComponents, {
  keyAttributes: "id",
});

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlines: ListViewProps["gridlines"] = { item: "visible" };
const INITIAL_SELECTION =
  new KeySetImpl([]) as KeySet<PasswordComponent["id"]>;

const InputPasswordHome = () => {
  const [selectedItems, setSelectedItems] =
    useState<KeySet<PasswordComponent["id"]>>(INITIAL_SELECTION);
  const [showComponentDetail, setShowComponentDetail] = useState(false);
  const [activeComponentId, setActiveComponentId] = useState<number | null>(
    null,
  );

  const renderListItem = useCallback(
    (
      item: ojListView.ItemTemplateContext<
        PasswordComponent["id"],
        PasswordComponent
      >,
    ) => {
      return (
        <li>
          <oj-action-card>
            <div class="component-item" key={item.data.id}>
              <div class="componentImage">
                {item.data.isCorePack ? (
                  <span class="demo-badge-position oj-sm-margin-2x-vertical oj-badge oj-badge-end oj-badge-success oj-badge-sm">
                    Core Pack
                  </span>
                ) : null}
                <div
                  class="oj-helper-text-align-center"
                  style={{ paddingTop: "25px" }}
                >
                  <div className={item.data.image}></div>
                </div>
                <div class="oj-flex-item oj-text-sm componentInfo oj-typography-body-md oj-typography-bold">
                  {item.data.name}
                </div>
              </div>
            </div>
          </oj-action-card>
        </li>
      );
    },
    [selectedItems],
  );

  const ComponentDetail = useCallback(() => {
    switch (activeComponentId) {
      case 1:
        return <InputPasswordCorePack />;
      case 2:
        return <InputSensitiveText />;
      default:
        return null;
    }
  }, [activeComponentId]);

  const handleHomeNavigation = (_event: ButtonElement.ojAction) => {
    setActiveComponentId(null);
    setShowComponentDetail(false);
    setSelectedItems(
      new KeySetImpl([]) as KeySet<PasswordComponent["id"]>,
    );
  };

  const handleSelectedChanged = (event: any) => {
    const selectedKey = event.detail.items[0]?.key as PasswordComponent["id"];
    if (typeof selectedKey === "number") {
      setActiveComponentId(selectedKey);
      setShowComponentDetail(true);
      const selection = event.detail.value as KeySet<PasswordComponent["id"]>;
      setSelectedItems(selection);
    }
  };

  return (
    <div class="component-wrapper">
      {!showComponentDetail ? (
        <oj-list-view
          data={dataProvider}
          selectionMode="single"
          selected={selectedItems}
          gridlines={gridlines}
          onselectedChanged={handleSelectedChanged}
          display="card"
          class="listview-sizing"
        >
          <template slot="itemTemplate" render={renderListItem}></template>
        </oj-list-view>
      ) : (
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12">
          <oj-button
            class="breadcrumb-wrapper"
            label=" Input Password Home "
            onojAction={handleHomeNavigation}
          />
          {ComponentDetail() ?? (
            <div class="comingsoon">Coming soon....</div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputPasswordHome;
