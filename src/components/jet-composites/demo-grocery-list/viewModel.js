define(['knockout', 'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojlabel',
	'ojs/ojinputtext', 'ojs/ojlistview', 'ojs/ojbutton'],
	function (ko, ArrayDataProvider) {
		// The demo-grocery-list composite is modeled after the oj-list-view
		// Using Observable Array demo.
		function model(context) {
			// Start the list off with some items for demo purposes
			this.allItems = ko.observableArray([
				{"item": "Milk"},
				{"item": "Flour"},
				{"item": "Sugar"},
				{"item": "Vanilla Extract"}
			]);
			this.dataProvider = new ArrayDataProvider(this.allItems, { 'keyAttributes': 'item' });

			this.itemToAdd = ko.observable("");
			var lastItemId = this.allItems().length;
			this.add = function () {
				if (this.itemToAdd() != "" &&
						(this.allItems().map(function(x) { return x.item; }).indexOf(this.itemToAdd()) < 0)) {
					lastItemId++;
					this.allItems.push({ "item": this.itemToAdd() });
				}
				// Clear the text box
				this.itemToAdd("");
			}.bind(this);

			this.selectedItems = ko.observableArray([]);
			this.remove = function () {
				this.selectedItems().forEach(function (id) {
					this.allItems.remove(function (item) {
						return (item.item === id);
					});
				}.bind(this));
			}.bind(this);
		}
		return model;
	}
);


