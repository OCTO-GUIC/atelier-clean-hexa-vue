import type { Weapons } from '../getAllWeapons.usecase'

export interface WeaponsPresenter {
  present(weapons: Weapons[], goldOfSoldier: number): void
}
