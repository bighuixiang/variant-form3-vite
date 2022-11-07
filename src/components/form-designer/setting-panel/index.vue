<template>
  <el-container class="panel-container">
    <el-tabs :active-name="activeTab" style="height: 100%; overflow: hidden">
      <el-tab-pane :label="i18nt('designer.hint.widgetSetting')" name="1">
        <el-scrollbar class="setting-scrollbar" :style="{ height: scrollerHeight }">

          <template v-if="!!designer.selectedWidget && !designer.selectedWidget.category">
            <el-form :model="optionModel" size="small" label-position="left" label-width="120px" class="setting-form"
                     @submit.prevent>
              <el-collapse v-model="widgetActiveCollapseNames" class="setting-collapse">
                <el-collapse-item name="1" v-if="showCollapse(commonProps)"
                                  :title="i18nt('designer.setting.commonSetting')">
                  <template v-for="(editorName, propName) in commonProps">
                    <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                               :designer="designer" :selected-widget="selectedWidget" :option-model="optionModel">
                    </component>
                  </template>
                </el-collapse-item>

                <el-collapse-item name="2" v-if="showCollapse(advProps)"
                                  :title="i18nt('designer.setting.advancedSetting')">
                  <template v-for="(editorName, propName) in advProps">
                    <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                               :designer="designer" :selected-widget="selectedWidget" :option-model="optionModel">
                    </component>
                  </template>
                </el-collapse-item>

                <el-collapse-item name="3" v-if="showEventCollapse() && showCollapse(eventProps)"
                                  :title="i18nt('designer.setting.eventSetting')">
                  <template v-for="(editorName, propName) in eventProps">
                    <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                               :designer="designer" :selected-widget="selectedWidget" :option-model="optionModel">
                    </component>
                  </template>
                </el-collapse-item>
              </el-collapse>

            </el-form>
          </template>

          <template v-if="(!!designer.selectedWidget && !!designer.selectedWidget.category)">
            <el-form :model="optionModel" size="small" label-position="left" label-width="120px" class="setting-form"
                     @submit.prevent>
              <el-collapse v-model="widgetActiveCollapseNames" class="setting-collapse">
                <el-collapse-item name="1" v-if="showCollapse(commonProps)"
                                  :title="i18nt('designer.setting.commonSetting')">
                  <template v-for="(editorName, propName) in commonProps">
                    <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                               :designer="designer" :selected-widget="selectedWidget" :option-model="optionModel">
                    </component>
                  </template>
                </el-collapse-item>

                <el-collapse-item name="2" v-if="showCollapse(advProps)"
                                  :title="i18nt('designer.setting.advancedSetting')">
                  <template v-for="(editorName, propName) in advProps">
                    <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                               :designer="designer" :selected-widget="selectedWidget" :option-model="optionModel">
                    </component>
                  </template>
                </el-collapse-item>

                <el-collapse-item name="3" v-if="showEventCollapse() && showCollapse(eventProps)"
                                  :title="i18nt('designer.setting.eventSetting')">
                  <template v-for="(editorName, propName) in eventProps">
                    <component v-if="hasPropEditor(propName, editorName)" :is="getPropEditor(propName, editorName)"
                               :designer="designer" :selected-widget="selectedWidget" :option-model="optionModel">
                    </component>
                  </template>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </template>

        </el-scrollbar>
      </el-tab-pane>

      <el-tab-pane v-if="!!designer" :label="i18nt('designer.hint.formSetting')" name="2">
        <el-scrollbar class="setting-scrollbar" :style="{ height: scrollerHeight }">
          <form-setting :designer="designer" :form-config="formConfig"></form-setting>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>

    <div v-if="showWidgetEventDialogFlag" class=""
         v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']">
      <el-dialog :title="i18nt('designer.setting.editWidgetEventHandler')" v-model="showWidgetEventDialogFlag"
                 :show-close="true" custom-class="drag-dialog small-padding-dialog" :close-on-click-modal="false"
                 :close-on-press-escape="false" :destroy-on-close="true">
        <el-alert type="info" :closable="false" :title="eventHeader"></el-alert>
        <code-editor :mode="'javascript'" :readonly="false" v-model="eventHandlerCode" ref="ecEditor"></code-editor>
        <el-alert type="info" :closable="false" title="}"></el-alert>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showWidgetEventDialogFlag = false">
              {{ i18nt('designer.hint.cancel') }}</el-button>
            <el-button type="primary" @click="saveEventHandler">
              {{ i18nt('designer.hint.confirm') }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <div v-if="showWidgetEditCodeDialogFlag" class=""
         v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']">
      <el-dialog width="80%" title="编辑代码" v-model="showWidgetEditCodeDialogFlag" :show-close="true"
                 custom-class="drag-dialog small-padding-dialog" :close-on-click-modal="false"
                 :close-on-press-escape="false" :destroy-on-close="true">
        <!-- <el-alert type="info" :closable="false" :title="eventHeader"></el-alert> -->
        <code-editor sytle="height:865px" :mode="'json'" :readonly="false" v-model="eventHandlerCode" ref="ecEditor">
        </code-editor>
        <!-- <el-alert type="info" :closable="false" title="}"></el-alert> -->
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showWidgetEditCodeDialogFlag = false">
              {{ i18nt('designer.hint.cancel') }}</el-button>
            <el-button type="primary" @click="saveEventHandler">
              {{ i18nt('designer.hint.confirm') }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div v-if="showWidgetEditSlotTemplateCodeDialogFlag" class=""
         v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']">
      <el-dialog width="80%" title="编辑具名插槽代码" v-model="showWidgetEditSlotTemplateCodeDialogFlag" :show-close="true"
                 custom-class="drag-dialog small-padding-dialog" :close-on-click-modal="false"
                 :close-on-press-escape="false" :destroy-on-close="true">
        <code-editor sytle="height:865px" :userWorker="false" :readonly="false" v-model="soltTemplateCode"
                     ref="ecEditor">
        </code-editor>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showWidgetEditSlotTemplateCodeDialogFlag = false">
              {{ i18nt('designer.hint.cancel') }}</el-button>
            <el-button type="primary" @click="saveEventHandler">
              {{ i18nt('designer.hint.confirm') }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

    <div v-if="showWidgetEditTableDialogFlag" class=""
         v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']">
      <el-dialog width="80%" title="表格编辑列" v-model="showWidgetEditTableDialogFlag" :show-close="true"
                 custom-class="drag-dialog small-padding-dialog" :close-on-click-modal="false"
                 :close-on-press-escape="false" :destroy-on-close="true">
        <div class="flex flex-middle">
          <el-button @click="addNewCol" type="primary" round icon="el-icon-edit" size="small">新增列</el-button>
          <el-button @click="editSlotTemplate" type="info" plain round icon="el-icon-edit" size="small">编辑表格插槽代码
          </el-button>
        </div>
        <el-table style="margin-top: 12px;" :data="tableData" stripe border height="586px">
          <el-table-column type="index" />
          <el-table-column label="字段名称" width="120">
            <template #default="scope">
              <el-input v-model="tableData[scope.$index].prop" placeholder="请输入内容" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="显示名称" width="120">
            <template #default="scope">
              <el-input v-model="tableData[scope.$index].label" placeholder="请输入内容" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="列宽(px/%)" width="120">
            <template #default="scope">
              <el-input v-model="tableData[scope.$index].colWidth" placeholder="请输入内容" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="显示" width="68">
            <template #default="scope">
              <el-switch v-model="tableData[scope.$index].isShow" />
            </template>
          </el-table-column>
          <el-table-column label="排序" width="68">
            <template #default="scope">
              <el-switch v-model="tableData[scope.$index].isSort" />
            </template>
          </el-table-column>
          <el-table-column label="是否固定" width="120">
            <template #default="scope">
              <el-select v-model="tableData[scope.$index].isFixed" placeholder="请选择" clearable>
                <el-option v-for="item in ['false', 'left', 'right']" :key="item" :label="item" :value="item" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="对齐方式">
            <template #default="scope">
              <el-select v-model="tableData[scope.$index].align" placeholder="请选择" clearable>
                <el-option v-for="item in ['left', 'center', 'right']" :key="item" :label="item" :value="item" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="格式化" width="180">
            <template #default="scope">
              <el-select v-model="tableData[scope.$index].cloFormat" placeholder="请选择" clearable>
                <el-option-group v-for="group in cloFormatOptions" :key="group.label" :label="group.label">
                  <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
                </el-option-group>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="渲染函数">
            <template #default="scope">
              <el-button v-if="tableData[scope.$index].cloFormat !== 'slot'" type="info" plain
                         :disabled="tableData[scope.$index].cloFormat !== 'render'" round icon="el-icon-edit"
                         size="small">编辑render函数</el-button>

              <el-input v-else placeholder="请输入插槽具名" clearable></el-input>

            </template>
          </el-table-column>
          <el-table-column label="操作(列排序)" width="190">
            <template #default="scope">
              <el-button :disabled="scope.$index === 0" type="text" @click.stop="sortUp(scope.$index, scope.row)">↑
              </el-button>
              <el-button :disabled="scope.$index === tableData.length - 1" type="text"
                         @click.stop="sortDown(scope.$index, scope.row)">↓</el-button>
              <el-button :disabled="scope.$index === 0" type="text" @click.stop="sortTop(scope.$index, scope.row)">置顶
              </el-button>
              <el-button :disabled="scope.$index === tableData.length - 1" type="text"
                         @click.stop="sortEnd(scope.$index, scope.row)">置底</el-button>

              <el-tooltip effect="light">
                <el-button type="text">删除</el-button>
                <template #content>
                  <el-button type="text" @click.stop="deleteRow(scope.$index, scope.row)">确认</el-button>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="showWidgetEditTableDialogFlag = false">
              {{ i18nt('designer.hint.cancel') }}</el-button>
            <el-button type="primary" @click="saveEventHandler">
              {{ i18nt('designer.hint.confirm') }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

  </el-container>
</template>

<script>
import CodeEditor from '@/components/code-editor/index'
import PropertyEditors from './property-editor/index'
import FormSetting from './form-setting'
import WidgetProperties from './propertyRegister'
import {
  addWindowResizeHandler,
} from "@/utils/util"
import i18n from "@/utils/i18n"
import eventBus from "@/utils/event-bus"
import emitter from "@/utils/emitter";
import { propertyRegistered } from "@/components/form-designer/setting-panel/propertyRegister";

const { COMMON_PROPERTIES, ADVANCED_PROPERTIES, EVENT_PROPERTIES } = WidgetProperties

export default {
  name: "SettingPanel",
  componentName: "SettingPanel",
  mixins: [i18n, emitter],
  components: {
    CodeEditor,
    FormSetting,
    ...PropertyEditors,
  },
  props: {
    designer: Object,
    selectedWidget: Object,
    formConfig: Object,
  },
  inject: ['getDesignerConfig'],
  data() {
    return {
      designerConfig: this.getDesignerConfig(),

      scrollerHeight: 0,

      activeTab: "2",
      widgetActiveCollapseNames: ['1', '3'], //['1', '2', '3'],
      formActiveCollapseNames: ['1', '2'],

      commonProps: COMMON_PROPERTIES,
      advProps: ADVANCED_PROPERTIES,
      eventProps: EVENT_PROPERTIES,

      showWidgetEventDialogFlag: false,
      eventHandlerCode: '',
      curEventName: '',
      eventHeader: '',

      subFormChildWidgetFlag: false,
      showWidgetEditCodeDialogFlag: false,//展示按钮  编辑弹窗
      showWidgetEditTableDialogFlag: false,//展示按钮  编辑弹窗
      showWidgetEditSlotTemplateCodeDialogFlag: false,//展示按钮  编辑弹窗
      soltTemplateCode: '',
      column: [],
      tableData: [],
      tbForm: {
        name: '',
      },
      cloFormatOptions: [
        {
          label: '动态渲染',
          options: [
            {
              value: 'render',
              label: 'render',
            },
            {
              value: 'slot',
              label: 'slot',
            },
          ],
        },
        {
          label: '时间格式化',
          options: [
            {
              value: 'yyyy-MM-dd',
              label: 'yyyy-MM-dd',
            },
            {
              value: 'yyyy/MM/dd',
              label: 'yyyy/MM/dd',
            },
            {
              value: 'yyyy年MM月dd日',
              label: 'yyyy年MM月dd日',
            },
            {
              value: 'yyyy-MM-dd HH:mm:ss',
              label: 'yyyy-MM-dd HH:mm:ss',
            }, {
              value: 'yyyy-MM-dd hh:mm:ss',
              label: 'yyyy-MM-dd hh:mm:ss',
            },
          ],
        },
        {
          label: '数字格式化',
          options: [
            {
              value: '###,###,###,##0.######',
              label: 'render',
            },
            {
              value: '###,###,###,##0.00####',
              label: 'render',
            },
            {
              value: '###,###,###,##0.000000',
              label: 'render',
            },
            {
              value: '###,###,###,##0.000',
              label: 'render',
            },
            {
              value: '###,###,###,##0.00',
              label: 'render',
            },
            {
              value: '###,###,###,##0',
              label: 'render',
            },
            {
              value: '###,##0.00##%',
              label: 'render',
            },
          ],
        },
      ]
    }
  },
  computed: {
    optionModel: {
      get() {
        return this.selectedWidget.options
      },

      set(newValue) {
        this.selectedWidget.options = newValue
      }
    },
    // tableData() {
    //   let result = [];
    //   if (this.selectedWidget.options['editTableColumn']) {
    //     result = JSON.parse(this.selectedWidget.options['editTableColumn'])
    //   }
    //   console.log(this.selectedWidget.options['editTableColumn'])
    //   return result;
    // }
  },
  watch: {
    'designer.selectedWidget': {
      handler(val) {
        if (!!val) {
          this.activeTab = "1"
        }
      }
    },

    'selectedWidget.options': {  //组件属性变动后，立即保存表单JSON！！
      deep: true,
      handler() {
        this.designer.saveCurrentHistoryStep()
      }
    },

    formConfig: {
      deep: true,
      handler() {
        this.designer.saveCurrentHistoryStep()
      }
    },

  },
  created() {
    this.on$('editEventHandler', (eventParams) => {
      //debugger
      this.editEventHandler(eventParams[0], eventParams[1])
    })

    this.on$('editEditCodeButtonHandler', (eventParams) => {
      //debugger
      this.editEditCodeButtonHandler(eventParams[0], eventParams[1])
    })

    this.designer.handleEvent('form-css-updated', (cssClassList) => {
      this.designer.setCssClassList(cssClassList)
    })
  },
  mounted() {
    if (!this.designer.selectedWidget) {
      this.activeTab = "2"
    } else {
      this.activeTab = "1"
    }

    this.scrollerHeight = window.innerHeight - 56 - 48 + 'px'
    addWindowResizeHandler(() => {
      this.$nextTick(() => {
        this.scrollerHeight = window.innerHeight - 56 - 48 + 'px'
        //console.log(this.scrollerHeight)
      })
    })
  },
  methods: {
    //编辑具名插槽的值
    editSlotTemplate() {
      this.soltTemplateCode = this.selectedWidget.options['slotTemplate'] || ''
      this.showWidgetEditSlotTemplateCodeDialogFlag = true;
    },
    //新增列
    addNewCol() {
      this.tableData.push({
        isShow: true
      });
    },
    //上移
    sortUp(index, row) {
      let temp = this.tableData[index - 1];
      this.tableData[index - 1] = row;
      this.tableData[index] = temp;
    },
    //下移
    sortDown(index, row) {
      let temp = this.tableData[index + 1];
      this.tableData[index + 1] = row;
      this.tableData[index] = temp;
    },
    //置顶
    sortTop(index, row) {
      this.tableData.splice(index, 1);
      this.tableData.unshift(row);
    },
    //置底
    sortEnd(index, row) {
      this.tableData.splice(index, 1);
      this.tableData.push(row);
    },
    deleteRow(index, row) {
      this.tableData.splice(index, 1);
    },
    showEventCollapse() {
      if (this.designerConfig['eventCollapse'] === undefined) {
        return true
      }

      return !!this.designerConfig['eventCollapse']
    },

    hasPropEditor(propName, editorName) {
      if (!editorName) {
        return false
      }

      /* alert组件注册了两个type属性编辑器，跳过第一个type属性编辑器，只显示第二个alert-type属性编辑器！！ */
      if (propName.indexOf('-') <= -1) {
        let uniquePropName = this.selectedWidget.type + '-' + propName
        if (propertyRegistered(uniquePropName)) {
          return false
        }
      }

      let originalPropName = propName.replace(this.selectedWidget.type + '-', '')  //去掉组件名称前缀-，如果有的话！！
      return this.designer.hasConfig(this.selectedWidget, originalPropName)
    },

    getPropEditor(propName, editorName) {
      let originalPropName = propName.replace(this.selectedWidget.type + '-', '')  //去掉组件名称前缀-，如果有的话！！
      let ownPropEditorName = `${this.selectedWidget.type}-${originalPropName}-editor`
      //console.log(ownPropEditorName, this.$options.components[ownPropEditorName])
      if (!!this.$options.components[ownPropEditorName]) {  //局部注册的属性编辑器组件
        return ownPropEditorName
      }

      //return !!this.$root.$options.components[ownPropEditorName] ? ownPropEditorName : editorName  //Vue2全局注册的属性编辑器组件
      return !!this.$root.$.appContext.components[ownPropEditorName] ? ownPropEditorName : editorName  //Vue3全局注册的属性编辑器组件
    },

    showCollapse(propsObj) {
      let result = false

      for (let propName in propsObj) {
        if (!propsObj.hasOwnProperty(propName)) {
          continue
        }

        if (this.hasPropEditor(propName, propsObj[propName])) {
          result = true
          break
        }
      }

      return result
    },

    editEventHandler(eventName, eventParams) {
      //debugger

      this.curEventName = eventName
      this.eventHeader = `${this.optionModel.name}.${eventName}(${eventParams.join(', ')}) {`
      this.eventHandlerCode = this.selectedWidget.options[eventName] || ''

      // 设置字段校验函数示例代码
      if ((eventName === 'onValidate') && (!this.optionModel['onValidate'])) {
        this.eventHandlerCode = "  /* sample code */\n  /*\n  if ((value > 100) || (value < 0)) {\n    callback(new Error('error message'))  //fail\n  } else {\n    callback();  //pass\n  }\n  */"
      }

      this.showWidgetEventDialogFlag = true
    },

    //编辑代码
    editEditCodeButtonHandler(eventName, btnName) {
      this.curEventName = eventName
      switch (btnName) {
        case "编辑代码":
          this.eventHandlerCode = this.selectedWidget.options[eventName] || ''
          this.showWidgetEditCodeDialogFlag = true
          break;
        case "表格图形编辑列":
          console.log("🚀 ~ file: index.vue ~ line 365 ~ editEditCodeButtonHandler ~ this.selectedWidget.options['editTableColumn']", this.selectedWidget.options['editTableColumn'])
          this.eventHandlerCode = this.selectedWidget.options['editTableColumn'] || ''
          this.tableData = JSON.parse(this.selectedWidget.options['editTableColumn']) || ''
          this.showWidgetEditTableDialogFlag = true
          break;
        default:
          break;
      }

    },

    saveEventHandler() {
      if (this.showWidgetEditSlotTemplateCodeDialogFlag) {
        this.selectedWidget.options['slotTemplate'] = this.soltTemplateCode;
        this.showWidgetEditSlotTemplateCodeDialogFlag = false;
        return;
      } else if (this.showWidgetEditTableDialogFlag) {
        //保存表格数据
        this.selectedWidget.options['editTableColumn'] = JSON.stringify(this.tableData, null, 4);
        this.showWidgetEditTableDialogFlag = false
        return;
      } else {
        const codeHints = this.$refs.ecEditor.getEditorAnnotations()
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            return
          }
        }
        this.selectedWidget.options[this.curEventName] = this.eventHandlerCode
      }
      this.showWidgetEventDialogFlag = false
      this.showWidgetEditCodeDialogFlag = false
    },

  }
}
</script>

<style lang="scss" scoped>
.panel-container {
  padding: 0 8px;
}

.setting-scrollbar {
  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
    /* IE浏览器隐藏水平滚动条箭头！！ */
  }
}

.setting-collapse {
  :deep(.el-collapse-item__content) {
    padding-bottom: 6px;
  }

  :deep(.el-collapse-item__header) {
    font-style: italic;
    font-weight: bold;
  }
}

.setting-form {
  :deep(.el-form-item__label) {
    font-size: 13px;
    //text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  :deep(.el-form-item--small.el-form-item) {
    margin-bottom: 10px;
  }
}

/* 隐藏Chrome浏览器中el-input数字输入框右侧的上下调整小箭头 */
:deep(.hide-spin-button) input::-webkit-outer-spin-button,
:deep(.hide-spin-button) input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

/* 隐藏Firefox浏览器中el-input数字输入框右侧的上下调整小箭头 */
:deep(.hide-spin-button) input[type="number"] {
  -moz-appearance: textfield;
}

:deep(.custom-divider.el-divider--horizontal) {
  margin: 10px 0;
}

:deep(.custom-divider-margin-top.el-divider--horizontal) {
  margin: 20px 0;
}

.small-padding-dialog {
  :deep(.el-dialog__body) {
    padding: 6px 15px 12px 15px;
  }
}
</style>
