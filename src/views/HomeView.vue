<template>
  <div class="home">
    <h1>Welcome to NiceCoder Manage</h1>
    <h2>欢迎来到程序员自检平台管理系统</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {}
})
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 2rem;
  }
}
</style>
