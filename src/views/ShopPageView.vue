<template>
  <div v-if="!catalogViewModel">Chargement en cours ...</div>
  <ShopView v-else heading="Le shoop" :weapons="catalogViewModel.items" />
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

const catalogViewModel = ref<WeaponsCatalogViewModel>()

onMounted(() => {
  const usecase = new GetAllWeaponsUsecase(new WeaponsRepositoryInMemory())
  usecase.execute(
    new WeaponsCataloguePresenter((weaponsCatalogViewModel) => {
      catalogViewModel.value = weaponsCatalogViewModel
    }),
  )
})
</script>
