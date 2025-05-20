import type { Enemy } from '../getAllEnemies.usecase'
import type { EnemiesPresenter } from '../ports/enemies.presenter'

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

  present(enemies: Enemy[], strengthOfSoldier): void {
    this.callback({
      enemies: enemies.map((enemy) => ({
        name: enemy.name,
        avatar: enemy.avatar,
        healthPoint: enemy.healthPoint,
        awardGold: enemy.awardGold,
        isAlive: enemy.alive,
        canBeAttacked: enemy.healthPoint <= strengthOfSoldier,
        img: enemy.avatar,
      })),
    })
  }
}
