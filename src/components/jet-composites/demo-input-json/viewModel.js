define(['ojs/ojknockout', 'ojs/ojinputtext'],
  function () {

    function model (context) {
      this.jsonConverter = {
        format: function(value) {
          if (value === '' || value == null || value === undefined){
            return '';
          }
          else{
            return JSON.stringify(value); 
          }
        },
        parse: function(value) { 
          if (value === ''){
            return null;
          }
          else{
            return JSON.parse(value); 
          }
        }
      };
    }

    return model;
  }
)
