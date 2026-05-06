define(['knockout', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojcollapsible'],
  function (ko) {
    function model (context) {

      // Assign button icon based on item type.
      this.headerIcon = function (type) {
        var iconClass;
        switch (type) {
          case 'Ping':
            iconClass = 'oj-fwk-icon-calendar';
            break;
          case 'Call':
            iconClass = 'oj-fwk-icon-caret02-end';
            break;
          case 'Send':
            iconClass = 'oj-fwk-icon-caret02end-end';
            break;
          case 'Followup':
            iconClass = 'oj-fwk-icon-magnifier';
            break;
          case 'Suggestion':
            iconClass = 'oj-fwk-icon-help';
          default:
            iconClass = 'oj-fwk-icon-checkmark';
        }
        return 'oj-fwk-icon ' + iconClass;
      };

      /**
       * The item button action handler.
       * Dispatches an 'itemAction' event on the demo-activity-stream-container component,
       * so that application specified callback can be used to handle the action.
       * @param {Event} event The action event.
       * @param {object} btnContext The button binding context.
       */
      this.buttonHandler = function (event, btnContext) {
        event.detail.originalEvent.stopPropagation();

        var params = {
          'bubbles': true,
          'detail': {
            'itemContext': context.properties.itemContext,
            'section': context.properties.section
          }
        };

        // Dispatch an 'itemAction' event with the params payload.
        // The event will bubble up to the demo-activity-stream-container element,
        // where the application specified handler will be used to handle it.
        context.element.dispatchEvent(new CustomEvent('itemAction', params));
      };

    }

    return model;
  }
)
