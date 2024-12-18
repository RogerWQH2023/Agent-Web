import DialogIcon from "@/assets/icons/Dialog.svg"
import WorkflowIcon from "@/assets/icons/Workflow.svg"
import type { AgentType } from "@/types/index.d.ts"

export const modeData: {
  [key: string]: {
    type: AgentType,
    title: string,
    iconUrl: string,
    describe: string
  }
} = {
  "chat": {
    type: "chat",
    title: "GIS Agent",
    iconUrl: DialogIcon,
    describe: "与大模型GIS专家直接交流！"
  },
  "workflow": {
    type: "workflow",
    title: "Workflow",
    iconUrl: WorkflowIcon,
    describe: "让大模型生成GIS工作流，并运行它！"
  }
};