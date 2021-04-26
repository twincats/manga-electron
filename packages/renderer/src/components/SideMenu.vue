<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#191919"
    text-color="#fff"
    active-text-color="#f79226"
    :collapse="isCollapse"
  >
    <el-menu-item
      index="1"
      @click="isCollapse = !isCollapse"
    >
      <i class="el-icon-menu" />
      <span>Menu</span>
    </el-menu-item>
    <el-menu-item
      index="2"
      @click="$router.push('/')"
    >
      <i class="el-icon-s-home" />
      <span>Home</span>
    </el-menu-item>
    <el-menu-item
      index="3"
      :disabled="btnChapterDisabled"
      @click="clickChapter"
    >
      <i class="el-icon-notebook-2" />
      <span>Chapter</span>
    </el-menu-item>
    <el-submenu index="4">
      <template #title>
        <i class="el-icon-collection" />
        <span>Manga</span>
      </template>
      <el-menu-item index="4-1">
        Manga List
      </el-menu-item>
      <el-menu-item index="4-2">
        Chapter
      </el-menu-item>
      <el-menu-item index="4-3">
        Page
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="5">
      <i class="el-icon-download" />
      <span>Download</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-search" />
      <span>Search</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-setting" />
      <span>Settings</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { RouteParams} from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import { ElMenu, ElMenuItem, ElSubmenu } from 'element-plus';

export default defineComponent({
  name: 'SideMenu',
  components: {
    ElMenu,
    ElMenuItem,
    ElSubmenu,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isCollapse = ref(true);
    const clickChapter = () => {
      const params: string | string[] | undefined = route.params.pageId;
      if (params !== undefined) {
        const chapterId = (params as string).split('/')[0];
        router.push({ name: 'chapter', params: { chapId: chapterId } });
      } else {
        console.log('tidak ke home');
      }
    };

    const btnChapterDisabled = ref(true);

    watch(
      () => route.params,
      async (newParams: RouteParams) => {
        if (newParams.pageId !== undefined) {
          btnChapterDisabled.value = false;
        } else {
          btnChapterDisabled.value = true;
        }
      }
    );

    return { isCollapse, clickChapter, btnChapterDisabled };
  },
});
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu-vertical-demo {
  border: none;
  min-height: 100vh;
  height: 100%;
}
</style>
