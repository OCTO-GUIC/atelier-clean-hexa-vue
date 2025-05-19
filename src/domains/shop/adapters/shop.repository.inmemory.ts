import type { ShopRepository } from '@/domains/shop/ports/shop.repository.ts'
import { SoldierRepositoryInMemory } from '@/domains/soldier/adapters/soldier.repository.inmemory.ts'
import { Soldier } from '@/domains/soldier/getSoldier.usecase'

export class ShopRepositoryInmemory implements ShopRepository {
  buyWeapon(soldierId: string, weaponId: string, price: number): Promise<void> {
    const soldier = SoldierRepositoryInMemory.getInstance().getSoldier()
    SoldierRepositoryInMemory.getInstance().saveSoldier(new Soldier(soldier.gold - price, 0))
    return Promise.resolve()
  }
}
