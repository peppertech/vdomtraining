import { h } from "preact";
import type { ComponentChildren, ComponentProps } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import * as ThemeUtils from "ojs/ojthemeutils";
import "oj-c/radioset";
import "oj-c/button";
import "oj-c/menu-button";
import "oj-c/split-menu-button";
import "oj-c/buttonset-single";
import "oj-c/buttonset-multiple";
import "oj-c/toggle-button";
import "oj-c/progress-button";

type ControlState = "enabled" | "disabled";
type ChromingValue = "ghost" | "borderless" | "outlined" | "solid" | "callToAction" | "danger";
type MenuItems = NonNullable<ComponentProps<"oj-c-split-menu-button">["items"]>;
type ButtonsetItems = NonNullable<ComponentProps<"oj-c-buttonset-single">["items"]>;
type ControlSize = "sm" | "lg" | undefined;
type ProgressChroming = NonNullable<ComponentProps<"oj-c-progress-button">["chroming"]>;
type MenuChroming = NonNullable<ComponentProps<"oj-c-menu-button">["chroming"]>;
type SplitMenuChroming = NonNullable<ComponentProps<"oj-c-split-menu-button">["chroming"]>;
type ToggleChroming = NonNullable<ComponentProps<"oj-c-toggle-button">["chroming"]>;
type ButtonsetSingleChroming = NonNullable<ComponentProps<"oj-c-buttonset-single">["chroming"]>;
type ButtonsetMultipleChroming = NonNullable<
  ComponentProps<"oj-c-buttonset-multiple">["chroming"]
>;
type RadiosetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-radioset">["onvalueChanged"]>
>[0];
type ProgressButtonActionEvent = Parameters<
  NonNullable<ComponentProps<"oj-c-progress-button">["onojAction"]>
>[0];

const chromingOptions: Array<{ value: ChromingValue; label: string }> = [
  { value: "ghost", label: "Ghost" },
  { value: "borderless", label: "Borderless" },
  { value: "outlined", label: "Outlined" },
  { value: "solid", label: "Solid" },
  { value: "callToAction", label: "CallToAction" },
  { value: "danger", label: "Danger" }
];

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

const buttonsetItems: ButtonsetItems = [
  { value: "left", label: "Left", startIcon: { class: "oj-ux-ico-align-left" } },
  { value: "center", label: "Center", startIcon: { class: "oj-ux-ico-align-center" } },
  { value: "right", label: "Right", startIcon: { class: "oj-ux-ico-align-right" } }
];

const sizeColumns: Array<{ key: "sm" | "md" | "lg"; label: ComponentChildren; size: ControlSize }> = [
  { key: "sm", label: <code class="demo-selectornames">Small</code>, size: "sm" },
  { key: "md", label: "Medium (Default)", size: undefined },
  { key: "lg", label: <code class="demo-selectornames">Large</code>, size: "lg" }
];

const multipleValue = ["left"];

const isProgressChroming = (value: ChromingValue): value is ProgressChroming =>
  value === "borderless" || value === "outlined" || value === "solid" || value === "callToAction";

const isMenuChroming = (value: ChromingValue): value is MenuChroming =>
  value === "ghost" || value === "borderless" || value === "outlined" || value === "solid";

const isSplitMenuChroming = (value: ChromingValue): value is SplitMenuChroming =>
  value === "outlined" || value === "solid" || value === "callToAction";

const isToggleChroming = (value: ChromingValue): value is ToggleChroming =>
  value === "borderless" || value === "outlined";

const isButtonsetSingleChroming = (value: ChromingValue): value is ButtonsetSingleChroming =>
  value === "borderless" || value === "outlined";

const isButtonsetMultipleChroming = (value: ChromingValue): value is ButtonsetMultipleChroming =>
  value === "borderless" || value === "outlined";

const HeaderRow = () => (
  <tr>
    <td />
    {sizeColumns.map((column) => (
      <th key={column.key} scope="col">
        {column.label}
      </th>
    ))}
  </tr>
);

const TableCell = ({ children }: { children: ComponentChildren }) => <td>{children}</td>;

const renderPushButton = (
  chroming: ChromingValue,
  label: string,
  disabled: boolean,
  size: ControlSize,
  variant: "iconOnly" | "text" | "textAndIcon"
) => (
  <oj-c-button
    chroming={chroming}
    size={size}
    display={variant === "iconOnly" ? "icons" : undefined}
    label={label}
    disabled={disabled}
  >
    {variant !== "text" ? <span slot="startIcon" class="oj-ux-ico-share" /> : null}
  </oj-c-button>
);

const renderProgressButton = (
  chroming: ProgressChroming,
  label: string,
  disabled: boolean,
  size: ControlSize,
  isLoading: boolean,
  onAction: (event: ProgressButtonActionEvent) => void,
  variant: "iconOnly" | "text" | "textAndIcon"
) => (
  <oj-c-progress-button
    chroming={chroming}
    size={size}
    display={variant === "iconOnly" ? "icons" : undefined}
    label={label}
    disabled={disabled}
    isLoading={isLoading}
    onojAction={onAction}
  >
    {variant !== "text" ? <span slot="startIcon" class="oj-ux-ico-share" /> : null}
  </oj-c-progress-button>
);

const renderToggleButton = (
  chroming: ToggleChroming,
  label: string,
  disabled: boolean,
  size: ControlSize,
  variant: "iconOnly" | "text" | "textAndIcon"
) => (
  <oj-c-toggle-button
    chroming={chroming}
    size={size}
    value={false}
    display={variant === "iconOnly" ? "icons" : undefined}
    label={label}
    disabled={disabled}
  >
    {variant !== "text" ? <span slot="startIcon" class="oj-ux-ico-share" /> : null}
  </oj-c-toggle-button>
);

const renderMenuButton = (
  chroming: MenuChroming,
  label: string,
  disabled: boolean,
  size: ControlSize,
  variant: "iconOnly" | "icon" | "text" | "textAndIcon"
) => (
  <oj-c-menu-button
    chroming={chroming}
    size={size}
    items={menuItems}
    label={label}
    display={variant === "iconOnly" || variant === "icon" ? "icons" : undefined}
    disabled={disabled}
  >
    {variant === "icon" || variant === "textAndIcon" ? (
      <span slot="startIcon" class="oj-ux-ico-share" />
    ) : null}
  </oj-c-menu-button>
);

const renderSplitMenuButton = (
  chroming: SplitMenuChroming,
  label: string,
  disabled: boolean,
  size: ControlSize
) => (
  <oj-c-split-menu-button
    chroming={chroming}
    size={size}
    items={menuItems}
    label={label}
    disabled={disabled}
  />
);

const renderButtonsetMultiple = (
  chroming: ButtonsetMultipleChroming,
  disabled: boolean,
  size: ControlSize,
  variant: "iconOnly" | "text" | "textAndIcon"
) => (
  <oj-c-buttonset-multiple
    chroming={chroming}
    layoutWidth="auto"
    size={size}
    items={buttonsetItems}
    value={multipleValue}
    disabled={disabled}
    display={variant === "iconOnly" ? "icons" : variant === "text" ? "label" : undefined}
    aria-label="Choose one or more format options."
  />
);

const renderButtonsetSingle = (
  chroming: ButtonsetSingleChroming,
  disabled: boolean,
  size: ControlSize,
  variant: "iconOnly" | "text" | "textAndIcon"
) => (
  <oj-c-buttonset-single
    chroming={chroming}
    layoutWidth="auto"
    size={size}
    items={buttonsetItems}
    value="left"
    disabled={disabled}
    display={variant === "iconOnly" ? "icons" : variant === "text" ? undefined : undefined}
    aria-label="Choose only one format."
  />
);

const renderButtonsetSingleText = (
  chroming: ButtonsetSingleChroming,
  disabled: boolean,
  size: ControlSize
) => (
  <oj-c-buttonset-single
    chroming={chroming}
    layoutWidth="auto"
    size={size}
    items={buttonsetItems}
    value="left"
    disabled={disabled}
    aria-label="Choose only one format."
  />
);

const renderButtonsetMultipleText = (
  chroming: ButtonsetMultipleChroming,
  disabled: boolean,
  size: ControlSize
) => (
  <oj-c-buttonset-multiple
    chroming={chroming}
    layoutWidth="auto"
    size={size}
    display="label"
    items={buttonsetItems}
    value={multipleValue}
    disabled={disabled}
    aria-label="Choose one or more format options."
  />
);

const renderCells = (renderer: (size: ControlSize) => ComponentChildren) =>
  sizeColumns.map((column) => <TableCell key={column.key}>{renderer(column.size)}</TableCell>);

export const ButtonsSizescorepack = () => {
  const [controlState, setControlState] = useState<ControlState>("enabled");
  const [currentChromingValue, setCurrentChromingValue] = useState<ChromingValue>("borderless");
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChromingChanged = (event: RadiosetValueChangedEvent) => {
    setCurrentChromingValue((event.detail.value as ChromingValue | null) ?? "borderless");
  };

  const handleStateChanged = (event: RadiosetValueChangedEvent) => {
    setControlState((event.detail.value as ControlState | null) ?? "enabled");
  };

  const handleProgressAction = (_event: ProgressButtonActionEvent) => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsLoading(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  const chromingLabel =
    chromingOptions.find((option) => option.value === currentChromingValue)?.label ?? "Borderless";
  const currentLabel = `${chromingLabel} Button`;
  const disabled = controlState === "disabled";
  const themeName = ThemeUtils.getThemeName() ?? "";
  const isRedwood = themeName === "redwood";

  const supportsProgress = isProgressChroming(currentChromingValue);
  const supportsMenu = isMenuChroming(currentChromingValue) && (!isRedwood || currentChromingValue !== "ghost");
  const supportsSplitMenu = isSplitMenuChroming(currentChromingValue);
  const supportsToggle = isToggleChroming(currentChromingValue);
  const supportsButtonsetSingle = isButtonsetSingleChroming(currentChromingValue);
  const supportsButtonsetMultiple = isButtonsetMultipleChroming(currentChromingValue);

  return (
    <div id="button-container">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-c-radioset
          direction="row"
          value={currentChromingValue}
          labelHint="Chroming"
          aria-controls="buttonsizes"
          options={chromingOptions}
          onvalueChanged={handleChromingChanged}
        />
        <oj-c-radioset
          labelHint="State"
          direction="row"
          value={controlState}
          aria-controls="buttonsizes"
          options={controlStateItems}
          onvalueChanged={handleStateChanged}
        />
      </div>

      <h6>Sizes</h6>
      <table id="buttonsizes" class="demo-recipe-table demo-recipe-spacing" aria-label="alternate size buttons">
        <tbody>
          <HeaderRow />

          <tr>
            <th scope="row">Push button: Icon only</th>
            {renderCells((size) =>
              renderPushButton(currentChromingValue, currentLabel, disabled, size, "iconOnly")
            )}
          </tr>
          <tr>
            <th scope="row">Push button: Text</th>
            {renderCells((size) =>
              renderPushButton(currentChromingValue, currentLabel, disabled, size, "text")
            )}
          </tr>
          <tr>
            <th scope="row">Push button: Text and Icon</th>
            {renderCells((size) =>
              renderPushButton(currentChromingValue, currentLabel, disabled, size, "textAndIcon")
            )}
          </tr>

          <tr>
            <th scope="row">Progress Button: Icon only</th>
            {sizeColumns.map((column) => (
              <TableCell key={`progress-iconOnly-${column.key}`}>
                {supportsProgress
                  ? renderProgressButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      isLoading,
                      handleProgressAction,
                      "iconOnly"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Progress Button: Text</th>
            {sizeColumns.map((column) => (
              <TableCell key={`progress-text-${column.key}`}>
                {supportsProgress
                  ? renderProgressButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      isLoading,
                      handleProgressAction,
                      "text"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Progress Button: Text and Icon</th>
            {sizeColumns.map((column) => (
              <TableCell key={`progress-textAndIcon-${column.key}`}>
                {supportsProgress
                  ? renderProgressButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      isLoading,
                      handleProgressAction,
                      "textAndIcon"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>

          <tr>
            <th scope="row">Toggle button: Icon only</th>
            {sizeColumns.map((column) => (
              <TableCell key={`toggle-iconOnly-${column.key}`}>
                {supportsToggle
                  ? renderToggleButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      "iconOnly"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Toggle button: Text</th>
            {sizeColumns.map((column) => (
              <TableCell key={`toggle-text-${column.key}`}>
                {supportsToggle
                  ? renderToggleButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      "text"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Toggle button: Text and Icon</th>
            {sizeColumns.map((column) => (
              <TableCell key={`toggle-textAndIcon-${column.key}`}>
                {supportsToggle
                  ? renderToggleButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      "textAndIcon"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>

          <tr>
            <th scope="row">Menu button: Icon only</th>
            {sizeColumns.map((column) => (
              <TableCell key={`menu-iconOnly-${column.key}`}>
                {supportsMenu
                  ? renderMenuButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      "iconOnly"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Menu button: Icon</th>
            {sizeColumns.map((column) => (
              <TableCell key={`menu-icon-${column.key}`}>
                {supportsMenu
                  ? renderMenuButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      "icon"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Menu button: Text</th>
            {sizeColumns.map((column) => (
              <TableCell key={`menu-text-${column.key}`}>
                {supportsMenu
                  ? renderMenuButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      "text"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Menu button: Text and Icon</th>
            {sizeColumns.map((column) => (
              <TableCell key={`menu-textAndIcon-${column.key}`}>
                {supportsMenu
                  ? renderMenuButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size,
                      "textAndIcon"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>

          <tr>
            <th scope="row">Split Menu button: Text</th>
            {sizeColumns.map((column) => (
              <TableCell key={`splitMenu-${column.key}`}>
                {supportsSplitMenu
                  ? renderSplitMenuButton(
                      currentChromingValue,
                      currentLabel,
                      disabled,
                      column.size
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>

          <tr>
            <th scope="row">Buttonset Multiple: Icon only</th>
            {sizeColumns.map((column) => (
              <TableCell key={`buttonsetMultiple-iconOnly-${column.key}`}>
                {supportsButtonsetMultiple
                  ? renderButtonsetMultiple(
                      currentChromingValue,
                      disabled,
                      column.size,
                      "iconOnly"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Buttonset Multiple: Text</th>
            {sizeColumns.map((column) => (
              <TableCell key={`buttonsetMultiple-text-${column.key}`}>
                {supportsButtonsetMultiple
                  ? renderButtonsetMultipleText(currentChromingValue, disabled, column.size)
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Buttonset Multiple: Text and Icon</th>
            {sizeColumns.map((column) => (
              <TableCell key={`buttonsetMultiple-textAndIcon-${column.key}`}>
                {supportsButtonsetMultiple
                  ? renderButtonsetMultiple(
                      currentChromingValue,
                      disabled,
                      column.size,
                      "textAndIcon"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>

          <tr>
            <th scope="row">Buttonset Single: Icon only</th>
            {sizeColumns.map((column) => (
              <TableCell key={`buttonsetSingle-iconOnly-${column.key}`}>
                {supportsButtonsetSingle
                  ? renderButtonsetSingle(
                      currentChromingValue,
                      disabled,
                      column.size,
                      "iconOnly"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Buttonset Single: Text</th>
            {sizeColumns.map((column) => (
              <TableCell key={`buttonsetSingle-text-${column.key}`}>
                {supportsButtonsetSingle
                  ? renderButtonsetSingleText(currentChromingValue, disabled, column.size)
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
          <tr>
            <th scope="row">Buttonset Single: Text and Icon</th>
            {sizeColumns.map((column) => (
              <TableCell key={`buttonsetSingle-textAndIcon-${column.key}`}>
                {supportsButtonsetSingle
                  ? renderButtonsetSingle(
                      currentChromingValue,
                      disabled,
                      column.size,
                      "textAndIcon"
                    )
                  : "N/A"}
              </TableCell>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ButtonsSizescorepack;
