import { h } from 'preact';
import 'ojs/ojbutton';
import "css!./demo.css";

export const PanelPaneldrag = () => {
  return (
      <div id="panelPage">
            <div class="oj-flex">
                    <div class="oj-panel oj-sm-margin-2x demo-mypanel">
                              <div class="oj-panel-drag-handle" title="Drag to reorder"><span class="oj-panel-drag-icon" /></div>
                              <h3>Drag Affordance</h3>
                              <div>Affordance only, see demo description for link to example usage.</div>
                          </div>
                    <div class="oj-panel oj-sm-margin-2x demo-mypanel">
                              <h3>Remove Affordance</h3>
                              <div>Affordance only, see demo description for link to example usage.</div>
                              <oj-button class="oj-panel-remove-button demo-button" chroming="borderless" display="icons" data-oj-binding-provider="none">
                                          <span slot="startIcon" class="oj-panel-remove-icon" />
                                          <span>remove</span>
                                      </oj-button>
                          </div>
                    <div class="oj-panel oj-sm-margin-2x demo-mypanel">
                              <h3>Expand Affordance</h3>
                              <div>Affordance only, see demo description for link to example usage.</div>
                              <oj-button class="oj-panel-resize-button demo-button" chroming="borderless" display="icons" data-oj-binding-provider="none">
                                          <span slot="startIcon" class="oj-panel-expand-icon" />
                                          <span>expand</span>
                                      </oj-button>
                          </div>
                    <div class="oj-panel oj-sm-margin-2x demo-mypanel">
                              <h3>Collapse Affordance</h3>
                              <div>Affordance only, see demo description for link to example usage.</div>
                              <oj-button class="oj-panel-resize-button demo-button" chroming="borderless" display="icons" data-oj-binding-provider="none">
                                          <span slot="startIcon" class="oj-panel-collapse-icon" />
                                          <span>collapse</span>
                                      </oj-button>
                          </div>
                </div>
        </div>
    );
};

export default PanelPaneldrag;
