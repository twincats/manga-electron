<template>
  <el-container>
    <el-container>
      <el-aside width="auto">
        <side-menu />
      </el-aside>
      <el-main class="overflow-y-auto p-0 max-h-screen">
        <div>
          <router-view />
        </div>
        <page-nav />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElContainer, ElAside, ElMain } from 'element-plus';
import SideMenu from '/@/components/SideMenu.vue';
import PageNav from '/@/components/PageNav.vue';

export default defineComponent({
  name: 'App',
  components: { ElContainer, ElAside, ElMain, SideMenu, PageNav },
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
