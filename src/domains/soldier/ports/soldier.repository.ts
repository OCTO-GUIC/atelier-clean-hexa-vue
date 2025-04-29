import type { Soldier } from '../getSoldierGold.usecase'

export interface SoldierRepository {
  getSolider(): Soldier
}
