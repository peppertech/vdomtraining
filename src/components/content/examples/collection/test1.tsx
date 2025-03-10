/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import "preact";
import { useState } from "preact/hooks";
import { List } from "./test1list";


export function Content() {
  const [viewBy, setViewBy] = useState("viewA");

  return (
    <div id="mainContent" class="oj-web-applayout-max-width oj-web-applayout-content">
      <oj-button onojAction={()=>setViewBy("viewA")}>Switch to view A</oj-button>
      <oj-button onojAction={()=>setViewBy("viewB")}>Switch to view B</oj-button>
      <hr />
      {viewBy === "viewA" && <List key="viewA" />}
      {viewBy !== "viewA" && <List key="viewB" />}
    </div>
  );
};
