import { h } from 'preact';
import { useRef } from 'preact/hooks';
import 'ojs/ojconveyorbelt';
import "css!./demo.css";

type ConveyorBeltElement = HTMLElement & {
    scrollElementIntoView: (element: Element) => void;
};

function isRtl(): boolean {
    return document.documentElement.dir === 'rtl';
}

export const ConveyorBeltCustomKeyNavigation = () => {
  const conveyorBeltRef = useRef<ConveyorBeltElement | null>(null);
  const contentParentRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
      // This function implements keyboard navigation among the items in
      // the conveyor using the left and right arrow keys for the purpose
      // of demonstrating how to programmatically scroll an item into view
      // using the DOM function scrollIntoView().
      const contentParentDiv = contentParentRef.current;
      if (!contentParentDiv) {
          return;
      }
      // The contentChildren are the items in the conveyor.
      let contentChildren: HTMLCollection = contentParentDiv.children;
      // The currChild is the currently highlighted item.
      let arCurrChild = null;
      for (let i = 0; i < contentChildren.length; i++) {
          if (contentChildren[i].className.search('oj-bg-brand-30') > 0) {
              arCurrChild = contentChildren[i];
              break;
          }
      }
      let currChild = arCurrChild && contentParentDiv.children.length > 0 ? arCurrChild : null;
      // The newChild is the item to highlight next.
      let newChild = null;
      // This flag indicates if a left/right arrow key was pressed.
      // Right arrow keyCode = 39
      // Left arrow keyCode = 37
      let bLeftRightArrow: boolean = event.keyCode === 39 || event.keyCode === 37;
      if (currChild) {
          let bRtl = isRtl();
          // Get the item to highlight next.
          let arNewChild = null;
          if ((event.keyCode === 39 && !bRtl) || (event.keyCode === 37 && bRtl)) {
              arNewChild = currChild.nextElementSibling;
          }
          else if ((event.keyCode === 39 && bRtl) || (event.keyCode === 37 && !bRtl)) {
              arNewChild = currChild.previousElementSibling;
          }
          if (arNewChild && contentParentDiv.children.length > 0) {
              newChild = arNewChild;
              // Remove the highlight styling from the current item.
              currChild.classList.remove('oj-bg-brand-30');
          }
      }
      else if (bLeftRightArrow) {
          // If there is no currently highlighted item,
          // make the first item the next to highlight.
          newChild = contentChildren[0];
      }
      if (newChild) {
          // Apply the highlight styling to the next item.
          newChild.classList.add('oj-bg-brand-30');
          // Scroll the next highlight item into view.
          const conveyorBelt = conveyorBeltRef.current;
          if (!conveyorBelt) {
              return;
          }
          conveyorBelt.scrollElementIntoView(newChild);
      }
  };

  return (
      <div id="customKeyNavigation">
            <div class="oj-flex">
                    <oj-conveyor-belt ref={conveyorBeltRef} id="conveyor1" class="oj-lg-6 oj-md-9 oj-sm-12 oj-flex-item" contentParent="#contentParentDiv">
                              <div ref={contentParentRef} id="contentParentDiv" tabIndex={0} class="oj-sm-margin-2x" onKeyDown={handleKeyDown}>
                                          <div class="oj-panel demo-conveyor-item oj-bg-brand-30 oj-sm-padding-4x oj-sm-margin-1x">Hydrogen</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Helium</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Lithium</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Beryllium</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Boron</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Carbon</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Nitrogen</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Oxygen</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Fluorine</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Neon</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Sodium</div>
                                          <div class="oj-panel demo-conveyor-item oj-sm-padding-4x oj-sm-margin-1x">Magnesium</div>
                                      </div>
                          </oj-conveyor-belt>
                </div>
        </div>
    );
};

export default ConveyorBeltCustomKeyNavigation;
