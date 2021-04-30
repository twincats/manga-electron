<template>
  <div class="px-3">
    <div class="text-center">
      <div
        v-if="false"
        class="mb-5"
      >
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
          v-for="(item, i) in mangas"
          :key="i"
          class="group mb-2 2xl:w-3/24 xl:w-1/7 lg:w-2/12 md:w-2/10 sm:w-4/12 w-1/2 flex flex-col"
          @click="routeTo(item)"
        >
          <div
            class="p-1 group-hover:cursor-pointer group-hover:bg-orange-400 bg-orange-500 mx-1 rounded-md"
          >
            <div class="overflow-hidden relative rounded">
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
            class="group-hover:cursor-pointer group-hover:bg-orange-400 bg-orange-500 p-2 m-1 h-full rounded-md flex justify-center items-center"
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
  <dialog-manga />
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  onMounted,
  watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { ElImage } from 'element-plus';
import { useIpc, useService } from '/@/use/hooks';
import { manga_directory } from '/@/use/storage';
import loadImage from '/@/use/images';
import DialogManga from '/@/components/DialogManga.vue';

export default defineComponent({
  components: {
    ElImage,
    DialogManga,
  },
  setup() {
    const data = reactive({ manga: [''], showDialog: false });
    const { getFolderList } = useService('MangaService');
    const { invoke } = useIpc();

    const router = useRouter();

    const routeTo = (paramId: number | string): void => {
      router.push({ name: 'chapter', params: { chapId: paramId } });
    };

    const callMain = () => {
      invoke('msg', 'Achul').then((res) => {
        alert(res);
      });
    };

    const mangas = computed(() => {
      return data.manga.filter((val) => {
        return val != 'Manga Tidak Ditemukan';
      });
    });

    watch(
      () => manga_directory.value,
      async () => {
        callService();
      }
    );

    const callService = () => {
      if (manga_directory.value != '') {
        getFolderList(manga_directory.value).then((result: string[]) => {
          data.manga = result;
        });
      }
    };

    onMounted(() => {
      callService();
    });

    return {
      callMain,
      callService,
      ...toRefs(data),
      mangas,
      loadImage,
      routeTo,
    };
  },
});
</script>
