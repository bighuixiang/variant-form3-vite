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
  console.log("🚀 ~ file: extension-sfc-generator.js ~ line 35 ~ tabViewTemplateGenerator ~ wop", wop)
  // editTableData    //table 数据
  // editTableColumn    //table 列数据
  // showCheckbox: false
  // showOperationBtnCol: false
  // showRowNumber: false
  // slotTemplate: ''
  const classAttr = buildClassAttr(cw)
  const styleAttr = !!wop.tableViewWidth && wop.tableViewWidth !== '100%' ? `style="width: ${wop.tableViewWidth} !important"` : ''   //宽度
  const height = !!wop.tableViewHeight ? `height:"${wop.tableViewHeight}"` : ''
  const showSummary = !!wop.showSummary ? `summary` : '' //是否显示合计
  const showStripe = !!wop.showStripe ? `stripe` : '' //是否显示斑马线
  const showBorder = !!wop.showBorder ? `border` : '' //是否显示纵线
  const showPagination = !!wop.showPagination ? `is-show-pagination` : '' //是否展示分页组件
  const showSmall = !!wop.showSmall ? `small` : '' //是否小分页组件
  const vShowAttr = !!wop.hidden ? `v-show="false"` : ''  //是否隐藏
  const slotTemplate = !!wop.slotTemplate ? wop.slotTemplate : ''  //具名插槽
  const showPaginationEmit = !!wop.showPagination ? `@pagination-change-page="handleCurrentChange" @pagination-change-page-size="handleSizeChange"` : '' //是否展示分页组件的回调事件
  const showPaginationProp = !!wop.showPagination ? `v-model:currentPage="pageNum" v-model:pageSize="pageSize"` : '' //是否展示分页组件的分页绑定属性

  const cardTemplate =
    `<div class="table-view-container">
        <table-view  ${showPaginationProp}  ${height} ${showSummary} ${showStripe} ${showPagination} ${showSmall} ${showBorder}  ${vShowAttr} ${classAttr} ${styleAttr} ${showPaginationEmit} >
           ${slotTemplate}
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
