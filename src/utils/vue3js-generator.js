import {
  buildActiveTabs,
  buildDefaultValueListFn,
  buildFieldOptionsFn,
  buildRulesListFn, buildUploadDataFn
} from "@/utils/vue2js-generator";
import { traverseFieldWidgets } from "@/utils/util";

export const genVue3JS = function (formConfig, widgetList) {
  // console.log("🚀 ~ file: vue3js-generator.js ~ line 62 ~ genVue3JS ~ formConfig", formConfig)
  console.log("🚀 ~ file: vue3js-generator.js ~ line 62 ~ genVue3JS ~ widgetList", widgetList)
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

  const v3JSTemplate =
    `
    import { loginReq } from '@/api/user
    
    //所有的表格查询都用这个hooks
    //import tablePageHooks from '@/hooks/useTablePage'
    //const { pageNum, pageSize, handleCurrentChange, handleSizeChange } = tablePageHooks((val) => {
    //  //TOOD : 此处为表格数据查询接口    currentPage  pageSize  发生变化都会调用此函数
    //  console.log('🚀 ~ file: Table.vue ~ line 51 ~此处为表格数据查询接口~ TOOD  pageNum', pageNum.value)
    //  console.log('🚀 ~ file: Table.vue ~ line 51 ~此处为表格数据查询接口~ TOOD pageSize', pageSize.value)
    //})

    //const ${formConfig.refName} = ref(null)
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
      })
      
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

    onMouted(()=>{

    })
`
  return v3JSTemplate
}


