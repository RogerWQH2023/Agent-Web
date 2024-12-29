export type AgentType = "chat" | "workflow";

export type GISQAMessage<T extends AgentType> = GISQAMessageType[T];

export type GISQAMessageType = {
  "chat": GISQAChatMessage;
  "workflow": GISQAWorkflowMessage;
}
export type GISQAChatMessage = {
  role: "user" | "assistant",
  content: string
}
export type GISQAWorkflowMessage = {
  role: "user",
  content: string
} | {
  role: "assistant",
  content: OriTask
}

export interface OriTask {
  task: string;
  toolId: string;
  toolName: string;
  subtasks: Array<OriTask>;
}