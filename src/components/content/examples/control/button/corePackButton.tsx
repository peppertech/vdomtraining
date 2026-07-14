import "oj-c/button";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useMemo,useState } from "preact/hooks";

type CButtonProps = ComponentProps<"oj-c-button">;
type CButtonActionEvent = Parameters<NonNullable<CButtonProps["onojAction"]>>[0];

const buttonSectionClass = "oj-sm-padding-2x";
const buttonSpacingClass = "oj-sm-margin-2x-start";

const CorePackButton = () => {
  const [clickCount, setClickCount] = useState(0);
  const [lastAction, setLastAction] = useState("No actions yet.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePrimaryAction = useCallback(
    (_event: CButtonActionEvent) => {
      setClickCount((value) => value + 1);
      setLastAction("Clicked Primary");
    },
    [],
  );

  const handleSecondaryAction = useCallback(
    (_event: CButtonActionEvent) => {
      setLastAction("Clicked Secondary");
    },
    [],
  );

  const handleAsyncSubmit = useCallback(
    (_event: CButtonActionEvent) => {
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);
      setLastAction("Submitting...");
      window.setTimeout(() => {
        setIsSubmitting(false);
        setLastAction("Submit completed");
      }, 1500);
    },
    [isSubmitting],
  );

  const chromingOptions = useMemo(
    () => [
      { id: "borderless", chroming: "borderless" as const, label: "Borderless" },
      { id: "outlined", chroming: "outlined" as const, label: "Outlined" },
      { id: "solid", chroming: "solid" as const, label: "Solid" },
      { id: "callToAction", chroming: "callToAction" as const, label: "Call To Action" },
      { id: "danger", chroming: "danger" as const, label: "Danger" },
    ],
    [],
  );

  const sizeOptions = useMemo(
    () => [
      { id: "sizeSm", size: "sm" as const, label: "Small" },
      { id: "sizeDefault", size: undefined, label: "Default" },
      { id: "sizeMd", size: "md" as const, label: "Medium" },
      { id: "sizeLg", size: "lg" as const, label: "Large" },
    ],
    [],
  );

  return (
    <div id="buttons-container" class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Interactive Text Buttons</h6>
      <div class={buttonSectionClass}>
        <oj-c-button
          id="cbutton-primary"
          chroming="callToAction"
          label="Primary Action"
          onojAction={handlePrimaryAction} 
        ></oj-c-button>
        <oj-c-button
          id="cbutton-secondary"
          chroming="outlined"
          label="Secondary"
          class={buttonSpacingClass}
          onojAction={handleSecondaryAction}
        ></oj-c-button>
        <oj-c-button
          id="cbutton-async"
          chroming="solid"
          label="Async Submit"
          // isLoading={isSubmitting}
          class={buttonSpacingClass}
          onojAction={handleAsyncSubmit}
        ></oj-c-button>
      </div>
      <div class="oj-typography-body-sm oj-text-color-secondary" aria-live="polite">
        {`Total clicks: ${clickCount}. Last action: ${lastAction}`}
      </div>

      <h6 class="oj-sm-margin-4x-top">Icon Buttons</h6>
      <div class={buttonSectionClass}>
        <oj-c-button
          id="cbutton-icon-only"
          display="icons"
          label="Favorite"
          chroming="borderless"
        >
          <span slot="startIcon" class="oj-ux-ico-favorite"></span>
        </oj-c-button>
        <oj-c-button
          id="cbutton-icon-label"
          display="all"
          label="Download"
          class={buttonSpacingClass}
        >
          <span slot="startIcon" class="oj-ux-ico-download"></span>
          Download
        </oj-c-button>
        <oj-c-button
          id="cbutton-icon-end"
          display="all"
          label="Share"
          class={buttonSpacingClass}
        >
          Share
          <span slot="endIcon" class="oj-ux-ico-share"></span>
        </oj-c-button>
      </div>

      <h6 class="oj-sm-margin-4x-top">Disabled Buttons</h6>
      <div class={buttonSectionClass}>
        <oj-c-button id="cbutton-disabled" label="Disabled" disabled></oj-c-button>
        <oj-c-button
          id="cbutton-disabled-icon"
          display="icons"
          label="Disabled Icon"
          disabled
          class={buttonSpacingClass}
        >
          <span slot="startIcon" class="oj-ux-ico-lock"></span>
        </oj-c-button>
      </div>

      <h6 class="oj-sm-margin-4x-top">Chroming Variants</h6>
      <div class={buttonSectionClass}>
        {chromingOptions.map((option, index) => (
          <oj-c-button
            key={option.id}
            id={`cbutton-chroming-${option.id}`}
            chroming={option.chroming}
            label={option.label}
            class={index === 0 ? undefined : buttonSpacingClass}
          ></oj-c-button>
        ))}
      </div>

      <h6 class="oj-sm-margin-4x-top">Sizes</h6>
      <div class={buttonSectionClass}>
        {sizeOptions.map((option, index) => (
          <oj-c-button
            key={option.id}
            id={`cbutton-size-${option.id}`}
            size={option.size}
            label={option.label}
            class={index === 0 ? undefined : buttonSpacingClass}
          ></oj-c-button>
        ))}
      </div>

      <h6 class="oj-sm-margin-4x-top">Full Width and Edge Alignment</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel">
        <div class={buttonSectionClass}>
          <p class="oj-typography-body-sm">
            Use <code>edge="bottom"</code> to stretch the button across the container.
          </p>
          <oj-c-button
            id="cbutton-edge-bottom"
            edge="bottom"
            chroming="callToAction"
            label="Full Width Action"
          ></oj-c-button>
        </div>
      </div>

      <h6 class="oj-sm-margin-4x-top">Buttons with Tooltips</h6>
      <div class={buttonSectionClass}>
        <oj-c-button
          id="cbutton-tooltip"
          chroming="outlined"
          label="Hover for Info"
          tooltip="Tooltips surface extra context on hover or focus."
        ></oj-c-button>
        <oj-c-button
          id="cbutton-tooltip-icon"
          display="icons"
          label="Info"
          tooltip="Icon-only button with tooltip."
          class={buttonSpacingClass}
        >
          <span slot="startIcon" class="oj-ux-ico-information"></span>
        </oj-c-button>
      </div>

      <h6 class="oj-sm-margin-4x-top">Labelled Button Group</h6>
      <oj-label-value label-edge="top">
        <oj-label slot="label" id="primary-actions-label">
          Primary Actions
        </oj-label>
        <div slot="value" class={buttonSectionClass}>
          <oj-c-button
            id="cbutton-labelled-primary"
            chroming="callToAction"
            label="Approve"
            aria-labelledby="primary-actions-label"
          ></oj-c-button>
          <oj-c-button
            id="cbutton-labelled-secondary"
            chroming="outlined"
            label="Reject"
            class={buttonSpacingClass}
            aria-labelledby="primary-actions-label"
          ></oj-c-button>
        </div>
      </oj-label-value>
    </div>
  );
};

export default CorePackButton;
