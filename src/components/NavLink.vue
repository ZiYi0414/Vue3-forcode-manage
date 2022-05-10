<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    @select="handleSelect"
    ><el-menu-item disabled>Nice Coder</el-menu-item>
    <el-menu-item
      v-for="route in Router"
      :key="route.path"
      :index="route.path"
      :route="route.path"
      :disabled="route.name === '排行榜管理'"
    >
      {{ route.name }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import navRouter from '../router/navRouter'

export default defineComponent({
  name: 'NavLink',
  setup() {
    const activeIndex = ref(localStorage.getItem('routeKey') || '主页')
    const Router: Array<RouteRecordRaw> = navRouter

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSelect = (key: string, keyPath: string[]) => {
      localStorage.setItem('routeKey', key)
    }

    return {
      Router,
      activeIndex,
      handleSelect
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
