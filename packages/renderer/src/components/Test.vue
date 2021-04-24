<template>
  <div class="">
    <div class="text-center">
      <div class="mb-5">
        <h1 class="text-5xl text-center w-full my-2">
          Selamat Datang di Manga Eletron
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
        v-if="manga.length > 1"
        class="flex flex-wrap"
      >
        <div
          v-for="(item, i) in manga"
          :key="i"
          class="group mb-2 2xl:w-3/24 xl:w-1/7 lg:w-2/12 md:w-2/10 sm:w-4/12 w-1/2 flex flex-col"
        >
          <div
            class="p-1 group-hover:bg-orange-400 bg-orange-500 mx-1 rounded-md"
          >
            <div class="overflow-hidden relative rounded">
              <!-- <img
                class="absolute h-full m-auto -left-999px -right-999px"
                :src="loadImage('D:/DATA/Manga/' + item + '/cover.webp')"
              /> -->
              <el-image
                fit="cover"
                style="display: block"
                class="h-70"
                :src="loadImage('D:/DATA/Manga/' + item + '/cover.webp')"
                lazy
              />
            </div>
          </div>

          <div
            class="group-hover:bg-orange-400 bg-orange-500 p-2 m-1 h-full rounded-md flex justify-center items-center"
            :title="item.length > 45 ? item : ''"
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
import { ElImage } from 'element-plus';
import { useIpc, useService } from '/@/use/hooks';
import loadImage from '/@/use/images';

export default defineComponent({
  components: {
    ElImage,
  },
  setup() {
    const data = reactive({ manga: [''] });
    const { getFolderList } = useService('MangaService');
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
      loadImage,
    };
  },
});
</script>
