<!--
    @Description:
    @Author: Chris
    @Date: 2024/6/7
-->
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import G6 from "@antv/g6";
import { useJobStore } from "@/store/OutDatedStore/job.ts";
import { useTaskStore } from "@/store/task.ts";
import { IG6GraphEvent } from "@antv/g6-core/lib/types";
import { useGraphStore } from "@/store/OutDatedStore/graph.ts";
import { storeToRefs } from "pinia";
import { Task } from "@/type.ts";

const props = defineProps<{
  graphId: string;
}>();

// 添加容器引用
const container = ref<HTMLElement | null>(null);
// 添加 ResizeObserver 引用
let resizeObserver: ResizeObserver | null = null;

const jobStore = useJobStore();
const taskStore = useTaskStore();
const graphStore = useGraphStore();
let { graph, tree } = storeToRefs(graphStore);

const getGraphNum = function () {
  return "mountNode-" + props.graphId;
};

// 添加重绘函数
const handleResize = () => {
  if (graph.value && container.value) {
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;

    // 更新画布大小
    graph.value.changeSize(width, height);

    // 更新布局配置
    graph.value.updateLayout({
      type: "dagre",
      ranksep: Math.min(height * 0.1, 12), // 动态调整节点间距
    });

    // 重新渲染并居中
    graph.value.refresh();
    graph.value.fitCenter();
  }
};

onMounted(() => {
  console.log("workflow");
  // 获取容器元素
  container.value = document.getElementById(getGraphNum());

  graph.value = new G6.Graph({
    container: getGraphNum(),
    fitCenter: true,
    // 设置初始宽高
    width: container.value?.clientWidth || 800,
    height: container.value?.clientHeight || 600,
    layout: {
      type: "dagre",
      ranksep: 12,
    },
    modes: {
      default: ["activate-node", "drag-canvas"],
    },
    defaultNode: {
      type: "workflowNode",
    },
    defaultEdge: {
      type: "workflowEdge",
    },
  });

  graph.value.data(jobStore.workflowData);
  graph.value.render();

  const group = graph.value.get("edgeGroup");
  group.toFront();

  graph.value.on("click", () => {
    taskStore.close();
  });

  graph.value.on("node:mouseover", (evt: IG6GraphEvent) => {
    const node = evt.item;
    node?.setState("hover", true);
    tree.value!.setItemState(
      tree.value!.find("node", (n) => {
        return (
          (n.getModel().task as Task).name ===
          (node?.getModel().task as Task).name
        );
      })!,
      "hover",
      true,
    );
  });
  graph.value.on("node:mouseout", (evt: IG6GraphEvent) => {
    const node = evt.item;
    node?.setState("hover", false);
    tree.value!.setItemState(
      tree.value!.find("node", (n) => {
        return (
          (n.getModel().task as Task).name ===
          (node?.getModel().task as Task).name
        );
      })!,
      "hover",
      false,
    );
  });

  // 创建 ResizeObserver 实例
  resizeObserver = new ResizeObserver(() => {
    handleResize();
  });

  // 开始观察容器大小变化
  if (container.value) {
    resizeObserver.observe(container.value);
  }
});

// 在组件卸载时清理
onUnmounted(() => {
  if (resizeObserver && container.value) {
    resizeObserver.unobserve(container.value);
    resizeObserver = null;
  }
});
</script>

<template>
  <div :id="getGraphNum()" ref="container"></div>
</template>

<style lang="less" scoped>
[id^="mountNode"] {
  height: 100%;
}
</style>
