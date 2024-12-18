<script setup lang="ts">
import { useRoute } from "vue-router"
import InputBox from "@/components/InputBox/index.vue"
import UserBubble from "./components/UserBubble.vue";
import AssistantBubble from "./components/AssistantBubble.vue";
import { AgentType } from "@/types";
// 定义路由参数的类型
interface RouteParams {
  type: AgentType; // 对应路由中的 :mode
  id: string;   // 对应路由中的 :id
}
// 使用类型断言来获取路由参数
const route = useRoute(); // 获取当前路由对象
const params = route.params as unknown as RouteParams;

const UserContent = "What are the main components needed to set up QGIS Server on a Debian-based system?"
const AssistantContent = "To set up QGIS Server on a Debian-based system, the main components needed include:\n1. QGIS Server itself\n2. Apache web server\n3. FastCGI module (fcgid)\n4. Configuration files for Apache\n5. Proper directory setup for logs and authentication database\n\nAdditionally, you may need to add official QGIS repositories to install QGIS Server and configure the virtual host to enable QGIS Server to respond to requests."
</script>

<template>
  <div class="main-container">
    <div class="title-container">
      <h3>Chat Demo</h3>
    </div>
    <div class="chat-container">
      <div style="height:2rem"></div>
      <UserBubble :type="params.type" :content="UserContent" />
      <AssistantBubble :type="params.type" :content="AssistantContent" />
      <UserBubble :type="params.type" :content="UserContent" />
      <AssistantBubble :type="params.type" :content="AssistantContent" />
      <UserBubble :type="params.type" :content="UserContent" />
      <AssistantBubble :type="params.type" :content="AssistantContent" />
      <div style="height:10rem"></div>
    </div>
    <div class="inputbox-container">
      <InputBox :type="params.type" />
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
    z-index: 1;

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
