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
      :key="route.name"
      :index="route.name"
      :route="route.path"
    >
      {{ route.name }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { routes } from '../router/index'

export default defineComponent({
  name: 'NavLink',
  setup() {
    const activeIndex = ref(localStorage.getItem('routeKey') || '主页')
    const Router: Array<RouteRecordRaw> = routes

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
