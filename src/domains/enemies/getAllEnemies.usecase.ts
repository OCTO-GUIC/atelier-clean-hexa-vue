import type { EnemiesPresenter } from './ports/enemies.presenter'
import type { EnemiesRepository } from './ports/enemies.repository'

export class Enemy {
  constructor(
    private readonly _name: string,
    private readonly _avatar: string,
    private readonly _healthPoint: number,
    private readonly _awardGold: number,
    private _alive: boolean,
  ) {}

  public get awardGold(): number {
    return this._awardGold
  }

  public get healthPoint(): number {
    return this._healthPoint
  }

  public get avatar(): string {
    return this._avatar
  }

  public get name(): string {
    return this._name
  }

  public get alive(): boolean {
    return this._alive
  }

  public attack(soldierStrength: number) {}
}

export class GetAllEnnemies {
  constructor(private readonly repository: EnemiesRepository) {}

  async execute(strengthOfSoldier: number, presenter: EnemiesPresenter): Promise<void> {}
}
