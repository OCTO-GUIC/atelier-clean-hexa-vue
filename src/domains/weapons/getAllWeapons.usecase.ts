import type { WeaponsPresenter } from './ports/weapons.presenter'
import type { WeaponsRepository } from './ports/weapons.repository'

export type Weapons = {
  id: string
  title: string
  image: string
}

export class GetAllWeaponsUsecase {
  constructor(private readonly repository: WeaponsRepository) {}

  async execute(presenter: WeaponsPresenter): Promise<void> {
    const weapons = await this.repository.getAllWeapons()
    presenter.present(weapons)
  }
}
