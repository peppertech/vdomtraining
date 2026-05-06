/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./card-view.html', './card-viewModel', 'text!./component.json', 'css!./card-styles', 'ojs/ojknockout'],
    function(Composite, view, viewModel, metadata) {
        Composite.register('oj-sample-card', {
            view: view,
            viewModel: viewModel,
            metadata: JSON.parse(metadata)
        });
    }
);