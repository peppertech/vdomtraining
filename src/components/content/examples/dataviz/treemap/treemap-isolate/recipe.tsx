// @ts-nocheck
import { h } from 'preact';

export const treemapIsolateRecipe = (
  <>
    <ol>
      <li>
        Treemap isolate is enabled by default for non-touch devices. To disable it, set
        <b><i>node-defaults.header.isolate</i></b>
        to
        <i>'off'</i>
        .
      </li>
      <li>
        To initially isolate a node, supply the node ID to the
        <b><i>isolated-node</i></b>
        attribute.
      </li>
      <li>
        To catch and process events triggered by turning isolation on and off on a node, listen to
        changes in the isolated node observable or set a listener with the
        <i>on-isolated-node-changed</i>
        attribute.
      </li>
    </ol>
  </>
);
