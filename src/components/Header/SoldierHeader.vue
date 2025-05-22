<template>
  <div class="soldierHeader">
    <div class="badge">{{ soldierViewModel?.gold }}<img src="/images/gold.png" alt="gold" /></div>
    <div class="badge">
      {{ soldierViewModel?.strenght }}<img src="/images/strength.svg" alt="puissance" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SoldierPresenterImpl,
  type SoldierViewModel,
} from '@/domains/soldier/adapters/soldier.presenter.impl'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory'
import { GetSoldierUsecase } from '@/domains/soldier/getSoldier.usecase'
import { onMounted, ref } from 'vue'
import { ShopEventBus } from '@/domains/shop/shop.eventBus.ts'
import { EnemyEventBus } from '@/domains/enemies/enemy.eventBus.ts'

const soldierViewModel = ref<SoldierViewModel>()
const getSoldierUsecase = new GetSoldierUsecase(SoldierRepositoryInMemory.getInstance())
const shopEventBus = ShopEventBus.getInstance()
const enemyBus = EnemyEventBus.getInstance()
const getSoldier = () => {
  getSoldierUsecase.execute(
    new SoldierPresenterImpl((vm) => {
      soldierViewModel.value = vm
    }),
  )
}
onMounted(() => {
  getSoldier()
  shopEventBus.subscribe('SoldierHeader', 'weaponBought', () => {
    getSoldier()
  })
  enemyBus.subscribe('SoldierHeader', 'enemyBattle', () => {
    getSoldier()
  })
})
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
