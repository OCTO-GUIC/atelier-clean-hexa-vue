import type { Soldier } from '../getSoldierGold.usecase'

export interface SoldierPresenter {
  presents(soldier: Soldier): void
}
