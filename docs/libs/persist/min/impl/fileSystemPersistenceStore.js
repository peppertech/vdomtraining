/**
 * Copyright (c) 2017, Oracle and/or its affiliates.
 * All rights reserved.
 */

define(["./keyValuePersistenceStore","../persistenceStoreManager","./logger"],(function(e,t,n){"use strict";var r=function(t){e.call(this,t),this._directoryName=s(t),this._directory=null};function i(e,t,n){return o().then((function(r){return r.upsert(e,n,{filename:t,metadata:n})}))}function o(){return t.openStore("fileIndex",{index:["key"],skipMetadata:!0})}function u(e,t){return new Promise((function(n,r){e._directory.getFile(t,{create:!1,exclusive:!1},(function(e){n(e)}),(function(e){e.code===FileError.NOT_FOUND_ERR||e.code===FileError.SYNTAX_ERR?n(null):r(e)}))}))}function c(e){return o().then((function(t){return t.findByKey(e)}))}function f(e){return o().then((function(t){return t.removeByKey(e)}))}function a(e,t){return u(e,t).then((function(e){return!!e&&new Promise((function(t,n){e.remove((function(){t(!0)}),(function(e){t(!1)}))}))}))}function s(e){var t=e.replace(/[<>\:"\/\\\|\?\*\~]/g,"").replace(/^\.+$/,"").replace(/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i,"").replace(/[\x00-\x1f\x80-\x9f]/g,"");return t.length>255?t.slice(0,255):t}return(r.prototype=new e).Init=function(t){var n=this;return e.prototype.Init.call(n,t).then((function(){return n._directoryName=s(n._name+n._version),new Promise((function(e,t){window.requestFileSystem(LocalFileSystem.PERSISTENT,0,(function(t){t.root.getDirectory(n._directoryName,{create:!0},(function(t){n._directory=t,e()}))}),(function(e){t(e)}))}))}))},r.prototype._insert=function(e,t,n){var r=this;return this.removeByKey(e).then((function(){n instanceof Blob?t.data_type="Blob":t.data_type="JSON";var o=r._directory.createReader();return new Promise((function(u,c){o.readEntries((function(o){for(var c=function(e){return o.filter((function(t){return t.name==e})).length>0},f=Math.floor(1e8*Math.random())+".pds";c(f);)f=Math.floor(1e8*Math.random())+".pds";(function(e,t,n,r,o){return new Promise((function(u,c){e._directory.getFile(t,{create:!0,exclusive:!1},(function(e){e.createWriter((function(e){e.onwriteend=function(){i(n,t,r).then((function(){u()}))},e.onerror=function(e){c(e)},"JSON"==r.data_type&&(o=JSON.stringify(o)),e.write(o)}))}))}))})(r,f,e,t,n).then((function(){u()}))}))}))}))},r.prototype.getItem=function(e){n.log("Offline Persistence Toolkit fileSystemPersistenceStore: getItem() with key: "+e);var t=this;return c(e).then((function(e){if(e){var n=e.filename,r=e.metadata;return u(t,n).then((function(e){if(e)return new Promise((function(t,n){e.file((function(e){var n=new FileReader;n.onloadend=function(e){var n,i,o=(n=this.result,0,i=new DataView(n.slice(0)),new Blob([i]));if("JSON"==r.data_type){var u=new FileReader;u.onloadend=function(){t({metadata:r,value:JSON.parse(this.result)})},u.readAsText(o)}else t({metadata:r,value:o})},n.readAsArrayBuffer(e)}),(function(e){n(e)}))}))}))}}))},r.prototype.removeByKey=function(e){n.log("Offline Persistence Toolkit fileSystemPersistenceStore: removeByKey() with key: "+e);var t=this;return c(e).then((function(n){return n?f(e).then((function(){return a(t,n.filename)})):Promise.resolve(!1)}))},r.prototype.keys=function(){return n.log("Offline Persistence Toolkit fileSystemPersistenceStore: keys()"),o().then((function(e){return e.keys()}))},r.prototype.deleteAll=function(){n.log("Offline Persistence Toolkit fileSystemPersistenceStore: deleteAll()");var e=this;return o().then((function(e){return e.delete()})).then((function(){var t=[],n=e._directory.createReader();return t.push(new Promise((function(r,i){n.readEntries((function(n){n.map((function(n){t.push(a(e,n.name))})),r()}))}))),Promise.all(t)}))},r.prototype.updateKey=function(e,t){return n.log("Offline Persistence Toolkit FileSystemPersistenceStore: updateKey() with currentKey: "+e+" and new key: "+t),c(e).then((function(e){if(e){var n=e.filename,r=e.metadata;return i(t,n,r)}return Promise.reject("No existing key found to update")})).then((function(){return f(e)}))},r}));