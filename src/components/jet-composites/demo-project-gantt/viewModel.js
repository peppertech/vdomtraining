define(['knockout', 'ojs/ojknockouttemplateutils', 'ojs/ojflattenedtreedataproviderview', 'ojs/ojganttutils'],
  function (ko, KnockoutTemplateUtils, FlattenedTreeDataProviderView, GanttUtils) {
    function Model(context) {
      var element = context.element;

      // Sync Gantt and Table row heights
      var setTableRowHeight = function (height) {
        var table = element.getElementsByTagName('OJ-TABLE')[0];
        table.style.setProperty('--oj-collection-list-row-height', height + 'px');
        table.style.setProperty('--oj-collection-grid-row-height', height + 'px');
      }

      this.bindingsApplied = function () {
        setTableRowHeight(context.properties.rowDefaults.height);
      };

      this.propertyChanged = function (context) {
        if (context.property === 'rowDefaults'
            && context.subproperty
            && context.subproperty.path === 'rowDefaults.height') {
          setTableRowHeight(context.subproperty.value);
        }
      };

      // Construct table data provider and set up expanded if tree data
      var isTreeData = context.properties.rowData && context.properties.rowData.getChildDataProvider;
      if (isTreeData) {
        this.tableDataProvider = new FlattenedTreeDataProviderView(context.properties.rowData,
          { expanded: context.properties.expanded });

        // Write expanded key set back to application upon expand/collapse on the table,
        // which implicitly updates the gantt expanded property.
        var expandedObservable = this.tableDataProvider.getExpandedObservable();
        expandedObservable.subscribe(function (detail) {
          expanded = detail.value;
          context.properties.expanded = expanded;
        });
      } else {
        this.tableDataProvider = context.properties.rowData;
      }

      // need adjustment tow workaround an alignment issue with Chrome
      var userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edge') === -1) {
        element.classList.add('table-offset');
      }

      // disable animation for table when handling model mutation events since
      // Table and Gantt animation do not synchronize correctly
      this.disableAnimation = function(event) {
        event.preventDefault();
        event.detail.endCallback();
      };

      // specify the height of the column header, which is calculated based on time axis in Gantt
      this.getColumnHeaderStyle = function () {
        var table = element.getElementsByTagName('OJ-TABLE')[0];
        var gantt = element.getElementsByTagName('OJ-GANTT')[0];
        var axisInfo = { majorAxis: context.properties.majorAxis, minorAxis: context.properties.minorAxis };
        return 'height:' + GanttUtils.computeTableColumnHeaderHeight(table, gantt, axisInfo) + 'px';
      };

      // scroll position shared by ojGantt and ojTable
      this.scrollPosition = ko.observable();
    }

    return Model;
  }
)
