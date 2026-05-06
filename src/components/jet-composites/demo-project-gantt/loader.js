define(['ojs/ojcomposite', 'text!./view.html', './viewModel', 'text!./component.json', 'css!./styles', 'ojs/ojknockout', 'ojs/ojtable', 'ojs/ojgantt'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('demo-project-gantt', {
      view: view,
      viewModel: viewModel, 
      metadata: JSON.parse(metadata)
    });
  }
);
