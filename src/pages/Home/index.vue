<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getOptionalQuestions } from "@/api/chat"
import InputBox from "@/components/InputBox/index.vue"
import QuestBubble from "./components/QuestBubble.vue"

const queryResult = ref<API.OptionalQuestionsResponse>();


// 在组件加载时执行的操作
onMounted(() => {
  queryResult.value = undefined;
  updateOptionalQuestions();
});

const updateOptionalQuestions = async () => {
  const response = await getOptionalQuestions();
  queryResult.value = response;
  console.log(response);
}

</script>

<template>
  <div id="container">
    <img class="title-icon" src="@/assets/icons/Logo-words.svg" alt="AI GIS STSTEM">
    <InputBox class="inputbox" style="margin-bottom: 40px;" />
    <div class="bubble-container">
      <QuestBubble v-if="queryResult !== undefined" v-for="item in queryResult.data" :key="item.questionId"
        :title="item.title" :type="item.type" />
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
