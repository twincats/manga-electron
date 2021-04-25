<template>
  <div>
    <h1 class="text-xl text-center mb-3">
      Chapter Manga<br>{{ $route.params.chapId }}
    </h1>
    <router-link to="/">
      Home
    </router-link>
    <el-table
      :data="chapterList"
      :default-sort="{ prop: 'chapter', order: 'descending' }"
      @row-click="routeGo"
    >
      <el-table-column
        align="center"
        prop="chapter"
        label="Chapter"
      />
    </el-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useService } from '/@/use/hooks';

export default defineComponent({
  components: { ElTable, ElTableColumn },
  setup() {
    const { getFolderList } = useService('MangaService');
    const route = useRoute();
    const router = useRouter();
    const params = route.params.chapId;
    const folderList = ref(['']);
    const dir = 'D:/DATA/Manga/' + params;
    getFolderList(dir).then((result: string[]) => {
      folderList.value = result;
    });

    const chapters = computed(() => {
      return folderList.value.filter((val) => {
        return isNaN(+val) !== true;
      });
    });

    const chapterList = computed(() => {
      return chapters.value.map((val) => {
        return {
          chapter: +val,
          chapterPath: params + '/' + val,
        };
      });
    });

    const routeGo = (row: any) => {
      router.push({ name: 'page', params: { pageId: row.chapterPath } });
    };

    return { chapters, chapterList, routeGo };
  },
});
</script>

<style>
.el-table tr,
th {
  background-color: rgb(23, 23, 23) !important;
  color: rgb(233, 233, 233);
}
.el-table th {
  color: rgb(246, 127, 0);
}

.el-table tr:hover > td {
  background-color: rgb(64, 64, 64) !important;
}
</style>
