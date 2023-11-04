import { NavList } from "./navlist";
import { Accordion } from "./accordion";
import { ActionCard } from "./actioncard";
import { TabBar } from "./tabbar";
import { Dialog } from "./dialog";
import { Popup } from "./popup";
import "preact";

const NavLayout = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex oj-sm-flex-items-1">
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
          <h2 class="oj-typography-heading-sm"> Navigation List </h2>
          <NavList />
        </div>
        <div class="oj-flex-item oj-panel oj-sm-margin-2x demo-panel">
          <h2 class="oj-typography-heading-sm"> Accordion and Collapsible </h2>
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
    </div>
  );
};
export default NavLayout;
