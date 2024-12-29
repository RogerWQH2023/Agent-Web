/**
 * @Description: Workspace Store
 * @Author: Chris
 * @Date: 2024/7/23
 */
import { defineStore } from "pinia";
import { FileNode, Response } from "@/type.ts";
import { fetchWorkspace } from "@/api";
import { computed, ref } from "vue";

export const useWorkspaceStore = defineStore("workspace", () => {
  let root = ref<FileNode>();

  async function updateData() {
    const res = (await fetchWorkspace()).data as Response<FileNode>;
    root.value = res.data;
  }

  const treeData = computed(() => root.value as unknown as FileNode[] || []);

  return { treeData, updateData };
});
