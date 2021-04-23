<template>
  <div class="">
    <div class="text-center">
      <div class="mb-5">
        <h1 class="text-5xl text-center w-full my-2">
          Hello, Selamat Datang
        </h1>
        <el-button
          type="primary"
          @click="callMain"
        >
          Call Main
        </el-button>
        <el-button
          type="info"
          @click="callService"
        >
          Call Service
        </el-button>
      </div>
      <!-- <div>{{ mangaFilter }}</div> -->
      <div
        v-if="mangaFilter.length > 1"
        class="flex flex-wrap"
      >
        <div
          v-for="(item, i) in mangaFilter"
          :key="i"
          class="2xl:w-3/24 xl:w-1/6 md:w-3/12 sm:w-4/12 w-1/2 flex flex-col"
        >
          <div class="p-3 bg-orange-500 mx-1 rounded-md">
            <div class="min-h-250px overflow-hidden relative rounded">
              <img
                class="absolute m-auto -left-999px -right-999px"
                :src="'file://D:/DATA/Manga/' + item + '/cover.webp'"
              >
            </div>
          </div>
          <div
            class="bg-orange-500 p-3 m-1 h-full rounded-md flex justify-center items-center"
          >
            <div class="line-clamp-2">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue';
import { useIpc, useService } from '/@/use/hooks';

export default defineComponent({
  setup() {
    const data = reactive({ manga: [''] });
    const { invoke } = useIpc();
    const callMain = () => {
      invoke('msg', 'Achul').then((res) => {
        alert(res);
      });
    };

    const mangaFilter = computed(() => {
      return data.manga.filter((_val, i) => {
        return i < 50;
      });
    });

    const { getFolderList } = useService('MangaService');
    const callService = () => {
      getFolderList('D:\\DATA\\Manga').then((result: string[]) => {
        data.manga = result;
        // console.log(result);
      });
    };

    onMounted(() => {
      callService();
    });

    return {
      callMain,
      callService,
      ...toRefs(data),
      mangaFilter,
    };
  },
});
</script>
