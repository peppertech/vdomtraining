define(['ojs/ojknockout', 'ojs/ojcontext'],
  function() {
    function viewModel() {
      var sizes = ['oj-masonrylayout-tile-1x1',
                   'oj-masonrylayout-tile-1x2',
                   'oj-masonrylayout-tile-1x3',
                   'oj-masonrylayout-tile-2x1',
                   'oj-masonrylayout-tile-2x2',
                   'oj-masonrylayout-tile-2x3',
                   'oj-masonrylayout-tile-3x1',
                   'oj-masonrylayout-tile-3x2'];

      /**
       * Optional ViewModel method will be invoked after the bindings are applied on the View.
       * @param {Object} context - An object with composite component properties
       */
      this.bindingsApplied = function(context) {
        // tile element
        var tile = context.element;
        if (!tile.id) {
          tile.setAttribute("id", context.unique);
        }

        var masonryLayout = tile.parentElement;
        var busyContext = oj.Context.getContext(masonryLayout).getBusyContext();

        busyContext.whenReady().then(function () {
          // calculate random tile size
          var size = sizes[parseInt(sizes.length * Math.random())];

          // resize tile if the tile size is not 1x1
          if (size != 'oj-masonrylayout-tile-1x1') {
            // attach resize listener to the tile
            var listener = function(event) {
              if (event.detail.tile === tile) {
                masonryLayout.removeEventListener('ojResize', listener);
                _displayContent(tile);
              }
            }
            masonryLayout.addEventListener('ojResize', listener);
            // Artificial delay to force tiles to pop in at different times
            window.setTimeout(function () {
              masonryLayout.resizeTile("#" + tile.id, size);
            }, parseInt(5000 * Math.random()));
          } else {
            // no resize, display immediately
            _displayContent(tile);
          }
        });
      };

      /**
       * Display the tile content.
       * @param {Object} tile - Tile DOM element
       */
      function _displayContent(tile) {
        tile.classList.add("tile-loaded");
      }
    }
    return viewModel;
  }
);
