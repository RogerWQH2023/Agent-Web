<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue"
import type { AgentType } from "@/types/index.d.ts"
import { modeData } from "@/constant/modeData.ts"
import ModeCard from "./ModeCard.vue"

const props = defineProps<
  { mode: AgentType }
>();

const selectorOpen = ref(false);

const openSelector = () => {
  selectorOpen.value = true;
}
const closeSelector = () => {
  selectorOpen.value = false;
}


const emit = defineEmits<{
  (e: 'updateMode', mode: AgentType): void; // 声明 updateMode 事件
}>();
const changeMode = (mode: AgentType) => {
  emit('updateMode', mode); // 发送事件通知父组件更新状态
};

</script>

<template>
  <div class="mode-container">
    <div class="icon-container">
      <img :src="modeData[props.mode].iconUrl" />
    </div>
    <div class="selector-button" @click="openSelector">
      <img src="@/assets/icons/More_filled2.svg" alt="新会话">
    </div>
  </div>
  <div class="selector-container" v-if="selectorOpen" @click="closeSelector">
    <ModeCard v-for="item in modeData" :key="item.type + '-card'" :title="item.title" :iconUrl="item.iconUrl"
      :describe="item.describe" @click="changeMode(item.type)" />
  </div>
</template>

<style lang="less" scoped>
.mode-container {
  position: relative;
  padding: 0.4rem;
  width: 1.2rem;
  height: 1.2rem;
  display: flex;
  /* 使用flexbox布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  border-radius: 0.9rem;

  &:hover {
    transition: 0.5s;
    scale: 1.2;
  }

  .icon-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 0.8rem;
    display: flex;
    /* 使用flexbox布局 */
    justify-content: center;
    /* 水平居中 */
    align-items: center;

    * {
      width: 60%;
    }
  }

  .selector-button {
    background-color: #ffffff66;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 0.8rem;
    /* 让背景模糊化 */
    backdrop-filter: blur(3px);
    opacity: 0;
    display: flex;
    /* 使用flexbox布局 */
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    cursor: pointer;

    &:hover {
      transition-duration: 0.15s;
      opacity: 1;
    }


    * {
      width: 70%;
    }

  }
}

.selector-container {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 18rem;
  border-radius: 0.9rem;
  background-color: #ffffff66;
  border: 2px solid #525252;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 0 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  /* 让背景模糊化 */
  backdrop-filter: blur(10px);
  animation: slideInFromLeft 0.25s ease-out;

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translate(-3px, 3px);
    }

    to {
      opacity: 1;
      transform: translate(0, 0);
    }
  }
}
</style>