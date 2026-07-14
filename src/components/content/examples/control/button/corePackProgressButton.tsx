import "oj-c/progress-button";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useState } from "preact/hooks";

type ProgressButtonProps = ComponentProps<"oj-c-progress-button">;
type ProgressButtonActionEvent = Parameters<NonNullable<ProgressButtonProps["onojAction"]>>[0];

const buttonSectionClass = "oj-sm-padding-2x";

const CorePackProgressButton = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [message, setMessage] = useState("No progress actions yet.");

  const simulateAction = useCallback((label: string, setter: (value: boolean) => void) => {
    setter(true);
    setMessage(`${label} started...`);
    window.setTimeout(() => {
      setter(false);
      setMessage(`${label} completed.`);
    }, 2000);
  }, []);

  const handleSave = useCallback(
    (_event: ProgressButtonActionEvent) => {
      if (!isSaving) {
        simulateAction("Save", setIsSaving);
      }
    },
    [isSaving, simulateAction],
  );

  const handleSync = useCallback(
    (_event: ProgressButtonActionEvent) => {
      if (!isSyncing) {
        simulateAction("Sync", setIsSyncing);
      }
    },
    [isSyncing, simulateAction],
  );

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Async Buttons</h6>
      <div class={buttonSectionClass}>
        <oj-c-progress-button
          id="progress-button-save"
          label="Save"
          chroming="callToAction"
          isLoading={isSaving}
          onojAction={handleSave}
        ></oj-c-progress-button>
        <oj-c-progress-button
          id="progress-button-sync"
          label="Sync"
          chroming="solid"
          display="icons"
          isLoading={isSyncing}
          tooltip="Synchronize data"
          class="oj-sm-margin-2x-start"
          onojAction={handleSync}
        >
          <span slot="startIcon" class="oj-ux-ico-sync"></span>
        </oj-c-progress-button>
      </div>
      <p class="oj-typography-body-sm oj-text-color-secondary" aria-live="polite">
        {message}
      </p>

      <h6 class="oj-sm-margin-4x-top">Chroming Variants</h6>
      <div class={buttonSectionClass}>
        <oj-c-progress-button
          id="progress-button-borderless"
          label="Borderless"
          chroming="borderless"
        ></oj-c-progress-button>
        <oj-c-progress-button
          id="progress-button-outlined"
          label="Outlined"
          chroming="outlined"
          class="oj-sm-margin-2x-start"
        ></oj-c-progress-button>
        <oj-c-progress-button
          id="progress-button-solid"
          label="Solid"
          chroming="solid"
          class="oj-sm-margin-2x-start"
        ></oj-c-progress-button>
      </div>

      <h6 class="oj-sm-margin-4x-top">Sizes & Edge</h6>
      <div class={buttonSectionClass}>
        <oj-c-progress-button id="progress-button-sm" label="Small" size="sm"></oj-c-progress-button>
        <oj-c-progress-button
          id="progress-button-md"
          label="Default"
          size="md"
          class="oj-sm-margin-2x-start"
        ></oj-c-progress-button>
        <oj-c-progress-button
          id="progress-button-lg"
          label="Large"
          size="lg"
          class="oj-sm-margin-2x-start"
        ></oj-c-progress-button>
      </div>

      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-margin-4x-top">
        <div class={buttonSectionClass}>
          <p class="oj-typography-body-sm">
            Use <code>edge=&quot;bottom&quot;</code> to stretch the progress button across the container.
          </p>
          <oj-c-progress-button
            id="progress-button-full-width"
            label="Full Width Publish"
            edge="bottom"
            chroming="callToAction"
          ></oj-c-progress-button>
        </div>
      </div>
    </div>
  );
};

export default CorePackProgressButton;
