define(['knockout', 'ojs/ojlabel', 'ojs/ojinputtext', 'ojs/ojknockout'],
  function (ko) {
    function model (context) {
      this.logs = ko.observable("");

      this.log = function(message)
      {
        var logs = this.logs();
        logs = logs ? logs + "\n" : "";
        this.logs(logs + message);
      }.bind(this);

      this.clear = function()
      {
        this.logs("");
      }.bind(this);
    }

    return model;
  }
)
