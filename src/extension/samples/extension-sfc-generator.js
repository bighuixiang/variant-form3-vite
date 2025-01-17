import { buildClassAttr, buildContainerWidget, buildFieldWidget } from '@/utils/sfc-generator'

export const cardTemplateGenerator = function (cw, formConfig) {
  const wop = cw.options
  //const headerAttr = `header="${wop.label}"`
  const classAttr = buildClassAttr(cw)
  const styleAttr = !!wop.cardWidth ? `style="{width: ${wop.cardWidth} !important}"` : ''
  const shadowAttr = `shadow="${wop.shadow}"`
  const vShowAttr = !!wop.hidden ? `v-show="false"` : ''

  const cardTemplate =
    `<div class="card-container">
  <el-card ${classAttr} ${styleAttr} ${shadowAttr} ${vShowAttr}>
    <template #header>
      <div class="clear-fix">
        <span>${wop.label}</span>
        ${!!wop.showFold ? `<i class="float-right el-icon-arrow-down"></i>` : ''}
      </div>
    </template>
    ${cw.widgetList.map(wItem => {
      if (wItem.category === 'container') {
        return buildContainerWidget(wItem, formConfig)
      } else {
        return buildFieldWidget(wItem, formConfig)
      }
    }).join('')
    }
  </el-card>
</div>`

  return cardTemplate
}

export const tabViewTemplateGenerator = function (cw, formConfig) {
  const wop = cw.options
  // console.log("🚀 ~ file: extension-sfc-generator.js ~ line 35 ~ tabViewTemplateGenerator ~ wop", wop)
  // editTableData    //table 数据
  // editTableColumn    //table 列数据
  // showCheckbox: false
  // showOperationBtnCol: false
  // showRowNumber: false
  // slotTemplate: ''
  const classAttr = buildClassAttr(cw)
  const styleAttr = !!wop.tableViewWidth && wop.tableViewWidth !== '100%' ? `style="width: ${wop.tableViewWidth} !important"` : ''   //宽度
  const height = !!wop.tableViewHeight ? `height="${wop.tableViewHeight}"` : ''
  const editTableColumn = !!wop.editTableColumn ? `:column="state.${wop.name}TVColumn"` : '' //列数据
  const editTableData = !!wop.editTableData ? `:table-data="state.${wop.name}TVData"` : '' //表格数据列表
  const total = !!wop.editTableData ? `:total="state.${wop.name}TVData.length"` : '' //表格数据列表
  const showSummary = !!wop.showSummary ? `summary` : '' //是否显示合计
  const showStripe = !!wop.showStripe ? `stripe` : '' //是否显示斑马线
  const showBorder = !!wop.showBorder ? `border` : '' //是否显示纵线
  const showSmall = !!wop.showSmall ? `small` : '' //是否小分页组件
  const showPagination = !!wop.showPagination ? `is-show-pagination` : '' //是否展示分页组件
  const vShowAttr = !!wop.hidden ? `v-show="false"` : ''  //是否隐藏
  const slotTemplate = !!wop.slotTemplate ? wop.slotTemplate : ''  //具名插槽
  const showPaginationEmit = !!wop.showPagination ? `@pagination-change-page="${wop.name}TVHook.handleCurrentChange" @pagination-change-page-size="${wop.name}TVHook.handleSizeChange"` : '' //是否展示分页组件的回调事件
  // const showPaginationProp = !!wop.showPagination ? `v-model:currentPage="pageNum" v-model:pageSize="pageSize"` : '' //是否展示分页组件的分页绑定属性
  const operationTemplate = !!wop.showOperationBtnCol ? `
      <template #tvOperation>
                <div class="tableview-btns flex flex-middle">
                  <el-button class="tableview-btn" link @click="${wop.name}ClickDetailHandler">详情</el-button>
                  <el-button class="tableview-btn" link @click="${wop.name}ClickEditHandler">编辑</el-button>
                  <el-popconfirm
                    title="确认删除吗?"
                    width="198px"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="${wop.name}ClickDeleteHandler"
                  >
                    <template #reference>
                      <el-button class="tableview-btn" type="primary" link>删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
  `: ''
  const cardTemplate =
    `<div class="table-view-container">
        <table-view
          ${editTableColumn}   ${editTableData}   ${height} ${showSummary} ${showStripe} ${showSmall} ${showBorder}  ${showPagination} ${vShowAttr} ${classAttr} ${styleAttr} ${showPaginationEmit} >
           
           ${slotTemplate}

           ${operationTemplate}
        </table-view>
    </div>`

  return cardTemplate
}

export const alertTemplateGenerator = function (fw, formConfig) {
  const wop = fw.options
  const titleAttr = `title="${wop.title}"`
  const typeAttr = `type=${wop.type}`
  const descriptionAttr = !!wop.description ? `description="${wop.description}"` : ''
  const closableAttr = `:closable="${wop.closable}"`
  const closeTextAttr = !!wop.closeText ? `close-text="${wop.closeText}"` : ''
  const centerAttr = `:center="${wop.center}"`
  const showIconAttr = `:show-icon="${wop.showIcon}"`
  const effectAttr = `effect="${wop.effect}"`

  const alertTemplate =
    `<el-alert ${titleAttr} ${typeAttr} ${descriptionAttr} ${closableAttr} ${closeTextAttr} ${centerAttr} 
  ${showIconAttr} ${effectAttr}>
</el-alert>`

  return alertTemplate
}
