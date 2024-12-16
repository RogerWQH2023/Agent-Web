<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const handleClick = () => {
  // 处理点击事件
  console.log('Bubble clicked:', props.title);
};
</script>

<template>
  <div style="display: inline-block">
    <div class="bubble" @click="handleClick">
      <img src="@/assets/icons/Dialog.svg" class="icon" />
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bubble {
  padding: 0.125rem;
  margin: 0.3rem;
  border-radius: 15px;
  display: flex;
  border: 1px solid #0000001c;
  background-color: #ffffff;
  text-align: center;
  align-items: center;
  font-weight: 500;
  font-size: 0.8rem;
  font-family: AppleSystemUIFont, serif;
  cursor: pointer;
  animation: slideInFromRight 0.5s ease-out;

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(5%);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &:hover {
    transition: 0.15s;
    background-color: #ffffffb8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transition: 0.15s;
    transform: scale(0.95);
  }
}

.icon {
  width: 0.9rem;
  height: 0.9rem;
  margin: 0.3rem;
}

.title {
  margin: 0.3rem;
}
</style>