import type { SoldierPresenter } from './ports/soldier.presenter'
import type { SoldierRepository } from './ports/soldier.repository'

export class Soldier {
  constructor(
    private readonly _gold: number,
    private readonly _strenght: number,
  ) {}

  public get gold(): number {
    return this._gold
  }
  public get strenght(): number {
    return this._strenght
  }
}

export class GetSoldierUsecase {
  constructor(private readonly soldierRepository: SoldierRepository) {}
  execute(presenter: SoldierPresenter) {
    const soldier = this.soldierRepository.getSoldier()
    presenter.presents(soldier)
  }
}
