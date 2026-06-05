import { h } from 'preact';
import 'ojs/ojconveyorbelt';
import 'ojs/ojbutton';
import 'ojs/ojoption';

export const ConveyorBeltDescendantContent = () => {
  return (
      <div id="descendantContent">
            <div class="oj-flex">
                    <oj-conveyor-belt id="conveyorBelt" class="oj-lg-6 oj-md-9 oj-sm-12 oj-flex-item" contentParent="#contentParentDiv">
                              <oj-buttonset-many id="contentParentDiv" class="oj-buttonset-width-auto">
                                          <oj-option>Hydrogen</oj-option>
                                          <oj-option>Helium</oj-option>
                                          <oj-option>Lithium</oj-option>
                                          <oj-option>Beryllium</oj-option>
                                          <oj-option>Boron</oj-option>
                                          <oj-option>Carbon</oj-option>
                                          <oj-option>Nitrogen</oj-option>
                                          <oj-option>Oxygen</oj-option>
                                          <oj-option>Fluorine</oj-option>
                                          <oj-option>Neon</oj-option>
                                          <oj-option>Sodium</oj-option>
                                          <oj-option>Magnesium</oj-option>
                                      </oj-buttonset-many>
                          </oj-conveyor-belt>
                </div>
        </div>
    );
};

export default ConveyorBeltDescendantContent;
