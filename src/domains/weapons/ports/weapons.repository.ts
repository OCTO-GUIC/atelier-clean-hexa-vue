import type { Weapons } from '../getAllWeapons.usecase'

export interface WeaponsRepository {
  getAllWeapons(): Promise<Weapons[]>
}
