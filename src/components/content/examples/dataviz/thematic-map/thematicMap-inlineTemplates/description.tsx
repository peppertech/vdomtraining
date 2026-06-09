// @ts-nocheck
import { h } from 'preact';

export const thematicMapInlineTemplatesDescription = (
  <>
    <p>A thematic map is an interactive data visualization that displays data corresponding to geographic locations or regions.
                 Applications are required to supply a mapProvider for a valid thematic map.</p><p>
      This demo shows how to render custom SVG content for Thematic Map markers using the
      {" "}
      <b>markerContentTemplate</b>
      {" "}
      slot. The same template is used for rendering the base marker content and for creating custom
      selection, hover and focus effects. The
      {" "}
      <b>markerContentTemplate</b>
      {" "}
      slot is used when the states change and the appropriate state is indicated by the
      {" "}
      <i><b>state</b></i>
      {" "}
      property in the slot's
      {" "}
      <a target={"_blank"} href={"jsdocs/oj.ojThematicMap.html#RendererContext"}>context</a>
      . You can add
      {" "}
      <i><b>data-oj-default-focus</b></i>
      ,
      <i><b>data-oj-default-hover</b></i>
      {" "}
      and/or
      {" "}
      <i><b>data-oj-default-selection</b></i>
      {" "}
      attributes to the template in order to get the default effects for the corresponding states.
    </p>
  </>
);
