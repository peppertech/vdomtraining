import { NavList } from "./navlist";
import { Accordion } from "./accordion";
import { ActionCard } from "./actioncard";
import { TabBar } from "./tabbar";
import { Dialog } from "./dialog";
import { Popup } from "./popup";
import "preact";
import { useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojdrawerlayout";

const NavLayout = () => {
  const [opened, setOpened] = useState<boolean>(false);

  const toggleDrawer = () => {
    setOpened(!opened);
  };
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-button
        onojAction={toggleDrawer}
        aria-label="To go to drawer content, locate header with name Drawer Content"
        label="Toggle End Drawer"
        chroming="callToAction"></oj-button>
      <oj-drawer-layout endOpened={opened} class="demo-full-height">
        <div class="oj-flex oj-sm-flex-items-1">
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
            <h2 class="oj-typography-heading-sm"> Navigation List </h2>
            <NavList />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
            <h2 class="oj-typography-heading-sm">
              {"Accordion and Collapsible"}
            </h2>
            <Accordion />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
            <h2 class="oj-typography-heading-sm"> Action Card </h2>
            <ActionCard />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
            <h2 class="oj-typography-heading-sm"> Tabbar </h2>
            <TabBar />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
            <h2 class="oj-typography-heading-sm"> Dialog </h2>
            <Dialog />
          </div>
          <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
            <h2 class="oj-typography-heading-sm"> Popup </h2>
            <Popup />
          </div>
        </div>
        <div
          slot="end"
          class="oj-color-invert nav-drawer-light-bg demo-full-height">
          <div class="demo-drawer-header">
            <h6>Drawer Content</h6>
            <oj-button
              display="icons"
              chroming="borderless"
              onojAction={toggleDrawer}>
              <span slot="startIcon" class="oj-ux-ico-close"></span>
              Close
            </oj-button>
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
    </div>
  );
};
export default NavLayout;
