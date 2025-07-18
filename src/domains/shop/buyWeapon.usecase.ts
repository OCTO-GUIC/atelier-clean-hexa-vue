import type { EventBus } from '@/shell/eventBus.ts'
import type { ShopEventMap } from '@/domains/shop/shop.eventBus.ts'
import type { ShopRepository } from '@/domains/shop/ports/shop.repository.ts'

export class BuyWeaponUsecase {
  constructor(
    private readonly eventBus: EventBus<ShopEventMap>,
    private readonly shopRepository: ShopRepository,
  ) {}

  async execute(price: number, strength: number): Promise<void> {
    await this.shopRepository.buyWeapon(price, strength)
    this.eventBus.publish('weaponBought')
  }
}
