define(['ojs/ojcomposite', './viewModel', 'text!./view.html','text!./component.json', 'css!./styles',
        'ojs/ojknockout', 'ojs/ojlabel', 'ojs/ojinputtext'],
  function (Composite, viewModel, view, metadata) {
    Composite.register('demo-list', {
      metadata: JSON.parse(metadata),
      viewModel: viewModel,
      view: view
    });
  }
);


