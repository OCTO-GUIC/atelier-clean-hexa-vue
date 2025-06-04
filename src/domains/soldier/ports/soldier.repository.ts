import type { Soldier } from '../getSoldier.usecase'

export interface SoldierRepository {
  getSoldier(): Soldier
}
