define([],
    function () {
        function model(context) {
            this.addAnimal = function(animal) {
                // To trigger property change events for array properties,
                // create a copy of the array value, update, and set the array property
                // to the copy.
                var copy = context.properties.animals.slice();
                copy.push(animal);
                context.properties.animals = copy;
            };
        };

        return model;
    }
);


