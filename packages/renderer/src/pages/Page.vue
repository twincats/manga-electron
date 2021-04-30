<template>
  <div id="page">
    <div class="xl:px-80">
      <el-image
        v-for="(item, i) in imgList"
        :key="i"
        fit="fill"
        style="display: block"
        class="mb-2"
        :src="loadImage(item)"
        lazy
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useService } from '/@/use/hooks';
import loadImage from '/@/use/images';
import { ElImage } from 'element-plus';

export default defineComponent({
  components: { ElImage },
  setup() {
    const route = useRoute();
    const { getFolderList } = useService('MangaService');
    const imgList = ref(['']);
    const dir = ref('');

    const loadPages = () => {
      if (dir.value == '') {
        dir.value = 'D:/DATA/Manga/' + route.params.pageId;
      }
      getFolderList(dir.value).then((result: string[]) => {
        //natural sort order
        const fullImage = result.map((val) => {
          return dir.value + '/' + val;
        });

        imgList.value = fullImage;
      });
    };

    onMounted(() => {
      loadPages();
    });

    watch(
      () => route.params,
      async (newParams) => {
        const pageId = newParams.pageId;
        if (pageId != undefined) {
          dir.value = 'D:/DATA/Manga/' + pageId;
          loadPages();
        }
      }
    );

    return { imgList, loadImage };
  },
});
</script>

<style>
#page {
  height: calc(100vh - 49px);
  overflow: auto;
}
</style>
