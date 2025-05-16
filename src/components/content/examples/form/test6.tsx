import "preact";
import { useCallback,useState } from "preact/hooks";
import "oj-c/popup";
import "oj-c/button";
import "oj-c/split-menu-button";
import {
  SplitMenuButton,
  MenuItems,
} from 'oj-c/split-menu-button';

export function Test6() {
  const [popupOpened, setPopupOpened] = useState(false);
  const startToggle = useCallback(() => {
    setPopupOpened(!popupOpened);
  }, [popupOpened]);

const closeHandler = () => {
  setPopupOpened(false)
}

  return (
    <>
      <oj-c-popup id="popup1" opened={popupOpened} autoDismiss={'focusLoss'} launcher="#btnGo" onojClose={closeHandler}>
        Hello World!!!
      </oj-c-popup>
      <oj-c-button id={'btnGo'} label="Go" onojAction={startToggle} />
      <SplitMenuButton
      label="Foo 1 (TS)"
      items={[
        {
          type: 'item',
          label: 'Bar',
          key: 'bar',
        },
        {
          type: 'item',
          label: 'Baz',
          key: 'baz',
        },
      ] as MenuItems[]}
    />
      <oj-c-split-menu-button
      label="Foo 2 (JS)"
      items={[
        {
          type: 'item',
          label: 'Bar',
          key: 'bar',
        },
        {
          type: 'item',
          label: 'Baz',
          key: 'baz',
        },
      ] as MenuItems[]}
    />
    </>
  );
}
