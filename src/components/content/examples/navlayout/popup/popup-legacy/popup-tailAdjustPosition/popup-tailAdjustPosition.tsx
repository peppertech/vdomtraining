import { h } from 'preact';
import type { ComponentProps } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import { ojPopup, ojPopupSettableProperties } from 'ojs/ojpopup';
import 'ojs/ojpopup';
import 'ojs/ojradioset';
import 'ojs/ojbutton';
import 'ojs/ojlabel';

type RadioChangedEvent = Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0];

export const PopupTailAdjustPosition = () => {
  const popupRef = useRef<ojPopup | null>(null);
  const availableHorizontalPositionMnemonics = [
    { value: 'start', label: 'start' },
    { value: 'left', label: 'left' },
    { value: 'center', label: 'center' },
    { value: 'right', label: 'right' },
    { value: 'end', label: 'end' }
  ];
  const availableTails = [
    { value: 'none', label: 'none' },
    { value: 'simple', label: 'simple' }
  ];
  const availableVerticalPositionMnemonics = [
    { value: 'top', label: 'top' },
    { value: 'center', label: 'center' },
    { value: 'bottom', label: 'bottom' }
  ];

  const [tailSelected, setTailSelected] = useState<ojPopupSettableProperties['tail']>('simple');
  const [myHorizontalSelected, setMyHorizontalSelected] = useState<ojPopup.PositionAlign['horizontal']>('start');
  const [myVerticalSelected, setMyVerticalSelected] = useState<ojPopup.PositionAlign['vertical']>('bottom');
  const [atHorizontalSelected, setAtHorizontalSelected] = useState<ojPopup.PositionAlign['horizontal']>('end');
  const [atVerticalSelected, setAtVerticalSelected] = useState<ojPopup.PositionAlign['vertical']>('top');

  const availableTailsDP = useMemo(() => new ArrayDataProvider(availableTails, { keyAttributes: 'value' }), []);
  const availableHorizontalPositionMnemonicsDP = useMemo(
    () => new ArrayDataProvider(availableHorizontalPositionMnemonics, { keyAttributes: 'value' }),
    []
  );
  const availableVerticalPositionMnemonicsDP = useMemo(
    () => new ArrayDataProvider(availableVerticalPositionMnemonics, { keyAttributes: 'value' }),
    []
  );

  const handleAtHorizontalSelectedValueChanged = (event: RadioChangedEvent) => {
    setAtHorizontalSelected((event.detail.value ?? 'end') as ojPopup.PositionAlign['horizontal']);
  };

  const handleAtVerticalSelectedValueChanged = (event: RadioChangedEvent) => {
    setAtVerticalSelected((event.detail.value ?? 'top') as ojPopup.PositionAlign['vertical']);
  };

  const handleMyHorizontalSelectedValueChanged = (event: RadioChangedEvent) => {
    setMyHorizontalSelected((event.detail.value ?? 'start') as ojPopup.PositionAlign['horizontal']);
  };

  const handleMyVerticalSelectedValueChanged = (event: RadioChangedEvent) => {
    setMyVerticalSelected((event.detail.value ?? 'bottom') as ojPopup.PositionAlign['vertical']);
  };

  const handleTailSelectedValueChanged = (event: RadioChangedEvent) => {
    setTailSelected((event.detail.value ?? 'simple') as ojPopupSettableProperties['tail']);
  };

  const openPopup = () => {
    const popup = popupRef.current;
    if (!popup) {
      return;
    }
    popup.open('#showPopup');
  };

  const clickListener = () => {
    const popup = popupRef.current;
    if (!popup) {
      return;
    }

    if (popup.isOpen()) {
      popup.close();
    } else {
      openPopup();
    }
  };

  return (
    <div id="popupWrapper">
      <oj-popup
        ref={popupRef}
        id="popup"
        autoDismiss="none"
        modality="modeless"
        tail={tailSelected}
        position={{
          at: { horizontal: atHorizontalSelected, vertical: atVerticalSelected },
          collision: 'none',
          my: { horizontal: myHorizontalSelected, vertical: myVerticalSelected }
        }}
      >
        <div class="oj-flex oj-sm-flex-items-initial oj-sm-justify-content-center">
          <div class="oj-flex-item">Chasing Tail</div>
        </div>
      </oj-popup>
      <div class="oj-flex">
        <div class="oj-flex-item">
          <oj-label for="atHorizontal">at.horizontal (button)</oj-label>
          <oj-radioset
            id="atHorizontal"
            options={availableHorizontalPositionMnemonicsDP}
            onvalueChanged={handleAtHorizontalSelectedValueChanged}
            value={atHorizontalSelected}
          />
        </div>
        <div class="oj-flex-item">
          <oj-label for="atVertical">at.vertical (button)</oj-label>
          <oj-radioset
            id="atVertical"
            options={availableVerticalPositionMnemonicsDP}
            onvalueChanged={handleAtVerticalSelectedValueChanged}
            value={atVerticalSelected}
          />
        </div>
        <div class="oj-flex-item">
          <oj-label for="myHorizontal">my.horizontal (popup)</oj-label>
          <oj-radioset
            id="myHorizontal"
            options={availableHorizontalPositionMnemonicsDP}
            onvalueChanged={handleMyHorizontalSelectedValueChanged}
            value={myHorizontalSelected}
          />
        </div>
        <div class="oj-flex-item">
          <oj-label for="myVertical">my.vertical (popup)</oj-label>
          <oj-radioset
            id="myVertical"
            options={availableVerticalPositionMnemonicsDP}
            onvalueChanged={handleMyVerticalSelectedValueChanged}
            value={myVerticalSelected}
          />
        </div>
        <div class="oj-flex-item">
          <oj-label for="tail">tail</oj-label>
          <oj-radioset id="tail" options={availableTailsDP} onvalueChanged={handleTailSelectedValueChanged} value={tailSelected} />
        </div>
      </div>
      <div class="oj-flex oj-sm-flex-items-initial oj-sm-justify-content-center demo-m-top-100">
        <div class="oj-flex-item">
          <oj-button id="showPopup" onojAction={clickListener}>
            Go
          </oj-button>
        </div>
      </div>
    </div>
  );
};

export default PopupTailAdjustPosition;
