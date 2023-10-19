/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/

"use strict";

module.exports = function (configObj) {
  // function urlRewriteMiddleware(req, res, next) {
  //   const matchStaticFiles = req.url.match(/\/(js|css)\/.*/);
  //   req.url = matchStaticFiles ? matchStaticFiles[0] : '/';
  //   next();
  // }

  return new Promise((resolve, reject) => {
    console.log("Running before_serve hook.");
    // ojet custom connect and serve options
    // { connectOpts, serveOpts } = configObj;
    // const express = require('express');
    // const http = require('http');
    // pass back custom http
    // configObj['http'] = http;
    // pass back custom express app
    //configObj['express'] = express();
    // pass back custom options for http.createServer
    // const serverOptions = {...};
    // configObj['serverOptions'] = serverOptions;
    // pass back custom server
    // configObj['server'] = http.createServer(serverOptions, express());
    // const tinylr = require('tiny-lr');
    // pass back custom live reload server
    // configObj['liveReloadServer'] = tinylr({ port: PORT });
    // pass back a replacement set of middleware
    // configObj['middleware'] = [...];
    // pass back a set of middleware that goes before the default middleware
    // configObj['preMiddleware'] = [...];
    // pass back a set of middleware that goes after the default middleware
    // configObj['postMiddleware'] = [...];

    // configObj['preMiddleware'] = [urlRewriteMiddleware]

    // const clean = (url) => {
    //   if (url.length > 1) {
    //     const cleanedUrl = url.endsWith("/")
    //       ? url.slice(0, url.length - 1)
    //       : url;
    //     console.log("clean: ", cleanedUrl);
    //     return cleanedUrl;
    //   } else {
    //     return url;
    //   }
    // };

    // function urlRewriteMiddleware(req, res, next) {
    //   console.log("files: ", req.url);
    //   const matchStaticFiles = req.url.match(
    //     /^(\/modules|\/bindings|\/examples)$/
    //   );
    //   console.log("match: ", matchStaticFiles);
    //   req.url = matchStaticFiles ? "/index.html" : clean(req.url);
    //   console.log("updated url: ", req.url);
    //   next();
    // }

    // configObj["preMiddleware"] = [urlRewriteMiddleware];
    resolve(configObj);
  });
};
