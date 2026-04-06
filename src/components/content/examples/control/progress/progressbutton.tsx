import { h, ComponentProps, JSX } from "preact";
import { useCallback, useMemo, useState } from "preact/hooks";
import "oj-c/progress-button";

type ProgressButtonProps = ComponentProps<"oj-c-progress-button">;
type ProgressButtonActionEvent = Parameters<NonNullable<ProgressButtonProps["onojAction"]>>[0];

type AsyncButton = {
  id: string;
  label: string;
  chroming: ProgressButtonProps["chroming"];
  icon?: string;
};

const asyncButtons: AsyncButton[] = [
  { id: "progressButtonSave", label: "Save Draft", chroming: "callToAction" },
  {
    id: "progressButtonSync",
    label: "Sync",
    chroming: "solid",
    icon: "oj-ux-ico-sync",
  },
];

const ProgressButton = () => {
  const [loadingButtons, setLoadingButtons] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState("Select an action to view progress.");
  const rowStyle: JSX.CSSProperties = { gap: "5px" };

  const handleAction = useCallback((buttonId: string, label: string) => {
    setLoadingButtons((previous) => ({ ...previous, [buttonId]: true }));
    setMessage(`${label} started...`);
    window.setTimeout(() => {
      setLoadingButtons((previous) => ({ ...previous, [buttonId]: false }));
      setMessage(`${label} completed successfully.`);
    }, 2200);
  }, []);

  const handleAsyncAction = useCallback(
    (buttonId: string, label: string) => (_event: ProgressButtonActionEvent) => {
      if (!loadingButtons[buttonId]) {
        handleAction(buttonId, label);
      }
    },
    [handleAction, loadingButtons],
  );

  const chromingVariants = useMemo(
    () => [
      { id: "progressButtonBorderless", label: "Borderless", chroming: "borderless" as ProgressButtonProps["chroming"] },
      { id: "progressButtonOutlined", label: "Outlined", chroming: "outlined" as ProgressButtonProps["chroming"] },
      { id: "progressButtonSolid", label: "Solid", chroming: "solid" as ProgressButtonProps["chroming"] },
    ],
    [],
  );

  const sizeVariants = useMemo(
    () => [
      { id: "progressButtonSmall", label: "Small", size: "sm" as ProgressButtonProps["size"] },
      { id: "progressButtonMedium", label: "Default", size: "md" as ProgressButtonProps["size"] },
      { id: "progressButtonLarge", label: "Large", size: "lg" as ProgressButtonProps["size"] },
    ],
    [],
  );

  return (
    <div id="progressbutton-container" class="oj-sm-margin-2x-bottom">
      <h6>Async Buttons</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={rowStyle}>
        {asyncButtons.map((button) => (
          <oj-c-progress-button
            key={button.id}
            id={button.id}
            label={button.label}
            chroming={button.chroming}
            isLoading={Boolean(loadingButtons[button.id])}
            onojAction={handleAsyncAction(button.id, button.label)}
          >
            {button.icon ? <span slot="startIcon" class={button.icon}></span> : null}
          </oj-c-progress-button>
        ))}
      </div>
      <p class="oj-typography-body-sm oj-text-color-secondary oj-sm-margin-2x-top" aria-live="polite">
        {message}
      </p>

      <h6 class="oj-sm-margin-6x-top">Chroming Variants</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={rowStyle}>
        {chromingVariants.map((variant) => (
          <oj-c-progress-button
            key={variant.id}
            id={variant.id}
            label={variant.label}
            chroming={variant.chroming}
          ></oj-c-progress-button>
        ))}
      </div>

      <h6 class="oj-sm-margin-6x-top">Sizes</h6>
      <div class="oj-sm-flex oj-sm-row-gap-2x oj-sm-column-gap-2x" style={rowStyle}>
        {sizeVariants.map((variant) => (
          <oj-c-progress-button
            key={variant.id}
            id={variant.id}
            label={variant.label}
            size={variant.size}
          ></oj-c-progress-button>
        ))}
      </div>

      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-margin-6x-top">
        <div class="oj-sm-padding-2x">
          <p class="oj-typography-body-sm">
            Use <code>edge=&quot;bottom&quot;</code> to stretch the progress button across the container.
          </p>
          <oj-c-progress-button
            id="progressButtonFullWidth"
            label="Publish"
            chroming="callToAction"
            edge="bottom"
          ></oj-c-progress-button>
        </div>
      </div>
    </div>
  );
};

export default ProgressButton;
