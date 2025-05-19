import type { Enemy } from '../getAllEnemies.usecase'

export interface EnemiesRepository {
  getAllEnnemies(): Promise<Enemy[]>
  saveEnemy(enemy: Enemy): Promise<void>
}
