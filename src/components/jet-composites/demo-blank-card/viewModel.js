define(['knockout', 'ojs/ojknockout'],
  function (ko) {
    function model (context) {
      this.isFront = ko.observable(true);

      /**
       * Flips a card
       * @param  {MouseEvent} event The click event
       */
      this.flipCard = function(event) {
        if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13)) {
          this.isFront(!this.isFront());
        }
      }.bind(this);
    }

    return model;
  }
)
