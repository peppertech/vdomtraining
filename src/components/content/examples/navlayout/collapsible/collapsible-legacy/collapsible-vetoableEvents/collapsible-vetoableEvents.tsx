import { h } from 'preact';
import { useState } from 'preact/hooks';
import { JetElementCustomEvent } from 'ojs/index';
import 'ojs/ojcollapsible';
import 'ojs/ojswitch';

export const CollapsibleVetoableEvents = () => {
  const [blockEvents, setBlockEvents] = useState(false);

  const handleBlockEventsChanged = (event: JetElementCustomEvent<boolean>) => {
    setBlockEvents(event.detail.value);
  };

  const beforeExpandHandler = (event: Event) => {
    if (blockEvents) {
      event.preventDefault();
    }
  };

  const beforeCollapseHandler = (event: Event) => {
    if (blockEvents) {
      event.preventDefault();
    }
  };

  return (
      <div id="collapsibleDemo">
            <div class="oj-sm-padding-2x-bottom">
                    <oj-switch
                      id="switch"
                      value={blockEvents}
                      labelEdge="inside"
                      labelHint="Block events"
                      onvalueChanged={handleBlockEventsChanged}
                    />
                </div>
            <oj-collapsible id="c1" onojBeforeExpand={beforeExpandHandler} onojBeforeCollapse={beforeCollapseHandler}>
                    <h3 id="h3" slot="header">Header 3</h3>
                    <p id="p1">Content Panel</p>
                </oj-collapsible>
        </div>
    );
};

export default CollapsibleVetoableEvents;
