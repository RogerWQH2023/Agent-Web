import { Task } from "@/type";
import { Graph, IG6GraphEvent, Tooltip, TreeGraph } from "@antv/g6";
import { WorkflowConverter } from "./WorkflowConverter";
import { OriTask } from "@/types";

export class BreakDownChart {
  //private _id: string;
  private _container: HTMLElement;
  private _resizeObserver: ResizeObserver | null = null;
  private _task: Task;
  private _graph: TreeGraph | undefined = undefined;
  private _activeEvent: Array<(e: IG6GraphEvent) => void> = [];
  constructor(container: HTMLElement, oriTask: OriTask) {
    this._container = container;
    this._task = WorkflowConverter.OriTaskToTask(oriTask);
  }

  init() {
    /* 添加tooltip,这个图的插件需要单独配置，共用一个常量有bug */
    const tooltipPlugin = new Tooltip({
      className: "g6-custom-tooltip",
      /*       container: this._container, */
      fixToNode: [1, 0.5],
      offsetX: -135,
      offsetY: -25,
      getContent(e) {
        return `${(e?.item?.getModel().task as Task).name}`;
      },
      itemTypes: ["node"],
    });

    this._graph = new TreeGraph({
      container: this._container,
      animate: false,
      linkCenter: true,
      // 设置初始宽高
      width: this._container.clientWidth || 800,
      height: this._container.clientHeight || 600,
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
      plugins: [tooltipPlugin],
      defaultNode: {
        type: "breakdownNode",
      },
      defaultEdge: {
        type: "indentedEdge",
      },
    });

    /* 添加数据与初始渲染 */
    const data = WorkflowConverter.TaskToBreakdownData(this._task);
    this._graph.data(data);
    this._graph.render();
    this._graph.fitCenter();

    /* 添加初始hover事件 */
    // 添加事件监听
    this._graph.on("node:mouseover", (evt: IG6GraphEvent) => {
      const node = evt.item;
      node?.setState("hover", true);
    });

    this._graph.on("node:mouseout", (evt: IG6GraphEvent) => {
      const node = evt.item;
      node?.setState("hover", false);
    });
    /* 添加重绘事件 */
    // 添加重绘函数
    const handleResize = () => {
      if (this._graph) {
        this._graph.changeSize(
          this._container.clientWidth || 800,
          this._container.clientHeight || 600
        );
        this._graph.fitCenter(); // 重新居中
      }
    };
    // 创建 ResizeObserver 实例
    this._resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    // 开始观察容器大小变化
    if (this._container) {
      this._resizeObserver.observe(this._container);
    }
  }

  activated(workflowChart: Graph) {
    // 添加事件监听
    if (!this._graph) return;

    const overEvent = (evt: IG6GraphEvent) => {
      if (!workflowChart) return;
      const node = evt.item;
      const EqNode = workflowChart.find("node", (n) => {
        return (
          (n.getModel().task as Task).name ===
          (node?.getModel().task as Task).name
        );
      });
      if (EqNode) {
        workflowChart.setItemState(EqNode, "hover", true);
      }
    }

    const outEvent = (evt: IG6GraphEvent) => {
      if (!workflowChart) return;
      const node = evt.item;
      const EqNode = workflowChart.find("node", (n) => {
        return (
          (n.getModel().task as Task).name ===
          (node?.getModel().task as Task).name
        );
      });
      if (EqNode) {
        workflowChart.setItemState(EqNode, "hover", false);
      }
    };

    // 添加事件监听
    this._graph.on("node:mouseover", overEvent);
    this._graph.on("node:mouseout", outEvent);

    this._activeEvent.push(overEvent, outEvent);
  }

  deactivated() {
    if (!this._graph || this._activeEvent.length === 0) return;
    this._graph.off("node:mouseover", this._activeEvent[0]);
    this._graph.off("node:mouseout", this._activeEvent[1]);
    this._activeEvent = [];
  }

  destroy() {
    this.deactivated();
    if (this._resizeObserver && this._container) {
      this._resizeObserver.unobserve(this._container);
      this._resizeObserver = null;
    }
    this._graph?.destroy();

  }

  get task() {
    return this._task;
  }

  get graph() {
    return this._graph;
  }


}