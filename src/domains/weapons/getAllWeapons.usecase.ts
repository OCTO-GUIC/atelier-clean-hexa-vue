import type { WeaponsPresenter } from './ports/weapons.presenter'
import type { WeaponsRepository } from './ports/weapons.repository'

export class Weapons {
  constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _image: string,
    private readonly _price: number,
    private readonly _strength: number,
  ) {}

  public get image(): string {
    return this._image
  }
  public get strenght(): string {
    return this._strength
  }
  public get title(): string {
    return this._title
  }
  public get id(): string {
    return this._id
  }

  public get price(): number {
    return this._price
  }

  canBuy(amountOfGoldAvailable: number): boolean {
    return amountOfGoldAvailable >= this.price
  }
}

export class GetAllWeaponsUsecase {
  constructor(private readonly repository: WeaponsRepository) {}

  async execute(goldOfSoldier: number, presenter: WeaponsPresenter): Promise<void> {
    const weapons = await this.repository.getAllWeapons()
    presenter.present(weapons, goldOfSoldier)
  }
}
