import type { SoldierPresenter } from './ports/soldier.presenter'
import type { SoldierRepository } from './ports/soldier.repository'

export class Soldier {
  constructor(private readonly gold: number) {}

  getGold(): number {
    return this.gold
  }
}

export class GetSoldierGoldUsecase {
  constructor(private readonly soldierRepository: SoldierRepository) {}
  execute(presenter: SoldierPresenter) {
    const soldier = this.soldierRepository.getSoldier()
    presenter.presents(soldier)
  }
}
