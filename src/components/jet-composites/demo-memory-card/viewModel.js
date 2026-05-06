define(['knockout', 'ojs/ojknockout'],
  function (ko) {
    function model (context) {
      var element = context.element;
      var flipMessage = "Flip card."
      this.cardMessage = ko.observable(flipMessage);
      var flipContainer;

      /**
       * Flips a card
       */
      this.flipCard = function() {
        // Toggle pressed state and message for accessibility
        var bFlipped = flipContainer.getAttribute('aria-pressed') === 'true';
        if (bFlipped)
          this.cardMessage(flipMessage);
        else
          this.cardMessage("Card value: " + context.properties.value);
        flipContainer.setAttribute('aria-pressed', bFlipped ? 'false' : 'true');
        flipContainer.classList.toggle('demo-memory-card-flipped');
      }.bind(this);

      /**
       * Click listener to toggle card flipping and fires a cardClick event.
       * @param  {MouseEvent} event The click event
       */
      var clickCard = function(event) {
        if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13)) {
          // Flip card
          this.flipCard();

          // Fire a custom cardClick event
          var params = {
            'bubbles': true,
            'detail': {'value': element.value}
          };
          element.dispatchEvent(new CustomEvent('cardClick', params));
        }
      }.bind(this);

      /**
       * Adds a click listener to allow card flipping.
       */
      function addListener() {
        flipContainer.addEventListener('click', clickCard);
        flipContainer.addEventListener('keypress', clickCard);
      };

      /**
       * Removes a click listener to allow card flipping.
       */
      function removeListener() {
        flipContainer.removeEventListener('click', clickCard);
        flipContainer.removeEventListener('keypress', clickCard);
      };

      /**
       * Adds or removes a click listener on card to allow card flipping.
       * @param  {boolean} bEnable True if card flipping should be enabled.
       */
      this.enableFlip = function(bEnable) {
        if (bEnable)
          addListener();
        else
          removeListener();
      };

      // Composite lifecycle listener
      this.connected = function(context) {
        // It's better to look for View elements using a selector
        // instead of by DOM node order which isn't guaranteed.
        flipContainer = element.querySelector('.demo-memory-card-flip-container');
        // We want to attach the click listener to a child element of the composite that's defined in the View,
        // so we need to wait until the composite's View has been attached to the DOM to aceess that child element.
        addListener();
      };
    }

    return model;
  }
)
