import { AgentType } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlaygroundStore = defineStore("playground", () => {
  const expand = ref<boolean>(false);
  const type = ref<AgentType | "none">("none");

  return { expand, type };
});
