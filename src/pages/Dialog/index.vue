<script setup lang="ts">
import { useRoute } from "vue-router"
import InputBox from "@/components/InputBox/index.vue"
import UserBubble from "./components/UserBubble.vue";
import AssistantBubble from "./components/AssistantBubble.vue";
import { AgentType } from "@/types";
import { usePlaygroundStore } from "@/store/playground";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { getNewMessage, mockGetNewMessage } from "@/api/chat";
import { API } from "@/api/typing";
import BreakdownChart from "@/components/BreakdownChart.vue";
import WorkflowChart from "@/components/WorkflowChart.vue";
import TaskConfig from "@/components/TaskConfig.vue";
import { useSessionStore } from "@/store/session";
import { useTaskStore } from "@/store/task";

const sessionStore = useSessionStore();
const taskStore = useTaskStore();
const graphReady = ref<boolean>(false);
const agentError = ref<boolean>(false);

const messageData = ref<API.GISQAChatRequest>({
  type: "openai",
  model: "gpt-3.5-turbo",
  /*   type: "kimi",
    model: "moonshot-v1-8k", */
  messages: new Array<API.GISQAChatMessage>()
})
// 在组件加载时:
// 1. 关闭工作区
// 2. 获取对话数据
// 3. 根据对话数据更新组件 
onMounted(async () => {
  // 关闭工作区
  const { expand, content } = storeToRefs(usePlaygroundStore());
  expand.value = false;
  // 获取对话数据
  // 清空对话数据对象
  messageData.value?.messages.splice(0, messageData.value.messages.length);
  // 后端无存储时的逻辑：从localStorage获取数据
  const messageString = localStorage.getItem("tempMessage");
  if (messageString) {
    const initMessage = JSON.parse(messageString) as API.GISQAChatRequest;
    if (initMessage.messages.length !== 0) {
      initMessage.messages.forEach((message) => {
        messageData.value?.messages.push(message);
      });
      requestNewMessageData();
    }
    else {
      // 若初始无信息，则返回默认值；
      messageData.value?.messages.push({ role: "assistant", content: "Hi master, I'm AI GIS Agent. What can I do for you?" })
    }
  }


  /* temp */
  sessionStore.session.question =
    "Extract elevation data of Sri Lanka from multiple TIF files using the shape of the island from a vector file.";
  await sessionStore.chatted();
  graphReady.value = true;

});


// 定义路由参数的类型
interface RouteParams {
  type: AgentType; // 对应路由中的 :mode
  id: string;   // 对应路由中的 :id
}
// 使用类型断言来获取路由参数
const route = useRoute(); // 获取当前路由对象
const params = route.params as unknown as RouteParams;

const handleInput = async (content: string) => {
  messageData.value.messages.push({ role: "user", content: content });
  await requestNewMessageData();
}

const handleRetry = async () => {
  await requestNewMessageData();
}

const requestNewMessageData = async () => {
  //messageData.value = await mockGetNewMessage(messageData.value);
  try {
    agentError.value = false;
    const response = await getNewMessage(messageData.value);
    if (response.messages) {
      messageData.value.messages = response.messages;
    }
    else {
      console.error(response.errmsg);
      agentError.value = true;
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
      <div v-for="(item, index) in messageData.messages" :key="'dialogpage-message-' + index">
        <!-- 角色为user，返回用户气泡 -->
        <UserBubble v-if="item.role === 'user'" :type="params.type" :content="item.content" />
        <!-- 加载中/错误(最后发言的是用户)：返回正在生成中的气泡 -->
        <AssistantBubble v-if="item.role === 'user' && index === messageData.messages.length - 1 && !agentError"
          :type="'loading'">
          {{ 'GENERATING' }}
        </AssistantBubble>
        <AssistantBubble v-if="item.role === 'user' && index === messageData.messages.length - 1 && agentError"
          :type="'error'">
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
          <div v-if="params.type === 'workflow' && graphReady" style="width:100%;height:400px">
            <BreakdownChart :graph-id="sessionStore.session.sessionId + '-breakdown'" />
          </div>
          <div v-if="params.type === 'workflow' && graphReady" style="width:100%;height:400px">
            <WorkflowChart v-if="sessionStore.graphShow" :graph-id="sessionStore.session.sessionId + '-workflow'" />
            <TaskConfig v-if="taskStore.isShowed" />
          </div>
        </AssistantBubble>
      </div>
      <AssistantBubble :type="params.type" v-if="params.type === 'workflow' && graphReady">
        <div style="width:100%;height:400px">
          <BreakdownChart :graph-id="sessionStore.session.sessionId + '-breakdown'" />
        </div>
        <div style="width:100%;height:400px">
          <WorkflowChart v-if="sessionStore.graphShow" :graph-id="sessionStore.session.sessionId + '-workflow'" />
          <TaskConfig v-if="taskStore.isShowed" />
        </div>
      </AssistantBubble>
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
