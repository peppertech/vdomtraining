/**
  Copyright (c) 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./screen-range-detector-view.html', './screen-range-detector-viewModel', 'text!./component.json', 'css!./screen-range-detector-styles'],
  function (Composite, view, viewModel, metadata) {
    Composite.register('oj-sample-cookbook-screen-range-detector', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
