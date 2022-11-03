<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
                     :index-of-parent-list="indexOfParentList">
    <TableView :tableId="widget.id" :key="widget.id" :ref="widget.id" v-model:currentPage="pageNum"
               v-model:pageSize="pageSize" :column="column" :table-data="tableData" :total="100"
               :stripe="widget.options.showStripe" :is-show-pagination="widget.options.showPagination"
               :show-summary="widget.options.showSummary" :small="widget.options.showSmall"
               :border="widget.options.showBorder" :height="widget.options.tableViewHeight"
               :width="widget.options.tableViewWidth" :typeindex="widget.options.showRowNumber"
               @pagination-change-page="handleCurrentChange" @pagination-change-page-size="handleSizeChange"
               :class="[!!widget.options.folded ? 'folded' : '', customClass]" @click.stop="selectWidget(widget)">
      <draggable :list="widget.widgetList" item-key="id"
                 v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }" handle=".drag-handler"
                 tag="transition-group" :component-data="{ name: 'fade' }"
                 @add="(evt) => onContainerDragAdd(evt, widget.widgetList)" @update="onContainerDragUpdate"
                 :move="checkContainerMove">
        <template #item="{ element: subWidget, index: swIdx }">
          <div class="form-widget-list">
            <template v-if="'container' === subWidget.category">
              <component :is="subWidget.type + '-widget'" :widget="subWidget" :designer="designer" :key="subWidget.id"
                         :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget">
              </component>
            </template>
            <template v-else>
              <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="designer" :key="subWidget.id"
                         :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget"
                         :design-state="true"></component>
            </template>
          </div>
        </template>
      </draggable>
    </TableView>
  </container-wrapper>
</template>

<script lang="jsx">
import i18n from "@/utils/i18n"
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
import FieldComponents from '@/components/form-designer/form-widget/field-widget/index'
import refMixinDesign from "@/components/form-designer/refMixinDesign"
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import TableView from '@/components/extension/TableView.vue'
import tablePageHooks from '@/hooks/useTablePage'
const { pageNum, pageSize, handleCurrentChange, handleSizeChange } = tablePageHooks((val) => {
  //TOOD : 此处为表格数据查询接口    currentPage  pageSize  发生变化都会调用此函数
  console.log('🚀 ~ file: Table.vue ~ line 51 ~此处为表格数据查询接口~ TOOD  pageNum', pageNum.value)
  console.log('🚀 ~ file: Table.vue ~ line 51 ~此处为表格数据查询接口~ TOOD pageSize', pageSize.value)
})

export default {
  name: "table-view-widget",
  componentName: 'ContainerWidget',
  mixins: [i18n, containerMixin, refMixinDesign],
  inject: ['refList'],
  components: {
    ContainerWrapper,
    ...FieldComponents,
    ArrowDown,
    ArrowUp,
    TableView
  },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
  },
  computed: {
    selected() {
      return this.widget.id === this.designer.selectedId
    },

    customClass() {
      return this.widget.options.customClass || ''
    },
    column() {
      return [
        {
          type: 'selection',
          width: 50
        },
        {
          type: 'index',
          width: '60px',
          label: '序号'
        },
        {
          label: '名字',
          prop: 'name',
          slotName: 'test'
        },
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ]
    },
    tableData() {
      return [
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
      ]
    },
  },
  data() {
    return {
      pageNum: pageNum,
      pageSize: pageSize,
      tableRef: null,
    }
  },
  created() {
    this.initRefList()
    console.log("initRefLis", this.widget.options.tableData)
  },
  methods: {
    handleCurrentChange(val) {
      handleCurrentChange(val)
    },
    handleSizeChange(val) {
      handleSizeChange(val)
    },
    /**
     * 检查接收哪些组件拖放，如不接受某些组件拖放，则根据组件类型判断后返回false
     * @param evt
     * @returns {boolean}
     */
    checkContainerMove(evt) {
      return true
    },

    toggleCard() {
      this.widget.options.folded = !this.widget.options.folded
    },

    /**
     * 设置折叠/打开状态
     * @param folded
     */
    setFolded(folded) {
      this.widget.options.folded = !!folded
    }

  }
}
</script>

<style lang="scss" scoped>
.card-container.selected {
  outline: 2px solid $--color-primary !important;
}

.card-container {
  margin: 3px;

  .form-widget-list {
    min-height: 28px;
  }
}

:deep(.el-card__header) {
  padding: 10px 12px;
}

.folded :deep(.el-card__body) {
  display: none;
}

.clear-fix:before,
.clear-fix:after {
  display: table;
  content: "";
}

.clear-fix:after {
  clear: both;
}

.float-right {
  float: right;
}
</style>
