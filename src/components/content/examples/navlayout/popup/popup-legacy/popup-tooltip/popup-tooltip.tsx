import { h } from "preact";
import type { ComponentProps } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { ojPopup } from "ojs/ojpopup";
import "ojs/ojpopup";

type PopupProps = ComponentProps<"oj-popup">;

const AUTO_TIMEOUT = 3000;
const OPEN_DELAY = 500;
const tooltipPosition: PopupProps["position"] = {
  my: { horizontal: "start", vertical: "top" },
  offset: { x: 0, y: 10 },
  at: { horizontal: "start", vertical: "bottom" },
  collision: "flipfit",
};

export const PopupTooltip = () => {
  const popupRef = useRef<ojPopup>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contextNodeRef = useRef<HTMLElement | null>(null);
  const openTimeoutRef = useRef<number | null>(null);
  const autoTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const popup = popupRef.current as (ojPopup & HTMLElement) | null;

    if (!popup) {
      return;
    }

    const clearOpenTimeout = () => {
      if (openTimeoutRef.current !== null) {
        window.clearTimeout(openTimeoutRef.current);
        openTimeoutRef.current = null;
      }
    };

    const clearAutoTimeout = () => {
      if (autoTimeoutRef.current !== null) {
        window.clearTimeout(autoTimeoutRef.current);
        autoTimeoutRef.current = null;
      }
    };

    const closePopup = () => {
      if (popup.isOpen()) {
        popup.close();
      }
    };

    const setAutoTimeout = () => {
      clearAutoTimeout();
      autoTimeoutRef.current = window.setTimeout(closePopup, AUTO_TIMEOUT);
    };

    const cleanup = () => {
      contextNodeRef.current = null;
    };
    popup.addEventListener("ojOpen", setAutoTimeout);
    popup.addEventListener("ojClose", cleanup);
    popup.addEventListener("ojBeforeClose", clearAutoTimeout);
    popup.addEventListener("ojFocus", clearAutoTimeout);
    popup.addEventListener("mouseenter", clearAutoTimeout);

    return () => {
      clearOpenTimeout();
      clearAutoTimeout();
      popup.removeEventListener("ojOpen", setAutoTimeout);
      popup.removeEventListener("ojClose", cleanup);
      popup.removeEventListener("ojBeforeClose", clearAutoTimeout);
      popup.removeEventListener("ojFocus", clearAutoTimeout);
      popup.removeEventListener("mouseenter", clearAutoTimeout);
    };
  }, []);

  const openTooltip = (launcher: HTMLElement, title: string) => {
    const popup = document.getElementById("tooltipPopup") as ojPopup | null;
    const popupContent =
      popup instanceof HTMLElement
        ? popup.querySelector<HTMLElement>(".oj-popup-content")
        : null;
    const content = popupContent ?? contentRef.current;

    if (!popup || !content) {
      return;
    }

    if (contextNodeRef.current === launcher && popup.isOpen()) {
      return;
    }

    if (openTimeoutRef.current !== null) {
      window.clearTimeout(openTimeoutRef.current);
    }

    openTimeoutRef.current = window.setTimeout(() => {
      contextNodeRef.current = launcher;
      content.innerHTML = title;
      popup.open(launcher);
    }, OPEN_DELAY);
  };

  const preventAnchorNavigation = (event: Event) => {
    event.preventDefault();
  };

  const handleTooltipOpen = (event: Event) => {
    const launcher = event.currentTarget as HTMLElement;
    const title = launcher.getAttribute("data-title");

    if (title) {
      openTooltip(launcher, title);
    }
  };

  return (
    <div id="popupWrapper">
      <p>
        Key words in this paragraph are accentuated by a{" "}
        <a
          tabindex={0}
          href="#"
          data-title="Tooltip is common graphical user interface element. Tooltips is a hover box with information about the item being selected."
          onMouseEnter={handleTooltipOpen}
          onFocus={handleTooltipOpen}
          onClick={preventAnchorNavigation}
        >
          <u>tooltip</u>
        </a>{" "}
        that is implemented using the{" "}
        <a
          tabindex={0}
          href="#"
          data-title="The coolest of all JET components."
          onMouseEnter={handleTooltipOpen}
          onFocus={handleTooltipOpen}
          onClick={preventAnchorNavigation}
        >
          <u>oj-popup</u>
        </a>
        . This tooltip is accessible via the keyboard and mouse.
      </p>
      <oj-popup
        id="tooltipPopup"
        ref={popupRef}
        initialFocus="none"
        autoDismiss="focusLoss"
        modality="modeless"
        position={tooltipPosition}
        style={{ maxWidth: "340px" }}
      >
        <div ref={contentRef}></div>
      </oj-popup>
    </div>
  );
};

export default PopupTooltip;
