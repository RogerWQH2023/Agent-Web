<script setup lang="ts">
import { useRoute } from "vue-router"
import InputBox from "@/components/InputBox/index.vue"
import UserBubble from "./components/UserBubble.vue";
import AssistantBubble from "./components/AssistantBubble.vue";
import { AgentType, GISQAChatMessage, GISQAMessage, OriTask } from "@/types";
import { usePlaygroundStore } from "@/store/playground";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { getNewMessage } from "@/api/chat";
import { API } from "@/api/typing";
import { fetchSimpleJob } from "@/api";
import WorkflowBubbleContent from "@/components/BubbleContents/WorkflowBubbleContent.vue";


const agentError = ref<boolean>(false);

// 定义路由参数的类型
interface RouteParams {
  type: AgentType; // 对应路由中的 :mode
  id: string;   // 对应路由中的 :id
}
// 使用类型断言来获取路由参数
const route = useRoute(); // 获取当前路由对象
const params = route.params as unknown as RouteParams;

/* 根据当前agent类型初始化message */
const messageData = ref<Array<GISQAMessage<typeof params.type>>>(
  new Array<GISQAMessage<typeof params.type>>()
)
const requestParams = ref<{ [key: string]: any }>({})

// 在组件加载时:
// 1. 关闭工作区
// 2. 获取对话数据
// 3. 根据对话数据更新组件 
onMounted(async () => {
  // 关闭工作区
  const { expand, type } = storeToRefs(usePlaygroundStore());
  expand.value = false;
  type.value = params.type === "chat" ? "none" : params.type === "workflow" ? "workflow" : "none";
  // 获取对话数据
  // 清空对话数据对象
  messageData.value?.splice(0, messageData.value.length);
  // 后端无存储时的逻辑：从localStorage获取数据
  const messageString = localStorage.getItem("tempMessage");
  if (messageString) {
    requestParams.value = JSON.parse(messageString);
    if (params.type === "chat") {
      if (requestParams.value.messages.length !== 0) {
        requestParams.value.messages.forEach((message: GISQAChatMessage) => {
          messageData.value?.push(message);
        });
        requestNewMessageData();
      }
      else {
        // 若初始无信息，则返回默认值；
        messageData.value?.push({ role: "assistant", content: "Hi master, I'm AI GIS Agent. What can I do for you?" })
      }
    }
    else if (params.type === "workflow") {
      messageData.value.push({ role: "user", content: requestParams.value.task });
      requestNewMessageData();
    }

  }


});




const handleInput = async (inputParams: { [key: string]: any }, content: string) => {
  messageData.value.push({ role: "user", content: content });
  if (params.type === "chat") {
    requestParams.value = { ...requestParams.value, ...inputParams, messages: messageData.value };
  }
  else if (params.type === "workflow") {
    requestParams.value = { ...requestParams.value, ...inputParams, task: content };

  }

  await requestNewMessageData();
}

const handleRetry = async () => {
  await requestNewMessageData();
}

const requestNewMessageData = async () => {
  // messageData.value = await mockGetNewMessage(messageData.value);
  try {
    if (params.type === "chat") {
      agentError.value = false;
      console.log(requestParams.value);
      const response = await getNewMessage(requestParams.value as API.GISQAChatRequest);
      if (response.messages) {
        messageData.value = response.messages;
      }
      else {
        console.error(response.errmsg);
        agentError.value = true;
      }
    }
    else if (params.type === "workflow") {
      const response = (await fetchSimpleJob(requestParams.value as API.JobRequest)).data;
      if (response.data) {
        messageData.value.push({ role: "assistant", content: response.data });
      }
    }

  }
  catch (error) {
    console.error(error);
    agentError.value = true;
  }

}

</script>

<template>
  <div class="main-container">
    <div class="chat-container">
      <div style="height:2rem"></div>
      <div v-for="(item, index) in messageData" :key="'dialogpage-message-' + index">
        <!-- 角色为user，返回用户气泡 -->
        <UserBubble v-if="item.role === 'user'" :type="params.type" :content="item.content" />
        <!-- 加载中/错误(最后发言的是用户)：返回正在生成中的气泡 -->
        <AssistantBubble v-if="item.role === 'user' && index === messageData.length - 1 && !agentError"
          :type="'loading'">
          {{ 'GENERATING' }}
        </AssistantBubble>
        <AssistantBubble v-if="item.role === 'user' && index === messageData.length - 1 && agentError" :type="'error'">
          {{ 'SERVICE ERROR' }}
          <span class="retry-button" @click="handleRetry">
            <img src="@/assets/icons/Retry.svg">
          </span>
        </AssistantBubble>
        <!-- 角色为assistant，返回助手气泡 -->
        <AssistantBubble v-if="item.role === 'assistant'" :type="params.type">
          <!-- 回答框逻辑：根据type提供不同的定制子组件 -->
          <!-- chat：返回文本 -->
          <div v-if="params.type === 'chat'">{{ item.content }}</div>
          <!-- workflow：返回文本+工作流组件 -->
          <div v-if="params.type === 'workflow'" style="width:100%">
            <WorkflowBubbleContent :taskData="item.content as OriTask" />
          </div>
        </AssistantBubble>
      </div>
      <div style="height:10rem;"></div>
    </div>
    <div class="title-container">
      <h3>Agent</h3>
    </div>
    <div class="inputbox-container">
      <InputBox :type="params.type" :inputOnClicked="handleInput" />
    </div>

  </div>
</template>

<style scoped lang="less">
.main-container {
  position: relative;
  width: 100%;
  height: 100%;

  .title-container {
    position: absolute;
    top: 0;
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, @bg-color, @bg-color, #00000000);

  }

  .chat-container {
    position: absolute;
    width: 100%;
    height: 90%;
    overflow-y: scroll;

    /* 设置滑动条样式 */
    &::-webkit-scrollbar {
      display: none;
    }

    & {
      -ms-overflow-style: none; // 对于 Internet Explorer 和 Edge
      scrollbar-width: none; // 对于 Firefox
    }

    .retry-button {
      display: inline-block;
      margin-left: 0.5rem;
      translate: 0 0.1rem;
      height: 1rem;
      transition-duration: 0.15s;
      cursor: pointer;

      &:hover {
        scale: 1.1;
      }

      &:active {
        scale: 0.95;
      }

      img {
        height: 100%;
      }


    }
  }

  .inputbox-container {
    position: absolute;
    bottom: 1rem;
    width: 100%;

  }
}
</style>
