/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/

"use strict";

module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
    console.log("Patching optimizer paths for react-router");
    configObj.requireJs.paths["react-router"] = "empty:";
    configObj.requireJs.paths["react-router-dom"] = "empty:";
    configObj.requireJs.paths["@remix-run"] = "empty:";

    console.log("Patching re-mapping for react-compat");
    configObj.requireJs.map = {
      "*": {
        react: "preact/compat",
        "react-dom": "preact/compat",
      },
    };

    console.log("Running before_optimize hook.");
    resolve(configObj);
  });
};
