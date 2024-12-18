<script lang="ts" setup>
import Toollist from "@/components/Toollist/index.vue";
</script>

<template>
  <div class="main-container">
    <div class="dialog-container">
      <RouterView v-slot="{ Component }">
        <Transition name="fade">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </div>
    <div class="workspace-container">
      hello
    </div>
    <Toollist />
  </div>
</template>

<style lang="less" scoped>
.main-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: @bg-color;

  .dialog-container {
    position: relative;
    width: 100%;
    flex: 2;
    max-width: 800px;
    margin: 0 1rem;
  }

  .workspace-container {
    position: relative;
    display: none;
    width: 80%;
    flex: 3;
    background-color: @bg-color;

    @media (max-width: 600px) {
      position: absolute;
      width: 100%;
    }

    height: 100%;
  }
}
</style>
