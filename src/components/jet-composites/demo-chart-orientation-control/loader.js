define(['ojs/ojcomposite', 'text!./view.html', './viewModel', 'text!./component.json', 'css!./styles', 'ojs/ojbutton'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('demo-chart-orientation-control', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
