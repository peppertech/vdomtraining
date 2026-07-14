import 'ojs/ojcollapsible';
import 'preact';

export const CollapsibleHeaderLevels = () => {
  return (
      <div id="collapsiblePage">
            text before
            <oj-collapsible id="c1">
                    <h1 id="h1" slot="header">Header 1</h1>
                    <p id="p1">I'm a Collapsible with h1 header</p>
                </oj-collapsible>
            <oj-collapsible id="c2">
                    <h2 id="h2" slot="header">Header 2</h2>
                    <p id="p2">I'm a Collapsible with h2 header</p>
                </oj-collapsible>
            <oj-collapsible id="c3">
                    <h3 id="h3" slot="header">Header 3</h3>
                    <p id="p3">I'm a Collapsible with h3 header Style</p>
                </oj-collapsible>
            <oj-collapsible id="c4">
                    <h4 id="h4" slot="header">Header 4</h4>
                    <p id="p4">I'm a Collapsible with h4 header Style</p>
                </oj-collapsible>
            <oj-collapsible id="c5">
                    <h5 id="h5" slot="header">Header 5</h5>
                    <p id="p5">I'm a Collapsible with h5 header Style</p>
                </oj-collapsible>
            <oj-collapsible id="c6">
                    <h6 id="h6" slot="header">Header 6</h6>
                    <p id="p6">I'm a Collapsible with h6 header Style</p>
                </oj-collapsible>
            text below
        </div>
    );
};

export default CollapsibleHeaderLevels;
