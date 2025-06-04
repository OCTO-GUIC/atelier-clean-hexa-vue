<template>
  <div v-if="!catalogViewModel">Chargement en cours ...</div>
  <ShopView v-else :weapons="weapons" heading="Le shop" />
</template>

<script lang="ts" setup>
import ShopView from '@/components/Shop/ShopView.vue'
import {
  WeaponsCataloguePresenter,
  type WeaponsCatalogViewModel,
} from '@/domains/weapons/adapters/weapons.presenter.catalog'
import { computed, onMounted, ref } from 'vue'
import type { ShopCardProps } from '@/components/Shop/ShopCard.vue'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory.ts'
import { GetAllWeaponsUsecase } from '@/domains/weapons/getAllWeapons.usecase.ts'
import { WeaponsRepositoryInMemory } from '@/domains/weapons/adapters/weapons.repository.inmemory.ts'

const catalogViewModel = ref<WeaponsCatalogViewModel>()
const weapons = computed(() => {
  return catalogViewModel.value?.items as ShopCardProps[]
})

const usecase = new GetAllWeaponsUsecase(new WeaponsRepositoryInMemory())

const getCatalog = () => {
  usecase.execute(
    SoldierRepositoryInMemory.getInstance().getSoldier().gold,
    new WeaponsCataloguePresenter((weaponsCatalogViewModel) => {
      catalogViewModel.value = weaponsCatalogViewModel
    }),
  )
}
onMounted(() => {
  getCatalog()
})
</script>
