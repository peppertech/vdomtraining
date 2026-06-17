import 'preact';
import type { ComponentProps } from 'preact';

import { useRef, useState } from 'preact/hooks';
import 'ojs/ojbutton';
import 'ojs/ojpopup';
import 'ojs/ojformlayout';
import 'ojs/ojinputtext';
import { ojPopup } from 'ojs/ojpopup';
import "css!./demo.css";

type TextInputValue = ComponentProps<'oj-input-text'>['value'];
type PopupPositionProps = Partial<ComponentProps<'oj-popup'>> & {
    'position.my.horizontal': 'center';
    'position.my.vertical': 'center';
    'position.at.horizontal': 'center';
    'position.at.vertical': 'center';
    'position.of': 'window';
};

export const PopupModalcorepack = () => {
    const popupRef = useRef<ojPopup | null>(null);
    const [textVal1, setTextVal1] = useState<TextInputValue>('');
    const [textVal2, setTextVal2] = useState<TextInputValue>('');

    const handleTextVal1ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setTextVal1(event.detail.value);
    };

    const handleTextVal2ValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-input-text'>['onvalueChanged']>>[0]) => {
        setTextVal2(event.detail.value);
    };

    const openListener = () => {
        popupRef.current?.open('#btnGo');
    };
    const cancelListener = () => {
        popupRef.current?.close();
    };
    const ojPopupProps: PopupPositionProps = {
        'position.my.horizontal': 'center',
        'position.my.vertical': 'center',
        'position.at.horizontal': 'center',
        'position.at.vertical': 'center',
        'position.of': 'window'
    };

return (
        <div id="popupWrapper">
            <oj-popup ref={popupRef} id="popup1" class="demo-popup" autoDismiss="none" modality="modal" aria-labelledby="popupTitle" tail="none" {...ojPopupProps}>
                <div class="demo-popup-body oj-sm-padding-2x">
                    <div class="demo-popup-header">
                        <h5 id="popupTitle">Modal Popup</h5>
                        <oj-button id="btnCancel" class="oj-button-sm" display="icons" onojAction={cancelListener}>
                            <span slot="startIcon" class="oj-ux-ico-close" />
                            Cancel
                        </oj-button>
                    </div>
                    <div class="demo-popup-content">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </oj-popup>
            <oj-button id="btnGo" onojAction={openListener}>Go</oj-button>
            <div id="form-container" class="oj-sm-padding-4x-top">
                <oj-form-layout direction="row" maxColumns={1}>
                    <oj-input-text onvalueChanged={handleTextVal1ValueChanged} value={textVal1} labelHint="Address 1" />
                    <oj-input-text onvalueChanged={handleTextVal2ValueChanged} value={textVal2} labelHint="Address 2" />
                </oj-form-layout>
            </div>
        </div>
    );
};
export default PopupModalcorepack;
