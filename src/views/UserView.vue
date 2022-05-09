<template>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column
      prop="userId"
      label="用户编号"
      sortable
      width="120"
      column-key="userId"
    />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="email" label="邮箱" />

    <el-table-column
      prop="state"
      label="账号状态"
      width="130"
      sortable
      :filters="[
        { text: '正常', value: 0 },
        { text: '已封禁', value: 1 }
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.state === 1 ? 'danger' : 'info'"
          disable-transitions
          >{{ scope.row.state === 1 ? '已封禁' : '正常' }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template #default="scope">
        <el-button
          type="text"
          :disabled="scope.row.state === 0 ? false : true"
          size="small"
          @click="() => handleBanClick(scope.row.userId)"
          >封禁</el-button
        >
        <el-button
          type="text"
          size="small"
          :disabled="scope.row.state === 1 ? false : true"
          @click="() => handleLiftClick(scope.row.userId)"
          >解封</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-footer">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import axios from '@/utils/axios'
import { User } from '@/type'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const tableRef = ref<InstanceType<typeof ElTable>>()
    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalSize = ref(10)

    const tableData = ref<User[]>([])

    const filterTag = (value: number, row: User) => {
      return row.state === value
    }
    const getUserList = () => {
      axios
        .post('user', { size: pageSize.value, number: currentPage.value })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res) => {
          const { code, data } = res.data
          if (code === 200) {
            totalSize.value = data.totalSize
            tableData.value = data.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getUserList()

    const userExec = (event: number, userId: number) => {
      axios
        .post('user/exec', { event: event, userId: userId })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res) => {
          const { code } = res.data
          if (code === 200) {
            ElMessage.success('操作成功')
            getUserList()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const handleSizeChange = (val: number) => {
      pageSize.value = val
      getUserList()
    }
    const handleCurrentChange = (val: number) => {
      currentPage.value = val
      getUserList()
    }

    const handleBanClick = (id: number) => {
      userExec(1, id)
    }

    const handleLiftClick = (id: number) => {
      userExec(0, id)
    }

    return {
      tableRef,
      filterTag,
      // filterHandler,
      tableData,
      pageSize,
      currentPage,
      totalSize,
      handleSizeChange,
      handleCurrentChange,
      handleBanClick,
      handleLiftClick
    }
  }
})
</script>

<style lang="less" scoped>
.pagination-footer {
  position: fixed;
  bottom: 0;
  padding: 10px;
  margin: 0 auto;
}
</style>
