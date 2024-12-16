import axios from "axios";


const fetchMockData = async (url: string) => {
  try {
    // 添加1秒的延迟
    await new Promise((resolve) => setTimeout(resolve, 500));
    //进行请求
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching mock data from ${url}:`, error);
    return [];
  }
}


export const mockSearchHistoryList = async () => {
  try {
    const mockData = await fetchMockData("/mock-data/history.json");
    return {
      code: 200,
      msg: '成功',
      data: mockData,
    };
  } catch (error) {
    console.error('获取mock历史记录时出错:', error);
    return { code: 500, msg: '获取mock历史记录时出错', data: null };
  }
};

export const mockSearchOptionalQuestions = async () => {
  try {
    const mockData = await fetchMockData("/mock-data/optional-questions.json");
    return {
      code: 200,
      msg: '成功',
      data: mockData,
    };
  } catch (error) {
    console.error('获取mock可选问题时出错:', error);
    return { code: 500, msg: '获取mock可选问题时出错', data: null };
  }
};

export const mockSearchDialogDataById = async (dialogId: string) => {
  try {
    const mockData = await fetchMockData("/mock-data/dialog-data.json");
    if (mockData[dialogId]) {
      return {
        code: 200,
        msg: '成功',
        data: mockData[dialogId],
      }
    }
    else return {
      code: 500,
      msg: '不存在该对话数据',
      data: null
    };
  } catch (error) {
    console.error('获取mock对话数据时出错:', error);
    return { code: 500, msg: '获取mock对话数据时出错', data: null };
  }
};