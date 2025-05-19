<template>
  <div v-if="!catalogViewModel">Chargement en cours ...</div>
  <ShopView v-else heading="Le shop" :weapons="catalogViewModel.items" />
</template>

<script setup lang="ts">
import ShopView from '@/components/Shop/ShopView.vue'
import {
  WeaponsCataloguePresenter,
  type WeaponsCatalogViewModel,
} from '@/domains/weapons/adapters/weapons.presenter.catalog'
import { WeaponsRepositoryInMemory } from '@/domains/weapons/adapters/weapons.repository.inmemory'
import { GetAllWeaponsUsecase } from '@/domains/weapons/getAllWeapons.usecase'
import { onMounted, ref } from 'vue'
import { ShopEventBus } from '@/domains/shop/shop.eventBus.ts'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory.ts'

const catalogViewModel = ref<WeaponsCatalogViewModel>()
const shopEventBus = ShopEventBus.getInstance()
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
  shopEventBus.subscribe('SoldierHeader', 'weaponBought', () => {
    getCatalog()
  })
})
</script>
