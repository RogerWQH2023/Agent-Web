<script setup>
import { defineProps } from 'vue';
import { modeData } from '@/constant/modeData'

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

</script>

<template>
  <div style="display: inline-block">
    <div class="bubble">
      <img v-if="props.type === 'chat'" :src="modeData['chat'].iconUrl" class="icon" />
      <img v-if="props.type === 'workflow'" :src="modeData['workflow'].iconUrl" class="icon" />
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