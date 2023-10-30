import { NavList } from "./navlist";
import { Accordion } from "./accordion";
import { ActionCard } from "./actioncard";
import "preact";

const NavLayout = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <div class="oj-flex">
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Navigation List </h2>
          <NavList />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Accordion and Collapsible </h2>
          <Accordion />
        </div>
        <div class="oj-flex-item oj-sm-margin-6x-bottom oj-sm-12 oj-md-6">
          <h2 class="oj-typography-heading-sm"> Action Card </h2>
          <ActionCard />
        </div>
      </div>
    </div>
  );
};
export default NavLayout;
