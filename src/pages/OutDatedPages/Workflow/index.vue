<script lang="ts" setup>
import TopBox from "@/pages/Workflow/components/TopBox.vue";
import LeftBox from "@/pages/Workflow/components/LeftBox.vue";
import RightBox from "@/pages/Workflow/components/RightBox.vue";
</script>

<template>
  <div style="height: 100%; width: 100%">
    <el-container>
      <el-header height="60px">
        <TopBox />
      </el-header>
      <el-container>
        <el-aside width="35%">
          <LeftBox />
        </el-aside>
        <el-main>
          <RightBox />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
.el-container {
  .el-header {
    //box-shadow: 2px 2px #e4e7ed;
    background-color: #FFF;
    border-bottom: 1px solid rgba(6, 7, 9, 0.1);
    //box-shadow: 0 6px 8px 0 rgba(29,28,35,.06),0 0 2px 0 rgba(29,28,35,.18);
    z-index: 2;
  }

  .el-aside {
    position: relative;
    height: calc(100vh - 60px);
    background-color: #f7f9fb;
    //border-right: 2px solid #e4e7ed;
    //border-right: 1px solid rgba(6,7,9,0.1);
    box-shadow: 6px 0 8px 0 rgba(29, 28, 35, .06), 0 0 2px 0 rgba(29, 28, 35, .18);
    z-index: 1;
  }

  .el-main {
    position: relative;
    height: calc(100vh - 60px);
    //background-color: #f7f9fb;
    background-color: #F4F4F6;
    padding: 0;
  }
}
</style>
