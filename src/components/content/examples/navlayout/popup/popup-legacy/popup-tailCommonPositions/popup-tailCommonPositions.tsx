import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojoption';
import 'ojs/ojpopup';
import { ojPopup,ojPopupSettableProperties } from 'ojs/ojpopup';
import 'ojs/ojradioset';
import 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';

type PopupObj = {
  buttonId: string;
  buttonLabel: string;
  popupId: string;
  popupPosition: ojPopup.Position;
};

type PropertyChangedEvent<T> = CustomEvent<{ value: T }>;

const popupObjs: PopupObj[] = [
  {
    buttonId: 'buttonTopStart',
    buttonLabel: 'Top Start',
    popupId: 'popupTopStart',
    popupPosition: {
      at: { horizontal: 'start', vertical: 'top' },
      my: { horizontal: 'end', vertical: 'bottom' }
    }
  },
  {
    buttonId: 'buttonTop',
    buttonLabel: 'Top',
    popupId: 'popupTop',
    popupPosition: {
      at: { horizontal: 'center', vertical: 'top' },
      my: { horizontal: 'center', vertical: 'bottom' }
    }
  },
  {
    buttonId: 'buttonTopEnd',
    buttonLabel: 'Top End',
    popupId: 'popupTopEnd',
    popupPosition: {
      at: { horizontal: 'end', vertical: 'top' },
      my: { horizontal: 'start', vertical: 'bottom' }
    }
  },
  {
    buttonId: 'buttonStart',
    buttonLabel: 'Start',
    popupId: 'popupStart',
    popupPosition: {
      at: { horizontal: 'start', vertical: 'center' },
      my: { horizontal: 'end', vertical: 'center' }
    }
  },
  {
    buttonId: 'buttonEnd',
    buttonLabel: 'End',
    popupId: 'popupEnd',
    popupPosition: {
      at: { horizontal: 'end', vertical: 'center' },
      my: { horizontal: 'start', vertical: 'center' }
    }
  },
  {
    buttonId: 'buttonBottomStart',
    buttonLabel: 'Bottom Start',
    popupId: 'popupBottomStart',
    popupPosition: {
      at: { horizontal: 'start', vertical: 'bottom' },
      my: { horizontal: 'end', vertical: 'top' }
    }
  },
  {
    buttonId: 'buttonBottom',
    buttonLabel: 'Bottom',
    popupId: 'popupBottom',
    popupPosition: {
      at: { horizontal: 'center', vertical: 'bottom' },
      my: { horizontal: 'center', vertical: 'top' }
    }
  },
  {
    buttonId: 'buttonBottomEnd',
    buttonLabel: 'Bottom End',
    popupId: 'popupBottomEnd',
    popupPosition: {
      at: { horizontal: 'end', vertical: 'bottom' },
      my: { horizontal: 'start', vertical: 'top' }
    }
  }
];

export const PopupTailCommonPositions = () => {
  const popupRefs = useRef<Record<string, ojPopup | null>>({});
  const [tailSelected, setTailSelected] = useState<ojPopupSettableProperties['tail']>('simple');
  const positions = useMemo(() => popupObjs, []);

  const handleTailSelectedChanged = (
    event: PropertyChangedEvent<ojPopupSettableProperties['tail']>
  ) => {
    setTailSelected(event.detail.value);
  };

  const togglePopup = (popupObj: PopupObj) => {
    const popup = popupRefs.current[popupObj.popupId];
    if (!popup) {
      return;
    }

    if (popup.isOpen()) {
      popup.close();
    } else {
      popup.open(`#${popupObj.buttonId}`);
    }
  };

  return (
    <div id="popupDemo">
      {positions.map((popupObj) => (
        <oj-popup
          key={popupObj.popupId}
          ref={(element) => {
            popupRefs.current[popupObj.popupId] = element as ojPopup | null;
          }}
          id={popupObj.popupId}
          auto-dismiss="none"
          modality="modeless"
          tail={tailSelected}
          position={popupObj.popupPosition}
        >
          <div class="oj-flex">
            <pre class="oj-flex-item demo-position oj-typography-body-sm">
              {'position = ' + JSON.stringify(popupObj.popupPosition, null, 2)}
            </pre>
          </div>
        </oj-popup>
      ))}

      <oj-form-layout max-columns={1} direction="row">
        <oj-radioset
          class="oj-choice-direction-row"
          labelHint="Tail"
          onvalueChanged={handleTailSelectedChanged}
          value={tailSelected}
        >
          <oj-option value="none">none</oj-option>
          <oj-option value="simple">simple</oj-option>
        </oj-radioset>
      </oj-form-layout>

      <div class="demo-buttons oj-flex oj-sm-flex-wrap-wrap">
        {positions.map((popupObj) => (
          <div key={popupObj.buttonId} class="oj-flex-item oj-sm-12 oj-md-4 oj-sm-padding-2x">
            <div class="oj-sm-flex-initial oj-helper-text-align-center">
              <oj-button
                id={popupObj.buttonId}
                class="demo-button oj-button-sm"
                chroming="outlined"
                onojAction={() => togglePopup(popupObj)}
              >
                <span>{popupObj.buttonLabel}</span>
              </oj-button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopupTailCommonPositions;
