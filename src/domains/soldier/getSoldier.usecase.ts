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

export class GetSoldierUsecase {}
