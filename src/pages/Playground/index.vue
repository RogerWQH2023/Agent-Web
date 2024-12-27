<script lang="ts" setup>
import Workflow from "@/pages/Workflow/index.vue"
import { useSessionStore } from "@/store/session.ts";
import { onMounted } from "vue";

const sessionStore = useSessionStore();

/* onMounted(() => {
  sessionStore.session.question =
    "Extract elevation data of Sri Lanka from multiple TIF files using the shape of the island from a vector file.";
  sessionStore.chatted();
})  */
</script>

<template>
  <div class="playground-box">
    <!-- <Workflow /> -->

  </div>

</template>
<style lang="less" scoped>
.playground-box {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  bottom: 0.5rem;
  left: 0.5rem;
  background-color: white;
  border-radius: 0.9rem;
  overflow: hidden;

}
</style>
