<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: true,
  }
});

</script>

<template>
  <div class="card-container">
    <img :src="props.iconUrl" class="mode-icon" />
    <div class="word-container">
      <h3>{{ props.title }}</h3>
      <p>{{ props.describe }}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.card-container {
  width: calc(100% - 0.8rem);
  height: 5rem;
  border-radius: 0.9rem;
  margin-top: 0.4rem;
  background-color: #ffffffb0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0.4rem;
  }

  &:hover {
    background-color: #0000001c;
  }

  &:active {
    transition: 0.15s;
    scale: 0.95;
  }

  .mode-icon {
    width: 2.3rem;
    margin: 0.7rem;
    margin-right: 1rem;
  }

  .word-container {
    flex: auto;
    padding: 1rem;
    padding-left: 0;

    h3 {
      font-size: 1rem;
      margin: 0;
      margin-bottom: 0.25rem;
      padding: 0;
      line-height: 1.0;
    }

    p {
      margin: 0;
      padding: 0;
      font-size: 0.9rem;
    }
  }


}
</style>