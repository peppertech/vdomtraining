define(['ojs/ojcomposite', 'text!./view.html', 'text!./component.json', 'css!./styles', 'ojs/ojbutton', 'ojs/ojknockout'],
  function(Composite, view, metadata) {
    Composite.register('demo-chart-three-d-effect-control', {
      view: view,
      metadata: JSON.parse(metadata)
    });
  }
);
