define(['ojs/ojcomposite', './viewModel', 'text!./view.html','text!./component.json', 'css!./styles'],
  function (Composite, viewModel, view, metadata) {
    Composite.register('demo-zoo', {
      metadata: JSON.parse(metadata),
      viewModel: viewModel,
      view: view
    });
  }
);


