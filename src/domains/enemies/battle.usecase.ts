import type { EventBus } from '@/shell/eventBus'
import type { EnemiesRepository } from './ports/enemies.repository'
import type { EnemyEventMap } from './enemy.eventBus'

export class BattleUsecase {
  constructor(
    private readonly repository: EnemiesRepository,
    private readonly eventBus: EventBus<EnemyEventMap>,
  ) {}

  async execute(enemyName: string, soldierStrength: number) {
    const enemies = await this.repository.getAllEnnemies()
    const enemy = enemies.find((e) => e.name === enemyName)!
    enemy.attack(soldierStrength)
    await this.repository.saveEnemy(enemy)
    this.eventBus.publish('enemyBattle')
  }
}
