define(['knockout', 'ojs/ojknockout'], function (ko) {
  function model(context) {
    this.totalRowCount = ko.observable();

    let totalCount = 0;
    const asyncIterator = context.properties.data.fetchFirst({includeFilteredRowCount:'enabled'})[Symbol.asyncIterator]();
    asyncIterator.next().then(res=>{
      totalCount = res.value.totalFilteredRowCount
      this.totalRowCount(totalCount);
    });

    this.propertyChanged = function (context) {
      const value = context.value;
      if (value.filterCriterion) {
        const filterText = value.filterCriterion.text;
        const filterCriterion = { text: filterText };

        const asyncIterator = value
          .fetchFirst({
            filterCriterion,
            includeFilteredRowCount:'enabled'
          })
          [Symbol.asyncIterator]();
        let result;
        asyncIterator.next().then((res) => {
          result = res;
          this.totalRowCount(result.value.totalFilteredRowCount);
        });
      } else {
        this.totalRowCount(totalCount);
      }
    };
  }

  return model;
});
