<script setup lang="ts">
import { AgentType } from '@/types';

const props = defineProps<{
  content: string,
  type: AgentType
}>();

</script>

<template>
  <div class="bubble-container">
    <div class="content-container" :class="{ chat: props.type === 'chat', workflow: props.type === 'workflow' }"
      v-html="props.content">
    </div>
    <div class="role-container">
      <img src="@/assets/icons/Role_user.svg">
    </div>
  </div>
</template>


<style scoped lang="less">
.bubble-container {
  width: calc(100% - 3.4rem);
  margin: 2rem 0;
  margin-left: 3.4rem;

  display: flex;
  justify-content: right;


  .role-container {
    height: 2.5rem;
    width: 2.5rem;
    min-width: 2.5rem;

    margin: 0.4rem;

    * {
      width: 100%;
    }
  }

  .content-container {
    flex: auto;
    margin: 0.2rem;
    padding: 0.8rem;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    white-space: pre-wrap; //识别换行
    hyphens: auto;

    user-select: text;
    -webkit-user-select: text;

    /* 设置内容字体 */
    color: white;
    line-height: 1.5rem;
    font-size: 1rem;

    &.chat {
      background-color: @main-color;
    }

    &.workflow {
      background-color: @workflow-color;
    }

    /* 动画 */
    animation: slideInFromRight 0.5s ease-out;

    @keyframes slideInFromRight {
      from {
        opacity: 0;
        transform: translateX(0.5rem);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

  }
}
</style>