import type { Weapons } from '../getAllWeapons.usecase'
import type { WeaponsPresenter } from '../ports/weapons.presenter'

export type WeaponsCatalogItemViewModel = {
  title: string
  image: string
  price: number
  addToCartButton: {
    disabled: boolean
    label: string
  }
  link: {
    label: string
    url: string
    title: string
  }
}
export type WeaponsCatalogViewModel = {
  items: WeaponsCatalogItemViewModel[]
}

export class WeaponsCataloguePresenter implements WeaponsPresenter {
  constructor(
    private readonly callback: (weaponsCatalogViewModel: WeaponsCatalogViewModel) => void,
  ) {}
  present(weapons: Weapons[], amountOfGoldAvailable: number): void {
    this.callback({
      items: weapons.map((w) => ({
        title: w.title,
        image: `public/images/${w.image}`,
        price: w.price,
        addToCartButton: {
          disabled: !w.canBuy(amountOfGoldAvailable),
          label: 'Ajouter au panier',
        },
        link: {
          label: 'Consulter la page',
          url: '#',
          title: `Consulter la page ${w.title}`,
        },
      })),
    })
  }
}
