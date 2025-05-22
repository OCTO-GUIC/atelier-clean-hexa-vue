<template>
  <div class="badge">
    {{ text }}
    <img :src="imageSrc" :alt="altText" />
  </div>
</template>

<script setup lang="ts">
type CommonBadgeProps = {
  text: string | number
  imageSrc: string
  altText?: string
}
defineProps<CommonBadgeProps>()
</script>

<style scoped>
.badge {
  padding: 0.25rem 0.5rem;
  display: flex;
  border-radius: 6px;
  gap: 0.5rem;
  background-color: #fff;
  align-items: center;
  color: black;

  & img {
    height: 2.5rem;
  }
}
</style>
