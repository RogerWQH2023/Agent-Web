import { defineStore } from "pinia";
import { ref } from "vue";
import { BreakDownChart } from "@/models/workflow/BreakDownChart";
import { WorkflowChart } from "@/models/workflow/WorkflowChart";

export const useWorkflowStore = defineStore("graph", () => {
  const needUpdate = ref<boolean>(false);
  const activeBreakdownChart = ref<BreakDownChart | null>(null);
  const activeWorkflowChart = ref<WorkflowChart | null>(null);
  return { needUpdate, activeBreakdownChart, activeWorkflowChart };
});

