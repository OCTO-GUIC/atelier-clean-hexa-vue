import { EventBus } from '@/shell/eventBus'

export type ShopEventMap = {
  weaponBought: ''
}

export class ShopEventBus extends EventBus<ShopEventMap> {
  private static instance: ShopEventBus | null = null

  protected eventSubscribers: Record<
    keyof ShopEventMap,
    {
      subscriberName: string
      callback: () => void
    }[]
  > = {
    weaponBought: [],
  }

  private constructor() {
    super()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ShopEventBus()
    }
    return this.instance
  }
}
