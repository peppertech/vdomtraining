define([],
  function () {
    var lifecycle_methods = ["initialize", "activated", "connected", "bindingsApplied", "disconnected"];

    function callback(name, logger) {
      logger.log(name);
    }

    function model (context) {
      var name = "";
      var methods = [];
      var logger;

      if (context.properties.logger) {
        logger = document.getElementById(context.properties.logger)
        if (!logger || !logger.log) {
          throw "Logger not found: " + context.properties.logger;
        }
      }
      else {
        throw "Logger must be specified";
      }
      if (context.properties.name) {
        name = context.properties.name + ": ";
      }
      if (context.properties.methods) {
        methods = context.properties.methods;
        if (!Array.isArray(methods)) {
          methods = [methods];
        }
      }

      for (var i = 0; i < lifecycle_methods.length; i++) {
        var method = lifecycle_methods[i];

        if (!methods.length || methods.indexOf(method) >= 0) {
          this[method] = callback.bind(null, name + method, logger);
        }
      }
    }

    return model;
  }
)
