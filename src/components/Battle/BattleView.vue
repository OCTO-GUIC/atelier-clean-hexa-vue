<template>
  <div class="battle">
    <h1>Battle</h1>
    <div class="test">
      <div v-for="enemy in enemiesViewModel.enemies" :key="enemy.name" class="ennemy">
        <CommonBadge :text="enemy.healthPoint" image-src="/images/epee.png" alt-text="strengh" />
        <img :src="`/images/${enemy.img}`" :alt="enemy.name" />
        <h2 v-text="enemy.name" />
        <div class="container">
          <CommonButton
            :label="enemy.isAlive ? 'Attaquer' : 'Mort'"
            :on-click="() => onAttack(enemy.name)"
            :disabled="!enemy.isAlive || !enemy.canBeAttacked"
          />
          <CommonBadge :text="enemy.awardGold" image-src="/images/gold.png" alt-text="gold" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonButton from '@/components/commons/CommonButton.vue'
import { type EnemiesViewModel } from '@/domains/enemies/adapters/enemies.presenter.impl'
import { EnemiesRepositoryInMemory } from '@/domains/enemies/adapters/enemies.repository.inMemory'
import { BattleUsecase } from '@/domains/enemies/battle.usecase'
import { EnemyEventBus } from '@/domains/enemies/enemy.eventBus'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory.ts'
import CommonBadge from '../commons/CommonBadge.vue'

export interface BattleViewModel {
  enemiesViewModel: EnemiesViewModel
}

defineProps<BattleViewModel>()

const onAttack = (enemyName: string) => {
  const usecase = new BattleUsecase(
    EnemiesRepositoryInMemory.getInstance(),
    EnemyEventBus.getInstance(),
  )
  usecase.execute(enemyName, SoldierRepositoryInMemory.getInstance().getSoldier().strength)
}
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 0.5rem 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 3.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  width: fit-content;
  margin: 0 auto 4rem auto;
  padding: 0 2rem;
}

.battle {
  padding: 2rem 2rem 0 2rem;
  margin: auto;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  background-image: url('/images/arena.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.test {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}

.ennemy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  width: 100%;

  & img {
    object-fit: contain;
    height: 250px;
    width: auto;
  }

  & h2 {
    font-size: 2.5rem;
    font-weight: 700;
  }
}

.container {
  display: flex;
  gap: 2rem;
  justify-content: space-around;
  width: 100%;
}

@media (min-width: 48rem) {
  .test {
    flex-direction: row;
  }

  .ennemy {
    max-width: 28%;
    min-width: 28%;
  }
}
</style>
