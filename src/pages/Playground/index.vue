<script lang="ts" setup>
import WorkflowPlaygroundContent from "@/components/PlaygroundContent/WorkflowPlaygroundContent.vue"
import DefaultPlaygroundContent from "@/components/PlaygroundContent/DefaultPlaygroundContent.vue"
import { usePlaygroundStore } from "@/store/playground";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const { type } = storeToRefs(usePlaygroundStore());

onMounted(() => {
}) 
</script>

<template>
  <div class="playground-box">
    <DefaultPlaygroundContent v-if="type === 'none'" />
    <WorkflowPlaygroundContent v-if="type === 'workflow'" />
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
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

}
</style>
