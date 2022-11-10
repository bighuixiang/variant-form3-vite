import { isNotNull, traverseContainerWidgets, traverseFieldWidgets } from "@/utils/util";
import { translate } from "@/utils/i18n";
import FormValidators, { getRegExp } from "@/utils/validators";

export function buildDefaultValueListFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const fd = fop.defaultValue
    if (isNotNull(fd)) {
      resultList.push(`${fop.name}: ${JSON.stringify(fd)},`)
    } else {
      resultList.push(`${fop.name}: null,`)
    }
  }
}

export function buildRulesListFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    let fieldRules = []
    if (!!fop.required) {
      fieldRules.push(`{
        required: true,
        message: '${translate('render.hint.fieldRequired')}',
      }`)
    }

    if (!!fop.validation) {
      let vldName = fop.validation
      if (!!FormValidators[vldName]) {
        fieldRules.push(`{
          pattern: ${eval(getRegExp(vldName))},
          trigger: ['blur', 'change'],
          message: '${fop.validationHint}'
        }`)
      } else {
        fieldRules.push(`{
          pattern: '${eval(vldName)}',
          trigger: ['blur', 'change'],
          message: '${fop.validationHint}'
        }`)
      }
    }

    //TODO: 自定义校验函数

    fieldRules.length > 0 && resultList.push(`${fop.name}: [${fieldRules.join(',')}],`)
  }
}

export function buildFieldOptionsFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const ft = fieldWidget.type
    if ((ft === 'radio') || (ft === 'checkbox') || (ft === 'select') || (ft === 'cascader')) {
      resultList.push(`${fop.name}Options: ${JSON.stringify(fop.optionItems)},`)
    }
  }
}

export function buildUploadDataFn(formConfig, widgetList, resultList) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const ft = fieldWidget.type
    if ((ft === 'picture-upload') || (ft === 'file-upload')) {
      resultList.push(`${fop.name}FileList: [],`)
      resultList.push(`${fop.name}UploadHeaders: {},`)
      resultList.push(`${fop.name}UploadData: {},`)
    }
  }
}

export function buildTableViewDataFn(formConfig, widgetList, resultList, handleEvent, tablePageHooks) {
  return function (fieldWidget) {
    const fop = fieldWidget.options
    const ft = fieldWidget.type
    if (ft === 'table-view') {
      let tvColumn = JSON.parse(fop.editTableColumn)
      // let tvData = JSON.parse(fop.editTableData)
      if (fop.showRowNumber) {
        //显示行号
        tvColumn.unshift({
          type: 'index',
          width: '66px',
          label: '序号'
        });
      }
      if (fop.showCheckbox) {
        //显示复选框
        tvColumn.unshift({
          type: 'selection',
          width: 66
        });
      }
      //是否显示操作列
      if (fop.showOperationBtnCol) {
        tvColumn.push({
          label: '操作',
          fixed: "right",
          slotName: "tvOperation"
        });
      }
      resultList.push(`${fop.name}TVColumn: ${JSON.stringify(tvColumn)}`)
      resultList.push(`${fop.name}TVData: ${fop.editTableData}`)
      if (fop.showOperationBtnCol) {
        handleEvent.push(`const ${fop.name}canteenClickDetailHandler = (row,index) => {}`)
        handleEvent.push(`const ${fop.name}ClickEditHandler = (row,index) => {}`)
        handleEvent.push(`const ${fop.name}ClickDeleteHandler = (row,index) => {}`)
      }
      // tablePageHooks.push(`import tablePageHooks from '@/hooks/useTablePage'`)
      tablePageHooks.push(`
          const ${fop.name}TVHook = tablePageHooks((val) => {
              //TOOD : 此处为表格分页数据查询接口    pageNum  pageSize  发生变化都会调用此函数  此处做分页操作
              console.log('🚀 ~ ${fop.name}TVHook  ~此处为表格数据查询接口~ TOOD  pageNum', ${fop.name}TVHook.pageNum.value)
              console.log('🚀 ~ ${fop.name}TVHook ~此处为表格数据查询接口~ TOOD pageSize', ${fop.name}TVHook.pageSize.value)
          })
      `)
    }
  }
}



export function buildActiveTabs(formConfig, widgetList) {
  let resultList = []
  const handlerFn = function (cw) {
    const cop = cw.options
    const ct = cw.type
    if (ct === 'tab') {
      cw.tabs.length > 0 && resultList.push(`'${cop.name}ActiveTab': '${cw.tabs[0].options.name}',`)
    }
  }
  traverseContainerWidgets(widgetList, handlerFn)

  return resultList
}

export const genVue2JS = function (formConfig, widgetList) {
  let defaultValueList = []
  let rulesList = []
  let fieldOptions = []
  let uploadData = []
  traverseFieldWidgets(widgetList, (widget) => {
    buildDefaultValueListFn(formConfig, widgetList, defaultValueList)(widget)
    buildRulesListFn(formConfig, widgetList, rulesList)(widget)
    buildFieldOptionsFn(formConfig, widgetList, fieldOptions)(widget)
    buildUploadDataFn(formConfig, widgetList, uploadData)(widget)
  })

  const activeTabs = buildActiveTabs(formConfig, widgetList)

  const v2JSTemplate =
    `  export default {
    components: {},
    props: {},
    data() {
      return {
        ${formConfig.modelName}: {
          ${defaultValueList.join('\n')}
        },
        
        ${formConfig.rulesName}: {
          ${rulesList.join('\n')}
        },
        
        ${activeTabs.join('\n')}
        
        ${fieldOptions.join('\n')}
        
        ${uploadData.join('\n')}
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
      submitForm() {
        this.$refs['vForm'].validate(valid => {
          if (!valid) return
          
          //TODO: 提交表单
        })
      },
      
      resetForm() {
        this.$refs['vForm'].resetFields()
      }
    }
  }`

  return v2JSTemplate
}
