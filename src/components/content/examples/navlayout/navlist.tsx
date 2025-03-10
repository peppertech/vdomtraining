import { MutableArrayTreeDataProvider } from "ojs/ojmutablearraytreedataprovider";
import "ojs/ojnavigationlist";
import "preact";
import { useCallback, useState } from "preact/hooks";
import { ojNavigationList } from "ojs/ojnavigationlist";

type NavItem = {
  name: string;
  id: string;
  icons: string;
};

const navData = [
  {
    name: "Home",
    id: "home",
    icons: "oj-ux-ico-home",
  },
  {
    name: "Getting Started",
    id: "gettingstarted",
    icons: "oj-ux-ico-education",
    children: [
      {
        name: "Download",
        id: "download",
      },
      {
        name: "Quick Start",
        id: "quickstart",
      },
      {
        name: "Build",
        id: "build",
      },
      {
        name: "Testing",
        id: "testing",
      },
    ],
  },
  {
    name: "Cookbook",
    id: "cookbook",
    icons: "oj-ux-ico-book",
    children: [
      {
        name: "Sample1",
        id: "sample1",
      },
      {
        name: "Sample2",
        id: "sample2",
      },
      {
        name: "Sample3",
        id: "sample3",
      },
      {
        name: "Sample4",
        id: "sample4",
      },
    ],
  },

  {
    name: "Style Lab",
    id: "stylelab",
    icons: "oj-ux-ico-color-palette",
    disabled: "true",
  },
  {
    name: "Library",
    id: "libraray",
    icons: "oj-ux-ico-library",
    children: [
      {
        name: "Articles",
        id: "articles",
        children: [
          {
            name: "News1",
            id: "news1",
          },
          {
            name: "News2",
            id: "news2",
          },
          {
            name: "News3",
            id: "news3",
          },
          {
            name: "News4",
            id: "news4",
          },
        ],
      },
      {
        name: "Audios",
        id: "audios",
      },
      {
        name: "Videos",
        id: "videos",
      },
      {
        name: "Magazines",
        id: "magazines",
      },
    ],
  },
];

const dataprovider = new MutableArrayTreeDataProvider<NavItem["id"], NavItem>(
  navData,
  "id",
  {
    keyAttributeScope: "global",
  }
);

export const NavList = () => {
  const [selectedItem, setSelectedItem] = useState<string>("home");

  const changeHandler = (
    event: ojNavigationList.selectionChanged<NavItem["id"], NavItem>
  ) => {
    if (event.detail.updatedFrom === "internal")
      setSelectedItem(event.detail.value);
    console.log("selected: ", event.detail.value);
  };

  const navItemTemplate = useCallback((
    item: ojNavigationList.ItemContext<NavItem["id"], NavItem>
  ) => {
    return (
      <li id={item.data.id}>
        <a href="">
          <span class={"oj-navigationlist-item-icon " + item.data.icons}></span>
            {item.data.name}
        </a>
      </li>
    );
  },[]);

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-navigation-list
        style="max-width:20rem"
        drillMode="sliding"
        aria-label="Choose a navigation item"
        selection={selectedItem}
        data={dataprovider}
        onselectionChanged={changeHandler}
        id="navlist">
        <template slot="itemTemplate" render={navItemTemplate}></template>
      </oj-navigation-list>
    </div>
  );
};