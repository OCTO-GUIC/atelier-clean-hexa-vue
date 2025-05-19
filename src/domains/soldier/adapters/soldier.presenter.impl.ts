import type { Soldier } from '../getSoldier.usecase'
import type { SoldierPresenter } from '../ports/soldier.presenter'

export type SoldierViewModel = {
  gold: number
  strenght: number
}

export class SoldierPresenterImpl implements SoldierPresenter {
  constructor(private readonly callback: (viewModel: SoldierViewModel) => void) {}
  presents(soldier: Soldier): void {
    this.callback({
      gold: soldier.gold,
      strenght: soldier.strength,
    })
  }
}
