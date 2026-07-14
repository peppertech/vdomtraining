import "css!./demo.css";
import "oj-c/buttonset-multiple";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import 'preact';
import type { ComponentProps } from "preact";
import { useEffect,useMemo,useState } from "preact/hooks";

type ToggleItems = NonNullable<ComponentProps<"oj-c-buttonset-multiple">["items"]>;

type ItemInfo = {
  value: string;
  short?: string;
  regular: string;
  extra?: string;
  icons: { class: string };
};

const formatItems: ToggleItems = [
  { label: "Bold", value: "bold", startIcon: { class: "oj-ux-ico-bold" } },
  { label: "Italics", value: "italics", startIcon: { class: "oj-ux-ico-italics" } },
  { label: "Underline", value: "underline", startIcon: { class: "oj-ux-ico-underline" } }
];

const responsiveItemValues: ItemInfo[] = [
  { value: "home", regular: "Home", icons: { class: "oj-ux-ico-home" } },
  {
    value: "guide",
    short: "Guide",
    regular: "Quick Reference Guide",
    icons: { class: "oj-ux-ico-education" }
  },
  { value: "lib", short: "Lib", regular: "Library", icons: { class: "oj-ux-ico-library" } },
  {
    value: "styles",
    short: "Styles",
    regular: "Style Lab",
    icons: { class: "oj-ux-ico-color-palette" }
  },
  {
    value: "faq",
    regular: "FAQ",
    extra: "Frequently Asked Questions",
    icons: { class: "oj-ux-ico-chat" }
  }
];

const drinkOptions: ToggleItems = [
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "milk", label: "Milk" }
];

const getViewportWidth = () => (typeof window === "undefined" ? 1280 : innerWidth);

const getScreenRange = (width: number) => {
  if (width < 768) {
    return "sm";
  }
  if (width < 1024) {
    return "md";
  }
  if (width < 1440) {
    return "lg";
  }
  return "xl";
};

const getResponsiveLabels = (screenRange: string): ToggleItems => {
  switch (screenRange) {
    case "xl":
      return responsiveItemValues.map((toggle) => ({
        value: toggle.value,
        label: toggle.extra ?? toggle.regular,
        startIcon: toggle.icons
      }));
    case "md":
      return responsiveItemValues.map((toggle) => ({
        value: toggle.value,
        label: toggle.short ?? toggle.regular,
        startIcon: toggle.icons
      }));
    default:
      return responsiveItemValues.map((toggle) => ({
        value: toggle.value,
        label: toggle.regular,
        startIcon: toggle.icons
      }));
  }
};

const TableHeaderRow = ({ headers }: { headers: string[] }) => (
  <tr>
    {headers.map((header) => (
      <th key={header} scope="col">
        {header}
      </th>
    ))}
  </tr>
);

export const ButtonsetmultipleOverviewcorepack = () => {
  const [viewportWidth, setViewportWidth] = useState(getViewportWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(getViewportWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const screenRange = getScreenRange(viewportWidth);
  const responsiveLabels = useMemo(() => getResponsiveLabels(screenRange), [screenRange]);
  const responsiveDisplay = screenRange === "sm" ? "icons" : "all";

  return (
    <div id="buttons-container">
      <h6>Text Buttonset</h6>
      <div class="oj-sm-padding-2x">
        <oj-c-buttonset-multiple
          id="buttonset1"
          display="label"
          items={formatItems}
          value={["bold", "italics"]}
          aria-label="Choose one or more format options."
        />
      </div>

      <h6>Icon Buttonset</h6>
      <div class="oj-sm-padding-2x">
        <oj-c-buttonset-multiple
          id="icon_buttonset1"
          display="icons"
          items={formatItems}
          value={["bold", "italics"]}
          aria-label="Choose one or more format options."
        />
        <oj-c-buttonset-multiple
          id="icon_buttonset2"
          display="all"
          items={formatItems}
          value={["bold", "italics"]}
          aria-label="Choose one or more format options."
        />
      </div>

      <h6>Disabled Buttonset</h6>
      <div class="oj-sm-padding-2x">
        <oj-c-buttonset-multiple
          id="dis_buttonset1"
          display="label"
          disabled
          items={formatItems}
          value={["bold", "italics"]}
          aria-label="Choose one or more format options."
        />
        <oj-c-buttonset-multiple
          id="dis_buttonset2"
          display="icons"
          disabled
          items={formatItems}
          value={["bold", "italics"]}
          aria-label="Choose one or more format options."
        />
        <oj-c-buttonset-multiple
          id="dis_buttonset3"
          display="all"
          disabled
          items={formatItems}
          value={["bold", "italics"]}
          aria-label="Choose one or more format options."
        />
      </div>

      <h6>Chroming</h6>
      <div class="oj-sm-padding-2x">
        <table>
          <tbody>
            <TableHeaderRow headers={["Borderless", "Outlined"]} />
            <tr>
              <td>
                <oj-c-buttonset-multiple
                  id="chroming_buttonset1"
                  display="icons"
                  chroming="borderless"
                  items={formatItems}
                  value={["bold", "italics"]}
                  aria-label="Choose one or more format options."
                />
              </td>
              <td>
                <oj-c-buttonset-multiple
                  id="chroming_buttonset2"
                  display="icons"
                  chroming="outlined"
                  items={formatItems}
                  value={["bold", "italics"]}
                  aria-label="Choose one or more format options."
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h6>Sizes</h6>
      <div class="oj-sm-padding-2x">
        <table>
          <tbody>
            <TableHeaderRow headers={["Small", "Default", "Medium", "Large"]} />
            <tr>
              <td>
                <oj-c-buttonset-multiple
                  id="size_buttonset1"
                  display="icons"
                  size="sm"
                  items={formatItems}
                  aria-label="Choose one or more format options."
                  value={["bold", "italics"]}
                />
              </td>
              <td>
                <oj-c-buttonset-multiple
                  id="size_buttonset2"
                  display="icons"
                  items={formatItems}
                  aria-label="Choose one or more format options."
                  value={["bold", "italics"]}
                />
              </td>
              <td>
                <oj-c-buttonset-multiple
                  id="size_buttonset3"
                  display="icons"
                  size="md"
                  items={formatItems}
                  aria-label="Choose one or more format options."
                  value={["bold", "italics"]}
                />
              </td>
              <td>
                <oj-c-buttonset-multiple
                  id="size_buttonset4"
                  display="icons"
                  size="lg"
                  items={formatItems}
                  aria-label="Choose one or more format options."
                  value={["bold", "italics"]}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h6>Buttonset Width</h6>
      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with property layout-width=&apos;auto&apos; which should be
            used to make Buttonset Button&apos;s widths fit their contents.
          </p>
        </div>
        <oj-c-buttonset-multiple
          items={formatItems}
          display="label"
          layoutWidth="auto"
          id="formatsetWidth1"
          value={["bold", "italics"]}
          aria-label="Choose one or more format options."
        />
      </div>

      <div class="oj-panel oj-bg-neutral-30 demo-mypanel oj-sm-margin-4x-top">
        <div class="oj-sm-padding-2x">
          <p>
            This panel has a buttonset with property layout-width=&quot;equal&quot; which should be
            used to make Buttonset Button&apos;s widths equal.
          </p>
        </div>
        <oj-c-buttonset-multiple
          items={formatItems}
          display="label"
          layoutWidth="equal"
          id="formatsetWidth2"
          value={["bold", "italics"]}
          aria-label="Choose one or more format options."
        />
      </div>

      <h6>Responsive</h6>
      <div class="oj-sm-margin-6x-bottom">
        <oj-c-buttonset-multiple
          id="itemset"
          value={["home", "lib"]}
          layoutWidth="auto"
          items={responsiveLabels}
          display={responsiveDisplay}
          aria-label="Choose only one item."
        />
      </div>

      <h6>Labelled Buttonset</h6>
      <oj-label-value label-edge="top">
        <oj-label slot="label" id="mainlabelid">
          Drinks
        </oj-label>
        <oj-c-buttonset-multiple
          slot="value"
          items={drinkOptions}
          id="buttonsetLabelDemoId"
          aria-labelledby="mainlabelid"
          value={["coffee", "tea"]}
          aria-label="Choose one or more format options."
        />
      </oj-label-value>
    </div>
  );
};

export default ButtonsetmultipleOverviewcorepack;
