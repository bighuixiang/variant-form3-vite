<!-- el-table-next 文档地址：https://el-table-next.vercel.app/guide/example.html -->
<template>
  <div class="table-view">
    <el-table-next v-if="isShowTable" ref="singleTableRef" v-bind="$attrs" :column="column" :data="tableData"
                   :align="align">
      <template v-for="(_, name) in $slots" :key="name" #[name]="scope">
        <slot :name="[name]" v-bind="scope"></slot>
      </template>
      <!-- 递归传递插槽！！！ -->
    </el-table-next>
    <el-pagination v-if="isShowPagination" v-model:currentPage="currentPage" v-model:page-size="currentPageSize"
                   class="hkt-pagination" :page-sizes="pageSizes" :small="small" :disabled="disabled"
                   :background="background" :layout="layout" :total="total" />
  </div>
</template>

<!-- el-table-next 文档地址：https://el-table-next.vercel.app/guide/example.html -->
<script setup>
import { getInnerRange } from '@vue/compiler-core';
import ElTableNext from 'el-table-next'
import { ref, watch, onMounted, getCurrentInstance, nextTick } from "vue"
const emit = defineEmits([
  'update:currentPage',
  'update:currentPageSize',
  'pagination-change-page',
  'pagination-change-page-size'
])

const props = defineProps({
  column: {
    require: true,
    default() {
      return []
    },
    type: Array
  },
  tableData: {
    require: true,
    default() {
      return []
    },
    type: Array
  },
  //表格对齐方式
  align: {
    default: '',
    type: String
  },
  //是否展示分页控件
  isShowPagination: {
    default: false,
    type: Boolean
  },
  //分页当前页码
  currentPageProps: {
    default: 1,
    type: Number
  },
  //分页加载条数
  currentPageSizeProps: {
    default: 10,
    type: Number
  },
  pageSizes: {
    default() {
      return [10, 20, 50, 100]
    },
    type: Array
  },
  layout: {
    default: 'total, sizes, prev, pager, next, jumper',
    type: String
  },
  total: {
    default: 0,
    type: Number
  },
  small: {
    default: false,
    type: Boolean
  },
  background: {
    default: true,
    type: Boolean
  },
  disabled: {
    default: false,
    type: Boolean
  }
})
//table 表格实例
const singleTableRef = ref(null)

//分页控件相关
let currentPage = ref(props.currentPageProps)
let currentPageSize = ref(props.currentPageSizeProps)
let isShowTable = ref(true)

watch(currentPage, (val) => {
  emit('update:currentPage', val)
  emit('pagination-change-page', val)
})

watch(currentPageSize, (val) => {
  currentPage.value = 1
  emit('update:currentPageSize', val)
  emit('pagination-change-page-size', val)
})

watch(() => props.column, (val) => {
  //官方重置方法 无效解决数据错乱问题
  isShowTable.value = false;
  nextTick(() => {
    isShowTable.value = true;
  })
},
  {
    deep: true
  }
)

// //分页size发生变化回调
// const handleSizeChange = (val) => {
//   emit['size-change'](val)
// }
// //分页index发生变化回调
// const handleCurrentChange = (val) => {
//   emit['current-change'](val)
// }]
const { proxy } = getCurrentInstance()
// onMounted(() => { console.log('onMounted Child=> $attrs: ' + JSON.stringify(proxy.$attrs)); })
// onMounted(() => { console.log('onMounted Child=> $attrs: ' + JSON.stringify(proxy.$props)); })
//暴露table的ref给父组件调用
defineExpose({
  singleTableRef
})
</script>

<style scoped lang="scss">
.table-view {
  .hkt-pagination {
    padding-top: 12px;
    padding-bottom: 12px;
  }
}
</style>
