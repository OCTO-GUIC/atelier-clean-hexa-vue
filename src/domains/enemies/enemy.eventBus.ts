import { EventBus } from '@/shell/eventBus'

export type EnemyEventMap = {
  enemyBattle: ''
}

export type EnemyEvent = keyof EnemyEventMap

export class EnemyEventBus extends EventBus<EnemyEventMap> {
  private static instance: EnemyEventBus | null = null

  protected eventSubscribers: Record<
    keyof EnemyEventMap,
    {
      subscriberName: string
      callback: () => void
    }[]
  > = {
    enemyBattle: [],
  }

  private constructor() {
    super()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new EnemyEventBus()
    }
    return this.instance
  }
}
