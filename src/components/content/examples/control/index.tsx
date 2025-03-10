import "preact";
import Avatar from "./avatar";
import Badge from "./badge";
import Button from "./button/button";
import ConveyorBelt from "./conveyorbelt";
import FilePicker from "./filepicker";
import FilmStrip from "./filmstrip";
import FilmStripTest from "./filmstrip-pagingdots";
import Menu from "./menu/menu";
import ProgressBar from "./progress/progressbar";
import Toolbar from "./toolbar";
import Train from "./train";
import ButtonSetMany from "./button/buttonsetmany";
import ButtonSetOne from "./button/buttonsetone";
import MenuButton from "./button/menubutton";
import CSSImage from "./image/cssimage";
import IconFont from "./image/iconfont";
import MenuSelectMany from "./menu/menuselectmany";
import ProgressCircle from "./progress/progresscircle";
import { MasonryItem, MasonryLayout } from "../navlayout/masonry";
import { Counter } from "./counter";

const Control = () => {
  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <MasonryLayout>
        <MasonryItem sizeClass="oj-masonrylayout-tile-2x2">
          <h2 class="oj-typography-heading-sm">Avatar</h2>
          <div>
            <Avatar />
          </div>
        </MasonryItem>
        <MasonryItem sizeClass="oj-masonrylayout-tile-2x1">
          <h2 class="oj-typography-heading-sm">Badge</h2>
          <Badge text="Neutral" /> &nbsp;
          <Badge text="Danger" color="danger" /> &nbsp;
          <Badge text="Warning" color="warning" subtle /> &nbsp;
          <Badge text="Success" color="success" subtle /> &nbsp;
        </MasonryItem>
        <MasonryItem sizeClass="oj-masonrylayout-tile-3x1">
          <h2 class="oj-typography-heading-sm">Conveyor Belt</h2>
          <ConveyorBelt />
        </MasonryItem>
        <MasonryItem sizeClass="oj-masonrylayout-tile-2x3">
          <h2 class="oj-typography-heading-sm">Button</h2>
          <div>
            <Button />
          </div>
          <br />
          <div>
            <ButtonSetMany />
          </div>
          <br />
          <div>
            <ButtonSetOne />
          </div>
          <br />
          <div>
            <MenuButton />
          </div>
        </MasonryItem>
        <MasonryItem sizeClass="oj-masonrylayout-tile-2x2">
          <h2 class="oj-typography-heading-sm">Menu</h2>
          <div>
            <Menu />
          </div>
          <div>
            <MenuButton />
          </div>
          <br />
          <div>
            <MenuSelectMany />
          </div>
        </MasonryItem>
        <MasonryItem sizeClass="oj-masonrylayout-tile-2x1">
          <h2 class="oj-typography-heading-sm">Progress Bar</h2>
          <div>
            <ProgressBar />
          </div>
          <div>
            <ProgressCircle />
          </div>
        </MasonryItem>
        <MasonryItem sizeClass="oj-masonrylayout-tile-2x2">
          <h2 class="oj-typography-heading-sm">File Picker</h2>
          <FilePicker />
        </MasonryItem>
        <MasonryItem sizeClass="oj-masonrylayout-tile-2x2">
          <h2 class="oj-typography-heading-sm">Film Strip</h2>
          <FilmStrip />
        </MasonryItem>
        <MasonryItem sizeClass="oj-masonrylayout-tile-2x2">
          <h2 class="oj-typography-heading-sm">Film Strip with paging</h2>
          <FilmStripTest />
        </MasonryItem>
      </MasonryLayout>
      <MasonryLayout>
        <MasonryItem sizeClass="oj-masonrylayout-tile-3x1">
          <h2 class="oj-typography-heading-sm">Toolbar</h2>
          <Toolbar />
        </MasonryItem>
      </MasonryLayout>
      <MasonryLayout>
        <MasonryItem sizeClass="oj-masonrylayout-tile-3x2">
          <h2 class="oj-typography-heading-sm">Linear Train</h2>
          <Train />
        </MasonryItem>
      </MasonryLayout>
      <Counter initialCount={0}/>
    </div>
  );
};
export default Control;
