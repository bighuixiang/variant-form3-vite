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
    editTableColumnTx: '',//图形编辑列按钮
    slotTemplate: 'test',//插槽内容编辑
    editTableColumn: JSON.stringify([
      {
        label: '名字',
        prop: 'name',
        slotName: 'test',
        isShow: true,
      },
      {
        prop: 'date',
        label: '日期',
        isShow: true,
      },
      {
        prop: 'address',
        label: '地址',
        isShow: true,
      }
    ], null, 4),
    editTableData: JSON.stringify([
      {
        date: '2016-05-02',
        name: '佘太君',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-01',
        name: '王小帅',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小呆',
        address: '上海市普陀区金沙江路 1516 弄'
      }
    ], null, 4),
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
