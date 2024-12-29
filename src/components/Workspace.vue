<!--
    @Description: Workspace Component
    @Author: Chris
    @Date: 2024/7/24
-->
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWorkspaceStore } from "@/store/workspace.ts";
import { onMounted } from "vue";

// TODO 上传 下载 删除
const workspaceStore = useWorkspaceStore();
const { treeData } = storeToRefs(workspaceStore);

const treeProps = {
  label: "name",
};


onMounted(async () => {
  await workspaceStore.updateData();
});
</script>

<template>
  <el-tree show-checkbox :data="treeData" :props="treeProps" />
</template>

<style lang="less" scoped></style>
