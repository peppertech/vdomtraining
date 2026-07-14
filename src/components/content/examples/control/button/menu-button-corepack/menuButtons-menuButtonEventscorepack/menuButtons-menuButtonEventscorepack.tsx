import "oj-c/menu-button";
import { CMenuButtonElement } from "oj-c/menu-button";
import 'preact';
import type { ComponentProps,JSX } from "preact";
import { useEffect,useMemo,useRef,useState } from "preact/hooks";

type MenuItems = NonNullable<ComponentProps<"oj-c-menu-button">["items"]>;

const formatEventInfo = (event: Event) => {
  const target = event.target as HTMLElement | null;
  if (!target) {
    return event.type;
  }

  const targetId = target.getAttribute("id");
  const targetText = target.textContent?.trim() ?? "";
  return `${event.type}: [${target.tagName.toLowerCase()}${targetId ? `:${targetId}` : ""}, ${targetText}]`;
};

export const MenuButtonsMenuButtonEventscorepack = () => {
  const [selectedItem, setSelectedItem] = useState("(None selected yet)");
  const [selectedItem1, setSelectedItem1] = useState("(None selected yet)");
  const [eventLog, setEventLog] = useState("");
  const [eventLog2, setEventLog2] = useState("");
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerId2Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuButtonRef = useRef<CMenuButtonElement | null>(null);
  const menuButton1Ref = useRef<CMenuButtonElement | null>(null);

  const clearPrimaryTimer = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  const clearSecondaryTimer = () => {
    if (timerId2Ref.current) {
      clearTimeout(timerId2Ref.current);
      timerId2Ref.current = null;
    }
  };

  const showPrimaryEvent = (event: Event) => {
    clearPrimaryTimer();
    setEventLog(formatEventInfo(event));
    timerIdRef.current = setTimeout(() => {
      setEventLog("");
      timerIdRef.current = null;
    }, 2000);
  };

  const showSecondaryEvent = (event: Event) => {
    clearSecondaryTimer();
    setEventLog2(formatEventInfo(event));
    timerId2Ref.current = setTimeout(() => {
      setEventLog2("");
      timerId2Ref.current = null;
    }, 2000);
  };

  const handlePrimaryMouseMove = (event: JSX.TargetedMouseEvent<CMenuButtonElement>) => {
    showPrimaryEvent(event);
  };

  const handleSecondaryMouseMove = (event: JSX.TargetedMouseEvent<CMenuButtonElement>) => {
    showSecondaryEvent(event);
  };

  const items = useMemo<MenuItems>(
    () => [
      {
        label: "Zoom In",
        key: "zoomin",
        startIcon: { class: "oj-ux-ico-zoom-in" },
        onAction: () => setSelectedItem("Zoom In")
      },
      {
        label: "Zoom Out",
        key: "zoomout",
        startIcon: { class: "oj-ux-ico-zoom-out" },
        onAction: () => setSelectedItem("Zoom Out")
      },
      { type: "separator" },
      {
        label: "Print...",
        key: "print",
        disabled: true,
        startIcon: { class: "oj-ux-ico-zoom-print" },
        onAction: () => setSelectedItem("Print...")
      }
    ],
    []
  );

  const submenuItems = useMemo<MenuItems>(
    () => [
      {
        label: "Reply",
        key: "reply",
        startIcon: { class: "oj-ux-ico-email-reply" },
        onAction: () => setSelectedItem1("Reply")
      },
      {
        label: "Reply All",
        key: "replyall",
        startIcon: { class: "oj-ux-ico-email-reply-all" },
        onAction: () => setSelectedItem1("Reply All")
      },
      {
        label: "Forward",
        key: "forward",
        startIcon: { class: "oj-ux-ico-email-forward" },
        onAction: () => setSelectedItem1("Forward")
      },
      { type: "separator" },
      {
        type: "submenu",
        label: "Move to",
        items: [
          {
            label: "Inbox",
            key: "inbox",
            startIcon: { class: "oj-ux-ico-inbox" },
            onAction: () => setSelectedItem1("Inbox")
          },
          {
            label: "Archive",
            key: "archive",
            startIcon: { class: "oj-ux-ico-archive" },
            onAction: () => setSelectedItem1("Archive")
          },
          {
            label: "Trash",
            key: "trash",
            variant: "destructive",
            startIcon: { class: "oj-ux-ico-trash" },
            onAction: () => setSelectedItem1("Trash")
          }
        ]
      }
    ],
    []
  );

  useEffect(() => () => {
    clearPrimaryTimer();
    clearSecondaryTimer();
  }, []);

  return (
    <div id="menubutton-container">
      <h6>MenuButton</h6>
      <oj-c-menu-button
        id="menuButton"
        ref={menuButtonRef}
        label="Actions"
        items={items}
        onMouseMove={handlePrimaryMouseMove}
        class="oj-sm-margin-5x-bottom"
      />
      <div>{eventLog}</div>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results"> {selectedItem}</span>
      </div>
      <h6 class="oj-sm-margin-8x-top">MenuButton with Submenu</h6>
      <oj-c-menu-button
        id="menuButton1"
        ref={menuButton1Ref}
        label="Actions"
        items={submenuItems}
        onMouseMove={handleSecondaryMouseMove}
        class="oj-sm-margin-5x-bottom"
      />
      <div>{eventLog2}</div>
      <div class="oj-typography-body-md oj-typography-bold">
        Last selected menu item:
        <span id="results1"> {selectedItem1}</span>
      </div>
    </div>
  );
};

export default MenuButtonsMenuButtonEventscorepack;
