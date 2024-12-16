import { mockSearchDialogDataById, mockSearchHistoryList, mockSearchOptionalQuestions } from "./mock/api.mock";
/* Mock apis */
// 获取历史记录列表，目前为mock数据
export async function getHistoryList() {
  const response = await mockSearchHistoryList();
  return response as API.HistoryListResponse;
}
// 获取问题列表，目前为mock数据
export async function getOptionalQuestions() {
  const response = await mockSearchOptionalQuestions();
  return response as API.OptionalQuestionsResponse;
}
// 根据id获取对话信息，目前为mock数据
export async function getDialogDataById(dialogId: string) {
  const response = await mockSearchDialogDataById(dialogId);
  return response as API.DialogDataResponse;
}