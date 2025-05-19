import { Enemy } from '../getAllEnemies.usecase'
import type { EnemiesRepository } from '../ports/enemies.repository'

export class EnemiesRepositoryInMemory implements EnemiesRepository {
  private static instance: EnemiesRepositoryInMemory

  private constructor() {
  }

  static getInstance(): EnemiesRepositoryInMemory {
    if (!EnemiesRepositoryInMemory.instance) {
      EnemiesRepositoryInMemory.instance = new EnemiesRepositoryInMemory()
    }
    return EnemiesRepositoryInMemory.instance
  }

  enemies = [
    new Enemy('Vilain 1', '', 10, 50, true),
    new Enemy('Vilain 2', '', 50, 100, true),
    new Enemy('Vilain 3', '', 100, 200, true)
  ]

  getAllEnnemies(): Promise<Enemy[]> {
    return Promise.resolve(this.enemies)
  }

  saveEnemy(enemy: Enemy): Promise<void> {
    const name = enemy.name
    const index = this.enemies.findIndex((enemy) => enemy.name === name)
    this.enemies[index] = enemy
    console.log(this.enemies)
    return Promise.resolve()
  }
}
