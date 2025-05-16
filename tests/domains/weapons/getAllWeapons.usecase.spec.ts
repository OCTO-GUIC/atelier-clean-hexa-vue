import { describe, it, expect, vi } from 'vitest'
import { WeaponsRepository } from '@/domains/weapons/ports/weapons.repository'
import { GetAllWeaponsUsecase, Weapons } from '@/domains/weapons/getAllWeapons.usecase'
import { WeaponsCataloguePresenter } from '@/domains/weapons/adapters/weapons.presenter.catalog'

describe('GetAllWeaponsUsecase', () => {
  it('should retrieve all weapons and present them with available gold amount', async () => {
    // GIVEN
    const mockWeapons = [
      new Weapons('1', 'Sword', 'sword.jpg', 100),
      new Weapons('2', 'Bow', 'bow.jpg', 150),
    ]

    const mockRepository: WeaponsRepository = {
      getAllWeapons: vi.fn().mockResolvedValue(mockWeapons),
    }

    const usecase = new GetAllWeaponsUsecase(mockRepository)
    const goldAmount = 100

    // WHEN // THEN
    await usecase.execute(
      goldAmount,
      new WeaponsCataloguePresenter((vm) => {
        expect(vm).toEqual({
          items: [
            {
              addToCartButton: {
                disabled: false,
                label: 'Acheter',
              },
              image: 'public/images/sword.jpg',
              price: 100,
              title: 'Sword',
            },
            {
              addToCartButton: {
                disabled: true,
                label: 'Acheter',
              },
              image: 'public/images/bow.jpg',
              price: 150,
              title: 'Bow',
            },
          ],
        })
      }),
    )
  })

  it('should disable all weapons when soldier has no gold', async () => {
    // GIVEN
    const mockWeapons = [
      new Weapons('1', 'Sword', 'sword.jpg', 100),
      new Weapons('2', 'Bow', 'bow.jpg', 150),
    ]

    const mockRepository: WeaponsRepository = {
      getAllWeapons: vi.fn().mockResolvedValue(mockWeapons),
    }

    const usecase = new GetAllWeaponsUsecase(mockRepository)
    const goldAmount = 0

    // WHEN // THEN
    await usecase.execute(
      goldAmount,
      new WeaponsCataloguePresenter((vm) => {
        expect(vm).toEqual({
          items: [
            {
              addToCartButton: {
                disabled: true,
                label: 'Acheter',
              },
              image: 'public/images/sword.jpg',
              price: 100,
              title: 'Sword',
            },
            {
              addToCartButton: {
                disabled: true,
                label: 'Acheter',
              },
              image: 'public/images/bow.jpg',
              price: 150,
              title: 'Bow',
            },
          ],
        })
      }),
    )
  })
})
