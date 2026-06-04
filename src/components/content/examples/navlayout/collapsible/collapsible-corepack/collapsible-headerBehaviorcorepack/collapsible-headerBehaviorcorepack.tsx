import { h } from 'preact';
import { useState } from 'preact/hooks';
import 'oj-c/collapsible';
import 'ojs/ojbutton';

export const CollapsibleHeaderBehaviorcorepack = () => {
  const [clickCounter, setClickCounter] = useState(0);

  const buttonClick = () => {
    setClickCounter((current) => current + 1);
  };

  return (
      <div id="formId">
            <oj-c-collapsible id="c3" class="oj-sm-padding-2x-vertical" expanded>
                    <div id="h3" slot="header" class="oj-flex oj-sm-flex-items-initial">
                              <h5 class="oj-flex-item">Header with embedded button</h5>
                              <oj-button id="btn1" class="oj-helper-margin-start-auto oj-flex-item" data-oj-clickthrough="disabled" onojAction={buttonClick}>Click</oj-button>
                          </div>
                    <p id="p3">
                              The button was clicked
                              <span>{clickCounter}</span>
                              times.
                          </p>
                    <p id="p4">
                              This collapsible header includes a button that can be clicked without making the collapsible expand or collapse.
                          </p>
                </oj-c-collapsible>
        </div>
    );
};

export default CollapsibleHeaderBehaviorcorepack;
