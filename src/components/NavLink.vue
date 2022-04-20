<template>
  <nav>
    <router-link v-for="route in Router" :key="route.name" :to="route.path"
      >{{ route.name }}
    </router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { routes } from '../router/index'

export default defineComponent({
  name: 'NavLink',
  setup() {
    const Router: Array<RouteRecordRaw> = routes

    return {
      Router
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
