<script setup lang="ts">
import { useRoute } from "vue-router"
import InputBox from "@/components/InputBox/index.vue"
import UserBubble from "./components/UserBubble.vue";
import AssistantBubble from "./components/AssistantBubble.vue";
import { AgentType } from "@/types";
import { usePlaygroundStore } from "@/store/playground";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { mockGetNewMessage } from "@/api/chat";
import { API } from "@/api/typing";

const messageData = ref<API.GISQAChatRequest>({
  type: "openai",
  model: "gpt-3.5-turbo",
  messages: new Array<API.GISQAChatMessage>()
})
// 在组件加载时:
// 1. 关闭工作区
// 2. 获取对话数据
// 3. 根据对话数据更新组件 
onMounted(() => {
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
  requestNewMessageData();
}

const requestNewMessageData = async () => {
  messageData.value = await mockGetNewMessage(messageData.value);
}

</script>

<template>
  <div class="main-container">

    <div class="chat-container">
      <div style="height:2rem"></div>
      <div v-for="(item, index) in messageData.messages" :key="'dialogpage-message-' + index">
        <UserBubble v-if="item.role === 'user'" :type="params.type" :content="item.content" />
        <AssistantBubble v-if="item.role === 'assistant'" :type="params.type">{{ item.content }}</AssistantBubble>
      </div>
      <!-- <UserBubble :type="params.type" :content="UserContent" />
      <AssistantBubble :type="params.type">{{ AssistantContent }}</AssistantBubble>
      <UserBubble :type="params.type" :content="UserContent" />
      <AssistantBubble :type="params.type">{{ AssistantContent }}</AssistantBubble>
      <UserBubble :type="params.type" :content="UserContent" />
      <AssistantBubble :type="params.type">{{ AssistantContent }}</AssistantBubble> -->
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
  }

  .inputbox-container {
    position: absolute;
    bottom: 1rem;
    width: 100%;

  }
}
</style>
