import type { Enemy } from '../getAllEnemies.usecase'
import type { EnemiesPresenter } from '../ports/enemies.presenter'

type EnemyViewModel = {
  name: string
  avatar: string
  healthPoint: number
  awardGold: number
}

export type EnemiesViewModel = { enemies: EnemyViewModel[] }

export class EnemiesPresenterImpl implements EnemiesPresenter {
  constructor(private readonly callback: (enemiesViewModel: EnemiesViewModel) => void) {}

  present(enemies: Enemy[]): void {
    this.callback({
      enemies: enemies.map((enemy) => ({
        name: enemy.name,
        avatar: enemy.avatar,
        healthPoint: enemy.healthPoint,
        awardGold: enemy.awardGold,
      })),
    })
  }
}
