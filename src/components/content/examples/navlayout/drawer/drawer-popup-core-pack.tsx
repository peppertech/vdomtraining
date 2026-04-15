import { h, ComponentProps } from "preact";
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/drawer-popup";
import "oj-c/select-single";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojnavigationlist";
import "ojs/ojselectsingle";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

type SelectOption = {
  value: string;
  label: string;
};

type LegacySelectSingleProps = ComponentProps<"oj-select-single">;
type CorePackSelectSingleProps = ComponentProps<"oj-c-select-single">;

const lineOptions: SelectOption[] = [
  { value: "apt", label: "Apartment / Suite" },
  { value: "building", label: "Building" },
  { value: "floor", label: "Floor" },
  { value: "unit", label: "Unit" },
];

const browserOptions: SelectOption[] = [
  { value: "IE", label: "Internet Explorer" },
  { value: "FF", label: "Firefox" },
  { value: "CH", label: "Chrome" },
  { value: "OP", label: "Opera" },
  { value: "SF", label: "Safari" },
];

const DrawerPopupCorePack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startOpened, setStartOpened] = useState(false);
  const [endOpened, setEndOpened] = useState(false);
  const [bottomOpened, setBottomOpened] = useState(false);
  const [selectVal, setSelectVal] = useState<string>("apt");
  const [selectVal2, setSelectVal2] = useState<string>("CH");

  const linesDP = useMemo(
    () =>
      new MutableArrayDataProvider<string, SelectOption>(lineOptions, {
        keyAttributes: "value",
      }),
    [],
  );

  const browsersDP = useMemo(
    () =>
      new MutableArrayDataProvider<string, SelectOption>(browserOptions, {
        keyAttributes: "value",
      }),
    [],
  );

  type LegacySelectValueChangedEvent = Parameters<
    NonNullable<LegacySelectSingleProps["onvalueChanged"]>
  >[0];
  type CorePackSelectValueChangedEvent = Parameters<
    NonNullable<CorePackSelectSingleProps["onvalueChanged"]>
  >[0];

  const toggleStart = useCallback(() => {
    setStartOpened((prev) => !prev);
  }, []);

  const toggleEnd = useCallback(() => {
    setEndOpened((prev) => !prev);
  }, []);

  const toggleBottom = useCallback(() => {
    setBottomOpened((prev) => !prev);
  }, []);

  const handleLegacySelectChange = useCallback(
    (event: LegacySelectValueChangedEvent) => {
      setSelectVal((event.detail.value as string) ?? "");
    },
    [],
  );

  const handleCorePackSelectChange = useCallback(
    (event: CorePackSelectValueChangedEvent) => {
      setSelectVal2((event.detail.value as string) ?? "");
    },
    [],
  );

  useEffect(() => {
    const updatePreviewBounds = () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const root = document.documentElement;
      root.style.setProperty("--demo-drawer-popup-top", `${Math.round(rect.top)}px`);
      root.style.setProperty("--demo-drawer-popup-left", `${Math.round(rect.left)}px`);
      root.style.setProperty("--demo-drawer-popup-width", `${Math.round(rect.width)}px`);
      root.style.setProperty("--demo-drawer-popup-height", `${Math.round(rect.height)}px`);
      root.style.setProperty(
        "--demo-drawer-popup-right",
        `${Math.round(window.innerWidth - rect.right)}px`,
      );
      root.style.setProperty(
        "--demo-drawer-popup-bottom",
        `${Math.round(window.innerHeight - rect.bottom)}px`,
      );
    };

    updatePreviewBounds();

    const resizeObserver = new ResizeObserver(() => {
      updatePreviewBounds();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", updatePreviewBounds);
    window.addEventListener("scroll", updatePreviewBounds, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePreviewBounds);
      window.removeEventListener("scroll", updatePreviewBounds, true);
    };
  }, []);

  return (
    <div
      id="demo-container"
      ref={containerRef}
      class="oj-web-applayout-max-width oj-web-applayout-content demo-drawer-popup-preview"
    >
      <div class="demo-padding oj-typography-body-md oj-panel oj-sm-padding-4x demo-drawer-popup-preview__panel">
        <div class="demo-controls oj-sm-margin-2x-bottom">
          <oj-c-button
            id="coreToggleStartButton"
            class="oj-sm-margin-1x-end"
            label="Toggle Start"
            onojAction={toggleStart}
          ></oj-c-button>
          <oj-c-button
            id="coreToggleEndButton"
            class="oj-sm-margin-1x-end"
            label="Toggle End"
            onojAction={toggleEnd}
          ></oj-c-button>
          <oj-c-button
            id="coreToggleBottomButton"
            label="Toggle Bottom"
            onojAction={toggleBottom}
          ></oj-c-button>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis
          a condimentum vitae sapien pellentesque habitant morbi tristique
          senectus. Hendrerit dolor magna eget est lorem ipsum dolor sit.
          Volutpat consequat mauris nunc congue nisi vitae. Parturient montes
          nascetur ridiculus mus mauris vitae ultricies. Fermentum leo vel orci
          porta non pulvinar neque laoreet.
        </p>
        <p>
          Non arcu risus quis varius quam quisque. In metus vulputate eu
          scelerisque felis imperdiet proin fermentum leo. Pretium viverra
          suspendisse potenti nullam ac tortor vitae. Bibendum arcu vitae
          elementum curabitur. Fermentum leo vel orci porta. Nisl vel pretium
          lectus quam id leo in. Lorem ipsum dolor sit amet consectetur. Orci
          sagittis eu volutpat odio facilisis mauris sit. Risus nullam eget
          felis eget nunc lobortis mattis aliquam faucibus.
        </p>
      </div>

      <oj-c-drawer-popup
        class="demo-popup-drawer demo-popup-drawer-start"
        opened={startOpened}
        modality="modeless"
        aria-labelledby="coreStartHeader"
        onopenedChanged={(event) => setStartOpened(Boolean(event.detail.value))}
      >
        <div class="demo-drawer-header">
          <div id="coreStartHeader">
            <h6>Welcome</h6>
          </div>
          <oj-c-button
            id="coreStartButtonCloser"
            display="icons"
            chroming="borderless"
            label="Close"
            onojAction={toggleStart}
          >
            <span slot="startIcon" class="oj-ux-ico-close"></span>
          </oj-c-button>
        </div>
        <oj-navigation-list class="demo-padding demo-popup-drawer-nav">
          <ul>
            <li id="core-one">
              <a href="#">Dashboard</a>
            </li>
            <li id="core-two">
              <a href="#">Incidents</a>
            </li>
            <li id="core-three">
              <a href="#">Customers</a>
            </li>
            <li id="core-four">
              <a href="#">About</a>
            </li>
          </ul>
        </oj-navigation-list>
      </oj-c-drawer-popup>

      <oj-c-drawer-popup
        class="demo-popup-drawer demo-popup-drawer-end"
        edge="end"
        opened={endOpened}
        modality="modeless"
        aria-labelledby="coreEndHeader"
        onopenedChanged={(event) => setEndOpened(Boolean(event.detail.value))}
      >
        <div class="demo-drawer-header">
          <div id="coreEndHeader">
            <h6>Address</h6>
          </div>
          <oj-c-button
            id="coreEndButtonCloser"
            display="icons"
            chroming="borderless"
            label="Close"
            onojAction={toggleEnd}
          >
            <span slot="startIcon" class="oj-ux-ico-close"></span>
          </oj-c-button>
        </div>
        <div class="demo-padding demo-form-container demo-popup-drawer-form">
          <oj-form-layout>
            <oj-input-text aria-label="line1" value="Line 1"></oj-input-text>
            <oj-input-text aria-label="line2" value="Line 2"></oj-input-text>
            <oj-select-single
              id="core-select1"
              labelHint="More Lines"
              labelEdge="inside"
              class="oj-form-control-max-width-md"
              data={linesDP}
              value={selectVal}
              onvalueChanged={handleLegacySelectChange}
            ></oj-select-single>
            <oj-c-select-single
              id="core-select2"
              labelHint="Select Single with ArrayDataProvider"
              labelEdge="inside"
              data={browsersDP}
              value={selectVal2}
              itemText="label"
              onvalueChanged={handleCorePackSelectChange}
            ></oj-c-select-single>
          </oj-form-layout>
        </div>
      </oj-c-drawer-popup>

      <oj-c-drawer-popup
        class="demo-popup-drawer demo-popup-drawer-bottom"
        edge="bottom"
        opened={bottomOpened}
        modality="modeless"
        aria-label="Cookie Preferences"
        onopenedChanged={(event) => setBottomOpened(Boolean(event.detail.value))}
      >
        <div class="demo-padding demo-popup-drawer-bottom-content">
          <p>
            We use cookies to improve user experience, and analyze website
            traffic. For these reasons, we may share your site usage data with
            our analytics partners. By clicking <a href="#">Accept Cookies</a>{" "}
            you consent to store on your device all the technologies described
            in our Cookie Policy. You can change your cookie settings at any
            time by clicking <a href="#">Cookie Preferences</a>
          </p>
          <oj-c-button
            id="coreBottomButtonCloser"
            label="Accept"
            onojAction={toggleBottom}
          ></oj-c-button>
        </div>
      </oj-c-drawer-popup>
    </div>
  );
};

export default DrawerPopupCorePack;
