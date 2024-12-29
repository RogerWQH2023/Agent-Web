<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { BreakDownChart } from "@/models/workflow/BreakDownChart";
import { OriTask } from "@/types";
import { storeToRefs } from "pinia";
import { usePlaygroundStore } from "@/store/playground";
import { useWorkflowStore } from "@/store/workflow";
import { WorkflowChart } from "@/models/workflow/WorkflowChart";

const props = defineProps<{
  taskData: OriTask;
}>();

// 添加容器引用
const container = ref<HTMLElement | null>(null);
const BreakdownChart = ref<BreakDownChart | undefined>(undefined);

// 获取store
const { needUpdate, activeBreakdownChart, activeWorkflowChart } = storeToRefs(useWorkflowStore());


onMounted(() => {
  if (container.value) {
    BreakdownChart.value = new BreakDownChart(container.value, props.taskData);
    BreakdownChart.value.init();
  }

});

const handleClick = () => {
  // 当点击按钮时，先清理原先的图，并配置新图（激活在palyground中进行）
  activeBreakdownChart.value?.deactivated();
  activeWorkflowChart.value?.destroy();
  activeBreakdownChart.value = BreakdownChart.value as BreakDownChart;
  activeWorkflowChart.value = new WorkflowChart(props.taskData);
  needUpdate.value = true;

  // 打开并配置playground
  const { expand, type } = storeToRefs(usePlaygroundStore());
  expand.value = true;
  type.value = "workflow";
}

// 在组件卸载时清理
onUnmounted(() => {
  BreakdownChart.value?.destroy();
});
</script>

<template>
  <div class="content-container">
    <div class="content-title">Generated workflow for you:</div>
    <br />
    <div ref="container" class="breakdown-chart">
      <img class="start-button" src="@/assets/icons/Play.svg" title="RUN" @click="handleClick" />
    </div>
    <br />
  </div>

</template>

<style lang="less" scoped>
.content-container {
  /* 禁用滑动选取 */
  -webkit-user-select: none;
  user-select: none;

  position: relative;
  width: 100%;
  font-weight: 600;
}

.start-button {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transition: 0.15s;

  &:hover {
    scale: 1.05;
  }

  &:active {
    scale: 0.95;
  }
}

.breakdown-chart {
  position: relative;
  height: 30rem;
  background-color: #fff1e7;
  border: 2px solid @workflow-color;
  border-radius: 5px;
  margin: 0 1rem;
  background-image: linear-gradient(#ffe1cb 1px, transparent 1px),
    linear-gradient(90deg, #ffe1cb 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
