import { h } from 'preact';
import 'oj-c/conveyor-belt';

export const ConveyorBeltKeyboardScrollingcorepack = () => {
  return (
      <div id="conveyorbelt-keyboard-scrolling-example">
            <div class="oj-flex">
                    <oj-c-conveyor-belt tabIndex={0} id="conveyorBelt" class="oj-lg-6 oj-md-9 oj-sm-12 oj-flex-item">
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Hydrogen</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Helium</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Lithium</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Beryllium</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Boron</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Carbon</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Nitrogen</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Oxygen</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Fluorine</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Neon</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Sodium</div>
                              <div class="oj-panel oj-sm-padding-4x oj-sm-margin-1x">Magnesium</div>
                          </oj-c-conveyor-belt>
                </div>
        </div>
    );
};

export default ConveyorBeltKeyboardScrollingcorepack;
