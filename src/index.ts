/**
 * @license
 * Copyright (c) 2014, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
// injector:preactDebugImport
// endinjector
import './components/app';
// import './components/demo-layout-template';
declare global {
namespace preact.JSX {
      interface IntrinsicElements {
      [tagName: `demo-${string}`]: any;
      }
    }
  }
