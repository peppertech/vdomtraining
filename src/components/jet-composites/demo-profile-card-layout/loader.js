/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./demo-profile-card-layout-view.html', './demo-profile-card-layout-viewModel', 'text!./component.json', 'css!./demo-profile-card-layout-styles', 'ojs/ojknockout'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('demo-profile-card-layout', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
