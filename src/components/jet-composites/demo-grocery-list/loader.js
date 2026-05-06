define(['ojs/ojcomposite', './viewModel', 'text!./view.html','text!./component.json',
  'css!./styles'],
  function (Composite, viewModel, view, metadata) {
    Composite.register('demo-grocery-list', {
      metadata: JSON.parse(metadata),
      viewModel: viewModel,
      view: view
    });
  }
);


