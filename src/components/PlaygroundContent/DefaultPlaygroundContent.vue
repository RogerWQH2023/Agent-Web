<script lang="ts" setup>


</script>

<template>
  <div class="content-container">
    <div class="content-title">Playground</div>
    <br />
    <div class="breakdown-chart">
      No Activated Tools...
    </div>
    <br />
  </div>

</template>

<style lang="less" scoped>
.content-container {
  /* 禁用滑动选取 */
  -webkit-user-select: none;
  user-select: none;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff1e7;
  width: 100%;
  height: 100%;

}

.content-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  line-height: 3rem;
}

.breakdown-chart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 3rem);
  background-color: #ededed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
