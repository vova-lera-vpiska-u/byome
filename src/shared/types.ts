export type Bytem = {
  _id: string
  title: string
  importance: number
  completed?: boolean
  priceRUB?: number
  amount?: number
  author?: string
}

export const importance = [
  ['2', 'Первостепенно'],
  ['1', 'Важно'],
  ['0', 'Надо бы'],
  ['-1', 'От хорошей жизни'],
  ['-2', 'Роскошь'],
]
