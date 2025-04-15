<template>
  <div class="shopCard">
    <img :src="image" alt="" />
    <h2>{{ title }}</h2>
    <div class="shopCard__actions">
      <CommonButton :label="addToCartButton.label" :disabled="addToCartButton.disabled" />
      <CommonLink :label="link.label" :url="link.url" :title="link.title" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonButton, { type CommonButtonProps } from './../commons/CommonButton.vue'
import CommonLink, { type CommonLinkProps } from './../commons/CommonLink.vue'

export interface ShopCardProps {
  title: string
  image: string
  addToCartButton: CommonButtonProps
  link: CommonLinkProps
}

const { title, image, addToCartButton, link } = defineProps<ShopCardProps>()
</script>

<style scoped>
.shopCard {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  img {
    display: block;
    width: 100%;
  }
}

.shopCard__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
