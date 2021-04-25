<template>
  <div>
    <h1>Page gambar</h1>

    <div>
      <el-image
        v-for="(item, i) in chapterList"
        :key="i"
        fit="cover"
        style="display: block"
        :src="loadImage(item)"
        lazy
      />
    </div>
    <router-link to="/">
      Home
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useService } from '/@/use/hooks';
import loadImage from '/@/use/images';
import { ElImage } from 'element-plus';

export default defineComponent({
  components: { ElImage },
  setup() {
    const route = useRoute();
    const params = route.params.pageId;
    const { getFolderList } = useService('MangaService');
    const imgList = ref(['']);
    const dir = 'D:/DATA/Manga/' + params;
    getFolderList(dir).then((result: string[]) => {
      imgList.value = result;
    });

    const chapterList = computed(() => {
      return imgList.value.map((val) => {
        return dir + '/' + val;
      });
    });

    return { imgList, chapterList, loadImage };
  },
});
</script>

<style scoped></style>
