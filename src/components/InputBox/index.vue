<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref(''); // 定义输入框的响应式数据

const handleSend = () => {
  // 处理发送逻辑
  console.log("发送内容:", inputValue.value);
  // 清空输入框
  inputValue.value = '';
};
</script>

<template>
  <div class="input-box-container">
    <textarea class="input-box" placeholder="请输入您的问题~"></textarea>
    <div class="button-container">
      <div class="send-container" @click="handleSend">
        <img class="title-icon" src="@/assets/icons/Send_line.svg" alt="AI GIS STSTEM">
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
    justify-content: right;
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
    }

    .send-container:hover {
      transition-duration: 0.15s;
      background-color: #93c0ff;
    }

    .send-container:active {
      transition-duration: 0.15s;
      transform: scale(0.95);
    }

    * {
      /* 子元素宽度适应父元素 */
      width: 100%;
    }
  }
}
</style>
