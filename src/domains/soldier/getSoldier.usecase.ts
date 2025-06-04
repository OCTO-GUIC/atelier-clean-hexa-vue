import type { SoldierPresenter } from './ports/soldier.presenter'
import type { SoldierRepository } from './ports/soldier.repository'

export class Soldier {
  constructor(
    private readonly _gold: number,
    private readonly _strength: number,
  ) {}

  public get gold(): number {
    return this._gold
  }
  public get strength(): number {
    return this._strength
  }
}

export class GetSoldierUsecase {
  constructor(private readonly soldierRepository: SoldierRepository) {}
  execute(presenter: SoldierPresenter) {
    const soldier = this.soldierRepository.getSoldier()
    presenter.presents(soldier)
  }
}
