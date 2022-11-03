export const cardSchema = {
  type: 'card',
  category: 'container',
  icon: 'card',
  widgetList: [],
  options: {
    name: '',
    label: 'card',
    hidden: false,
    folded: false,
    showFold: true,
    cardWidth: '100%',
    shadow: 'never',
    customClass: '',
  }
}

export const tableViewSchema = {
  type: 'table-view',
  category: 'container',
  icon: 'table-view',
  widgetList: [],
  options: {
    name: '',
    label: 'tableView',
    hidden: false,
    tableViewWidth: '100%',
    tableViewHeight: '300px',
    lineHeight: 8,//行高
    showRowNumber: false,//是否显示行号
    showCheckbox: false,//是否显示复选框列
    showPagination: true,//是否显示分页
    showSmall: false,//小型分页
    showSummary: false,//是否合计
    showStripe: true,//是否斑马线
    showBorder: true,//是否显示纵向线条
    showOperationBtnCol: false,//显示操作按钮列
    customClass: '',
    column: '',
    tableData: '',
    editTableColumn: true,
    editTableData: true,
  }
}

export const alertSchema = {
  type: 'alert',
  icon: 'alert',
  formItemFlag: false,
  options: {
    name: '',
    title: 'Good things are coming...',
    type: 'info',
    description: '',
    closable: true,
    closeText: '',
    center: true,
    showIcon: false,
    effect: 'light',
    hidden: false,
    onClose: '',
    customClass: '',
  }
}
