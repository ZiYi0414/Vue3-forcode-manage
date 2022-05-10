<template>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column
      prop="share.id"
      label="编号"
      sortable
      width="120"
      column-key="share.id"
    />
    <el-table-column prop="share.title" label="标题" width="180" />
    <el-table-column
      prop="share.createTime"
      label="创建日期"
      :formatter="formatter"
    />
    <el-table-column label="发布者">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click="() => handleUserDetailClick(scope.row.user)"
          >{{ scope.row.user.name }}</el-button
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="140">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click="() => handleShareDetailClick(scope.row.share)"
          >查看</el-button
        >
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="() => handleLiftClick(scope.row.share.id)"
          icon-color="#626AEF"
          title="你确定要通过该分享吗?"
        >
          <template #reference>
            <el-button type="text" size="small">通过</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="() => handleBanClick(scope.row.share.id)"
          title="你确定要拒绝该分享吗?"
        >
          <template #reference>
            <el-button type="text" size="small">拒绝</el-button>
          </template>
        </el-popconfirm>
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
  <UserDrawer
    :isUserDrawerOpen="isUserDrawerOpen"
    :handleDrawerClose="handleDrawerClose"
    :user="userData"
  />
  <ShareDrawer
    :isShareDrawerOpen="isShareDrawerOpen"
    :handleDrawerClose="handleDrawerClose"
    :share="shareData"
  />
</template>

<script lang="ts">
import UserDrawer from '@/components/UserDrawer.vue'
import ShareDrawer from '@/components/ShareDrawer.vue'
import { defineComponent, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import axios from '@/utils/axios'
import { Share, user, share } from '@/type'

export default defineComponent({
  name: 'ShareView',
  components: {
    UserDrawer,
    ShareDrawer
  },
  setup() {
    const tableRef = ref<InstanceType<typeof ElTable>>()
    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalSize = ref(10)
    const tableData = ref<Share[]>([])
    const isUserDrawerOpen = ref<boolean>(false)
    const userData = ref<user>()
    const isShareDrawerOpen = ref<boolean>(false)
    const shareData = ref<share>()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    // const filterTag = (value: number, row: Share) => {
    //   return row.state === value
    // }

    const formatter = (row: Share) => {
      const newdate = row.share.createTime.slice(0, 10)
      return newdate
    }

    const getShareList = () => {
      axios
        .post('share', { size: pageSize.value, number: currentPage.value })
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
    getShareList()

    const shareExec = (event: number, shareId: number) => {
      axios
        .post('share/exec', { event: event, shareId: shareId })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res) => {
          const { code } = res.data
          if (code === 200) {
            ElMessage.success('操作成功')
            getShareList()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const handleSizeChange = (val: number) => {
      pageSize.value = val
      getShareList()
    }
    const handleCurrentChange = (val: number) => {
      currentPage.value = val
      getShareList()
    }

    const handleUserDetailClick = (row: user) => {
      userData.value = row
      isUserDrawerOpen.value = true
    }

    const handleDrawerClose = () => {
      isUserDrawerOpen.value = false
      isShareDrawerOpen.value = false
    }

    const handleShareDetailClick = (row: share) => {
      console.log(row)
      shareData.value = row
      isShareDrawerOpen.value = true
    }

    const handleBanClick = (id: number) => {
      shareExec(1, id)
    }

    const handleLiftClick = (id: number) => {
      shareExec(0, id)
    }

    return {
      tableRef,
      // filterHandler,
      formatter,
      tableData,
      pageSize,
      currentPage,
      totalSize,
      handleSizeChange,
      handleCurrentChange,
      handleBanClick,
      handleLiftClick,
      handleUserDetailClick,
      handleShareDetailClick,
      isUserDrawerOpen,
      isShareDrawerOpen,
      handleDrawerClose,
      userData,
      shareData
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
