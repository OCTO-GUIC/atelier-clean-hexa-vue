import { describe, it, expect, vi } from 'vitest'
    import type { ShopRepository } from '@/domains/shop/ports/shop.repository'
    import type { EventBus } from '@/shell/eventBus'
    import type { ShopEventMap } from '@/domains/shop/shop.eventBus'
    import { BuyWeaponUsecase } from '@/domains/shop/buyWeapon.usecase'

    describe('BuyWeaponUsecase', () => {
      it('should buy weapon and publish event', async () => {
        // GIVEN
        const mockShopRepository: ShopRepository = {
          buyWeapon: vi.fn().mockResolvedValue(undefined)
        }

        const mockEventBus: EventBus<ShopEventMap> = {
          publish: vi.fn(),
          subscribe: vi.fn()
        }

        const usecase = new BuyWeaponUsecase(mockEventBus, mockShopRepository)
        const soldierId = 'soldier-123'
        const price = 100

        // WHEN
        await usecase.execute(soldierId, price)

        // THEN
        expect(mockShopRepository.buyWeapon).toHaveBeenCalledWith(soldierId, 'weaponId', price)
        expect(mockEventBus.publish).toHaveBeenCalledWith('weaponBought', { soldierId, price })
      })
    })
