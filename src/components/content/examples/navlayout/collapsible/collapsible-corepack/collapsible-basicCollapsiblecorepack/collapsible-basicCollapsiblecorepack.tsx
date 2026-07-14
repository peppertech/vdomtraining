import 'oj-c/collapsible';
import 'preact';

export const CollapsibleBasicCollapsiblecorepack = () => {
  return (
      <div id="collapsiblePage">
            <oj-c-collapsible id="c1">
                    <h3 id="h" slot="header">Header 3</h3>
                    <p id="c">I'm a Collapsible.</p>
                </oj-c-collapsible>
        </div>
    );
};

export default CollapsibleBasicCollapsiblecorepack;
