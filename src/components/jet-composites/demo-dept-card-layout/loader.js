/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./demo-dept-card-layout-view.html', './demo-dept-card-layout-viewModel', 'text!./component.json', 'css!./demo-dept-card-layout-styles', 'ojs/ojknockout'],
  function (Composite, view, viewModel, metadata) {
    Composite.register('demo-dept-card-layout', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
