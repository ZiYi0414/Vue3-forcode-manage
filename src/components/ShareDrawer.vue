<template>
  <el-drawer v-model="visable" title="详情" :size="700" @close="handleClose">
    <el-descriptions border direction="vertical" :column="1" title="分享信息">
      <el-descriptions-item label="图片">
        <el-image
          style="width: 100px; height: 100px"
          :src="share?.img"
          :preview-src-list="[share?.img]"
          :initial-index="4"
          fit="cover"
        />
      </el-descriptions-item>
      <el-descriptions-item label="标题">{{
        share?.title
      }}</el-descriptions-item>
      <el-descriptions-item label="详情">{{
        share?.details
      }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ share?.createTime }}
      </el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
//import { Share } from '../type'

export default defineComponent({
  name: 'ShareDrawer',
  props: {
    share: Object,
    isShareDrawerOpen: Boolean,
    handleDrawerClose: Function
  },

  setup(props) {
    const visable = ref<boolean>(props.isShareDrawerOpen)

    watch([() => props.isShareDrawerOpen], () => {
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
