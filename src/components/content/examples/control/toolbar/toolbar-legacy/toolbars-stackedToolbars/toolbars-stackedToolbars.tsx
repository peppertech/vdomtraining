import { h } from 'preact';
import 'ojs/ojbutton';
import 'ojs/ojtoolbar';

export const ToolbarsStackedToolbars = () => {
  return (
    <div id="toolbar-container">
      <div id="toolbars">
        <div class="oj-flex oj-divider-top oj-divider-start oj-divider-end">
          <div class="oj-sm-padding-2x-end">
            <oj-toolbar id="toolbar1" aria-label="Navigation toolbar">
              <oj-button id="previous">
                <span slot="startIcon" class="oj-ux-ico-chevron-left" />
                Previous
              </oj-button>
              <oj-button id="next">
                <span slot="endIcon" class="oj-ux-ico-chevron-right" />
                Next
              </oj-button>
            </oj-toolbar>
          </div>
          <div class="oj-divider-start oj-sm-padding-2x-start">
            <oj-toolbar id="toolbar2" aria-label="Resources toolbar">
              <oj-button id="chat" display="icons">
                <span slot="startIcon" class="oj-ux-ico-chat" />
                Chat
              </oj-button>
              <oj-button id="library" display="icons">
                <span slot="startIcon" class="oj-ux-ico-library" />
                Library
              </oj-button>
              <oj-button id="password" display="icons">
                <span slot="startIcon" class="oj-ux-ico-education" />
                Ask an expert
              </oj-button>
            </oj-toolbar>
          </div>
        </div>
        <div class="oj-divider-top oj-divider-bottom oj-divider-start oj-divider-end">
          <oj-toolbar id="toolbar3" aria-label="Actions toolbar">
            <oj-button id="a" display="icons">
              <span slot="startIcon" class="oj-ux-ico-home" />
              Go home
            </oj-button>
            <oj-button id="b" display="icons">
              <span slot="startIcon" class="oj-ux-ico-bookmark-selected" />
              Bookmark
            </oj-button>
            <oj-button id="c" display="icons" disabled={true}>
              <span slot="startIcon" class="oj-ux-ico-color-palette" />
              Paint
            </oj-button>
          </oj-toolbar>
        </div>
      </div>
    </div>
  );
};

export default ToolbarsStackedToolbars;
