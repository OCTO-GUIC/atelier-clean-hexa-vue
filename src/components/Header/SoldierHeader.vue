<template>
  <div>{{ soldierViewModel?.gold }}<img src="../../../public/images/gold.png" alt="gold" /></div>
</template>

<script setup lang="ts">
import {
  SoldierPresenterImpl,
  type SoldierViewModel,
} from '@/domains/soldier/adapters/soldier.presenter.impl'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory'
import { GetSoldierGoldUsecase } from '@/domains/soldier/getSoldierGold.usecase'
import { ref } from 'vue'

const soldierViewModel = ref<SoldierViewModel>()
const getSoldierUsecase = new GetSoldierGoldUsecase(new SoldierRepositoryInMemory())
getSoldierUsecase.execute(
  new SoldierPresenterImpl((vm) => {
    soldierViewModel.value = vm
  }),
)
</script>

<style scoped>
div {
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
