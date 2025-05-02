import { Soldier } from '../getSoldierGold.usecase'
import type { SoldierRepository } from '../ports/soldier.repository'

export class SoldierRepositoryInMemory implements SoldierRepository {
  private static instance: SoldierRepositoryInMemory
  private soldier: Soldier = new Soldier(1000)

  private constructor() {}

  static getInstance(): SoldierRepositoryInMemory {
    if (!SoldierRepositoryInMemory.instance) {
      SoldierRepositoryInMemory.instance = new SoldierRepositoryInMemory()
    }
    return SoldierRepositoryInMemory.instance
  }

  getSoldier(): Soldier {
    return this.soldier
  }

  saveSoldier(soldier: Soldier): void {
    this.soldier = soldier
  }
}
