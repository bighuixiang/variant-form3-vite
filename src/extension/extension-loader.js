//import { vfApp } from '@/utils/create-app'

import {
    addContainerWidgetSchema,
    addCustomWidgetSchema
} from '@/components/form-designer/widget-panel/widgetsConfig'
import * as PERegister from '@/components/form-designer/setting-panel/propertyRegister'
import * as PEFactory from '@/components/form-designer/setting-panel/property-editor-factory.jsx'

import { cardSchema } from "@/extension/samples/extension-schema"
import CardWidget from '@/extension/samples/card/card-widget'
import CardItem from '@/extension/samples/card/card-item'
import { registerCWGenerator } from '@/utils/sfc-generator'
import { cardTemplateGenerator } from '@/extension/samples/extension-sfc-generator'

import { alertSchema } from "@/extension/samples/extension-schema"
import AlertWidget from '@/extension/samples/alert/alert-widget'
import { registerFWGenerator } from '@/utils/sfc-generator'
import { alertTemplateGenerator } from '@/extension/samples/extension-sfc-generator'

//表单控件
import { tableViewSchema } from "@/extension/samples/extension-schema"
import TableViewWidget from '@/extension/samples/table-view/table-view-widget'
import TableViewItem from '@/extension/samples/table-view/table-view-item'
import { tabViewTemplateGenerator } from '@/extension/samples/extension-sfc-generator'

export const loadExtension = function (app) {
    /**
     * 加载容器组件步骤：
     * 1. 加载组件Json Schema;
     * 2. 全局注册容器组件，容器组件有两种状态——设计期和运行期，故需要注册两个组件；
     * 3. 全局注册属性编辑器组件（基本属性、高级属性、事件属性）；
     * 4. 注册容器组件的代码生成器；
     * 5. 加载完毕。
     */
    addContainerWidgetSchema(cardSchema)  //加载组件Json Schema

    /* -------------------------------------------------- */
    app.component(CardWidget.name, CardWidget)  //注册设计期的容器组件
    app.component(CardItem.name, CardItem)  //注册运行期的容器组件

    PERegister.registerCPEditor(app, 'card-folded', 'card-folded-editor',
        PEFactory.createBooleanEditor('folded', 'extension.setting.cardFolded'))

    PERegister.registerCPEditor(app, 'card-showFold', 'card-showFold-editor',
        PEFactory.createBooleanEditor('showFold', 'extension.setting.cardShowFold'))

    PERegister.registerCPEditor(app, 'card-cardWidth', 'card-cardWidth-editor',
        PEFactory.createInputTextEditor('cardWidth', 'extension.setting.cardWidth'))

    let shadowOptions = [
        { label: 'never', value: 'never' },
        { label: 'hover', value: 'hover' },
        { label: 'always', value: 'always' },
    ]
    PERegister.registerCPEditor(app, 'card-shadow', 'card-shadow-editor',
        PEFactory.createSelectEditor('shadow', 'extension.setting.cardShadow',
            { optionItems: shadowOptions }))
    /* -------------------------------------------------- */
    registerCWGenerator('card', cardTemplateGenerator)  //注册容器组件的代码生成器
    /* -------------------------------------------------- */
    /* 容器组件加载完毕 end */



    //表单控件  开始
    addContainerWidgetSchema(tableViewSchema)  //加载组件Json Schema
    /* -------------------------------------------------- */
    app.component(TableViewWidget.name, TableViewWidget)  //注册设计期的容器组件
    app.component(TableViewItem.name, TableViewItem)  //注册运行期的容器组件
    /* -------------------------------------------------- */
    // table-view-folded  table-view 为组件type
    //card-folded-editor  为属性组件名称
    //extension.setting.cardFolded  字段名称  i18n
    PERegister.registerCPEditor(app, 'table-view-tableViewWidth', 'tbview-width-editor',
        PEFactory.createInputTextEditor('tableViewWidth', 'extension.setting.tableViewWidth'))

    PERegister.registerCPEditor(app, 'table-view-tableViewHeight', 'tbview-height-editor',
        PEFactory.createInputTextEditor('tableViewHeight', 'extension.setting.tableViewHeight'))

    // PERegister.registerCPEditor(app, 'table-view-lineHeight', 'tbview-lineHeight-editor',
    //     PEFactory.createInputNumberEditor('lineHeight', '行距（px）'))
    PERegister.registerCPEditor(app, 'table-view-showRowNumber', 'tbview-rowNumber-editor',
        PEFactory.createBooleanEditor('showRowNumber', '显示行号'))
    PERegister.registerCPEditor(app, 'table-view-showCheckbox', 'tbview-checkbox-editor',
        PEFactory.createBooleanEditor('showCheckbox', '显示复选框列'))
    PERegister.registerCPEditor(app, 'table-view-editTableColumnTx', 'tbview-editTableColumnTx-editor',
        PEFactory.createEditCodeButtonEditor('editTableColumnTx', '表格列图形编辑', '表格图形编辑列'))
    PERegister.registerCPEditor(app, 'table-view-editTableData', 'tbview-editTableData-editor',
        PEFactory.createEditCodeButtonEditor('editTableData', '表格数据代码编辑'))

    PERegister.registerCPEditor(app, 'table-view-showPagination', 'tbview-pagination-editor',
        PEFactory.createBooleanEditor('showPagination', '显示分页'))
    PERegister.registerCPEditor(app, 'table-view-showSmall', 'tbview-small-editor',
        PEFactory.createBooleanEditor('showSmall', '显示小型分页'))
    PERegister.registerCPEditor(app, 'table-view-showSummary', 'tbview-summary-editor',
        PEFactory.createBooleanEditor('showSummary', '显示合计'))
    PERegister.registerCPEditor(app, 'table-view-showStripe', 'tbview-stripe-editor',
        PEFactory.createBooleanEditor('showStripe', '显示斑马线'))
    PERegister.registerCPEditor(app, 'table-view-showBorder', 'tbview-border-editor',
        PEFactory.createBooleanEditor('showBorder', '显示纵向线条'))
    PERegister.registerCPEditor(app, 'table-view-showOperationBtnCol', 'tbview-operationBtnCol-editor',
        PEFactory.createBooleanEditor('showOperationBtnCol', '显示操作按钮列'))

    PERegister.registerCPEditor(app, 'table-view-editTableColumn', 'tbview-editTableColumn-editor',
        PEFactory.createEditCodeButtonEditor('editTableColumn', '表格列代码编辑'))

    registerCWGenerator('table-view', tabViewTemplateGenerator)  //注册容器组件的代码生成器

    //表格高级属性
    // PERegister.registerAPEditor(app, 'table-view-column', 'tbview-column-editor',
    //     PEFactory.createInputTextEditor('column', '表格列代码'))
    // PERegister.registerAPEditor(app, 'table-view-tableData', 'tbview-tableData-editor',
    //     PEFactory.createInputTextEditor('tableData', '表格数据'))
    /* 表单控件容器组件加载完毕 end */


    /**
     * 加载字段组件步骤：
     * 1. 加载组件Json Schema;
     * 2. 全局注册字段组件，字段组件设计期和运行期共用，故仅需注册一个组件；
     * 3. 全局注册属性编辑器组件（基本属性、高级属性、事件属性）；
     * 4. 注册字段组件的代码生成器；
     * 5. 加载完毕。
     */
    addCustomWidgetSchema(alertSchema)  //加载组件Json Schema
    /* -------------------------------------------------- */
    app.component(AlertWidget.name, AlertWidget)  //注册组件
    /* -------------------------------------------------- */
    PERegister.registerCPEditor(app, 'alert-title', 'alert-title-editor',
        PEFactory.createInputTextEditor('title', 'extension.setting.alertTitle'))

    let typeOptions = [
        { label: 'success', value: 'success' },
        { label: 'warning', value: 'warning' },
        { label: 'info', value: 'info' },
        { label: 'error', value: 'error' },
    ]
    // PERegister.registerCPEditor(app, 'alert-type', 'alert-type-editor',
    //     PEFactory.createSelectEditor('type', 'extension.setting.alertType',
    //         {optionItems: typeOptions}))
    /* type属性映射已存在，无须再注册，故只需注册属性编辑器即可！！ */
    app.component('alert-type-editor',
        PEFactory.createSelectEditor('type', 'extension.setting.alertType',
            { optionItems: typeOptions }))

    PERegister.registerCPEditor(app, 'alert-description', 'alert-description-editor',
        PEFactory.createInputTextEditor('description', 'extension.setting.description'))

    PERegister.registerCPEditor(app, 'alert-closable', 'alert-closable-editor',
        PEFactory.createBooleanEditor('closable', 'extension.setting.closable'))

    PERegister.registerCPEditor(app, 'alert-closeText', 'alert-closeText-editor',
        PEFactory.createInputTextEditor('closeText', 'extension.setting.closeText'))

    PERegister.registerCPEditor(app, 'alert-center', 'alert-center-editor',
        PEFactory.createBooleanEditor('center', 'extension.setting.center'))

    PERegister.registerCPEditor(app, 'alert-showIcon', 'alert-showIcon-editor',
        PEFactory.createBooleanEditor('showIcon', 'extension.setting.showIcon'))

    let effectOptions = [
        { label: 'light', value: 'light' },
        { label: 'dark', value: 'dark' },
    ]
    PERegister.registerCPEditor(app, 'alert-effect', 'alert-effect-editor',
        PEFactory.createRadioButtonGroupEditor('effect', 'extension.setting.effect',
            { optionItems: effectOptions }))

    PERegister.registerEPEditor(app, 'alert-onClose', 'alert-onClose-editor',
        PEFactory.createEventHandlerEditor('onClose', []))
    /* -------------------------------------------------- */
    registerFWGenerator('alert', alertTemplateGenerator)  //注册字段组件的代码生成器
    /* -------------------------------------------------- */
    /* 字段组件加载完毕 end */
}
