<template>
  <h1>{{ heading }}</h1>
  <div class="shop">
    <ul class="shop__list">
      <li v-for="(weapon, index) in weapons" :key="index">
        <ShopCard
          :title="weapon.title"
          :image="weapon.image"
          :add-to-cart-button="weapon.addToCartButton"
          :link="weapon.link"
          :price="weapon.price"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ShopCardProps } from './ShopCard.vue'
import ShopCard from './ShopCard.vue'

export interface ShopViewModel {
  heading: string
  weapons: ShopCardProps[]
}

defineProps<ShopViewModel>()
</script>

<style scoped>
.shop {
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  margin: auto;
  margin: auto;
  background-image: url('./public/images/shop.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.shop__list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  li {
    display: block;
    width: 25%;
    background-color: rgba(255, 255, 255, 0.7);
  }
}
</style>
