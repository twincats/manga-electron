<template>
  <div
    v-if="showNav"
    class="h-12 fixed bottom-0 leading-3 p-2 w-full bg-true-gray-900"
  >
    <div class="flex justify-center">
      <button
        :disabled="prev == false"
        class="navBtn"
        @click="goPageRoute(prev)"
      >
        <i-mdi-skip-previous />
      </button>
      <button
        class="navBtn"
        @click="goChapterRoute"
      >
        <i-mdi-home />
      </button>
      <button
        :disabled="next == false"
        class="navBtn"
        @click="goPageRoute(next)"
      >
        <i-mdi-skip-next />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useService } from '/@/use/hooks';

export default defineComponent({
  name: 'PageNav',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const showNav = ref(false);
    const { getFolderList } = useService('MangaService');
    const navigation: {
      prev: boolean | string;
      next: boolean | string;
    } = reactive({
      prev: false,
      next: false,
    });

    watch(
      () => route.name,
      async (newRouteName) => {
        if (newRouteName == 'page') {
          showNav.value = true;
        } else {
          showNav.value = false;
        }
      }
    );

    watch(
      () => route.params,
      async (newParams) => {
        getListChap(newParams.pageId as string);
      }
    );

    const numberChap = (chap: string[]): number[] => {
      const filter = chap.filter((val) => {
        return isNaN(+val) !== true;
      });
      return filter.map((x) => +x).sort((a, b) => a - b);
    };

    const navChap = (numChap: number[], chap: number) => {
      const chaplength = numChap.length;
      const index = numChap.findIndex((val) => val == chap);
      const p = index - 1 < 0 ? false : numChap[index - 1];
      const n = index + 1 >= chaplength ? false : numChap[index + 1];
      return { prev: p, next: n };
    };

    const getListChap = (params: string): void => {
      const param = params?.split('/');
      if (param) {
        const chapter = param[0];
        const currentChap = param[1];

        getFolderList('D:/DATA/Manga/' + chapter).then((res) => {
          const d = numberChap(res);
          const nav = navChap(d, +currentChap);
          navigation.prev =
            nav.prev == false ? nav.prev : chapter + '/' + nav.prev;
          navigation.next =
            nav.next == false ? nav.next : chapter + '/' + nav.next;
        });
      }
    };

    const goPageRoute = (nav: string | boolean) => {
      if (nav != false) {
        router.push({ name: 'page', params: { pageId: nav as string } });
      }
    };

    const goChapterRoute = () => {
      const pageId = route.params.pageId;
      if (pageId != undefined) {
        router.push({
          name: 'chapter',
          params: { chapId: (pageId as string).split('/')[0] },
        });
      }
    };

    return { showNav, goPageRoute, goChapterRoute, ...toRefs(navigation) };
  },
});
</script>

<style lang="postcss" scoped>
.navBtn {
  @apply bg-true-gray-800 px-5 py-1 rounded mx-1 disabled:bg-true-gray-900 disabled:border disabled:border-true-gray-500 disabled:cursor-not-allowed disabled:text-true-gray-500;
}

.navBtn:hover {
  @apply bg-true-gray-400 disabled:bg-true-gray-900;
}
</style>
