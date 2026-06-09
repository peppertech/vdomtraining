// @ts-nocheck
import { h } from 'preact';

export const chartDrillingSampleRecipe = (
  <>
    <ol>
      <li>
        Set the
        {" "}
        <b><i>drilling</i></b>
        {" "}
        attribute to either
        {" "}
        <i>groupsOnly</i>
        ,
        <i>seriesOnly</i>
        , or
        {" "}
        <i>on</i>
        . See the
        {" "}
        <a href={"#"}>
          Drilling Events demo page
        </a>
        {" "}
        for more details.
      </li>
      <li>
        Listen to the
        {" "}
        <b><i>drill</i></b>
        {" "}
        event and handle it as needed.
      </li>
    </ol>
  </>
);
