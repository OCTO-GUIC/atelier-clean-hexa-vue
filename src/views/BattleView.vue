<template>
  <h1>Battle</h1>
  <div v-if="!enemiesViewModel">Loading ...</div>
  <div v-else>
    <div v-for="enemy in enemiesViewModel.enemies" :key="enemy.name">
      <span v-text="enemy.name" />
      <span v-text="enemy.healthPoint" />
      <img :src="enemy.avatar" :alt="enemy.name" />
      <span v-text="enemy.awardGold" />
      <hr />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EnemiesPresenterImpl,
  type EnemiesViewModel,
} from '@/domains/enemies/adapters/enemies.presenter.impl'
import { EnemiesRepositoryInMemory } from '@/domains/enemies/adapters/enemies.repository.inMemory'
import { GetAllEnnemies } from '@/domains/enemies/getAllEnemies.usecase'
import { onMounted, ref } from 'vue'

const enemiesViewModel = ref<EnemiesViewModel>()

const usecase = new GetAllEnnemies(new EnemiesRepositoryInMemory())

const getEnemies = () => {
  usecase.execute(
    new EnemiesPresenterImpl((viewModel) => {
      enemiesViewModel.value = viewModel
    }),
  )
}

onMounted(() => {
  getEnemies()
})
</script>
