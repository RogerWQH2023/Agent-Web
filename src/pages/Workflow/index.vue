<script lang="ts" setup>
import TopBox from "@/pages/Workflow/components/TopBox.vue";
import LeftBox from "@/pages/Workflow/components/LeftBox.vue";
import RightBox from "@/pages/Workflow/components/RightBox.vue";
import Question from "@/components/Question.vue";
import Case from "@/components/Case.vue";
</script>

<template>
  <div style="height: 100%; width: 100%">
    <el-container>
      <el-header height="60px">
        <TopBox />
      </el-header>
      <el-container>
        <el-aside width="50%">
          <LeftBox />
          <Case />
        </el-aside>
        <el-main>
          <RightBox />
          <Question class="question-button" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
@import "./index.less";
</style>
