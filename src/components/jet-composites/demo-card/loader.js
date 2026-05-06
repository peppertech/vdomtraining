define(['ojs/ojcomposite', 'text!./view.html', './viewModel', 'text!./component.json', 'css!./styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('demo-card', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
