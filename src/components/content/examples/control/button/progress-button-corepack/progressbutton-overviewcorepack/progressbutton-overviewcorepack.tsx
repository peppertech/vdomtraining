import { h } from "preact";
import type { ComponentProps } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import "css!./demo.css";
import "oj-c/progress-button";

type ProgressButtonActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-progress-button">["onojAction"]>
>[0];

export const ProgressbuttonOverviewcorepack = () => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAction = (_event: ProgressButtonActionEvent) => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsLoading(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  return (
    <div id="buttons-container">
      <h6>Text Button</h6>
      <div>
        <oj-c-progress-button
          id="button1"
          onojAction={handleAction}
          isLoading={isLoading}
          label="Button Text 1"
        />
        <oj-c-progress-button
          id="button2"
          onojAction={handleAction}
          isLoading={isLoading}
          label="Button"
        />
      </div>
      <h6>Button with Icon</h6>
      <div>
        <oj-c-progress-button
          id="icon_button1"
          display="icons"
          label="Icon Button"
          onojAction={handleAction}
          isLoading={isLoading}
        >
          <span slot="startIcon" class="oj-ux-ico-information" />
        </oj-c-progress-button>
        <oj-c-progress-button
          id="icon_button2"
          label="Start Slot"
          onojAction={handleAction}
          isLoading={isLoading}
        >
          <span slot="startIcon" class="oj-ux-ico-avatar" />
        </oj-c-progress-button>
      </div>
      <h6>Disabled Button</h6>
      <div>
        <oj-c-progress-button disabled id="dis_button1" label="Disabled" />
        <oj-c-progress-button disabled display="icons" id="dis_button2" label="Disabled Icon">
          <span slot="startIcon" class="oj-ux-ico-delete-circle" />
        </oj-c-progress-button>
      </div>
      <h6>Chroming</h6>
      <div>
        <oj-c-progress-button
          id="chroming_button1"
          chroming="borderless"
          label="Borderless"
          onojAction={handleAction}
          isLoading={isLoading}
        />
        <oj-c-progress-button
          id="chroming_button2"
          chroming="outlined"
          label="Outlined"
          onojAction={handleAction}
          isLoading={isLoading}
        />
        <oj-c-progress-button
          id="chroming_button3"
          chroming="solid"
          label="Solid"
          onojAction={handleAction}
          isLoading={isLoading}
        />
        <oj-c-progress-button
          id="chroming_button4"
          chroming="callToAction"
          label="Call To Action"
          onojAction={handleAction}
          isLoading={isLoading}
        />
      </div>
      <h6>Sizes</h6>
      <div>
        <oj-c-progress-button
          id="size_button1"
          size="sm"
          label="Small"
          onojAction={handleAction}
          isLoading={isLoading}
        />
        <oj-c-progress-button
          id="size_button2"
          label="Default"
          onojAction={handleAction}
          isLoading={isLoading}
        />
        <oj-c-progress-button
          id="size_button3"
          size="md"
          label="Medium"
          onojAction={handleAction}
          isLoading={isLoading}
        />
        <oj-c-progress-button
          id="size_button4"
          size="lg"
          label="Large"
          onojAction={handleAction}
          isLoading={isLoading}
        />
      </div>
      <h6>Tooltip</h6>
      <div>
        <oj-c-progress-button
          id="tooltip_button1"
          label="Tooltip Button"
          tooltip="Tooltip"
          onojAction={handleAction}
          isLoading={isLoading}
        />
      </div>
      <h6>Button Width</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel">
        <p>This panel has a button with width="100%".</p>
        <oj-c-progress-button
          id="width_full_button"
          width="100%"
          chroming="callToAction"
          label="Call To Action"
          onojAction={handleAction}
          isLoading={isLoading}
        />
      </div>
      <div class="oj-panel oj-bg-neutral-30 oj-sm-padding-0 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a button with edge="bottom" which should be used for a button that
            stretches to the edge at the bottom.
          </p>
        </div>
        <oj-c-progress-button
          id="stretch_to_edge_button"
          edge="bottom"
          chroming="callToAction"
          label="Call to Action"
          onojAction={handleAction}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ProgressbuttonOverviewcorepack;
