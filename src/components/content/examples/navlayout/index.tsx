import { NavList } from "./navlist";
import { Accordion } from "./accordion";
import { ActionCard } from "./actioncard";
import { TabBar } from "./tabbar";
import { Dialog } from "./dialog";
import { Popup } from "./popup";
import "preact";
import { useState, useRef } from "preact/hooks";
import "ojs/ojbutton";
import "oj-c/button";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojdrawerlayout";
import "oj-c/drawer-popup";
import "oj-c/select-multiple";
import { Test1 } from "./test1";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");


const ColumnsSelectionView = () => {

  const selectedDataSet = useRef(null)
  const handleSearchSelectionChanged = () => { }

  const colData = [{
    headerText: "measureStatusId",
    sortProperty: "status",
    sortable: "enabled",
    headerClassName: "",
    id: "measureStatusId",
    // headerRenderer: customHeaderSortableRenderer,
    columnGroup: "patient-info",
    regions: ["us",
      "emea",
      "gov"],
    width: '16rem'
  },
  {
    headerText: "latestSupportingFactId",
    sortProperty: "supportingFactDisplayName",
    sortable: "enabled",
    headerClassName: "",
    id: "latestSupportingFactId",
    // headerRenderer: customHeaderSortableRenderer,
    columnGroup: "patient-info",
    regions: ["us",
      "emea",
      "gov"],
    width: '16rem'
  }]

  const allColumns = new MutableArrayDataProvider(colData, { keyAttributes: "id" })
  return (
    <>
      <oj-c-select-multiple
        labelHint="testing the close methods with click"
        labelEdge="inside"
        class="oj-form-control-max-width-md"
        data={allColumns}
        value={selectedDataSet.current}
        itemText="headerText"
        onvalueChanged={handleSearchSelectionChanged}
      >
      </oj-c-select-multiple>

    </>
  )
}
const NavLayout = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [isColumnsSelectionViewOpen, setIsColumnsSelectionViewOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpened(!opened);
  };
  const togglePopDrawer = () => {
    setIsColumnsSelectionViewOpen(!isColumnsSelectionViewOpen);
  };

  const handleColumnsSelectionViewDrawerClosed = () => {
    //setColumnsToShow(shownColumns);
    if (isColumnsSelectionViewOpen) {
      setIsColumnsSelectionViewOpen(false);
    }
  }

  const testing = () => {}
  return (
    <div class="oj-web-applayout-content">
      <oj-button
        onojAction={toggleDrawer}
        aria-label="To go to drawer content, locate header with name Drawer Content"
        label="Toggle End Drawer"
        chroming="callToAction"
      ></oj-button>
      <oj-button
        onojAction={togglePopDrawer}
        aria-label="To go to drawer content, locate header with name Drawer Content"
        label="Toggle Popup Drawer"
        chroming="callToAction"
      ></oj-button>
      <oj-drawer-layout endOpened={opened} class="demo-full-height">
        <div class="oj-flex oj-sm-flex-items-1">
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
            <h2 class="oj-typography-heading-sm"> Navigation List </h2>
            <NavList />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
            <h2 class="oj-typography-heading-sm">
              {"Accordion and Collapsible"}
            </h2>
            <Accordion />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-md">
            <h2 class="oj-typography-heading-sm"> Action Card </h2>
            <ActionCard />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-xl">
            <h2 class="oj-typography-heading-sm"> Tabbar </h2>
            <TabBar />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-sm">
            <h2 class="oj-typography-heading-sm"> Dialog </h2>
            <Dialog />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-sm">
            <h2 class="oj-typography-heading-sm"> Popup </h2>
            <Popup />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel-sm">
            <h2 class="oj-typography-heading-sm"> Andy Sefkow </h2>
            <Test1 />
          </div>
        </div>
        <div
          slot="end"
          class="oj-color-invert nav-drawer-light-bg demo-full-height"
        >
          <div class="demo-drawer-header">
            <h6>Drawer Content</h6>
            <oj-button
              display="icons"
              chroming="borderless"
              onojAction={toggleDrawer}
            >
              <span slot="startIcon" class="oj-ux-ico-close"></span>
              Close
            </oj-button>          <oj-c-button id="editRecommendationButton" display="icons" label="Edit Recommendation"
            size="sm" chroming="borderless" onojAction={testing}>
            <span className="oj-ux-ico-edit-inline-s" slot="startIcon"></span>
          </oj-c-button>
          </div>
          <div class="demo-padding demo-form-container oj-typography-body-md">
            <p>Add any kind of content that you like in here.</p>
            <p>
              You can also set the drawer to overlay instead of reflowing the
              page content.
            </p>
            <p>
              If you want a drawer that covers the full page instead of this
              content area, you can use the oj-drawer-popup component.
            </p>
          </div>
        </div>
      </oj-drawer-layout>
      <oj-c-drawer-popup
        id='column-selection-drawer'
        edge="end"
        opened={isColumnsSelectionViewOpen}
        modality="modeless"
        autoDismiss="none"
        onojClose={handleColumnsSelectionViewDrawerClosed}>
        <div class="common-drawer">
          <ColumnsSelectionView />
        </div>
      </oj-c-drawer-popup>
    </div>
  );
};
export default NavLayout;
