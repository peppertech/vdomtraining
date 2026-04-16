import { h, ComponentProps } from "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/popup";

type CButtonProps = ComponentProps<"oj-c-button">;
type CPopupProps = ComponentProps<"oj-c-popup">;

type ButtonActionEvent = Parameters<NonNullable<CButtonProps["onojAction"]>>[0];
type PopupOpenedChangedEvent = Parameters<
  NonNullable<CPopupProps["onopenedChanged"]>
>[0];

export const CorePackPopup = () => {
  const [opened, setOpened] = useState(false);

  const openListener = useCallback((_event: ButtonActionEvent) => {
    setOpened(true);
  }, []);

  const handleOpenedChanged = useCallback(
    (event: PopupOpenedChangedEvent) => {
      setOpened(event.detail.value);
    },
    [],
  );

  return (
    <div
      id="popupWrapper"
      class="oj-web-applayout-max-width oj-web-applayout-content"
    >
      <oj-c-popup
        id="popup1"
        role="tooltip"
        opened={opened}
        launcher="#btnGo"
        autoDismiss="none"
        onopenedChanged={handleOpenedChanged}
      >
        Hello World!!!
      </oj-c-popup>
      <oj-c-button
        id="btnGo"
        onojAction={openListener}
        label="Go"
      ></oj-c-button>
    </div>
  );
};
