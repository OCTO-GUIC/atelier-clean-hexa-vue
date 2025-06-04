import type { EnemiesPresenter } from '@/domains/enemies/ports/enemies.presenter.ts'
import type { Enemy } from '@/domains/enemies/getAllEnemies.usecase.ts'

type EnemyViewModel = {
  name: string
  avatar: string
  healthPoint: number
  awardGold: number
  isAlive: boolean
  canBeAttacked: boolean
  img: string
}

export type EnemiesViewModel = { enemies: EnemyViewModel[] }

export class EnemiesPresenterImpl implements EnemiesPresenter {
  constructor(private readonly callback: (enemiesViewModel: EnemiesViewModel) => void) {}

  present(enemies: Enemy[], strengthOfSoldier: number): void {}
}
