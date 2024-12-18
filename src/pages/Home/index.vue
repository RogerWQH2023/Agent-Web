<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getOptionalQuestions } from "@/api/chat"
import MainInputBox from "@/components/MainInputBox/index.vue"
import type { AgentType } from "@/types/index.d.ts"
import QuestBubble from "./components/QuestBubble.vue"
import type { API } from "@/api/typing.d.ts"

const queryResult = ref<API.OptionalQuestionsResponse>();
const InputBoxRef = ref<InstanceType<typeof MainInputBox> | null>();


// 在组件加载时执行的操作
onMounted(() => {
  queryResult.value = undefined;
  updateOptionalQuestions();
});

const updateOptionalQuestions = async () => {
  const response = await getOptionalQuestions();
  queryResult.value = response;
}

const setBoxContent = (mode: AgentType, content: string) => {
  if (InputBoxRef.value) {
    InputBoxRef.value.setContent(mode, content);
  }
}

</script>

<template>
  <div id="container">
    <img class="title-icon" src="@/assets/icons/Logo-words.svg" alt="AI GIS STSTEM">
    <MainInputBox class="inputbox" style="margin-bottom: 40px;" ref="InputBoxRef" />
    <div class="bubble-container">
      <QuestBubble v-if="queryResult !== undefined" v-for="item in queryResult.data" :key="item.questionId"
        :title="item.title" :type="item.type" @click="setBoxContent(item.type, item.content)" />
    </div>
  </div>

</template>

<style scoped lang="less">
#container {
  height: 100%;
  width: 100%;
  background-color: @bg-color;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .title-icon {
    width: 70%;
    min-width: 250px;
    margin-bottom: 20px;
  }

  .bubble-container {
    position: relative;
    width: 80%;
    border-radius: 15px;
    align-items: center;
    /* 垂直居中 */
    text-align: center;
  }
}
</style>
