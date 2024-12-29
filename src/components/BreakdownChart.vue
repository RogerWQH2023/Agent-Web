<script lang="ts" setup>
import G6 from "@antv/g6";
import { onMounted, onUnmounted, ref } from "vue";
import { useJobStore } from "@/store/job.ts";
import { IG6GraphEvent } from "@antv/g6-core/lib/types";
import { useGraphStore } from "@/store/graph.ts";
import { storeToRefs } from "pinia";
import { Task } from "@/type.ts";
import { tooltip } from "@/G6/plugins.ts";

const props = defineProps<{
  graphId: string;
}>();

const jobStore = useJobStore();
const graphStore = useGraphStore();
let { tree, graph } = storeToRefs(graphStore);

// 添加容器引用
const container = ref<HTMLElement | null>(null);
// 添加 ResizeObserver 引用
let resizeObserver: ResizeObserver | null = null;

const getGraphNum = function () {
  return "mountNode-" + props.graphId;
};

// 添加重绘函数
const handleResize = () => {
  if (tree.value) {
    tree.value.changeSize(
      container.value?.clientWidth || 800,
      container.value?.clientHeight || 600
    );
    tree.value.fitCenter(); // 重新居中
  }
};

onMounted(() => {
  console.log("breakdown");
  // 获取容器元素
  //container.value = document.getElementById(getGraphNum());
  tree.value = new G6.TreeGraph({
    container: container.value!,
    animate: false,
    linkCenter: true,
    // 设置初始宽高
    width: container.value?.clientWidth || 800,
    height: container.value?.clientHeight || 600,
    layout: {
      type: "indented",
      direction: "LR",
      indent: 50,
    },
    modes: {
      default: [
        "drag-canvas",
      ],
    },
    plugins: [tooltip],
    defaultNode: {
      type: "breakdownNode",
    },
    defaultEdge: {
      type: "indentedEdge",
    },
  });

  tree.value.data(jobStore.breakdownData);
  tree.value.render();
  tree.value.fitCenter();

  // 添加事件监听
  tree.value.on("node:mouseover", (evt: IG6GraphEvent) => {
    const node = evt.item;
    node?.setState("hover", true);
    const EqNode = graph.value!.find("node", (n) => {
      return (
        (n.getModel().task as Task).name ===
        (node?.getModel().task as Task).name
      );
    });
    if (EqNode) {
      graph.value!.setItemState(EqNode, "hover", true);
    }
  });

  tree.value.on("node:mouseout", (evt: IG6GraphEvent) => {
    const node = evt.item;
    node?.setState("hover", false);
    const EqNode = graph.value!.find("node", (n) => {
      return (
        (n.getModel().task as Task).name ===
        (node?.getModel().task as Task).name
      );
    });
    if (EqNode) {
      graph.value!.setItemState(EqNode, "hover", false);
    }
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
