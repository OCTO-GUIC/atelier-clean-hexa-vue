import { describe, expect, it, vi } from 'vitest'
import type { ShopRepository } from '@/domains/shop/ports/shop.repository'
import type { ShopEventMap } from '@/domains/shop/shop.eventBus'
import { BuyWeaponUsecase } from '@/domains/shop/buyWeapon.usecase'
import { EventBus } from '@/shell/eventBus.ts'

class MockShopEventBus extends EventBus<ShopEventMap> {
  publish = vi.fn()
  subscribe = vi.fn()
  protected eventSubscribers: Record<
    keyof ShopEventMap,
    {
      subscriberName: string
      callback: () => void
    }[]
  > = {
    weaponBought: [],
  }
}

describe('BuyWeaponUsecase', () => {
  it('should buy weapon and publish event', async () => {
    // GIVEN
    const mockShopRepository: ShopRepository = {
      buyWeapon: vi.fn().mockResolvedValue(undefined),
    }

    const mockEventBus = new MockShopEventBus()

    const usecase = new BuyWeaponUsecase(mockEventBus, mockShopRepository)
    const price = 100
    const strength = 50

    // WHEN
    await usecase.execute(price, strength)

    // THEN
    expect(mockShopRepository.buyWeapon).toHaveBeenCalledWith(price, strength)
    expect(mockEventBus.publish).toHaveBeenCalledWith('weaponBought')
  })
})
