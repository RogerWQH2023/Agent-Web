import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlaygroundStore = defineStore("playground", () => {
  const expand = ref<boolean>(false);
  const content = ref<string>("none");

  return { expand, content };
});
