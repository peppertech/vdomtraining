import "css!./demo.css";
import 'oj-c/conveyor-belt';
import 'ojs/ojbutton';
import 'preact';

export const ConveyorBeltVerticalConveyorBeltcorepack = () => {
  return (
      <div id="conveyorbelt-vertical-example">
            <oj-c-conveyor-belt class="demo-vertical-height" orientation="vertical">
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Hydrogen</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Helium</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Lithium</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Beryllium</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Boron</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Carbon</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Nitrogen</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Oxygen</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Fluorine</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Neon</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Sodium</oj-button>
                    <oj-button class="demo-ver-button oj-sm-margin-1x">Magnesium</oj-button>
                </oj-c-conveyor-belt>
        </div>
    );
};

export default ConveyorBeltVerticalConveyorBeltcorepack;
