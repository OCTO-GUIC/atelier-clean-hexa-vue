import type { Enemy } from '@/domains/enemies/getAllEnemies.usecase.ts'

export interface EnemiesPresenter {
  present(enemies: Enemy[], strengthOfSoldier: number): void
}
