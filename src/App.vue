<script lang="ts" setup>
import Toollist from "@/components/Toollist/index.vue";
import Playground from "@/pages/Playground/index.vue";
import { usePlaygroundStore } from "./store/playground";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const playgroundStore = usePlaygroundStore()
const { expand } = storeToRefs(playgroundStore);

const shouldAnimate = ref(false); // 控制是否应用动画


const changePlaygroundExpandStatus = () => {
  expand.value = !expand.value;
  //当第一次使用拓展按键后才需要播放动画
  shouldAnimate.value = true;
}



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
    <div class="playground-container" :class="{ expand: expand, shouldAnimate: shouldAnimate }">
      <Playground />
    </div>
    <div class="playground-button" :class="{ expand: expand }" @click="changePlaygroundExpandStatus">
      <img v-if="expand === false" src="@/assets/icons/Playground.svg">
      <div class="expand_playground" :class="{ expand: expand }">
        <img v-if="expand === false" src="@/assets/icons/Expand_playground.svg" title="打开工作区">
        <img v-if="expand === true" src="@/assets/icons/Close_playground.svg" title="关闭工作区">
      </div>
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
    min-width: 330px;
    flex: 4;
    max-width: 800px;
    margin: 0 1rem;
  }

  .playground-button {
    position: absolute;
    z-index: 2;
    top: 1rem;
    right: 1rem;
    height: 2.0rem;
    width: 2.0rem;
    border-radius: 0.6rem;
    cursor: pointer;
    background-color: white;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    >img {
      width: 70%
    }

    &:hover {
      transition: 0.15s;

      .expand_playground {
        opacity: 1;
      }
    }

    &:active {
      transition: 0.15s;
      scale: 0.95;
    }


    .expand_playground {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 0.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;

      &:hover {
        background-color: #c8c8c8;
      }

      &.expand {
        opacity: 1;
      }

      >img {
        width: 70%
      }
    }

  }

  .playground-container {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 0;
    display: none;
    background-color: @bg-color;

    @media (max-width: 600px) {
      position: absolute;
      width: 100%;
    }

    &.shouldAnimate {
      animation: closePlayground 0.5s forwards;
      display: block;

      @keyframes closePlayground {
        0% {
          opacity: 1;
          flex: 9;
        }

        100% {
          opacity: 0;
          flex: 0;
        }

        100% {
          opacity: 0;
          flex: 0;
          display: none;
        }
      }
    }



    &.expand {
      /* 动画 */
      animation: expandPlayground 0.5s forwards;
      display: block;

      @keyframes expandPlayground {
        from {
          opacity: 0;
          flex: 0;
        }

        to {
          opacity: 1;
          flex: 9;
        }
      }

    }
  }
}
</style>
