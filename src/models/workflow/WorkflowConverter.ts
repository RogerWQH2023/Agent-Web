import { Task } from "@/type";
import { OriTask } from "@/types";
import { job2G6TreeGraph, jobLeafNode2G6Graph } from "@/utils/graphUtil";

export class WorkflowConverter {
  static OriTaskToTask(data: OriTask) {
    const children = data.subtasks;
    const task = new Task(data.task, data.toolId, data.toolName);

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        task.addChild(WorkflowConverter.OriTaskToTask(children[i]));
      }
    }
    return task;
  }
  static TaskToBreakdownData(data: Task) {
    return job2G6TreeGraph(data);
  }
  static TaskToWorkflowData(data: Task) {
    return jobLeafNode2G6Graph(data);
  }


}
