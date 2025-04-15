import type { WeaponsRepository } from '../ports/weapons.repository'
import type { Weapons } from '../getAllWeapons.usecase'

export class WeaponsRepositoryInMemory implements WeaponsRepository {
  getAllWeapons(): Promise<Weapons[]> {
    return Promise.resolve<Weapons[]>([
      {
        id: 'arc',
        title: 'Arc en bois pas ouf',
        image: 'arc.png',
      },
      {
        id: 'sword',
        title: 'Epée de boisaille',
        image: 'epee.png',
      },
      {
        id: 'masse',
        title: 'Massue gneu gneu taper',
        image: 'massue.png',
      },
    ])
  }
}
