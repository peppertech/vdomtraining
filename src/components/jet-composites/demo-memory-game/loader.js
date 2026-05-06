define(['ojs/ojcomposite', 'text!./view.html', './viewModel', 'text!./component.json', 'css!./styles', 'jet-composites/demo-memory-card/loader'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('demo-memory-game', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);
