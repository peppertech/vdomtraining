import { h } from 'preact';
import 'ojs/ojcollapsible';

export const CollapsibleBasicCollapsible = () => {
  return (
      <div id="collapsiblePage">
            <oj-collapsible id="c1">
                    <h3 id="h" slot="header">Header 3</h3>
                    <p id="c">I'm a Collapsible.</p>
                </oj-collapsible>
        </div>
    );
};

export default CollapsibleBasicCollapsible;
