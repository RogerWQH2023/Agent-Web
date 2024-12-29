import G6 from "@antv/g6";
import { Task } from "@/type.ts";

export const tooltip = new G6.Tooltip({
  className: "g6-custom-tooltip",
  /*   container: document.body, */
  fixToNode: [1, 0.5],
  offsetX: 10,
  offsetY: 20,
  getContent(e) {
    return `${(e?.item?.getModel().task as Task).name}`;
  },
  itemTypes: ["node"],
});
