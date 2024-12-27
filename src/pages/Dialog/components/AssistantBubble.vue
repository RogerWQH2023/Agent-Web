<script setup lang="ts">
import { AgentType } from '@/types';

/* 气泡类别有额外的loading和error类型 */
const props = defineProps<{
  type: AgentType | 'loading' | 'error'
}>();
</script>

<template>
  <div class="bubble-container">
    <div class="role-container"
      :class="{ chat: props.type === 'chat', workflow: props.type === 'workflow', loading: props.type === 'loading', error: props.type === 'error' }">
      <!-- 内联svg，用于动态修改颜色和做动画 -->
      <svg t="1734507548852" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="7726" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128">
        <path
          d="M298.666667 810.666667h426.666666v42.666666a42.666667 42.666667 0 0 1-42.666666 42.666667H341.333333a42.666667 42.666667 0 0 1-42.666666-42.666667v-42.666666z m405.333333-640A192 192 0 0 1 896 362.666667v213.333333a192 192 0 0 1-192 192h-384A192 192 0 0 1 128 576v-213.333333A192 192 0 0 1 320 170.666667h384z m0 72.533333h-384a119.466667 119.466667 0 0 0-119.466667 119.466667v213.333333a119.466667 119.466667 0 0 0 119.466667 119.466667h384a119.466667 119.466667 0 0 0 119.466667-119.466667v-213.333333a119.466667 119.466667 0 0 0-119.466667-119.466667zM640 384a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 0 1-85.333334 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667zM384 384a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 1 1-85.333334 0v-85.333333a42.666667 42.666667 0 0 1 42.666667-42.666667z m576-42.666667a42.666667 42.666667 0 0 1 42.666667 42.666667v170.666667a42.666667 42.666667 0 0 1-85.333334 0V384a42.666667 42.666667 0 0 1 42.666667-42.666667z m-896 0a42.666667 42.666667 0 0 1 42.666667 42.666667v170.666667a42.666667 42.666667 0 1 1-85.333334 0V384a42.666667 42.666667 0 0 1 42.666667-42.666667z"
          p-id="7727"></path>
      </svg>
    </div>
    <div class="content-container"
      :class="{ workflow: props.type === 'workflow', loading: props.type === 'loading', error: props.type === 'error' }">
      <!-- 插入子组件的位置 -->
      <slot></slot>
    </div>
  </div>
</template>


<style scoped lang="less">
.bubble-container {
  width: calc(100% - 3.4rem);
  margin: 2rem 0;

  display: flex;
  justify-content: left;

  .role-container {
    height: 2.5rem;
    width: 2.5rem;
    min-width: 2.5rem;

    margin: 0.4rem;

    svg {
      width: 100%;
      height: 100%;
    }

    &.chat {
      svg {
        fill: @main-color;
      }
    }

    &.workflow {
      svg {
        fill: @workflow-color;
      }
    }

    &.loading {
      svg {
        fill: #767676;
      }
    }

    &.error {
      svg {
        fill: #b70000;
      }
    }
  }

  .content-container {
    margin: 0.2rem;
    padding: 0.8rem;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    white-space: pre-wrap; //识别换行
    hyphens: auto;
    overflow: hidden;

    user-select: text;
    -webkit-user-select: text;


    /* 设置内容字体 */
    color: black;
    line-height: 1.5rem;
    font-size: 1rem;

    &.workflow {
      flex: auto;
    }

    &.loading {
      background-color: #767676;
      color: #d3d3d3;

      &::after {
        content: '';
        display: inline;
        color: #d3d3d3;
        font-size: 1.5rem; // 可以根据需要调整大小
        animation: dots 3s infinite;
      }
    }

    &.error {
      background-color: #b70000;
      color: white;
    }

    /* 动画 */
    animation: slideInFromLeft 0.5s ease-out;
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-0.5rem);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes dots {

  0% {
    content: '';
  }

  16.7% {
    content: '.';
  }


  33.3% {
    content: '..';
  }

  50% {
    content: '...';
  }

  66.7% {
    content: '....';
  }

  83.3% {
    content: '.....';
  }
}
</style>