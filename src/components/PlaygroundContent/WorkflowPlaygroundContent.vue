<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useWorkflowStore } from "@/store/workflow";
import { Graph, TreeGraph } from "@antv/g6";
import { useTaskStore } from "@/store/task";
import TaskConfig from "@/components/TaskConfig.vue";
import Workspace from "@/components/Workspace.vue";


// 添加容器引用
const container = ref<HTMLElement | null>(null);
const workspaceOpen = ref<boolean>(false);

// 获取store
const { needUpdate, activeBreakdownChart, activeWorkflowChart } = storeToRefs(useWorkflowStore());
const taskStore = useTaskStore();



watch(needUpdate, (newValue, _oldValue) => {
  // 当 needUpdate 变为 true 时执行操作
  if (newValue) {
    if (activeBreakdownChart.value && activeWorkflowChart.value) {
      if (container.value) {
        activeWorkflowChart.value.init(container.value);

        /* 配置图像 */
        const group = activeWorkflowChart.value.graph!.get("edgeGroup");
        group.toFront();
        activeWorkflowChart.value.graph!.on("click", () => {
          taskStore.close();
        });
        taskStore.close();

        activeBreakdownChart.value.activated(activeWorkflowChart.value.graph as Graph);
        activeWorkflowChart.value.activated(activeBreakdownChart.value.graph as TreeGraph);

      }
    }
    // 重置状态
    needUpdate.value = false;
  }
});

const openWorkspace = () => {
  workspaceOpen.value = true;
}
const closeWorkspace = () => {
  workspaceOpen.value = false;
}

// 在组件卸载时清理
onUnmounted(() => {
  if (activeBreakdownChart.value && activeWorkflowChart.value) {
    taskStore.close();
    activeBreakdownChart.value.deactivated();
    activeWorkflowChart.value.destroy();
    activeBreakdownChart.value = null;
    activeWorkflowChart.value = null;
  }
});
</script>

<template>
  <div class="content-container">
    <div class="content-title">Workflow</div>

    <div ref="container" class="workflow-chart">
      <img class="workspace-button" src="@/assets/icons/Workspace.svg" title="Workspace" @click="openWorkspace" />
      <div v-if="workspaceOpen" class="workspace-box">
        <div class="workspace-title">Workspace</div>
        <img class="close-button" src="@/assets/icons/Close.svg" title="Close" @click="closeWorkspace" />
        <div class="workspace-container">
          <Workspace />
        </div>
      </div>
      <TaskConfig v-if="taskStore.isShowed" />
    </div>
  </div>

</template>

<style lang="less" scoped>
.content-container {
  /* 禁用滑动选取 */
  -webkit-user-select: none;
  user-select: none;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff1e7;
  width: 100%;
  height: 100%;

}

.content-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  line-height: 3rem;
}

.workspace-box {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  bottom: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  width: 300px;
  overflow: hidden;

  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
      scale: 1.05;
    }
  }

  .workspace-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    color: black;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    line-height: 3rem;
  }

  .workspace-container {
    position: absolute;
    top: 3rem;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
    overflow: hidden;
    overflow-y: scroll;
  }
}

.workspace-button {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
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

.workflow-chart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 3rem);
  background-color: #ededed;
  background-image: linear-gradient(#dddddd 1px, transparent 1px),
    linear-gradient(90deg, #dddddd 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
