<template>
  <el-drawer
    v-model="visable"
    title="用户详情"
    :with-header="false"
    @close="handleClose"
  >
    <span>{{ user?.name }}</span>
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
