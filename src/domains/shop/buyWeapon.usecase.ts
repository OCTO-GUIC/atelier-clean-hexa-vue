import type { EventBus } from '@/shell/eventBus.ts'
import type { ShopEventMap } from '@/domains/shop/shop.eventBus.ts'
import type { ShopRepository } from '@/domains/shop/ports/shop.repository.ts'

export class BuyWeaponUsecase {
  constructor(
    private readonly eventBus: EventBus<ShopEventMap>,
    private readonly shopRepository: ShopRepository,
  ) {}

  async execute(soldierId: string, price: number): Promise<void> {
    await this.shopRepository.buyWeapon(soldierId, 'weaponId', price)
    this.eventBus.publish('weaponBought', { soldierId, price })
  }
}
