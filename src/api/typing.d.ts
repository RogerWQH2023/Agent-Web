import type { AgentType } from "@/types/index.d.ts";

declare namespace API {
  // 历史记录查询返回体
  interface HistoryListResponse {
    code: number;
    msg: string;
    data: Array<{
      dialogId: string;
      meta: {
        title: string;
        timeStamp: string;
      }
    }>;
  }
  // 可选问题查询返回体
  interface OptionalQuestionsResponse {
    code: number;
    msg: string;
    data: Array<{
      questionId: string,
      title: string,
      type: AgentType,
      content: string
    }>;
  }

  type UserContentType =
    | { type: "text", content: string };

  type AgentContentType =
    | { type: "text", content: string };

  type DialogData = {
    dialogId: string,
    title: string,
    timeStamp: string,
    content: Array<DialogSubContent>;
  };

  type DialogSubContent =
    | { role: "user" } & UserContentType
    | { role: "agent" } & AgentContentType

  // 可选问题查询返回体
  interface DialogDataResponse {
    code: number;
    msg: string;
    data: DialogData;
  }

  interface GISQAChatMessage {
    role: "user" | "assistant",
    content: string
  }
  interface GISQAChatRequest {
    type: string,
    model: string,
    messages: Array<GISQAChatMessage>

  }
};