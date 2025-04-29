import { Soldier } from '../getSoldierGold.usecase'
import type { SoldierRepository } from '../ports/soldier.repository'

export class SoldierRepositoryInMemory implements SoldierRepository {
  getSolider(): Soldier {
    return new Soldier(1000)
  }
}
