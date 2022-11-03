import { reactive, onMounted, toRefs } from "vue"

export default function (selectPageReq) {
  /*分页*/
  // const pageNum = ref(1)
  // const pageSize = ref(10)
  const state = reactive({
    pageNum: 1,
    pageSize: 10,
  })
  const handleCurrentChange = (val) => {
    state.pageNum = val
    selectPageReq && selectPageReq()
  }
  const handleSizeChange = (val) => {
    state.pageNum = 1
    state.pageSize = val
    selectPageReq && selectPageReq()
  }
  onMounted(() => { })
  return {
    ...toRefs(state),
    handleCurrentChange,
    handleSizeChange
  }
}
