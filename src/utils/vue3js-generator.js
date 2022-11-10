import {
  buildActiveTabs,
  buildDefaultValueListFn,
  buildFieldOptionsFn,
  buildRulesListFn, buildUploadDataFn, buildTableViewDataFn
} from "@/utils/vue2js-generator";
import { traverseFieldWidgets } from "@/utils/util";

export const genVue3JS = function (formConfig, widgetList) {
  // console.log("🚀 ~ file: vue3js-generator.js ~ line 62 ~ genVue3JS ~ formConfig", formConfig)
  // console.log("🚀 ~ file: vue3js-generator.js ~ line 62 ~ genVue3JS ~ widgetList", widgetList)
  let defaultValueList = []
  let rulesList = []
  let fieldOptions = []
  let uploadData = []
  let tableViewData = []
  let tableViewDataHandleEvent = []
  let tablePageHooks = []
  traverseFieldWidgets(widgetList, (widget) => {
    buildDefaultValueListFn(formConfig, widgetList, defaultValueList)(widget)
    buildRulesListFn(formConfig, widgetList, rulesList)(widget)
    buildFieldOptionsFn(formConfig, widgetList, fieldOptions)(widget)
    buildUploadDataFn(formConfig, widgetList, uploadData)(widget)
    buildTableViewDataFn(formConfig, widgetList, tableViewData, tableViewDataHandleEvent, tablePageHooks)(widget)
  })

  const activeTabs = buildActiveTabs(formConfig, widgetList)

  const v3JSTemplate =
    `
    // import { loginReq } from '@/api/user'
    const state = reactive({
      ${formConfig.refName}:null,
        ${formConfig.modelName}: {
          ${defaultValueList.join('\n')}
        },
        ${formConfig.rulesName}: {
          ${rulesList.join('\n')}
        },
        
        ${activeTabs.join('\n')}
        
        ${fieldOptions.join('\n')}
        
        ${uploadData.join('\n')}

        ${tableViewData}
      })
      
    //所有的表格查询都用这个hooks
    ${tablePageHooks.length > 0 ? "import tablePageHooks from '@/hooks/useTablePage'" : ''}
    //表格分页回调函数
    ${tablePageHooks.join('\n')}
    
    ${tableViewDataHandleEvent.join('\n')}

    //提交表单
    const submitForm = () => {
      state.${formConfig.refName}.validate(valid => {
        if (!valid) return
        //TODO: 提交表单
      })
    }
    //重置表单
    const resetForm = () => {
      state.${formConfig.refName}.resetFields()
    }

    onMounted(()=>{

    })
`
  return v3JSTemplate
}


