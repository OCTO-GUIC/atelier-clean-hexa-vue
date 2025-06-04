<template>
  <div v-if="!enemiesViewModel">Loading ...</div>
  <BattleView :enemies-view-model="enemiesViewModel" v-else />
</template>

<script setup lang="ts">
import {
  EnemiesPresenterImpl,
  type EnemiesViewModel,
} from '@/domains/enemies/adapters/enemies.presenter.impl'
import { EnemiesRepositoryInMemory } from '@/domains/enemies/adapters/enemies.repository.inMemory'
import { EnemyEventBus } from '@/domains/enemies/enemy.eventBus'
import { GetAllEnnemies } from '@/domains/enemies/getAllEnemies.usecase'
import { onMounted, ref } from 'vue'
import BattleView from '../components/Battle/BattleView.vue'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory.ts'

const enemiesViewModel = ref<EnemiesViewModel>()

const usecase = new GetAllEnnemies(EnemiesRepositoryInMemory.getInstance())

const getEnemies = () => {
  usecase.execute(
    SoldierRepositoryInMemory.getInstance().getSoldier().strength,
    new EnemiesPresenterImpl((viewModel) => {
      enemiesViewModel.value = viewModel
    }),
  )
}

onMounted(() => {
  getEnemies()
  EnemyEventBus.getInstance().subscribe('Battle', 'enemyBattle', () => {
    getEnemies()
  })
})
</script>
