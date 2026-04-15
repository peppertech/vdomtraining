import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/drawer-layout";
import "ojs/ojnavigationlist";

const DrawerLayoutCorePack = () => {
  const [opened, setOpened] = useState(false);

  const toggleDrawer = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  return (
    <div
      id="demo-container-core-pack"
      class="oj-web-applayout-max-width oj-web-applayout-content demo-full-height"
    >
      <oj-c-drawer-layout startOpened={opened} class="demo-full-height">
        <div class="demo-padding oj-typography-body-md">
          <div class="demo-controls oj-sm-margin-2x-bottom">
            <oj-c-button
              id="corePackButtonOpener"
              display="icons"
              chroming="outlined"
              label="Start"
              onojAction={toggleDrawer}
            >
              <span slot="startIcon" class="oj-ux-ico-menu"></span>
            </oj-c-button>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Venenatis a condimentum vitae sapien pellentesque habitant morbi
            tristique senectus. Hendrerit dolor magna eget est lorem ipsum dolor
            sit. Volutpat consequat mauris nunc congue nisi vitae. Parturient
            montes nascetur ridiculus mus mauris vitae ultricies. Fermentum leo
            vel orci porta non pulvinar neque laoreet.
          </p>
          <p>
            Non arcu risus quis varius quam quisque. In metus vulputate eu
            scelerisque felis imperdiet proin fermentum leo. Pretium viverra
            suspendisse potenti nullam ac tortor vitae. Bibendum arcu vitae
            elementum curabitur. Fermentum leo vel orci porta. Nisl vel pretium
            lectus quam id leo in. Lorem ipsum dolor sit amet consectetur. Orci
            sagittis eu volutpat odio facilisis mauris sit. Risus nullam eget
            felis eget nunc lobortis mattis aliquam faucibus.
          </p>
          <p>
            Pellentesque dignissim ac orci a elementum. Morbi at venenatis nisl.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla enim
            magna, mattis sit amet arcu molestie, fermentum pellentesque enim.
            Vivamus commodo est eget justo pharetra convallis. Phasellus
            hendrerit elementum ipsum, sit amet dignissim risus lacinia
            fringilla. Aenean non diam nulla. Maecenas imperdiet lacus accumsan
            venenatis tempus. Aliquam vulputate facilisis tellus bibendum
            vestibulum.
          </p>
          <p>
            Sed at odio luctus, tempus felis quis, hendrerit justo. Aliquam
            varius congue massa id fringilla. In consectetur urna et accumsan
            ornare. Quisque consequat consequat lorem, et euismod metus faucibus
            vitae. Sed sit amet risus a leo aliquet imperdiet. Cras pulvinar
            consequat feugiat. Proin tristique congue dignissim. Phasellus in
            erat ultrices, mollis orci in, consectetur arcu.
          </p>
        </div>
        <div
          slot="start"
          id="demo-core-pack-drawer-start"
          class="demo-drawer-start oj-color-invert nav-drawer-light-bg demo-full-height"
        >
          <div class="demo-drawer-header">
            <div>
              <h6>Welcome</h6>
            </div>
            <oj-c-button
              id="corePackButtonCloser"
              display="icons"
              chroming="borderless"
              label="Close"
              onojAction={toggleDrawer}
            >
              <span slot="startIcon" class="oj-ux-ico-close"></span>
            </oj-c-button>
          </div>
          <oj-navigation-list class="demo-padding">
            <ul>
              <li id="core-dashboard">
                <a href="#">Dashboard</a>
              </li>
              <li id="core-incidents">
                <a href="#">Incidents</a>
              </li>
              <li id="core-customers">
                <a href="#">Customers</a>
              </li>
              <li id="core-about">
                <a href="#">About</a>
              </li>
            </ul>
          </oj-navigation-list>
        </div>
      </oj-c-drawer-layout>
    </div>
  );
};

export default DrawerLayoutCorePack;
