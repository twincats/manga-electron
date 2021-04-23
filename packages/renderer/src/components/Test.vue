<template>
  <div class="h-screen justify-center items-center flex">
    <h1 class="text-5xl text-center w-100">
      Hello, Selamat Datang
    </h1>
    <el-button
      type="primary"
      @click="callMain"
    >
      Call Main
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useIpc } from '/@/use/electron';

export default defineComponent({
  setup() {
    const { invoke } = useIpc();
    const callMain = () => {
      invoke('msg', 'Achul').then((res) => {
        alert(res);
      });
    };

    return {
      callMain,
    };
  },
});
</script>
