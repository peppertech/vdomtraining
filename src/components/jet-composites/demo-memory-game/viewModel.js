define(['knockout', 'ojs/ojknockout'],
  function (ko) {
    function model (context) {
      var element = context.element;
      var firstCard, firstValue, secondCard;
      var matches = 0;
      this.gameMsg = ko.observable('Memory card game. Try and match pairs of cards.');

      // Listen to the stamped cards' cardClick custom event
      element.addEventListener('cardClick', checkMatch.bind(this));

      /**
       * Randomly arranges an array of objects.
       * @param  {Array} array The array to shuffle
       * @return {Array} The shuffled array
       */
      this.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      };

      /**
       * Creates pairs of cards from a given array of card objects and returns the shuffled array of cards.
       * @param  {Array<String>} cards The array of card objects
       * @return {Array<String>} The shuffled cards
       */
      var createCards = function(cards) {
        var orderedCards = [];
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          // Create the pair of cards
          orderedCards.push(card);
          orderedCards.push(card);
        }
        return this.shuffle(orderedCards);
      }.bind(this);

      // Create and shuffle the pairs of cards
      this.cards = ko.observable(createCards(context.properties.cards));
      var pairs = context.properties.cards.length;

      /**
       * Checks to see whether a pair of cards is a match.
       * @param  {MouseEvent} event The mouse click event
       */
      function checkMatch(event) {
        // Remove the card's click listener once it's been clicked
        event.target.enableFlip(false);

        if (firstValue) {
          // Update attempts property
          context.properties.attempts++;
        }

        if (!firstValue) {
          firstCard = event.target;
          firstValue = event.detail.value;
        }
        else if (firstValue === event.detail.value) {
          this.gameMsg("Pair matches. " + context.properties.attempts + " attempts made.");
          firstValue = null;
          matches++;
        } else {
          firstValue = null;
          var oldCard = firstCard;
          this.gameMsg("Pair not a match. Resetting. " + context.properties.attempts + " attempts made.");
          // Reset the mismatched pair on a timeout so player has time to look at the cards
          window.setTimeout(function() {
            oldCard.flipCard();
            event.target.flipCard();
            event.target.enableFlip(true);
            oldCard.enableFlip(true);
          }, 1200);
        }

        if (pairs === matches) {
          context.properties.hasWon = true;
          this.gameMsg("All pairs matched. You've won. " + context.properties.attempts + " attempts made.");
        }
      };

    }

    return model;
  }
)
