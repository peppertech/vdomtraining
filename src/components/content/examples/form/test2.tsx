import { h } from "preact";
import { useRef } from "preact/hooks";

import "oj-c/button";

import "ojs/ojdialog";
import type { ojDialog } from "ojs/ojdialog";

export function Content() {
  const helloDialogRef = useRef<ojDialog>(null);

  const onLinkAction = () => {
    helloDialogRef.current?.open();
  };

  const closeHelloDialog = () => {
    helloDialogRef.current?.close();
  };

  return (
    <>
      <oj-c-button
        onojAction={onLinkAction}
        size="lg"
        chroming="borderless"
        display="icons"
        label="Show Greeting Dialog"
      >
        <span slot="startIcon" class="oj-ux-ico-emoji-smile"></span>
      </oj-c-button>
      <oj-c-button
        onojAction={onLinkAction}
        size="lg"
        chroming="borderless"
        display="icons"
        label="Show Acknowledgement Dialog"
      >
        <span slot="startIcon" class="oj-ux-ico-emoji-meh"></span>
      </oj-c-button>
      <oj-c-button
        onojAction={onLinkAction}
        size="lg"
        chroming="borderless"
        display="icons"
        label="Show Hello Dialog"
      >
        <span slot="startIcon" class="oj-ux-ico-emoji-sad"></span>
      </oj-c-button>

      <div>
        <oj-dialog
          id="attachmentDeleteDialog"
          ref={helloDialogRef}
          dialogTitle="Hello World!"
          cancelBehavior="icon"
        >
          <div slot="body">This is a test dialog</div>
          <div slot="footer">
            <oj-c-button onojAction={closeHelloDialog} label="Close" />
          </div>
        </oj-dialog>
      </div>
    </>
  );
}
