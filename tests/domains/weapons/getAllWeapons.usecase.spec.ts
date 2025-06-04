import { describe, expect, it, vi } from 'vitest'
import { GetAllWeaponsUsecase, Weapons } from '@/domains/weapons/getAllWeapons.usecase'
import {
  WeaponsCataloguePresenter,
  type WeaponsCatalogViewModel,
} from '@/domains/weapons/adapters/weapons.presenter.catalog'
import type { WeaponsRepository } from '@/domains/weapons/ports/weapons.repository.ts'

describe('GetAllWeaponsUsecase', () => {
  it('should retrieve all weapons and present them with available gold amount', async () => {
    // GIVEN
    const mockWeapons = [
      new Weapons('1', 'Sword', 'sword.jpg', 100, 10),
      new Weapons('2', 'Bow', 'bow.jpg', 150, 20),
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
        expect(vm).toStrictEqual<WeaponsCatalogViewModel>({
          items: [
            {
              addToCartButton: {
                disabled: false,
                label: 'Acheter',
              },
              image: '/images/sword.jpg',
              price: 100,
              title: 'Sword',
              strength: 10,
            },
            {
              addToCartButton: {
                disabled: true,
                label: 'Acheter',
              },
              image: '/images/bow.jpg',
              price: 150,
              title: 'Bow',
              strength: 20,
            },
          ],
        })
      }),
    )
  })

  it('should disable all weapons when soldier has no gold', async () => {
    // GIVEN
    const mockWeapons = [
      new Weapons('1', 'Sword', 'sword.jpg', 100, 10),
      new Weapons('2', 'Bow', 'bow.jpg', 150, 20),
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
        expect(vm).toStrictEqual<WeaponsCatalogViewModel>({
          items: [
            {
              addToCartButton: {
                disabled: true,
                label: 'Acheter',
              },
              image: '/images/sword.jpg',
              price: 100,
              title: 'Sword',
              strength: 10,
            },
            {
              addToCartButton: {
                disabled: true,
                label: 'Acheter',
              },
              image: '/images/bow.jpg',
              price: 150,
              title: 'Bow',
              strength: 20,
            },
          ],
        })
      }),
    )
  })
})
