<template>
  <div class="soldierHeader">
    <div class="badge"><img alt="gold" src="/images/gold.png" /></div>
    <div class="badge">
      <img alt="puissance" src="/images/strength.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<style scoped>
.soldierHeader {
  display: flex;
  gap: 1rem;
}

.badge {
  padding: 0.25rem 0.5rem;
  display: flex;
  border-radius: 6px;
  gap: 0.5rem;
  background-color: #fff;
  align-items: center;
  color: black;
}

img {
  height: 2.5rem;
}
</style>
