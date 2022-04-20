<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <NavLink />
      </el-header>
      <el-main> <router-view /> </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavLink from './components/NavLink.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavLink
  }
})
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.header {
  background: red;
}
</style>
