<template>
  <div class="shop">
    <h1>{{ heading }}</h1>
    <ul class="shop__list">
      <li v-for="(weapon, index) in weapons" :key="index">
        <ShopCard
          :title="weapon.title"
          :image="weapon.image"
          :add-to-cart-button="weapon.addToCartButton"
          :price="weapon.price"
          :strength="weapon.strength"
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
h1 {
  text-align: center;
  padding: 0.5rem 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 3.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  width: fit-content;
  margin: 0 auto;
  padding: 0 2rem;
  border-radius: 6px;
}
.shop {
  height: 100%;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto;
  background-image: url('/images/shop.png');
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
    border-radius: 6px;
  }
}
</style>
