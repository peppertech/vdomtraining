define(['knockout', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojbutton'],
	function (ko) {
		function model(context) {
			this.currentValue = ko.observable("");
			this.totalItems = ko.pureComputed(function () {
				return { 'total': context.properties.data.length };
			});

			this.addItem = function (event) {
				// To trigger property change events for array properties,
				// create a copy of the array value, update, and set the array property
				// to the copy.
				var copy = context.properties.data.slice();
				copy.unshift(this.currentValue());
				context.properties.data = copy;
				// Clear the input text value after adding the new list item
				this.currentValue("");
			}.bind(this);
		};

		return model;
	}
);


