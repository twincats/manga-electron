<template>
  <div>
    <el-button>Default</el-button>
    <el-button type="primary">
      Primary
    </el-button>
    <el-button type="success">
      Success
    </el-button>
    <el-button type="info">
      Info
    </el-button>
    <el-button type="warning">
      Warning
    </el-button>
    <el-button type="danger">
      Danger
    </el-button>
    <button class="btn btn-primary ml-25">
      Success
    </button>
  </div>
  <div />
  <p>
    For a guide and recipes on how to configure / customize this project,<br>
    check out the
    <a
      href="https://github.com/cawa-93/vite-electron-builder"
      rel="noopener"
      target="_blank"
    >vite-electron-builder documentation</a>.
  </p>

  <p>
    <a
      href="https://vitejs.dev/guide/features.html"
      target="_blank"
    >Vite Documentation</a>
    |
    <a
      href="https://v3.vuejs.org/"
      target="_blank"
    >Vue 3 Documentation</a>
  </p>

  <hr>
  <button @click="count++">
    count is: {{ count }}
  </button>
  <p>
    Edit
    <code>renderer/components/Home.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HelloWorld',

  setup() {
    const count = ref(0);

    return { count };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.dd {
  @apply bg-orange-500;
}
</style>
