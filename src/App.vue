<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <NavLink v-if="showNav" />
      </el-header>
      <el-main> <router-view /> </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavLink from './components/NavLink.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavLink
  },
  setup() {
    const router = useRouter()
    let showNav = ref(true)
    watch(
      () => router.currentRoute.value.path,
      (toPath) => {
        //要执行的方法
        if (toPath == '/login') {
          showNav.value = false
        } else {
          showNav.value = true
        }
      },
      { immediate: true, deep: true }
    )

    return {
      showNav
    }
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
  padding: 0;
}
</style>
