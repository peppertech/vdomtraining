import "preact";
import { useCallback, useState } from "preact/hooks";
import "oj-c/popup";
import "oj-c/button";
import "oj-c/split-menu-button";
import {
  SplitMenuButton,
  CSplitMenuButtonElement,
} from 'oj-c/split-menu-button';
import { MenuItemSelectionDetail } from "oj-c/utils/PRIVATE_ItemsMenu/menuTypes";

export const Test6 = () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const startToggle = useCallback(() => {
    setPopupOpened(!popupOpened);
  }, [popupOpened]);

  const closeHandler = () => {
    setPopupOpened(false)
  }

  return (
    <>
      <h2>Test6 Content</h2>
      <oj-c-popup id="popup1" opened={popupOpened} autoDismiss={'focusLoss'} launcher="#btnGo" onojClose={closeHandler}>
        Hello World!!!
      </oj-c-popup>
      <oj-c-button id={'btnGo'} label="Go" onojAction={startToggle} />
      <SplitMenuButton
        onOjAction={()=>{console.log(`This is the button action`)}}
        onOjMenuAction={(e:MenuItemSelectionDetail)=>{console.log(`This is the Menu action: ${e.key}`)}}
        label="Foo 1 (TS)"
        items={[
          {
            type: 'item',
            label: 'Bar',
            key: 'bar',
            onAction: () => {console.log("menu Bar selected")  }
          },
          {
            type: 'item',
            label: 'Baz',
            key: 'baz',
            onAction: () => {console.log("menu Baz selected")  }
          },
        ] as CSplitMenuButtonElement['items']}
      />
      <oj-c-split-menu-button
        label="Foo 2 (JS)"
        items={[
          {
            type: 'item',
            label: 'Bar',
            key: 'bar',
            onAction: () => {console.log("menu Bar selected")  }
          },
          {
            type: 'item',
            label: 'Baz',
            key: 'baz',
            onAction: () => {console.log("menu Baz selected")  }
          },
        ] as CSplitMenuButtonElement['items']}
        onojAction={(e:CSplitMenuButtonElement.ojAction)=>{console.log("Menu button: ",e.detail)}}
        onojMenuAction={(e:CSplitMenuButtonElement.ojMenuAction)=>{console.log("Menu item: ", e.detail.key)}}
      />
    </>
  );
}
