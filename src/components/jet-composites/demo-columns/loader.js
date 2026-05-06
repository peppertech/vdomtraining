define(['ojs/ojcomposite', 'text!./view.html', 'text!./component.json', 'css!./styles', 'ojs/ojknockout'],
  function(Composite, view, metadata) {
    Composite.register('demo-columns', {
      view: view,
      metadata: JSON.parse(metadata)
    });
  }
);
