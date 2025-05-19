<template>
  <div class="battle">
    <h1>Battle</h1>
    <div class="test">
      <div v-for="enemy in enemiesViewModel.enemies" :key="enemy.name" class="ennemy">
        <img src="/images/vilain.png" :alt="enemy.name" />
        <div class="toto">
          <h2 v-text="enemy.name" />
          <div class="badge">
            {{ enemy.healthPoint }}<img src="/images/epee.png" alt="gold" />
          </div>
        </div>
        <div class="toto">
          <CommonButton
            :label="enemy.isAlive ? 'Attaquer' : 'Mort'"
            :on-click="() => onAttack(enemy.name)"
            :disabled="!enemy.isAlive"
          />
          <div class="badge">
            {{ enemy.awardGold }}<img src="../../../public/images/gold.png" alt="gold" />
          </div>
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

export interface BattleViewModel {
  enemiesViewModel: EnemiesViewModel
}

defineProps<BattleViewModel>()

const onAttack = (enemyName: string) => {
  const usecase = new BattleUsecase(EnemiesRepositoryInMemory.getInstance(), EnemyEventBus.getInstance())
  usecase.execute(enemyName, 10)
}
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 0.5rem 0;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 3.5rem;
}

.battle {
  padding: 0 2rem;
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
  justify-content: space-between;
  gap: 4rem;
}

.ennemy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);

  & img {
    object-fit: contain;
    width: 100%;
  }

  & h2 {
    font-size: 2.5rem;
    font-weight: 700;
  }
}

.badge {
  padding: 0.25rem 0.5rem;
  display: flex;
  border-radius: 6px;
  gap: 0.5rem;
  background-color: #fff;
  align-items: center;
  color: black;

  & img {
    height: 2.5rem;
  }
}

.toto {
  display: flex;
  gap: 2rem;
  justify-content: space-around;
  width: 100%;
}
</style>
