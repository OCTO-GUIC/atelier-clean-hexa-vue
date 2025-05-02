import type { ShopRepository } from '@/domains/shop/ports/shop.repository.ts'
import {
  SoldierRepositoryInMemory
} from '@/domains/soldier/adapters/soldier.repository.inmemory.ts'
import { Soldier } from '@/domains/soldier/getSoldierGold.usecase.ts'

export class ShopRepositoryInmemory implements ShopRepository {
  buyWeapon(soldierId: string, weaponId: string, price: number): Promise<void> {
    const soldier = SoldierRepositoryInMemory.getInstance().getSoldier();
    SoldierRepositoryInMemory.getInstance().saveSoldier(new Soldier(soldier.getGold() - price));
    return Promise.resolve()
  }
}
