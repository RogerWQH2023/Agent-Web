<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//import Icons from '@/components/Icons.vue';
//import HistoryList from '@/components/HistoryList.vue';

const historyListOpen = ref(false);
const fadeToolList = ref(false);
const router = useRouter();

const toggleHistoryList = () => {
  historyListOpen.value = !historyListOpen.value;
};

const toggleExpand = () => {
  fadeToolList.value = !fadeToolList.value;
};

const navigateHome = () => {
  closeAllTools();
  router.push('/'); // 跳转到根路径
};

const closeAllTools = () => {
  historyListOpen.value = false;
};
</script>

<template>
  <div>
    <div class="main-container" :class="{ fade: fadeToolList }">
      <div class="tool-list-container" :class="{ fade: fadeToolList }">
        <div class="logo-container" title="回到首页" @click="navigateHome">
          <img src="@/assets/icons/Logo-pure.svg" alt="AI GIS SYSTEM">
        </div>
        <!-- 功能列表 -->
        <div class="icon-container" title="新会话">
          <img src="@/assets/icons/New_line.svg" alt="新会话">
        </div>
        <div class="icon-container" title="历史会话" @click="toggleHistoryList">
          <img src="@/assets/icons/History_line.svg" alt="新会话">
        </div>
        <div class="icon-container" title="用户">
          <img src="@/assets/icons/User_line.svg" alt="新会话">
        </div>

      </div>
      <div class="expand-button-container" :class="{ fade: fadeToolList }">
        <div class="arrow-container" :class="{ fade: fadeToolList }" :title="fadeToolList ? '展开' : '收起'"
          @click="toggleExpand">
          <div class="fade-arrow"></div>
        </div>
      </div>
    </div>
    <!-- 历史记录列表 -->
    <!-- <HistoryList v-if="historyListOpen" @closeEvent="closeAllTools" /> -->
  </div>
</template>

<style lang="less" scoped>
.main-container {
  position: absolute;
  top: 50%;
  left: 1rem;
  translate: 0 -50%;
  transition: 0.15s;
  display: flex;
  justify-content: left;
  align-items: center;



  &.fade {
    transform: translateX(-4rem);
  }
}

.tool-list-container {
  margin-right: 0.1rem;
  padding-bottom: 5px;
  width: 3.4rem;
  max-height: 800px;
  background-color: #ffffff;
  z-index: 2;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  transition: 0.15s;

  &.fade {
    pointer-events: none;
    opacity: 0;
  }
}

.icon-container {
  padding: 5px;
  width: 1.7rem;
  height: 1.7rem;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  cursor: pointer;

  >* {
    width: 90%;
  }

  &:hover {
    transition-duration: 0.15s;
    background-color: #0000001c;
  }

  &:active {
    scale: 0.95;
  }

}

.logo-container {
  width: 2.0rem;
  height: 4rem;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #00000096;
  cursor: pointer;

  >* {
    width: 100%;
  }


}

.expand-button-container {
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  transition: 0.15s;
}

.arrow-container {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  cursor: pointer;

  &:hover {
    transition-duration: 0.15s;
    transform: scale(1.1);

    * {
      background-color: #00000096;
    }
  }

  &:active {
    transition: 0.15s;
    transform: scale(0.95);
  }
}

.fade-arrow {
  display: block;
  background-color: #0000001c;
  width: 0.25rem;
  border-radius: 13px;
  height: 1.8rem;
}
</style>