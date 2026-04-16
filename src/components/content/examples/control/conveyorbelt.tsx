import "preact";
import "ojs/ojbutton";
import "ojs/ojconveyorbelt";

const ConveyorBelt = () => {
  return (
    <div id="conveyorbelt-horizontal-example">
      <div class="oj-flex">
        <oj-conveyor-belt
          id="conveyorBelt"
          class="oj-lg-6 oj-md-9 oj-sm-12 oj-flex-item"
          data-oj-binding-provider="none"
          orientation="horizontal"
          arrowVisibility="auto">
          <oj-button id="hydrogen" class="oj-sm-margin-1x">
            Hydrogen
          </oj-button>
          <oj-button id="helium" class="oj-sm-margin-1x">
            Helium
          </oj-button>
          <oj-button id="lithium" class="oj-sm-margin-1x">
            Lithium
          </oj-button>
          <oj-button id="berylium" class="oj-sm-margin-1x">
            Beryllium
          </oj-button>
          <oj-button id="boron" class="oj-sm-margin-1x">
            Boron
          </oj-button>
          <oj-button id="carbon" class="oj-sm-margin-1x">
            Carbon
          </oj-button>
          <oj-button id="nitrogen" class="oj-sm-margin-1x">
            Nitrogen
          </oj-button>
          <oj-button id="oxygen" class="oj-sm-margin-1x">
            Oxygen
          </oj-button>
          <oj-button id="fluorine" class="oj-sm-margin-1x">
            Fluorine
          </oj-button>
          <oj-button id="neon" class="oj-sm-margin-1x">
            Neon
          </oj-button>
          <oj-button id="sodium" class="oj-sm-margin-1x">
            Sodium
          </oj-button>
          <oj-button id="magnesium" class="oj-sm-margin-1x">
            Magnesium
          </oj-button>
        </oj-conveyor-belt>
      </div>
    </div>
  );
};

export default ConveyorBelt;
