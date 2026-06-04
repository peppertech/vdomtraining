import { h } from 'preact';
import 'ojs/ojcollapsible';

export const CollapsibleBorders = () => {
  return (
      <div id="collapsiblePage">
            text before
            <oj-collapsible id="c1">
                    <h1 id="h1" slot="header" class="oj-header-border">Header 1 with Border</h1>
                    <p id="p1">I'm a Collapsible with h1 header</p>
                </oj-collapsible>
            <oj-collapsible id="c2">
                    <h2 id="h2" slot="header" class="oj-header-border">Header 2 with Border</h2>
                    <p id="p2">I'm a Collapsible with h2 header</p>
                </oj-collapsible>
            <oj-collapsible id="c3">
                    <h3 id="h3" slot="header" class="oj-header-border">Header 3 with Border</h3>
                    <p id="p3">I'm a Collapsible with h3 header Style</p>
                </oj-collapsible>
            <oj-collapsible id="c4">
                    <h4 id="h4" slot="header" class="oj-header-border">Header 4 with Border</h4>
                    <p id="p4">I'm a Collapsible with h4 header Style</p>
                </oj-collapsible>
            text below
        </div>
    );
};

export default CollapsibleBorders;
