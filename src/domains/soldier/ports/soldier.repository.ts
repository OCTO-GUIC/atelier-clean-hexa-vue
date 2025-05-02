import type { Soldier } from '../getSoldierGold.usecase'

export interface SoldierRepository {
  getSoldier(): Soldier
}
