<template>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column
      prop="discuss.id"
      label="编号"
      sortable
      width="120"
      column-key="discuss.id"
    />
    <el-table-column prop="discuss.detail" label="内容" width="180" />
    <el-table-column
      prop="discuss.createTime"
      label="评论日期"
      sortable
      :formatter="formatter"
    />
    <el-table-column label="发布者">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click="() => handleUserDetailClick(scope.row.user)"
          >{{ scope.row?.user?.name }}</el-button
        >
      </template>
    </el-table-column>
    <el-table-column label="分享">
      <template #default="scope">
        <el-button
          type="text"
          size="small"
          @click="() => handleShareDetailClick(scope.row.share)"
          >{{ scope.row?.share?.title }}</el-button
        >
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="140">
      <template #default="scope">
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="() => handleLiftClick(scope.row?.discuss?.id)"
          icon-color="#626AEF"
          title="你确定要通过该评论吗?"
        >
          <template #reference>
            <el-button type="text" size="small">通过</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="() => handleBanClick(scope.row?.discuss?.id)"
          title="你确定要拒绝该评论吗吗?"
        >
          <template #reference>
            <el-button type="text" size="small">垃圾</el-button>
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
import { Share, user, share, Discuss } from '@/type'

export default defineComponent({
  name: 'CommentView',
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

    const formatter = (row: Discuss) => {
      const newdate = row.discuss.createTime.slice(0, 10)
      return newdate
    }

    const getCommentList = () => {
      axios
        .post('discuss', { size: pageSize.value, number: currentPage.value })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res) => {
          const { code, data } = res.data
          if (code === 200) {
            console.log(data.data)
            totalSize.value = data.totalSize
            tableData.value = data.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    getCommentList()

    const commentExec = (event: number, discussId: number) => {
      axios
        .post('discuss/exec', { event: event, discussId: discussId })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res) => {
          const { code } = res.data
          if (code === 200) {
            ElMessage.success('操作成功')
            getCommentList()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const handleSizeChange = (val: number) => {
      pageSize.value = val
      getCommentList()
    }
    const handleCurrentChange = (val: number) => {
      currentPage.value = val
      getCommentList()
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
      commentExec(1, id)
    }

    const handleLiftClick = (id: number) => {
      commentExec(0, id)
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
