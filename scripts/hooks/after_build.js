/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/

"use strict";
const fs = require("fs");

module.exports = function (configObj) {
  return new Promise((resolve, reject) => {
    console.log("Running after_build hook.");
    console.log("buildType: ", configObj.buildType);
    if (configObj.buildType == "release") {
      console.log("Copying files to docs");
      fs.cpSync("web", "docs", { recursive: true });
      console.log("Finished copy.");
    }
    resolve(configObj);
  });
};
