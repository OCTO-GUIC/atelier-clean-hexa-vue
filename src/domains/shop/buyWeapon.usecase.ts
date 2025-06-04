import type { ShopRepository } from '@/domains/shop/ports/shop.repository.ts'

export class BuyWeaponUsecase {
  constructor(private readonly shopRepository: ShopRepository) {}

  async execute(price: number, strength: number): Promise<void> {}
}
