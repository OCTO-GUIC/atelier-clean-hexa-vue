import type { Soldier } from '../getSoldier.usecase'

export interface SoldierPresenter {
  presents(soldier: Soldier): void
}
