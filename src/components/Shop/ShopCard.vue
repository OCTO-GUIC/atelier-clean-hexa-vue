<template>
  <div class="shopCard">
    <img :src="image" alt="" class="shopCard__imgWeapon" />
    <h2>{{ title }}</h2>
    <span class="shopCard__price">
      Prix : {{ price }} <img class="shopCard__gold" src="/images/gold.png" />
    </span>
    <div class="shopCard__actions">
      <CommonButton
        :disabled="addToCartButton.disabled"
        :label="addToCartButton.label"
        :on-click="buy"
      />
      <!-- <CommonLink :label="link.label" :url="link.url" :title="link.title" /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import CommonButton, { type CommonButtonProps } from './../commons/CommonButton.vue'
import { BuyWeaponUsecase } from '@/domains/shop/buyWeapon.usecase.ts'
import { ShopRepositoryInmemory } from '@/domains/shop/adapters/shop.repository.inmemory.ts'

export interface ShopCardProps {
  title: string
  image: string
  price: number
  strength: number
  addToCartButton: CommonButtonProps
}

const { title, image, addToCartButton, price, strength } = defineProps<ShopCardProps>()

const buyWeaponUseCase = new BuyWeaponUsecase(new ShopRepositoryInmemory())

const buy = () => {
  buyWeaponUseCase.execute(price, strength)
}
</script>

<style scoped>
.shopCard {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  text-align: center;

  h2 {
    margin: 1rem 0;
  }
}

.shopCard__imgWeapon {
  display: block;
  height: 10rem;
  width: auto;
  margin: 0 auto;
}

.shopCard__price {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.shopCard__gold {
  height: 2rem;
}

.shopCard__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
