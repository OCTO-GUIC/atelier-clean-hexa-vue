import { Enemy } from '../getAllEnemies.usecase'
import type { EnemiesRepository } from '../ports/enemies.repository'

export class EnemiesRepositoryInMemory implements EnemiesRepository {
  getAllEnnemies(): Promise<Enemy[]> {
    return Promise.resolve([
      new Enemy('Vilain 1', '', 10, 50),
      new Enemy('Vilain 2', '', 50, 100),
      new Enemy('Vilain 3', '', 100, 200),
    ])
  }
}
