import type { Enemy } from '../getAllEnemies.usecase'

export interface EnemiesPresenter {
  present(ennemies: Enemy[]): void
}
