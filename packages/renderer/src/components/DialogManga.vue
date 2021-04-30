<template>
  <div>
    <el-dialog
      v-model="showDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
      title="Set Manga Directory"
    >
      <el-form :model="form">
        <el-form-item
          label="Manga Directory"
          label-width="120px"
        >
          <el-input
            v-model="form.mangaDirectory"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="checkExist"
          >Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useService } from '/@/use/hooks';
import { manga_directory } from '/@/use/storage';
import { ElDialog, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';

export default defineComponent({
  name: 'DialogManga',
  components: { ElDialog, ElForm, ElFormItem, ElInput },
  setup() {
    const form = reactive({
      mangaDirectory: '',
    });

    const { folderExist } = useService('MangaService');
    const initial = manga_directory.value === '' ? true : false;
    const showDialog = ref(initial);

    const checkExist = () => {
      if (form.mangaDirectory === '') {
        ElMessage.error('Manga Directory harus diisi');
      } else {
        folderExist(form.mangaDirectory).then((exist: boolean) => {
          if (exist) {
            manga_directory.value = form.mangaDirectory;
            ElMessage.success('Saved');
            showDialog.value = false;
          } else {
            ElMessage.error('Manga Directory tidak Valid');
          }
        });
      }
    };

    return { form, showDialog, checkExist };
  },
});
</script>

<style scoped></style>
