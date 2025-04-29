<template>
  <div>Gold : {{ soldierViewModel?.gold }}</div>
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
