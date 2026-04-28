/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./view.html', 'text!./component.json', 'css!./styles', 'ojs/ojradioset'],
  function(Composite, view, metadata) {
    Composite.register('demo-radioset-enum', {
      view: view,
      metadata: JSON.parse(metadata)
    });
  }
);
