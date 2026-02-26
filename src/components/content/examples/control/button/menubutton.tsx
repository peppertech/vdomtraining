import "preact";
import {useState} from "preact/hooks";
import "ojs/ojmenu";
import "ojs/ojbutton";
import { MenuButtonElement } from "ojs/ojbutton";
import 'oj-c/menu-button';
import { type CMenuButtonElement, MenuButton } from 'oj-c/menu-button';

type MenuItem = {
  label: string
  key: string
}



const MenuButton2 = () => {
  const [icon,setIcon] = useState<string>("oj-ux-ico-zoom-in")
  
const actionItems: CMenuButtonElement['items'] = [
  {
    key: "save",
    label: "Save",
    startIcon: { class: "oj-ux-ico-save" },
    disabled: false,    
    onAction: () => {
      console.log("Save selected");
    }
  },
  {
    key: "zoomin",
    label: "Zoom In",
    startIcon: { class: icon },
    disabled: false,    
    onAction: () => {
      console.log("Zoom in selected");
    }
  },
  {
    key: "zoomout",
    label: "Zoom Out",
    startIcon: { class: "oj-ux-ico-zoom-out" },
    disabled: false,
    onAction: () => {
      console.log("Zoom out selected");
    }
  },
  {
    key: "print",
    label: "Print...", 
    startIcon: { class: "oj-ux-ico-print" }, 
    disabled: true
  },
];

  const menuItems = [
    { id: "save", label: "Save", icon: "oj-ux-ico-print", disabled: false },
    {
      id: "zoomin",
      label: "Zoom In",
      icon: "oj-ux-ico-zoom-in",
      disabled: false,
    },
    {
      id: "zoomout",
      label: "Zoom Out",
      icon: "oj-ux-ico-zoom-out",
      disabled: false,
    },
    { id: "print", label: "Print...", icon: "oj-ux-ico-print", disabled: true },
  ];

  const handleMenuSelection = (event: MenuButtonElement.ojAction) => {
    console.log("Menu item: ", event.detail.selectedValue);
  };


  const toggleIcon = () => {
    setIcon(icon === "oj-ux-ico-zoom-in"?"oj-ux-ico-zoom-out":"oj-ux-ico-zoom-in")
  }
  return (
    <>
    <oj-c-button label="Toggle Icon" onojAction={toggleIcon}></oj-c-button>
      {/* Core Pack menu button requires a label (string) per its typings */}
      <oj-c-menu-button label="Actions" items={actionItems} />
      <MenuButton label="MenuButtonElement" items={actionItems} />
      <oj-menu-button id="menuButton1">
        Action
        <oj-menu id="myMenu1" slot="menu" onojMenuAction={handleMenuSelection}>
          {menuItems.map((item) => (
            <oj-option value={item.label} disabled={item.disabled} id={item.id}>
              {item.icon && <span slot="startIcon" class={item.icon}></span>}
              {item.label}
            </oj-option>
          ))}
        </oj-menu>
      </oj-menu-button>
    </>
  );
};

export default MenuButton2;
