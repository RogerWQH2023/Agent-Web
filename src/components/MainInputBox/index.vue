<script setup lang="ts">
import { ref } from 'vue';
import type { AgentType } from "@/types/index.d.ts"
import ModeSelector from "./ModeSelectorButton.vue"


const inputBox = ref<HTMLTextAreaElement | null>(); // 定义输入框的响应式数据
const inputMode = ref<AgentType>("chat");
const updateMode = (mode: AgentType) => {
  inputMode.value = mode;
}


const handleSend = () => {
  if (inputBox.value && inputBox.value.value !== '') {
    console.log("发送内容:", inputBox.value.value);
    // 清空输入框
    inputBox.value.value = '';
  }
};

const setContent = (mode: AgentType, content: string) => {
  if (inputBox.value) {
    inputMode.value = mode;
    inputBox.value.value = content;
  }
}

defineExpose<{
  setContent: (mode: AgentType, content: string) => void; // 定义 childMethod 的类型
}>({
  setContent,
});

</script>

<template>
  <div class="input-box-container" :class="{ chat: inputMode === 'chat', workflow: inputMode === 'workflow' }">
    <textarea ref="inputBox" class="input-box" placeholder="请输入您的问题~"></textarea>
    <div class="button-container">
      <ModeSelector :mode="inputMode" @updateMode="updateMode" />
      <div class="send-container" title="发送" @click="handleSend">
        <img src="@/assets/icons/Send_line.svg">
      </div>

    </div>
  </div>
</template>

<style scoped lang="less">
.input-box-container {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-height: 8.5rem;
  border: 2px solid #525252;
  background-color: #ffffff80;
  border-radius: 15px;
  display: flex;
  /* 使用flexbox布局 */
  justify-content: space-between;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 0 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);

  &.chat {
    transition: 0.25s;
    background-color: #eaf2ff80;
  }

  &.workflow {
    transition: 0.25s;
    background-color: #fff0e580;
  }

  .input-box {
    padding: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    box-sizing: border-box;
    height: calc(100% - 2.8rem);
    /* 设置固定高度，不允许用户调整大小 */
    border: none;
    background: none;
    border-radius: 15px;
    font-family: sans-serif;
    overflow-wrap: break-word;
    resize: none;

    /* 对于 WebKit 浏览器 */
    -ms-overflow-style: none; // 对于 Internet Explorer 和 Edge
    scrollbar-width: none; // 对于 Firefox

  }

  .input-box:focus {
    outline: none;
    /* 删除输入框的focus效果 */
  }

  /* 隐藏滚动条 */
  .input-box::-webkit-scrollbar {
    display: none;
  }

  /* 对于 Firefox */
  .button-container {
    position: absolute;
    bottom: 5px;
    left: 5px;
    right: 5px;
    box-sizing: border-box;
    height: 3rem;
    width: calc(100% - 10px);
    border-radius: 15px;
    display: flex;
    /* 使用flexbox布局 */
    justify-content: space-between;
    /* 水平居中 */
    align-items: end;

    .send-container {
      padding: 0.4rem;
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      /* 使用flexbox布局 */
      justify-content: center;
      /* 水平居中 */
      align-items: center;
      /* 垂直居中 */
      border-radius: 0.9rem;
      background-color: #0000001c;
      cursor: pointer;

      * {
        /* 子元素宽度适应父元素 */
        width: 100%;
      }

      &:hover {
        transition-duration: 0.15s;
        background-color: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      &:active {
        transition-duration: 0.15s;
        transform: scale(0.95);
      }
    }

  }
}
</style>
