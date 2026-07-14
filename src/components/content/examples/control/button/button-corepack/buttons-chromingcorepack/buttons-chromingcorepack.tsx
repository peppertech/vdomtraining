import "oj-c/button";
import "oj-c/buttonset-multiple";
import "oj-c/buttonset-single";
import "oj-c/menu-button";
import "oj-c/progress-button";
import "oj-c/radioset";
import "oj-c/split-menu-button";
import "oj-c/toggle-button";
import 'preact';
import type { ComponentChildren,ComponentProps } from "preact";
import { useState } from "preact/hooks";

type ControlState = "enabled" | "disabled";
type PushChroming = NonNullable<ComponentProps<"oj-c-button">["chroming"]>;
type ProgressChroming = NonNullable<ComponentProps<"oj-c-progress-button">["chroming"]>;
type MenuChroming = NonNullable<ComponentProps<"oj-c-menu-button">["chroming"]>;
type ToggleChroming = NonNullable<ComponentProps<"oj-c-toggle-button">["chroming"]>;
type ButtonsetSingleChroming = NonNullable<ComponentProps<"oj-c-buttonset-single">["chroming"]>;
type ButtonsetMultipleChroming = NonNullable<
  ComponentProps<"oj-c-buttonset-multiple">["chroming"]
>;
type RadiosetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
type MenuItems = NonNullable<ComponentProps<"oj-c-split-menu-button">["items"]>;
type ButtonsetSingleItems = NonNullable<ComponentProps<"oj-c-buttonset-single">["items"]>;

const controlStateItems: Array<{ value: ControlState; label: string }> = [
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled" }
];

const menuItems: MenuItems = [
  { key: "save", label: "Save", startIcon: { class: "oj-ux-ico-print" }, disabled: false },
  { key: "zoomin", label: "Zoom In", startIcon: { class: "oj-ux-ico-zoom-in" }, disabled: false },
  {
    key: "zoomout",
    label: "Zoom Out",
    startIcon: { class: "oj-ux-ico-zoom-out" },
    disabled: false
  },
  { key: "print", label: "Print...", startIcon: { class: "oj-ux-ico-print" }, disabled: true }
];

const buttonsetItems: ButtonsetSingleItems = [
  { value: "left", label: "Left", startIcon: { class: "oj-ux-ico-align-left" } },
  { value: "center", label: "Center", startIcon: { class: "oj-ux-ico-align-center" } },
  { value: "right", label: "Right", startIcon: { class: "oj-ux-ico-align-right" } }
];

const multipleValue = ["left", "center"];

const TableCell = ({ children }: { children: ComponentChildren }) => <td>{children}</td>;

const HeaderRow = () => (
  <tr>
    <td />
    <th scope="col">Text Only</th>
    <th scope="col">Text &amp; Icon</th>
    <th scope="col">Icon only</th>
  </tr>
);

const renderPushCells = (chroming: PushChroming, label: string, disabled: boolean) => [
  <TableCell key={`${chroming}-push-text`}>
    <oj-c-button chroming={chroming} id={`${chroming}PushText`} disabled={disabled} label={label} />
  </TableCell>,
  <TableCell key={`${chroming}-push-text-icon`}>
    <oj-c-button
      chroming={chroming}
      id={`${chroming}PushTextIcon`}
      disabled={disabled}
      label={label}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-button>
  </TableCell>,
  <TableCell key={`${chroming}-push-icon`}>
    <oj-c-button
      chroming={chroming}
      id={`${chroming}PushIcon`}
      display="icons"
      label={label}
      disabled={disabled}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-button>
  </TableCell>
];

const renderProgressCells = (chroming: ProgressChroming, label: string, disabled: boolean) => [
  <TableCell key={`${chroming}-progress-text`}>
    <oj-c-progress-button
      chroming={chroming}
      id={`${chroming}ProgressText`}
      isLoading
      disabled={disabled}
      label={label}
    />
  </TableCell>,
  <TableCell key={`${chroming}-progress-text-icon`}>
    <oj-c-progress-button
      chroming={chroming}
      id={`${chroming}ProgressTextIcon`}
      isLoading
      disabled={disabled}
      label={label}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-progress-button>
  </TableCell>,
  <TableCell key={`${chroming}-progress-icon`}>
    <oj-c-progress-button
      chroming={chroming}
      id={`${chroming}ProgressIcon`}
      isLoading
      display="icons"
      label={label}
      disabled={disabled}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-progress-button>
  </TableCell>
];

const renderMenuCells = (chroming: MenuChroming, label: string, disabled: boolean) => [
  <TableCell key={`${chroming}-menu-text`}>
    <oj-c-menu-button
      chroming={chroming}
      id={`${chroming}MenuText`}
      items={menuItems}
      disabled={disabled}
      label={label}
    />
  </TableCell>,
  <TableCell key={`${chroming}-menu-text-icon`}>
    <oj-c-menu-button
      chroming={chroming}
      id={`${chroming}MenuTextIcon`}
      items={menuItems}
      disabled={disabled}
      label={label}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-menu-button>
  </TableCell>,
  <TableCell key={`${chroming}-menu-icon`}>
    <oj-c-menu-button
      chroming={chroming}
      id={`${chroming}MenuWithStartIcon`}
      display="icons"
      items={menuItems}
      disabled={disabled}
      label={label}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-menu-button>
    <oj-c-menu-button
      chroming={chroming}
      id={`${chroming}MenuWithoutStartIcon`}
      display="icons"
      items={menuItems}
      disabled={disabled}
      label={label}
    />
  </TableCell>
];

const renderToggleCells = (
  chroming: ToggleChroming,
  label: string,
  disabled: boolean,
  value: boolean
) => [
  <TableCell key={`${chroming}-toggle-text-${String(value)}`}>
    <oj-c-toggle-button chroming={chroming} label={label} value={value} disabled={disabled} />
  </TableCell>,
  <TableCell key={`${chroming}-toggle-text-icon-${String(value)}`}>
    <oj-c-toggle-button chroming={chroming} label={label} value={value} disabled={disabled}>
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-toggle-button>
  </TableCell>,
  <TableCell key={`${chroming}-toggle-icon-${String(value)}`}>
    <oj-c-toggle-button
      chroming={chroming}
      label={label}
      value={value}
      display="icons"
      disabled={disabled}
    >
      <span slot="startIcon" class="oj-ux-ico-share" />
    </oj-c-toggle-button>
  </TableCell>
];

const renderButtonsetSingleCells = (
  chroming: ButtonsetSingleChroming,
  disabled: boolean
) => [
  <TableCell key={`${chroming}-single-text`}>
    <oj-c-buttonset-single
      chroming={chroming}
      items={buttonsetItems}
      display="label"
      layoutWidth="auto"
      value="left"
      disabled={disabled}
      aria-label="Choose only one format."
    />
  </TableCell>,
  <TableCell key={`${chroming}-single-all`}>
    <oj-c-buttonset-single
      chroming={chroming}
      items={buttonsetItems}
      layoutWidth="auto"
      value="left"
      disabled={disabled}
      aria-label="Choose only one format."
    />
  </TableCell>,
  <TableCell key={`${chroming}-single-icons`}>
    <oj-c-buttonset-single
      chroming={chroming}
      items={buttonsetItems}
      layoutWidth="auto"
      value="left"
      display="icons"
      disabled={disabled}
      aria-label="Choose only one format."
    />
  </TableCell>
];

const renderButtonsetMultipleCells = (
  chroming: ButtonsetMultipleChroming,
  disabled: boolean
) => [
  <TableCell key={`${chroming}-multiple-text`}>
    <oj-c-buttonset-multiple
      chroming={chroming}
      items={buttonsetItems}
      display="label"
      layoutWidth="auto"
      value={multipleValue}
      disabled={disabled}
      aria-label="Choose one or more format options."
    />
  </TableCell>,
  <TableCell key={`${chroming}-multiple-all`}>
    <oj-c-buttonset-multiple
      chroming={chroming}
      items={buttonsetItems}
      layoutWidth="auto"
      value={multipleValue}
      disabled={disabled}
      aria-label="Choose one or more format options."
    />
  </TableCell>,
  <TableCell key={`${chroming}-multiple-icons`}>
    <oj-c-buttonset-multiple
      chroming={chroming}
      items={buttonsetItems}
      layoutWidth="auto"
      value={multipleValue}
      display="icons"
      disabled={disabled}
      aria-label="Choose one or more format options."
    />
  </TableCell>
];

const ChromingSection = ({
  title,
  description,
  tableLabel,
  children,
  titleClass
}: {
  title: string;
  description: ComponentChildren;
  tableLabel: string;
  children: ComponentChildren;
  titleClass: string;
}) => (
  <section>
    <h3 class={titleClass}>{title}</h3>
    {description}
    <table class="demo-recipe-table oj-sm-margin-4x-bottom oj-sm-width-full" aria-label={tableLabel}>
      <tbody>
        <HeaderRow />
        {children}
      </tbody>
    </table>
  </section>
);

export const ButtonsChromingcorepack = () => {
  const [controlState, setControlState] = useState<ControlState>("enabled");

  const handleStateChanged = (event: RadiosetValueChangedEvent) => {
    setControlState((event.detail.value as ControlState | null) ?? "enabled");
  };

  const disabled = controlState === "disabled";

  return (
    <div id="button-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          labelHint="State"
          direction="row"
          value={controlState}
          aria-controls="buttonchroming"
          options={controlStateItems}
          onvalueChanged={handleStateChanged}
        />
      </div>

      <ChromingSection
        title="Ghost Chroming"
        titleClass="oj-sm-margin-4x-top"
        description={
          <p>Ghost chroming is not supported on Split Menu Buttons, Toggle Buttons, or Buttonsets.</p>
        }
        tableLabel="ghost buttons"
      >
        <tr>
          <th scope="row">Push button</th>
          {renderPushCells("ghost", "Ghost Button", disabled)}
        </tr>
      </ChromingSection>

      <ChromingSection
        title="Borderless Chroming"
        titleClass="oj-sm-margin-4x-top"
        description={<p>Borderless chroming not supported on Split Menu Buttons.</p>}
        tableLabel="borderless buttons"
      >
        <tr>
          <th scope="row">Push button</th>
          {renderPushCells("borderless", "Borderless Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Progress button</th>
          {renderProgressCells("borderless", "Borderless Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Menu button</th>
          {renderMenuCells("borderless", "Borderless Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Toggle button On</th>
          {renderToggleCells("borderless", "Borderless Button", disabled, true)}
        </tr>
        <tr>
          <th scope="row">Toggle button Off</th>
          {renderToggleCells("borderless", "Borderless Button", disabled, false)}
        </tr>
        <tr>
          <th scope="row">Buttonset Single</th>
          {renderButtonsetSingleCells("borderless", disabled)}
        </tr>
        <tr>
          <th scope="row">Buttonset Multiple</th>
          {renderButtonsetMultipleCells("borderless", disabled)}
        </tr>
      </ChromingSection>

      <ChromingSection
        title="Outlined Chroming"
        titleClass="oj-sm-margin-8x-top"
        description={<p />}
        tableLabel="outlined buttons"
      >
        <tr>
          <th scope="row">Push button</th>
          {renderPushCells("outlined", "Outlined Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Progress button</th>
          {renderProgressCells("outlined", "Outlined Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Menu button</th>
          {renderMenuCells("outlined", "Outlined Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Toggle button On</th>
          {renderToggleCells("outlined", "Outlined Button", disabled, true)}
        </tr>
        <tr>
          <th scope="row">Toggle button Off</th>
          {renderToggleCells("outlined", "Outlined Button", disabled, false)}
        </tr>
        <tr>
          <th scope="row">Buttonset Single</th>
          {renderButtonsetSingleCells("outlined", disabled)}
        </tr>
        <tr>
          <th scope="row">Buttonset Multiple</th>
          {renderButtonsetMultipleCells("outlined", disabled)}
        </tr>
        <tr>
          <th scope="row">Split Menu button</th>
          <TableCell>
            <oj-c-split-menu-button
              chroming="outlined"
              id="outlinedSplitMenuText"
              items={menuItems}
              disabled={disabled}
              label="Outlined Button"
            />
          </TableCell>
          <TableCell>N/A</TableCell>
          <TableCell>N/A</TableCell>
        </tr>
      </ChromingSection>

      <ChromingSection
        title="Solid Chroming"
        titleClass="oj-sm-margin-8x-top"
        description={<p>Solid chroming not supported for Toggle Buttons or Buttonsets.</p>}
        tableLabel="solid buttons"
      >
        <tr>
          <th scope="row">Push button</th>
          {renderPushCells("solid", "Solid Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Progress button</th>
          {renderProgressCells("solid", "Solid Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Menu button</th>
          {renderMenuCells("solid", "Solid Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Split Menu button</th>
          <TableCell>
            <oj-c-split-menu-button
              chroming="solid"
              id="solidSplitMenuText"
              items={menuItems}
              disabled={disabled}
              label="Solid Button"
            />
          </TableCell>
          <TableCell>N/A</TableCell>
          <TableCell>N/A</TableCell>
        </tr>
      </ChromingSection>

      <ChromingSection
        title="Call To Action Chroming"
        titleClass="oj-sm-margin-8x-top"
        description={
          <p>Call to Action chroming not supported on Menu Buttons, Toggle Buttons, or Buttonsets.</p>
        }
        tableLabel="call to action buttons"
      >
        <tr>
          <th scope="row">Push button</th>
          {renderPushCells("callToAction", "Call To Action Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Progress button</th>
          {renderProgressCells("callToAction", "Call To Action Button", disabled)}
        </tr>
        <tr>
          <th scope="row">Split Menu button</th>
          <TableCell>
            <oj-c-split-menu-button
              chroming="callToAction"
              id="calltoactionSplitMenuText"
              items={menuItems}
              disabled={disabled}
              label="Call To Action Button"
            />
          </TableCell>
          <TableCell>N/A</TableCell>
          <TableCell>N/A</TableCell>
        </tr>
      </ChromingSection>

      <ChromingSection
        title="Danger Chroming"
        titleClass="oj-sm-margin-8x-top"
        description={
          <p>
            Danger chroming not supported for Buttons, Menu Buttons, Split Menu Buttons, Toggle
            Buttons, or Buttonsets.
          </p>
        }
        tableLabel="danger buttons"
      >
        <tr>
          <th scope="row">Push button</th>
          {renderPushCells("danger", "Danger Button", disabled)}
        </tr>
      </ChromingSection>
    </div>
  );
};

export default ButtonsChromingcorepack;
