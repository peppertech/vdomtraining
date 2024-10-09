/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
"use strict";

/**
 * Example of Require.js boostrap javascript
 */

(function () {
  requirejs.config({
    map: {
      "*": {
        "react": "preact/compat",
        "react-dom": "preact/compat" 
      }
  },
    // injector:baseUrl
    baseUrl: ".",
    // endinjector
    paths:
      /* DO NOT MODIFY
       ** All paths are dynamicaly generated from the path_mappings.json file.
       ** Add any new library dependencies in path_mappings json file
       */
      // injector:mainReleasePaths
      {
        ojs: "libs/oj/v11.0.0/debug",
        ojL10n: "libs/oj/v11.0.0/ojL10n",
        ojtranslations: "libs/oj/v11.0.0/resources",
        knockout: "libs/knockout/knockout-3.5.1.debug",
        "knockout-mapping": "libs/knockout/knockout.mapping-latest.debug",
        jquery: "libs/jquery/jquery-3.5.1",
        "jqueryui-amd": "libs/jquery/jqueryui-amd-1.12.1",
        text: "libs/require/text",
        hammerjs: "libs/hammer/hammer-2.0.8",
        signals: "libs/js-signals/signals",
        ojdnd: "libs/dnd-polyfill/dnd-polyfill-1.0.2",
        css: "libs/require-css/css.min",
        "css-builder": "libs/require-css/css-builder",
        normalize: "libs/require-css/normalize",
        preact: "libs/preact/dist/preact.umd",
        proj4: "libs/proj4js/dist/proj4-src",
        touchr: "libs/touchr/touchr",
        chai: "libs/chai/chai-4.2.0"
      }
    // endinjector
  });
      // locale-begin
  const localeOverride = window.localStorage.getItem("mylocale");
   if (localeOverride) {
     // set dir attribute on <html> element.
     if(localeOverride === "ar-EG"){
       document.getElementsByTagName('html')[0].setAttribute('dir','rtl');
     } else {
       document.getElementsByTagName('html')[0].setAttribute('dir','ltr');
     }
     requirejs.config({
       config: {
         ojL10n: {
           locale: localeOverride,
         },
       },
     });
   }  
  // locale-end

})();

require(["index"]);
