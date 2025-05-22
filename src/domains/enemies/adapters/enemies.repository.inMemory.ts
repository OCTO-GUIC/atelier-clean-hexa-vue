import { Enemy } from '../getAllEnemies.usecase'
import type { EnemiesRepository } from '../ports/enemies.repository'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory.ts'
import { Soldier } from '@/domains/soldier/getSoldier.usecase.ts'

export class EnemiesRepositoryInMemory implements EnemiesRepository {
  private static instance: EnemiesRepositoryInMemory

  private constructor() {}

  static getInstance(): EnemiesRepositoryInMemory {
    if (!EnemiesRepositoryInMemory.instance) {
      EnemiesRepositoryInMemory.instance = new EnemiesRepositoryInMemory()
    }
    return EnemiesRepositoryInMemory.instance
  }

  enemies = [
    new Enemy('Vil1', 'vilain.png', 10, 50, true),
    new Enemy('Vilain', 'demi-boss.png', 50, 100, true),
    new Enemy('The Boss', 'boss.png', 100, 200, true),
  ]

  getAllEnnemies(): Promise<Enemy[]> {
    return Promise.resolve(this.enemies)
  }

  saveEnemy(enemy: Enemy): Promise<void> {
    const name = enemy.name
    const index = this.enemies.findIndex((enemy) => enemy.name === name)
    this.enemies[index] = enemy
    const soldier = SoldierRepositoryInMemory.getInstance().getSoldier()
    SoldierRepositoryInMemory.getInstance().saveSoldier(
      new Soldier(enemy.alive ? soldier.gold : soldier.gold + enemy.awardGold, soldier.strength),
    )
    return Promise.resolve()
  }
}
