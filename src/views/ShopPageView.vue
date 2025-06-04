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
import { WeaponsRepositoryInMemory } from '@/domains/weapons/adapters/weapons.repository.inmemory'
import { GetAllWeaponsUsecase } from '@/domains/weapons/getAllWeapons.usecase'
import { computed, onMounted, ref } from 'vue'
import { ShopEventBus } from '@/domains/shop/shop.eventBus.ts'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory.ts'
import type { ShopCardProps } from '@/components/Shop/ShopCard.vue'

const catalogViewModel = ref<WeaponsCatalogViewModel>()
const shopEventBus = ShopEventBus.getInstance()
const usecase = new GetAllWeaponsUsecase(new WeaponsRepositoryInMemory())
const weapons = computed(() => {
  return catalogViewModel.value?.items as ShopCardProps[]
})
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
  shopEventBus.subscribe('SoldierHeader', 'weaponBought', () => {
    getCatalog()
  })
})
</script>
