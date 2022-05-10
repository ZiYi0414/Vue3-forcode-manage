<template>
  <el-drawer v-model="visable" title="详情" :size="700" @close="handleClose">
    <span>
      <el-avatar shape="square" :size="100" :fit="fit" :src="user?.img" />
    </span>
    <el-descriptions border direction="vertical" :column="4" title="用户信息">
      <el-descriptions-item label="用户名">{{
        user?.name
      }}</el-descriptions-item>
      <el-descriptions-item label="邮箱地址">{{
        user?.email
      }}</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">{{ user?.tag }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
//import { user } from '../type'

export default defineComponent({
  name: 'UserDrawer',
  props: {
    user: Object,
    isUserDrawerOpen: Boolean,
    handleDrawerClose: Function
  },

  setup(props) {
    const visable = ref<boolean>(props.isUserDrawerOpen)

    watch([() => props.isUserDrawerOpen], () => {
      visable.value = !visable.value
    })

    const handleClose = () => {
      props.handleDrawerClose && props.handleDrawerClose()
    }

    return {
      visable,
      handleClose
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
