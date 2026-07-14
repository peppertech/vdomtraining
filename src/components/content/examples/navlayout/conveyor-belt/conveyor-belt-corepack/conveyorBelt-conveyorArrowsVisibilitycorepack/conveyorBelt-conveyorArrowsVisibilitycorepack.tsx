import "css!./demo.css";
import 'oj-c/conveyor-belt';
import 'ojs/ojbutton';
import 'ojs/ojlabel';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'preact';
import type { ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

type ArrowVisibility = ComponentProps<'oj-c-conveyor-belt'>['arrowVisibility'];

export const ConveyorBeltConveyorArrowsVisibilitycorepack = () => {
    const [currentNavArrowVisibility, setCurrentNavArrowVisibility] = useState<ArrowVisibility>('auto');

    const handleCurrentNavArrowVisibilityValueChanged = (event: Parameters<NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>>[0]) => {
        setCurrentNavArrowVisibility(event.detail.value);
    };

    return (
        <div id="conveyorbelt-horizontal-example">
            <div class="demo-arrow-visibility-radioset">
                <oj-label id="navArrowVisibilityLabel">Arrow visibility</oj-label>
                <oj-radioset id="navArrowVisibilityRadioset" labelledBy="navArrowVisibilityLabel" onvalueChanged={handleCurrentNavArrowVisibilityValueChanged} value={currentNavArrowVisibility}>
                    <oj-option value="auto">Auto</oj-option>
                    <oj-option value="visible">Visible</oj-option>
                    <oj-option value="hidden">Hidden</oj-option>
                </oj-radioset>
            </div>
            <div class="oj-flex">
                <oj-c-conveyor-belt arrowVisibility={currentNavArrowVisibility} class="oj-lg-6 oj-md-9 oj-sm-12 oj-flex-item">
                    <oj-button class="oj-sm-margin-1x">Hydrogen</oj-button>
                    <oj-button class="oj-sm-margin-1x">Helium</oj-button>
                    <oj-button class="oj-sm-margin-1x">Lithium</oj-button>
                    <oj-button class="oj-sm-margin-1x">Beryllium</oj-button>
                    <oj-button class="oj-sm-margin-1x">Boron</oj-button>
                    <oj-button class="oj-sm-margin-1x">Carbon</oj-button>
                    <oj-button class="oj-sm-margin-1x">Nitrogen</oj-button>
                    <oj-button class="oj-sm-margin-1x">Oxygen</oj-button>
                    <oj-button class="oj-sm-margin-1x">Fluorine</oj-button>
                    <oj-button class="oj-sm-margin-1x">Neon</oj-button>
                    <oj-button class="oj-sm-margin-1x">Sodium</oj-button>
                    <oj-button class="oj-sm-margin-1x">Magnesium</oj-button>
                </oj-c-conveyor-belt>
            </div>
        </div>
    );
};

export default ConveyorBeltConveyorArrowsVisibilitycorepack;
