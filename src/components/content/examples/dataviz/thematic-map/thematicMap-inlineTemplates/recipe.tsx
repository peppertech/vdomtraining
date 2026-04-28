// @ts-nocheck
import { h } from 'preact';

export const thematicMapInlineTemplatesRecipe = (
  <>
    <ol>
      <li>
        Create a template element with the slot attribute set to
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#markerContentTemplate"}>
          markerContentTemplate
        </a>
        .
      </li>
      <li>Populate the template element with the desired HTML content.</li>
      <li>
        Template content will have access to a
        <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#RendererContext"}>RendererContext</a>
        via the $current property as well as via any data-oj-as alias provided on the template element.
      </li>
      <li>
        To customize hover, selection and keyboard focus effects for the marker, modify the contents of
        the template based on the marker's state which is passed via the context.
      </li>
      <li>
        To apply the default hover, selection and keyboard focus effects add
        <i><b>data-oj-default-hover</b></i>
        ,
        <i><b>data-oj-default-selection</b></i>
        and/or
        <i><b>data-oj-default-focus</b></i>
        attributes, respectively, on the template.
      </li>
      <li>
        <b>Keyboarding</b>
        : Navigate the data using the standard Thematic Map keyboard shortcuts for data items.
      </li>
      <li>
        The oj-thematic-map-marker
        <code>location</code>
        ,
        <code>x</code>
        and
        <code>y</code>
        attributes will be used to determine the stamp placement within the Thematic Map. The
        <code>short-desc</code>
        attribute will be used for accessibility. No other existing marker attributes will be used by
        the Thematic Map when a knockout template is provided.
      </li>
    </ol>
  </>
);
