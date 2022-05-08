<template>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column
      prop="date"
      label="Date"
      sortable
      width="180"
      column-key="date"
    />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" :formatter="formatter" />

    <el-table-column
      prop="tag"
      label="Tag"
      width="100"
      sortable
      :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' }
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.tag === 'Home' ? '' : 'success'"
          disable-transitions
          >{{ scope.row.tag }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-footer">
    <el-pagination
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import type { ElTable } from 'element-plus'
//import axios from '@/utils/axios'

interface User {
  date: string
  name: string
  address: string
  tag: string
}

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup() {
    const tableRef = ref<InstanceType<typeof ElTable>>()
    const currentPage4 = ref(4)
    const pageSize4 = ref(100)

    const tableData: User[] = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        tag: 'Home'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        tag: 'Office'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        tag: 'Home'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        tag: 'Office'
      }
    ]
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formatter = (row: User, column: TableColumnCtx<User>) => {
      return row.address
    }
    const filterTag = (value: string, row: User) => {
      return row.tag === value
    }
    // const filterHandler = (
    //   value: string,
    //   row: User,
    //   column: TableColumnCtx<User>
    // ) => {
    //   const property = column['property']
    //   return row[property] === value
    // }

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }

    return {
      tableRef,
      formatter,
      filterTag,
      // filterHandler,
      pageSize4,
      tableData,
      currentPage4,
      handleSizeChange,
      handleCurrentChange
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
