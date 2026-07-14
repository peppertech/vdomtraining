import "oj-c/toggle-button";
import 'preact';
import { ComponentProps } from 'preact';
import { useCallback,useState } from "preact/hooks";

type ToggleButtonProps = ComponentProps<"oj-c-toggle-button">;
type ToggleButtonValueChangedEvent = Parameters<
  NonNullable<ToggleButtonProps["onvalueChanged"]>
>[0];

const buttonSectionClass = "oj-sm-padding-2x";

const CorePackToggleButton = () => {
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const [favorite, setFavorite] = useState(false);
  const [tracking, setTracking] = useState(true);

  const handleValueChange =
    (setter: (value: boolean) => void, fallback: boolean) =>
    (event: ToggleButtonValueChangedEvent) => {
      const value = event.detail.value;
      setter(typeof value === "boolean" ? value : fallback);
    };

  const handleFavoriteChange = useCallback(
    (event: ToggleButtonValueChangedEvent) => {
      setFavorite(Boolean(event.detail.value));
    },
    [],
  );

  const handleTrackingChange = useCallback(
    (event: ToggleButtonValueChangedEvent) => {
      setTracking(Boolean(event.detail.value));
    },
    [],
  );

  return (
    <div class="oj-web-applayout-max-width oj-web-applayout-content">
      <h6>Formatting Toggles</h6>
      <div class={buttonSectionClass}>
        <oj-c-toggle-button
          id="toggle-bold"
          label="Bold"
          value={bold}
          onvalueChanged={handleValueChange(setBold, true)}
        ></oj-c-toggle-button>
        <oj-c-toggle-button
          id="toggle-italic"
          label="Italic"
          class="oj-sm-margin-2x-start"
          value={italic}
          onvalueChanged={handleValueChange(setItalic, false)}
        ></oj-c-toggle-button>
        <oj-c-toggle-button
          id="toggle-notifications"
          label="Notifications"
          class="oj-sm-margin-2x-start"
          value={notifications}
          chroming="borderless"
          onvalueChanged={handleValueChange(setNotifications, true)}
        ></oj-c-toggle-button>
      </div>

      <h6 class="oj-sm-margin-4x-top">Icon Toggles</h6>
      <div class={buttonSectionClass}>
        <oj-c-toggle-button
          id="toggle-favorite"
          display="icons"
          chroming="outlined"
          tooltip={favorite ? "Remove favorite" : "Mark as favorite"}
          value={favorite}
          onvalueChanged={handleFavoriteChange}
        >
          <span slot="startIcon" class="oj-ux-ico-favorite"></span>
        </oj-c-toggle-button>
        <oj-c-toggle-button
          id="toggle-tracking"
          display="all"
          label={tracking ? "Tracking On" : "Tracking Off"}
          class="oj-sm-margin-2x-start"
          value={tracking}
          tooltip="Toggle shipment tracking"
          onvalueChanged={handleTrackingChange}
        >
          <span slot="startIcon" class="oj-ux-ico-bell"></span>
        </oj-c-toggle-button>
      </div>

      <h6 class="oj-sm-margin-4x-top">Disabled Toggle</h6>
      <div class={buttonSectionClass}>
        <oj-c-toggle-button
          id="toggle-disabled"
          label="Disabled Toggle"
          value={false}
          disabled
        ></oj-c-toggle-button>
      </div>
    </div>
  );
};

export default CorePackToggleButton;
