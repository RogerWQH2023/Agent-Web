/**
 * @description Chat APIs & Chat MockAPIs
 * @author RogerWQH2023
 */

import { mockSearchDialogDataById, mockSearchHistoryList, mockSearchOptionalQuestions } from "./mock/api.mock";
import type { AgentType } from '@/types/index.d.ts'
import { API } from "./typing";
import axios from "axios";




/* Real APIs */
const BASE_URL = "http://10.130.11.30:8001";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
});


/**
 * 生成回答
 * @param 
 */
export async function getNewMessage(requestBody: API.GISQAChatRequest) {
  const response = await axiosInstance.post<API.GISQAChatResponse>(
    "/chat",
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (response)
    if (response.data.errcode !== 0) {
      return {
        errmsg: response.data.errmsg,
        messages: null
      };
    }
  return {
    errmsg: response.data.errmsg,
    messages: response.data.messages
  };
}


/* Mock apis */
// 获取历史记录列表，目前为mock数据
export async function mockGetHistoryList() {
  const response = await mockSearchHistoryList();
  return response as API.HistoryListResponse;
}
// 获取问题列表，目前为mock数据
export async function mockGetOptionalQuestions() {
  const response = await mockSearchOptionalQuestions();
  return response as API.OptionalQuestionsResponse;
}
// 根据id获取对话信息，目前为mock数据
export async function mockGetDialogDataById(dialogId: string) {
  const response = await mockSearchDialogDataById(dialogId);
  return response as API.DialogDataResponse;
}

/* 新建对话的mock逻辑，将问题暂存在LocalStorage */
export async function mockGetNewDialogId(type: AgentType, question: string) {
  // 添加1/4秒的读数据延迟
  await new Promise((resolve) => setTimeout(resolve, 250));
  const message = {
    type: "openai",
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: question }]
  };
  localStorage.setItem("tempType", type);
  localStorage.setItem("tempMessage", JSON.stringify(message));
  return "demo-id-zju24";
}

/* 新建对话的mock逻辑，发送问题，返回新的回答 */
export async function mockGetNewMessage(requestParam: API.GISQAChatRequest) {
  // 添加1秒的读数据延迟
  await new Promise((resolve) => setTimeout(resolve, 1000));
  requestParam.messages.push({ role: "assistant", content: "Roger That!" });
  return requestParam;
}




