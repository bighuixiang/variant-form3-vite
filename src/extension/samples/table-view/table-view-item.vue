<template>
  <container-item-wrapper :widget="widget">
    <TableView :tableId="widget.id" :key="widget.id" :ref="widget.id" v-model:currentPage="pageNum"
               v-model:pageSize="pageSize" :column="column" :table-data="tableData" :total="100"
               :stripe="widget.options.showStripe" :is-show-pagination="widget.options.showPagination"
               :show-summary="widget.options.showSummary" :small="widget.options.showSmall"
               :border="widget.options.showBorder" :height="widget.options.tableViewHeight"
               :style="{ width: widget.options.tableViewWidth }" :typeindex="widget.options.showRowNumber"
               @pagination-change-page="handleCurrentChange" @pagination-change-page-size="handleSizeChange"
               :class="[!!widget.options.folded ? 'folded' : '', customClass]" @click.stop="selectWidget(widget)"
               v-show="!widget.options.hidden">
      <template v-if="!!widget.widgetList && (widget.widgetList.length > 0)">
        <template v-for="(subWidget, swIdx) in widget.widgetList">
          <template v-if="'container' === subWidget.category">
            <component :is="getComponentByContainer(subWidget)" :widget="subWidget" :key="swIdx"
                       :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget">
              <!-- 递归传递插槽！！！ -->
              <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope" />
              </template>
            </component>
          </template>
          <template v-else>
            <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="null" :key="swIdx"
                       :parent-list="widget.widgetList" :index-of-parent-list="swIdx" :parent-widget="widget">
              <!-- 递归传递插槽！！！ -->
              <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope" />
              </template>
            </component>
          </template>
        </template>
      </template>
    </TableView>
  </container-item-wrapper>
</template>

<script lang="jsx">
import emitter from '@/utils/emitter'
import i18n from "@/utils/i18n"
import refMixin from "@/components/form-render/refMixin"
import ContainerItemWrapper from '@/components/form-render/container-item/container-item-wrapper'
import containerItemMixin from "@/components/form-render/container-item/containerItemMixin"
import FieldComponents from '@/components/form-designer/form-widget/field-widget/index'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import TableView from '@/components/extension/TableView.vue'
import tablePageHooks from '@/hooks/useTablePage'
const { pageNum, pageSize, handleCurrentChange, handleSizeChange } = tablePageHooks((val) => {
  //TOOD : 此处为表格数据查询接口    currentPage  pageSize  发生变化都会调用此函数
  console.log('🚀 ~ file: Table.vue ~ line 51 ~此处为表格数据查询接口~ TOOD  pageNum', pageNum.value)
  console.log('🚀 ~ file: Table.vue ~ line 51 ~此处为表格数据查询接口~ TOOD pageSize', pageSize.value)
})

export default {
  name: "table-view-item",
  componentName: 'ContainerItem',
  mixins: [emitter, i18n, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
    ...FieldComponents,
    ArrowDown,
    ArrowUp,
    TableView
  },
  props: {
    widget: Object,
  },
  inject: ['refList', 'sfRefList', 'globalModel'],
  computed: {
    customClass() {
      return this.widget.options.customClass || ''
    },

  },
  data() {
    return {
      pageNum: pageNum,
      pageSize: pageSize,
      tableRef: null,
      column: [
        {
          type: 'selection',
          width: 66
        },
        {
          type: 'index',
          width: '66px',
          label: '序号'
        },
        {
          label: '名字',
          prop: 'name',
          render: (data, scope) => {
            const { row, column } = scope
            const propKey = column.property
            return (
              <div>
                render 结果 -- {row[propKey]}== {data}
              </div>
            )
          }
        },
        {
          prop: 'date',
          label: '日期'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      tableData: [
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
    }
  },
  created() {
    this.initRefList()
  },
  beforeUnmount() {
    this.unregisterFromRefList()
  },
  methods: {
    toggleCard() {
      this.widget.options.folded = !this.widget.options.folded
    },

  },
}
</script>

<style lang="scss" scoped>
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
